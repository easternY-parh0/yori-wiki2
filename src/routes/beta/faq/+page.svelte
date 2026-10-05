<script lang="ts">
	import { appPath } from '$lib/app-path';
	import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';

	type Category = '전체' | '서비스' | '레시피' | '커뮤니티' | '계정';

	type FAQ = {
		category: Exclude<Category, '전체'>;
		question: string;
		answer: string;
	};

	const faqs: FAQ[] = [
		{ category: '서비스', question: '요리위키는 어떤 서비스인가요?', answer: '요리위키는 누구나 레시피와 식재료 정보를 찾아보고, 직접 등록하며, 다른 사용자와 요리 정보를 공유할 수 있도록 만든 레시피 위키 서비스입니다.' },
		{ category: '레시피', question: '레시피를 등록하려면 어떻게 해야 하나요?', answer: '로그인한 뒤 레시피 메뉴에서 레시피 등록하기를 선택하면 됩니다. 요리 이름, 재료, 조리 과정 등의 정보를 입력하여 새로운 레시피를 등록할 수 있습니다.' },
		{ category: '레시피', question: '등록한 레시피를 수정할 수 있나요?', answer: '네. 본인이 등록한 레시피는 마이페이지에서 확인할 수 있으며, 레시피 상세 화면에서 수정 메뉴를 통해 내용을 변경할 수 있습니다.' },
		{ category: '레시피', question: '레시피에 이미지를 등록할 수 있나요?', answer: '네. 레시피 등록 과정에서 대표 이미지와 조리 과정에 필요한 이미지를 등록할 수 있도록 구성할 예정입니다.' },
		{ category: '커뮤니티', question: '커뮤니티에서는 무엇을 할 수 있나요?', answer: '요리와 관련된 이야기를 자유롭게 작성하고 다른 사용자의 게시글을 확인하거나 댓글을 남길 수 있습니다.' },
		{ category: '커뮤니티', question: '다른 사용자의 게시글을 신고할 수 있나요?', answer: '네. 부적절한 게시글이나 댓글을 발견한 경우 신고 기능을 통해 운영진에게 알릴 수 있도록 제공할 예정입니다.' },
		{ category: '계정', question: '회원가입은 어떻게 하나요?', answer: '회원가입 페이지에서 필요한 정보를 입력하고 이용약관 및 개인정보처리방침에 동의하면 계정을 생성할 수 있습니다.' },
		{ category: '계정', question: '비밀번호를 잊어버렸어요.', answer: '로그인 화면의 비밀번호 찾기 기능을 이용하면 가입 당시 등록한 이메일을 통해 비밀번호를 재설정할 수 있도록 구현할 예정입니다.' },
		{ category: '계정', question: '회원탈퇴는 어떻게 하나요?', answer: '마이페이지 또는 설정 화면에서 계정 삭제 메뉴를 이용할 수 있습니다. 실제 탈퇴 과정에서는 계정 삭제에 대한 추가 확인 절차가 진행됩니다.' }
	];

	const categories: Category[] = ['전체', '서비스', '레시피', '커뮤니티', '계정'];

	let selectedCategory = $state<Category>('전체');
	let searchQuery = $state('');
	let openIndex = $state<number | null>(null);

	let filteredFaqs = $derived(
		faqs.filter((faq) => {
			const matchesCategory = selectedCategory === '전체' || faq.category === selectedCategory;
			const query = searchQuery.trim().toLowerCase();
			const matchesSearch =
				!query ||
				faq.question.toLowerCase().includes(query) ||
				faq.answer.toLowerCase().includes(query);

			return matchesCategory && matchesSearch;
		})
	);

	function selectCategory(category: Category) {
		selectedCategory = category;
		openIndex = null;
	}

	function toggleFAQ(index: number) {
		openIndex = openIndex === index ? null : index;
	}

	function search() {
		openIndex = null;
	}

	const breadcrumbItems = [
		{ label: '요리위키', href: appPath('/') },
		{ label: '자주 묻는 질문' }
	];
</script>

<svelte:head>
	<title>자주 묻는 질문 | 요리위키</title>
	<meta name="description" content="요리위키 자주 묻는 질문" />
</svelte:head>

