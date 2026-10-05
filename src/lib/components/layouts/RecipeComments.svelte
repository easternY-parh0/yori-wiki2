<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { api, type Food } from '$lib/api';
  import { isAdmin } from '$lib/auth';

  let { food }: { food: Food } = $props();

  type Comment = {
    id: number;
    content: string;
    author_id: number;
    author: string;
    created_at: string;
  };

  let comments = $state<Comment[]>([]);
  let nextBefore = $state<number | null>(null);
  let busy = $state(false);
  let error = $state('');
  let content = $state('');
  let editing = $state<number | null>(null);
  let draft = $state('');

  async function load(more = false) {
    const result = await api<{ comments: Comment[]; nextBefore: number | null }>(
      `/food/comments?id=${food.id}${more && nextBefore ? `&before=${nextBefore}` : ''}`
    );
    comments = more ? [...comments, ...result.comments] : result.comments;
    nextBefore = result.nextBefore;
  }

  onMount(() => {
    void (async () => {
      try {
        await load();
      } catch (e) {
        error = (e as Error).message;
      }
    })();
  });

  async function act(action: () => Promise<void>) {
    if (busy) return;
    busy = true;
    error = '';
    try {
      await action();
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }

  async function write(e: SubmitEvent) {
    e.preventDefault();
    await act(async () => {
      await api(`/food/comments?id=${food.id}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ content })
      });
      content = '';
      await load();
    });
  }

  async function change(id: number, method: 'PUT' | 'DELETE') {
    await act(async () => {
      await api(`/food/comments?id=${food.id}&commentId=${id}`, {
        method,
        headers: { 'content-type': 'application/json' },
        ...(method === 'PUT' ? { body: JSON.stringify({ content: draft }) } : {})
      });
      editing = null;
      await load();
    });
  }
</script>

<div class="comments-container">
  <!-- 댓글 작성 폼 -->
  {#if page.data.user}
    <form class="comment-form" onsubmit={write}>
      <textarea
        bind:value={content}
        placeholder="레시피에 대한 의견을 남겨주세요."
        required
        maxlength="2000"
        rows="3"
      ></textarea>
      <div class="form-footer">
        <button type="submit" class="submit-btn" disabled={busy || !content.trim()}>
          등록
        </button>
      </div>
    </form>
  {:else}
    <div class="login-notice">
      <span>로그인 후 댓글을 작성할 수 있습니다.</span>
      <a href="/login">로그인</a>
    </div>
  {/if}

  <!-- 댓글 목록 -->
  <div class="comment-list">
    {#each comments as comment (comment.id)}
      <article class="comment-item">
        <div class="comment-header">
          <div class="meta">
            <strong class="author">{comment.author}</strong>
            <span class="date">{comment.created_at}</span>
          </div>

          {#if page.data.user && (comment.author_id === page.data.user.id || isAdmin(page.data.user))}
            <div class="actions">
              {#if editing !== comment.id}
                <button
                  type="button"
                  class="text-btn"
                  disabled={busy}
                  onclick={() => {
                    editing = comment.id;
                    draft = comment.content;
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  class="text-btn delete"
                  disabled={busy}
                  onclick={() => change(comment.id, 'DELETE')}
                >
                  삭제
                </button>
              {/if}
            </div>
          {/if}
        </div>

        {#if editing === comment.id}
          <div class="edit-box">
            <textarea bind:value={draft} maxlength="2000" rows="3"></textarea>
            <div class="edit-actions">
              <button
                type="button"
                class="sub-btn"
                onclick={() => (editing = null)}
              >
                취소
              </button>
              <button
                type="button"
                class="submit-btn"
                disabled={busy || !draft.trim()}
                onclick={() => change(comment.id, 'PUT')}
              >
                저장
              </button>
            </div>
          </div>
        {:else}
          <p class="content">{comment.content}</p>
        {/if}
      </article>
    {:else}
      <p class="empty">아직 작성된 댓글이 없습니다.</p>
    {/each}
  </div>

  <!-- 댓글 더 보기 -->
  {#if nextBefore}
    <button type="button" class="more-btn" disabled={busy} onclick={() => act(() => load(true))}>
      댓글 더 보기
    </button>
  {/if}

  {#if error}
    <p class="error-msg" role="alert">{error}</p>
  {/if}
</div>

<style>
  .comments-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  /* 댓글 작성 폼 */
  .comment-form {
    padding: 14px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
  }

  .comment-form textarea,
  .edit-box textarea {
    width: 100%;
    resize: vertical;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--text);
    font-size: 14px;
    font-family: inherit;
    line-height: 1.6;
    box-sizing: border-box;
  }

  .comment-form textarea::placeholder {
    color: var(--text-muted);
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
    border-top: 1px solid var(--border);
  }

  .login-notice {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    color: var(--text-muted);
    font-size: 14px;
  }

  .login-notice a {
    color: var(--accent);
    font-weight: 600;
    text-decoration: none;
  }

  /* 댓글 목록 */
  .comment-list {
    display: flex;
    flex-direction: column;
  }

  .comment-item {
    padding: 16px 0;
    border-bottom: 1px dashed var(--border);
  }

  .comment-item:last-child {
    border-bottom: none;
  }

  .comment-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .author {
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
  }

  .date {
    font-size: 13px;
    color: var(--text-muted);
  }

  .content {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-subtle, var(--text));
    line-height: 1.6;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .empty {
    padding: 24px 0;
    color: var(--text-muted);
    font-size: 14px;
    text-align: center;
  }

  /* 버튼 스타일 */
  .actions {
    display: flex;
    gap: 8px;
  }

  .text-btn {
    background: transparent;
    border: 0;
    padding: 0;
    font-size: 13px;
    color: var(--text-muted);
    cursor: pointer;
  }

  .text-btn:hover {
    color: var(--text);
  }

  .text-btn.delete:hover {
    color: var(--accent-red, #ef4444);
  }

  .submit-btn {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    background: var(--primary);
    color: var(--primary-text, #0f172a);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .sub-btn {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-size: 14px;
    cursor: pointer;
  }

  .edit-box {
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
    margin-top: 8px;
  }

  .edit-actions {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    margin-top: 10px;
  }

  .more-btn {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .more-btn:hover:not(:disabled) {
    background: var(--surface-subtle, var(--surface));
  }

  .error-msg {
    margin: 4px 0 0;
    color: var(--accent-red, #ef4444);
    font-size: 13px;
  }
</style>