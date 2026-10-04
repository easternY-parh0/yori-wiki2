<script lang="ts">
  import { appPath } from '$lib/app-path';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let liked = $state(false);
  let bookmarked = $state(false);

  // Svelte 5 반응성 경고 해결 ($derived 사용)
  let initialServings = $derived(data.food.metadata?.servings ?? 2);
  let servingOffset = $state(0);
  let servings = $derived(initialServings + servingOffset);

  function increaseServings() {
    servingOffset += 1;
  }

  function decreaseServings() {
    if (servings > 1) {
      servingOffset -= 1;
    }
  }

  // 재료 파싱
  const ingredientList = $derived(
    data.food.ingredients
      ? data.food.ingredients
          .split(/(?:\r?\n|,)/)
          .map((item) => item.trim())
          .filter((item) => item !== '')
      : []
  );
</script>

<svelte:head>
  <title>{data.food.name} | 요리위키</title>
  <meta
    name="description"
    content={data.food.metadata?.description || `${data.food.name} 레시피 상세 정보`}
  />
</svelte:head>

<div class="page">
  <main>
    <!-- 상단 브레드크럼 -->
    <nav class="breadcrumb">
      <a href={appPath('/recipes')}>레시피</a>
      <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
      <span>{data.food.name}</span>
    </nav>

    <!-- 1. Hero 섹션 (사진 + 제목 및 개요) -->
    <section class="recipe-hero">
      <div class="hero-image">
        <span>{data.food.name}</span>
      </div>

      <div class="hero-content">
        <div class="category">
          {data.food.metadata?.category || '요리위키 레시피'}
        </div>

        <h1>{data.food.name}</h1>

        <p class="description">
          {data.food.metadata?.description || '맛있는 레시피 정보를 확인해보세요.'}
        </p>

        <div class="author">
          <div class="author-avatar">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3" />
              <path d="M5 20c.8-4 3-6 7-6s6.2 2 7 6" />
            </svg>
          </div>
          <div>
            <strong>{data.food.metadata?.author || '요리위키'}</strong>
            <span>{data.food.metadata?.created_at || '최근 업데이트'}</span>
          </div>
        </div>

        <div class="hero-actions">
          <button
            class:liked
            class="action-btn"
            type="button"
            onclick={() => (liked = !liked)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M20.8 8.7c0 5.2-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6z" />
            </svg>
            좋아요 {liked ? 129 : 128}
          </button>

          <button
            class:bookmarked
            class="action-btn"
            type="button"
            onclick={() => (bookmarked = !bookmarked)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M6 4h12v17l-6-4-6 4z" />
            </svg>
            {bookmarked ? '저장됨' : '저장'}
          </button>
        </div>
      </div>
    </section>

    <!-- 2. 본문 & 우측 사이드바 레이아웃 -->
    <div class="content-layout">
      <div class="main-content">
        <!-- 재료 Section -->
        <section class="content-section">
          <div class="section-title">
            <div>
              <span class="num">01</span>
              <h2>재료</h2>
            </div>

            <div class="servings">
              <span>인분</span>
              <button type="button" onclick={decreaseServings}>−</button>
              <strong>{servings}</strong>
              <button type="button" onclick={increaseServings}>+</button>
            </div>
          </div>

          <div class="ingredient-list">
            {#if ingredientList.length > 0}
              {#each ingredientList as item}
                <div class="ingredient-item">
                  <span class="dot"></span>
                  <span>{item}</span>
                </div>
              {/each}
            {:else}
              <div class="ingredient-item empty">
                <span>등록된 재료 정보가 없습니다.</span>
              </div>
            {/if}
          </div>
        </section>

        <!-- 영양 성분 표 Section (플레이스홀더) -->
        <section class="content-section">
          <div class="section-title">
            <div>
              <span class="num">02</span>
              <h2>영양 성분 표</h2>
            </div>
          </div>

          <div class="nutrition-placeholder">
            <svg viewBox="0 0 24 24">
              <path d="M12 20v-6M6 20V10M18 20V4" />
            </svg>
            <p>영양 성분 분석 정보가 준비 중입니다.</p>
          </div>
        </section>

        <!-- 댓글 Section -->
        <section class="content-section last">
          <div class="section-title">
            <div>
              <span class="num">03</span>
              <h2>댓글</h2>
            </div>
            <span class="comment-count">0개</span>
          </div>

          <div class="comment-form">
            <textarea
              placeholder="레시피에 대한 의견을 남겨주세요."
              rows="3"
            ></textarea>

            <div class="form-footer">
              <span>로그인 후 댓글을 작성할 수 있습니다.</span>
              <a href={appPath('/login')}>로그인</a>
            </div>
          </div>
        </section>
      </div>

      <!-- 우측 Sticky 사이드바 -->
      <aside class="recipe-sidebar">
        <a href={appPath(`/recipes/${data.food.id}/cook`)} class="cook-button">
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
          <span>요리 만들기 시작</span>
        </a>

        <div class="info-rows">
          <div class="info-row">
            <span>준비 시간</span>
            <strong>{data.food.metadata?.prep_time || '—'}</strong>
          </div>

          <div class="info-row">
            <span>조리 시간</span>
            <strong>{data.food.estimated_time || '—'}</strong>
          </div>

          <div class="info-row">
            <span>난이도</span>
            <strong>
              {data.food.metadata?.difficulty != null
                ? `${data.food.metadata.difficulty}단계`
                : '보통'}
            </strong>
          </div>

          <div class="info-row">
            <span>분량</span>
            <strong>{servings}인분</strong>
          </div>
        </div>
      </aside>
    </div>
  </main>
</div>

<style>
  .page {
    min-height: 100vh;
    background: var(--background);
    color: var(--text);
  }

  svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  main {
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 24px 100px;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 24px 0 18px;
    color: var(--text-muted);
    font-size: 14px;
  }

  .breadcrumb a {
    color: var(--text-subtle);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: var(--accent);
  }

  .breadcrumb svg {
    width: 12px;
    height: 12px;
  }

  /* Hero Section */
  .recipe-hero {
    display: grid;
    grid-template-columns: 440px 1fr;
    gap: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--border);
  }

  .hero-image {
    min-height: 320px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    background: var(--surface-yellow);
    border: 1px solid var(--border);
    color: var(--accent);
    font-size: 16px;
    font-weight: 700;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .category {
    color: var(--accent);
    font-size: 14px;
    font-weight: 800;
  }

  .hero-content h1 {
    margin: 10px 0 12px;
    font-size: 36px;
    letter-spacing: -0.05em;
    color: var(--text);
  }

  .description {
    margin: 0;
    color: var(--text-subtle);
    font-size: 15px;
    line-height: 1.6;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }

  .author-avatar {
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--surface-green);
    color: var(--accent);
    width: 36px;
    height: 36px;
  }

  .author-avatar svg {
    width: 18px;
    height: 18px;
  }

  .author strong {
    display: block;
    font-size: 14px;
    color: var(--text);
  }

  .author span {
    display: block;
    margin-top: 2px;
    color: var(--text-muted);
    font-size: 13px;
  }

  .hero-actions {
    display: flex;
    gap: 8px;
    margin-top: 20px;
  }

  .action-btn {
    height: 38px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 14px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--text-subtle);
    font-size: 14px;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .action-btn:hover {
    border-color: var(--primary);
    background: var(--surface-subtle);
  }

  .action-btn svg {
    width: 15px;
    height: 15px;
  }

  .action-btn.liked {
    border-color: var(--primary);
    background: var(--surface-yellow);
    color: var(--text);
  }

  .action-btn.bookmarked {
    border-color: var(--border-accent);
    background: var(--surface-green);
    color: var(--accent);
  }

  /* Content Layout */
  .content-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px;
    gap: 48px;
    margin-top: 40px;
  }

  .main-content {
    min-width: 0;
  }

  .content-section {
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--border);
  }

  .content-section.last {
    border-bottom: none;
  }

  .section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .section-title > div:first-child {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .section-title .num {
    color: var(--accent);
    font-size: 14px;
    font-weight: 800;
  }

  .section-title h2 {
    margin: 0;
    font-size: 22px;
    letter-spacing: -0.04em;
    color: var(--text);
  }

  .servings {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-muted);
    font-size: 14px;
  }

  .servings button {
    width: 28px;
    height: 28px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
  }

  .servings button:hover {
    border-color: var(--primary);
    background: var(--surface-subtle);
  }

  .servings strong {
    min-width: 16px;
    color: var(--text);
    text-align: center;
  }

  /* Ingredients */
  .ingredient-list {
    display: flex;
    flex-direction: column;
  }

  .ingredient-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    border-bottom: 1px dashed var(--border);
    font-size: 14px;
    color: var(--text-subtle);
  }

  .ingredient-item.empty {
    border-bottom: none;
    color: var(--text-muted);
  }

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent);
  }

  /* Nutrition Placeholder */
  .nutrition-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 36px;
    border: 1px dashed var(--border);
    border-radius: 8px;
    background: var(--surface-subtle);
    color: var(--text-muted);
  }

  .nutrition-placeholder svg {
    width: 28px;
    height: 28px;
  }

  .nutrition-placeholder p {
    margin: 0;
    font-size: 14px;
  }

  /* Tip Box */
  .tip-box {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 18px;
    background: var(--surface-green);
    border-left: 3px solid var(--accent);
    border-radius: 0 8px 8px 0;
  }

  .tip-box svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: var(--accent);
  }

  .tip-box p {
    margin: 0;
    color: var(--text-subtle);
    font-size: 14px;
    line-height: 1.65;
    white-space: pre-wrap;
  }

  /* Comment Form */
  .comment-count {
    color: var(--text-muted);
    font-size: 14px;
  }

  .comment-form {
    padding: 14px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
  }

  .comment-form textarea {
    width: 100%;
    resize: vertical;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--text);
    font-size: 14px;
    line-height: 1.6;
    box-sizing: border-box;
  }

  .comment-form textarea::placeholder {
    color: var(--text-muted);
  }

  .form-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 10px;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 13px;
  }

  .form-footer a {
    color: var(--accent);
    font-weight: 700;
    text-decoration: none;
  }

  /* Sticky Sidebar */
  .recipe-sidebar {
    position: sticky;
    top: 96px;
    align-self: start;
  }

  /* 메인 액션 버튼의 가독성을 위한 명확한 노란색/검은글씨 처리 */
  .cook-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 52px;
    background: var(--primary);
    color: #0f172a;
    font-size: 16px;
    font-weight: 800;
    text-decoration: none;
    border-radius: 12px;
    transition: background 0.15s ease;
    box-sizing: border-box;
  }

  .cook-button:hover {
    background: var(--primary-hover);
  }

  .cook-button svg {
    width: 18px;
    height: 18px;
  }

  .info-rows {
    margin-top: 20px;
    border-top: 1px solid var(--border);
  }

  .info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
  }

  .info-row span {
    color: var(--text-muted);
  }

  .info-row strong {
    font-weight: 600;
    color: var(--text);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .recipe-hero {
      grid-template-columns: 1fr;
    }

    .hero-image {
      min-height: 260px;
    }

    .content-layout {
      grid-template-columns: 1fr;
    }

    .recipe-sidebar {
      position: static;
      order: -1;
    }
  }
</style>