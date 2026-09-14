<script lang="ts">
	import { appPath } from '$lib/app-path';
	import { onMount } from 'svelte';

	let searchKeyword = $state('');
	let activeBoard = $state('전체');
	let sortType = $state('최신순');
	let currentPage = $state(1);

	const boards = ['전체', '자유게시판', '요리 질문', '레시피 후기', '팁 & 노하우'];

	const popularPosts = [
		{
			title: '요즘 자주 해먹는 간단한 요리 추천해주세요.',
			author: '요리초보',
			comments: 24,
			views: 1842
		},
		{
			title: '주말에 만들기 좋은 요리 추천받습니다.',
			author: '오늘뭐먹지',
			comments: 18,
			views: 1260
		},
		{
			title: '계란을 활용한 레시피 공유합니다.',
			author: '주방생활',
			comments: 12,
			views: 984
		}
	];

	const posts = [
		{
			category: '자유게시판',
			title: '오늘 저녁 메뉴 정하기 너무 어렵네요.',
			author: '요리초보',
			date: '10분 전',
			views: 24,
			comments: 4
		},
		{
			category: '요리 질문',
			title: '파스타 면은 보통 몇 분 정도 삶으시나요?',
			author: '면요리좋아',
			date: '32분 전',
			views: 48,
			comments: 7
		},
		{
			category: '레시피 후기',
			title: '올려주신 김치볶음밥 레시피 따라 해봤어요.',
			author: '집밥러',
			date: '1시간 전',
			views: 72,
			comments: 9
		},
		{
			category: '팁 & 노하우',
			title: '양파 오래 보관하는 방법을 공유합니다.',
			author: '주방생활',
			date: '2시간 전',
			views: 116,
			comments: 13
		},
		{
			category: '자유게시판',
			title: '냉장고에 재료가 너무 많이 남았는데 추천해주세요.',
			author: '자취요리',
			date: '3시간 전',
			views: 81,
			comments: 8
		},
		{
			category: '요리 질문',
			title: '베이킹 초보인데 오븐 없이 가능한 메뉴가 있을까요?',
			author: '베이킹입문',
			date: '4시간 전',
			views: 92,
			comments: 11
		},
		{
			category: '레시피 후기',
			title: '주말에 처음으로 직접 빵을 구워봤습니다.',
			author: '주말요리사',
			date: '5시간 전',
			views: 67,
			comments: 5
		},
		{
			category: '팁 & 노하우',
			title: '주방에서 자주 쓰는 기본 양념 정리해봤어요.',
			author: '소소한주방',
			date: '6시간 전',
			views: 142,
			comments: 16
		}
	];

	function submitSearch() {
		currentPage = 1;
	}
</script>

<svelte:head>
	<title>커뮤니티 | 요리위키</title>
	<meta name="description" content="요리위키 커뮤니티에서 요리 이야기를 나눠보세요." />
</svelte:head>

