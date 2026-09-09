<script lang="ts">
  import { onMount } from 'svelte';
  import { invalidate } from '$app/navigation';
  import { page } from '$app/state';
  import ExperienceMap from './ExperienceMap.svelte';
  import { AXES, toDish, recommend, coverage, space, type Recipe } from '$lib/exploration';

  let {
    data,
    view
  }: {
    data: {
      recipes: Recipe[];
      cooked: number[];
      warning: string;
      loadError: string;
      cookedError: string;
    };
    view: 'profile' | 'explore';
  } = $props();

  let ready = $state(false);
  let mode = $state<'familiar' | 'new'>('new');
  let limit = $state(8);
  let minutes = $state(0);
  let focusedId = $state<number | null>(null);
  let pending = $state(false);
  let error = $state('');

  onMount(() => {
    ready = true;
  });

  const dishes = $derived(data.recipes.map(toDish));
  const normalized = $derived(ready ? space(dishes) : null);
  const recommendations = $derived(
    ready && !data.cookedError
      ? recommend(dishes, data.cooked, mode, limit, minutes || Infinity)
      : []
  );
  const familiar = $derived(
    ready && !data.cookedError
      ? coverage(dishes, data.cooked, limit)
      : { ranked: [], validPairs: 0, excluded: 0 }
  );
  const focused = $derived(dishes.find((d) => d.id === focusedId));

  function focusDish(id: number) {
    focusedId = id;
    requestAnimationFrame(() =>
      document
        .getElementById('dish-detail')
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    );
  }

  async function toggleCooked(id: number) {
    if (pending) return;
    pending = true;
    error = '';
    try {
      const response = await fetch('/api/auth/cooked', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ recipeId: id, cooked: !data.cooked.includes(id) })
      });
      if (!response.ok) throw new Error(await response.text());
      await invalidate('explore:data');
    } catch (e) {
      error = e instanceof Error ? e.message : '기록을 저장하지 못했습니다.';
    } finally {
      pending = false;
    }
  }
</script>

