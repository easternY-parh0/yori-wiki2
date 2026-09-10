<script lang="ts">
	import { onMount } from 'svelte';

	type Recipe = {
		title: string;
		category: string;
		description: string;
		time: string;
		difficulty: string;
		likes: number;
	};

	let searchKeyword = $state('');
	let selectedCategory = $state('전체');
	let selectedDifficulty = $state('전체');
	let selectedTime = $state('전체');
	let sortType = $state('인기순');
	let currentPage = $state(1);

	const categories = ['전체', '한식', '중식', '일식', '양식', '베이킹', '간식'];

	const difficulties = ['전체', '쉬움', '보통', '어려움'];

	const times = ['전체', '15분 이내', '30분 이내', '1시간 이내'];

	const recipes: Recipe[] = [
		{
			title: '레시피 제목',
			category: '한식',
			description: '레시피에 대한 간단한 설명이 들어가는 영역입니다.',
			time: '20분',
			difficulty: '쉬움',
			likes: 128
		},
		{
			title: '레시피 제목',
			category: '양식',
			description: '레시피에 대한 간단한 설명이 들어가는 영역입니다.',
			time: '35분',
			difficulty: '보통',
			likes: 96
		},
		{
			title: '레시피 제목',
			category: '일식',
			description: '레시피에 대한 간단한 설명이 들어가는 영역입니다.',
			time: '25분',
			difficulty: '쉬움',
			likes: 82
		},
		{
			title: '레시피 제목',
			category: '베이킹',
			description: '레시피에 대한 간단한 설명이 들어가는 영역입니다.',
			time: '50분',
			difficulty: '보통',
			likes: 75
		},
		{
			title: '레시피 제목',
			category: '한식',
			description: '레시피에 대한 간단한 설명이 들어가는 영역입니다.',
			time: '30분',
			difficulty: '보통',
			likes: 71
		},
		{
			title: '레시피 제목',
			category: '중식',
			description: '레시피에 대한 간단한 설명이 들어가는 영역입니다.',
			time: '40분',
			difficulty: '어려움',
			likes: 64
		},
		{
			title: '레시피 제목',
			category: '간식',
			description: '레시피에 대한 간단한 설명이 들어가는 영역입니다.',
			time: '15분',
			difficulty: '쉬움',
			likes: 58
		},
		{
			title: '레시피 제목',
			category: '양식',
			description: '레시피에 대한 간단한 설명이 들어가는 영역입니다.',
			time: '45분',
			difficulty: '어려움',
			likes: 51
		}
	];

	const popularKeywords = ['김치볶음밥', '파스타', '계란요리', '자취요리'];

	function resetFilters() {
		searchKeyword = '';
		selectedCategory = '전체';
		selectedDifficulty = '전체';
		selectedTime = '전체';
		sortType = '인기순';
		currentPage = 1;
	}

	function submitSearch() {
		currentPage = 1;
	}
</script>

<svelte:head>
	<title>레시피 | 요리위키</title>
	<meta
		name="description"
		content="요리위키에서 다양한 레시피를 검색하고 찾아보세요."
	/>
</svelte:head>

