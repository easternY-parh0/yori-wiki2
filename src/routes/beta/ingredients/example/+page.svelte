
<script lang="ts">
	import { appPath } from '$lib/app-path';
	import noImage from '$lib/assets/image/no-image.png';

	const ingredient = {
		name: '양파',
		englishName: 'Onion',
		category: '채소',
		description:
			'다양한 요리에 기본적으로 사용되는 대표적인 향신 채소입니다. 볶거나 끓이면 단맛이 살아나고, 생으로 사용하면 알싸하고 산뜻한 맛을 더해줍니다.',
		image: noImage,

		tags: ['채소', '향신채소', '볶음', '국물요리'],

		nutrition: [
			{ name: '열량', value: '40', unit: 'kcal' },
			{ name: '탄수화물', value: '9.3', unit: 'g' },
			{ name: '단백질', value: '1.1', unit: 'g' },
			{ name: '지방', value: '0.1', unit: 'g' },
			{ name: '식이섬유', value: '1.7', unit: 'g' },
			{ name: '당류', value: '4.2', unit: 'g' },
			{ name: '나트륨', value: '4', unit: 'mg' }
		],

		storage: {
			method: '서늘하고 건조한 곳',
			period: '약 2~4주',
			tip: '껍질을 벗기지 않은 상태로 통풍이 잘 되는 곳에 보관하세요.'
		},

		preparation: [
			'겉껍질을 제거하고 뿌리와 꼭지를 잘라냅니다.',
			'흐르는 물에 가볍게 씻어 사용합니다.',
			'요리 목적에 따라 채썰기, 다지기, 큼직하게 썰기 등으로 손질합니다.'
		],

		pairs: ['마늘', '대파', '돼지고기', '감자', '당근'],

		recipes: [
			{
				name: '김치볶음밥',
				description: '양파의 단맛을 더해 감칠맛을 살린 볶음밥',
				category: '밥'
			},
			{
				name: '카레라이스',
				description: '양파를 충분히 볶아 깊은 단맛을 더하는 기본 카레',
				category: '한그릇'
			},
			{
				name: '된장찌개',
				description: '국물에 자연스러운 단맛을 더해주는 양파',
				category: '찌개'
			}
		]
	};

	const nutritionGroups = [
		{
			title: '기본 영양성분',
			items: ingredient.nutrition.slice(0, 4)
		},
		{
			title: '기타 영양성분',
			items: ingredient.nutrition.slice(4)
		}
	];
</script>

<svelte:head>
	<title>{ingredient.name} | 식재료 위키 | 요리위키</title>
	<meta
		name="description"
		content={`${ingredient.name}의 영양 성분, 보관 방법, 손질 방법과 요리 정보를 확인해보세요.`}
	/>
</svelte:head>

