<script lang="ts">
	type Category = '요리 이야기' | '레시피 질문' | '요리 팁' | '자유 이야기';

	const categories: Category[] = ['요리 이야기', '레시피 질문', '요리 팁', '자유 이야기'];

	let category = $state<Category>('요리 이야기');
	let title = $state('');
	let content = $state('');
	let preview = $state(false);
	let saved = $state(false);
	let notice = $state('');

	const sampleMarkdown = `# 오늘 처음 만들어본 파스타

오늘 저녁에는 **토마토 파스타**를 만들어봤습니다.

생각보다 간단했는데 몇 가지 팁을 정리해보면:

- 면은 조금 덜 익혀주세요.
- 소스는 충분히 졸여주세요.
- 마지막에 올리브오일을 조금 넣어주세요.

> 다음에는 다른 소스로도 만들어볼 예정입니다.

사진도 같이 올려봅니다.`;

	function escapeHtml(value: string) {
		return value
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#039;');
	}

	function renderMarkdown(value: string) {
		if (!value.trim()) {
			return '<p class="empty-preview">작성한 내용이 여기에 표시됩니다.</p>';
		}

		let html = escapeHtml(value);

		html = html.replace(/^###### (.*)$/gm, '<h6>$1</h6>');
		html = html.replace(/^##### (.*)$/gm, '<h5>$1</h5>');
		html = html.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
		html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
		html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
		html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>');

		html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');

		html = html.replace(/^\- (.*)$/gm, '<li>$1</li>');
		html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

		html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
		html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
		html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

		html = html.replace(/\n{2,}/g, '</p><p>');
		html = html.replace(/\n/g, '<br>');

		return `<p>${html}</p>`;
	}

	function insertMarkdown(text: string) {
		content += text;
	}

	function saveDraft() {
		saved = true;
		notice = '임시저장되었습니다.';

		setTimeout(() => {
			saved = false;
			notice = '';
		}, 2000);
	}

	function submitPost() {
		if (!title.trim()) {
			notice = '제목을 입력해주세요.';
			return;
		}

		if (!content.trim()) {
			notice = '내용을 입력해주세요.';
			return;
		}

		notice = '게시글 등록 기능은 현재 준비 중입니다.';
	}
</script>

<svelte:head>
	<title>글쓰기 | 요리위키</title>
</svelte:head>

<main class="page">
	<div class="board">
		<div class="board-top">
			<div class="board-title">
				<a href="/community">요리위키 커뮤니티</a>
				<span>›</span>
				<strong>글쓰기</strong>
			</div>

			<a href="/community" class="back-link">목록으로</a>
		</div>

		<div class="write-wrap">
			<div class="category-tabs">
				{#each categories as item}
					<button
						type="button"
						class:active={category === item}
						onclick={() => (category = item)}
					>
						{item}
					</button>
				{/each}
			</div>

			<form
				onsubmit={(event) => {
					event.preventDefault();
					submitPost();
				}}
			>
				<div class="title-row">
					<select bind:value={category} aria-label="게시판 선택">
						{#each categories as item}
							<option value={item}>{item}</option>
						{/each}
					</select>

					<input
						type="text"
						bind:value={title}
						maxlength="100"
						placeholder="제목을 입력하세요"
					/>
				</div>

				<div class="editor-actions">
					<div class="format-buttons">
						<button type="button" onclick={() => insertMarkdown('**굵은 글씨**')}>
							<strong>B</strong>
						</button>

						<button type="button" onclick={() => insertMarkdown('*기울임*')}>
							<em>I</em>
						</button>

						<button type="button" onclick={() => insertMarkdown('# 제목\n')}>
							H
						</button>

						<button type="button" onclick={() => insertMarkdown('- 목록 항목\n')}>
							≡
						</button>

						<button type="button" onclick={() => insertMarkdown('> 인용문\n')}>
							"
						</button>

						<button type="button" onclick={() => insertMarkdown('`코드`')}>
							&lt;/&gt;
						</button>
					</div>

					<div class="editor-mode">
						<button
							type="button"
							class:active={preview === false}
							onclick={() => (preview = false)}
						>
							작성
						</button>

						<button
							type="button"
							class:active={preview === true}
							onclick={() => (preview = true)}
						>
							미리보기
						</button>
					</div>
				</div>

				<div class="editor">
					{#if preview}
						<div class="preview markdown">
							{@html renderMarkdown(content)}
						</div>
					{:else}
						<textarea
							bind:value={content}
							maxlength="10000"
							placeholder={`마크다운을 사용하여 내용을 작성할 수 있습니다.

# 제목
## 소제목

**굵은 글씨**, *기울임*, \`코드\`

- 목록
- 목록

> 인용문`}
							spellcheck="false"
						></textarea>
					{/if}
				</div>

				<div class="editor-bottom">
					<div class="markdown-help">
						<span>Markdown</span>
						<button type="button" onclick={() => (preview = !preview)}>
							{preview ? '작성 화면' : '문법 미리보기'}
						</button>
					</div>

					<span class="count">{content.length.toLocaleString()}/10,000</span>
				</div>

				<div class="attachment">
					<div class="attachment-head">
						<strong>첨부</strong>
						<span>이미지 플레이스홀더</span>
					</div>

					<button type="button" class="upload">
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<rect x="3" y="4" width="18" height="16" rx="2" />
							<circle cx="8.5" cy="9" r="1.5" />
							<path d="m3 17 5-5 4 4 3-3 6 6" />
						</svg>
						이미지 첨부
					</button>
				</div>

				<div class="notice">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<circle cx="12" cy="12" r="9" />
						<path d="M12 10v6M12 7h.01" />
					</svg>

					<span>
						타인을 비방하거나 개인정보를 포함한 게시글은 삭제될 수 있습니다.
					</span>
				</div>

				{#if notice}
					<div class="form-notice">{notice}</div>
				{/if}

				<div class="form-bottom">
					<a href="/community" class="cancel">취소</a>

					<div class="right">
						<button type="button" class="draft" onclick={saveDraft}>
							{saved ? '저장됨' : '임시저장'}
						</button>

						<button type="submit" class="submit">
							등록
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</main>

<style>
	.page {
		min-height: 100vh;
		padding: 42px 20px 90px;
		background: var(--background);
		color: var(--text);
	}

	.board {
		width: min(100%, 1080px);
		margin: 0 auto;
		border: 1px solid var(--border);
		background: var(--surface);
	}

	.board-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 58px;
		padding: 0 18px;
		border-bottom: 1px solid var(--border);
		background: var(--surface-subtle);
	}

	.board-title {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 14px;
	}

	.board-title a {
		color: var(--accent);
		font-weight: 800;
	}

	.board-title span {
		color: var(--text-muted);
	}

	.board-title strong {
		font-weight: 650;
	}

	.back-link {
		color: var(--text-muted);
		font-size: 12px;
	}

	.back-link:hover {
		color: var(--accent);
	}

	.write-wrap {
		padding: 0 22px 25px;
	}

	.category-tabs {
		display: flex;
		align-items: center;
		gap: 0;
		margin: 0 -22px;
		padding: 0 22px;
		border-bottom: 1px solid var(--border);
		overflow-x: auto;
	}

	.category-tabs button {
		height: 43px;
		padding: 0 15px;
		border: 0;
		border-bottom: 2px solid transparent;
		background: transparent;
		color: var(--text-muted);
		font-size: 13px;
		white-space: nowrap;
		cursor: pointer;
	}

	.category-tabs button:hover {
		color: var(--text);
	}

	.category-tabs button.active {
		border-bottom-color: var(--primary);
		color: var(--text);
		font-weight: 750;
	}

	form {
		padding-top: 22px;
	}

	.title-row {
		display: grid;
		grid-template-columns: 145px 1fr;
		gap: 8px;
	}

	.title-row select,
	.title-row input {
		height: 44px;
		border: 1px solid var(--border);
		outline: 0;
		background: var(--surface);
		color: var(--text);
		font: inherit;
		font-size: 14px;
		box-sizing: border-box;
	}

	.title-row select {
		padding: 0 10px;
		border-radius: 4px;
		cursor: pointer;
	}

	.title-row input {
		width: 100%;
		padding: 0 13px;
		border-radius: 4px;
	}

	.title-row select:focus,
	.title-row input:focus {
		border-color: var(--primary);
	}

	.title-row input::placeholder {
		color: var(--text-muted);
	}

	.editor-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 43px;
		margin-top: 9px;
		padding: 0 7px;
		border: 1px solid var(--border);
		border-bottom: 0;
		background: var(--surface-subtle);
		box-sizing: border-box;
	}

	.format-buttons {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.format-buttons button {
		width: 31px;
		height: 29px;
		display: grid;
		place-items: center;
		border: 0;
		border-radius: 3px;
		background: transparent;
		color: var(--text-subtle);
		font-size: 13px;
		cursor: pointer;
	}

	.format-buttons button:hover {
		background: var(--surface);
		color: var(--text);
	}

	.editor-mode {
		display: flex;
		gap: 2px;
	}

	.editor-mode button {
		height: 29px;
		padding: 0 10px;
		border: 0;
		border-radius: 3px;
		background: transparent;
		color: var(--text-muted);
		font-size: 11px;
		cursor: pointer;
	}

	.editor-mode button.active {
		background: var(--surface);
		color: var(--text);
		font-weight: 700;
	}

	.editor {
		min-height: 450px;
		border: 1px solid var(--border);
		background: var(--surface);
	}

	.editor textarea {
		width: 100%;
		min-height: 450px;
		display: block;
		padding: 19px;
		border: 0;
		outline: 0;
		resize: vertical;
		background: transparent;
		color: var(--text);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 14px;
		line-height: 1.85;
		box-sizing: border-box;
	}

	.editor textarea::placeholder {
		color: var(--text-muted);
	}

	.preview {
		min-height: 450px;
		padding: 24px;
		box-sizing: border-box;
	}

	.markdown {
		font-size: 15px;
		line-height: 1.85;
		word-break: keep-all;
		overflow-wrap: anywhere;
	}

	.markdown :global(h1) {
		margin: 0 0 22px;
		padding-bottom: 11px;
		border-bottom: 1px solid var(--border);
		font-size: 26px;
		line-height: 1.4;
	}

	.markdown :global(h2) {
		margin: 26px 0 13px;
		font-size: 21px;
	}

	.markdown :global(h3) {
		margin: 22px 0 11px;
		font-size: 18px;
	}

	.markdown :global(h4),
	.markdown :global(h5),
	.markdown :global(h6) {
		margin: 18px 0 9px;
		font-size: 16px;
	}

	.markdown :global(p) {
		margin: 0 0 15px;
		color: var(--text-subtle);
	}

	.markdown :global(ul) {
		margin: 10px 0 18px;
		padding-left: 25px;
	}

	.markdown :global(li) {
		margin: 3px 0;
	}

	.markdown :global(blockquote) {
		margin: 17px 0;
		padding: 9px 15px;
		border-left: 3px solid var(--primary);
		background: var(--surface-subtle);
		color: var(--text-muted);
	}

	.markdown :global(code) {
		padding: 2px 5px;
		border-radius: 3px;
		background: var(--surface-subtle);
		color: var(--accent);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 13px;
	}

	.markdown :global(a) {
		color: var(--accent);
		text-decoration: underline;
	}

	.empty-preview {
		color: var(--text-muted);
	}

	.editor-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 35px;
		padding: 0 9px;
		border: 1px solid var(--border);
		border-top: 0;
		background: var(--surface-subtle);
	}

	.markdown-help {
		display: flex;
		align-items: center;
		gap: 9px;
	}

	.markdown-help > span {
		color: var(--accent);
		font-family: ui-monospace, monospace;
		font-size: 10px;
		font-weight: 700;
	}

	.markdown-help button {
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--text-muted);
		font-size: 10px;
		cursor: pointer;
	}

	.markdown-help button:hover {
		color: var(--text);
	}

	.count {
		color: var(--text-muted);
		font-size: 10px;
	}

	.attachment {
		margin-top: 18px;
		padding: 14px;
		border: 1px solid var(--border);
		border-radius: 4px;
	}

	.attachment-head {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 11px;
	}

	.attachment-head strong {
		font-size: 12px;
	}

	.attachment-head span {
		color: var(--text-muted);
		font-size: 10px;
	}

	.upload {
		width: 105px;
		height: 76px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 5px;
		border: 1px dashed var(--border);
		border-radius: 4px;
		background: var(--surface-subtle);
		color: var(--text-muted);
		font-size: 11px;
		cursor: pointer;
	}

	.upload:hover {
		border-color: var(--primary);
		color: var(--accent);
	}

	.upload svg {
		width: 20px;
		height: 20px;
	}

	.notice {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-top: 14px;
		color: var(--text-muted);
		font-size: 11px;
	}

	.notice svg {
		width: 15px;
		height: 15px;
		flex-shrink: 0;
	}

	.form-notice {
		margin-top: 14px;
		padding: 10px 12px;
		border: 1px solid var(--primary);
		border-radius: 4px;
		background: var(--surface-yellow);
		color: var(--text);
		font-size: 12px;
	}

	.form-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 22px;
		padding-top: 16px;
		border-top: 1px solid var(--border);
	}

	.right {
		display: flex;
		gap: 6px;
	}

	.cancel,
	.draft,
	.submit {
		height: 37px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0 15px;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 650;
		cursor: pointer;
		box-sizing: border-box;
	}

	.cancel,
	.draft {
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-subtle);
	}

	.cancel:hover,
	.draft:hover {
		background: var(--surface-subtle);
	}

	.submit {
		min-width: 64px;
		border: 1px solid var(--primary);
		background: var(--primary);
		color: #0f172a;
	}

	.submit:hover {
		filter: brightness(.96);
	}

	@media (max-width: 700px) {
		.page {
			padding: 20px 10px 60px;
		}

		.write-wrap {
			padding-left: 13px;
			padding-right: 13px;
		}

		.category-tabs {
			margin-left: -13px;
			margin-right: -13px;
			padding-left: 13px;
			padding-right: 13px;
		}

		.title-row {
			grid-template-columns: 105px 1fr;
		}

		.editor {
			min-height: 400px;
		}

		.editor textarea,
		.preview {
			min-height: 400px;
		}
	}

	@media (max-width: 500px) {
		.board-top {
			min-height: 50px;
			padding: 0 12px;
		}

		.board-title {
			font-size: 12px;
		}

		.back-link {
			font-size: 11px;
		}

		.write-wrap {
			padding-left: 10px;
			padding-right: 10px;
		}

		.category-tabs {
			margin-left: -10px;
			margin-right: -10px;
			padding-left: 10px;
			padding-right: 10px;
		}

		.category-tabs button {
			height: 40px;
			padding: 0 10px;
			font-size: 11px;
		}

		form {
			padding-top: 15px;
		}

		.title-row {
			grid-template-columns: 1fr;
			gap: 6px;
		}

		.title-row select {
			height: 39px;
		}

		.title-row input {
			height: 42px;
		}

		.editor-actions {
			margin-top: 7px;
		}

		.editor {
			min-height: 360px;
		}

		.editor textarea,
		.preview {
			min-height: 360px;
		}

		.editor textarea {
			padding: 15px;
			font-size: 13px;
		}

		.preview {
			padding: 17px;
		}

		.markdown {
			font-size: 14px;
		}

		.markdown :global(h1) {
			font-size: 22px;
		}

		.markdown :global(h2) {
			font-size: 19px;
		}

		.form-bottom {
			align-items: stretch;
			flex-direction: column-reverse;
			gap: 7px;
		}

		.right {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		.cancel,
		.draft,
		.submit {
			width: 100%;
		}
	}
</style>