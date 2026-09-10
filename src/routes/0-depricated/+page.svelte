<script lang="ts">
	import { appPath } from '$lib/app-path';
	let menuOpen = $state(false);

	const categories = [
		{ name: '한식', emoji: '🍚' },
		{ name: '중식', emoji: '🥟' },
		{ name: '일식', emoji: '🍣' },
		{ name: '양식', emoji: '🍝' },
		{ name: '베이킹', emoji: '🥐' },
		{ name: '간식', emoji: '🍪' }
	];

	const popularRecipes = [
		{
			title: '김치볶음밥',
			category: '한식',
			time: '20분',
			level: '쉬움',
			emoji: '🍳'
		},
		{
			title: '크림 파스타',
			category: '양식',
			time: '30분',
			level: '보통',
			emoji: '🍝'
		},
		{
			title: '치킨 가라아게',
			category: '일식',
			time: '40분',
			level: '보통',
			emoji: '🍗'
		},
		{
			title: '초코칩 쿠키',
			category: '베이킹',
			time: '35분',
			level: '쉬움',
			emoji: '🍪'
		}
	];

	const recentRecipes = [
		'된장찌개',
		'연어 덮밥',
		'오므라이스',
		'토마토 파스타'
	];

	const ingredients = [
		'계란',
		'양파',
		'감자',
		'김치',
		'치즈',
		'돼지고기'
	];

	const communityPosts = [
		'오늘 저녁 메뉴 추천해주세요!',
		'집에서 만들기 쉬운 파스타 있을까요?',
		'냉장고에 있는 재료로 뭐 해먹을까요?',
		'초보자도 만들기 쉬운 베이킹 추천!'
	];

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<svelte:head>
	<title>요리위키</title>
	<meta
		name="description"
		content="누구나 찾고 만들고 공유하는 요리 레시피 위키"
	/>
</svelte:head>

