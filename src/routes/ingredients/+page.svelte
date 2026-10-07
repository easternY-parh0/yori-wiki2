<script lang="ts">
    import { appPath } from '$lib/app-path';
    import { onMount } from 'svelte';

    import ingredientHeroImg from '$lib/assets/image/hero.jpg';
    import noImage from '$lib/assets/image/no-image.png';
	import PreparingModal from '$lib/components/layouts/PreparingModal.svelte';

	let isPreparingOpen = $state(true);

    type Ingredient = {
        name: string;
        category: string;
        description: string;
        storage: string;
        tags: string[];
    };

    const categories = [
        { name: '채소', value: 'VEGETABLE', icon: 'fa-solid fa-carrot' },
        { name: '과일', value: 'FRUIT', icon: 'fa-solid fa-apple-whole' },
        { name: '육류', value: 'MEAT', icon: 'fa-solid fa-drumstick-bite' },
        { name: '해산물', value: 'SEAFOOD', icon: 'fa-solid fa-fish' },
        { name: '곡류', value: 'GRAIN', icon: 'fa-solid fa-wheat-awn' },
        { name: '조미료', value: 'SEASONING', icon: 'fa-solid fa-jar' },
        { name: '유제품', value: 'DAIRY', icon: 'fa-solid fa-cow' },
        { name: '견과류', value: 'NUT', icon: 'fa-solid fa-seedling' }
    ];

    const popularIngredients: Ingredient[] = [
        {
            name: '양파',
            category: '채소',
            description: '다양한 요리에 기본적으로 사용되는 대표적인 향신 채소입니다.',
            storage: '서늘하고 건조한 곳',
            tags: ['기본재료', '채소', '볶음']
        },
        {
            name: '마늘',
            category: '채소',
            description: '한국 요리에서 빠지지 않는 대표적인 향신료입니다.',
            storage: '통풍이 잘되는 서늘한 곳',
            tags: ['향신료', '기본재료', '한식']
        },
        {
            name: '대파',
            category: '채소',
            description: '국물과 볶음 요리에 풍미를 더해주는 대표적인 채소입니다.',
            storage: '냉장 보관',
            tags: ['채소', '국물', '볶음']
        },
        {
            name: '감자',
            category: '채소',
            description: '찌개, 볶음, 전 등 다양한 요리에 활용할 수 있는 식재료입니다.',
            storage: '빛이 없는 서늘한 곳',
            tags: ['채소', '전분', '구황작물']
        },
        {
            name: '당근',
            category: '채소',
            description: '색과 단맛을 더해주는 활용도가 높은 채소입니다.',
            storage: '냉장 보관',
            tags: ['채소', '볶음', '샐러드']
        },
        {
            name: '돼지고기',
            category: '육류',
            description: '구이, 찌개, 볶음 등 다양한 요리에 사용되는 대표적인 육류입니다.',
            storage: '냉장 또는 냉동 보관',
            tags: ['육류', '구이', '찌개']
        }
    ];

    const recentIngredients: Ingredient[] = [
        {
            name: '애호박',
            category: '채소',
            description: '부드러운 식감과 은은한 단맛이 특징인 채소입니다.',
            storage: '냉장 보관',
            tags: ['채소', '찌개', '전']
        },
        {
            name: '새우',
            category: '해산물',
            description: '볶음밥부터 파스타까지 폭넓게 활용되는 해산물입니다.',
            storage: '냉장 또는 냉동 보관',
            tags: ['해산물', '볶음', '파스타']
        },
        {
            name: '사과',
            category: '과일',
            description: '아삭한 식감과 달콤한 맛을 가진 대표적인 과일입니다.',
            storage: '냉장 보관',
            tags: ['과일', '디저트', '간식']
        },
        {
            name: '두부',
            category: '기타',
            description: '콩으로 만든 식재료로 찌개와 반찬에 다양하게 활용됩니다.',
            storage: '냉장 보관',
            tags: ['콩', '단백질', '찌개']
        }
    ];

    let searchQuery = $state('');
    let selectedCategory = $state('ALL');
    let currentPage = $state(1);

    const itemsPerPage = 8;

    let filteredIngredients = $derived(
        [...popularIngredients, ...recentIngredients].filter((ingredient) => {
            const matchesCategory =
                selectedCategory === 'ALL' ||
                ingredient.category ===
                    categories.find((category) => category.value === selectedCategory)?.name;

            const query = searchQuery.trim().toLowerCase();

            const matchesSearch =
                !query ||
                ingredient.name.toLowerCase().includes(query) ||
                ingredient.description.toLowerCase().includes(query) ||
                ingredient.tags.some((tag) => tag.toLowerCase().includes(query));

            return matchesCategory && matchesSearch;
        })
    );

    let totalPages = $derived(
        Math.max(1, Math.ceil(filteredIngredients.length / itemsPerPage))
    );

    let visibleIngredients = $derived(
        filteredIngredients.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
    );

    function selectCategory(value: string) {
        selectedCategory = value;
        currentPage = 1;
    }

    function handleSearch() {
        currentPage = 1;
    }

    function previousPage() {
        if (currentPage > 1) {
            currentPage -= 1;
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage += 1;
        }
    }

    function goToPage(page: number) {
        currentPage = page;
    }
