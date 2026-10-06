<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { api, type FoodSummary } from "$lib/api";
  import { appPath } from "$lib/app-path";
  import RecipeCard from "$lib/components/layouts/RecipeCard.svelte";

  type Item = FoodSummary & {
    liked: boolean;
    saved: boolean;
    category?: string;
    description?: string;
  };

  type RecipeKind = "recipes" | "likes" | "saved";

  let kind = $state<RecipeKind>("recipes");

  let recipes = $state<Item[]>([]);
  let total = $state(0);
  let offset = $state(0);

  // 각 탭의 전체 개수
  let recipeCount = $state(0);
  let likeCount = $state(0);
  let savedCount = $state(0);

  let busy = $state(false);
  let error = $state("");

  async function load(next = 0) {
    busy = true;
    error = "";

    try {
      const result = await api<{ recipes: Item[]; total: number }>(
        `/auth/${kind}?limit=20&offset=${next}`,
      );

      recipes = result.recipes;
      total = result.total;
      offset = next;

      // 현재 탭의 전체 개수도 업데이트
      if (kind === "recipes") {
        recipeCount = result.total;
      } else if (kind === "likes") {
        likeCount = result.total;
      } else if (kind === "saved") {
        savedCount = result.total;
      }
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }

  /**
   * 탭 숫자를 모두 가져온다.
   * 현재 탭만 가져오는 load()와 별개로 세 탭의 total을 확보한다.
   */
  async function loadCounts() {
    try {
      const [recipesResult, likesResult, savedResult] = await Promise.all([
        api<{ recipes: Item[]; total: number }>(
          "/auth/recipes?limit=1&offset=0",
        ),
        api<{ recipes: Item[]; total: number }>("/auth/likes?limit=1&offset=0"),
        api<{ recipes: Item[]; total: number }>("/auth/saved?limit=1&offset=0"),
      ]);

      recipeCount = recipesResult.total;
      likeCount = likesResult.total;
      savedCount = savedResult.total;
    } catch (e) {
      // 목록 자체의 로딩은 정상적으로 진행될 수 있으므로
      // count 요청 실패는 별도로 표시하지 않는다.
      console.error("레시피 탭 개수 조회 실패:", e);
    }
  }

  async function select(next: RecipeKind) {
    kind = next;
    await load();
  }

  async function remove(item: Item) {
    busy = true;
    error = "";

    try {
      await api(`/food/${kind === "likes" ? "like" : "save"}?id=${item.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(
          kind === "likes" ? { liked: false } : { saved: false },
        ),
      });

      // 현재 페이지의 목록 다시 로드
      await load(Math.max(0, recipes.length === 1 ? offset - 20 : offset));

      // 탭 숫자도 갱신
      await loadCounts();
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }

  function getImageUrl(url?: string) {
    if (!url) return undefined;

    return url.startsWith("/api/") ? appPath(url) : url;
  }

  onMount(() => {
    if (page.data.user) {
      void load();
      void loadCounts();
    }
  });
</script>

<section class="content-section" aria-labelledby="recipe-library-title">
  <div class="section-title">
    <h2 id="recipe-library-title">나의 레시피 보관함</h2>
    {#if page.data.user}
      <span class="library-status">
        총 {total}개{busy ? " · 불러오는 중…" : ""}
      </span>
    {/if}
  </div>

  {#if page.data.user}
    <div class="tab-navigation" role="tablist" aria-label="레시피 보관함 분류">
      <button
        type="button"
        role="tab"
        aria-selected={kind === "recipes"}
        disabled={busy}
        class:active={kind === "recipes"}
        onclick={() => select("recipes")}
      >
        등록한 레시피
        <span>{recipeCount}</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={kind === "likes"}
        disabled={busy}
        class:active={kind === "likes"}
        onclick={() => select("likes")}
      >
        좋아요한 레시피
        <span>{likeCount}</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={kind === "saved"}
        disabled={busy}
        class:active={kind === "saved"}
        onclick={() => select("saved")}
      >
        저장한 레시피
        <span>{savedCount}</span>
      </button>
    </div>

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

              {#if kind !== "recipes"}
                <button
                  type="button"
                  class="remove-btn"
                  disabled={busy}
                  onclick={() => remove(item)}
                >
                  {kind === "likes" ? "좋아요 취소" : "저장 취소"}
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

    <div class="pagination" aria-label="레시피 페이지 이동">
      <button
        type="button"
        class="page-btn"
        disabled={busy || offset === 0}
        onclick={() => load(offset - 20)}
      >
        이전
      </button>
      <span class="page-info">{Math.floor(offset / 20) + 1} 페이지</span>
      <button
        type="button"
        class="page-btn"
        disabled={busy || offset + 20 >= total}
        onclick={() => load(offset + 20)}
      >
        다음
      </button>
    </div>
  {:else}
    <div class="login-notice">
      <p>
        <a href={appPath("/login")}>로그인</a>하면 등록·좋아요·저장한 레시피를
        볼 수 있습니다.
      </p>
    </div>
  {/if}

  {#if error}
    <p class="error-msg" role="alert">{error}</p>
  {/if}
</section>

<style>
  .content-section {
    width: min(1160px, calc(100% - 48px));
    margin: 52px auto 0;
  }

  .section-title {
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .section-title h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 750;
    letter-spacing: -0.05em;
  }

  .library-status {
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 600;
  }

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
    font-size: 13px;
    font-weight: 650;
    color: var(--text-muted);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .tab-navigation button span {
    margin-left: 4px;
    font-size: 11px;
    color: var(--text-muted);
  }

  .tab-navigation button.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .tab-navigation button.active span {
    color: var(--accent);
  }

  .tab-navigation button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab-content {
    min-height: 40px;
  }

  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }

  .remove-btn {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface-subtle);
    color: var(--text-subtle);
    font: inherit;
    font-size: 11px;
    font-weight: 650;
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;
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

  .empty-state,
  .login-notice {
    padding: 32px 20px;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: var(--surface);
    text-align: center;
    color: var(--text-muted);
    font-size: 12px;
  }

  .empty-state p,
  .login-notice p {
    margin: 0;
  }

  .login-notice a {
    color: var(--accent);
    font-weight: 700;
    text-decoration: none;
  }

  .login-notice a:hover {
    text-decoration: underline;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 28px;
  }

  .page-btn {
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--text-subtle);
    font: inherit;
    font-size: 11px;
    font-weight: 650;
    cursor: pointer;
    transition:
      border-color 0.15s ease,
      color 0.15s ease,
      background 0.15s ease;
  }

  .page-btn:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--surface-yellow);
  }

  .page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .page-info {
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 650;
  }

  .error-msg {
    margin: 16px 0 0;
    padding: 12px 16px;
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 10px;
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    font-size: 12px;
  }

  @media (max-width: 900px) {
    .recipe-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .content-section {
      width: min(100% - 32px, 1160px);
      margin-top: 40px;
    }

    .section-title {
      align-items: flex-start;
      flex-direction: column;
      gap: 6px;
    }

    .recipe-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
