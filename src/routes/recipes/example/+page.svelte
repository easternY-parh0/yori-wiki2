<script lang="ts">
	import { onMount } from 'svelte';

	let liked = $state(false);
	let bookmarked = $state(false);
	let servings = $state(2);

	function increaseServings() {
		servings += 1;
	}

	function decreaseServings() {
		if (servings > 1) servings -= 1;
	}
</script>

<svelte:head>
	<title>레시피 제목 | 요리위키</title>
	<meta name="description" content="요리위키 레시피 상세 페이지" />
</svelte:head>

<div class="page">
	<main>
		<div class="breadcrumb">
			<a href="/recipes">레시피</a>
			<svg viewBox="0 0 24 24">
				<path d="M9 18l6-6-6-6" />
			</svg>
			<span>레시피 제목</span>
		</div>

		<section class="recipe-hero">
			<div class="hero-image">
				<span>대표 레시피 이미지 영역</span>
			</div>

			<div class="hero-content">
				<div class="category">한식 · 간단요리</div>

				<h1>레시피 제목이 들어가는 영역입니다.</h1>

				<p class="description">
					레시피에 대한 간단한 설명이 들어가는 영역입니다. 요리의 특징이나
					추천하는 상황 등을 간단하게 소개할 수 있습니다.
				</p>

				<div class="author">
					<div class="author-avatar">
						<svg viewBox="0 0 24 24">
							<circle cx="12" cy="8" r="3" />
							<path d="M5 20c.8-4 3-6 7-6s6.2 2 7 6" />
						</svg>
					</div>

					<div>
						<strong>작성자 닉네임</strong>
						<span>2026.08.25 · 마지막 수정 2026.08.25</span>
					</div>
				</div>

				<div class="recipe-stats">
					<div>
						<svg viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="8" />
							<path d="M12 8v4l3 2" />
						</svg>
						<span>30분</span>
					</div>

					<div>
						<svg viewBox="0 0 24 24">
							<path d="M4 19h16" />
							<path d="M6 17V9M10 17V5M14 17v-3M18 17V7" />
						</svg>
						<span>보통</span>
					</div>

					<div>
						<svg viewBox="0 0 24 24">
							<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />
						</svg>
						<span>4.8</span>
					</div>
				</div>

				<div class="hero-actions">
					<button
						class:liked
						class="like-button"
						type="button"
						onclick={() => (liked = !liked)}
					>
						<svg viewBox="0 0 24 24">
							<path d="M20.8 8.7c0 5.2-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6z" />
						</svg>
						좋아요 {liked ? 129 : 128}
					</button>

					<button
						class:bookmarked
						class="bookmark-button"
						type="button"
						onclick={() => (bookmarked = !bookmarked)}
					>
						<svg viewBox="0 0 24 24">
							<path d="M6 4h12v17l-6-4-6 4z" />
						</svg>
						{bookmarked ? '저장됨' : '저장'}
					</button>

					<button class="share-button" type="button">
						<svg viewBox="0 0 24 24">
							<circle cx="18" cy="5" r="2.5" />
							<circle cx="6" cy="12" r="2.5" />
							<circle cx="18" cy="19" r="2.5" />
							<path d="M8.2 10.8l7.5-4.4M8.2 13.2l7.5 4.4" />
						</svg>
						공유
					</button>
				</div>
			</div>
		</section>

		<div class="content-layout">
			<div class="main-content">
				<section class="content-section ingredients-section">
					<div class="section-title">
						<div>
							<span>01</span>
							<h2>재료</h2>
						</div>

						<div class="servings">
							<span>인분</span>
							<button type="button" onclick={decreaseServings}>−</button>
							<strong>{servings}</strong>
							<button type="button" onclick={increaseServings}>+</button>
						</div>
					</div>

					<div class="ingredient-list">
						<div class="ingredient-group">
							<h3>주재료</h3>

							<div class="ingredient">
								<span>재료 이름</span>
								<strong>200g</strong>
							</div>

							<div class="ingredient">
								<span>재료 이름</span>
								<strong>1개</strong>
							</div>

							<div class="ingredient">
								<span>재료 이름</span>
								<strong>2큰술</strong>
							</div>

							<div class="ingredient">
								<span>재료 이름</span>
								<strong>적당량</strong>
							</div>
						</div>

						<div class="ingredient-group">
							<h3>양념 및 소스</h3>

							<div class="ingredient">
								<span>양념 이름</span>
								<strong>1큰술</strong>
							</div>

							<div class="ingredient">
								<span>양념 이름</span>
								<strong>1작은술</strong>
							</div>

							<div class="ingredient">
								<span>양념 이름</span>
								<strong>약간</strong>
							</div>
						</div>
					</div>
				</section>

				<section class="content-section">
					<div class="section-title">
						<div>
							<span>02</span>
							<h2>조리 과정</h2>
						</div>
					</div>

					<div class="steps">
						<div class="step">
							<div class="step-number">1</div>

							<div class="step-body">
								<div class="step-image">
									<span>조리 과정 이미지</span>
								</div>

								<div>
									<h3>재료를 준비해주세요.</h3>
									<p>
										조리 과정에 대한 설명이 들어가는 영역입니다.
										재료를 손질하거나 준비하는 과정을 자세하게
										작성할 수 있습니다.
									</p>
								</div>
							</div>
						</div>

						<div class="step">
							<div class="step-number">2</div>

							<div class="step-body">
								<div class="step-image">
									<span>조리 과정 이미지</span>
								</div>

								<div>
									<h3>재료를 넣고 조리해주세요.</h3>
									<p>
										조리 과정에 대한 설명이 들어가는 영역입니다.
										불의 세기나 조리 시간 등 필요한 정보를
										작성할 수 있습니다.
									</p>
								</div>
							</div>
						</div>

						<div class="step">
							<div class="step-number">3</div>

							<div class="step-body">
								<div class="step-image">
									<span>조리 과정 이미지</span>
								</div>

								<div>
									<h3>완성된 요리를 예쁘게 담아주세요.</h3>
									<p>
										마지막 조리 과정과 플레이팅에 대한 설명이
										들어가는 영역입니다.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section class="content-section tip-section">
					<div class="section-title">
						<div>
							<span>03</span>
							<h2>요리 팁</h2>
						</div>
					</div>

					<div class="tip-box">
						<svg viewBox="0 0 24 24">
							<path d="M9 18h6" />
							<path d="M10 22h4" />
							<path d="M8.5 15.5A7 7 0 1 1 15.5 15c-.8.7-1.5 1.5-1.5 3H10c0-1.5-.7-2.3-1.5-3z" />
						</svg>

						<p>
							요리를 더 맛있게 만들기 위한 작성자의 팁이나
							대체 가능한 재료, 보관 방법 등을 작성할 수 있습니다.
						</p>
					</div>
				</section>

				<section class="content-section comments-section">
					<div class="section-title">
						<div>
							<span>04</span>
							<h2>댓글</h2>
						</div>

						<span class="comment-count">12개</span>
					</div>

					<div class="comment-form">
						<textarea
							placeholder="레시피에 대한 의견을 남겨주세요."
							rows="3"
						></textarea>

						<div>
							<span>로그인 후 댓글을 작성할 수 있습니다.</span>
							<a href="/login">로그인</a>
						</div>
					</div>

					<div class="comment-list">
						<div class="comment">
							<div class="comment-avatar">
								<svg viewBox="0 0 24 24">
									<circle cx="12" cy="8" r="3" />
									<path d="M5 20c.8-4 3-6 7-6s6.2 2 7 6" />
								</svg>
							</div>

							<div class="comment-body">
								<strong>사용자닉네임</strong>
								<span>2026.08.25</span>
								<p>레시피 설명이 깔끔해서 따라 하기 좋을 것 같아요.</p>
							</div>
						</div>

						<div class="comment">
							<div class="comment-avatar">
								<svg viewBox="0 0 24 24">
									<circle cx="12" cy="8" r="3" />
									<path d="M5 20c.8-4 3-6 7-6s6.2 2 7 6" />
								</svg>
							</div>

							<div class="comment-body">
								<strong>요리초보</strong>
								<span>2026.08.24</span>
								<p>주말에 한번 만들어봐야겠네요.</p>
							</div>
						</div>
					</div>
				</section>
			</div>

			<aside class="recipe-sidebar">
				<div class="sidebar-card">
					<h3>레시피 정보</h3>

					<div class="info-row">
						<span>준비시간</span>
						<strong>10분</strong>
					</div>

					<div class="info-row">
						<span>조리시간</span>
						<strong>20분</strong>
					</div>

					<div class="info-row">
						<span>난이도</span>
						<strong>보통</strong>
					</div>

					<div class="info-row">
						<span>인분</span>
						<strong>{servings}인분</strong>
					</div>
				</div>

				<a href="/recipes/new" class="sidebar-register">
					<svg viewBox="0 0 24 24">
						<path d="M12 5v14" />
						<path d="M5 12h14" />
					</svg>
					<span>
						<strong>나만의 레시피 등록</strong>
						<small>요리위키에 레시피를 공유해보세요.</small>
					</span>
				</a>
			</aside>
		</div>
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
		--overlay: rgba(15, 23, 42, .25);
		--shadow-card: rgba(15, 23, 42, .07);
		--shadow-menu: rgba(15, 23, 42, .1);
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
		--overlay: rgba(2, 6, 23, .72);
		--shadow-card: rgba(0, 0, 0, .22);
		--shadow-menu: rgba(0, 0, 0, .35);
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
	:global(textarea) {
		font: inherit;
	}

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
		width: min(1120px, calc(100% - 48px));
		margin: 0 auto;
		padding-bottom: 80px;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 28px 0 18px;
		color: var(--text-muted);
		font-size: 9px;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	.breadcrumb svg {
		width: 12px;
		height: 12px;
	}

	.recipe-hero {
		display: grid;
		grid-template-columns: 1.02fr 1fr;
		gap: 45px;
		padding-bottom: 50px;
		border-bottom: 1px solid var(--border);
	}

	.hero-image {
		min-height: 430px;
		display: grid;
		place-items: center;
		border-radius: 22px;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 10px;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 10px 0;
	}

	.category {
		color: var(--accent);
		font-size: 10px;
		font-weight: 800;
	}

	.hero-content h1 {
		margin: 12px 0 15px;
		font-size: 40px;
		line-height: 1.22;
		letter-spacing: -.07em;
	}

	.description {
		max-width: 500px;
		margin: 0;
		color: var(--text-subtle);
		font-size: 11px;
		line-height: 1.75;
	}

	.author {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 25px;
	}

	.author-avatar,
	.comment-avatar {
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: var(--surface-green);
		color: var(--accent);
	}

	.author-avatar {
		width: 38px;
		height: 38px;
	}

	.author-avatar svg {
		width: 20px;
		height: 20px;
	}

	.author strong,
	.author span {
		display: block;
	}

	.author strong {
		font-size: 10px;
	}

	.author span {
		margin-top: 3px;
		color: var(--text-muted);
		font-size: 8px;
	}

	.recipe-stats {
		display: flex;
		gap: 22px;
		margin-top: 25px;
		padding: 17px 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.recipe-stats div {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--text-subtle);
		font-size: 9px;
	}

	.recipe-stats svg {
		width: 15px;
		height: 15px;
		color: var(--accent);
	}

	.hero-actions {
		display: flex;
		gap: 7px;
		margin-top: 18px;
	}

	.hero-actions button {
		height: 38px;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 0 13px;
		border: 1px solid var(--border);
		border-radius: 9px;
		background: var(--surface);
		color: var(--text-subtle);
		font-size: 9px;
		cursor: pointer;
	}

	.hero-actions button:hover {
		border-color: var(--primary);
	}

	.hero-actions svg {
		width: 15px;
		height: 15px;
	}

	.hero-actions .liked {
		border-color: var(--primary);
		background: var(--surface-yellow);
		color: #ca8a04;
	}

	.hero-actions .bookmarked {
		border-color: var(--border-accent);
		background: var(--surface-green);
		color: var(--accent);
	}

	.content-layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 260px;
		gap: 50px;
		margin-top: 55px;
	}

	.main-content {
		min-width: 0;
	}

	.content-section {
		padding-bottom: 55px;
		margin-bottom: 50px;
		border-bottom: 1px solid var(--border);
	}

	.section-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 25px;
	}

	.section-title > div:first-child {
		display: flex;
		align-items: baseline;
		gap: 11px;
	}

	.section-title span:first-child {
		color: var(--accent);
		font-size: 9px;
		font-weight: 800;
	}

	.section-title h2 {
		margin: 0;
		font-size: 23px;
		letter-spacing: -.06em;
	}

	.servings {
		display: flex;
		align-items: center;
		gap: 7px;
		color: var(--text-muted);
		font-size: 9px;
	}

	.servings button {
		width: 27px;
		height: 27px;
		border: 1px solid var(--border);
		border-radius: 7px;
		background: var(--surface);
		color: var(--text);
		cursor: pointer;
	}

	.servings button:hover {
		border-color: var(--primary);
	}

	.servings strong {
		min-width: 15px;
		color: var(--text);
		text-align: center;
	}

	.ingredient-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 35px;
	}

	.ingredient-group {
		padding: 20px;
		border: 1px solid var(--border);
		border-radius: 14px;
		background: var(--surface);
	}

	.ingredient-group h3 {
		margin: 0 0 12px;
		font-size: 11px;
	}

	.ingredient {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 11px 0;
		border-top: 1px solid var(--border);
		font-size: 10px;
	}

	.ingredient span {
		color: var(--text-subtle);
	}

	.ingredient strong {
		font-weight: 650;
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.step {
		display: flex;
		gap: 17px;
	}

	.step-number {
		width: 29px;
		height: 29px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 50%;
		background: var(--primary);
		color: #0f172a;
		font-size: 10px;
		font-weight: 800;
	}

	.step-body {
		display: grid;
		grid-template-columns: 170px 1fr;
		gap: 18px;
		flex: 1;
	}

	.step-image {
		height: 125px;
		display: grid;
		place-items: center;
		border-radius: 13px;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 8px;
	}

	.step-body h3 {
		margin: 4px 0 8px;
		font-size: 14px;
		letter-spacing: -.03em;
	}

	.step-body p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 10px;
		line-height: 1.75;
	}

	.tip-box {
		display: flex;
		align-items: flex-start;
		gap: 13px;
		padding: 18px;
		border: 1px solid var(--border-green);
		border-radius: 13px;
		background: var(--surface-green);
	}

	.tip-box svg {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
		color: var(--accent);
	}

	.tip-box p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 10px;
		line-height: 1.7;
	}

	.comment-count {
		color: var(--text-muted);
		font-size: 9px;
	}

	.comment-form {
		padding: 15px;
		border: 1px solid var(--border);
		border-radius: 13px;
		background: var(--surface-subtle);
	}

	.comment-form textarea {
		width: 100%;
		resize: vertical;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--text);
		font-size: 10px;
		line-height: 1.6;
	}

	.comment-form textarea::placeholder {
		color: var(--text-muted);
	}

	.comment-form > div {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
		padding-top: 9px;
		border-top: 1px solid var(--border);
		color: var(--text-muted);
		font-size: 8px;
	}

	.comment-form a {
		color: var(--accent);
		font-weight: 750;
	}

	.comment-list {
		margin-top: 25px;
	}

	.comment {
		display: flex;
		gap: 11px;
		padding: 18px 0;
		border-bottom: 1px solid var(--border);
	}

	.comment-avatar {
		width: 33px;
		height: 33px;
		flex-shrink: 0;
	}

	.comment-avatar svg {
		width: 17px;
		height: 17px;
	}

	.comment-body strong,
	.comment-body span {
		display: inline-block;
	}

	.comment-body strong {
		font-size: 9px;
	}

	.comment-body span {
		margin-left: 7px;
		color: var(--text-muted);
		font-size: 8px;
	}

	.comment-body p {
		margin: 7px 0 0;
		color: var(--text-subtle);
		font-size: 9px;
		line-height: 1.5;
	}

	.recipe-sidebar {
		position: sticky;
		top: 95px;
		align-self: start;
	}

	.sidebar-card {
		padding: 20px;
		border: 1px solid var(--border);
		border-radius: 15px;
		background: var(--surface);
	}

	.sidebar-card h3 {
		margin: 0 0 14px;
		font-size: 12px;
	}

	.info-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 0;
		border-top: 1px solid var(--border);
		font-size: 9px;
	}

	.info-row span {
		color: var(--text-muted);
	}

	.info-row strong {
		font-weight: 650;
	}

	.sidebar-register {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 12px;
		padding: 14px;
		border: 1px solid var(--border-green);
		border-radius: 13px;
		background: var(--surface-green);
	}

	.sidebar-register > svg {
		width: 21px;
		height: 21px;
		flex-shrink: 0;
		color: var(--accent);
	}

	.sidebar-register strong,
	.sidebar-register small {
		display: block;
	}

	.sidebar-register strong {
		font-size: 9px;
	}

	.sidebar-register small {
		margin-top: 3px;
		color: var(--text-muted);
		font-size: 7px;
		line-height: 1.4;
	}

	@media (max-width: 900px) {
		.recipe-hero {
			grid-template-columns: 1fr;
		}

		.hero-image {
			min-height: 360px;
		}

		.content-layout {
			grid-template-columns: 1fr;
		}

		.recipe-sidebar {
			position: static;
			order: -1;
		}
	}

	@media (max-width: 650px) {
		main {
			width: calc(100% - 28px);
		}

		.recipe-hero {
			gap: 25px;
		}

		.hero-image {
			min-height: 280px;
		}

		.hero-content h1 {
			font-size: 31px;
		}

		.recipe-stats {
			gap: 14px;
		}

		.hero-actions {
			flex-wrap: wrap;
		}

		.ingredient-list {
			grid-template-columns: 1fr;
		}

		.step-body {
			grid-template-columns: 1fr;
		}

		.step-image {
			height: 180px;
		}
	}
</style>