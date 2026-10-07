<script lang="ts">
    import { appPath } from '$lib/app-path';
    import { onMount } from 'svelte';
    import type { SearchResults } from '$lib/load-search';

    import RecipeCard from '$lib/components/layouts/RecipeCard.svelte';
    import banner1Img from '$lib/assets/image/banner1.jpg';
    import banner2Img from '$lib/assets/image/banner2.jpg';
    import banner3Img from '$lib/assets/image/banner3.jpg';
    import heroImg from '$lib/assets/image/hero.jpg';
    import noRecipeImg from '$lib/assets/image/no-image.png';
    import searchImg from '$lib/assets/image/search.jpg';
    import recipeNewImg from '$lib/assets/image/recipe-new.jpg';

    let currentBanner = $state(0);
    
    const categories = [
        { name: '한식', value: 'KOREAN' },
        { name: '중식', value: 'CHINESE' },
        { name: '일식', value: 'JAPANESE' },
        { name: '양식', value: 'WESTERN' },
        { name: '베이킹', value: 'BAKING' },
        { name: '간식', value: 'SNACK' }
    ];

    const banners = [ 
        { title: '시원한 스무디 먹고 무더위 날려버리자!', description: '냉동 과일로 만드는 시원하고 간단한 여름 스무디 가이드', image: banner1Img, href: '/beta/articles/summer-smoothie' },
        { title: '집에 손님이 찾아왔다! 대접용 요리 총출동', description: '손님상에 잘 어울리는 메뉴와 준비 팁을 한눈에', image: banner2Img, href: '/beta/articles/guest-meal' },
        { title: '자취생용 혼밥 추천', description: '적은 재료로 빠르고 든든하게 만드는 현실적인 혼밥 메뉴', image: banner3Img, href: '/beta/articles/solo-meal' }
    ]

    let { data }: {
        data: {
            popularRecipes: SearchResults['items'];
            recentRecipes: SearchResults['items'];
            popularError: string;
            recentError: string;
        };
    } = $props();

    let bannerTimer: ReturnType<typeof setInterval>;

    function getImageUrl(url?: string) {
        if (!url) return undefined;
        return url.startsWith('/api/') ? appPath(url) : url;
    }

    onMount(() => {
        bannerTimer = setInterval(() => {
            nextBanner();
        }, 5000);

        return () => {
            clearInterval(bannerTimer);
        };
    });

    function nextBanner() {
        currentBanner = (currentBanner + 1) % banners.length;
    }

    function previousBanner() {
        currentBanner = (currentBanner - 1 + banners.length) % banners.length;
    }

    function selectBanner(index: number) {
        currentBanner = index;
    }
</script>

<svelte:head>
    <title>요리위키</title>
    <meta name="description" content="누구나 찾고 공유하는 요리 레시피 위키" />
</svelte:head>

