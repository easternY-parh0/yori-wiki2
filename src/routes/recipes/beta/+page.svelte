<script lang="ts">
  import { appPath } from '$lib/app-path';
  import { goto } from '$app/navigation';
  import { page, navigating } from '$app/state';
  import type { loadSearch } from '$lib/load-search';

  let { data }: { data: Awaited<ReturnType<typeof loadSearch>> } = $props();

  // 매핑 상수 정의
  const categories: Record<string, string> = {
    KOREAN: '한식',
    CHINESE: '중식',
    JAPANESE: '일식',
    WESTERN: '양식',
    BAKING: '베이킹',
    SNACK: '간식'
  };

  const labels: Record<string, string> = {
    name: '이름',
    aliases: '별칭',
    ingredients: '재료',
    recipe: '조리 방법'
  };

  const popularKeywords = ['김치볶음밥', '파스타', '계란요리', '두부'];

  // URL 반응형 데이터 ($derived)
  const params = $derived(page.url.searchParams);
  const result = $derived(data.result);

  // 검색 파라미터 업데이트 제출 처리
  async function updateSearchParams(updates: Record<string, string | null>) {
    const next = new URLSearchParams(params);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    // 검색 파라미터 변경 시 페이지 1로 리셋 (page 업데이트가 따로 없다면)
    if (!('page' in updates)) {
      next.delete('page');
    }

    await goto(`${page.url.pathname}?${next}`, { keepFocus: true, noScroll: true });
  }

  // 폼 제출 함수
  async function handleSearchSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const query = formData.get('q')?.toString().trim() ?? '';
    
    updateSearchParams({ q: query || null });
  }

  // 필터 초기화
  async function resetFilters() {
    await goto(page.url.pathname, { keepFocus: true, noScroll: true });
  }

  // 페이지 이동 링크 생성
  function pageHref(number: number) {
    const next = new URLSearchParams(params);
    next.set('page', String(number));
    return `${page.url.pathname}?${next}`;
  }

  // 페이지네이션 번호 배열 계산
  const pageNumbers = $derived(
    result
      ? Array.from(
          { length: Math.min(7, result.pages) },
          (_, i) => Math.max(1, Math.min(result.page - 3, result.pages - 6)) + i
        )
      : []
  );
</script>

<svelte:head>
  <title>레시피 | 요리위키</title>
  <meta name="description" content="요리위키에서 다양한 레시피를 검색하고 찾아보세요." />
</svelte:head>