<main class="page">
	<Breadcrumb items={breadcrumbItems} />

	<section class="settings-header">
		<div>
			<h1>자주 묻는 질문</h1>
			<p>요리위키 이용과 관련하여 궁금하신 점을 빠르게 확인해보세요.</p>
		</div>
	</section>

	<div class="toolbar">
		<div class="category-list">
			{#each categories as category}
				<button
					type="button"
					class:active={selectedCategory === category}
					onclick={() => selectCategory(category)}
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
				placeholder="궁금한 내용을 검색해보세요"
				aria-label="FAQ 검색"
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

	<section class="faq-section">
		<div class="section-heading">
			<h2>전체 질문 <span>({filteredFaqs.length})</span></h2>
			{#if selectedCategory !== '전체'}
				<button class="reset-button" type="button" onclick={() => selectCategory('전체')}>
					전체 보기
				</button>
			{/if}
		</div>

		{#if filteredFaqs.length > 0}
			<div class="faq-list">
				{#each filteredFaqs as faq, index}
					<div class="faq-item" class:open={openIndex === index}>
						<button
							class="question"
							type="button"
							aria-expanded={openIndex === index}
							onclick={() => toggleFAQ(index)}
						>
							<div class="question-left">
								<span class="badge">
									{#if faq.category === '서비스'}
										<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
									{:else if faq.category === '레시피'}
										<svg viewBox="0 0 24 24"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9zM12 3v6M8 5v4M16 5v4"/></svg>
									{:else if faq.category === '커뮤니티'}
										<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
									{:else}
										<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></svg>
									{/if}
									{faq.category}
								</span>
								<strong>{faq.question}</strong>
							</div>

							<span class="plus">
								<svg viewBox="0 0 24 24">
									<path d="M12 5v14M5 12h14" />
								</svg>
							</span>
						</button>

						{#if openIndex === index}
							<div class="answer">
								<p>{faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<div class="empty">
				<div class="empty-icon">
					<svg viewBox="0 0 24 24">
						<circle cx="11" cy="11" r="6.5" />
						<path d="m16 16 5 5" />
					</svg>
				</div>
				<h3>검색 결과가 없습니다.</h3>
				<p>다른 검색어나 카테고리로 다시 찾아보세요.</p>
				<button class="primary-button" type="button" onclick={() => { searchQuery = ''; selectedCategory = '전체'; }}>
					전체 질문 보기
				</button>
			</div>
		{/if}
	</section>

	<section class="contact-card">
		<div class="contact-icon">
			<svg viewBox="0 0 24 24">
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
			</svg>
		</div>

		<div class="contact-text">
			<span>찾으시는 답변이 없나요?</span>
			<strong>궁금한 내용을 커뮤니티에서 질문해보세요.</strong>
		</div>

		<a href={appPath('/community')} class="primary-button">커뮤니티 가기</a>
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

	/* FAQ Section */

	.faq-section {
		margin-bottom: 38px;
	}

	.section-heading {
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

	.reset-button {
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--accent);
		font-size: 12px;
		font-weight: 650;
		cursor: pointer;
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.faq-item {
		border: 1px solid var(--border);
		border-radius: 9px;
		background: transparent;
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.faq-item:hover {
		border-color: var(--accent);
		background: var(--surface-subtle);
	}

	.faq-item.open {
		border-color: var(--accent);
		background: var(--surface-yellow);
	}

	.question {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 16px 20px;
		border: 0;
		background: transparent;
		color: var(--text);
		text-align: left;
		cursor: pointer;
	}

	.question-left {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
	}

	/* Monochrome Unified Badge */

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
		flex-shrink: 0;
	}

	.badge svg {
		width: 11px;
		height: 11px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.question strong {
		font-size: 13px;
		font-weight: 650;
		color: var(--text);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.plus {
		width: 24px;
		height: 24px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 6px;
		background: var(--surface-subtle);
		color: var(--text-muted);
		transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
	}

	.plus svg {
		width: 12px;
		height: 12px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
	}

	.faq-item.open .plus {
		transform: rotate(45deg);
		background: var(--accent);
		color: #fff;
	}

	.answer {
		padding: 0 20px 18px 20px;
		border-top: 1px dashed var(--border);
		margin-top: 4px;
	}

	.answer p {
		margin: 14px 0 0;
		color: var(--text-muted);
		font-size: 13px;
		line-height: 1.7;
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

	/* Primary Button Style */

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

		.question {
			padding: 14px 16px;
		}

		.question-left {
			align-items: flex-start;
			flex-direction: column;
			gap: 6px;
		}

		.question strong {
			white-space: normal;
		}

		.answer {
			padding: 0 16px 16px 16px;
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