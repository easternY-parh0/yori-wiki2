<script lang="ts">
	import { appPath } from '$lib/app-path';
	type Ingredient = {
		name: string;
		category: string;
		description: string;
		tags: string[];
	};

	let searchQuery = $state('');
	let selectedCategory = $state('전체');

	const categories = ['전체', '채소', '육류', '해산물', '과일', '곡류', '조미료', '유제품'];

	const ingredients: Ingredient[] = [
		{ name: '양파', category: '채소', description: '다양한 요리에 기본적으로 사용되는 대표적인 향신 채소입니다.', tags: ['기본재료', '채소'] },
		{ name: '대파', category: '채소', description: '국물과 볶음 요리에 향을 더해주는 친숙한 식재료입니다.', tags: ['향채', '채소'] },
		{ name: '마늘', category: '채소', description: '알싸한 향과 풍미를 더하기 위해 폭넓게 사용됩니다.', tags: ['향신료', '채소'] },
		{ name: '돼지고기', category: '육류', description: '구이부터 찌개, 볶음까지 다양한 요리에 활용됩니다.', tags: ['육류', '단백질'] },
		{ name: '닭고기', category: '육류', description: '담백한 맛으로 다양한 조리법에 활용하기 좋은 식재료입니다.', tags: ['육류', '단백질'] },
		{ name: '연어', category: '해산물', description: '구이와 샐러드 등 여러 요리에 활용되는 대표적인 생선입니다.', tags: ['생선', '해산물'] },
		{ name: '토마토', category: '채소', description: '샐러드와 소스 등 다양한 형태로 활용되는 식재료입니다.', tags: ['채소', '소스'] },
		{ name: '감자', category: '채소', description: '찌개와 볶음, 구이 등 여러 조리법에 사용할 수 있습니다.', tags: ['전분', '채소'] },
		{ name: '쌀', category: '곡류', description: '한국 식문화에서 가장 기본적인 곡류 식재료입니다.', tags: ['곡류', '주식'] },
		{ name: '버터', category: '유제품', description: '고소한 풍미를 더하거나 조리용으로 사용할 수 있습니다.', tags: ['유제품', '조리'] },
		{ name: '간장', category: '조미료', description: '짠맛과 감칠맛을 더하는 대표적인 전통 조미료입니다.', tags: ['조미료', '발효'] },
		{ name: '사과', category: '과일', description: '상큼한 맛과 아삭한 식감이 특징인 대표적인 과일입니다.', tags: ['과일', '디저트'] }
	];

	const filteredIngredients = $derived(
		ingredients.filter((ingredient) => {
			const matchesCategory = selectedCategory === '전체' || ingredient.category === selectedCategory;
			const query = searchQuery.trim().toLowerCase();
			const matchesSearch =
				!query ||
				ingredient.name.toLowerCase().includes(query) ||
				ingredient.description.toLowerCase().includes(query) ||
				ingredient.tags.some((tag) => tag.toLowerCase().includes(query));

			return matchesCategory && matchesSearch;
		})
	);
</script>

<svelte:head>
	<title>식재료 위키 | 요리위키</title>
	<meta name="description" content="요리위키 식재료 위키에서 다양한 식재료 정보를 찾아보세요." />
</svelte:head>