<div class="page">
    <main>
        <!-- Full Width 직사각형 배너 섹션 -->
        <div class="banner-wrapper">
            <section class="banner">
                <!-- 이미지 배경 -->
                <div class="banner-image-main">
                    <img src={banners[currentBanner].image} alt={banners[currentBanner].title} />
                </div>

                <div class="banner-content-wrapper">
                    <div class="banner-top-bar">
                        <div class="banner-indicators">
                            {#each banners as _, index}
                                <button class:active={currentBanner === index} type="button" aria-label={`${index + 1}번 배너`} aria-current={currentBanner === index} onclick={() => selectBanner(index)}></button>
                            {/each}
                        </div>
                    </div>

                    <div class="banner-content">
                        <h2>{banners[currentBanner].title}</h2>
                        <p>{banners[currentBanner].description}</p>
                    </div>

                    <div class="banner-bottom-bar">
                        <a href={appPath(banners[currentBanner].href)} class="banner-button">
                            자세히 보기
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </a>

                        <div class="banner-controls">
                            <button type="button" aria-label="이전 배너" onclick={previousBanner}>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button type="button" aria-label="다음 배너" onclick={nextBanner}>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div class="hero-wrapper">
            <section class="hero">
                <div class="hero-content">
                    <h1>오늘은 무엇을<br /><span>만들어 볼까요?</span></h1>
                    <p>요리와 식재료에 대한 정보를 찾아보고<br />나만의 레시피를 공유해보세요.</p>

                    <form class="search-box" action={appPath('/search')} method="GET">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="10.5" cy="10.5" r="6" />
                            <path d="M15 15l5 5" />
                        </svg>
                        <input name="q" type="search" maxlength="100" aria-label="요리 검색어" placeholder="요리 이름이나 재료를 검색하세요" />
                        <button type="submit">검색</button>
                    </form>
                </div>

                <div class="hero-image-container">
                    <img src={heroImg} alt="대표 이미지" />
                    <div class="gradient-overlay"></div>
                </div>
            </section>
        </div>

        <!-- 1. 오늘의 추천 섹션 -->
        <section class="recommend-section">
            <div class="recommend-copy">
                <span class="recommend-label">탐색</span>
                <h2>당신만의<br />요리 추천 리스트</h2>
                <p>지금까지 당신이 요리한 음식들을 기반으로<br />만들어보기 좋은 요리를 추천합니다.</p>
                <a href={appPath('/search')} class="primary-button">추천 레시피 보기</a>
            </div>

            <div class="recommend-image">
                <img src={searchImg} alt="추천 레시피 이미지" />
            </div>
        </section>

        <!-- 2. 카테고리 섹션 -->
        <section>
            <div class="section-title">
                <h2>카테고리</h2>
                <a href={appPath('/categories')}>전체보기</a>
            </div>

            <div class="category-grid">
                {#each categories as category}
                    <a
                        href={appPath(`/recipes?category=${category.value}`)}
                        class="category"
                    >
                        <strong>{category.name}</strong>

                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 12h13" />
                            <path d="m13 6 6 6-6 6" />
                        </svg>
                    </a>
                {/each}
            </div>
        </section>

        <!-- 3. 인기 레시피 섹션 -->
        <section>
            <div class="section-title">
                <h2>인기 레시피</h2>
                <a href={appPath('/recipes?sort=likes')}>전체보기</a>
            </div>

            <div class="recipe-grid">
                {#each data.popularRecipes.slice(0, 4) as recipe (recipe.id)}
                    <RecipeCard
                        id={recipe.id}
                        title={recipe.name}
                        description={
                            typeof recipe.metadata?.description === 'string'
                                ? recipe.metadata.description
                                : recipe.ingredients
                        }
                        image={getImageUrl(
                            typeof recipe.metadata?.image_url === 'string'
                                ? recipe.metadata.image_url
                                : undefined
                        )}
                        category={
                            (categories.find(
                                (category) => category.value === recipe.metadata?.category
                            )?.name ??
                            (typeof recipe.metadata?.category === 'string'
                                ? recipe.metadata.category
                                : undefined))
                        }
                        cookingTime={recipe.estimated_time}
                        views={typeof recipe.metadata?.likes === 'number' ? recipe.metadata.likes : 0}
                        href={appPath(`/recipes/${recipe.id}`)}
                    />
                {/each}
            </div>
        </section>

        <!-- 4. 최근 등록된 레시피 섹션 -->
        <section>
            <div class="section-title">
                <h2>최근 등록된 레시피</h2>
                <a href={appPath('/recipes?sort=newest')}>전체보기</a>
            </div>

            <div class="recipe-grid">
                {#each data.recentRecipes.slice(0, 4) as recipe (recipe.id)}
                    <RecipeCard
                        id={recipe.id}
                        title={recipe.name}
                        description={
                            typeof recipe.metadata?.description === 'string'
                                ? recipe.metadata.description
                                : recipe.ingredients
                        }
                        image={getImageUrl(
                            typeof recipe.metadata?.image_url === 'string'
                                ? recipe.metadata.image_url
                                : undefined
                        )}
                        category={
                            (categories.find(
                                (category) => category.value === recipe.metadata?.category
                            )?.name ??
                            (typeof recipe.metadata?.category === 'string'
                                ? recipe.metadata.category
                                : undefined))
                        }
                        cookingTime={recipe.estimated_time}
                        views={typeof recipe.metadata?.likes === 'number' ? recipe.metadata.likes : 0}
                        href={appPath(`/recipes/${recipe.id}`)}
                    />
                {/each}
            </div>
        </section>

        <section class="register-section">
            <div class="register-content">
                <span class="register-label">레시피 공유</span>
                <h2>나만 알고 있는<br />레시피를 공유해보세요.</h2>
                <p>직접 만든 요리의 레시피를 등록하고<br />다른 사람들과 함께 맛있는 요리를 만들어보세요.</p>
                <a href={appPath('/recipes/new')} class="register-button">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                    </svg>
                    레시피 등록하기
                </a>
            </div>

            <div class="register-image">
                <img src={recipeNewImg} alt="레시피 등록 이미지" />
            </div>
        </section>

        <section class="community-section">
            <div>
                <span>커뮤니티</span>
                <h2>요리에 대한 이야기를<br />함께 나눠보세요.</h2>
                <a href={appPath('/community')}>커뮤니티 바로가기 →</a>
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
    }

    .banner-wrapper {
        width: 100%;
        margin-top: 24px;
        background: var(--surface);
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
    }

    .banner {
        position: relative;
        height: 200px;
        display: flex;
        overflow: hidden;
        width: 100%;
    }

    .banner-image-main {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .banner-image-main img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .banner-content-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        width: clamp(340px, 40%, 500px);
        height: 100%;
        z-index: 2;
        background: linear-gradient(
            to right,
            rgb(from var(--surface) r g b / 0.3) 0%,
            rgb(from var(--surface) r g b / 0.75) 40%,
            rgb(from var(--surface) r g b / 0.95) 75%,
            var(--surface) 100%
        );
        backdrop-filter: blur(8px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 18px;
        padding-bottom: 18px;
        padding-left: 30px;
        padding-right: 24px;
    }

    .banner-top-bar {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .banner-indicators {
        display: flex;
        gap: 5px;
    }

    .banner-indicators button {
        width: 14px;
        height: 3px;
        padding: 0;
        border: 0;
        border-radius: 999px;
        background: var(--border);
        cursor: pointer;
        transition: width .2s ease, background .2s ease;
    }

    .banner-indicators button.active {
        width: 24px;
        background: var(--accent);
    }

    .banner-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }

    .banner-content h2 {
        margin: 0 0 6px;
        font-size: 20px;
        font-weight: 800;
        letter-spacing: -.04em;
        color: var(--text);
    }

    .banner-content p {
        margin: 0;
        color: var(--text-subtle);
        font-size: 12px;
        line-height: 1.4;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }

    .banner-bottom-bar {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
    }

    .banner-button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 16px;
        border-radius: 8px;
        background: var(--primary);
        color: #0f172a;
        font-size: 11px;
        font-weight: 750;
        transition: all .2s ease;
    }

    .banner-button:hover {
        background: var(--accent);
        color: #fff;
    }

    .banner-button svg {
        width: 12px;
        height: 12px;
    }

    .banner-controls {
        display: flex;
        gap: 6px;
    }

    .banner-controls button {
        width: 28px;
        height: 28px;
        display: grid;
        place-items: center;
        border: 1px solid var(--border);
        border-radius: 50%;
        background: var(--surface);
        color: var(--text);
        cursor: pointer;
        transition: all .2s ease;
    }

    .banner-controls button:hover {
        background: var(--primary);
        border-color: var(--primary);
    }

    .banner-controls svg {
        width: 12px;
        height: 12px;
    }

    .hero-wrapper {
        width: 100%;
        margin-top: 32px;
        background-color: var(--surface-yellow);
        overflow: hidden;
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
    }

    .hero {
        position: relative;
        display: grid;
        grid-template-columns: minmax(320px, 1.1fr) 1fr;
        align-items: center;
        min-height: 480px;
        padding-left: max(24px, calc((100% - 1160px) / 2));
    }

    .hero-content {
        position: relative;
        z-index: 2;
        padding: 50px 20px 50px 0;
    }

    .hero h1 {
        margin: 17px 0;
        font-size: clamp(40px, 4.8vw, 60px);
        line-height: 1.08;
        letter-spacing: -.075em;
    }

    .hero h1 span {
        color: var(--accent);
    }

    .hero p {
        margin: 0;
        color: var(--text-subtle);
        font-size: 14px;
        line-height: 1.8;
    }

    .hero-image-container {
        position: absolute;
        top: 0;
        right: 0;
        width: 55%;
        height: 100%;
        z-index: 1;
    }

    .hero-image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
    }

    .gradient-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to right,
            var(--surface-yellow) 0%,
            rgb(from var(--surface-yellow) r g b / 0.98) 12%,
            rgb(from var(--surface-yellow) r g b / 0.92) 24%,
            rgb(from var(--surface-yellow) r g b / 0.8) 36%,
            rgb(from var(--surface-yellow) r g b / 0.62) 48%,
            rgb(from var(--surface-yellow) r g b / 0.42) 60%,
            rgb(from var(--surface-yellow) r g b / 0.22) 72%,
            rgb(from var(--surface-yellow) r g b / 0.08) 85%,
            rgba(0, 0, 0, 0) 100%
        );
        pointer-events: none;
    }

    .search-box {
        max-width: 550px;
        height: 56px;
        display: flex;
        align-items: center;
        margin-top: 27px;
        padding: 4px 4px 4px 16px;
        border: 1px solid var(--border);
        border-radius: 14px;
        background: var(--surface);
        box-shadow: 0 8px 25px var(--shadow-search);
    }

    .search-box:focus-within {
        border-color: var(--primary);
    }

    .search-box svg {
        width: 19px;
        height: 19px;
        margin-right: 9px;
        color: var(--accent);
    }

    .search-box input {
        flex: 1;
        min-width: 0;
        border: 0;
        outline: 0;
        background: transparent;
        color: var(--text);
        font-size: 12px;
    }

    .search-box input::placeholder {
        color: var(--text-muted);
    }

    .search-box button {
        height: 46px;
        padding: 0 21px;
        border: 0;
        border-radius: 10px;
        background: var(--primary);
        color: #0f172a;
        font-size: 11px;
        font-weight: 750;
        cursor: pointer;
    }

    main > section {
        margin-top: 60px;
    }

    .section-title {
        display: flex;
        align-items: end;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .section-title h2 {
        margin: 0;
        font-size: 24px;
        letter-spacing: -.06em;
    }

    .section-title > a {
        color: var(--accent);
        font-size: 11px;
        font-weight: 700;
    }

    .category-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 10px;
    }

    .category {
        height: 76px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: var(--surface);
        color: var(--text);
        transition:
            background .18s ease,
            border-color .18s ease,
            transform .18s ease;
    }

    .category strong {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: -.04em;
    }

    .category svg {
        width: 15px;
        height: 15px;
        color: var(--text-muted);
        opacity: .65;
        transition:
            transform .18s ease,
            color .18s ease,
            opacity .18s ease;
    }

    .category:hover {
        transform: translateY(-2px);
        border-color: var(--border-accent);
        background: var(--surface-yellow);
    }

    .category:hover svg {
        color: var(--accent);
        opacity: 1;
        transform: translateX(2px);
    }

    .recipe-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
    }

    .recommend-section {
        display: grid;
        grid-template-columns: 1fr 420px;
        align-items: center;
        gap: 40px;
        padding: 42px;
        border: 1px solid var(--border-green);
        border-radius: 25px;
        background: var(--surface-green);
    }

    .recommend-label {
        color: var(--accent);
        font-size: 12px;
        font-weight: 800;
    }

    .recommend-copy h2 {
        margin: 10px 0 12px;
        font-size: 32px;
        line-height: 1.25;
        letter-spacing: -.07em;
    }

    .recommend-copy p {
        margin: 0 0 20px;
        color: var(--text-subtle);
        font-size: 12px;
        line-height: 1.7;
    }

    .primary-button {
        display: inline-block;
        padding: 11px 16px;
        border-radius: 99px;
        background: var(--accent);
        color: #fff;
        font-size: 12px;
        font-weight: 700;
    }

    .recommend-image {
        height: 240px;
        border: 1.5px dashed var(--border-accent);
        border-radius: 20px;
        background: var(--surface);
        overflow: hidden;
    }

    .recommend-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .register-section {
        display: grid;
        grid-template-columns: 1fr 360px;
        align-items: center;
        gap: 45px;
        padding: 38px 42px;
        border: 1px solid var(--border);
        border-radius: 24px;
        background: var(--surface);
        overflow: hidden;
    }

    .register-content {
        padding: 8px 0;
    }

    .register-label {
        color: var(--accent);
        font-size: 12px;
        font-weight: 800;
    }

    .register-content h2 {
        margin: 9px 0 11px;
        font-size: 32px;
        line-height: 1.3;
        letter-spacing: -.065em;
    }

    .register-content p {
        margin: 0 0 20px;
        color: var(--text-subtle);
        font-size: 12px;
        line-height: 1.7;
    }

    .register-button {
        width: fit-content;
        display: flex;
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

    .register-button:hover {
        background: var(--accent);
        color: #fff;
        transform: translateY(-1px);
    }

    .register-button svg {
        width: 15px;
        height: 15px;
    }

    .register-image {
        height: 190px;
        border: 1.5px dashed var(--border-accent);
        border-radius: 18px;
        background: var(--surface-green);
        overflow: hidden;
    }

    .register-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .community-section {
        padding: 32px 38px;
        border: 1px solid var(--border);
        border-radius: 19px;
        background: var(--surface);
    }

    .community-section span {
        color: var(--accent);
        font-size: 11px;
        font-weight: 800;
    }

    .community-section h2 {
        margin: 8px 0 16px;
        font-size: 26px;
        line-height: 1.35;
        letter-spacing: -.05em;
    }

    .community-section a {
        color: var(--accent);
        font-size: 11px;
        font-weight: 700;
    }

    @media (max-width: 1000px) {
        .recommend-section {
            grid-template-columns: 1fr 320px;
        }
    }

    @media (max-width: 900px) {
        .banner-content-wrapper {
            width: 60%;
            padding-left: 20px;
            padding-right: 16px;
        }

        .hero {
            grid-template-columns: 1fr;
            gap: 30px;
        }

        .hero-image-container {
            width: 100%;
            opacity: 0.25;
        }

        .category-grid {
            grid-template-columns: repeat(3, 1fr);
        }

        .recipe-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .recommend-section {
            grid-template-columns: 1fr;
        }

        .register-section,
        .community-section {
            grid-template-columns: 1fr;
            gap: 25px;
        }

        .register-image {
            height: 180px;
        }
    }

    @media (max-width: 600px) {
        main > section {
            width: calc(100% - 24px);
        }

        .banner-wrapper {
            margin-top: 16px;
        }

        .banner-content-wrapper {
            width: 100%;
            background: linear-gradient(
                0deg, 
                var(--surface) 30%, 
                rgb(from var(--surface) r g b / 0.8) 70%, 
                rgb(from var(--surface) r g b / 0.3) 100%
            );
            padding: 15px 16px;
            justify-content: space-between;
        }

        .hero-wrapper {
            margin-top: 20px;
        }

        .hero {
            padding: 45px 10px 25px;
        }

        .hero-content {
            padding: 0;
        }

        .hero h1 {
            font-size: 42px;
        }

        .search-box {
            height: 52px;
        }

        .search-box button {
            height: 42px;
            padding: 0 15px;
        }

        .category-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .recipe-grid {
            grid-template-columns: 1fr;
        }

        .recommend-section {
            padding: 28px 22px;
        }

        .recommend-image {
            height: 190px;
        }

        .register-section,
        .community-section {
            padding: 28px 22px;
        }

        .register-content h2 {
            font-size: 25px;
        }

        .register-image {
            height: 160px;
        }
    }
</style>