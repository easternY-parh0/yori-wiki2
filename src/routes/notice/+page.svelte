<script lang="ts">
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
	let openId = $state<number | null>(null);

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
		openId = null;
	}

	function search() {
		currentPage = 1;
		openId = null;
	}

	function toggleNotice(id: number) {
		openId = openId === id ? null : id;
	}

	function goToPage(page: number) {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
		openId = null;
	}

	function categoryClass(category: Notice['category']) {
		return category === '업데이트'
			? 'update'
			: category === '이벤트'
				? 'event'
				: category === '안내'
					? 'guide'
					: 'service';
	}
</script>

<svelte:head>
	<title>공지사항 | 요리위키</title>
	<meta name="description" content="요리위키 공지사항" />
</svelte:head>

<main class="page">
	<section class="hero">
		<div>
			<span class="section-label">NOTICE</span>
			<h1>공지사항</h1>
			<p>요리위키의 새로운 소식과 서비스 안내를 확인해보세요.</p>
		</div>

		<div class="hero-icon">
			<svg viewBox="0 0 24 24">
				<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 10h18c0-3-3-3-3-10" />
				<path d="M10 21h4" />
			</svg>
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
			<div>
				<span>{filteredNotices.length}개의 공지</span>
				<h2>새로운 소식</h2>
			</div>
		</div>

		{#if pinnedNotices.length > 0}
			<div class="pinned-list">
				{#each pinnedNotices as notice}
					<article class:open={openId === notice.id} class="notice-item pinned">
						<button class="notice-row" type="button" onclick={() => toggleNotice(notice.id)}>
							<div class="notice-main">
								<span class="pin-icon">
									<svg viewBox="0 0 24 24">
										<path d="m15 4 5 5-3 1-4 5-3-3 5-4zM10 14l-6 6M8 16l-2-2" />
									</svg>
								</span>

								<div class="notice-info">
									<div class="notice-meta">
										<span class:service={categoryClass(notice.category)}>{notice.category}</span>
										<b>중요</b>
									</div>
									<strong>{notice.title}</strong>
								</div>
							</div>

							<div class="notice-date">{notice.date}</div>

							<span class="arrow">
								<svg viewBox="0 0 24 24">
									<path d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</button>

						{#if openId === notice.id}
							<div class="notice-content">
								<p>{notice.content}</p>
							</div>
						{/if}
					</article>
				{/each}
			</div>
		{/if}

		{#if paginatedNotices.length > 0}
			<div class="notice-list">
				{#each paginatedNotices as notice}
					<article class:open={openId === notice.id} class="notice-item">
						<button class="notice-row" type="button" onclick={() => toggleNotice(notice.id)}>
							<div class="notice-main">
								<div class="notice-info">
									<div class="notice-meta">
										<span class={categoryClass(notice.category)}>{notice.category}</span>
									</div>
									<strong>{notice.title}</strong>
								</div>
							</div>

							<div class="notice-date">{notice.date}</div>

							<span class="arrow">
								<svg viewBox="0 0 24 24">
									<path d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</button>

						{#if openId === notice.id}
							<div class="notice-content">
								<p>{notice.content}</p>
							</div>
						{/if}
					</article>
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
				<button type="button" onclick={() => { searchQuery = ''; selectedCategory = '전체'; currentPage = 1; }}>
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
		min-height: 100vh;
		padding: 55px 24px 100px;
		background: var(--background);
		color: var(--text);
	}

	.hero,
	.toolbar,
	.notice-section {
		width: min(900px, 100%);
		margin-left: auto;
		margin-right: auto;
	}

	.hero {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 28px;
		padding-bottom: 30px;
		border-bottom: 1px solid var(--border);
	}

	.section-label {
		color: var(--accent);
		font-size: 14px;
		font-weight: 800;
		letter-spacing: .1em;
	}

	.hero h1 {
		margin: 8px 0 9px;
		font-size: 29px;
		letter-spacing: -.06em;
	}

	.hero p {
		margin: 0;
		color: var(--text-muted);
		font-size: 14px;
	}

	.hero-icon {
		width: 58px;
		height: 58px;
		display: grid;
		place-items: center;
		border-radius: 16px;
		background: var(--surface-yellow);
		color: var(--accent);
	}

	.hero-icon svg {
		width: 27px;
		height: 27px;
	}

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 38px;
	}

	.category-list {
		display: flex;
		gap: 5px;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.category-list::-webkit-scrollbar {
		display: none;
	}

	.category-list button {
		flex-shrink: 0;
		padding: 8px 13px;
		border: 1px solid var(--border);
		border-radius: 999px;
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

	.search-box {
		width: 210px;
		height: 34px;
		display: flex;
		align-items: center;
		gap: 7px;
		flex-shrink: 0;
		padding: 0 10px;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--surface);
	}

	.search-box:focus-within {
		border-color: var(--primary);
	}

	.search-box > svg {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
		color: var(--text-muted);
	}

	.search-box input {
		width: 100%;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--text);
		font: inherit;
		font-size: 14px;
	}

	.search-box input::placeholder {
		color: var(--text-muted);
	}

	.clear-button {
		width: 22px;
		height: 22px;
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
		width: 11px;
		height: 11px;
	}

	.section-heading {
		margin-bottom: 12px;
	}

	.section-heading span {
		color: var(--accent);
		font-size: 14px;
		font-weight: 750;
	}

	.section-heading h2 {
		margin: 5px 0 0;
		font-size: 16px;
		letter-spacing: -.04em;
	}

	.pinned-list,
	.notice-list {
		border-top: 1px solid var(--border);
	}

	.notice-item {
		border-bottom: 1px solid var(--border);
	}

	.notice-item.pinned {
		border: 1px solid var(--primary);
		border-radius: 11px;
		margin-bottom: 8px;
		background: var(--surface-yellow);
	}

	.notice-item.pinned + .notice-item {
		border-top: 1px solid var(--border);
	}

	.notice-row {
		width: 100%;
		min-height: 68px;
		display: grid;
		grid-template-columns: minmax(0, 1fr) 90px 20px;
		align-items: center;
		gap: 15px;
		padding: 13px 5px;
		border: 0;
		background: transparent;
		color: var(--text);
		text-align: left;
		cursor: pointer;
	}

	.pinned .notice-row {
		padding-left: 14px;
		padding-right: 14px;
	}

	.notice-main {
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 11px;
	}

	.pin-icon {
		width: 29px;
		height: 29px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 8px;
		background: var(--primary);
		color: #0f172a;
	}

	.pin-icon svg {
		width: 15px;
		height: 15px;
	}

	.notice-info {
		min-width: 0;
	}

	.notice-meta {
		display: flex;
		align-items: center;
		gap: 5px;
		margin-bottom: 5px;
	}

	.notice-meta span {
		display: inline-block;
		padding: 3px 6px;
		border-radius: 4px;
		background: var(--surface-green);
		color: var(--accent);
		font-size: 14px;
		font-weight: 750;
	}

	.notice-meta span.update {
		background: var(--surface-yellow);
		color: #a16207;
	}

	.notice-meta span.event {
		background: var(--surface-green);
		color: var(--accent);
	}

	.notice-meta span.guide {
		background: var(--surface-subtle);
		color: var(--text-subtle);
	}

	.notice-meta b {
		color: var(--accent);
		font-size: 14px;
		font-weight: 800;
	}

	.notice-info strong {
		display: block;
		overflow: hidden;
		font-size: 14px;
		font-weight: 650;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.notice-date {
		color: var(--text-muted);
		font-size: 14px;
		text-align: right;
	}

	.arrow {
		display: grid;
		place-items: center;
		color: var(--text-muted);
		transition: transform .2s ease, color .2s ease;
	}

	.arrow svg {
		width: 14px;
		height: 14px;
	}

	.notice-item.open .arrow {
		transform: rotate(90deg);
		color: var(--accent);
	}

	.notice-content {
		padding: 0 42px 19px;
	}

	.notice-content p {
		margin: 0;
		padding: 14px 15px;
		border-radius: 8px;
		background: var(--surface-subtle);
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 1.8;
	}

	.empty {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 60px 20px;
		border: 1px solid var(--border);
		border-radius: 13px;
		background: var(--surface);
		text-align: center;
	}

	.empty-icon {
		width: 42px;
		height: 42px;
		display: grid;
		place-items: center;
		margin-bottom: 13px;
		border-radius: 11px;
		background: var(--surface-subtle);
		color: var(--text-muted);
	}

	.empty-icon svg {
		width: 19px;
		height: 19px;
	}

	.empty h3 {
		margin: 0 0 6px;
		font-size: 14px;
	}

	.empty p {
		margin: 0 0 15px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.empty button {
		padding: 8px 12px;
		border: 0;
		border-radius: 8px;
		background: var(--primary);
		color: #0f172a;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}

	.pagination {
		display: flex;
		justify-content: center;
		gap: 4px;
		margin-top: 27px;
	}

	.pagination button {
		width: 29px;
		height: 29px;
		display: grid;
		place-items: center;
		border: 1px solid transparent;
		border-radius: 7px;
		background: transparent;
		color: var(--text-subtle);
		font-size: 14px;
		cursor: pointer;
	}

	.pagination button:hover:not(:disabled) {
		background: var(--surface-subtle);
	}

	.pagination button.active {
		background: var(--primary);
		color: #0f172a;
		font-weight: 750;
	}

	.pagination button:disabled {
		opacity: .3;
		cursor: not-allowed;
	}

	.pagination svg {
		width: 13px;
		height: 13px;
	}

	@media (max-width: 700px) {
		.toolbar {
			align-items: stretch;
			flex-direction: column;
		}

		.search-box {
			width: 100%;
		}
	}

	@media (max-width: 560px) {
		.page {
			padding: 35px 16px 70px;
		}

		.hero h1 {
			font-size: 24px;
		}

		.hero-icon {
			width: 48px;
			height: 48px;
			border-radius: 13px;
		}

		.hero-icon svg {
			width: 23px;
			height: 23px;
		}

		.notice-row {
			grid-template-columns: minmax(0, 1fr) 20px;
		}

		.notice-date {
			display: none;
		}

		.notice-content {
			padding: 0 15px 15px;
		}

		.notice-info strong {
			font-size: 14px;
		}
	}
</style>