<script lang="ts">
    import { appPath } from '$lib/app-path';
    import { goto } from '$app/navigation';
    import { page, navigating } from '$app/state';
    import type { loadSearch } from '$lib/load-search';
    import RecipeCard from '$lib/components/layouts/RecipeCard.svelte';
    import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';
    import { getSearchSuggestions } from '../search-suggestions'; 

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
    // 추가 시작
    let recipeQuery = $state('');
    let recipeSearchFocused = $state(false);

    let recipeFoods = $state<
    {
        id: number;
        name: string;
        estimated_time?: string;
    }[]
    >([]);

    let recipeFoodsLoading = $state(false);
    let recipeFoodsLoaded = $state(false);
    let timeFilterOpen = $state(false);  // 추가
    // 추가 시작
    const timeLabels = [
    '제한 없음',
    '15분',
    '30분',
    '1시간',
    '1시간 30분',
    '2시간',
    '2시간 이상'
    ];

    let timeHandleA = $state(0);
    let timeHandleB = $state(6);

    const timeRangeStart = $derived(
    Math.min(timeHandleA, timeHandleB)
    );

    const timeRangeEnd = $derived(
    Math.max(timeHandleA, timeHandleB)
    );
    //추가 끝
    // 추가 시작 
    let difficultyFilterOpen = $state(false);

    let difficultyHandleA = $state(1);
    let difficultyHandleB = $state(10);

    const difficultyRangeStart = $derived(
        Math.min(difficultyHandleA, difficultyHandleB)
    );

    const difficultyRangeEnd = $derived(
        Math.max(difficultyHandleA, difficultyHandleB)
    );

    const difficultyLabels = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10'
    ];
    // 추가 끝
    // 추가 시작 
    async function applyTimeFilter() {
    const timeValues = [
        0,
        15,
        30,
        60,
        90,
        120,
        120
    ];

    const minTime =
        timeRangeStart === 0
            ? null
            : String(timeValues[timeRangeStart]);

    const maxTime =
        timeRangeEnd === 6
            ? null
            : String(timeValues[timeRangeEnd]);

    await updateSearchParams({
        minTime,
        maxTime
    });

    timeFilterOpen = false;
    }

    async function applyDifficultyFilter() {
    const minDifficulty =
        difficultyRangeStart === 1
            ? null
            : String(difficultyRangeStart);

    const maxDifficulty =
        difficultyRangeEnd === 10
            ? null
            : String(difficultyRangeEnd);

    await updateSearchParams({
        minDifficulty,
        maxDifficulty
    });

    difficultyFilterOpen = false;
    }
    //추가 끝
    const recipeSuggestions = $derived.by(() =>
    getSearchSuggestions(
        recipeFoods,
        recipeQuery,
        10
    )
    );  // 추가 끝

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

        // 검색 파라미터 변경 시 페이지 1로 리셋
        if (!('page' in updates)) {
        next.delete('page');
        }

        await goto(`${page.url.pathname}?${next}`, { keepFocus: true, noScroll: true });
    }

    // 폼 제출 함수 
    //교체 시작
    async function handleSearchSubmit(
    e: SubmitEvent
) {
    e.preventDefault();

    const form =
        e.currentTarget as HTMLFormElement;

    const formData =
        new FormData(form);

    const query =
        formData
            .get('q')
            ?.toString()
            .trim() ?? '';

    recipeQuery = query;
    recipeSearchFocused = false;

    await updateSearchParams({
        q: query || null
    });
}  // 교체 끝

    // 필터 초기화
    async function resetFilters() {
    timeHandleA = 0;
    timeHandleB = 6;

    difficultyHandleA = 1;
    difficultyHandleB = 10;

    timeFilterOpen = false;
    difficultyFilterOpen = false;

    await goto(page.url.pathname, {
        keepFocus: true,
        noScroll: true
    });
}
    // 추가 시작
    async function loadRecipeFoods() {
    if (
        recipeFoodsLoaded ||
        recipeFoodsLoading
    ) {
        return;
    }

    recipeFoodsLoading = true;

    try {
        const response = await fetch(
            appPath('/api/food')
        );

        if (!response.ok) {
            throw new Error(
                '레시피 목록을 불러오지 못했습니다.'
            );
        }

        const data = await response.json();

        recipeFoods = Array.isArray(data)
            ? data
            : [];

        recipeFoodsLoaded = true;
    } catch (error) {
        console.error(
            '레시피 연관검색어 로딩 실패:',
            error
        );
    } finally {
        recipeFoodsLoading = false;
    }
}

