<script lang="ts">
	import { onMount } from 'svelte';
	import heroImg from '$lib/assets/image/hero.jpg';

	let currentBanner = $state(0);

	const categories = ['한식', '중식', '일식', '양식', '베이킹', '간식'];

	const banners = [
		{ title: '요리위키 배너 이미지', description: '배너 설명이 들어가는 영역입니다.' },
		{ title: '새로운 레시피 배너', description: '새롭게 추가된 콘텐츠를 소개하는 영역입니다.' },
		{ title: '요리위키 공지 배너', description: '서비스 공지나 이벤트를 표시할 수 있습니다.' }
	];

	const popularRecipes = ['레시피 제목', '레시피 제목', '레시피 제목', '레시피 제목'];
	const recentRecipes = ['새로 등록된 레시피', '새로 등록된 레시피', '새로 등록된 레시피'];

	const posts = [
		'커뮤니티 게시글 제목이 들어갑니다.',
		'커뮤니티 게시글 제목이 들어갑니다.',
		'커뮤니티 게시글 제목이 들어갑니다.',
		'커뮤니티 게시글 제목이 들어갑니다.'
	];

	let bannerTimer: ReturnType<typeof setInterval>;

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
		<!-- 상단 배너 -->
		<section class="banner-section">
			<div class="banner">
				<div class="banner-image">
					<span>배너 이미지 영역</span>
				</div>

				<div class="banner-content">
					<span class="banner-label">요리위키</span>
					<h2>{banners[currentBanner].title}</h2>
					<p>{banners[currentBanner].description}</p>
					<a href="/recipes" class="banner-button">자세히 보기</a>
				</div>

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

				<div class="banner-indicators">
					{#each banners as _, index}
						<button class:active={currentBanner === index} type="button" aria-label={`${index + 1}번 배너`} aria-current={currentBanner === index} onclick={() => selectBanner(index)}></button>
					{/each}
				</div>
			</div>
		</section>

		<section class="hero">
			<div class="hero-content">
				<h1>오늘은 무엇을<br /><span>만들어 볼까요?</span></h1>
				<p>요리와 식재료에 대한 정보를 찾아보고<br />나만의 레시피를 공유해보세요.</p>

				<div class="search-box">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<circle cx="10.5" cy="10.5" r="6" />
						<path d="M15 15l5 5" />
					</svg>
					<input type="text" placeholder="요리 이름이나 재료를 검색하세요" />
					<button type="button">검색</button>
				</div>
			</div>

			<div class="hero-image">
				<img src={heroImg} alt="대표 이미지" />
			</div>
		</section>

		<section>
			<div class="section-title">
				<h2>카테고리</h2>
				<a href="/categories">전체보기</a>
			</div>

			<div class="category-grid">
				{#each categories as category}
					<a href="/categories" class="category">
						<div class="category-image"><span>이미지</span></div>
						<strong>{category}</strong>
					</a>
				{/each}
			</div>
		</section>

		<section>
			<div class="section-title">
				<h2>인기 레시피</h2>
				<a href="/recipes">전체보기</a>
			</div>

			<div class="recipe-grid">
				{#each popularRecipes as recipe}
					<a href="/recipes/example" class="recipe">
						<div class="recipe-image">
							<span>이미지 영역</span>
							<button class="bookmark" type="button" aria-label="즐겨찾기" onclick={(event) => event.preventDefault()}>
								<svg viewBox="0 0 24 24" aria-hidden="true">
									<path d="M6 4h12v17l-6-4-6 4z" />
								</svg>
							</button>
						</div>

						<div class="recipe-info">
							<span class="tag">한식</span>
							<h3>{recipe}</h3>
							<p>레시피 설명이 들어가는 영역입니다.</p>
							<div class="recipe-meta"><span>조리시간 30분</span><span>조회 128</span></div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<section class="recommend-section">
			<div class="recommend-copy">
				<span class="recommend-label">오늘의 추천</span>
				<h2>오늘은 이런 요리<br />어떠세요?</h2>
				<p>현재 인기 있는 레시피를 바탕으로<br />오늘 만들어보기 좋은 요리를 추천합니다.</p>
				<a href="/recipes/recommended" class="primary-button">추천 레시피 보기</a>
			</div>

			<div class="recommend-image">
				<span>추천 이미지 영역</span>
			</div>
		</section>

		<section>
			<div class="section-title">
				<h2>최근 등록된 레시피</h2>
				<a href="/recipes?sort=recent">전체보기</a>
			</div>

			<div class="recent-grid">
				{#each recentRecipes as recipe, index}
					<a href="/recipes/example" class="recent-recipe">
						<div class="recent-image"><span>이미지</span></div>
						<div class="recent-info">
							<span class="tag">NEW</span>
							<!-- <span class="tag">{index === 0 ? 'NEW' : '레시피'}</span> -->
							<h3>{recipe}</h3>
							<p>새롭게 등록된 레시피 설명입니다.</p>
							<span class="recent-author">작성자 · 사용자</span>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<section class="register-section">
			<div class="register-content">
				<span class="register-label">레시피 공유</span>
				<h2>나만 알고 있는<br />레시피를 공유해보세요.</h2>
				<p>직접 만든 요리의 레시피를 등록하고<br />다른 사람들과 함께 맛있는 요리를 만들어보세요.</p>
				<a href="/recipes/new" class="register-button">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M12 5v14" />
						<path d="M5 12h14" />
					</svg>
					레시피 등록하기
				</a>
			</div>

			<div class="register-image">
				<span>레시피 등록 이미지 영역</span>
			</div>
		</section>

		<section class="bottom-grid">
			<div class="panel">
				<div class="section-title">
					<h2>식재료 위키</h2>
					<a href="/ingredients">전체보기</a>
				</div>

				<div class="wiki-image"><span>이미지 영역</span></div>

				<div class="wiki-text">
					<h3>식재료 이름</h3>
					<p>식재료에 대한 설명과 손질 방법, 보관 방법 등이 표시됩니다.</p>
				</div>
			</div>

			<div class="panel">
				<div class="section-title">
					<h2>커뮤니티</h2>
					<a href="/community">전체보기</a>
				</div>

				<div class="post-list">
					{#each posts as post}
						<a href="/community/example" class="post">
							<div class="post-avatar"></div>
							<div>
								<strong>{post}</strong>
								<span>작성자 · 2시간 전</span>
							</div>
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="M9 5l7 7-7 7" />
							</svg>
						</a>
					{/each}
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
		transition: background-color .2s ease, color .2s ease;
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

	.banner-section {
		margin-top: 25px;
	}

	.banner {
		position: relative;
		height: 235px;
		display: grid;
		grid-template-columns: 1.05fr .95fr;
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: 24px;
		background: var(--surface-yellow);
	}

	.banner-image {
		display: grid;
		place-items: center;
		background: var(--surface-subtle);
		color: var(--text-muted);
		font-size: 9px;
	}

	.banner-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 30px 65px 30px 35px;
	}

	.banner-label {
		width: fit-content;
		padding: 5px 9px;
		border-radius: 999px;
		background: var(--primary);
		color: #0f172a;
		font-size: 8px;
		font-weight: 800;
	}

	.banner-content h2 {
		margin: 12px 0 7px;
		font-size: 26px;
		letter-spacing: -.06em;
	}

	.banner-content p {
		margin: 0 0 17px;
		color: var(--text-subtle);
		font-size: 10px;
	}

	.banner-button {
		width: fit-content;
		padding: 9px 14px;
		border-radius: 9px;
		background: var(--accent);
		color: #fff;
		font-size: 9px;
		font-weight: 700;
	}

	.banner-controls {
		position: absolute;
		right: 18px;
		bottom: 18px;
		display: flex;
		gap: 5px;
	}

	.banner-controls button {
		width: 32px;
		height: 32px;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: var(--surface);
		color: var(--text);
		cursor: pointer;
	}

	.banner-controls button:hover {
		background: var(--primary);
		color: #0f172a;
	}

	.banner-controls svg {
		width: 15px;
		height: 15px;
	}

	.banner-indicators {
		position: absolute;
		left: 35px;
		bottom: 18px;
		display: flex;
		gap: 5px;
	}

	.banner-indicators button {
		width: 18px;
		height: 4px;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: var(--text-muted);
		opacity: .35;
		cursor: pointer;
		transition: width .2s ease, opacity .2s ease;
	}

	.banner-indicators button.active {
		width: 30px;
		background: var(--accent);
		opacity: 1;
	}

	.hero {
		display: grid;
		grid-template-columns: 1.05fr .95fr;
		gap: 55px;
		align-items: center;
		min-height: 510px;
		padding: 65px 30px;
	}

	.hero-content {
		padding-left: 15px;
	}

	.hero h1 {
		margin: 17px 0;
		font-size: clamp(43px, 5vw, 64px);
		line-height: 1.08;
		letter-spacing: -.075em;
	}

	.hero h1 span {
		color: var(--accent);
	}

	.hero p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 13px;
		line-height: 1.8;
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

	.hero-image img {
    width: 100%;
    height: auto;
    display: block;
    }

	section:not(.banner-section) {
		margin-top: 65px;
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
		font-size: 10px;
		font-weight: 700;
	}

	.category-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 11px;
	}

	.category {
		height: 135px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 13px;
		border: 1px solid var(--border);
		border-radius: 16px;
		background: var(--surface);
		transition: .18s ease;
	}

	.category:hover {
		transform: translateY(-3px);
		border-color: var(--primary);
		background: var(--surface-yellow);
		box-shadow: 0 8px 20px var(--shadow-card);
	}

	.category-image {
		width: 58px;
		height: 58px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 8px;
	}

	.category strong {
		font-size: 11px;
	}

	.recipe-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 14px;
	}

	.recipe,
	.recent-recipe {
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: 17px;
		background: var(--surface);
		transition: .18s ease;
	}

	.recipe:hover,
	.recent-recipe:hover {
		transform: translateY(-3px);
		border-color: var(--primary);
		box-shadow: 0 12px 25px var(--shadow-card);
	}

	.recipe-image {
		position: relative;
		height: 180px;
		display: grid;
		place-items: center;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 9px;
	}

	.bookmark {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: var(--surface);
		color: var(--text);
		cursor: pointer;
	}

	.bookmark:hover {
		background: var(--primary);
		color: #0f172a;
	}

	.bookmark svg {
		width: 15px;
		height: 15px;
	}

	.recipe-info,
	.recent-info {
		padding: 14px;
	}

	.tag {
		color: var(--accent);
		font-size: 8px;
		font-weight: 750;
	}

	.recipe h3,
	.recent-recipe h3 {
		margin: 6px 0;
		font-size: 15px;
		letter-spacing: -.04em;
	}

	.recipe p,
	.recent-recipe p {
		margin: 0 0 13px;
		color: var(--text-subtle);
		font-size: 9px;
	}

	.recipe-meta {
		display: flex;
		justify-content: space-between;
		padding-top: 10px;
		border-top: 1px solid var(--border);
		color: var(--text-subtle);
		font-size: 8px;
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
		font-size: 10px;
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
		font-size: 11px;
		line-height: 1.7;
	}

	.primary-button {
		display: inline-block;
		padding: 11px 16px;
		border-radius: 9px;
		background: var(--accent);
		color: #fff;
		font-size: 10px;
		font-weight: 700;
	}

	.recommend-image {
		height: 240px;
		display: grid;
		place-items: center;
		border: 1.5px dashed var(--border-accent);
		border-radius: 20px;
		background: var(--surface);
		color: var(--accent);
		font-size: 9px;
	}

	.recent-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
	}

	.recent-recipe {
		display: grid;
		grid-template-columns: 135px 1fr;
	}

	.recent-image {
		min-height: 155px;
		display: grid;
		place-items: center;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 8px;
	}

	.recent-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.recent-author {
		color: var(--text-muted);
		font-size: 8px;
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
		font-size: 10px;
		font-weight: 800;
	}

	.register-content h2 {
		margin: 9px 0 11px;
		font-size: 29px;
		line-height: 1.3;
		letter-spacing: -.065em;
	}

	.register-content p {
		margin: 0 0 20px;
		color: var(--text-subtle);
		font-size: 10px;
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
		font-size: 10px;
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
		display: grid;
		place-items: center;
		border: 1.5px dashed var(--border-accent);
		border-radius: 18px;
		background: var(--surface-green);
		color: var(--accent);
		font-size: 9px;
	}

	.bottom-grid {
		display: grid;
		grid-template-columns: .9fr 1.1fr;
		gap: 15px;
	}

	.panel {
		padding: 25px;
		border: 1px solid var(--border);
		border-radius: 19px;
		background: var(--surface);
	}

	.wiki-image {
		height: 180px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 9px;
	}

	.wiki-text h3 {
		margin: 14px 0 5px;
		font-size: 15px;
	}

	.wiki-text p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 9px;
		line-height: 1.7;
	}

	.post-list {
		border-top: 1px solid var(--border);
	}

	.post {
		display: grid;
		grid-template-columns: 32px 1fr 15px;
		align-items: center;
		gap: 10px;
		padding: 13px 0;
		border-bottom: 1px solid var(--border);
	}

	.post-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--surface-yellow);
	}

	.post strong {
		display: block;
		overflow: hidden;
		font-size: 10px;
		font-weight: 650;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.post span {
		display: block;
		margin-top: 4px;
		color: var(--text-subtle);
		font-size: 8px;
	}

	.post svg {
		width: 14px;
		height: 14px;
		color: var(--accent);
	}

	@media (max-width: 1000px) {
		.recommend-section {
			grid-template-columns: 1fr 320px;
		}

		.recent-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 900px) {
		.banner {
			grid-template-columns: 1fr;
			height: 380px;
		}

		.banner-image {
			height: 190px;
		}

		.banner-content {
			padding: 20px 30px 45px;
		}

		.banner-content h2 {
			margin: 7px 0 4px;
			font-size: 21px;
		}

		.banner-content p {
			margin-bottom: 10px;
		}

		.banner-indicators {
			left: 30px;
			bottom: 18px;
		}

		.hero {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.hero-image {
			height: 300px;
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

		.register-section {
			grid-template-columns: 1fr;
			gap: 25px;
		}

		.register-image {
			height: 180px;
		}

		.bottom-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		main {
			width: calc(100% - 24px);
		}

		.banner {
			height: 350px;
		}

		.banner-image {
			height: 165px;
		}

		.banner-content {
			padding: 18px 22px 43px;
		}

		.banner-controls {
			right: 14px;
			bottom: 12px;
		}

		.banner-indicators {
			left: 22px;
			bottom: 18px;
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

		.hero-image {
			height: 230px;
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

		.recent-recipe {
			grid-template-columns: 110px 1fr;
		}

		.recent-image {
			min-height: 140px;
		}

		.register-section {
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