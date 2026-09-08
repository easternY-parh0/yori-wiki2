<script lang="ts">
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

	let selectedCategory = $state<Category>('전체');
	let searchQuery = $state('');
	let openIndex = $state<number | null>(null);

	const categories: Category[] = ['전체', '서비스', '레시피', '커뮤니티', '계정'];

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
</script>

<svelte:head>
	<title>FAQ | 요리위키</title>
	<meta name="description" content="요리위키 자주 묻는 질문" />
</svelte:head>

<main class="page">
	<section class="hero">
		<div class="hero-copy">
			<span class="section-label">HELP CENTER</span>
			<h1>무엇이 궁금하신가요?</h1>
			<p>요리위키 이용에 관한 자주 묻는 질문을 확인해보세요.</p>
		</div>

		<div class="hero-icon">
			<svg viewBox="0 0 24 24">
				<circle cx="12" cy="12" r="9" />
				<path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.7-1.7 1.2-1.7 2.7" />
				<path d="M12 17h.01" />
			</svg>
		</div>
	</section>

	<div class="search-box">
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
			<button class="clear-button" type="button" aria-label="검색어 지우기" onclick={() => (searchQuery = '')}>
				<svg viewBox="0 0 24 24">
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
		{/if}
	</div>

	<div class="category-list">
		{#each categories as category}
			<button
				class:active={selectedCategory === category}
				type="button"
				onclick={() => selectCategory(category)}
			>
				{category}
			</button>
		{/each}
	</div>

	<section class="faq-section">
		<div class="section-heading">
			<div>
				<span class="count-label">{filteredFaqs.length}개의 질문</span>
				<h2>자주 묻는 질문</h2>
			</div>

			{#if selectedCategory !== '전체'}
				<button class="reset-button" type="button" onclick={() => selectCategory('전체')}>
					전체 보기
				</button>
			{/if}
		</div>

		{#if filteredFaqs.length > 0}
			<div class="faq-list">
				{#each filteredFaqs as faq, index}
					<div class:open={openIndex === index} class="faq-item">
						<button
							class="question"
							type="button"
							aria-expanded={openIndex === index}
							onclick={() => toggleFAQ(index)}
						>
							<div class="question-left">
								<span class="category">{faq.category}</span>
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
				<button type="button" onclick={() => { searchQuery = ''; selectedCategory = '전체'; }}>
					전체 질문 보기
				</button>
			</div>
		{/if}
	</section>

	<section class="contact-card">
		<div class="contact-icon">
			<svg viewBox="0 0 24 24">
				<path d="M4 5h16v11H8l-4 3z" />
				<path d="M8 9h8M8 12h5" />
			</svg>
		</div>

		<div>
			<span>찾으시는 답변이 없나요?</span>
			<strong>궁금한 내용을 커뮤니티에서 질문해보세요.</strong>
		</div>

		<a href="/community">커뮤니티 가기</a>
	</section>
</main>

<style>
	.page {
		min-height: 100vh;
		padding: 55px 24px 100px;
		background: var(--background);
		color: var(--text);
	}

	.hero,
	.search-box,
	.category-list,
	.faq-section,
	.contact-card {
		width: min(900px, 100%);
		margin-left: auto;
		margin-right: auto;
	}

	.hero {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30px;
		padding-bottom: 30px;
		border-bottom: 1px solid var(--border);
	}

	.section-label,
	.count-label {
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

	.search-box {
		display: flex;
		align-items: center;
		gap: 11px;
		padding: 0 15px;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--surface);
		box-shadow: 0 4px 15px rgba(15, 23, 42, .04);
	}

	.search-box:focus-within {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px rgba(250, 204, 21, .13);
	}

	.search-box > svg {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		color: var(--text-muted);
	}

	.search-box input {
		width: 100%;
		height: 48px;
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
		width: 27px;
		height: 27px;
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
		width: 13px;
		height: 13px;
	}

	.category-list {
		display: flex;
		gap: 6px;
		margin-top: 16px;
		margin-bottom: 42px;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.category-list::-webkit-scrollbar {
		display: none;
	}

	.category-list button {
		flex-shrink: 0;
		padding: 8px 14px;
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
		color: var(--text);
	}

	.category-list button.active {
		border-color: var(--primary);
		background: var(--primary);
		color: #0f172a;
	}

	.faq-section {
		margin-bottom: 24px;
	}

	.section-heading {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin-bottom: 13px;
	}

	.section-heading h2 {
		margin: 6px 0 0;
		font-size: 16px;
		letter-spacing: -.04em;
	}

	.reset-button {
		padding: 7px 10px;
		border: 0;
		background: transparent;
		color: var(--accent);
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}

	.faq-list {
		border-top: 1px solid var(--border);
	}

	.faq-item {
		border-bottom: 1px solid var(--border);
	}

	.question {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 18px 5px;
		border: 0;
		background: transparent;
		color: var(--text);
		text-align: left;
		cursor: pointer;
	}

	.question-left {
		display: flex;
		align-items: center;
		gap: 11px;
		min-width: 0;
	}

	.category {
		flex-shrink: 0;
		padding: 4px 7px;
		border-radius: 5px;
		background: var(--surface-green);
		color: var(--accent);
		font-size: 14px;
		font-weight: 750;
	}

	.question strong {
		font-size: 14px;
		font-weight: 650;
	}

	.plus {
		width: 25px;
		height: 25px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 7px;
		background: var(--surface-subtle);
		color: var(--text-muted);
		transition: transform .2s ease, background .2s ease;
	}

	.plus svg {
		width: 14px;
		height: 14px;
	}

	.faq-item.open .plus {
		transform: rotate(45deg);
		background: var(--surface-yellow);
		color: var(--accent);
	}

	.answer {
		padding: 0 42px 19px 5px;
	}

	.answer p {
		margin: 0;
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

	.contact-card {
		display: flex;
		align-items: center;
		gap: 13px;
		padding: 17px 19px;
		border: 1px solid var(--border);
		border-radius: 13px;
		background: var(--surface-yellow);
	}

	.contact-icon {
		width: 37px;
		height: 37px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 10px;
		background: var(--primary);
		color: #0f172a;
	}

	.contact-icon svg {
		width: 18px;
		height: 18px;
	}

	.contact-card div:nth-child(2) {
		flex: 1;
	}

	.contact-card span,
	.contact-card strong {
		display: block;
	}

	.contact-card span {
		margin-bottom: 3px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.contact-card strong {
		font-size: 14px;
	}

	.contact-card a {
		padding: 9px 12px;
		border-radius: 8px;
		background: var(--accent);
		color: #fff;
		font-size: 14px;
		font-weight: 700;
		white-space: nowrap;
	}

	.contact-card a:hover {
		opacity: .9;
	}

	@media (max-width: 560px) {
		.page {
			padding: 35px 16px 70px;
		}

		.hero {
			margin-bottom: 22px;
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

		.category-list {
			margin-bottom: 30px;
		}

		.question-left {
			align-items: flex-start;
			flex-direction: column;
			gap: 5px;
		}

		.answer {
			padding-right: 30px;
		}

		.contact-card {
			align-items: flex-start;
			flex-wrap: wrap;
		}

		.contact-card div:nth-child(2) {
			min-width: calc(100% - 52px);
		}

		.contact-card a {
			margin-left: 50px;
		}
	}
</style>