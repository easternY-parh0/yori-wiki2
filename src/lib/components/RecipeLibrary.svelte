<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { api, type FoodSummary } from '$lib/api';
  import { appPath } from '$lib/app-path';
  import RecipeCard from '$lib/components/layouts/RecipeCard.svelte';

  type Item = FoodSummary & { 
    liked: boolean; 
    saved: boolean;
    category?: string;
    description?: string;
  };

  let kind = $state<'recipes' | 'likes' | 'saved'>('recipes');
  let recipes = $state<Item[]>([]);
  let total = $state(0);
  let offset = $state(0);
  let busy = $state(false);
  let error = $state('');

  async function load(next = 0) {
    busy = true;
    error = '';
    try {
      const result = await api<{ recipes: Item[]; total: number }>(`/auth/${kind}?limit=20&offset=${next}`);
      recipes = result.recipes;
      total = result.total;
      offset = next;
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }

  async function select(next: typeof kind) {
    kind = next;
    await load();
  }

  async function remove(item: Item) {
    busy = true;
    error = '';
    try {
      await api(`/food/${kind === 'likes' ? 'like' : 'save'}?id=${item.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(kind === 'likes' ? { liked: false } : { saved: false })
      });
      await load(Math.max(0, recipes.length === 1 ? offset - 20 : offset));
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }

  function getImageUrl(url?: string) {
    if (!url) return undefined;
    return url.startsWith('/api/') ? appPath(url) : url;
  }

  onMount(() => {
    if (page.data.user) void load();
  });
</script>

<section class="library">
  <div class="header-area">
    <h2>나의 레시피 보관함</h2>
    {#if page.data.user}
      <span class="total-count">총 {total}개 {busy ? '· 불러오는 중…' : ''}</span>
    {/if}
  </div>

  {#if page.data.user}
    <!-- 첨부 파일의 .tab-navigation 디자인 반영 -->
    <div class="tab-navigation" role="tablist" aria-label="레시피 보관함 분류">
      <button 
        type="button"
        disabled={busy} 
        class:active={kind === 'recipes'} 
        onclick={() => select('recipes')}
      >
        등록한 레시피
      </button>
      <button 
        type="button"
        disabled={busy} 
        class:active={kind === 'likes'} 
        onclick={() => select('likes')}
      >
        좋아요한 레시피
      </button>
      <button 
        type="button"
        disabled={busy} 
        class:active={kind === 'saved'} 
        onclick={() => select('saved')}
      >
        저장한 레시피
      </button>
    </div>

    <!-- 레시피 카드 그리드 영역 -->
    <div class="tab-content">
      {#if recipes.length > 0}
        <div class="recipe-grid">
          {#each recipes as item (item.id)}
            <div class="card-wrapper">
              <RecipeCard 
                id={item.id}
                title={item.name}
                description={item.description}
                image={getImageUrl(item.image_url ?? undefined)}
                category={item.category}
                cookingTime={item.estimated_time}
                views={item.likes ?? 0}
                href={appPath(`/recipes/${item.id}`)}
              />
              
              {#if kind !== 'recipes'}
                <button class="remove-btn" disabled={busy} onclick={() => remove(item)}>
                  {kind === 'likes' ? '좋아요 취소' : '저장 취소'}
                </button>
              {/if}
            </div>
          {/each}
        </div>
      {:else if !busy}
        <div class="empty-state">
          <p>아직 등록되거나 저장된 레시피가 없습니다.</p>
        </div>
      {/if}
    </div>

    <!-- 페이지네이션 컨트롤 -->
    <div class="pagination">
      <button class="page-btn" disabled={busy || offset === 0} onclick={() => load(offset - 20)}>이전</button>
      <span class="page-info">{Math.floor(offset / 20) + 1} 페이지</span>
      <button class="page-btn" disabled={busy || offset + 20 >= total} onclick={() => load(offset + 20)}>다음</button>
    </div>
  {:else}
    <div class="login-notice">
      <p><a href={appPath('/login')}>로그인</a>하면 등록·좋아요·저장한 레시피를 볼 수 있습니다.</p>
    </div>
  {/if}

  {#if error}
    <p class="error-msg" role="alert">{error}</p>
  {/if}
</section>

<style>
  .library {
    width: min(1160px, calc(100% - 48px));
    margin: 40px auto;
  }

  .header-area {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .header-area h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 750;
    letter-spacing: -0.05em;
  }

  .total-count {
    font-size: 13px;
    color: var(--text-muted);
  }

  /* 첨부파일의 .tab-navigation 디자인 계승 */
  .tab-navigation {
    display: flex;
    gap: 8px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 24px;
    overflow-x: auto;
  }

  .tab-navigation button {
    padding: 12px 18px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    font: inherit;
    font-size: 14px;
    font-weight: 650;
    color: var(--text-muted);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .tab-navigation button.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .tab-navigation button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* 첨부파일의 .recipe-grid 및 .card-wrapper 구조 계승 */
  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .remove-btn {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface-subtle);
    color: var(--text-subtle);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .remove-btn:hover:not(:disabled) {
    background: var(--surface-yellow);
    color: var(--accent);
    border-color: var(--border-accent);
  }

  .remove-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* 비어있는 상태 및 안내 메시지 */
  .empty-state, .login-notice {
    padding: 48px 16px;
    text-align: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    color: var(--text-subtle);
    font-size: 14px;
  }

  .login-notice a {
    color: var(--accent);
    font-weight: 700;
    text-decoration: underline;
  }

  /* 페이지네이션 디자인 */
  .pagination {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .page-btn {
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--text);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .page-btn:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
  }

  .page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .page-info {
    font-size: 13px;
    color: var(--text-subtle);
    font-weight: 600;
  }

  .error-msg {
    margin-top: 16px;
    padding: 12px 16px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 8px;
    color: #ef4444;
    font-size: 13px;
  }

  /* 반응형 레이아웃 */
  @media (max-width: 900px) {
    .recipe-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .recipe-grid {
      grid-template-columns: 1fr;
    }
  }
</style>