<div class="page">
	<!-- Breadcrumb -->
	<nav class="breadcrumb">
		<a href={appPath('/ingredients')}>식재료 위키</a>
		<span>/</span>
		<span>{ingredient.name}</span>
	</nav>

	<!-- Ingredient Header -->
	<section class="ingredient-header">
		<div class="ingredient-image">
			<img src={ingredient.image} alt={ingredient.name} />
		</div>

		<div class="ingredient-intro">
			<div class="category">{ingredient.category}</div>

			<h1>{ingredient.name}</h1>

			<p class="english-name">{ingredient.englishName}</p>

			<p class="description">
				{ingredient.description}
			</p>

			<div class="tags">
				{#each ingredient.tags as tag}
					<span>#{tag}</span>
				{/each}
			</div>
		</div>
	</section>

	<!-- Quick Information -->
	<section class="quick-info">
		<div class="quick-item">
			<span class="label">분류</span>
			<strong>{ingredient.category}</strong>
		</div>

		<div class="quick-item">
			<span class="label">보관</span>
			<strong>{ingredient.storage.method}</strong>
		</div>

		<div class="quick-item">
			<span class="label">권장 보관기간</span>
			<strong>{ingredient.storage.period}</strong>
		</div>
	</section>

	<!-- Nutrition -->
	<section class="content-section">
		<div class="section-heading">
			<div>
				<span class="eyebrow">NUTRITION</span>
				<h2>영양 성분</h2>
			</div>

			<p>100g 기준</p>
		</div>

		<div class="nutrition-card">
			{#each nutritionGroups as group}
				<div class="nutrition-group">
					<h3>{group.title}</h3>

					<div class="nutrition-table">
						{#each group.items as item}
							<div class="nutrition-row">
								<span>{item.name}</span>

								<strong>
									{item.value}
									<small>{item.unit}</small>
								</strong>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<p class="nutrition-note">
			※ 영양 성분은 식재료의 품종, 재배 환경 및 조리 상태에 따라 달라질 수 있습니다.
		</p>
	</section>

	<!-- Storage -->
	<section class="content-section two-column">
		<div class="info-card">
			<div class="card-label">STORAGE</div>
			<h2>보관 방법</h2>

			<div class="storage-main">
				<strong>{ingredient.storage.method}</strong>
				<span>{ingredient.storage.period}</span>
			</div>

			<p>{ingredient.storage.tip}</p>
		</div>

		<div class="info-card">
			<div class="card-label">PREPARATION</div>
			<h2>손질 방법</h2>

			<ol class="preparation-list">
				{#each ingredient.preparation as step, index}
					<li>
						<span>{String(index + 1).padStart(2, '0')}</span>
						<p>{step}</p>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- Pairing -->
	<section class="content-section">
		<div class="section-heading">
			<div>
				<span class="eyebrow">PAIRING</span>
				<h2>함께 사용하면 좋은 재료</h2>
			</div>
		</div>

		<div class="pairing-list">
			{#each ingredient.pairs as item}
				<a
					class="pairing-item"
					href={appPath(`/ingredients/${encodeURIComponent(item)}`)}
				>
					<span>{item}</span>
					<span class="arrow">→</span>
				</a>
			{/each}
		</div>
	</section>

	<!-- Related Recipes -->
	<section class="content-section">
		<div class="section-heading">
			<div>
				<span class="eyebrow">RECIPES</span>
				<h2>{ingredient.name}을 사용하는 레시피</h2>
			</div>

			<a class="more-link" href={appPath('/recipes')}>
				전체 레시피 →
			</a>
		</div>

		<div class="recipe-list">
			{#each ingredient.recipes as recipe}
				<a class="recipe-card" href={appPath('/recipes')}>
					<div class="recipe-image">
						<img src={noImage} alt="" />
					</div>

					<div class="recipe-content">
						<span>{recipe.category}</span>
						<h3>{recipe.name}</h3>
						<p>{recipe.description}</p>
					</div>

					<div class="recipe-arrow">→</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Bottom -->
	<section class="bottom-nav">
		<a href={appPath('/ingredients')} class="back-link">
			<span>←</span>
			식재료 위키로 돌아가기
		</a>

		<div class="wiki-mark">WIKI</div>
	</section>
</div>

<style>
	.page {
		max-width: 1040px;
		margin: 0 auto;
		padding: 36px 24px 100px;
		color: var(--text);
	}

	/* Breadcrumb */

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 9px;
		margin-bottom: 32px;
		font-size: 13px;
		color: var(--text-muted);
	}

	.breadcrumb a {
		color: var(--text-subtle);
		text-decoration: none;
	}

	.breadcrumb a:hover {
		color: var(--text);
	}

	/* Header */

	.ingredient-header {
		display: grid;
		grid-template-columns: 260px 1fr;
		gap: 42px;
		align-items: center;
		padding-bottom: 42px;
		border-bottom: 1px solid var(--border);
	}

	.ingredient-image {
		width: 260px;
		height: 260px;
		overflow: hidden;
		border-radius: 22px;
		background: var(--surface);
		border: 1px solid var(--border);
	}

	.ingredient-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.ingredient-intro {
		min-width: 0;
	}

	.category {
		display: inline-flex;
		align-items: center;
		padding: 6px 10px;
		border-radius: 999px;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 12px;
		font-weight: 700;
		margin-bottom: 13px;
	}

	h1 {
		margin: 0;
		font-size: clamp(36px, 5vw, 54px);
		line-height: 1;
		letter-spacing: -0.05em;
	}

	.english-name {
		margin: 9px 0 18px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.description {
		max-width: 620px;
		margin: 0;
		color: var(--text-subtle);
		font-size: 15px;
		line-height: 1.8;
		word-break: keep-all;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
		margin-top: 20px;
	}

	.tags span {
		padding: 6px 10px;
		border: 1px solid var(--border);
		border-radius: 999px;
		color: var(--text-muted);
		font-size: 11px;
	}

	/* Quick info */

	.quick-info {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin: 28px 0 72px;
		border: 1px solid var(--border);
		border-radius: 16px;
		overflow: hidden;
		background: var(--surface);
	}

	.quick-item {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 20px 24px;
		border-right: 1px solid var(--border);
	}

	.quick-item:last-child {
		border-right: 0;
	}

	.label {
		color: var(--text-muted);
		font-size: 11px;
	}

	.quick-item strong {
		font-size: 14px;
	}

	/* Section */

	.content-section {
		margin-top: 72px;
	}

	.section-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 20px;
	}

	.eyebrow {
		display: block;
		margin-bottom: 7px;
		color: var(--primary);
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.12em;
	}

	.section-heading h2 {
		margin: 0;
		font-size: 24px;
		letter-spacing: -0.04em;
	}

	.section-heading > p {
		margin: 0;
		color: var(--text-muted);
		font-size: 12px;
	}

	/* Nutrition */

	.nutrition-card {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border: 1px solid var(--border);
		border-radius: 18px;
		overflow: hidden;
		background: var(--surface);
	}

	.nutrition-group {
		padding: 24px;
	}

	.nutrition-group + .nutrition-group {
		border-left: 1px solid var(--border);
	}

	.nutrition-group h3 {
		margin: 0 0 16px;
		font-size: 13px;
	}

	.nutrition-table {
		border-top: 1px solid var(--border);
	}

	.nutrition-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 0;
		border-bottom: 1px solid var(--border);
		font-size: 13px;
	}

	.nutrition-row span {
		color: var(--text-subtle);
	}

	.nutrition-row strong {
		font-size: 14px;
	}

	.nutrition-row small {
		margin-left: 3px;
		color: var(--text-muted);
		font-size: 10px;
		font-weight: 500;
	}

	.nutrition-note {
		margin: 12px 2px 0;
		color: var(--text-muted);
		font-size: 11px;
		line-height: 1.6;
	}

	/* Two column */

	.two-column {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.info-card {
		padding: 26px;
		border: 1px solid var(--border);
		border-radius: 18px;
		background: var(--surface);
	}

	.card-label {
		margin-bottom: 8px;
		color: var(--primary);
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.12em;
	}

	.info-card h2 {
		margin: 0;
		font-size: 20px;
		letter-spacing: -0.03em;
	}

	.storage-main {
		display: flex;
		align-items: baseline;
		gap: 10px;
		margin-top: 28px;
	}

	.storage-main strong {
		font-size: 16px;
	}

	.storage-main span {
		color: var(--text-muted);
		font-size: 12px;
	}

	.info-card > p {
		margin: 14px 0 0;
		color: var(--text-subtle);
		font-size: 13px;
		line-height: 1.7;
	}

	.preparation-list {
		display: flex;
		flex-direction: column;
		gap: 0;
		margin: 20px 0 0;
		padding: 0;
		list-style: none;
	}

	.preparation-list li {
		display: grid;
		grid-template-columns: 28px 1fr;
		gap: 10px;
		padding: 11px 0;
		border-top: 1px solid var(--border);
	}

	.preparation-list span {
		color: var(--primary);
		font-size: 10px;
		font-weight: 800;
	}

	.preparation-list p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 12px;
		line-height: 1.6;
	}

	/* Pairing */

	.pairing-list {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.pairing-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 17px 14px;
		color: var(--text);
		text-decoration: none;
		border-right: 1px solid var(--border);
		font-size: 13px;
	}

	.pairing-item:last-child {
		border-right: 0;
	}

	.pairing-item:hover {
		background: var(--surface-yellow);
	}

	.arrow {
		color: var(--text-muted);
		transition: transform 0.15s ease;
	}

	.pairing-item:hover .arrow {
		transform: translateX(3px);
	}

	/* Recipes */

	.more-link {
		color: var(--text-muted);
		font-size: 12px;
		text-decoration: none;
	}

	.more-link:hover {
		color: var(--text);
	}

	.recipe-list {
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--border);
	}

	.recipe-card {
		display: grid;
		grid-template-columns: 100px 1fr auto;
		gap: 18px;
		align-items: center;
		padding: 16px 0;
		border-bottom: 1px solid var(--border);
		color: var(--text);
		text-decoration: none;
	}

	.recipe-image {
		width: 100px;
		height: 76px;
		overflow: hidden;
		border-radius: 11px;
		background: var(--surface);
	}

	.recipe-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.recipe-content span {
		color: var(--primary);
		font-size: 10px;
		font-weight: 700;
	}

	.recipe-content h3 {
		margin: 5px 0 5px;
		font-size: 15px;
	}

	.recipe-content p {
		margin: 0;
		color: var(--text-muted);
		font-size: 12px;
	}

	.recipe-arrow {
		color: var(--text-muted);
		font-size: 18px;
		padding: 0 8px;
	}

	.recipe-card:hover .recipe-arrow {
		transform: translateX(4px);
	}

	/* Bottom */

	.bottom-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 80px;
		padding-top: 24px;
		border-top: 1px solid var(--border);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--text-subtle);
		font-size: 12px;
		text-decoration: none;
	}

	.back-link:hover {
		color: var(--text);
	}

	.back-link span {
		font-size: 16px;
	}

	.wiki-mark {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		border: 1px solid var(--border);
		border-radius: 50%;
		color: var(--primary);
		font-size: 9px;
		font-weight: 800;
		letter-spacing: 0.08em;
	}

	/* Responsive */

	@media (max-width: 900px) {
		.page {
			padding: 28px 20px 80px;
		}

		.ingredient-header {
			grid-template-columns: 200px 1fr;
			gap: 28px;
		}

		.ingredient-image {
			width: 200px;
			height: 200px;
		}

		.pairing-list {
			grid-template-columns: repeat(3, 1fr);
		}

		.pairing-item:nth-child(3) {
			border-right: 0;
		}

		.pairing-item:nth-child(n + 4) {
			border-top: 1px solid var(--border);
		}
	}

	@media (max-width: 680px) {
		.page {
			padding: 22px 16px 64px;
		}

		.breadcrumb {
			margin-bottom: 24px;
		}

		.ingredient-header {
			grid-template-columns: 1fr;
			gap: 22px;
			padding-bottom: 30px;
		}

		.ingredient-image {
			width: 100%;
			height: 220px;
			border-radius: 16px;
		}

		h1 {
			font-size: 40px;
		}

		.quick-info {
			grid-template-columns: 1fr;
			margin: 20px 0 56px;
		}

		.quick-item {
			border-right: 0;
			border-bottom: 1px solid var(--border);
		}

		.quick-item:last-child {
			border-bottom: 0;
		}

		.content-section {
			margin-top: 56px;
		}

		.section-heading {
			align-items: flex-start;
			flex-direction: column;
			gap: 8px;
		}

		.nutrition-card {
			grid-template-columns: 1fr;
		}

		.nutrition-group + .nutrition-group {
			border-left: 0;
			border-top: 1px solid var(--border);
		}

		.two-column {
			grid-template-columns: 1fr;
		}

		.pairing-list {
			grid-template-columns: 1fr 1fr;
		}

		.pairing-item:nth-child(3) {
			border-right: 1px solid var(--border);
			border-top: 1px solid var(--border);
		}

		.pairing-item:nth-child(2n) {
			border-right: 0;
		}

		.pairing-item:nth-child(n + 3) {
			border-top: 1px solid var(--border);
		}

		.recipe-card {
			grid-template-columns: 76px 1fr auto;
			gap: 12px;
		}

		.recipe-image {
			width: 76px;
			height: 64px;
		}

		.recipe-content p {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}

		.bottom-nav {
			margin-top: 60px;
		}
	}
</style>