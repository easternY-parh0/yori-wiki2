<script lang="ts">
	import { appPath } from '$lib/app-path';
	let liked = $state(false);
	let comment = $state('');

	let comments = $state([
		{
			id: 1,
			author: '요리초보',
			date: '2026.08.26',
			content:
				'저도 비슷한 경험이 있었는데 정말 공감되네요. 다음에는 알려주신 방법으로 한번 만들어봐야겠습니다.'
		},
		{
			id: 2,
			author: '한끼뚝딱',
			date: '2026.08.25',
			content:
				'좋은 정보 감사합니다. 특히 재료 손질 부분이 도움이 많이 됐어요.'
		}
	]);

	function addComment() {
		const content = comment.trim();

		if (!content) return;

		comments = [
			...comments,
			{
				id: Date.now(),
				author: '사용자님',
				date: '방금 전',
				content
			}
		];

		comment = '';
	}

	function deleteComment(id: number) {
		comments = comments.filter((item) => item.id !== id);
	}
</script>

<svelte:head>
	<title>집에서 요리할 때 알게 된 작은 팁 | 요리위키</title>
	<meta name="description" content="요리위키 커뮤니티 게시글" />
</svelte:head>

<main class="page">
	<div class="breadcrumb">
		<a href={appPath('/community')}>커뮤니티</a>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="m9 5 7 7-7 7" />
		</svg>
		<span>게시글</span>
	</div>

	<article class="post">
		<header class="post-header">
			<div class="post-meta">
				<span class="category">요리 이야기</span>
				<span>2026.08.27</span>
			</div>

			<h1>집에서 요리할 때 알게 된 작은 팁들을 공유해봅니다</h1>

			<div class="author-row">
				<div class="author-avatar">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<circle cx="12" cy="8" r="3" />
						<path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
					</svg>
				</div>

				<div class="author-info">
					<strong>맛있는하루</strong>
					<span>조회 128 · 댓글 7</span>
				</div>

				<button class="more-button" type="button" aria-label="게시글 메뉴">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<circle cx="5" cy="12" r="1.5" />
						<circle cx="12" cy="12" r="1.5" />
						<circle cx="19" cy="12" r="1.5" />
					</svg>
				</button>
			</div>
		</header>

		<div class="post-content">
			<div class="image-placeholder">
				<div>
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<rect x="3" y="4" width="18" height="16" rx="2" />
						<circle cx="8.5" cy="9" r="1.5" />
						<path d="m3 17 5-5 4 4 3-3 6 6" />
					</svg>
					<span>게시글 이미지 플레이스홀더</span>
				</div>
			</div>

			<p>
				요리를 자주 하다 보니 처음에는 별것 아니라고 생각했던 작은 습관들이 의외로
				요리 결과에 꽤 큰 차이를 만들어준다는 걸 알게 되었습니다.
			</p>

			<p>
				특히 재료를 미리 꺼내서 손질해두는 것만으로도 조리 과정이 훨씬 편해지고,
				불을 올린 뒤에는 재료를 찾느라 정신없이 움직이는 일이 줄어들어서 좋았습니다.
			</p>

			<div class="tip-box">
				<div class="tip-icon">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M9 18h6M10 22h4M8 14a5 5 0 1 1 8 0c-.8.8-1 1.4-1 3H9c0-1.6-.2-2.2-1-3z"
						/>
					</svg>
				</div>

				<div>
					<strong>오늘의 작은 팁</strong>
					<p>
						요리를 시작하기 전에 필요한 재료와 도구를 한 번에 준비해두면 조리 과정이 훨씬
						편해집니다.
					</p>
				</div>
			</div>

			<p>
				처음부터 완벽하게 준비할 필요는 없지만 자주 사용하는 재료의 위치를 정해두고
				조리 순서를 미리 한 번 생각해두는 것만으로도 확실히 여유가 생기는 것 같습니다.
			</p>

			<p>
				요리하면서 알게 된 다른 팁이 있다면 댓글로 함께 공유해주세요. 서로 알고 있는
				방법들을 모아두면 처음 요리를 시작하는 사람들에게도 꽤 도움이 될 것 같네요.
			</p>
		</div>

		<footer class="post-footer">
			<div class="post-actions">
				<button class:liked type="button" onclick={() => (liked = !liked)}>
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M7 10v10M4 10H2v10h2M7 10l4-8c.3-.6 1-.8 1.6-.5l.2.1c.7.3 1 1.1.8 1.8L13 8h6.5c1 0 1.7.9 1.5 1.9l-1.5 8a2 2 0 0 1-2 1.6H7"
						/>
					</svg>
					{liked ? 13 : 12}
				</button>

				<span class="action-divider"></span>

				<button
					type="button"
					onclick={() => navigator.clipboard?.writeText(window.location.href)}
				>
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<circle cx="18" cy="5" r="3" />
						<circle cx="6" cy="12" r="3" />
						<circle cx="18" cy="19" r="3" />
						<path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
					</svg>
					공유
				</button>
			</div>
		</footer>
	</article>

	<section class="comments">
		<div class="comments-heading">
			<span>COMMUNITY</span>
			<h2>댓글 <b>{comments.length}</b></h2>
		</div>

		<form
			class="comment-form"
			onsubmit={(event) => {
				event.preventDefault();
				addComment();
			}}
		>
			<div class="comment-avatar">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="12" cy="8" r="3" />
					<path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
				</svg>
			</div>

			<div class="comment-input">
				<textarea
					bind:value={comment}
					placeholder="댓글을 남겨보세요."
					maxlength="500"
					rows="4"
				></textarea>

				<div class="comment-submit">
					<span>{comment.length}/500</span>
					<button type="submit" disabled={!comment.trim()}>
						댓글 등록
					</button>
				</div>
			</div>
		</form>

		<div class="comment-list">
			{#each comments as item}
				<article class="comment">
					<div class="comment-avatar">
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<circle cx="12" cy="8" r="3" />
							<path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
						</svg>
					</div>

					<div class="comment-body">
						<div class="comment-meta">
							<strong>{item.author}</strong>
							<span>{item.date}</span>
						</div>

						<p>{item.content}</p>

						<div class="comment-tools">
							<button type="button">답글</button>

							{#if item.author === '사용자님'}
								<button type="button" onclick={() => deleteComment(item.id)}>
									삭제
								</button>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<div class="back-link">
		<a href={appPath('/community')}>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path d="m15 5-7 7 7 7" />
			</svg>
			커뮤니티 목록으로
		</a>
	</div>
</main>

<style>
	.page {
		min-height: 100vh;
		padding: 56px 28px 100px;
		background: var(--background);
		color: var(--text);
	}

	.breadcrumb,
	.post,
	.comments,
	.back-link {
		width: min(920px, 100%);
		margin-left: auto;
		margin-right: auto;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-bottom: 24px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	.breadcrumb svg {
		width: 14px;
		height: 14px;
	}

	.post {
		border: 1px solid var(--border);
		border-radius: 16px;
		background: var(--surface);
		overflow: hidden;
	}

	.post-header {
		padding: 34px 38px 27px;
		border-bottom: 1px solid var(--border);
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.category {
		padding: 5px 9px;
		border-radius: 6px;
		background: var(--surface-green);
		color: var(--accent);
		font-weight: 750;
	}

	.post-header h1 {
		margin: 15px 0 25px;
		font-size: 30px;
		line-height: 1.45;
		letter-spacing: -.045em;
	}

	.author-row {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.author-avatar,
	.comment-avatar {
		width: 42px;
		height: 42px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 50%;
		background: var(--surface-yellow);
		color: var(--accent);
	}

	.author-avatar svg,
	.comment-avatar svg {
		width: 21px;
		height: 21px;
	}

	.author-info {
		flex: 1;
	}

	.author-info strong,
	.author-info span {
		display: block;
	}

	.author-info strong {
		margin-bottom: 4px;
		font-size: 14px;
	}

	.author-info span {
		color: var(--text-muted);
		font-size: 14px;
	}

	.more-button {
		width: 36px;
		height: 36px;
		display: grid;
		place-items: center;
		border: 0;
		border-radius: 8px;
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
	}

	.more-button:hover {
		background: var(--surface-subtle);
		color: var(--text);
	}

	.more-button svg {
		width: 19px;
		height: 19px;
	}

	.post-content {
		padding: 40px 38px;
	}

	.image-placeholder {
		height: 390px;
		display: grid;
		place-items: center;
		margin-bottom: 36px;
		border-radius: 12px;
		background: var(--surface-subtle);
	}

	.image-placeholder div {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 11px;
		color: var(--text-muted);
	}

	.image-placeholder svg {
		width: 42px;
		height: 42px;
	}

	.image-placeholder span {
		font-size: 14px;
	}

	.post-content > p {
		margin: 0 0 25px;
		color: var(--text-subtle);
		font-size: 15px;
		line-height: 2;
		word-break: keep-all;
	}

	.tip-box {
		display: flex;
		gap: 15px;
		margin: 32px 0;
		padding: 20px;
		border: 1px solid var(--primary);
		border-radius: 11px;
		background: var(--surface-yellow);
	}

	.tip-icon {
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 9px;
		background: var(--primary);
		color: #0f172a;
	}

	.tip-icon svg {
		width: 20px;
		height: 20px;
	}

	.tip-box strong {
		display: block;
		margin-bottom: 6px;
		font-size: 14px;
	}

	.tip-box p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 1.75;
	}

	.post-footer {
		padding: 18px 38px;
		border-top: 1px solid var(--border);
	}

	.post-actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.post-actions button {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 9px 11px;
		border: 0;
		border-radius: 8px;
		background: transparent;
		color: var(--text-muted);
		font-size: 14px;
		cursor: pointer;
	}

	.post-actions button:hover,
	.post-actions button.liked {
		background: var(--surface-yellow);
		color: var(--accent);
	}

	.post-actions svg {
		width: 17px;
		height: 17px;
	}

	.action-divider {
		width: 1px;
		height: 17px;
		background: var(--border);
	}

	.comments {
		margin-top: 48px;
	}

	.comments-heading {
		padding-bottom: 15px;
		border-bottom: 1px solid var(--border);
	}

	.comments-heading span {
		color: var(--accent);
		font-size: 14px;
		font-weight: 800;
		letter-spacing: .08em;
	}

	.comments-heading h2 {
		margin: 7px 0 0;
		font-size: 22px;
		letter-spacing: -.04em;
	}

	.comments-heading h2 b {
		color: var(--accent);
		font-size: 15px;
	}

	.comment-form {
		display: flex;
		gap: 13px;
		padding: 24px 0;
		border-bottom: 1px solid var(--border);
	}

	.comment-input {
		flex: 1;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--surface);
		overflow: hidden;
	}

	.comment-input:focus-within {
		border-color: var(--primary);
	}

	.comment-input textarea {
		width: 100%;
		display: block;
		padding: 13px 14px;
		border: 0;
		outline: 0;
		resize: vertical;
		background: transparent;
		color: var(--text);
		font: inherit;
		font-size: 14px;
		line-height: 1.65;
		box-sizing: border-box;
	}

	.comment-input textarea::placeholder {
		color: var(--text-muted);
	}

	.comment-submit {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 12px;
		padding: 9px 10px;
		border-top: 1px solid var(--border);
	}

	.comment-submit span {
		margin-right: auto;
		color: var(--text-muted);
		font-size: 14px;
	}

	.comment-submit button {
		padding: 9px 13px;
		border: 0;
		border-radius: 7px;
		background: var(--primary);
		color: #0f172a;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}

	.comment-submit button:disabled {
		opacity: .45;
		cursor: not-allowed;
	}

	.comment-list {
		display: flex;
		flex-direction: column;
	}

	.comment {
		display: flex;
		gap: 13px;
		padding: 25px 0;
		border-bottom: 1px solid var(--border);
	}

	.comment-body {
		flex: 1;
		min-width: 0;
	}

	.comment-meta {
		display: flex;
		align-items: center;
		gap: 9px;
		margin-bottom: 9px;
	}

	.comment-meta strong {
		font-size: 14px;
	}

	.comment-meta span {
		color: var(--text-muted);
		font-size: 14px;
	}

	.comment-body p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 1.85;
		word-break: keep-all;
	}

	.comment-tools {
		display: flex;
		gap: 11px;
		margin-top: 11px;
	}

	.comment-tools button {
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--text-muted);
		font-size: 14px;
		cursor: pointer;
	}

	.comment-tools button:hover {
		color: var(--accent);
	}

	.back-link {
		margin-top: 26px;
	}

	.back-link a {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.back-link a:hover {
		color: var(--accent);
	}

	.back-link svg {
		width: 15px;
		height: 15px;
	}

	@media (max-width: 700px) {
		.page {
			padding: 35px 18px 70px;
		}

		.post-header {
			padding: 27px 23px 22px;
		}

		.post-header h1 {
			font-size: 25px;
		}

		.post-content {
			padding: 30px 23px;
		}

		.post-footer {
			padding: 16px 23px;
		}

		.image-placeholder {
			height: 300px;
		}

		.post-content > p {
			font-size: 14px;
		}
	}

	@media (max-width: 500px) {
		.page {
			padding: 25px 14px 60px;
		}

		.breadcrumb {
			font-size: 14px;
		}

		.post {
			border-radius: 12px;
		}

		.post-header {
			padding: 23px 18px 19px;
		}

		.post-header h1 {
			margin: 13px 0 21px;
			font-size: 21px;
		}

		.post-content {
			padding: 24px 18px;
		}

		.image-placeholder {
			height: 220px;
			margin-bottom: 27px;
		}

		.image-placeholder span {
			font-size: 14px;
		}

		.post-content > p {
			font-size: 14px;
			line-height: 1.9;
		}

		.tip-box {
			padding: 16px;
		}

		.tip-box p {
			font-size: 14px;
		}

		.post-footer {
			padding: 14px 18px;
		}

		.comment-form {
			gap: 9px;
		}

		.comment-avatar {
			width: 36px;
			height: 36px;
		}

		.comment-input textarea {
			font-size: 14px;
		}
	}
</style>