<div class="page">
	<main>
		<section class="page-heading">
			<div>
				<h1>커뮤니티</h1>
				<p>요리에 대한 이야기를 나누고 다른 사람들의 경험을 만나보세요.</p>
			</div>

			<a href={appPath('/community/write')} class="write-button">
				<svg viewBox="0 0 24 24">
					<path d="M12 5v14" />
					<path d="M5 12h14" />
				</svg>
				글쓰기
			</a>
		</section>

		<section class="community-hero">
			<div>
				<span class="hero-label">요리 이야기</span>
				<h2>맛있는 이야기를<br /><span>함께 나눠보세요.</span></h2>
				<p>레시피 질문부터 요리 후기까지 자유롭게 이야기할 수 있습니다.</p>
			</div>

			<div class="hero-placeholder">
				<span>커뮤니티 이미지 영역</span>
			</div>
		</section>

		<section class="board-section">
			<div class="board-tabs">
				{#each boards as board}
					<button
						class:active={activeBoard === board}
						type="button"
						onclick={() => {
							activeBoard = board;
							currentPage = 1;
						}}
					>
						{board}
					</button>
				{/each}
			</div>
		</section>

		<section class="popular-section">
			<div class="section-title">
				<div>
					<h2>인기 게시글</h2>
					<p>최근 많은 관심을 받고 있는 이야기입니다.</p>
				</div>
			</div>

			<div class="popular-grid">
				{#each popularPosts as post, index}
					<a href={appPath('/community/example')} class="popular-card">
						<div class="popular-number">{String(index + 1).padStart(2, '0')}</div>

						<div class="popular-content">
							<span>인기 게시글</span>
							<h3>{post.title}</h3>

							<div>
								<strong>{post.author}</strong>
								<small>조회 {post.views}</small>
								<small>댓글 {post.comments}</small>
							</div>
						</div>

						<svg viewBox="0 0 24 24">
							<path d="M9 5l7 7-7 7" />
						</svg>
					</a>
				{/each}
			</div>
		</section>

		<section class="post-section">
			<div class="post-toolbar">
				<div>
					<h2>전체 게시글</h2>
					<span>총 128개의 게시글</span>
				</div>

				<div class="sort-area">
					<select bind:value={sortType} aria-label="정렬">
						<option value="최신순">최신순</option>
						<option value="인기순">인기순</option>
						<option value="조회순">조회순</option>
						<option value="댓글순">댓글순</option>
					</select>
				</div>
			</div>

			<form
				class="community-search"
				onsubmit={(event) => {
					event.preventDefault();
					submitSearch();
				}}
			>
				<svg viewBox="0 0 24 24">
					<circle cx="10.5" cy="10.5" r="6" />
					<path d="M15 15l5 5" />
				</svg>

				<input bind:value={searchKeyword} placeholder="게시글 제목을 검색하세요" />

				<button type="submit">검색</button>
			</form>

			<div class="post-table">
				<div class="table-head">
					<span>분류</span>
					<span>게시글</span>
					<span>조회</span>
					<span>댓글</span>
					<span>작성일</span>
				</div>

				{#each posts as post}
					<a href={appPath('/community/example')} class="post-row">
						<span class="post-category">{post.category}</span>

						<div class="post-title">
							<strong>{post.title}</strong>
							<small>{post.author}</small>
						</div>

						<span>{post.views}</span>
						<span>{post.comments}</span>
						<span>{post.date}</span>
					</a>
				{/each}
			</div>
		</section>

		<section class="pagination-section">
			<div class="pagination">
				<button
					type="button"
					disabled={currentPage === 1}
					onclick={() => (currentPage = Math.max(1, currentPage - 1))}
				>
					<svg viewBox="0 0 24 24">
						<path d="M14 6l-6 6 6 6" />
					</svg>
				</button>

				{#each [1, 2, 3] as pageNumber}
					<button
						class:active={currentPage === pageNumber}
						type="button"
						onclick={() => (currentPage = pageNumber)}
					>
						{pageNumber}
					</button>
				{/each}

				<span>...</span>

				<button
					class:active={currentPage === 12}
					type="button"
					onclick={() => (currentPage = 12)}
				>
					12
				</button>

				<button
					type="button"
					onclick={() => (currentPage = Math.min(12, currentPage + 1))}
				>
					<svg viewBox="0 0 24 24">
						<path d="M10 6l6 6-6 6" />
					</svg>
				</button>
			</div>
		</section>

		<section class="community-cta">
			<div>
				<span>함께 이야기해요</span>
				<h2>궁금한 것이 있거나<br />공유하고 싶은 이야기가 있나요?</h2>
				<p>커뮤니티에 글을 작성해 다른 요리사들과 이야기를 나눠보세요.</p>
			</div>

			<a href={appPath('/community/write')} class="cta-button">
				글 작성하기
				<svg viewBox="0 0 24 24">
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
		--overlay: rgba(15,23,42,.25);
		--shadow-card: rgba(15,23,42,.07);
		--shadow-menu: rgba(15,23,42,.1);
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
		--overlay: rgba(2,6,23,.72);
		--shadow-card: rgba(0,0,0,.22);
		--shadow-menu: rgba(0,0,0,.35);
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
		padding: 55px 8px 32px;
	}

	.page-heading h1 {
		margin: 0 0 8px;
		font-size: 42px;
		letter-spacing: -.07em;
	}

	.page-heading p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 14px;
	}

	.write-button {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 11px 15px;
		border-radius: 10px;
		background: var(--primary);
		color: #0f172a;
		font-size: 14px;
		font-weight: 750;
		white-space: nowrap;
	}

	.write-button:hover {
		background: var(--accent);
		color: #fff;
	}

	.write-button svg {
		width: 15px;
		height: 15px;
	}

	.community-hero {
		display: grid;
		grid-template-columns: 1fr 390px;
		gap: 35px;
		align-items: center;
		padding: 35px 40px;
		border: 1px solid var(--border-green);
		border-radius: 24px;
		background: var(--surface-green);
	}

	.hero-label {
		color: var(--accent);
		font-size: 14px;
		font-weight: 800;
	}

	.community-hero h2 {
		margin: 9px 0 12px;
		font-size: 31px;
		line-height: 1.25;
		letter-spacing: -.07em;
	}

	.community-hero h2 span {
		color: var(--accent);
	}

	.community-hero p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 1.7;
	}

	.hero-placeholder {
		height: 210px;
		display: grid;
		place-items: center;
		border: 1.5px dashed var(--border-accent);
		border-radius: 19px;
		background: var(--surface);
		color: var(--accent);
		font-size: 14px;
	}

	.board-section {
		margin-top: 35px;
	}

	.board-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}

	.board-tabs button {
		padding: 9px 15px;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: var(--surface);
		color: var(--text-subtle);
		font-size: 14px;
		cursor: pointer;
	}

	.board-tabs button:hover {
		border-color: var(--primary);
	}

	.board-tabs button.active {
		border-color: var(--primary);
		background: var(--primary);
		color: #0f172a;
		font-weight: 750;
	}

	.popular-section,
	.post-section {
		margin-top: 48px;
	}

	.section-title {
		display: flex;
		align-items: end;
		justify-content: space-between;
		margin-bottom: 18px;
	}

	.section-title h2 {
		margin: 0;
		font-size: 22px;
		letter-spacing: -.06em;
	}

	.section-title p {
		margin: 5px 0 0;
		color: var(--text-muted);
		font-size: 14px;
	}

	.popular-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 13px;
	}

	.popular-card {
		display: grid;
		grid-template-columns: 28px 1fr 14px;
		gap: 12px;
		align-items: center;
		padding: 19px;
		border: 1px solid var(--border);
		border-radius: 16px;
		background: var(--surface);
	}

	.popular-card:hover {
		border-color: var(--primary);
		background: var(--surface-yellow);
	}

	.popular-number {
		color: var(--primary);
		font-size: 18px;
		font-weight: 850;
	}

	.popular-content > span {
		color: var(--accent);
		font-size: 14px;
		font-weight: 750;
	}

	.popular-content h3 {
		margin: 6px 0 9px;
		font-size: 14px;
		line-height: 1.5;
	}

	.popular-content div {
		display: flex;
		gap: 8px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.popular-content small {
		font-size: 14px;
	}

	.popular-card > svg {
		width: 14px;
		height: 14px;
		color: var(--accent);
	}

	.post-toolbar {
		display: flex;
		align-items: end;
		justify-content: space-between;
		margin-bottom: 17px;
	}

	.post-toolbar h2 {
		margin: 0;
		font-size: 22px;
		letter-spacing: -.06em;
	}

	.post-toolbar span {
		display: block;
		margin-top: 5px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.sort-area select {
		min-width: 105px;
		padding: 8px 10px;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--surface);
		color: var(--text);
		font-size: 14px;
		outline: 0;
	}

	.community-search {
		height: 48px;
		display: flex;
		align-items: center;
		margin-bottom: 18px;
		padding: 4px 4px 4px 14px;
		border: 1px solid var(--border);
		border-radius: 11px;
		background: var(--surface-subtle);
	}

	.community-search:focus-within {
		border-color: var(--primary);
	}

	.community-search svg {
		width: 17px;
		height: 17px;
		margin-right: 8px;
		color: var(--accent);
	}

	.community-search input {
		flex: 1;
		min-width: 0;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--text);
		font-size: 14px;
	}

	.community-search input::placeholder {
		color: var(--text-muted);
	}

	.community-search button {
		height: 40px;
		padding: 0 16px;
		border: 0;
		border-radius: 8px;
		background: var(--primary);
		color: #0f172a;
		font-size: 14px;
		font-weight: 750;
		cursor: pointer;
	}

	.community-search button:hover {
		background: var(--accent);
		color: #fff;
	}

	.post-table {
		border-top: 1px solid var(--border);
	}

	.table-head,
	.post-row {
		display: grid;
		grid-template-columns: 100px minmax(0, 1fr) 65px 60px 85px;
		column-gap: 10px;
		align-items: center;
	}

	.table-head {
		padding: 12px 14px;
		color: var(--text-muted);
		font-size: 14px;
		font-weight: 650;
		background: var(--surface-subtle);
		border-bottom: 1px solid var(--border);
	}

	.post-row {
		min-height: 66px;
		padding: 8px 14px;
		border-bottom: 1px solid var(--border);
		font-size: 14px;
	}

	.post-row:hover {
		background: var(--surface-yellow);
	}

	.post-category {
		width: fit-content;
		padding: 5px 8px;
		border-radius: 6px;
		background: var(--surface-green);
		color: var(--accent);
		font-size: 14px;
		font-weight: 750;
	}

	.post-title {
		min-width: 0;
	}

	.post-title strong {
		display: block;
		overflow: hidden;
		font-size: 14px;
		font-weight: 650;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.post-title small {
		display: block;
		margin-top: 4px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.post-row > span:not(.post-category) {
		color: var(--text-muted);
		text-align: center;
		font-size: 14px;
	}

	.pagination-section {
		display: flex;
		justify-content: center;
		margin-top: 35px;
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
		font-size: 14px;
		cursor: pointer;
	}

	.pagination button:hover:not(:disabled) {
		border-color: var(--primary);
		background: var(--surface-yellow);
	}

	.pagination button.active {
		border-color: var(--primary);
		background: var(--primary);
		color: #0f172a;
		font-weight: 750;
	}

	.pagination button:disabled {
		opacity: .35;
		cursor: default;
	}

	.pagination svg {
		width: 15px;
		height: 15px;
	}

	.pagination span {
		padding: 0 5px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.community-cta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 25px;
		margin-top: 55px;
		padding: 30px 35px;
		border: 1px solid var(--border);
		border-radius: 20px;
		background: var(--surface);
	}

	.community-cta > div > span {
		color: var(--accent);
		font-size: 14px;
		font-weight: 800;
	}

	.community-cta h2 {
		margin: 7px 0 8px;
		font-size: 22px;
		line-height: 1.3;
		letter-spacing: -.06em;
	}

	.community-cta p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 14px;
	}

	.cta-button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 15px;
		border-radius: 9px;
		background: var(--accent);
		color: #fff;
		font-size: 14px;
		font-weight: 750;
		white-space: nowrap;
	}

	.cta-button svg {
		width: 14px;
		height: 14px;
	}

	@media (max-width: 1000px) {
		.community-hero {
			grid-template-columns: 1fr 300px;
		}

		.popular-grid {
			grid-template-columns: 1fr;
		}

		.table-head,
		.post-row {
			grid-template-columns: 90px minmax(0, 1fr) 55px 55px 75px;
		}
	}

	@media (max-width: 800px) {
		.page-heading {
			align-items: flex-start;
			flex-direction: column;
		}

		.community-hero {
			grid-template-columns: 1fr;
		}

		.hero-placeholder {
			height: 190px;
		}

		.table-head {
			display: none;
		}

		.post-row {
			grid-template-columns: 82px 1fr auto;
			gap: 10px;
			padding: 14px 10px;
		}

		.post-row > span:nth-child(3),
		.post-row > span:nth-child(4),
		.post-row > span:nth-child(5) {
			display: none;
		}

		.community-cta {
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

		.community-hero {
			padding: 28px 22px;
		}

		.community-hero h2 {
			font-size: 27px;
		}

		.hero-placeholder {
			height: 160px;
		}

		.board-tabs {
			gap: 5px;
		}

		.board-tabs button {
			padding: 8px 11px;
			font-size: 14px;
		}

		.post-toolbar {
			align-items: flex-start;
			flex-direction: column;
			gap: 12px;
		}

		.sort-area {
			width: 100%;
		}

		.sort-area select {
			width: 100%;
		}

		.post-row {
			grid-template-columns: 72px 1fr;
		}

		.post-category {
			font-size: 14px;
		}

		.post-title strong {
			font-size: 14px;
		}

		.community-cta {
			padding: 25px 22px;
		}
	}
</style>