<div class="page">
	<main>
		<section class="hero">
			<div class="hero-copy">
				<span class="eyebrow">식재료 위키</span>
				<h1>요리에 들어가는<br /><strong>모든 식재료를 찾아보세요.</strong></h1>
				<p>식재료의 특징과 활용법을 한곳에서 확인하고, 새로운 재료를 발견해보세요.</p>
			</div>
			<div class="hero-visual">
				<div class="placeholder-image">
					<svg viewBox="0 0 24 24"><path d="M4 18l5-6 4 4 3-3 4 5M5 19h14M8 8h.01" /></svg>
					<span>식재료 이미지<br />플레이스홀더</span>
				</div>
			</div>
		</section>

		<section class="search-section">
			<div class="search-box">
				<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" /></svg>
				<input bind:value={searchQuery} type="search" placeholder="식재료 이름을 검색해보세요" />
				{#if searchQuery}
					<button type="button" class="clear-button" aria-label="검색어 지우기" onclick={() => (searchQuery = '')}>
						<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
					</button>
				{/if}
			</div>
		</section>

		<section class="category-section">
			<div class="section-heading">
				<div>
					<span class="section-label">CATEGORY</span>
					<h2>카테고리로 찾아보기</h2>
				</div>
			</div>

			<div class="category-list">
				{#each categories as category}
					<button class:active={selectedCategory === category} type="button" onclick={() => (selectedCategory = category)}>
						{#if category === '채소'}
							<svg viewBox="0 0 24 24"><path d="M12 20c5-2 7-6 7-11-5 0-9 2-11 6M12 20C7 19 5 15 5 10c5 0 8 2 10 5" /></svg>
						{:else if category === '육류'}
							<svg viewBox="0 0 24 24"><path d="M7 15c-2-2-2-5 0-7 3-3 8-2 10 1 2 3 1 7-2 9-3 2-6 0-8-3z" /><circle cx="14.5" cy="10" r="1" /></svg>
						{:else if category === '해산물'}
							<svg viewBox="0 0 24 24"><path d="M4 12c3-5 9-7 16-4-2 6-7 9-13 8l-3 2 1-3-1-3z" /><path d="M15 9h.01" /></svg>
						{:else}
							<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" /><path d="M12 5v14M5 12h14" /></svg>
						{/if}
						<span>{category}</span>
					</button>
				{/each}
			</div>
		</section>

		<section class="popular-section">
			<div class="section-heading">
				<div>
					<span class="section-label">POPULAR</span>
					<h2>많이 찾는 식재료</h2>
				</div>
				<a href="#all" class="more-link">전체 보기 <span>→</span></a>
			</div>

			<div class="popular-grid">
				{#each ingredients.slice(0, 4) as ingredient}
					<a href={appPath(`/ingredients/${ingredient.name}`)} class="popular-card">
						<div class="ingredient-image">
							<span>IMAGE</span>
						</div>
						<div class="popular-content">
							<span>{ingredient.category}</span>
							<h3>{ingredient.name}</h3>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<section id="all" class="all-section">
			<div class="section-heading">
				<div>
					<span class="section-label">INGREDIENTS</span>
					<h2>전체 식재료</h2>
				</div>
				<span class="result-count">{filteredIngredients.length}개의 식재료</span>
			</div>

			{#if filteredIngredients.length > 0}
				<div class="ingredient-grid">
					{#each filteredIngredients as ingredient}
						<a href={appPath(`/ingredients/${ingredient.name}`)} class="ingredient-card">
							<div class="card-image">
								<span>IMAGE</span>
							</div>
							<div class="card-body">
								<div class="card-category">{ingredient.category}</div>
								<h3>{ingredient.name}</h3>
								<p>{ingredient.description}</p>
								<div class="tags">
									{#each ingredient.tags as tag}
										<span>{tag}</span>
									{/each}
								</div>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="empty-state">
					<div class="empty-icon">
						<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21M8 11h6" /></svg>
					</div>
					<h3>검색 결과가 없습니다.</h3>
					<p>다른 식재료 이름이나 카테고리로 검색해보세요.</p>
					<button type="button" onclick={() => { searchQuery = ''; selectedCategory = '전체'; }}>검색 초기화</button>
				</div>
			{/if}
		</section>
	</main>
</div>

<style>
	svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.page {
		min-height: 100vh;
		background: var(--background);
	}

	main {
		width: min(1120px, 100%);
		margin: 0 auto;
		padding: 52px 24px 100px;
	}

	.hero {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 50px;
		align-items: center;
		padding: 20px 0 58px;
	}

	.eyebrow,
	.section-label {
		color: var(--accent);
		font-size: 14px;
		font-weight: 800;
		letter-spacing: 0.1em;
	}

	.hero h1 {
		margin: 13px 0 17px;
		font-size: 40px;
		line-height: 1.18;
		letter-spacing: -0.065em;
	}

	.hero h1 strong {
		color: var(--accent);
	}

	.hero p {
		max-width: 520px;
		margin: 0;
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 1.8;
	}

	.hero-visual {
		display: flex;
		justify-content: flex-end;
	}

	.placeholder-image {
		width: 100%;
		max-width: 390px;
		aspect-ratio: 1.45;
		border-radius: 22px;
		background: var(--surface-yellow);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		color: var(--text-muted);
		text-align: center;
		font-size: 14px;
	}

	.placeholder-image svg {
		width: 38px;
		height: 38px;
		color: var(--accent);
	}

	.search-section {
		margin-bottom: 55px;
	}

	.search-box {
		display: flex;
		align-items: center;
		gap: 12px;
		width: min(700px, 100%);
		margin: 0 auto;
		padding: 0 17px;
		height: 54px;
		border: 1px solid var(--border);
		border-radius: 14px;
		background: var(--surface);
		box-shadow: 0 8px 25px rgba(15, 23, 42, 0.05);
	}

	.search-box:focus-within {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.15);
	}

	.search-box > svg {
		width: 19px;
		height: 19px;
		color: var(--text-muted);
	}

	.search-box input {
		width: 100%;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--text);
		font-size: 14px;
	}

	.search-box input::placeholder {
		color: var(--text-muted);
	}

	.clear-button {
		width: 27px;
		height: 27px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border: 0;
		border-radius: 7px;
		background: var(--surface-subtle);
		color: var(--text-muted);
		cursor: pointer;
	}

	.clear-button svg {
		width: 13px;
		height: 13px;
	}

	.category-section,
	.popular-section,
	.all-section {
		margin-bottom: 62px;
	}

	.section-heading {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin-bottom: 19px;
	}

	.section-heading h2 {
		margin: 7px 0 0;
		font-size: 20px;
		letter-spacing: -0.055em;
	}

	.category-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.category-list button {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 10px 14px;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--surface);
		color: var(--text-subtle);
		font-size: 14px;
		font-weight: 650;
		cursor: pointer;
	}

	.category-list button:hover {
		border-color: var(--primary);
	}

	.category-list button.active {
		border-color: var(--primary);
		background: var(--primary);
		color: #0f172a;
	}

	.category-list svg {
		width: 15px;
		height: 15px;
	}

	.more-link {
		color: var(--accent);
		font-size: 14px;
		font-weight: 700;
	}

	.more-link span {
		margin-left: 3px;
	}

	.result-count {
		color: var(--text-muted);
		font-size: 14px;
	}

	.popular-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 13px;
	}

	.popular-card {
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: 14px;
		background: var(--surface);
		transition: transform 0.18s, border-color 0.18s;
	}

	.popular-card:hover {
		transform: translateY(-3px);
		border-color: var(--primary);
	}

	.ingredient-image {
		aspect-ratio: 1.3;
		background: var(--surface-subtle);
		display: grid;
		place-items: center;
		color: var(--text-muted);
		font-size: 14px;
	}

	.popular-content {
		padding: 13px;
	}

	.popular-content span {
		color: var(--accent);
		font-size: 14px;
		font-weight: 700;
	}

	.popular-content h3 {
		margin: 5px 0 0;
		font-size: 14px;
		letter-spacing: -0.04em;
	}

	.ingredient-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
	}

	.ingredient-card {
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: 14px;
		background: var(--surface);
		transition: transform 0.18s, border-color 0.18s;
	}

	.ingredient-card:hover {
		transform: translateY(-3px);
		border-color: var(--primary);
	}

	.card-image {
		aspect-ratio: 1.75;
		background: var(--surface-subtle);
		display: grid;
		place-items: center;
		color: var(--text-muted);
		font-size: 14px;
	}

	.card-body {
		padding: 16px;
	}

	.card-category {
		color: var(--accent);
		font-size: 14px;
		font-weight: 750;
	}

	.card-body h3 {
		margin: 5px 0 8px;
		font-size: 16px;
		letter-spacing: -0.04em;
	}

	.card-body p {
		height: 34px;
		margin: 0 0 13px;
		overflow: hidden;
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 1.7;
	}

	.tags {
		display: flex;
		gap: 5px;
		flex-wrap: wrap;
	}

	.tags span {
		padding: 4px 6px;
		border-radius: 5px;
		background: var(--surface-subtle);
		color: var(--text-muted);
		font-size: 14px;
	}

	.empty-state {
		padding: 70px 20px;
		text-align: center;
		border: 1px dashed var(--border);
		border-radius: 15px;
	}

	.empty-icon {
		width: 45px;
		height: 45px;
		display: grid;
		place-items: center;
		margin: 0 auto 13px;
		border-radius: 13px;
		background: var(--surface-yellow);
		color: var(--accent);
	}

	.empty-icon svg {
		width: 22px;
		height: 22px;
	}

	.empty-state h3 {
		margin: 0 0 7px;
		font-size: 14px;
	}

	.empty-state p {
		margin: 0 0 17px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.empty-state button {
		padding: 8px 13px;
		border: 0;
		border-radius: 8px;
		background: var(--primary);
		color: #0f172a;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}

	@media (max-width: 800px) {
		main {
			padding-top: 35px;
		}
		.hero {
			grid-template-columns: 1fr;
			gap: 28px;
		}
		.hero-visual {
			justify-content: flex-start;
		}
		.popular-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.ingredient-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 560px) {
		.hero h1 {
			font-size: 31px;
		}
		.category-list {
			gap: 6px;
		}
		.category-list button {
			padding: 9px 11px;
		}
		.popular-grid,
		.ingredient-grid {
			grid-template-columns: 1fr;
		}
	}
</style>