function closeRecipeSuggestions() {
    window.setTimeout(() => {
        recipeSearchFocused = false;
    }, 150);
}

async function selectRecipeSuggestion(
    recipe: {
        id: number;
        name: string;
    }
) {
    recipeSearchFocused = false;

    await goto(
        appPath(`/recipes/${recipe.id}`)
    );
}
// 추가 끝

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

    const breadcrumbItems = [
		{ label: '요리위키', href: appPath('/') },
		{ label: '레시피' }
	];
</script>

<svelte:head>
    <title>레시피 | 요리위키</title>
    <meta name="description" content="요리위키에서 다양한 레시피를 검색하고 찾아보세요." />
</svelte:head>

<div class="page">
    <main>
        <!-- 페이지 헤더 -->
        <Breadcrumb items={breadcrumbItems} />

        <section class="document-header">
            <div class="header-content">
                <h1>찾고 싶은 요리가 있나요?</h1>
                <p class="lead">요리 이름, 재료, 조리 방법으로 검색해보세요.</p>
            </div>

            <a href={appPath('/recipes/new')} class="register-button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
                </svg>
                레시피 등록하기
            </a>
        </section>

        <!-- 검색 바 & 추천 검색어 -->  <!-- 교체 시작 -->
        <section class="search-section">
            <div class="recipe-search-wrapper">
    <form
        class="recipe-search"
        onsubmit={handleSearchSubmit}
        aria-busy={Boolean(navigating.to)}
    >
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                cx="10.5"
                cy="10.5"
                r="6"
            />
            <path d="M15 15l5 5" />
        </svg>

        <input
            name="q"
            type="search"
            maxlength="100"
            value={params.get('q') ?? ''}
            autocomplete="off"
            placeholder="예: 김치볶음밥, 두부, 파스타"
            onfocus={(event) => {
                recipeQuery =
                    event.currentTarget.value;

                recipeSearchFocused = true;

                void loadRecipeFoods();
            }}
            oninput={(event) => {
                recipeQuery =
                    event.currentTarget.value;

                recipeSearchFocused = true;
            }}
            onblur={closeRecipeSuggestions}
        />

        <button type="submit">
            검색
        </button>
    </form>

    {#if recipeSearchFocused && recipeQuery.trim()}
        {#if recipeFoodsLoading}
            <div class="suggestion-list">
                <div class="suggestion-message">
                    불러오는 중...
                </div>
            </div>

        {:else if recipeSuggestions.length > 0}
            <div
                class="suggestion-list"
                role="listbox"
                aria-label="레시피 연관검색어"
            >
                {#each recipeSuggestions as recipe}
                    <button
                        type="button"
                        // 여기에 role="option"이 있었는데 일단 삭제함 
                        class="suggestion-item"
                        onmousedown={(event) =>
                            event.preventDefault()
                        }
                        onclick={() =>
                            selectRecipeSuggestion(
                                recipe
                            )
                        }
                    >
                        {recipe.name}
                    </button>
                {/each}
            </div>
        {/if}
    {/if}
</div>
<!-- 교체 끝 -->
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
<!--교체 시작-->
               <!-- 조리시간 필터 -->
<div class="filter-group">
    <span class="filter-label">조리시간</span>

    <div class="filter-dropdown">
        <button
            class="filter-trigger"
            type="button"
            onclick={() => {
                timeFilterOpen = !timeFilterOpen;
            }}
        >
            {timeRangeStart === 0 && timeRangeEnd === 6
                ? '제한 없음'
                : `${timeLabels[timeRangeStart]} ~ ${timeLabels[timeRangeEnd]}`}
        </button>

        {#if timeFilterOpen}
            <div class="filter-popup">
                <div class="range-value">
                    {timeLabels[timeRangeStart]} ~ {timeLabels[timeRangeEnd]}
                </div>
                <!--교체 시작--> 
                <div class="range-slider">
    <div class="range-track">
        <div
            class="range-selection"
            style={`left: ${(timeRangeStart / 6) * 100}%; right: ${100 - (timeRangeEnd / 6) * 100}%;`}
        ></div>
    </div> <!--교체 끝-->

    <input
    class="range-control range-control-a"
    type="range"
    min="0"
    max="6"
    step="1"
    value={timeHandleA}
    aria-label="조리시간 범위 손잡이 A"
    oninput={(event) => {
        timeHandleA = Number(
            event.currentTarget.value
        );
    }}
    onchange={applyTimeFilter}
/>

<input
    class="range-control range-control-b"
    type="range"
    min="0"
    max="6"
    step="1"
    value={timeHandleB}
    aria-label="조리시간 범위 손잡이 B"
    oninput={(event) => {
        timeHandleB = Number(
            event.currentTarget.value
        );
    }}
    onchange={applyTimeFilter}
/>
        </div>

                <div class="range-ticks">
                    {#each timeLabels as label}
                        <span>{label}</span>
                    {/each}
                </div>
            </div>  
        {/if}
    </div>
</div>
<!--교체 끝-->
<!--교체 시작-->
                <div class="filter-group">
    <span class="filter-label">난이도</span>

    <div class="filter-dropdown">
        <button
            class="filter-trigger"
            type="button"
            onclick={() => {
                difficultyFilterOpen =
                    !difficultyFilterOpen;
            }}
        >
            {difficultyRangeStart === 1 &&
            difficultyRangeEnd === 10
                ? '전체'
                : `${difficultyRangeStart}단계 ~ ${difficultyRangeEnd}단계`}
        </button>

        {#if difficultyFilterOpen}
            <div class="filter-popup">
                <div class="range-value">
                    {difficultyRangeStart}단계 ~ {difficultyRangeEnd}단계
                </div>

                <div class="range-slider">
                    <div class="range-track">
                        <div
                            class="range-selection"
                            style={`left: ${((difficultyRangeStart - 1) / 9) * 100}%; right: ${100 - ((difficultyRangeEnd - 1) / 9) * 100}%;`}
                        ></div>
                    </div>

                    <input
                        class="range-control range-control-a"
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={difficultyHandleA}
                        aria-label="난이도 범위 손잡이 A"
                        oninput={(event) => {
                            difficultyHandleA =
                                Number(
                                    event.currentTarget.value
                                );
                        }}
                        onchange={applyDifficultyFilter}
                    />

                    <input
                        class="range-control range-control-b"
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={difficultyHandleB}
                        aria-label="난이도 범위 손잡이 B"
                        oninput={(event) => {
                            difficultyHandleB =
                                Number(
                                    event.currentTarget.value
                                );
                        }}
                        onchange={applyDifficultyFilter}
                    />
                </div>

                <div class="difficulty-ticks">
                    {#each difficultyLabels as label, index}
                        <span
                            style={`left: ${(index / 9) * 100}%`}
                        >
                            {label}
                        </span>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>
<!--교체 끝-->
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
                    <RecipeCard
                        id={recipe.id}
                        title={recipe.name}
                        description={
                        typeof recipe.metadata?.description === 'string'
                            ? recipe.metadata.description
                            : recipe.ingredients
                        }
                        category={
                        categories[recipe.metadata?.category as keyof typeof categories] || '미분류'
                        }
                        cookingTime={recipe.estimated_time}
                        href={appPath(`/recipes/${recipe.id}`)}
                    />
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
        padding: 42px 0px 100px;
    }

    /* Document Header */
    .document-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 40px;
        padding-bottom: 28px;
        margin-bottom: 35px;
        border-bottom: 1px solid var(--border);
    }

    .header-content {
        max-width: 680px;
    }

    .document-header h1 {
        margin: 0;
        font-size: 38px;
        font-weight: 750;
        letter-spacing: -0.075em;
        line-height: 1.25;
    }

    .lead {
        margin: 12px 0 0;
        color: var(--text-subtle);
        font-size: 14px;
        line-height: 1.85;
        letter-spacing: -0.015em;
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
        flex-shrink: 0;
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

    /*추가 */
    .recipe-search-wrapper {
    position: relative;
    width: 100%;
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
/*추가 시작*/
.suggestion-list {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    z-index: 100;

    max-height: 320px;
    overflow-y: auto;

    border: 1px solid var(--border);
    border-radius: 13px;
    background: var(--surface);

    box-shadow: 0 12px 30px var(--shadow-menu);
}

.suggestion-item {
    width: 100%;
    min-height: 44px;
    display: block;

    padding: 10px 16px;

    border: 0;
    border-bottom: 1px solid var(--border);

    background: var(--surface);
    color: var(--text);

    font-size: 14px;
    text-align: left;

    cursor: pointer;
}

.suggestion-item:last-child {
    border-bottom: 0;
}

.suggestion-item:hover,
.suggestion-item:focus {
    background: var(--surface-yellow);
}

.suggestion-message {
    padding: 12px 16px;

    color: var(--text-subtle);
    font-size: 13px;
}
/*추가 끝*/
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
            /* 추가 시작 */

            .filter-dropdown {
        position: relative;
    }
    .filter-label {
        color: var(--text-muted);
        font-size: 12px;
    }

.filter-trigger {
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--text);
    font-size: 12px;
    cursor: pointer;
}

.filter-trigger:hover {
    border-color: var(--primary);
}

.filter-popup {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 50;

    width: 480px; /*추가*/
    max-width: calc(100vw - 32px); /*추가*/
    padding: 20px;

    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);

    box-shadow: 0 10px 30px var(--shadow-menu);
}

.range-value {
    margin-bottom: 16px;
    color: var(--text);
    font-size: 12px;
    font-weight: 600;
}

.range-slider {
    position: relative;
    width: 100%;
    height: 40px;
}

/* 실제 화면에 보이는 선은 이것 딱 하나 */
.range-track {
    position: absolute;
    top: 18px;
    left: 9px;
    right: 9px;
    height: 4px;
    border-radius: 999px;
    background: var(--border);
    pointer-events: none;
}

/* 두 range를 같은 위치에 완전히 겹침 */
input.range-control {
    position: absolute;
    top: 6px; 
    left: 0;

    width: 100%;
    height: 28px;
    margin: 0;
    padding: 0;

    border: 0;
    background: transparent;

    appearance: none;
    -webkit-appearance: none;

    pointer-events: none;
}

/* Chrome / Edge 기본 바 완전히 숨김 */
input.range-control::-webkit-slider-runnable-track {
    height: 4px;
    border: 0;
    background: transparent;
    box-shadow: none;
}

/* Chrome / Edge 손잡이만 표시 */
input.range-control::-webkit-slider-thumb {
    width: 18px;
    height: 18px;
    margin-top: -7px;

    border: 2px solid var(--accent);
    border-radius: 50%;
    background: var(--surface);

    appearance: none;
    -webkit-appearance: none;

    cursor: pointer;
    pointer-events: auto;
}

/* 조리시간 손잡이 A */
.range-control-a::-webkit-slider-thumb {
    border: 2px solid var(--accent);
    background: var(--accent);
}

/* 조리시간 손잡이 B */
.range-control-b::-webkit-slider-thumb {
    border: 2px solid #d59b00;
    background: var(--primary);
}

.range-control-a::-moz-range-thumb {
    border: 2px solid var(--accent);
    background: var(--accent);
}

.range-control-b::-moz-range-thumb {
    border: 2px solid #d59b00;
    background: var(--primary);
}

/* Firefox 기본 바 숨김 */
input.range-control::-moz-range-track {
    height: 4px;
    border: 0;
    background: transparent;
    box-shadow: none;
}

input.range-control::-moz-range-progress {
    background: transparent;
}

/* Firefox 손잡이만 표시 */
input.range-control::-moz-range-thumb {
    width: 18px;
    height: 18px;

    border: 2px solid var(--accent);
    border-radius: 50%;
    background: var(--surface);

    cursor: pointer;
    pointer-events: auto;
}

.range-control-a {
    z-index: 2;
}

.range-control-b {
    z-index: 3;
}

.range-ticks {
    position: relative;
    height: 18px;
    margin-top: 6px;
    margin-left: 9px;
    margin-right: 9px;
}

.range-ticks span {
    position: absolute;
    top: 0;
    color: var(--text-muted);
    font-size: 10px;
    line-height: 1.25;
    white-space: nowrap;
    transform: translateX(-50%);
}

.range-ticks span:nth-child(1) {
    left: 0%;
    transform: translateX(-50%);
}

.range-ticks span:nth-child(2) {
    left: 16.6667%;
}

.range-ticks span:nth-child(3) {
    left: 33.3333%;
}

.range-ticks span:nth-child(4) {
    left: 50%;
}

.range-ticks span:nth-child(5) {
    left: 66.6667%;
}

.range-ticks span:nth-child(6) {
    left: 83.3333%;
}

.range-ticks span:nth-child(7) {
    left: 100%;
    transform: translateX(-50%);
}
.range-selection {
    position: absolute;
    top: 0;
    bottom: 0;

    border-radius: inherit;
    background: var(--accent);

    pointer-events: none;
}


.difficulty-ticks {
    position: relative;
    height: 18px;
    margin-top: 6px;
    margin-left: 9px;
    margin-right: 9px;
}

.difficulty-ticks span {
    position: absolute;
    top: 0;

    color: var(--text-muted);
    font-size: 10px;
    line-height: 1.25;
    white-space: nowrap;

    transform: translateX(-50%);
}
/*추가 끝*/

</style>