<div class="page">
  <main>
    <!-- 페이지 헤더 -->
    <section class="page-heading">
      <div>
        <span class="eyebrow">레시피 검색</span>
        <h1>찾고 싶은 요리가 있나요?</h1>
        <p>요리 이름, 재료, 조리 방법으로 검색해보세요.</p>
      </div>

      <a href={appPath('/recipes/new')} class="register-button">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
        레시피 등록하기
      </a>
    </section>

    <!-- 검색 바 & 추천 검색어 -->
    <section class="search-section">
      <form class="recipe-search" onsubmit={handleSearchSubmit} aria-busy={Boolean(navigating.to)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="M15 15l5 5" />
        </svg>

        <input
          name="q"
          type="search"
          maxlength="100"
          value={params.get('q') ?? ''}
          placeholder="예: 김치볶음밥, 두부, 파스타"
        />

        <button type="submit">검색</button>
      </form>

      <div class="popular-searches">
        <span>추천 검색어</span>
        {#each popularKeywords as keyword}
          <button
            type="button"
            onclick={() => updateSearchParams({ q: keyword })}
          >
            {keyword}
          </button>
        {/each}
      </div>
    </section>

    <!-- 카테고리 탭 -->
    <section class="category-section">
      <div class="section-heading">
        <h2>카테고리</h2>
      </div>

      <div class="category-tabs">
        <button
          class:active={!params.get('category')}
          type="button"
          onclick={() => updateSearchParams({ category: null })}
        >
          전체
        </button>
        {#each Object.entries(categories) as [key, label]}
          <button
            class:active={params.get('category') === key}
            type="button"
            onclick={() => updateSearchParams({ category: key })}
          >
            {label}
          </button>
        {/each}
      </div>
    </section>

    <!-- 필터 & 정렬 -->
    <section class="filter-section">
      <div class="filter-left">
        <div class="filter-group">
          <label for="field">검색 범위</label>
          <select
            id="field"
            value={params.get('field') || 'all'}
            onchange={(e) => updateSearchParams({ field: e.currentTarget.value })}
          >
            <option value="all">전체</option>
            <option value="name">이름·별칭</option>
            <option value="ingredients">재료</option>
            <option value="recipe">조리 방법</option>
            <option value="aliases">별칭</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="mode">검색 방식</label>
          <select
            id="mode"
            value={params.get('mode') || 'and'}
            onchange={(e) => updateSearchParams({ mode: e.currentTarget.value })}
          >
            <option value="and">모두 포함 (AND)</option>
            <option value="or">하나 이상 (OR)</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="maxTime">조리시간</label>
          <select
            id="maxTime"
            value={params.get('maxTime') || ''}
            onchange={(e) => updateSearchParams({ maxTime: e.currentTarget.value || null })}
          >
            <option value="">제한 없음</option>
            <option value="15">15분 이내</option>
            <option value="30">30분 이내</option>
            <option value="60">1시간 이내</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="maxDifficulty">난이도</label>
          <select
            id="maxDifficulty"
            value={params.get('maxDifficulty') || ''}
            onchange={(e) => updateSearchParams({ maxDifficulty: e.currentTarget.value || null })}
          >
            <option value="">전체</option>
            {#each Array.from({ length: 10 }, (_, i) => i + 1) as level}
              <option value={level}>{level}단계 이하</option>
            {/each}
          </select>
        </div>

        <button class="reset-button" type="button" onclick={resetFilters}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12a8 8 0 1 0 2.34-5.66" />
            <path d="M4 5v5h5" />
          </svg>
          초기화
        </button>
      </div>

      <div class="sort-box">
        <label for="sort">정렬</label>
        <select
          id="sort"
          value={params.get('sort') || 'relevance'}
          onchange={(e) => updateSearchParams({ sort: e.currentTarget.value })}
        >
          <option value="relevance">관련도순</option>
          <option value="time">조리 시간순</option>
          <option value="difficulty">난이도순</option>
          <option value="likes">좋아요순</option>
          <option value="newest">최신순</option>
        </select>
      </div>
    </section>

    <!-- 검색 상태 & 결과 목록 -->
    <section class="result-section" aria-live="polite" aria-busy={Boolean(navigating.to)}>
      {#if navigating.to}
        <div class="status-msg"><p role="status">검색 중…</p></div>
      {/if}

      {#if data.error}
        <div class="empty-state">
          <p role="alert">{data.error}</p>
          <button type="button" onclick={resetFilters}>검색 초기화</button>
        </div>
      {:else if result}
        <div class="result-heading">
          <div>
            <h2>{result.query === null ? '전체 레시피' : `“${result.query}” 검색 결과`}</h2>
            <span>총 {result.total}개{result.pages ? ` · ${result.page}/${result.pages}페이지` : ''}</span>
          </div>
        </div>

        {#if result.warning}
          <p class="warning-msg" role="status">{result.warning}</p>
        {/if}

        {#if result.query === ''}
          <div class="empty-state">
            <p>검색어를 입력해주세요. 전체 요리를 보려면 초기화를 눌러주세요.</p>
          </div>
        {:else if !result.items.length}
          <div class="empty-state">
            <p>검색 결과가 없습니다. 다른 검색어나 필터를 사용해보세요.</p>
          </div>
        {:else}
          <div class="recipe-grid">
            {#each result.items as recipe (recipe.id)}
              <a href={appPath(`/recipes/beta/${recipe.id}`)} class="recipe-card">
                <div class="recipe-image">
                  <span>{recipe.name}</span>
                  <button
                    class="bookmark-button"
                    type="button"
                    aria-label="즐겨찾기"
                    onclick={(e) => e.preventDefault()}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 4h12v17l-6-4-6 4z" />
                    </svg>
                  </button>
                </div>

                <div class="recipe-content">
                  <div class="recipe-category">
                    {categories[recipe.metadata?.category as keyof typeof categories] || '미분류'}
                  </div>

                  <h3>{recipe.name}</h3>

                  <p>
                    {typeof recipe.metadata?.description === 'string'
                      ? recipe.metadata.description
                      : recipe.ingredients}
                  </p>

                  <div class="recipe-meta">
                    <span>{recipe.estimated_time}</span>
                    <span>재료 {String(recipe.metadata?.ingredient_count ?? '—')}개</span>
                    <span>난이도 {recipe.metadata?.difficulty == null ? '미등록' : `${recipe.metadata.difficulty}/10`}</span>
                  </div>

                  {#if recipe.matchingFields.length}
                    <div class="matching-fields">
                      <small>{recipe.matchingFields.map((key) => labels[key]).join(' · ')} 일치</small>
                    </div>
                  {/if}
                </div>
              </a>
            {/each}
          </div>
        {/if}

        <!-- 페이지네이션 -->
        {#if result.pages > 1}
          <section class="pagination-section">
            <nav class="pagination" aria-label="검색 결과 페이지">
              {#if result.page > 1}
                <a href={pageHref(result.page - 1)} rel="prev" aria-label="이전 페이지">
                  <svg viewBox="0 0 24 24"><path d="M14 6l-6 6 6 6" /></svg>
                </a>
              {/if}

              {#each pageNumbers as number}
                <a
                  href={pageHref(number)}
                  class:active={number === result.page}
                  aria-current={number === result.page ? 'page' : undefined}
                >
                  {number}
                </a>
              {/each}

              {#if result.page < result.pages}
                <a href={pageHref(result.page + 1)} rel="next" aria-label="다음 페이지">
                  <svg viewBox="0 0 24 24"><path d="M10 6l6 6-6 6" /></svg>
                </a>
              {/if}
            </nav>
          </section>
        {/if}
      {/if}
    </section>

    <!-- 등록 CTA -->
    <section class="register-section">
      <div>
        <span>직접 만든 레시피가 있나요?</span>
        <h2>나만의 레시피를<br />요리위키에 등록해보세요.</h2>
        <p>다른 사람들과 맛있는 요리 이야기를 나눠보세요.</p>
      </div>

      <a href={appPath('/recipes/new')} class="register-cta">
        레시피 등록하기
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </a>
    </section>
  </main>
</div>

<style>
  :global(:root) {
    --background: #ffffff;
    --surface: #ffffff;
    --surface-subtle: #f8fafc;
    --surface-yellow: #fefce8;
    --surface-green: #f7fee7;
    --primary: #facc15;
    --accent: #65a30d;
    --text: #0f172a;
    --text-subtle: #64748b;
    --text-muted: #94a3b8;
    --border: #e2e8f0;
    --border-green: #d9f99d;
    --border-accent: #a3e635;
    --overlay: rgba(15, 23, 42, 0.25);
    --shadow-card: rgba(15, 23, 42, 0.07);
    --shadow-menu: rgba(15, 23, 42, 0.1);
  }

  :global(:root.dark-theme) {
    --background: #0f172a;
    --surface: #1e293b;
    --surface-subtle: #172235;
    --surface-yellow: #292614;
    --surface-green: #172414;
    --primary: #facc15;
    --accent: #84cc16;
    --text: #f8fafc;
    --text-subtle: #94a3b8;
    --text-muted: #94a3b8;
    --border: #334155;
    --border-green: #365314;
    --border-accent: #65a30d;
    --overlay: rgba(2, 6, 23, 0.72);
    --shadow-card: rgba(0, 0, 0, 0.22);
    --shadow-menu: rgba(0, 0, 0, 0.35);
  }

  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    background: var(--background);
    color: var(--text);
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  :global(button),
  :global(input),
  :global(select) {
    font: inherit;
  }

  .page {
    min-height: 100vh;
    background: var(--background);
    color: var(--text);
    transition: background-color 0.2s ease, color 0.2s ease;
  }

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
    padding-bottom: 80px;
  }

  .eyebrow {
    color: var(--accent);
    font-size: 13px;
    font-weight: 750;
  }

  .page-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 30px;
    padding: 55px 8px 35px;
  }

  .page-heading h1 {
    margin: 6px 0 9px;
    font-size: 42px;
    letter-spacing: -0.07em;
  }

  .page-heading p {
    margin: 0;
    color: var(--text-subtle);
    font-size: 14px;
  }

  .register-button {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 11px 15px;
    border-radius: 10px;
    background: var(--primary);
    color: #0f172a;
    font-size: 13px;
    font-weight: 750;
    white-space: nowrap;
  }

  .register-button:hover {
    background: var(--accent);
    color: #ffffff;
  }

  .register-button svg {
    width: 15px;
    height: 15px;
  }

  .search-section {
    margin: 0;
    padding: 25px;
    border: 1px solid var(--border);
    border-radius: 20px;
    background: var(--surface);
  }

  .recipe-search {
    height: 56px;
    display: flex;
    align-items: center;
    padding: 4px 4px 4px 16px;
    border: 1px solid var(--border);
    border-radius: 13px;
    background: var(--surface-subtle);
  }

  .recipe-search:focus-within {
    border-color: var(--primary);
  }

  .recipe-search > svg {
    width: 19px;
    height: 19px;
    margin-right: 9px;
    color: var(--accent);
  }

  .recipe-search input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--text);
    font-size: 15px;
  }

  .recipe-search button {
    height: 46px;
    padding: 0 21px;
    border: 0;
    border-radius: 9px;
    background: var(--primary);
    color: #0f172a;
    font-size: 14px;
    font-weight: 750;
    cursor: pointer;
  }

  .recipe-search button:hover {
    background: var(--accent);
    color: #ffffff;
  }

  .popular-searches {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 13px;
  }

  .popular-searches > span {
    margin-right: 3px;
    color: var(--text-muted);
    font-size: 12px;
  }

  .popular-searches button {
    padding: 5px 12px;
    border: 0;
    border-radius: 999px;
    background: var(--surface-yellow);
    color: var(--accent);
    font-size: 12px;
    cursor: pointer;
  }

  .category-section {
    margin-top: 38px;
  }

  .section-heading h2 {
    margin: 0 0 15px;
    font-size: 18px;
    letter-spacing: -0.05em;
  }

  .category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .category-tabs button {
    padding: 9px 16px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
    color: var(--text-subtle);
    font-size: 13px;
    cursor: pointer;
    transition: 0.15s ease;
  }

  .category-tabs button:hover {
    border-color: var(--primary);
    color: var(--text);
  }

  .category-tabs button.active {
    border-color: var(--primary);
    background: var(--primary);
    color: #0f172a;
    font-weight: 750;
  }

  .filter-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 30px;
    padding: 14px 16px;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .filter-left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .filter-group,
  .sort-box {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .filter-group label,
  .sort-box label {
    color: var(--text-muted);
    font-size: 12px;
  }

  select {
    padding: 8px 12px;
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

  .reset-button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 8px 10px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text-muted);
    font-size: 12px;
    cursor: pointer;
  }

  .reset-button:hover {
    background: var(--surface-subtle);
    color: var(--accent);
  }

  .reset-button svg {
    width: 13px;
    height: 13px;
  }

  .result-section {
    margin-top: 40px;
  }

  .result-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 18px;
  }

  .result-heading h2 {
    margin: 0;
    font-size: 22px;
    letter-spacing: -0.05em;
  }

  .result-heading span {
    display: block;
    margin-top: 5px;
    color: var(--text-muted);
    font-size: 13px;
  }

  .status-msg,
  .warning-msg {
    margin-bottom: 15px;
    color: var(--accent);
    font-size: 14px;
  }

  .empty-state {
    padding: 40px;
    border-radius: 16px;
    background: var(--surface-subtle);
    text-align: center;
    color: var(--text-subtle);
  }

  .empty-state button {
    margin-top: 10px;
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    cursor: pointer;
  }

  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .recipe-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: 17px;
    background: var(--surface);
    transition: 0.18s ease;
  }

  .recipe-card:hover {
    transform: translateY(-3px);
    border-color: var(--primary);
    box-shadow: 0 12px 25px var(--shadow-card);
  }

  .recipe-image {
    position: relative;
    height: 160px;
    display: grid;
    place-items: center;
    padding: 10px;
    background: var(--surface-yellow);
    color: var(--accent);
    font-size: 13px;
    font-weight: 700;
    text-align: center;
  }

  .bookmark-button {
    position: absolute;
    top: 11px;
    right: 11px;
    width: 31px;
    height: 31px;
    display: grid;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
  }

  .bookmark-button:hover {
    background: var(--primary);
    color: #0f172a;
  }

  .bookmark-button svg {
    width: 15px;
    height: 15px;
  }

  .recipe-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 15px;
  }

  .recipe-category {
    color: var(--accent);
    font-size: 12px;
    font-weight: 750;
  }

  .recipe-content h3 {
    margin: 6px 0;
    font-size: 16px;
    letter-spacing: -0.04em;
  }

  .recipe-content p {
    min-height: 40px;
    margin: 0 0 14px;
    color: var(--text-subtle);
    font-size: 13px;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  .recipe-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid var(--border);
    color: var(--text-subtle);
    font-size: 12px;
  }

  .recipe-meta span:not(:last-child)::after {
    content: "·";
    margin-left: 7px;
  }

  .matching-fields {
    margin-top: 8px;
  }

  .matching-fields small {
    color: var(--accent);
    font-size: 11px;
  }

  .pagination-section {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }

  .pagination {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .pagination a {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 9px;
    background: var(--surface);
    color: var(--text-subtle);
    font-size: 12px;
    text-decoration: none;
  }

  .pagination a:hover {
    border-color: var(--primary);
    background: var(--surface-yellow);
    color: var(--text);
  }

  .pagination a.active {
    border-color: var(--primary);
    background: var(--primary);
    color: #0f172a;
    font-weight: 750;
  }

  .pagination svg {
    width: 15px;
    height: 15px;
  }

  .register-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    margin-top: 65px;
    padding: 30px 35px;
    border-radius: 20px;
    background: var(--surface-green);
    border: 1px solid var(--border-green);
  }

  .register-section > div > span {
    color: var(--accent);
    font-size: 12px;
    font-weight: 800;
  }

  .register-section h2 {
    margin: 7px 0 8px;
    font-size: 23px;
    line-height: 1.3;
    letter-spacing: -0.06em;
  }

  .register-section p {
    margin: 0;
    color: var(--text-subtle);
    font-size: 13px;
  }

  .register-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 15px;
    border-radius: 9px;
    background: var(--accent);
    color: #ffffff;
    font-size: 13px;
    font-weight: 750;
    white-space: nowrap;
  }

  .register-cta:hover {
    filter: brightness(1.08);
  }

  .register-cta svg {
    width: 14px;
    height: 14px;
  }

  @media (max-width: 1000px) {
    .recipe-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .page-heading {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  @media (max-width: 800px) {
    .recipe-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .filter-section {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  @media (max-width: 600px) {
    main {
      width: calc(100% - 24px);
    }

    .page-heading {
      padding: 40px 6px 25px;
    }

    .page-heading h1 {
      font-size: 36px;
    }

    .search-section {
      padding: 18px;
    }

    .recipe-search {
      height: 52px;
    }

    .recipe-search button {
      height: 42px;
      padding: 0 15px;
    }

    .category-tabs button {
      padding: 8px 12px;
    }

    .recipe-grid {
      grid-template-columns: 1fr;
    }

    .register-section {
      align-items: flex-start;
      flex-direction: column;
      padding: 25px 22px;
    }
  }
</style>