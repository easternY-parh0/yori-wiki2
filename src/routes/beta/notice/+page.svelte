<script lang="ts">
	import { appPath } from '$lib/app-path';
	import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';

	type Category = '전체' | '서비스' | '업데이트' | '이벤트' | '안내';

	type Notice = {
		id: number;
		category: Exclude<Category, '전체'>;
		title: string;
		date: string;
		pinned?: boolean;
		content: string;
	};

	const notices: Notice[] = [
		{ id: 1, category: '서비스', title: '요리위키 서비스 이용 안내', date: '2026.08.27', pinned: true, content: '요리위키 서비스 이용과 관련된 기본적인 안내사항입니다. 레시피 등록 및 커뮤니티 이용 전에 확인해주세요.' },
		{ id: 2, category: '업데이트', title: '레시피 등록 기능 업데이트 안내', date: '2026.08.24', pinned: true, content: '더 편리한 레시피 등록을 위해 레시피 작성 화면의 입력 항목과 사용자 인터페이스가 개선되었습니다.' },
		{ id: 3, category: '안내', title: '커뮤니티 이용 규칙 안내', date: '2026.08.20', content: '요리위키 커뮤니티를 이용할 때 지켜야 할 기본적인 이용 규칙을 안내합니다.' },
		{ id: 4, category: '업데이트', title: '식재료 위키 검색 기능 개선', date: '2026.08.18', content: '식재료 이름과 분류를 보다 쉽게 검색할 수 있도록 검색 기능이 개선되었습니다.' },
		{ id: 5, category: '이벤트', title: '나만의 레시피 등록 이벤트 안내', date: '2026.08.15', content: '직접 만든 레시피를 요리위키에 등록하고 다른 사용자와 공유해보세요.' },
		{ id: 6, category: '안내', title: '서비스 점검 일정 안내', date: '2026.08.12', content: '보다 안정적인 서비스를 제공하기 위한 시스템 점검이 예정되어 있습니다.' },
		{ id: 7, category: '서비스', title: '요리위키 회원가입 안내', date: '2026.08.08', content: '요리위키의 회원가입 및 계정 이용 방법에 관한 안내입니다.' },
		{ id: 8, category: '업데이트', title: '마이페이지 기능 개선 안내', date: '2026.08.05', content: '내가 등록한 레시피와 커뮤니티 활동을 더욱 쉽게 확인할 수 있도록 마이페이지가 개선되었습니다.' },
		{ id: 9, category: '안내', title: '개인정보처리방침 변경 안내', date: '2026.08.01', content: '서비스 운영 정책 변경에 따라 개인정보처리방침의 일부 내용이 변경되었습니다.' }
	];

	const categories: Category[] = ['전체', '서비스', '업데이트', '이벤트', '안내'];

	let selectedCategory = $state<Category>('전체');
	let searchQuery = $state('');
	let currentPage = $state(1);

	const perPage = 6;

	let filteredNotices = $derived(
		notices.filter((notice) => {
			const matchesCategory =
				selectedCategory === '전체' || notice.category === selectedCategory;

			const query = searchQuery.trim().toLowerCase();

			const matchesSearch =
				!query ||
				notice.title.toLowerCase().includes(query) ||
				notice.content.toLowerCase().includes(query);

			return matchesCategory && matchesSearch;
		})
	);

	let normalNotices = $derived(filteredNotices.filter((notice) => !notice.pinned));
	let pinnedNotices = $derived(filteredNotices.filter((notice) => notice.pinned));

	let totalPages = $derived(Math.max(1, Math.ceil(normalNotices.length / perPage)));

	let paginatedNotices = $derived(
		normalNotices.slice((currentPage - 1) * perPage, currentPage * perPage)
	);

	function changeCategory(category: Category) {
		selectedCategory = category;
		currentPage = 1;
	}

	function search() {
		currentPage = 1;
	}

	function goToPage(page: number) {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
	}

	const breadcrumbItems = [
		{ label: '요리위키', href: appPath('/') },
		{ label: '공지사항' }
	];
</script>

<svelte:head>
	<title>공지사항 | 요리위키</title>
	<meta name="description" content="요리위키 공지사항" />
</svelte:head>

