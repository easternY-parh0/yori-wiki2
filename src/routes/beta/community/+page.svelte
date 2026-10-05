<script lang="ts">
	import { appPath } from '$lib/app-path';
	import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';
	import PreparingModal from '$lib/components/layouts/PreparingModal.svelte';
	import Board from '$lib/components/Board.svelte';

	interface Post {
		id: string | number;
		category: string;
		title: string;
		author: string;
		date: string;
		views?: number;
		comments?: number;
	}

	interface PopularPost {
		id: string | number;
		title: string;
		author: string;
		comments: number;
		views: number;
	}

	// Props로 전달받는 상태 및 데이터
	let {
		posts = $bindable([] as Post[]),
		popularPosts = [] as PopularPost[],
		totalPostsCount = 0,
		totalPages = 1,
		activeBoard = $bindable('전체'),
		sortType = $bindable('최신순'),
		currentPage = $bindable(1),
		searchKeyword = $bindable('')
	} = $props();

	let isPreparingOpen = $state(true);

	const breadcrumbItems = [
		{ label: '요리위키', href: appPath('/') },
		{ label: '커뮤니티' }
	];

	function handlePageChange(page: number) {
		currentPage = page;
	}
</script>

<svelte:head>
	<title>커뮤니티 | 요리위키</title>
	<meta name="description" content="요리위키 커뮤니티에서 요리 이야기를 나눠보세요." />
</svelte:head>

<PreparingModal bind:open={isPreparingOpen} />

<main class="page">
	<Breadcrumb items={breadcrumbItems} />

	<!-- 헤더 영역 (중복 글쓰기 버튼 제거) -->
	<section class="settings-header">
		<div>
			<h1>커뮤니티</h1>
			<p>요리에 대한 이야기를 나누고 다른 사람들의 다양한 노하우를 만나보세요.</p>
		</div>
	</section>

	<!-- 히어로 배너 영역 -->
	<section class="community-hero">
		<div class="hero-text">
			<span class="hero-label">요리 이야기</span>
			<h2>맛있는 즐거움을<br /><span>함께 나눠보세요!</span></h2>
			<p>오늘의 요리 고민부터 나만의 특별한 레시피 노하우까지 자유롭게 공유하는 공간입니다.</p>
		</div>

		{#if popularPosts.length > 0}
			<div class="hero-card">
				<div class="hero-icon">🍳</div>
				<span>오늘의 베스트 이야기</span>
				<strong>"{popularPosts[0].title}"</strong>
			</div>
		{/if}
	</section>

	{#if popularPosts.length > 0}
		<!-- 실시간 인기글 영역 -->
		<section class="popular-section">
			<div class="section-title">
				<div>
					<h2>🔥 실시간 인기글</h2>
					<p>지금 커뮤니티에서 가장 뜨거운 이야기입니다.</p>
				</div>
			</div>

			<div class="popular-grid">
				{#each popularPosts as post, index}
					<a href={appPath(`/community/${post.id}`)} class="popular-card">
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
	{/if}

	<!-- 게시판 컴포넌트 (카테고리, 검색창, 게시글 목록, 정렬, 페이지네이션 내장) -->
	<Board
		{posts}
		{totalPostsCount}
		{totalPages}
		bind:activeCategory={activeBoard}
		bind:searchKeyword
		bind:sortType
		bind:currentPage
		onPageChange={handlePageChange}
	/>

	<!-- 하단 안내 카드는 필요 시 유지하거나, Board 내부의 글쓰기 버튼으로 충분하면 제거 가능 -->
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

	/* Hero Section */

	.community-hero {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: 24px;
		align-items: center;
		margin-top: 28px;
		margin-bottom: 32px;
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
		border-radius: 99px;
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

	/* Contact Banner */

	.contact-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 18px 20px;
		border: 1px solid var(--border);
		border-radius: 9px;
		background: var(--surface-yellow);
		margin-top: 38px;
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
	}

	@media (max-width: 760px) {
		.page {
			padding: 35px 16px 70px;
		}

		.settings-header h1 {
			font-size: 30px;
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