<main class:profile={view === 'profile'}>
  <div class="intro">
    <div>
      <span class="eyebrow">
        {view === 'profile' ? '나의 요리 기록' : '경험에서 시작하는 탐색'}
      </span>
      <h1>
        {view === 'profile'
          ? `${page.data.user?.nickname ?? '방문자'}님의 요리 지도`
          : '다음엔 무엇을 만들어 볼까요?'}
      </h1>
      <p>해본 요리를 연결하고, 익숙한 범위에서 한 걸음 더 나아가 보세요.</p>
    </div>
    <a class="pill" href={view === 'profile' ? '/search' : '/profile'}>
      {view === 'profile' ? '새로운 요리 탐색 ↗' : '마이페이지 ↗'}
    </a>
  </div>

  <div class="stats">
    <span><b>{dishes.length}</b> 전체 요리</span>
    <span><b>{data.cooked.length}</b> 해본 요리</span>
    <span><b>{familiar.validPairs}</b> 비교 가능한 축 조합</span>
  </div>

  {#if !page.data.user}
    <div class="notice">
      <a href="/login">로그인</a>하면 해본 요리를 기록하고 나만의 추천을 받을 수 있습니다.
    </div>
  {/if}

  {#if data.loadError || data.cookedError}
    <div role="alert" class="notice">
      {data.loadError || data.cookedError}
      <button onclick={() => invalidate('explore:data')}>다시 불러오기</button>
    </div>
  {/if}

  {#if data.warning}
    <p role="status" class="notice">{data.warning}</p>
  {/if}

  {#if error}
    <p role="alert" class="notice">{error}</p>
  {/if}

  <div class="sections">
    <section class="recommendations panel">
      <div class="section-head">
        <div>
          <span class="eyebrow">다음 한 접시</span>
          <h2>나에게 맞는 요리 탐색</h2>
        </div>
        <div class="switch" aria-label="탐색 방식">
          <button
            class:active={mode === 'familiar'}
            aria-pressed={mode === 'familiar'}
            onclick={() => (mode = 'familiar')}
          >
            비슷한 요리
          </button>
          <button
            class:active={mode === 'new'}
            aria-pressed={mode === 'new'}
            onclick={() => (mode = 'new')}
          >
            새로운 요리
          </button>
        </div>
      </div>

      <p>
        {mode === 'new'
          ? '경험의 범위를 넓히면서, 서로 다른 특성을 가진 요리를 골랐어요.'
          : '내 경험과 가까운 요리를 중심으로, 추천끼리도 조금씩 다르게 골랐어요.'}
      </p>

      <div class="filters">
        <label>
          추천 개수
          <select bind:value={limit}>
            {#each [5, 8, 10] as n}
              <option value={n}>{n}개</option>
            {/each}
          </select>
        </label>
        <label>
          조리 시간
          <select bind:value={minutes}>
            <option value={0}>제한 없음</option>
            <option value={15}>15분 이내</option>
            <option value={30}>30분 이내</option>
            <option value={60}>60분 이내</option>
          </select>
        </label>
      </div>

      {#if !ready}
        <p class="notice">추천을 준비하고 있습니다.</p>
      {:else if !data.cooked.length}
        <p class="notice">아래 전체 요리에서 해본 요리를 먼저 체크해주세요.</p>
      {:else if !recommendations.length}
        <p class="notice">
          추천 가능한 요리가 없습니다. 시간 조건과 데이터 준비 상태를 확인해주세요.
        </p>
      {:else}
        <div class="cards">
          {#each recommendations as item, i}
            <article>
              <div class="rank">{String(i + 1).padStart(2, '0')}</div>
              <h3>
                <button onclick={() => focusDish(item.dish.id)}>
                  {item.dish.name}
                </button>
              </h3>
              <p>
                {item.dish.values.time}분 · 재료 {item.dish.values.ingredients ?? '—'}개 · {item.dish.values.steps ?? '—'}단계
              </p>
              <span class="tag">
                {item.areaUsed
                  ? item.gain > 1e-9
                    ? '경험 범위를 넓히는 선택'
                    : '익숙한 특성의 선택'
                  : '경험이 쌓이는 중 · 거리로 추천'}
              </span>
            </article>
          {/each}
        </div>
      {/if}

      {#if normalized && normalized.rows.length < dishes.length}
        <p class="note">
          현재 비교 축의 값이 모두 있는 {normalized.rows.length}개 요리로 추천을 계산합니다. 누락 값은 추정하지 않습니다.
        </p>
      {/if}
    </section>

    <section class="map panel">
      <div class="section-head">
        <div>
          <span class="eyebrow">나의 경험 지도</span>
          <h2>요리로 그리는 나의 영역</h2>
        </div>
      </div>
      <p>두 축을 선택해 모든 요리를 펼쳐보세요. 해본 요리는 초록색으로 표시됩니다.</p>
      {#if ready}
        <ExperienceMap
          {dishes}
          cooked={data.cookedError ? [] : data.cooked}
          onfocus={focusDish}
        />
      {:else}
        <p>지도를 준비하고 있습니다.</p>
      {/if}
    </section>

    <section class="coverage panel">
      <div class="section-head">
        <div>
          <span class="eyebrow">여러 방향에서 확인한 익숙함</span>
          <h2>내 경험과 겹치는 요리</h2>
        </div>
        <span class="tag">기기에서 계산 · 최대 {limit}개</span>
      </div>
      <p>
        다양한 축 조합에서 경험 영역에 포함되는 횟수가 많은 순서입니다. 경계에 있는 점도 포함합니다.
      </p>
      {#if !familiar.validPairs}
        <p class="notice">
          아직 넓이를 가진 경험 영역이 없습니다. 데이터를 준비하고 해본 요리를 더 기록해주세요.
        </p>
      {:else if !familiar.ranked.length}
        <p class="notice">비교한 영역 안에 들어오는 미경험 요리가 없습니다.</p>
      {:else}
        <ol class="familiar-list">
          {#each familiar.ranked as row}
            <li>
              <button onclick={() => focusDish(row.dish.id)}>
                {row.dish.name}
              </button>
              <span>{row.hits} / {row.total}개 영역에 포함</span>
              <meter
                min="0"
                max={row.total}
                value={row.hits}
                aria-label={`${row.dish.name}의 영역 포함 횟수`}
              ></meter>
            </li>
          {/each}
        </ol>
      {/if}
      <p class="note">
        면적이 0인 축 조합은 제외합니다. 동일한 축 조합을 비교할 수 있는 요리만 순위에 포함하며, 축 간 상관관계에 따라 비슷한 특성이 여러 번 반영될 수 있습니다. 실제 난이도나 성공 확률을 뜻하지 않습니다.
      </p>
    </section>
  </div>

  <section id="dish-detail" class="panel detail" aria-live="polite">
    {#if focused}
      <span class="eyebrow">선택한 요리</span>
      <h2>{focused.name}</h2>
      <div class="facts">
        {#each AXES as axis}
          <span>
            {axis.label}
            <b>
              {focused.values[axis.key] ?? '데이터 대기'}
              {focused.values[axis.key] !== null ? ` ${axis.unit}` : ''}
            </b>
          </span>
        {/each}
      </div>
      <div class="detail-actions">
        <a class="pill" href={`/recipes/${focused.id}`}>레시피 자세히 보기 ↗</a>
        <button
          class="primary"
          disabled={!page.data.user || pending || Boolean(data.cookedError)}
          onclick={() => toggleCooked(focused.id)}
        >
          {data.cooked.includes(focused.id)
            ? '해본 요리 기록 취소'
            : '해본 요리로 기록'}
        </button>
      </div>
    {:else}
      <p>지도의 점이나 요리 이름을 선택하면 자세한 정보가 여기에 표시됩니다.</p>
    {/if}
  </section>

  <section class="panel">
    <div class="section-head">
      <div>
        <span class="eyebrow">작은 경험을 차곡차곡</span>
        <h2>전체 요리 · 경험 기록</h2>
      </div>
      <span aria-live="polite">
        {pending ? '저장 중…' : '계정에 저장됩니다'}
      </span>
    </div>
    <p>실제로 만들어 본 요리를 체크하세요. 추천 결과만으로 경험 기록이 추가되지는 않습니다.</p>
    {#if !dishes.length}
      <p class="notice">
        등록된 요리가 없습니다. 데이터가 준비되면 여기에 나타납니다.
      </p>
    {:else}
      <div class="dish-list">
        {#each dishes as dish}
          <div class:recorded={data.cooked.includes(dish.id)}>
            <input
              type="checkbox"
              checked={data.cooked.includes(dish.id)}
              aria-label={`${dish.name} 해본 요리`}
              disabled={!page.data.user || pending || Boolean(data.cookedError)}
              onchange={() => toggleCooked(dish.id)}
            />
            <button onclick={() => focusDish(dish.id)}>
              {dish.name}
              <small>
                {dish.values.time !== null
                  ? `${dish.values.time}분`
                  : '구조화 데이터 대기'}
              </small>
            </button>
            <a href={`/recipes/${dish.id}`} aria-label={`${dish.name} 레시피 보기`}>
              ↗
            </a>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 24px 90px;
    color: var(--text);
  }

  .profile h1 {
    font-size: 27px;
  }

  h1 {
    font-size: 36px;
    letter-spacing: -0.05em;
    margin: 12px 0;
  }

  h2 {
    font-size: 25px;
    letter-spacing: -0.035em;
    margin: 8px 0;
  }

  h3 {
    font-size: 19px;
    line-height: 1.5;
    margin: 10px 0;
  }

  p {
    font-size: 16px;
    line-height: 1.75;
    color: var(--text-subtle);
  }

  button,
  select,
  a {
    font: inherit;
    touch-action: manipulation;
  }

  button {
    cursor: pointer;
    color: var(--text);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  a {
    color: inherit;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 3px solid var(--accent);
    outline-offset: 3px;
  }

  .intro,
  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .eyebrow {
    font-size: 14px;
    font-weight: 750;
    letter-spacing: 0.04em;
    color: var(--accent);
  }

  .pill {
    display: inline-block;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 12px;
    text-decoration: none;
    font-size: 15px;
    white-space: nowrap;
  }

  .stats {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    padding: 24px 0 32px;
    font-size: 15px;
    color: var(--text-subtle);
  }

  .stats b {
    font-size: 24px;
    color: var(--text);
    margin-right: 6px;
  }

  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 28px;
    margin-bottom: 24px;
  }

  .sections {
    display: flex;
    flex-direction: column;
  }

  .profile .map {
    order: -1;
  }

  .switch {
    display: flex;
    padding: 5px;
    border: 1px solid var(--border);
    border-radius: 12px;
    gap: 4px;
  }

  .switch button {
    padding: 10px 14px;
    border: 0;
    border-radius: 8px;
    background: none;
    font-size: 15px;
    white-space: nowrap;
  }

  .switch button.active {
    background: var(--primary);
    color: #172018;
    font-weight: 700;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 22px;
    margin: 20px 0;
  }

  .filters label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }

  select {
    padding: 9px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--text);
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 15px;
  }

  .cards article {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px;
    background: var(--surface-subtle);
  }

  .cards p {
    font-size: 14px;
  }

  .cards h3 button {
    border: 0;
    padding: 0;
    text-align: left;
    background: none;
    font-size: inherit;
    font-weight: 750;
  }

  .rank {
    color: var(--accent);
    font-size: 22px;
    font-weight: 800;
  }

  .tag {
    display: inline-block;
    font-size: 14px;
    background: var(--surface-green);
    padding: 7px 10px;
    border-radius: 9px;
    color: var(--accent);
  }

  .notice {
    padding: 18px;
    border-radius: 12px;
    background: var(--surface-subtle);
    font-size: 16px;
    line-height: 1.7;
    margin-bottom: 18px;
  }

  .note {
    font-size: 14px;
  }

  .familiar-list {
    padding-left: 24px;
  }

  .familiar-list li {
    padding: 15px 8px;
    border-bottom: 1px solid var(--border);
  }

  .familiar-list button {
    border: 0;
    background: none;
    font-size: 17px;
    font-weight: 650;
  }

  .familiar-list span {
    float: right;
    font-size: 14px;
    color: var(--text-subtle);
  }

  meter {
    display: block;
    width: 100%;
    height: 9px;
    margin-top: 10px;
    accent-color: var(--accent);
  }

  .facts {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
    margin: 20px 0;
  }

  .facts span {
    font-size: 14px;
    color: var(--text-subtle);
  }

  .facts b {
    display: block;
    font-size: 17px;
    color: var(--text);
    margin-top: 6px;
  }

  .detail-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .primary {
    padding: 12px 18px;
    border: 0;
    border-radius: 12px;
    background: var(--primary);
    color: #172018;
    font-size: 15px;
    font-weight: 700;
  }

  .dish-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    max-height: 480px;
    overflow: auto;
    padding: 4px;
  }

  .dish-list > div {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border: 1px solid var(--border);
    border-radius: 12px;
  }

  .dish-list .recorded {
    border-color: var(--accent);
    background: var(--surface-green);
  }

  .dish-list input {
    width: 19px;
    height: 19px;
    flex-shrink: 0;
    accent-color: var(--accent);
  }

  .dish-list button {
    flex: 1;
    border: 0;
    background: none;
    text-align: left;
    padding: 0;
    font-size: 16px;
    overflow-wrap: anywhere;
  }

  .dish-list small {
    display: block;
    font-size: 14px;
    color: var(--text-subtle);
    margin-top: 5px;
  }

  .dish-list a {
    font-size: 22px;
    text-decoration: none;
  }

  .section-head > span {
    font-size: 14px;
  }

  .detail {
    scroll-margin-top: 85px;
  }

  @media (max-width: 900px) {
    .cards,
    .dish-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .intro,
    .section-head {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  @media (max-width: 560px) {
    main {
      padding: 30px 14px 60px;
    }

    .panel {
      padding: 19px;
    }

    .cards,
    .dish-list {
      grid-template-columns: 1fr;
    }

    .stats {
      gap: 16px;
    }

    .familiar-list span {
      float: none;
      display: block;
      margin-top: 5px;
    }

    .switch {
      width: 100%;
      box-sizing: border-box;
    }

    .switch button {
      flex: 1;
    }
  }
</style>