<main class="page">
	<Breadcrumb items={breadcrumbItems} />
	
	<section class="settings-header">
		<div>
			<h1>공지사항</h1>
			<p>요리위키의 새로운 서비스와 정보를 확인해 보세요.</p>
		</div>
	</section>

	<div class="toolbar">
		<div class="category-list">
			{#each categories as category}
				<button
					type="button"
					class:active={selectedCategory === category}
					onclick={() => changeCategory(category)}
				>
					{category}
				</button>
			{/each}
		</div>

		<form class="search-box" onsubmit={(event) => { event.preventDefault(); search(); }}>
			<svg viewBox="0 0 24 24">
				<circle cx="11" cy="11" r="6.5" />
				<path d="m16 16 5 5" />
			</svg>

			<input
				type="search"
				bind:value={searchQuery}
				placeholder="공지사항 검색"
				aria-label="공지사항 검색"
			/>

			{#if searchQuery}
				<button
					class="clear-button"
					type="button"
					aria-label="검색어 지우기"
					onclick={() => { searchQuery = ''; search(); }}
				>
					<svg viewBox="0 0 24 24">
						<path d="M6 6l12 12M18 6L6 18" />
					</svg>
				</button>
			{/if}
		</form>
	</div>

	<section class="notice-section">
		<div class="section-heading">
			<h2>전체 공지 <span>({filteredNotices.length})</span></h2>
		</div>

		{#if pinnedNotices.length > 0}
			<div class="notice-group pinned-group">
				{#each pinnedNotices as notice}
					<a href={appPath(`/notice/${notice.id}`)} class="notice-card pinned">
						<div class="notice-main">
							<span class="pin-icon" title="중요 공지">
								<svg viewBox="0 0 24 24">
									<path d="m15 4 5 5-3 1-4 5-3-3 5-4zM10 14l-6 6M8 16l-2-2" />
								</svg>
							</span>

							<div class="notice-info">
								<div class="notice-meta">
									<span class="badge">
										{#if notice.category === '서비스'}
											<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
										{:else if notice.category === '업데이트'}
											<svg viewBox="0 0 24 24"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
										{:else if notice.category === '이벤트'}
											<svg viewBox="0 0 24 24"><path d="m12 3-1.9 5.8H4l4.9 3.6-1.9 5.8 5-3.6 5 3.6-1.9-5.8 4.9-3.6h-6.1z"/></svg>
										{:else}
											<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
										{/if}
										{notice.category}
									</span>
									<span class="pinned-label">중요</span>
								</div>
								<strong>{notice.title}</strong>
							</div>
						</div>

						<div class="notice-side">
							<span class="notice-date">{notice.date}</span>
							<span class="arrow">
								<svg viewBox="0 0 24 24">
									<path d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</div>
					</a>
				{/each}
			</div>
		{/if}

		{#if paginatedNotices.length > 0}
			<div class="notice-group">
				{#each paginatedNotices as notice}
					<a href={appPath(`/notice/${notice.id}`)} class="notice-card">
						<div class="notice-main">
							<div class="notice-info">
								<div class="notice-meta">
									<span class="badge">
										{#if notice.category === '서비스'}
											<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
										{:else if notice.category === '업데이트'}
											<svg viewBox="0 0 24 24"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
										{:else if notice.category === '이벤트'}
											<svg viewBox="0 0 24 24"><path d="m12 3-1.9 5.8H4l4.9 3.6-1.9 5.8 5-3.6 5 3.6-1.9-5.8 4.9-3.6h-6.1z"/></svg>
										{:else}
											<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
										{/if}
										{notice.category}
									</span>
								</div>
								<strong>{notice.title}</strong>
							</div>
						</div>

						<div class="notice-side">
							<span class="notice-date">{notice.date}</span>
							<span class="arrow">
								<svg viewBox="0 0 24 24">
									<path d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</div>
					</a>
				{/each}
			</div>
		{:else if pinnedNotices.length === 0}
			<div class="empty">
				<div class="empty-icon">
					<svg viewBox="0 0 24 24">
						<circle cx="11" cy="11" r="6.5" />
						<path d="m16 16 5 5" />
					</svg>
				</div>
				<h3>공지사항이 없습니다.</h3>
				<p>검색어나 카테고리를 변경하여 다시 확인해보세요.</p>
				<button class="primary-button" type="button" onclick={() => { searchQuery = ''; selectedCategory = '전체'; currentPage = 1; }}>
					전체 공지 보기
				</button>
			</div>
		{/if}
	</section>

	{#if totalPages > 1}
		<nav class="pagination" aria-label="공지사항 페이지">
			<button
				type="button"
				aria-label="이전 페이지"
				disabled={currentPage === 1}
				onclick={() => goToPage(currentPage - 1)}
			>
				<svg viewBox="0 0 24 24">
					<path d="m15 5-7 7 7 7" />
				</svg>
			</button>

			{#each Array(totalPages) as _, index}
				<button
					type="button"
					class:active={currentPage === index + 1}
					onclick={() => goToPage(index + 1)}
				>
					{index + 1}
				</button>
			{/each}

			<button
				type="button"
				aria-label="다음 페이지"
				disabled={currentPage === totalPages}
				onclick={() => goToPage(currentPage + 1)}
			>
				<svg viewBox="0 0 24 24">
					<path d="m9 5 7 7-7 7" />
				</svg>
			</button>
		</nav>
	{/if}
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

	/* Header */

	.settings-header {
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

	/* Toolbar & Search */

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin-top: 38px;
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
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;
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

	/* Notice Section */

	.section-heading {
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

	.notice-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.pinned-group {
		margin-bottom: 8px;
	}

	/* Card Item */

	.notice-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 16px 20px; /* 내부 요소가 테두리에 붙지 않도록 여백 지정 */
		border: 1px solid var(--border);
		border-radius: 9px;
		background: transparent;
		color: var(--text);
		text-decoration: none;
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.notice-card:hover {
		border-color: var(--accent);
		background: var(--surface-subtle);
	}

	.notice-card.pinned {
		border-color: var(--border);
		background: var(--surface-yellow);
	}

	.notice-card.pinned:hover {
		border-color: var(--accent);
	}

	.notice-main {
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.pin-icon {
		width: 28px;
		height: 28px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 6px;
		background: var(--accent);
		color: #fff;
	}

	.pin-icon svg {
		width: 13px;
		height: 13px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.notice-info {
		min-width: 0;
	}

	.notice-meta {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 5px;
	}

	/* Monochrome Unified Badge with Icons */

	.badge {
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
		line-height: 1;
	}

	.badge svg {
		width: 11px;
		height: 11px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.pinned-label {
		color: var(--accent);
		font-size: 11px;
		font-weight: 700;
	}

	.notice-info strong {
		display: block;
		overflow: hidden;
		font-size: 13px;
		font-weight: 650;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--text);
		transition: color 0.15s ease;
	}

	.notice-card:hover strong {
		color: var(--accent);
	}

	.notice-side {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-shrink: 0;
	}

	.notice-date {
		color: var(--text-muted);
		font-size: 12px;
	}

	.arrow {
		display: grid;
		place-items: center;
		color: var(--text-muted);
		transition: transform 0.15s ease, color 0.15s ease;
	}

	.arrow svg {
		width: 14px;
		height: 14px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.notice-card:hover .arrow {
		transform: translateX(2px);
		color: var(--accent);
	}

	/* Empty State */

	.empty {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 60px 20px;
		text-align: center;
	}

	.empty-icon {
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		margin-bottom: 12px;
		border-radius: 10px;
		background: var(--surface-subtle);
		color: var(--text-muted);
	}

	.empty-icon svg {
		width: 18px;
		height: 18px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.empty h3 {
		margin: 0 0 6px;
		font-size: 14px;
		font-weight: 700;
	}

	.empty p {
		margin: 0 0 16px;
		color: var(--text-muted);
		font-size: 12px;
	}

	/* Primary Button */

	.primary-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border-radius: 7px;
		padding: 8px 12px;
		border: 1px solid var(--primary);
		background: var(--primary);
		color: #0f172a;
		font: inherit;
		font-size: 11px;
		font-weight: 650;
		cursor: pointer;
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;
	}

	.primary-button:hover {
		border-color: var(--accent);
		background: var(--accent);
		color: #fff;
	}

	/* Pagination */

	.pagination {
		display: flex;
		justify-content: center;
		gap: 5px;
		margin-top: 38px;
	}

	.pagination button {
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 7px;
		background: transparent;
		color: var(--text-muted);
		font: inherit;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;
	}

	.pagination button:hover:not(:disabled) {
		border-color: var(--accent);
		color: var(--accent);
		background: var(--surface-yellow);
	}

	.pagination button.active {
		border-color: var(--primary);
		background: var(--primary);
		color: #0f172a;
		font-weight: 700;
	}

	.pagination button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.pagination svg {
		width: 12px;
		height: 12px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	/* Mobile Layout */

	@media (max-width: 760px) {
		.page {
			padding: 35px 16px 70px;
		}

		.settings-header {
			padding-bottom: 24px;
		}

		.settings-header h1 {
			font-size: 30px;
		}

		.settings-header p {
			font-size: 12px;
		}

		.toolbar {
			flex-direction: column;
			align-items: stretch;
			gap: 12px;
			margin-top: 25px;
			margin-bottom: 24px;
		}

		.search-box {
			width: 100%;
			box-sizing: border-box;
		}

		.notice-card {
			padding: 14px 16px;
		}

		.notice-date {
			display: none;
		}
	}
</style>