<div class="page">
	<main>
		<!-- 페이지 헤더 -->
		<section class="page-heading">
			<div>
				<h1>레시피</h1>
				<p>만들고 싶은 요리를 찾아보고 새로운 레시피를 발견해보세요.</p>
			</div>

			<a href="/recipes/new" class="register-button">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M12 5v14" />
					<path d="M5 12h14" />
				</svg>
				레시피 등록하기
			</a>
		</section>

		<!-- 검색 -->
		<section class="search-section">
			<form class="recipe-search" onsubmit={(event) => { event.preventDefault(); submitSearch(); }}>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="10.5" cy="10.5" r="6" />
					<path d="M15 15l5 5" />
				</svg>

				<input
					bind:value={searchKeyword}
					placeholder="레시피 이름이나 재료를 검색하세요"
				/>

				<button type="submit">검색</button>
			</form>

			<div class="popular-searches">
				<span>추천 검색어</span>

				{#each popularKeywords as keyword}
					<button
						type="button"
						onclick={() => {
							searchKeyword = keyword;
							currentPage = 1;
						}}
					>
						{keyword}
					</button>
				{/each}
			</div>
		</section>

		<!-- 카테고리 -->
		<section class="category-section">
			<div class="section-heading">
				<h2>카테고리</h2>
			</div>

			<div class="category-tabs">
				{#each categories as category}
					<button
						class:active={selectedCategory === category}
						type="button"
						onclick={() => {
							selectedCategory = category;
							currentPage = 1;
						}}
					>
						{category}
					</button>
				{/each}
			</div>
		</section>

		<!-- 필터 -->
		<section class="filter-section">
			<div class="filter-left">
				<div class="filter-group">
					<label for="difficulty">난이도</label>
					<select id="difficulty" bind:value={selectedDifficulty}>
						{#each difficulties as difficulty}
							<option value={difficulty}>{difficulty}</option>
						{/each}
					</select>
				</div>

				<div class="filter-group">
					<label for="time">조리시간</label>
					<select id="time" bind:value={selectedTime}>
						{#each times as time}
							<option value={time}>{time}</option>
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

				<select id="sort" bind:value={sortType}>
					<option value="인기순">인기순</option>
					<option value="최신순">최신순</option>
					<option value="조회순">조회순</option>
					<option value="평점순">평점순</option>
				</select>
			</div>
		</section>

		<!-- 결과 -->
		<section class="result-section">
			<div class="result-heading">
				<div>
					<h2>레시피 목록</h2>
					<span>총 128개의 레시피</span>
				</div>
			</div>

			<div class="recipe-grid">
				{#each recipes as recipe}
					<a href="/recipes/example" class="recipe-card">
						<div class="recipe-image">
							<span>레시피 이미지 영역</span>

							<button
								class="bookmark-button"
								type="button"
								aria-label="즐겨찾기"
								onclick={(event) => event.preventDefault()}
							>
								<svg viewBox="0 0 24 24" aria-hidden="true">
									<path d="M6 4h12v17l-6-4-6 4z" />
								</svg>
							</button>
						</div>

						<div class="recipe-content">
							<div class="recipe-category">
								{recipe.category}
							</div>

							<h3>{recipe.title}</h3>

							<p>{recipe.description}</p>

							<div class="recipe-meta">
								<span>{recipe.time}</span>
								<span>{recipe.difficulty}</span>
								<span>좋아요 {recipe.likes}</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- 페이지네이션 -->
		<section class="pagination-section">
			<div class="pagination">
				<button
					type="button"
					disabled={currentPage === 1}
					onclick={() => (currentPage = Math.max(1, currentPage - 1))}
					aria-label="이전 페이지"
				>
					<svg viewBox="0 0 24 24">
						<path d="M14 6l-6 6 6 6" />
					</svg>
				</button>

				<button
					class:active={currentPage === 1}
					type="button"
					onclick={() => (currentPage = 1)}
				>
					1
				</button>

				<button
					class:active={currentPage === 2}
					type="button"
					onclick={() => (currentPage = 2)}
				>
					2
				</button>

				<button
					class:active={currentPage === 3}
					type="button"
					onclick={() => (currentPage = 3)}
				>
					3
				</button>

				<span>...</span>

				<button
					type="button"
					onclick={() => (currentPage = 12)}
				>
					12
				</button>

				<button
					type="button"
					onclick={() => (currentPage = Math.min(12, currentPage + 1))}
					aria-label="다음 페이지"
				>
					<svg viewBox="0 0 24 24">
						<path d="M10 6l6 6-6 6" />
					</svg>
				</button>
			</div>
		</section>

		<!-- 등록 CTA -->
		<section class="register-section">
			<div>
				<span>직접 만든 레시피가 있나요?</span>
				<h2>나만의 레시피를<br />요리위키에 등록해보세요.</h2>
				<p>다른 사람들과 맛있는 요리 이야기를 나눠보세요.</p>
			</div>

			<a href="/recipes/new" class="register-cta">
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

	:global(html.dark-theme) {
		color-scheme: dark;
		background: #0f172a;
	}

	:global(body.dark-theme) {
		background: #0f172a;
		color: #f8fafc;
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

	.page-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 30px;
		padding: 55px 8px 35px;
	}

	.page-heading h1 {
		margin: 0 0 9px;
		font-size: 42px;
		letter-spacing: -.07em;
	}

	.page-heading p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 12px;
	}

	.register-button {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 11px 15px;
		border-radius: 10px;
		background: var(--primary);
		color: #0f172a;
		font-size: 10px;
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
		font-size: 12px;
	}

	.recipe-search input::placeholder {
		color: var(--text-muted);
	}

	.recipe-search button {
		height: 46px;
		padding: 0 21px;
		border: 0;
		border-radius: 9px;
		background: var(--primary);
		color: #0f172a;
		font-size: 11px;
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
		font-size: 9px;
	}

	.popular-searches button {
		padding: 5px 9px;
		border: 0;
		border-radius: 999px;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 9px;
		cursor: pointer;
	}

	.category-section {
		margin-top: 38px;
	}

	.section-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 15px;
	}

	.section-heading h2 {
		margin: 0;
		font-size: 18px;
		letter-spacing: -.05em;
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
		font-size: 10px;
		cursor: pointer;
		transition: .15s ease;
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
		gap: 10px;
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
		font-size: 9px;
	}

	select {
		min-width: 100px;
		padding: 8px 28px 8px 10px;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--surface);
		color: var(--text);
		font-size: 9px;
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
		font-size: 9px;
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
		align-items: end;
		margin-bottom: 18px;
	}

	.result-heading h2 {
		margin: 0;
		font-size: 22px;
		letter-spacing: -.05em;
	}

	.result-heading span {
		display: block;
		margin-top: 5px;
		color: var(--text-muted);
		font-size: 9px;
	}

	.recipe-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 15px;
	}

	.recipe-card {
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: 17px;
		background: var(--surface);
		transition: .18s ease;
	}

	.recipe-card:hover {
		transform: translateY(-3px);
		border-color: var(--primary);
		box-shadow: 0 12px 25px var(--shadow-card);
	}

	.recipe-image {
		position: relative;
		height: 190px;
		display: grid;
		place-items: center;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 9px;
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
		padding: 15px;
	}

	.recipe-category {
		color: var(--accent);
		font-size: 8px;
		font-weight: 750;
	}

	.recipe-content h3 {
		margin: 6px 0;
		font-size: 16px;
		letter-spacing: -.04em;
	}

	.recipe-content p {
		min-height: 27px;
		margin: 0 0 14px;
		color: var(--text-subtle);
		font-size: 9px;
		line-height: 1.5;
	}

	.recipe-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
		padding-top: 10px;
		border-top: 1px solid var(--border);
		color: var(--text-subtle);
		font-size: 8px;
	}

	.recipe-meta span:not(:last-child)::after {
		content: "·";
		margin-left: 7px;
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

	.pagination button {
		width: 34px;
		height: 34px;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 9px;
		background: var(--surface);
		color: var(--text-subtle);
		font-size: 10px;
		cursor: pointer;
	}

	.pagination button:hover:not(:disabled) {
		border-color: var(--primary);
		background: var(--surface-yellow);
		color: var(--text);
	}

	.pagination button.active {
		border-color: var(--primary);
		background: var(--primary);
		color: #0f172a;
		font-weight: 750;
	}

	.pagination button:disabled {
		cursor: default;
		opacity: .35;
	}

	.pagination span {
		padding: 0 5px;
		color: var(--text-muted);
		font-size: 10px;
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
		font-size: 9px;
		font-weight: 800;
	}

	.register-section h2 {
		margin: 7px 0 8px;
		font-size: 23px;
		line-height: 1.3;
		letter-spacing: -.06em;
	}

	.register-section p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 9px;
	}

	.register-cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 15px;
		border-radius: 9px;
		background: var(--accent);
		color: #ffffff;
		font-size: 10px;
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

		.filter-left {
			flex-wrap: wrap;
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

		.category-tabs {
			gap: 6px;
		}

		.category-tabs button {
			padding: 8px 12px;
		}

		.recipe-grid {
			grid-template-columns: 1fr;
		}

		.recipe-image {
			height: 210px;
		}

		.register-section {
			align-items: flex-start;
			flex-direction: column;
			padding: 25px 22px;
		}
	}
</style>