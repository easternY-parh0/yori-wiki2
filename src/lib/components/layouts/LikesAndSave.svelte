<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { invalidateAll } from '$app/navigation';
  import { api, type Food } from '$lib/api';

  let { food }: { food: Food } = $props();

  let saved = $state(false);
  let liked = $state(false);
  let busy = $state(false);
  let error = $state('');

  onMount(() => {
    void (async () => {
      try {
        if (page.data.user) {
          const [likeRes, saveRes] = await Promise.all([
            api<{ liked: boolean }>(`/food/like?id=${food.id}`),
            api<{ saved: boolean }>(`/food/save?id=${food.id}`)
          ]);
          liked = likeRes.liked;
          saved = saveRes.saved;
        }
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

  async function like() {
    await act(async () => {
      const result = await api<{ liked: boolean }>(`/food/like?id=${food.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ liked: !liked })
      });
      liked = result.liked;
      await invalidateAll();
    });
  }

  async function save() {
    await act(async () => {
      const result = await api<{ saved: boolean }>(`/food/save?id=${food.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ saved: !saved })
      });
      saved = result.saved;
    });
  }
</script>

<div class="recipe-social-actions">
  <!-- 좋아요 버튼 -->
  <button
    type="button"
    class="action-btn"
    class:active={liked}
    disabled={busy || !page.data.user}
    aria-pressed={liked}
    onclick={like}
  >
    <svg viewBox="0 0 24 24" class="icon">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      />
    </svg>
    <span>{liked ? '좋아요 취소' : '좋아요'}</span>
    <strong class="count">{food.likes ?? 0}</strong>
  </button>

  <!-- 저장 버튼 -->
  <button
    type="button"
    class="action-btn"
    class:active={saved}
    disabled={busy || !page.data.user}
    aria-pressed={saved}
    onclick={save}
  >
    <svg viewBox="0 0 24 24" class="icon">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
    <span>{saved ? '저장됨' : '레시피 저장'}</span>
  </button>

  {#if error}
    <p class="error-msg" role="alert">{error}</p>
  {/if}
</div>

<style>
  .recipe-social-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500; /* 600/700에서 본문과 어울리는 500으로 조정 */
    font-family: inherit;
    cursor: pointer;
    
    /* 다크모드 대응: 하드코딩 제거 후 CSS 변수 사용 */
    background: var(--surface);
    color: var(--text-subtle, var(--text));
    border: 1px solid var(--border);
    transition: all 0.15s ease;
    user-select: none;
  }

  .action-btn:hover:not(:disabled) {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--surface-subtle, var(--surface));
  }

  .action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* SVG 아이콘 */
  .icon {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: fill 0.15s ease, stroke 0.15s ease;
  }

  /* 활성화 상태 (좋아요/저장 눌렀을 때) */
  .action-btn.active {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--surface-green, var(--surface-subtle, var(--surface)));
    font-weight: 600;
  }

  .action-btn.active .icon {
    fill: var(--accent);
    stroke: var(--accent);
  }

  .count {
    font-weight: 600;
    margin-left: 1px;
    color: var(--text);
  }

  .action-btn.active .count {
    color: var(--accent);
  }

  .error-msg {
    width: 100%;
    margin: 4px 0 0;
    color: var(--accent-red, #ef4444);
    font-size: 13px;
  }
</style>