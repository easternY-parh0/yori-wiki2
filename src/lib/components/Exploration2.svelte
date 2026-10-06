<script lang="ts">
  import { appPath } from '$lib/app-path';
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
      const response = await fetch(appPath('/api/auth/cooked'), {
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
  <header class="document-header">
    <div class="header-content">
      <span class="eyebrow">
        {view === 'profile' ? '나의 요리 기록' : '경험에서 시작하는 탐색'}
      </span>
      <h1>
        {view === 'profile'
          ? `${page.data.user?.nickname ?? '방문자'}님의 요리 지도`
          : '다음엔 무엇을 만들어 볼까요?'}
      </h1>
      <p class="lead">해본 요리를 연결하고, 익숙한 범위에서 한 걸음 더 나아가 보세요.</p>
    </div>
  </header>

  <section class="stats-bar">
    <div class="stat-item">
      <span class="stat-label">전체 요리</span>
      <b class="stat-value">{dishes.length}</b>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <span class="stat-label">해본 요리</span>
      <b class="stat-value">{data.cooked.length}</b>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <span class="stat-label">비교 가능한 축 조합</span>
      <b class="stat-value">{familiar.validPairs}</b>
    </div>
  </section>

  {#if !page.data.user}
    <div class="notice alert-info">
      <a href={appPath('/login')}>로그인</a>하면 해본 요리를 기록하고 나만의 추천을 받을 수 있습니다.
    </div>
  {/if}

  {#if data.loadError || data.cookedError}
    <div role="alert" class="notice alert-error">
      <span>{data.loadError || data.cookedError}</span>
      <button class="small-btn" onclick={() => invalidate('explore:data')}>다시 불러오기</button>
    </div>
  {/if}

  {#if data.warning}
    <p role="status" class="notice alert-warning">{data.warning}</p>
  {/if}

  {#if error}
    <p role="alert" class="notice alert-error">{error}</p>
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

      <p class="description">
        {mode === 'new'
          ? '경험의 범위를 넓히면서, 서로 다른 특성을 가진 요리를 골랐어요.'
          : '내 경험과 가까운 요리를 중심으로, 추천끼리도 조금씩 다르게 골랐어요.'}
      </p>

      <div class="filters-bar">
        <div class="filter-group">
          <label for="limit-select">추천 개수</label>
          <select id="limit-select" bind:value={limit}>
            {#each [5, 8, 10] as n}
              <option value={n}>{n}개</option>
            {/each}
          </select>
        </div>
        <div class="filter-group">
          <label for="time-select">조리 시간</label>
          <select id="time-select" bind:value={minutes}>
            <option value={0}>제한 없음</option>
            <option value={15}>15분 이내</option>
            <option value={30}>30분 이내</option>
            <option value={60}>60분 이내</option>
          </select>
        </div>
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
      <p class="description">두 축을 선택해 모든 요리를 펼쳐보세요. 해본 요리는 초록색으로 표시됩니다.</p>
      {#if ready}
        <ExperienceMap
          {dishes}
          cooked={data.cookedError ? [] : data.cooked}
          onfocus={focusDish}
        />
      {:else}
        <p class="description">지도를 준비하고 있습니다.</p>
      {/if}
    </section>

    <section class="coverage panel">
      <div class="section-head">
        <div>
          <span class="eyebrow">여러 방향에서 확인한 익숙함</span>
          <h2>내 경험과 겹치는 요리</h2>
        </div>
        <span class="badge">기기에서 계산 · 최대 {limit}개</span>
      </div>
      <p class="description">
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
              <div class="familiar-info">
                <button onclick={() => focusDish(row.dish.id)}>
                  {row.dish.name}
                </button>
                <span>{row.hits} / {row.total}개 영역에 포함</span>
              </div>
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
          <div class="fact-card">
            <span class="fact-label">{axis.label}</span>
            <b class="fact-value">
              {focused.values[axis.key] ?? '데이터 대기'}
              {focused.values[axis.key] !== null ? ` ${axis.unit}` : ''}
            </b>
          </div>
        {/each}
      </div>
      <div class="detail-actions">
        <a class="register-button secondary" href={appPath(`/recipes/${focused.id}`)}>
          레시피 자세히 보기
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
        </a>
        <button
          class="primary-btn"
          disabled={!page.data.user || pending || Boolean(data.cookedError)}
          onclick={() => toggleCooked(focused.id)}
        >
          {data.cooked.includes(focused.id)
            ? '해본 요리 기록 취소'
            : '해본 요리로 기록'}
        </button>
      </div>
    {:else}
      <p class="description">지도의 점이나 요리 이름을 선택하면 자세한 정보가 여기에 표시됩니다.</p>
    {/if}
  </section>

  <section class="panel">
    <div class="section-head">
      <div>
        <span class="eyebrow">작은 경험을 차곡차곡</span>
        <h2>전체 요리 · 경험 기록</h2>
      </div>
      <span class="status-indicator" aria-live="polite">
        {pending ? '저장 중…' : '계정에 저장됩니다'}
      </span>
    </div>
    <p class="description">실제로 만들어 본 요리를 체크하세요. 추천 결과만으로 경험 기록이 추가되지는 않습니다.</p>
    {#if !dishes.length}
      <p class="notice">
        등록된 요리가 없습니다. 데이터가 준비되면 여기에 나타납니다.
      </p>
    {:else}
      <div class="dish-list">
        {#each dishes as dish}
          <div class="dish-item" class:recorded={data.cooked.includes(dish.id)}>
            <input
              type="checkbox"
              checked={data.cooked.includes(dish.id)}
              aria-label={`${dish.name} 해본 요리`}
              disabled={!page.data.user || pending || Boolean(data.cookedError)}
              onchange={() => toggleCooked(dish.id)}
            />
            <button class="dish-name-btn" onclick={() => focusDish(dish.id)}>
              <span class="title">{dish.name}</span>
              <small class="time">
                {dish.values.time !== null
                  ? `${dish.values.time}분`
                  : '구조화 데이터 대기'}
              </small>
            </button>
            <a href={appPath(`/recipes/${dish.id}`)} class="link-icon" aria-label={`${dish.name} 레시피 보기`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</main>

<style>
  svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  main {
    width: min(1160px, calc(100% - 48px));
    margin: 0 auto;
    padding: 42px 0px 100px;
    color: var(--text);
  }

  /* Document Header Style */
  .document-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
    padding-bottom: 28px;
    margin-bottom: 25px;
    border-bottom: 1px solid var(--border);
  }

  .header-content {
    max-width: 680px;
  }

  .profile h1 {
    font-size: 32px;
  }

  h1 {
    margin: 4px 0 0;
    font-size: 38px;
    font-weight: 750;
    letter-spacing: -0.075em;
    line-height: 1.25;
  }

  h2 {
    margin: 4px 0 0;
    font-size: 22px;
    font-weight: 750;
    letter-spacing: -0.05em;
  }

  h3 {
    margin: 0 0 8px;
    font-size: 17px;
    font-weight: 750;
    line-height: 1.4;
  }

  .lead {
    margin: 12px 0 0;
    color: var(--text-subtle);
    font-size: 14px;
    line-height: 1.85;
    letter-spacing: -0.015em;
  }

  .description {
    margin: 8px 0 20px;
    color: var(--text-subtle);
    font-size: 14px;
    line-height: 1.6;
  }

  .eyebrow {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--accent);
  }

  /* Register / Action Button */
  .register-button {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 11px 18px;
    border-radius: 10px;
    background: var(--primary);
    color: #0f172a;
    font-size: 13px;
    font-weight: 750;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .register-button:hover {
    background: var(--accent);
    color: #ffffff;
  }

  .register-button.secondary {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
  }

  .register-button.secondary:hover {
    border-color: var(--primary);
    background: var(--surface-subtle);
  }

  .register-button svg {
    width: 15px;
    height: 15px;
  }

  /* Stats Bar */
  .stats-bar {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 16px 24px;
    margin-bottom: 25px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .stat-label {
    font-size: 13px;
    color: var(--text-muted);
  }

  .stat-value {
    font-size: 18px;
    color: var(--text);
    font-weight: 750;
  }

  .stat-divider {
    width: 1px;
    height: 16px;
    background: var(--border);
  }

  /* Panel */
  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    margin-bottom: 25px;
  }

  .sections {
    display: flex;
    flex-direction: column;
  }

  .profile .map {
    order: -1;
  }

  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 20px;
  }

  /* Switch Tab */
  .switch {
    display: flex;
    padding: 4px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface-subtle);
    gap: 4px;
  }

  .switch button {
    padding: 8px 14px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text-subtle);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .switch button.active {
    background: var(--primary);
    color: #0f172a;
    font-weight: 750;
  }

  /* Filters Bar */
  .filters-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    padding: 12px 16px;
    background: var(--surface-subtle);
    border-radius: 12px;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filter-group label {
    font-size: 12px;
    color: var(--text-muted);
  }

  select {
    padding: 7px 12px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--text);
    font-size: 12px;
    outline: 0;
    cursor: pointer;
  }

  select:focus {
    border-color: var(--primary);
  }

  /* Cards Grid */
  .cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .cards article {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px;
    background: var(--surface-subtle);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .cards h3 button {
    border: 0;
    padding: 0;
    text-align: left;
    background: transparent;
    color: var(--text);
    font-size: inherit;
    font-weight: inherit;
    cursor: pointer;
  }

  .cards h3 button:hover {
    color: var(--accent);
  }

  .cards p {
    margin: 0 0 12px;
    font-size: 13px;
    color: var(--text-subtle);
  }

  .rank {
    color: var(--accent);
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 6px;
  }

  .tag {
    display: inline-block;
    align-self: flex-start;
    font-size: 11px;
    font-weight: 700;
    background: var(--surface-yellow);
    padding: 5px 9px;
    border-radius: 6px;
    color: var(--accent);
  }

  /* Notices & Alerts */
  .notice {
    padding: 16px 20px;
    border-radius: 12px;
    background: var(--surface-subtle);
    font-size: 14px;
    color: var(--text-subtle);
    margin-bottom: 20px;
  }

  .alert-info {
    background: var(--surface-yellow);
    color: var(--accent);
  }

  .alert-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
  }

  .alert-warning {
    background: #fffbebfb;
    border: 1px solid #fde68a;
    color: #92400e;
  }

  .small-btn {
    margin-left: 10px;
    padding: 4px 8px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
    font-size: 12px;
    cursor: pointer;
  }

  .note {
    margin-top: 16px;
    font-size: 12px;
    color: var(--text-muted);
  }

  /* Coverage List */
  .badge {
    font-size: 12px;
    color: var(--text-muted);
    background: var(--surface-subtle);
    padding: 6px 12px;
    border-radius: 8px;
  }

  .familiar-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .familiar-list li {
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
  }

  .familiar-list li:last-child {
    border-bottom: 0;
  }

  .familiar-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .familiar-list button {
    border: 0;
    background: transparent;
    font-size: 15px;
    font-weight: 700;
    padding: 0;
    color: var(--text);
    cursor: pointer;
  }

  .familiar-list button:hover {
    color: var(--accent);
  }

  .familiar-list span {
    font-size: 12px;
    color: var(--text-muted);
  }

  meter {
    display: block;
    width: 100%;
    height: 8px;
    border-radius: 4px;
    accent-color: var(--accent);
  }

  /* Detail Section */
  .detail {
    scroll-margin-top: 85px;
  }

  .facts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
    margin: 20px 0;
  }

  .fact-card {
    padding: 12px 16px;
    background: var(--surface-subtle);
    border-radius: 12px;
    border: 1px solid var(--border);
  }

  .fact-label {
    display: block;
    font-size: 12px;
    color: var(--text-muted);
  }

  .fact-value {
    display: block;
    font-size: 15px;
    color: var(--text);
    margin-top: 4px;
    font-weight: 750;
  }

  .detail-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  .primary-btn {
    padding: 11px 18px;
    border: 0;
    border-radius: 10px;
    background: var(--accent);
    color: #ffffff;
    font-size: 13px;
    font-weight: 750;
    cursor: pointer;
  }

  .primary-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Dish Checklist */
  .status-indicator {
    font-size: 12px;
    color: var(--text-muted);
  }

  .dish-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    max-height: 480px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .dish-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    transition: all 0.15s ease;
  }

  .dish-item.recorded {
    border-color: var(--border-green);
    background: var(--surface-green);
  }

  .dish-item input[type='checkbox'] {
    width: 18px;
    height: 18px;
    accent-color: var(--accent);
    cursor: pointer;
  }

  .dish-name-btn {
    flex: 1;
    min-width: 0;
    border: 0;
    background: transparent;
    text-align: left;
    padding: 0;
    cursor: pointer;
  }

  .dish-name-btn .title {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dish-name-btn .time {
    display: block;
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    text-decoration: none;
  }

  .link-icon svg {
    width: 16px;
    height: 16px;
  }

  .link-icon:hover {
    color: var(--accent);
  }

  /* Media Queries */
  @media (max-width: 1000px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
    }

    .dish-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 800px) {
    .document-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 20px;
    }

    .section-head {
      align-items: flex-start;
      flex-direction: column;
      gap: 12px;
    }

    .stats-bar {
      flex-wrap: wrap;
      gap: 12px;
    }

    .stat-divider {
      display: none;
    }
  }

  @media (max-width: 600px) {
    main {
      width: calc(100% - 24px);
    }

    .panel {
      padding: 20px;
    }

    .cards,
    .dish-list {
      grid-template-columns: 1fr;
    }

    .switch {
      width: 100%;
    }

    .switch button {
      flex: 1;
    }
  }
</style>