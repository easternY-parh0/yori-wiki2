<script lang="ts">
	import { appPath } from '$lib/app-path';
	import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';
	import PreparingModal from '$lib/components/layouts/PreparingModal.svelte';

	let isPreparingOpen = $state(true);

	const breadcrumbItems = [
		{ label: '요리위키', href: appPath('/') },
		{ label: '커뮤니티' }
	];

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

<PreparingModal bind:open={isPreparingOpen} />

<main class="page">
	<Breadcrumb items={breadcrumbItems} />

	<section class="settings-header">
		<div>
			<h1>커뮤니티</h1>
			<p>요리에 대한 이야기를 나누고 다른 사람들의 다양한 노하우를 만나보세요.</p>
		</div>
		<a href={appPath('/community/write')} class="write-button">
			<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
			글쓰기
		</a>
	</section>

	<section class="community-hero">
		<div class="hero-text">
			<span class="hero-label">요리 이야기</span>
			<h2>맛있는 즐거움을<br /><span>함께 나눠보세요!</span></h2>
			<p>오늘의 요리 고민부터 나만의 특별한 레시피 노하우까지 자유롭게 공유하는 공간입니다.</p>
		</div>

		<div class="hero-card">
			<div class="hero-icon">🍳</div>
			<span>오늘의 베스트 이야기</span>
			<strong>"냉장고 털기 성공! 자취생 간단 레시피"</strong>
		</div>
	</section>

	<div class="toolbar">
		<div class="category-list">
			{#each boards as board}
				<button
					type="button"
					class:active={activeBoard === board}
					onclick={() => {
						activeBoard = board;
						currentPage = 1;
					}}
				>
					{board}
				</button>
			{/each}
		</div>

		<form class="search-box" onsubmit={(event) => { event.preventDefault(); submitSearch(); }}>
			<svg viewBox="0 0 24 24">
				<circle cx="11" cy="11" r="6.5" />
				<path d="m16 16 5 5" />
			</svg>
			<input bind:value={searchKeyword} placeholder="게시글 검색" aria-label="게시글 검색" />
			{#if searchKeyword}
				<button
					class="clear-button"
					type="button"
					aria-label="검색어 지우기"
					onclick={() => { searchKeyword = ''; submitSearch(); }}
				>
					<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
				</button>
			{/if}
		</form>
	</div>

	<section class="popular-section">
		<div class="section-title">
			<div>
				<h2>🔥 실시간 인기글</h2>
				<p>지금 커뮤니티에서 가장 뜨거운 이야기입니다.</p>
			</div>
		</div>

		<div class="popular-grid">
			{#each popularPosts as post, index}
				<a href={appPath('/community/example')} class="popular-card">
					<div class="popular-rank">{index + 1}</div>
					<div class="popular-content">
						<h3>{post.title}</h3>
						<div class="popular-meta">
							<strong>{post.author}</strong>
							<span>조회 {post.views}</span>
							<span>댓글 {post.comments}</span>
						</div>
					</div>
					<svg class="arrow" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
				</a>
			{/each}
		</div>
	</section>

	<section class="post-section">
		<div class="post-toolbar">
			<div class="section-heading">
				<h2>전체 게시글 <span>(128)</span></h2>
			</div>

			<div class="sort-area">
				<select bind:value={sortType} aria-label="정렬 방식 선택">
					<option value="최신순">최신순</option>
					<option value="인기순">인기순</option>
					<option value="조회순">조회순</option>
					<option value="댓글순">댓글순</option>
				</select>
			</div>
		</div>

		<div class="post-table">
			<div class="table-head">
				<span>카테고리</span>
				<span>제목</span>
				<span>작성자</span>
				<span>조회</span>
				<span>댓글</span>
				<span>작성일</span>
			</div>

			{#each posts as post}
				<a href={appPath('/community/example')} class="post-row">
					<span class="post-category">
						{#if post.category === '자유게시판'}
							<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
						{:else if post.category === '요리 질문'}
							<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
						{:else if post.category === '레시피 후기'}
							<svg viewBox="0 0 24 24"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9zM12 3v6M8 5v4M16 5v4"/></svg>
						{:else}
							<svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
						{/if}
						{post.category}
					</span>

					<div class="post-title">
						<strong>{post.title}</strong>
					</div>

					<span class="author">{post.author}</span>
					<span class="meta">{post.views}</span>
					<span class="meta comment">{post.comments}</span>
					<span class="meta">{post.date}</span>
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
				aria-label="이전 페이지"
			>
				<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
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

			<span class="dots">...</span>

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
				aria-label="다음 페이지"
			>
				<svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
			</button>
		</div>
	</section>

	<section class="contact-card">
		<div class="contact-icon">
			<svg viewBox="0 0 24 24">
				<path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
			</svg>
		</div>

		<div class="contact-text">
			<span>나만의 요리 팁이 있나요?</span>
			<strong>이야기를 공유하고 다른 요리사들과 소통해보세요.</strong>
		</div>

		<a href={appPath('/community/write')} class="primary-button">글 작성하기</a>
	</section>
</main>

<style>
	.page {
		width: min(1160px, calc(100% - 48px));
		min-height: 100vh;
		padding: 48px 24px 100px;
		background: var(--background);
		color: var(--text);
		margin: 0 auto;
	}

	/* Settings Header */

	.settings-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		padding-bottom: 28px;
		border-bottom: 1px solid var(--border);
	}

	.settings-header h1 {
		margin: 0;
		font-size: 38px;
		font-weight: 750;
		letter-spacing: -0.07em;
		line-height: 1.3;
	}

	.settings-header p {
		margin: 9px 0 0;
		color: var(--text-muted);
		font-size: 13px;
		line-height: 1.7;
	}

	.write-button {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		border-radius: 7px;
		background: var(--primary);
		color: #0f172a;
		font-size: 12px;
		font-weight: 700;
		text-decoration: none;
		white-space: nowrap;
		transition: background 0.15s ease, color 0.15s ease;
	}

	.write-button:hover {
		background: var(--accent);
		color: #fff;
	}

	.write-button svg {
		width: 14px;
		height: 14px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2.5;
	}

	/* Hero Section */

	.community-hero {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: 24px;
		align-items: center;
		margin-top: 28px;
		padding: 28px 32px;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--surface-yellow);
	}

	.hero-label {
		color: var(--accent);
		font-size: 12px;
		font-weight: 750;
		letter-spacing: -0.01em;
	}

	.hero-text h2 {
		margin: 8px 0 10px;
		font-size: 26px;
		font-weight: 750;
		line-height: 1.3;
		letter-spacing: -0.05em;
	}

	.hero-text h2 span {
		color: var(--accent);
	}

	.hero-text p {
		margin: 0;
		color: var(--text-muted);
		font-size: 13px;
		line-height: 1.6;
	}

	.hero-card {
		padding: 18px 20px;
		border: 1px solid var(--border);
		border-radius: 9px;
		background: var(--background);
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.hero-icon {
		font-size: 20px;
	}

	.hero-card span {
		font-size: 11px;
		color: var(--accent);
		font-weight: 700;
	}

	.hero-card strong {
		font-size: 13px;
		font-weight: 650;
		line-height: 1.4;
		color: var(--text);
	}

	/* Toolbar & Search */

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin-top: 32px;
		margin-bottom: 28px;
	}

	.category-list {
		display: flex;
		gap: 6px;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.category-list::-webkit-scrollbar {
		display: none;
	}

	.category-list button {
		flex-shrink: 0;
		padding: 7px 14px;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: transparent;
		color: var(--text-muted);
		font: inherit;
		font-size: 12px;
		font-weight: 650;
		cursor: pointer;
		transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
	}

	.category-list button:hover {
		border-color: var(--accent);
		color: var(--text);
	}

	.category-list button.active {
		border-color: var(--accent);
		background: var(--surface-yellow);
		color: var(--accent);
		font-weight: 700;
	}

	.search-box {
		width: 230px;
		height: 36px;
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
		padding: 0 10px;
		border: 1px solid var(--border);
		border-radius: 7px;
		background: transparent;
		transition: border-color 0.15s ease;
	}

	.search-box:focus-within {
		border-color: var(--accent);
	}

	.search-box > svg {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
		color: var(--text-muted);
		stroke-width: 2;
		fill: none;
		stroke: currentColor;
	}

	.search-box input {
		width: 100%;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--text);
		font: inherit;
		font-size: 12px;
	}

	.search-box input::placeholder {
		color: var(--text-muted);
	}

	.clear-button {
		width: 18px;
		height: 18px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border: 0;
		border-radius: 50%;
		background: var(--surface-subtle);
		color: var(--text-muted);
		cursor: pointer;
	}

	.clear-button svg {
		width: 10px;
		height: 10px;
		stroke-width: 2;
		fill: none;
		stroke: currentColor;
	}

	/* Popular Section */

	.popular-section {
		margin-bottom: 38px;
	}

	.section-title {
		margin-bottom: 16px;
	}

	.section-title h2 {
		margin: 0;
		font-size: 16px;
		font-weight: 750;
		letter-spacing: -0.03em;
	}

	.section-title p {
		margin: 4px 0 0;
		color: var(--text-muted);
		font-size: 12px;
	}

	.popular-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}

	.popular-card {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 16px;
		border: 1px solid var(--border);
		border-radius: 9px;
		background: transparent;
		text-decoration: none;
		color: var(--text);
		transition: background 0.15s ease, border-color 0.15s ease;
	}

	.popular-card:hover {
		border-color: var(--accent);
		background: var(--surface-subtle);
	}

	.popular-rank {
		font-size: 16px;
		font-weight: 800;
		color: var(--accent);
		width: 18px;
		text-align: center;
	}

	.popular-content {
		flex: 1;
		min-width: 0;
	}

	.popular-content h3 {
		margin: 0 0 6px;
		font-size: 13px;
		font-weight: 650;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.popular-meta {
		display: flex;
		gap: 8px;
		font-size: 11px;
		color: var(--text-muted);
	}

	.popular-meta strong {
		color: var(--text);
		font-weight: 600;
	}

	.popular-card .arrow {
		width: 14px;
		height: 14px;
		fill: none;
		stroke: var(--text-muted);
		stroke-width: 2;
		flex-shrink: 0;
	}

	/* Post Section & Table */

	.post-section {
		margin-bottom: 38px;
	}

	.post-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border);
		margin-bottom: 16px;
	}

	.section-heading h2 {
		margin: 0;
		font-size: 14px;
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--text);
	}

	.section-heading h2 span {
		color: var(--text-muted);
		font-weight: 500;
	}

	.sort-area select {
		padding: 5px 8px;
		border: 1px solid var(--border);
		border-radius: 6px;
		background: transparent;
		color: var(--text);
		font: inherit;
		font-size: 12px;
		outline: 0;
		cursor: pointer;
	}

	.post-table {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.table-head {
		display: grid;
		grid-template-columns: 110px 1fr 100px 60px 60px 80px;
		gap: 12px;
		padding: 8px 16px;
		color: var(--text-muted);
		font-size: 11px;
		font-weight: 650;
		border-bottom: 1px solid var(--border);
	}

	.post-row {
		display: grid;
		grid-template-columns: 110px 1fr 100px 60px 60px 80px;
		gap: 12px;
		align-items: center;
		padding: 12px 16px;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: transparent;
		text-decoration: none;
		color: var(--text);
		transition: background 0.15s ease, border-color 0.15s ease;
	}

	.post-row:hover {
		border-color: var(--accent);
		background: var(--surface-subtle);
	}

	.post-category {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 3px 8px;
		border: 1px solid var(--border);
		border-radius: 5px;
		background: var(--surface-subtle);
		color: var(--text-muted);
		font-size: 11px;
		font-weight: 600;
		width: fit-content;
	}

	.post-category svg {
		width: 11px;
		height: 11px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.post-title strong {
		font-size: 13px;
		font-weight: 650;
		color: var(--text);
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.post-row .author {
		font-size: 12px;
		color: var(--text);
		font-weight: 500;
	}

	.post-row .meta {
		font-size: 12px;
		color: var(--text-muted);
	}

	.post-row .meta.comment {
		color: var(--accent);
		font-weight: 650;
	}

	/* Pagination */

	.pagination-section {
		display: flex;
		justify-content: center;
		margin-bottom: 48px;
	}

	.pagination {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.pagination button {
		width: 32px;
		height: 32px;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 6px;
		background: transparent;
		color: var(--text-muted);
		font: inherit;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
	}

	.pagination button:hover:not(:disabled) {
		border-color: var(--accent);
		color: var(--text);
	}

	.pagination button.active {
		border-color: var(--accent);
		background: var(--surface-yellow);
		color: var(--accent);
		font-weight: 700;
	}

	.pagination button:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.pagination button svg {
		width: 14px;
		height: 14px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.pagination .dots {
		padding: 0 4px;
		color: var(--text-muted);
		font-size: 12px;
	}

	/* Contact Banner */

	.contact-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 18px 20px;
		border: 1px solid var(--border);
		border-radius: 9px;
		background: var(--surface-yellow);
	}

	.contact-icon {
		width: 32px;
		height: 32px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 7px;
		background: var(--accent);
		color: #fff;
	}

	.contact-icon svg {
		width: 15px;
		height: 15px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.contact-text {
		flex: 1;
		min-width: 0;
	}

	.contact-text span,
	.contact-text strong {
		display: block;
	}

	.contact-text span {
		margin-bottom: 2px;
		color: var(--text-muted);
		font-size: 11px;
	}

	.contact-text strong {
		font-size: 13px;
		font-weight: 650;
		color: var(--text);
	}

	.primary-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border-radius: 7px;
		padding: 8px 14px;
		border: 1px solid var(--primary);
		background: var(--primary);
		color: #0f172a;
		font: inherit;
		font-size: 11px;
		font-weight: 650;
		text-decoration: none;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
	}

	.primary-button:hover {
		border-color: var(--accent);
		background: var(--accent);
		color: #fff;
	}

	/* Responsive */

	@media (max-width: 900px) {
		.community-hero {
			grid-template-columns: 1fr;
		}

		.popular-grid {
			grid-template-columns: 1fr;
		}

		.table-head {
			display: none;
		}

		.post-row {
			grid-template-columns: 1fr;
			gap: 8px;
		}

		.post-row .author,
		.post-row .meta {
			display: inline-block;
			margin-right: 8px;
		}
	}

	@media (max-width: 760px) {
		.page {
			padding: 35px 16px 70px;
		}

		.settings-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}

		.settings-header h1 {
			font-size: 30px;
		}

		.toolbar {
			flex-direction: column;
			align-items: stretch;
			gap: 12px;
		}

		.search-box {
			width: 100%;
			box-sizing: border-box;
		}

		.contact-card {
			flex-direction: column;
			align-items: flex-start;
			gap: 14px;
		}

		.contact-card .primary-button {
			width: 100%;
		}
	}
</style>