<div class="app">
	<!-- ==================== HEADER ==================== -->
	<header class="header">
		<div class="header-left">
			<button
				class:open={menuOpen}
				class="hamburger"
				type="button"
				aria-label="메뉴 열기"
				aria-expanded={menuOpen}
				onclick={toggleMenu}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>

			<a href={appPath('/')} class="logo" onclick={closeMenu}>
				<span class="logo-mark">🍳</span>
				<span>요리위키</span>
			</a>
		</div>

		<div class="header-right">
			<button class="header-search" type="button" aria-label="검색">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="11" cy="11" r="6.5"></circle>
					<path d="M16 16L21 21"></path>
				</svg>
			</button>

			<a href={appPath('/login')} class="login-button">
				로그인
			</a>
		</div>
	</header>

	<!-- ==================== MOBILE / HAMBURGER MENU ==================== -->
	{#if menuOpen}
		<button
			class="menu-overlay"
			type="button"
			aria-label="메뉴 닫기"
			onclick={closeMenu}
		></button>
	{/if}

	<aside class:open={menuOpen} class="side-menu">
		<div class="side-menu-top">
			<div>
				<p class="side-menu-label">COOKING WIKI</p>
				<h2>요리위키</h2>
			</div>

			<button
				class="close-menu"
				type="button"
				aria-label="메뉴 닫기"
				onclick={closeMenu}
			>
				×
			</button>
		</div>

		<nav class="menu-nav">
			<a href={appPath('/')} class="menu-link active" onclick={closeMenu}>
				<span class="menu-icon">🏠</span>
				<span>홈</span>
			</a>

			<a href={appPath('/recipes')} class="menu-link" onclick={closeMenu}>
				<span class="menu-icon">🍳</span>
				<span>레시피</span>
			</a>

			<a href={appPath('/ingredients')} class="menu-link" onclick={closeMenu}>
				<span class="menu-icon">🥬</span>
				<span>식재료 위키</span>
			</a>

			<a href={appPath('/refrigerator')} class="menu-link" onclick={closeMenu}>
				<span class="menu-icon">🧊</span>
				<span>냉장고 추천</span>
			</a>

			<a href={appPath('/community')} class="menu-link" onclick={closeMenu}>
				<span class="menu-icon">💬</span>
				<span>커뮤니티</span>
			</a>

			<a href={appPath('/profile')} class="menu-link" onclick={closeMenu}>
				<span class="menu-icon">👤</span>
				<span>마이페이지</span>
			</a>

			<div class="menu-divider"></div>

			<a href={appPath('/recipes/new')} class="menu-link secondary" onclick={closeMenu}>
				<span class="menu-icon">✏️</span>
				<span>레시피 등록</span>
			</a>

			<a href={appPath('/notice')} class="menu-link secondary" onclick={closeMenu}>
				<span class="menu-icon">📢</span>
				<span>공지사항</span>
			</a>

			<a href={appPath('/faq')} class="menu-link secondary" onclick={closeMenu}>
				<span class="menu-icon">❓</span>
				<span>도움말</span>
			</a>
		</nav>

		<div class="side-menu-footer">
			<a href={appPath('/login')} onclick={closeMenu}>로그인</a>
			<p>함께 만들고 함께 나누는 요리 이야기</p>
		</div>
	</aside>

	<!-- ==================== MAIN ==================== -->
	<main>
		<!-- HERO -->
		<section class="hero">
			<div class="hero-decoration decoration-one">✦</div>
			<div class="hero-decoration decoration-two">✿</div>
			<div class="hero-decoration decoration-three">·</div>

			<div class="hero-content">
				<div class="hero-badge">
					<span>🍴</span>
					오늘의 요리생활
				</div>

				<h1>
					오늘은
					<br />
					<span>뭘 만들어 볼까요?</span>
				</h1>

				<p>
					먹고 싶은 음식도, 냉장고에 남은 재료도
					<br />
					요리위키에서 새로운 레시피를 찾아보세요.
				</p>

				<div class="main-search">
					<div class="search-icon">
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<circle cx="11" cy="11" r="6.5"></circle>
							<path d="M16 16L21 21"></path>
						</svg>
					</div>

					<input
						type="text"
						placeholder="요리 이름이나 재료를 검색해보세요"
					/>

					<button type="button">
						검색
					</button>
				</div>

				<div class="popular-search">
					<span>인기 검색어</span>
					<a href={appPath('/recipes')}>김치볶음밥</a>
					<a href={appPath('/recipes')}>파스타</a>
					<a href={appPath('/recipes')}>계란요리</a>
					<a href={appPath('/recipes')}>자취요리</a>
				</div>
			</div>

			<div class="hero-visual">
				<div class="hero-photo">
					<div class="placeholder-doodle">🍳</div>
					<div class="placeholder-text">
						이미지 플레이스홀더
						<br />
						<span>메인 음식 이미지</span>
					</div>
				</div>

				<div class="floating-card floating-card-top">
					<span>⭐</span>
					<div>
						<strong>오늘의 인기</strong>
						<small>김치볶음밥</small>
					</div>
				</div>

				<div class="floating-card floating-card-bottom">
					<span>🥕</span>
					<div>
						<strong>냉장고를 열어보세요</strong>
						<small>있는 재료로 찾아볼게요!</small>
					</div>
				</div>
			</div>
		</section>

		<!-- CATEGORIES -->
		<section class="section">
			<div class="section-heading">
				<div>
					<span class="section-kicker">EXPLORE</span>
					<h2>오늘은 어떤 요리를 해볼까요?</h2>
				</div>

				<a href={appPath('/categories')} class="more-link">전체보기 →</a>
			</div>

			<div class="category-grid">
				{#each categories as category}
					<a href={appPath('/categories')} class="category-card">
						<div class="category-icon">
							{category.emoji}
						</div>

						<strong>{category.name}</strong>
					</a>
				{/each}
			</div>
		</section>

		<!-- POPULAR -->
		<section class="section">
			<div class="section-heading">
				<div>
					<span class="section-kicker">POPULAR</span>
					<h2>요즘 많이 찾는 레시피</h2>
				</div>

				<a href={appPath('/recipes')} class="more-link">레시피 더보기 →</a>
			</div>

			<div class="recipe-grid">
				{#each popularRecipes as recipe}
					<a href={appPath('/recipes/example')} class="recipe-card">
						<div class="recipe-image">
							<span>{recipe.emoji}</span>

							<div class="image-placeholder">
								이미지 플레이스홀더
							</div>

							<button
								class="favorite"
								type="button"
								aria-label="즐겨찾기"
								onclick={(event) => event.preventDefault()}
							>
								♡
							</button>
						</div>

						<div class="recipe-body">
							<div class="recipe-tags">
								<span>{recipe.category}</span>
								<span>⏱ {recipe.time}</span>
							</div>

							<h3>{recipe.title}</h3>

							<p>
								맛있는 레시피 설명이 들어갈 자리입니다.
							</p>

							<div class="recipe-footer">
								<span>난이도 · {recipe.level}</span>
								<span>♡ 128</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- REFRIGERATOR -->
		<section class="refrigerator">
			<div class="refrigerator-content">
				<span class="section-kicker">MY FRIDGE</span>

				<h2>
					냉장고에 있는 재료로
					<br />
					뭘 만들 수 있을까요?
				</h2>

				<p>
					지금 가지고 있는 재료를 골라주면
					<br />
					만들 수 있는 요리를 찾아드릴게요.
				</p>

				<div class="ingredient-list">
					{#each ingredients as ingredient}
						<button type="button">
							<span>＋</span>
							{ingredient}
						</button>
					{/each}
				</div>

				<a href={appPath('/refrigerator')} class="yellow-button">
					냉장고 레시피 찾아보기
					<span>→</span>
				</a>
			</div>

			<div class="refrigerator-visual">
				<div class="fridge-placeholder">
					<div class="fridge-emoji">🧊</div>
					<span>일러스트 플레이스홀더</span>
				</div>

				<div class="ingredient-bubble bubble-one">🥚</div>
				<div class="ingredient-bubble bubble-two">🥕</div>
				<div class="ingredient-bubble bubble-three">🧅</div>
			</div>
		</section>

		<!-- RECENT -->
		<section class="section">
			<div class="section-heading">
				<div>
					<span class="section-kicker">RECENT</span>
					<h2>방금 올라온 레시피</h2>
				</div>

				<a href={appPath('/recipes')} class="more-link">전체보기 →</a>
			</div>

			<div class="recent-list">
				{#each recentRecipes as recipe, index}
					<a href={appPath('/recipes/example')} class="recent-item">
						<div class="recent-number">
							{String(index + 1).padStart(2, '0')}
						</div>

						<div class="recent-thumbnail">
							<span>{['🍲', '🍣', '🍳', '🍅'][index]}</span>
							<small>IMAGE</small>
						</div>

						<div class="recent-info">
							<span>최근 등록</span>
							<h3>{recipe}</h3>
							<p>
								레시피에 대한 간단한 설명이 들어가는 영역입니다.
							</p>
						</div>

						<div class="recent-meta">
							<span>♡ 24</span>
							<span>⏱ 25분</span>
						</div>

						<div class="recent-arrow">→</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- WIKI + COMMUNITY -->
		<section class="split-section">
			<div class="wiki-panel">
				<div class="panel-header">
					<div>
						<span class="section-kicker">INGREDIENT WIKI</span>
						<h2>식재료 위키</h2>
					</div>

					<a href={appPath('/ingredients')}>전체보기 →</a>
				</div>

				<div class="wiki-feature">
					<div class="wiki-image">
						🥬
						<span>이미지 플레이스홀더</span>
					</div>

					<div>
						<span class="wiki-tag">TODAY'S INGREDIENT</span>

						<h3>배추</h3>

						<p>
							배추에 대한 설명과 손질 방법,
							보관 방법 등이 표시됩니다.
						</p>

						<a href={appPath('/ingredients/example')}>식재료 정보 보기 →</a>
					</div>
				</div>
			</div>

			<div class="community-panel">
				<div class="panel-header">
					<div>
						<span class="section-kicker">COMMUNITY</span>
						<h2>요리 이야기</h2>
					</div>

					<a href={appPath('/community')}>더보기 →</a>
				</div>

				<div class="community-list">
					{#each communityPosts as post, index}
						<a href={appPath('/community/example')} class="community-item">
							<div class="community-avatar">
								{['🥘', '🍳', '🥗', '🍞'][index]}
							</div>

							<div>
								<h3>{post}</h3>
								<p>익명의 요리사 · 3시간 전</p>
							</div>

							<span>→</span>
						</a>
					{/each}
				</div>
			</div>
		</section>

		<!-- REGISTER CTA -->
		<section class="register-banner">
			<div class="register-decoration">✿</div>

			<div>
				<span class="section-kicker">SHARE YOUR RECIPE</span>

				<h2>
					나만 알고 있기 아까운
					<br />
					레시피가 있나요?
				</h2>

				<p>
					나의 맛있는 요리를 요리위키에 공유해보세요.
				</p>

				<a href={appPath('/recipes/new')} class="dark-button">
					레시피 등록하기
					<span>→</span>
				</a>
			</div>

			<div class="register-image">
				<span>👩‍🍳</span>
				<p>이미지 플레이스홀더</p>
			</div>
		</section>
	</main>

	<footer>
		<div class="footer-logo">
			<span>🍳</span>
			<strong>요리위키</strong>
		</div>

		<p>
			누구나 만들고, 누구나 공유하는 요리 이야기.
		</p>

		<div class="footer-links">
			<a href={appPath('/notice')}>공지사항</a>
			<a href={appPath('/faq')}>FAQ</a>
			<a href={appPath('/contact')}>문의하기</a>
		</div>

		<small>© 2026 요리위키 · School Web Programming Project</small>
	</footer>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		background: #fffaf0;
		color: #44372d;
		font-family:
			-apple-system,
			BlinkMacSystemFont,
			"Pretendard",
			"Noto Sans KR",
			sans-serif;
	}

	:global(button),
	:global(input) {
		font: inherit;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(button) {
		cursor: pointer;
	}

	/* ==================== APP ==================== */

	.app {
		min-height: 100vh;
	}

	/* ==================== HEADER ==================== */

	.header {
		position: sticky;
		top: 0;
		z-index: 100;

		height: 72px;

		display: flex;
		align-items: center;

		padding: 0 34px;

		background: rgba(255, 250, 240, 0.94);
		border-bottom: 1px solid #f3e6c8;

		backdrop-filter: blur(16px);
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 11px;
	}

	.hamburger {
		width: 42px;
		height: 42px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;

		border: 0;
		border-radius: 12px;

		background: transparent;

		transition: background 0.2s ease;
	}

	.hamburger:hover {
		background: #fff0bd;
	}

	.hamburger span {
		width: 20px;
		height: 2px;

		border-radius: 999px;

		background: #44372d;

		transition:
			transform 0.25s ease,
			opacity 0.2s ease;
	}

	.hamburger.open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.hamburger.open span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 8px;

		font-size: 21px;
		font-weight: 850;
		letter-spacing: -0.06em;
	}

	.logo-mark {
		font-size: 25px;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 8px;

		margin-left: auto;
	}

	.header-search {
		width: 42px;
		height: 42px;

		display: grid;
		place-items: center;

		border: 0;
		border-radius: 12px;

		background: transparent;
	}

	.header-search:hover {
		background: #fff0bd;
	}

	.header-search svg {
		width: 20px;
		height: 20px;

		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
	}

	.login-button {
		padding: 10px 17px;

		border: 1px solid #edcf76;
		border-radius: 999px;

		background: #fff5cf;

		font-size: 14px;
		font-weight: 750;
	}

	.login-button:hover {
		background: #ffedaf;
	}

	/* ==================== SIDE MENU ==================== */

	.menu-overlay {
		position: fixed;
		inset: 0;
		z-index: 150;

		border: 0;
		background: rgba(69, 55, 42, 0.28);

		backdrop-filter: blur(3px);
	}

	.side-menu {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;

		width: min(350px, 88vw);
		height: 100dvh;

		display: flex;
		flex-direction: column;

		padding: 28px 24px;

		background: #fffaf0;
		border-right: 1px solid #f0dfb8;

		box-shadow: 18px 0 40px rgba(88, 67, 39, 0.12);

		transform: translateX(-105%);

		transition:
			transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.side-menu.open {
		transform: translateX(0);
	}

	.side-menu-top {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 3px 4px 22px;

		border-bottom: 1px dashed #ebd99f;
	}

	.side-menu-label {
		margin: 0 0 4px;

		color: #b09663;

		font-size: 14px;
		font-weight: 850;
		letter-spacing: 0.15em;
	}

	.side-menu-top h2 {
		margin: 0;

		font-size: 22px;
		letter-spacing: -0.06em;
	}

	.close-menu {
		width: 38px;
		height: 38px;

		border: 0;
		border-radius: 50%;

		background: #ffe8a7;

		color: #44372d;

		font-size: 27px;
		line-height: 1;

		cursor: pointer;
	}

	.menu-nav {
		display: flex;
		flex-direction: column;
		gap: 4px;

		padding-top: 19px;
	}

	.menu-link {
		display: flex;
		align-items: center;
		gap: 13px;

		padding: 12px 13px;

		border-radius: 12px;

		font-size: 14px;
		font-weight: 700;

		transition:
			background 0.16s ease,
			transform 0.16s ease;
	}

	.menu-link:hover {
		background: #ffefbd;
		transform: translateX(3px);
	}

	.menu-link.active {
		background: #ffd85d;
	}

	.menu-link.secondary {
		color: #796956;
		font-weight: 600;
	}

	.menu-icon {
		width: 25px;

		font-size: 17px;

		text-align: center;
	}

	.menu-divider {
		height: 1px;

		margin: 13px 8px;

		background: #eadbb7;
	}

	.side-menu-footer {
		margin-top: auto;

		padding-top: 18px;

		border-top: 1px dashed #ebd99f;
	}

	.side-menu-footer > a {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 44px;

		border-radius: 12px;

		background: #44372d;
		color: white;

		font-size: 14px;
		font-weight: 750;
	}

	.side-menu-footer p {
		margin: 11px 0 0;

		color: #a39179;

		font-size: 14px;
		text-align: center;
	}

	/* ==================== MAIN ==================== */

	main {
		width: min(1180px, calc(100% - 48px));

		margin: 0 auto;
		padding-bottom: 80px;
	}

	/* ==================== HERO ==================== */

	.hero {
		position: relative;

		min-height: 540px;

		display: grid;
		grid-template-columns: 1fr 460px;
		gap: 60px;
		align-items: center;

		padding: 62px 38px 70px;
	}

	.hero::before {
		content: "";

		position: absolute;
		inset: 24px 0 0;

		z-index: -1;

		border-radius: 38px;

		background: #fff0b8;
	}

	.hero-content {
		padding-left: 26px;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;

		padding: 8px 12px;

		border: 1px solid #eed78b;
		border-radius: 999px;

		background: rgba(255, 255, 255, 0.65);

		color: #987c41;

		font-size: 14px;
		font-weight: 750;
	}

	.hero h1 {
		margin: 21px 0 17px;

		font-size: clamp(44px, 5vw, 68px);
		line-height: 1.08;
		letter-spacing: -0.075em;
	}

	.hero h1 span {
		color: #d99000;
	}

	.hero p {
		margin: 0;

		color: #776453;

		font-size: 15px;
		line-height: 1.8;
		letter-spacing: -0.02em;
	}

	.main-search {
		max-width: 580px;
		height: 60px;

		display: flex;
		align-items: center;

		margin-top: 29px;
		padding: 5px 5px 5px 17px;

		border: 1px solid #ead798;
		border-radius: 17px;

		background: white;
		box-shadow: 0 12px 30px rgba(136, 104, 33, 0.1);
	}

	.search-icon {
		width: 22px;
		height: 22px;
		margin-right: 9px;

		color: #b89a55;
	}

	.search-icon svg {
		width: 100%;
		height: 100%;

		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
	}

	.main-search input {
		flex: 1;

		min-width: 0;

		border: 0;
		outline: 0;

		background: transparent;

		color: #44372d;

		font-size: 14px;
	}

	.main-search input::placeholder {
		color: #b7aa99;
	}

	.main-search button {
		height: 48px;

		padding: 0 23px;

		border: 0;
		border-radius: 12px;

		background: #ffd34f;
		color: #4a3b20;

		font-size: 14px;
		font-weight: 800;
	}

	.main-search button:hover {
		background: #ffca2b;
	}

	.popular-search {
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		gap: 8px;

		margin-top: 13px;

		font-size: 14px;
	}

	.popular-search > span {
		color: #9e8b71;
	}

	.popular-search a {
		padding: 5px 9px;

		border-radius: 999px;

		background: rgba(255, 255, 255, 0.7);

		color: #876f4e;
	}

	.hero-visual {
		position: relative;

		height: 430px;
	}

	.hero-photo {
		position: absolute;
		inset: 28px 15px 20px 15px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		border: 2px dashed #dfc879;
		border-radius: 34px;

		background: #fff8dc;
	}

	.placeholder-doodle {
		width: 110px;
		height: 110px;

		display: grid;
		place-items: center;

		border-radius: 50%;

		background: #ffe17e;

		font-size: 58px;

		box-shadow: 0 12px 20px rgba(130, 92, 22, 0.1);
	}

	.placeholder-text {
		margin-top: 18px;

		color: #a88e55;

		font-size: 14px;
		font-weight: 700;
		text-align: center;
	}

	.placeholder-text span {
		display: inline-block;

		margin-top: 3px;

		color: #c0ad82;

		font-size: 14px;
		font-weight: 500;
	}

	.floating-card {
		position: absolute;

		display: flex;
		align-items: center;
		gap: 9px;

		padding: 11px 14px;

		border: 1px solid #efdda4;
		border-radius: 15px;

		background: white;

		box-shadow: 0 10px 25px rgba(111, 85, 39, 0.12);
	}

	.floating-card > span {
		font-size: 20px;
	}

	.floating-card strong,
	.floating-card small {
		display: block;
	}

	.floating-card strong {
		font-size: 14px;
	}

	.floating-card small {
		margin-top: 2px;

		color: #9a8b7a;

		font-size: 14px;
	}

	.floating-card-top {
		top: 16px;
		right: -7px;
	}

	.floating-card-bottom {
		bottom: 5px;
		left: -16px;
	}

	.hero-decoration {
		position: absolute;

		color: #e0a61a;

		font-weight: 800;
	}

	.decoration-one {
		top: 86px;
		left: 3px;
		font-size: 25px;
	}

	.decoration-two {
		right: 465px;
		bottom: 35px;
		font-size: 21px;
	}

	.decoration-three {
		top: 157px;
		right: 485px;
		font-size: 27px;
	}

	/* ==================== SECTIONS ==================== */

	.section {
		padding: 39px 0 0;
	}

	.section-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;

		margin-bottom: 22px;
		padding: 0 4px;
	}

	.section-kicker {
		display: block;

		margin-bottom: 7px;

		color: #ba963b;

		font-size: 14px;
		font-weight: 850;
		letter-spacing: 0.16em;
	}

	.section-heading h2,
	.panel-header h2 {
		margin: 0;

		color: #44372d;

		font-size: 25px;
		letter-spacing: -0.06em;
	}

	.more-link {
		color: #9a8051;

		font-size: 14px;
		font-weight: 700;
	}

	.more-link:hover {
		color: #c78800;
	}

	/* ==================== CATEGORY ==================== */

	.category-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 12px;
	}

	.category-card {
		min-height: 145px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		gap: 14px;

		border: 1px solid #efdfba;
		border-radius: 19px;

		background: #fffdf8;

		box-shadow: 0 5px 15px rgba(111, 84, 36, 0.04);

		transition:
			transform 0.2s ease,
			background 0.2s ease;
	}

	.category-card:hover {
		transform: translateY(-5px);
		background: #fff4c9;
	}

	.category-icon {
		width: 60px;
		height: 60px;

		display: grid;
		place-items: center;

		border-radius: 19px;

		background: #fff0b7;

		font-size: 30px;
	}

	.category-card strong {
		font-size: 14px;
	}

	/* ==================== RECIPE ==================== */

	.recipe-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 15px;
	}

	.recipe-card {
		overflow: hidden;

		border: 1px solid #efdfba;
		border-radius: 19px;

		background: white;

		box-shadow: 0 6px 20px rgba(106, 76, 26, 0.045);

		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.recipe-card:hover {
		transform: translateY(-5px);

		box-shadow: 0 13px 28px rgba(106, 76, 26, 0.09);
	}

	.recipe-image {
		position: relative;

		height: 190px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: #fff0bd;
	}

	.recipe-image > span {
		margin-bottom: 7px;

		font-size: 48px;
	}

	.image-placeholder {
		color: #ad965f;

		font-size: 14px;
	}

	.favorite {
		position: absolute;
		top: 11px;
		right: 11px;

		width: 32px;
		height: 32px;

		border: 1px solid #efd995;
		border-radius: 50%;

		background: rgba(255, 255, 255, 0.85);

		color: #8f7651;

		font-size: 18px;
		line-height: 1;
	}

	.recipe-body {
		padding: 16px 16px 14px;
	}

	.recipe-tags {
		display: flex;
		gap: 8px;

		margin-bottom: 7px;

		color: #b79241;

		font-size: 14px;
	}

	.recipe-body h3 {
		margin: 0;

		font-size: 17px;
		letter-spacing: -0.04em;
	}

	.recipe-body p {
		margin: 7px 0 15px;

		color: #9b8d7c;

		font-size: 14px;
		line-height: 1.55;
	}

	.recipe-footer {
		display: flex;
		justify-content: space-between;

		padding-top: 10px;

		border-top: 1px dashed #eee1c7;

		color: #a4937e;

		font-size: 14px;
	}

	/* ==================== REFRIGERATOR ==================== */

	.refrigerator {
		position: relative;

		overflow: hidden;

		min-height: 330px;

		display: grid;
		grid-template-columns: 1fr 360px;
		gap: 30px;

		margin-top: 56px;
		padding: 39px 45px;

		border: 1px solid #efda89;
		border-radius: 29px;

		background: #ffe898;
	}

	.refrigerator-content {
		position: relative;
		z-index: 1;
	}

	.refrigerator h2 {
		margin: 9px 0 10px;

		font-size: 31px;
		line-height: 1.3;
		letter-spacing: -0.065em;
	}

	.refrigerator p {
		margin: 0;

		color: #806a42;

		font-size: 14px;
		line-height: 1.7;
	}

	.ingredient-list {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;

		max-width: 590px;

		margin: 20px 0;
	}

	.ingredient-list button {
		padding: 8px 11px;

		border: 1px solid #e5c85e;
		border-radius: 999px;

		background: rgba(255, 255, 255, 0.5);

		color: #6e5933;

		font-size: 14px;
	}

	.ingredient-list button:hover {
		background: white;
	}

	.ingredient-list button span {
		margin-right: 3px;

		font-weight: 800;
	}

	.yellow-button {
		display: inline-flex;
		align-items: center;
		gap: 12px;

		padding: 11px 16px;

		border-radius: 11px;

		background: #44372d;
		color: white;

		font-size: 14px;
		font-weight: 750;
	}

	.refrigerator-visual {
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fridge-placeholder {
		width: 270px;
		height: 230px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		border: 2px dashed #d8b944;
		border-radius: 28px;

		background: rgba(255, 250, 220, 0.52);

		color: #b39247;

		text-align: center;
	}

	.fridge-emoji {
		margin-bottom: 8px;

		font-size: 72px;
	}

	.fridge-placeholder > span {
		font-size: 14px;
	}

	.ingredient-bubble {
		position: absolute;

		width: 42px;
		height: 42px;

		display: grid;
		place-items: center;

		border: 3px solid rgba(255, 255, 255, 0.8);
		border-radius: 50%;

		background: #fff9df;

		font-size: 19px;

		box-shadow: 0 7px 15px rgba(126, 91, 18, 0.12);
	}

	.bubble-one {
		top: 18px;
		left: 38px;
	}

	.bubble-two {
		right: 22px;
		top: 58px;
	}

	.bubble-three {
		right: 54px;
		bottom: 12px;
	}

	/* ==================== RECENT ==================== */

	.recent-list {
		border-top: 1px dashed #eadcbf;
	}

	.recent-item {
		display: grid;
		grid-template-columns: 32px 78px 1fr auto 22px;
		align-items: center;
		gap: 15px;

		padding: 12px 5px;

		border-bottom: 1px dashed #eadcbf;
	}

	.recent-item:hover {
		background: rgba(255, 241, 193, 0.38);
	}

	.recent-number {
		color: #c5aa6c;

		font-size: 14px;
		font-weight: 800;
	}

	.recent-thumbnail {
		width: 78px;
		height: 57px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		border-radius: 12px;

		background: #fff0bb;

		font-size: 22px;
	}

	.recent-thumbnail small {
		color: #bfa66d;

		font-size: 14px;
	}

	.recent-info > span {
		color: #c19c50;

		font-size: 14px;
	}

	.recent-info h3 {
		margin: 4px 0 3px;

		font-size: 14px;
	}

	.recent-info p {
		margin: 0;

		color: #a49482;

		font-size: 14px;
	}

	.recent-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 4px;

		color: #9f907d;

		font-size: 14px;
	}

	.recent-arrow {
		color: #c6a95e;
	}

	/* ==================== WIKI / COMMUNITY ==================== */

	.split-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 18px;

		margin-top: 57px;
	}

	.wiki-panel,
	.community-panel {
		padding: 27px;

		border: 1px solid #efdfba;
		border-radius: 22px;

		background: white;
	}

	.panel-header {
		display: flex;
		align-items: end;
		justify-content: space-between;

		margin-bottom: 22px;
	}

	.panel-header h2 {
		font-size: 21px;
	}

	.panel-header > a {
		color: #9a8051;

		font-size: 14px;
		font-weight: 700;
	}

	.wiki-feature {
		display: grid;
		grid-template-columns: 155px 1fr;
		gap: 18px;
		align-items: center;
	}

	.wiki-image {
		height: 160px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		border-radius: 16px;

		background: #fff0bc;

		font-size: 50px;
	}

	.wiki-image span {
		margin-top: 9px;

		color: #b29968;

		font-size: 14px;
	}

	.wiki-tag {
		color: #c29835;

		font-size: 14px;
		font-weight: 850;
		letter-spacing: 0.1em;
	}

	.wiki-feature h3 {
		margin: 7px 0 7px;

		font-size: 20px;
	}

	.wiki-feature p {
		margin: 0 0 12px;

		color: #968775;

		font-size: 14px;
		line-height: 1.7;
	}

	.wiki-feature a {
		color: #b3831e;

		font-size: 14px;
		font-weight: 750;
	}

	.community-list {
		display: flex;
		flex-direction: column;
	}

	.community-item {
		display: grid;
		grid-template-columns: 36px 1fr 16px;
		align-items: center;
		gap: 11px;

		padding: 11px 0;

		border-bottom: 1px dashed #eee3cf;
	}

	.community-avatar {
		width: 36px;
		height: 36px;

		display: grid;
		place-items: center;

		border-radius: 50%;

		background: #fff1c2;

		font-size: 18px;
	}

	.community-item h3 {
		overflow: hidden;

		margin: 0;

		color: #544538;

		font-size: 14px;
		font-weight: 700;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.community-item p {
		margin: 4px 0 0;

		color: #ad9d8b;

		font-size: 14px;
	}

	.community-item > span {
		color: #baa06a;
	}

	/* ==================== REGISTER ==================== */

	.register-banner {
		position: relative;

		overflow: hidden;

		min-height: 250px;

		display: grid;
		grid-template-columns: 1fr 280px;
		align-items: center;
		gap: 30px;

		margin-top: 58px;
		padding: 37px 43px;

		border-radius: 27px;

		background: #f4dfaa;
	}

	.register-decoration {
		position: absolute;
		right: 285px;
		top: 20px;

		color: #d3ae59;

		font-size: 48px;
		transform: rotate(15deg);
	}

	.register-banner h2 {
		margin: 7px 0 10px;

		font-size: 29px;
		line-height: 1.28;
		letter-spacing: -0.065em;
	}

	.register-banner p {
		margin: 0 0 18px;

		color: #806d51;

		font-size: 14px;
	}

	.dark-button {
		display: inline-flex;
		align-items: center;
		gap: 12px;

		padding: 11px 16px;

		border-radius: 11px;

		background: #44372d;
		color: white;

		font-size: 14px;
		font-weight: 750;
	}

	.register-image {
		height: 175px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		border: 2px dashed #d4b971;
		border-radius: 20px;

		background: rgba(255, 249, 224, 0.48);

		color: #a68b53;
	}

	.register-image span {
		margin-bottom: 7px;

		font-size: 54px;
	}

	.register-image p {
		margin: 0;

		color: #ae9564;

		font-size: 14px;
	}

	/* ==================== FOOTER ==================== */

	footer {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 7px 30px;

		padding: 30px max(24px, calc((100% - 1180px) / 2));

		border-top: 1px solid #eedfbf;

		background: #fff9ea;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 6px;

		font-size: 17px;
	}

	.footer-logo span {
		font-size: 21px;
	}

	footer > p {
		margin: 0;

		color: #a3927e;

		font-size: 14px;
	}

	.footer-links {
		grid-column: 2;

		grid-row: 1 / span 3;

		display: flex;
		gap: 17px;
		align-items: center;
	}

	.footer-links a {
		color: #9b876a;

		font-size: 14px;
	}

	footer small {
		color: #b3a28e;

		font-size: 14px;
	}

	/* ==================== RESPONSIVE ==================== */

	@media (max-width: 1000px) {
		main {
			width: min(100% - 32px, 860px);
		}

		.hero {
			grid-template-columns: 1fr;
			padding-bottom: 45px;
		}

		.hero-content {
			padding-left: 0;
		}

		.hero-visual {
			max-width: 460px;
			width: 100%;
			margin: 0 auto;
		}

		.category-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.recipe-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.refrigerator {
			grid-template-columns: 1fr;
		}

		.refrigerator-visual {
			min-height: 250px;
		}

		.split-section {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 680px) {
		.header {
			height: 62px;
			padding: 0 14px;
		}

		.login-button {
			display: none;
		}

		main {
			width: calc(100% - 24px);
		}

		.hero {
			padding: 42px 16px 32px;
		}

		.hero::before {
			inset: 14px 0 0;
		}

		.hero h1 {
			font-size: 43px;
		}

		.hero p {
			font-size: 14px;
		}

		.hero-photo {
			inset: 15px 5px 18px;
		}

		.hero-visual {
			height: 330px;
		}

		.floating-card-top {
			right: -3px;
		}

		.floating-card-bottom {
			left: -5px;
		}

		.category-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.category-card {
			min-height: 115px;
		}

		.category-icon {
			width: 48px;
			height: 48px;
			font-size: 23px;
		}

		.recipe-grid {
			grid-template-columns: 1fr;
		}

		.recipe-image {
			height: 210px;
		}

		.refrigerator {
			padding: 28px 23px;
		}

		.refrigerator h2 {
			font-size: 26px;
		}

		.refrigerator-visual {
			display: none;
		}

		.recent-item {
			grid-template-columns: 25px 65px 1fr 18px;
			gap: 9px;
		}

		.recent-thumbnail {
			width: 65px;
		}

		.recent-meta {
			display: none;
		}

		.wiki-feature {
			grid-template-columns: 1fr;
		}

		.wiki-image {
			height: 130px;
		}

		.register-banner {
			grid-template-columns: 1fr;
			padding: 30px 24px;
		}

		.register-image {
			display: none;
		}

		.register-decoration {
			right: 14px;
			top: 12px;
		}

		footer {
			display: block;
		}

		.footer-links {
			margin: 16px 0;
		}

		footer > p {
			margin-top: 8px;
		}

		footer small {
			display: block;
		}
	}
</style>