</script>

<svelte:head>
    <title>식재료 위키 | 요리위키</title>
    <meta
        name="description"
        content="식재료의 특징과 손질법, 보관법을 찾아보세요."
    />
    <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
    />
</svelte:head>

<PreparingModal bind:open={isPreparingOpen} />

<div class="page">
    <main>

        <!-- =========================================
             HERO
        ========================================== -->
        <section class="wiki-hero">
            <div class="wiki-hero-content">
                <span class="hero-label">INGREDIENT WIKI</span>

                <h1>
                    식재료에 대한<br />
                    <span>모든 정보</span>를 찾아보세요.
                </h1>

                <p>
                    식재료의 특징부터 손질 방법과 보관 방법까지<br />
                    요리에 필요한 정보를 한곳에서 확인할 수 있습니다.
                </p>

                <form
                    class="wiki-search"
                    onsubmit={(event) => {
                        event.preventDefault();
                        handleSearch();
                    }}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="10.5" cy="10.5" r="6" />
                        <path d="M15 15l5 5" />
                    </svg>

                    <input
                        bind:value={searchQuery}
                        type="search"
                        maxlength="100"
                        aria-label="식재료 검색"
                        placeholder="식재료 이름을 검색하세요"
                    />

                    <button type="submit">
                        검색
                    </button>
                </form>
            </div>

            <div class="wiki-hero-image">
                <img src={ingredientHeroImg} alt="다양한 식재료 이미지" />
                <div class="hero-image-overlay"></div>
            </div>
        </section>

        <!-- =========================================
             CATEGORY
        ========================================== -->
        <section class="category-section">
            <div class="section-title">
                <div>
                    <span class="section-label">CATEGORY</span>
                    <h2>식재료 카테고리</h2>
                </div>

                <span class="result-count">
                    총 {filteredIngredients.length}개의 식재료
                </span>
            </div>

            <div class="category-grid">
                <button
                    type="button"
                    class:active={selectedCategory === 'ALL'}
                    class="category-card"
                    onclick={() => selectCategory('ALL')}
                >
                    <div class="category-icon all-icon">
                        <i class="fa-solid fa-border-all"></i>
                    </div>
                    <strong>전체</strong>
                </button>

                {#each categories as category}
                    <button
                        type="button"
                        class:active={selectedCategory === category.value}
                        class="category-card"
                        onclick={() => selectCategory(category.value)}
                    >
                        <div class="category-icon">
                            <i class={category.icon}></i>
                        </div>
                        <strong>{category.name}</strong>
                    </button>
                {/each}
            </div>
        </section>

        <!-- =========================================
             POPULAR INGREDIENTS
        ========================================== -->
        <section class="popular-section">

            <div class="section-title">
                <div>
                    <span class="section-label">POPULAR</span>
                    <h2>많이 찾는 식재료</h2>
                </div>

                <a href={appPath('/ingredients/popular')}>
                    전체보기
                </a>
            </div>

            <div class="popular-grid">
                {#each popularIngredients.slice(0, 4) as ingredient}
                    <a
                        href={appPath(
                            `/ingredients/${encodeURIComponent(ingredient.name)}`
                        )}
                        class="popular-card"
                    >
                        <div class="popular-image">
                            <img
                                src={noImage}
                                alt={`${ingredient.name} 이미지`}
                            />
                        </div>

                        <div class="popular-content">
                            <span>{ingredient.category}</span>

                            <h3>{ingredient.name}</h3>

                            <p>
                                {ingredient.description}
                            </p>

                            <div class="card-arrow">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M5 12h14" />
                                    <path d="M13 6l6 6-6 6" />
                                </svg>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        </section>

        <!-- =========================================
             INGREDIENT LIST
        ========================================== -->
        <section class="ingredient-section">

            <div class="section-title">
                <div>
                    <span class="section-label">INGREDIENTS</span>
                    <h2>
                        {selectedCategory === 'ALL'
                            ? '전체 식재료'
                            : categories.find(
                                  (category) =>
                                      category.value === selectedCategory
                              )?.name}
                    </h2>
                </div>

                {#if searchQuery}
                    <button
                        type="button"
                        class="clear-search"
                        onclick={() => {
                            searchQuery = '';
                            currentPage = 1;
                        }}
                    >
                        검색 초기화
                    </button>
                {/if}
            </div>

            {#if visibleIngredients.length > 0}

                <div class="ingredient-grid">
                    {#each visibleIngredients as ingredient}
                        <a
                            href={appPath(
                                `/ingredients/${encodeURIComponent(ingredient.name)}`
                            )}
                            class="ingredient-card"
                        >
                            <div class="ingredient-image">
                                <img
                                    src={noImage}
                                    alt={`${ingredient.name} 이미지`}
                                />

                                <span class="ingredient-category">
                                    {ingredient.category}
                                </span>
                            </div>

                            <div class="ingredient-card-content">
                                <h3>{ingredient.name}</h3>

                                <p>
                                    {ingredient.description}
                                </p>

                                <div class="storage">
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <rect
                                            x="4"
                                            y="5"
                                            width="16"
                                            height="15"
                                            rx="2"
                                        />
                                        <path d="M8 3v4" />
                                        <path d="M16 3v4" />
                                        <path d="M4 10h16" />
                                    </svg>

                                    <span>
                                        {ingredient.storage}
                                    </span>
                                </div>

                                <div class="tags">
                                    {#each ingredient.tags as tag}
                                        <span>#{tag}</span>
                                    {/each}
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>

            {:else}

                <div class="empty-state">
                    <div class="empty-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="10.5" cy="10.5" r="6" />
                            <path d="M15 15l5 5" />
                        </svg>
                    </div>

                    <h3>검색 결과가 없습니다.</h3>

                    <p>
                        다른 식재료 이름이나 카테고리로 검색해보세요.
                    </p>

                    <button
                        type="button"
                        onclick={() => {
                            searchQuery = '';
                            selectedCategory = 'ALL';
                            currentPage = 1;
                        }}
                    >
                        전체 식재료 보기
                    </button>
                </div>

            {/if}

            <!-- PAGINATION -->
            {#if filteredIngredients.length > 0}
                <div class="pagination">

                    <button
                        type="button"
                        class="page-arrow"
                        aria-label="이전 페이지"
                        disabled={currentPage === 1}
                        onclick={previousPage}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    {#each Array(totalPages) as _, index}
                        <button
                            type="button"
                            class:active={currentPage === index + 1}
                            onclick={() => goToPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    {/each}

                    <button
                        type="button"
                        class="page-arrow"
                        aria-label="다음 페이지"
                        disabled={currentPage === totalPages}
                        onclick={nextPage}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                </div>
            {/if}

        </section>

        <!-- =========================================
             WIKI INFORMATION
        ========================================== -->
        <section class="info-section">

            <div class="info-content">
                <span class="section-label">
                    INGREDIENT WIKI
                </span>

                <h2>
                    식재료 정보를 함께<br />
                    만들어가요.
                </h2>

                <p>
                    알고 있는 식재료 정보를 공유하고<br />
                    다른 사람들과 함께 요리 지식을 쌓아보세요.
                </p>

                <a
                    href={appPath('/ingredients/new')}
                    class="info-button"
                >
                    식재료 정보 등록하기

                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                    </svg>
                </a>
            </div>

            <div class="info-decoration">
                <div class="decoration-circle circle-one"></div>
                <div class="decoration-circle circle-two"></div>

                <div class="decoration-card">
                    <span>WIKI</span>
                    <strong>식재료 정보</strong>
                    <small>
                        손질 · 보관 · 활용법
                    </small>
                </div>
            </div>

        </section>

    </main>
</div>

<style>
    .page {
        min-height: 100vh;
        background: var(--background);
        color: var(--text);
    }

    svg {
        fill: none;
        stroke: currentColor;
        stroke-width: 1.7;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    main {
        width: 100%;
        padding-bottom: 80px;
    }

    main > section {
        width: min(1160px, calc(100% - 48px));
        margin-left: auto;
        margin-right: auto;
        margin-top: 60px;
    }

    /* =========================================
       HERO
    ========================================== */

    .wiki-hero {
        position: relative;
        min-height: 430px;
        display: flex;
        align-items: center;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 25px;
        background: var(--surface-green);
    }

    .wiki-hero-content {
        position: relative;
        z-index: 2;
        width: 58%;
        padding: 65px 0 65px 55px;
    }

    .hero-label,
    .section-label {
        color: var(--accent);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: .08em;
    }

    .wiki-hero h1 {
        margin: 15px 0 18px;
        font-size: clamp(38px, 4.5vw, 58px);
        line-height: 1.12;
        letter-spacing: -.075em;
    }

    .wiki-hero h1 span {
        color: var(--accent);
    }

    .wiki-hero p {
        margin: 0;
        color: var(--text-subtle);
        font-size: 13px;
        line-height: 1.8;
    }

    .wiki-search {
        width: min(520px, 100%);
        height: 55px;
        display: flex;
        align-items: center;
        margin-top: 27px;
        padding: 4px 4px 4px 16px;
        border: 1px solid var(--border);
        border-radius: 14px;
        background: var(--surface);
        box-shadow: 0 8px 25px var(--shadow-search);
    }

    .wiki-search:focus-within {
        border-color: var(--primary);
    }

    .wiki-search svg {
        width: 19px;
        height: 19px;
        margin-right: 9px;
        color: var(--accent);
    }

    .wiki-search input {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: 0;
        background: transparent;
        color: var(--text);
        font-size: 12px;
    }

    .wiki-search input::placeholder {
        color: var(--text-muted);
    }

    .wiki-search button {
        height: 45px;
        padding: 0 21px;
        border: 0;
        border-radius: 10px;
        background: var(--primary);
        color: #0f172a;
        font-size: 11px;
        font-weight: 750;
        cursor: pointer;
    }

    .wiki-hero-image {
        position: absolute;
        top: 0;
        right: 0;
        width: 52%;
        height: 100%;
        overflow: hidden;
    }

    .wiki-hero-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .hero-image-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to right,
            var(--surface-green) 0%,
            rgb(from var(--surface-green) r g b / .95) 12%,
            rgb(from var(--surface-green) r g b / .7) 27%,
            rgb(from var(--surface-green) r g b / .25) 55%,
            rgba(0, 0, 0, 0) 100%
        );
    }

    /* =========================================
       SECTION TITLE
    ========================================== */

    .section-title {
        display: flex;
        align-items: end;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .section-title h2 {
        margin: 8px 0 0;
        font-size: 25px;
        letter-spacing: -.065em;
    }

    .section-title > a {
        color: var(--accent);
        font-size: 10px;
        font-weight: 700;
    }

    .result-count {
        color: var(--text-subtle);
        font-size: 10px;
    }

    /* =========================================
       CATEGORY
    ========================================== */

    .category-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 10px;
    }

    .category-card {
        min-width: 0;
        height: 125px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 11px;
        border: 1px solid var(--border);
        border-radius: 15px;
        background: var(--surface);
        color: var(--text);
        cursor: pointer;
        transition: .18s ease;
    }

    .category-card:hover {
        transform: translateY(-3px);
        border-color: var(--primary);
        background: var(--surface-yellow);
        box-shadow: 0 8px 20px var(--shadow-card);
    }

    .category-card.active {
        border-color: var(--accent);
        background: var(--surface-green);
        box-shadow: 0 7px 20px var(--shadow-card);
    }

    .category-icon {
        width: 52px;
        height: 52px;
        display: grid;
        place-items: center;
        border-radius: 14px;
        background: var(--surface-yellow);
        font-size: 20px;
        color: var(--accent);
    }

    .all-icon {
        font-size: 18px;
    }

    .category-card strong {
        font-size: 11px;
    }

    /* =========================================
       POPULAR (카드 스타일 업데이트)
    ========================================== */

    .popular-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
    }

    .popular-card {
        position: relative;
        display: block;
        min-width: 0;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 17px;
        background: var(--surface);
        text-decoration: none;
        color: inherit;
        transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
    }

    .popular-card:hover {
        transform: translateY(-3px);
        border-color: var(--primary);
        box-shadow: 0 12px 25px var(--shadow-card);
    }

    .popular-image {
        height: 180px;
        overflow: hidden;
        background: var(--surface-yellow);
    }

    .popular-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .25s ease;
    }

    .popular-card:hover .popular-image img {
        transform: scale(1.04);
    }

    .popular-content {
        position: relative;
        padding: 16px;
    }

    .popular-content > span {
        display: inline-block;
        color: var(--accent);
        font-size: 11px;
        font-weight: 750;
    }

    .popular-content h3 {
        margin: 6px 0 8px;
        font-size: 17px;
        font-weight: 700;
        line-height: 1.3;
        letter-spacing: -.03em;
    }

    .popular-content p {
        margin: 0;
        padding-right: 28px;
        color: var(--text-subtle);
        font-size: 13px;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .card-arrow {
        position: absolute;
        right: 16px;
        bottom: 16px;
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: var(--surface-yellow);
        color: var(--accent);
    }

    .card-arrow svg {
        width: 14px;
        height: 14px;
    }

    /* =========================================
       INGREDIENT LIST (카드 스타일 업데이트)
    ========================================== */

    .ingredient-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
    }

    .ingredient-card {
        display: block;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 17px;
        background: var(--surface);
        text-decoration: none;
        color: inherit;
        transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
    }

    .ingredient-card:hover {
        transform: translateY(-3px);
        border-color: var(--primary);
        box-shadow: 0 12px 25px var(--shadow-card);
    }

    .ingredient-image {
        position: relative;
        height: 180px;
        overflow: hidden;
        background: var(--surface-yellow);
    }

    .ingredient-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .ingredient-category {
        position: absolute;
        top: 10px;
        left: 10px;
        padding: 5px 10px;
        border: 1px solid var(--border);
        border-radius: 999px;
        background: var(--surface);
        color: var(--accent);
        font-size: 11px;
        font-weight: 750;
    }

    .ingredient-card-content {
        padding: 16px;
    }

    .ingredient-card h3 {
        margin: 0 0 8px;
        font-size: 17px;
        font-weight: 700;
        line-height: 1.3;
        letter-spacing: -.03em;
    }

    .ingredient-card p {
        margin: 0 0 14px;
        color: var(--text-subtle);
        font-size: 13px;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .storage {
        display: flex;
        align-items: center;
        gap: 6px;
        padding-top: 12px;
        border-top: 1px solid var(--border);
        color: var(--text-subtle);
        font-size: 12px;
    }

    .storage svg {
        width: 14px;
        height: 14px;
        color: var(--accent);
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 10px;
    }

    .tags span {
        padding: 4px 8px;
        border-radius: 6px;
        background: var(--surface-green);
        color: var(--accent);
        font-size: 11px;
        font-weight: 600;
    }

    .clear-search {
        padding: 7px 11px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
        color: var(--text-subtle);
        font-size: 11px;
        cursor: pointer;
    }

    .clear-search:hover {
        border-color: var(--primary);
        color: var(--accent);
    }

    /* =========================================
       EMPTY
    ========================================== */

    .empty-state {
        min-height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px dashed var(--border);
        border-radius: 18px;
        background: var(--surface);
        text-align: center;
    }

    .empty-icon {
        width: 55px;
        height: 55px;
        display: grid;
        place-items: center;
        margin-bottom: 15px;
        border-radius: 50%;
        background: var(--surface-yellow);
        color: var(--accent);
    }

    .empty-icon svg {
        width: 21px;
        height: 21px;
    }

    .empty-state h3 {
        margin: 0 0 7px;
        font-size: 17px;
    }

    .empty-state p {
        margin: 0 0 17px;
        color: var(--text-subtle);
        font-size: 13px;
    }

    .empty-state button {
        padding: 9px 15px;
        border: 0;
        border-radius: 8px;
        background: var(--primary);
        color: #0f172a;
        font-size: 12px;
        font-weight: 750;
        cursor: pointer;
    }

    /* =========================================
       PAGINATION
    ========================================== */

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        margin-top: 30px;
    }

    .pagination button {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
        color: var(--text-subtle);
        font-size: 12px;
        cursor: pointer;
    }

    .pagination button:hover:not(:disabled) {
        border-color: var(--primary);
        color: var(--accent);
    }

    .pagination button.active {
        border-color: var(--accent);
        background: var(--accent);
        color: #fff;
    }

    .pagination button:disabled {
        opacity: .35;
        cursor: default;
    }

    .pagination .page-arrow svg {
        width: 14px;
        height: 14px;
    }

    /* =========================================
       INFO
    ========================================== */

    .info-section {
        position: relative;
        min-height: 280px;
        display: grid;
        grid-template-columns: 1fr 420px;
        align-items: center;
        overflow: hidden;
        padding: 38px 45px;
        border: 1px solid var(--border-green);
        border-radius: 24px;
        background: var(--surface-green);
    }

    .info-content {
        position: relative;
        z-index: 2;
    }

    .info-content h2 {
        margin: 10px 0 12px;
        font-size: 29px;
        line-height: 1.25;
        letter-spacing: -.065em;
    }

    .info-content p {
        margin: 0 0 20px;
        color: var(--text-subtle);
        font-size: 13px;
        line-height: 1.7;
    }

    .info-button {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 11px 16px;
        border-radius: 10px;
        background: var(--primary);
        color: #0f172a;
        font-size: 12px;
        font-weight: 750;
        transition: .18s ease;
    }

    .info-button:hover {
        background: var(--accent);
        color: #fff;
        transform: translateY(-1px);
    }

    .info-button svg {
        width: 14px;
        height: 14px;
    }

    .info-decoration {
        position: relative;
        height: 220px;
    }

    .decoration-circle {
        position: absolute;
        border-radius: 50%;
        background: var(--primary);
        opacity: .3;
    }

    .circle-one {
        width: 180px;
        height: 180px;
        right: 35px;
        top: 15px;
    }

    .circle-two {
        width: 95px;
        height: 95px;
        right: 185px;
        bottom: 5px;
        background: var(--accent);
        opacity: .18;
    }

    .decoration-card {
        position: absolute;
        right: 70px;
        top: 48px;
        width: 180px;
        padding: 22px;
        border: 1px solid var(--border);
        border-radius: 17px;
        background: var(--surface);
        box-shadow: 0 12px 30px var(--shadow-card);
        transform: rotate(4deg);
    }

    .decoration-card span {
        color: var(--accent);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: .1em;
    }

    .decoration-card strong {
        display: block;
        margin-top: 8px;
        font-size: 18px;
    }

    .decoration-card small {
        display: block;
        margin-top: 6px;
        color: var(--text-subtle);
        font-size: 11px;
    }

    /* =========================================
       RESPONSIVE
    ========================================== */

    @media (max-width: 1000px) {
        .category-grid {
            grid-template-columns: repeat(4, 1fr);
        }

        .popular-grid,
        .ingredient-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .wiki-hero-content {
            width: 65%;
            padding-left: 35px;
        }

        .wiki-hero-image {
            width: 60%;
        }
    }

    @media (max-width: 800px) {
        .wiki-hero {
            min-height: 520px;
        }

        .wiki-hero-content {
            width: 100%;
            align-self: flex-end;
            padding: 40px 28px;
        }

        .wiki-hero-image {
            width: 100%;
            height: 100%;
            opacity: .55;
        }

        .hero-image-overlay {
            background: linear-gradient(
                to bottom,
                var(--surface-green) 0%,
                rgb(from var(--surface-green) r g b / .85) 45%,
                rgb(from var(--surface-green) r g b / .98) 75%,
                var(--surface-green) 100%
            );
        }

        .info-section {
            grid-template-columns: 1fr;
        }

        .info-decoration {
            display: none;
        }
    }

    @media (max-width: 600px) {
        main > section {
            width: calc(100% - 24px);
            margin-top: 45px;
        }

        .wiki-hero {
            min-height: 500px;
            border-radius: 19px;
        }

        .wiki-hero-content {
            padding: 35px 22px;
        }

        .wiki-hero h1 {
            font-size: 39px;
        }

        .wiki-search {
            height: 52px;
        }

        .wiki-search button {
            height: 42px;
            padding: 0 15px;
        }

        .category-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 7px;
        }

        .category-card {
            height: 105px;
            border-radius: 12px;
        }

        .category-icon {
            width: 42px;
            height: 42px;
            border-radius: 11px;
            font-size: 19px;
        }

        .category-card strong {
            font-size: 11px;
        }

        .popular-grid,
        .ingredient-grid {
            grid-template-columns: 1fr;
        }

        .popular-image,
        .ingredient-image {
            height: 200px;
        }

        .section-title h2 {
            font-size: 21px;
        }

        .info-section {
            padding: 30px 22px;
        }

        .info-content h2 {
            font-size: 25px;
        }

        .pagination {
            gap: 4px;
        }
    }
</style>