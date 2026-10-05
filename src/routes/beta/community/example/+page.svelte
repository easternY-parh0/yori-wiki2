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

    <!-- Notice/FAQ 특유의 상단 두꺼운 선 기반 게시글 구조 -->
    <article class="post">
        <header class="post-header">
            <div class="post-title-row">
                <span class="category-tag">요리 이야기</span>
                <h1>집에서 요리할 때 알게 된 작은 팁들을 공유해봅니다</h1>
            </div>

            <div class="post-meta">
                <div class="meta-left">
                    <span class="author">맛있는하루</span>
                    <span class="divider"></span>
                    <span class="date">2026.08.27</span>
                    <span class="divider"></span>
                    <span class="views">조회 128</span>
                </div>
                <div class="meta-right">
                    <button class:liked type="button" onclick={() => (liked = !liked)}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7 10v10M4 10H2v10h2M7 10l4-8c.3-.6 1-.8 1.6-.5l.2.1c.7.3 1 1.1.8 1.8L13 8h6.5c1 0 1.7.9 1.5 1.9l-1.5 8a2 2 0 0 1-2 1.6H7" />
                        </svg>
                        좋아요 {liked ? 13 : 12}
                    </button>
                    <button type="button" onclick={() => navigator.clipboard?.writeText(window.location.href)}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
                        </svg>
                        공유
                    </button>
                </div>
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
                        <path d="M9 18h6M10 22h4M8 14a5 5 0 1 1 8 0c-.8.8-1 1.4-1 3H9c0-1.6-.2-2.2-1-3z" />
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
    </article>

    <!-- Notice/FAQ 스타일의 댓글 섹션 -->
    <section class="comments">
        <div class="comments-heading">
            <h2>댓글 <b>{comments.length}</b></h2>
        </div>

        <form
            class="comment-form"
            onsubmit={(event) => {
                event.preventDefault();
                addComment();
            }}
        >
            <textarea
                bind:value={comment}
                placeholder="댓글을 작성해 보세요."
                maxlength="500"
                rows="3"
            ></textarea>

            <div class="comment-submit">
                <span>{comment.length} / 500</span>
                <button type="submit" disabled={!comment.trim()}>
                    등록
                </button>
            </div>
        </form>

        <div class="comment-list">
            {#each comments as item}
                <div class="comment-item">
                    <div class="comment-header">
                        <div class="comment-info">
                            <span class="author">{item.author}</span>
                            <span class="date">{item.date}</span>
                        </div>
                        <div class="comment-actions">
                            <button type="button">답글</button>
                            {#if item.author === '사용자님'}
                                <button type="button" class="delete" onclick={() => deleteComment(item.id)}>
                                    삭제
                                </button>
                            {/if}
                        </div>
                    </div>
                    <p class="comment-text">{item.content}</p>
                </div>
            {/each}
        </div>
    </section>

    <div class="back-link">
        <a href={appPath('/community')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 5-7 7 7 7" />
            </svg>
            목록으로
        </a>
    </div>
</main>

<style>
    /* 전체 레이아웃 (너비 1100px 적용) */
    .page {
        min-height: 100vh;
        padding: 48px 24px 90px;
        background: var(--background);
        color: var(--text);
    }

    .breadcrumb,
    .post,
    .comments,
    .back-link {
        width: min(1100px, 100%);
        margin-left: auto;
        margin-right: auto;
    }

    /* 빵 부스러기 (Breadcrumb) */
    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 6px;
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
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
    }

    /* Notice / FAQ 스타일 본문 (카드형 해제, 깔끔한 구분선 중심) */
    .post {
        border-top: 2px solid var(--text);
        border-bottom: 1px solid var(--border);
        background: transparent;
    }

    .post-header {
        padding: 28px 0 20px;
        border-bottom: 1px solid var(--border);
    }

    .post-title-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
    }

    .category-tag {
        font-size: 14px;
        font-weight: 700;
        color: var(--accent);
        white-space: nowrap;
    }

    .post-header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.4;
        letter-spacing: -0.02em;
    }

    .post-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--text-muted);
        font-size: 14px;
    }

    .meta-left {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .meta-left .author {
        color: var(--text);
        font-weight: 600;
    }

    .divider {
        width: 1px;
        height: 12px;
        background: var(--border);
    }

    .meta-right {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .meta-right button {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 6px 12px;
        border: 1px solid var(--border);
        border-radius: 4px;
        background: var(--surface);
        color: var(--text-muted);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .meta-right button:hover,
    .meta-right button.liked {
        border-color: var(--accent);
        color: var(--accent);
        background: var(--surface-yellow);
    }

    .meta-right button svg {
        width: 14px;
        height: 14px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
    }

    /* 게시글 본문 */
    .post-content {
        padding: 40px 0;
    }

    .image-placeholder {
        height: 380px;
        display: grid;
        place-items: center;
        margin-bottom: 32px;
        border-radius: 8px;
        background: var(--surface-subtle);
        border: 1px solid var(--border);
    }

    .image-placeholder div {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        color: var(--text-muted);
    }

    .image-placeholder svg {
        width: 40px;
        height: 40px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.5;
    }

    .image-placeholder span {
        font-size: 14px;
    }

    .post-content > p {
        margin: 0 0 24px;
        color: var(--text-subtle);
        font-size: 15px;
        line-height: 1.8;
        word-break: keep-all;
    }

    .tip-box {
        display: flex;
        gap: 16px;
        margin: 32px 0;
        padding: 20px;
        border: 1px solid var(--border);
        border-left: 4px solid var(--primary);
        background: var(--surface-subtle);
        border-radius: 0 6px 6px 0;
    }

    .tip-icon {
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        flex-shrink: 0;
        border-radius: 6px;
        background: var(--primary);
        color: #0f172a;
    }

    .tip-icon svg {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
    }

    .tip-box strong {
        display: block;
        margin-bottom: 4px;
        font-size: 14px;
    }

    .tip-box p {
        margin: 0;
        color: var(--text-subtle);
        font-size: 14px;
        line-height: 1.6;
    }

    /* Notice/FAQ 스타일 댓글 목록 */
    .comments {
        margin-top: 48px;
    }

    .comments-heading {
        padding-bottom: 12px;
        border-bottom: 2px solid var(--text);
    }

    .comments-heading h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
    }

    .comments-heading h2 b {
        color: var(--accent);
    }

    .comment-form {
        margin: 24px 0 32px;
        border: 1px solid var(--border);
        border-radius: 6px;
        background: var(--surface);
    }

    .comment-form textarea {
        width: 100%;
        display: block;
        padding: 14px 16px;
        border: 0;
        outline: 0;
        resize: vertical;
        background: transparent;
        color: var(--text);
        font: inherit;
        font-size: 14px;
        line-height: 1.6;
        box-sizing: border-box;
    }

    .comment-submit {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
        padding: 8px 14px;
        border-top: 1px solid var(--border);
        background: var(--surface-subtle);
    }

    .comment-submit span {
        margin-right: auto;
        color: var(--text-muted);
        font-size: 13px;
    }

    .comment-submit button {
        padding: 6px 16px;
        border: 0;
        border-radius: 4px;
        background: var(--primary);
        color: #0f172a;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
    }

    .comment-submit button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .comment-list {
        border-top: 1px solid var(--border);
    }

    .comment-item {
        padding: 20px 0;
        border-bottom: 1px solid var(--border);
    }

    .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

    .comment-info {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .comment-info .author {
        font-size: 14px;
        font-weight: 600;
        color: var(--text);
    }

    .comment-info .date {
        font-size: 13px;
        color: var(--text-muted);
    }

    .comment-actions button {
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--text-muted);
        font-size: 13px;
        cursor: pointer;
        margin-left: 10px;
    }

    .comment-actions button:hover {
        color: var(--text);
    }

    .comment-actions button.delete:hover {
        color: #ef4444;
    }

    .comment-text {
        margin: 0;
        color: var(--text-subtle);
        font-size: 14px;
        line-height: 1.6;
        word-break: keep-all;
    }

    /* 하단 목록으로 */
    .back-link {
        margin-top: 28px;
    }

    .back-link a {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--text-muted);
        font-size: 14px;
    }

    .back-link a:hover {
        color: var(--text);
    }

    .back-link svg {
        width: 14px;
        height: 14px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
    }

    /* 모바일 반응형 */
    @media (max-width: 768px) {
        .page {
            padding: 24px 16px 60px;
        }

        .post-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
        }

        .post-header h1 {
            font-size: 20px;
        }

        .post-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            margin-top: 12px;
        }

        .image-placeholder {
            height: 220px;
        }
    }
</style>