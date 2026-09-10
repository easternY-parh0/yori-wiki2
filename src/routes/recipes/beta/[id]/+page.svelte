<script lang="ts">
  import { appPath } from '$lib/app-path';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let liked = $state(false);
  let bookmarked = $state(false);
  let servings = $state(data.food.metadata?.servings ?? 2);

  function increaseServings() {
    servings += 1;
  }

  function decreaseServings() {
    if (servings > 1) servings -= 1;
  }

  // 조리 과정 텍스트 줄바꿈 분리
  const recipeSteps = $derived(
    data.food.recipe
      ? data.food.recipe.split('\n').filter((step) => step.trim() !== '')
      : []
  );

  // 재료 텍스트 줄바꿈 분리
  const ingredientList = $derived(
    data.food.ingredients
      ? data.food.ingredients.split('\n').filter((item) => item.trim() !== '')
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
    <div class="breadcrumb">
      <a href={appPath('/recipes')}>레시피</a>
      <svg viewBox="0 0 24 24">
        <path d="M9 18l6-6-6-6" />
      </svg>
      <span>{data.food.name}</span>
    </div>

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

        <div class="recipe-stats">
          <div>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l3 2" />
            </svg>
            <span>{data.food.estimated_time || '시간 미지정'}</span>
          </div>

          <div>
            <svg viewBox="0 0 24 24">
              <path d="M4 19h16" />
              <path d="M6 17V9M10 17V5M14 17v-3M18 17V7" />
            </svg>
            <span>
              {data.food.metadata?.difficulty != null
                ? `난이도 ${data.food.metadata.difficulty}`
                : '보통'}
            </span>
          </div>

          <div>
            <svg viewBox="0 0 24 24">
              <path
                d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"
              />
            </svg>
            <span>4.8</span>
          </div>
        </div>

        <div class="hero-actions">
          <button
            class:liked
            class="like-button"
            type="button"
            onclick={() => (liked = !liked)}
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M20.8 8.7c0 5.2-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6z"
              />
            </svg>
            좋아요 {liked ? 129 : 128}
          </button>

          <button
            class:bookmarked
            class="bookmark-button"
            type="button"
            onclick={() => (bookmarked = !bookmarked)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M6 4h12v17l-6-4-6 4z" />
            </svg>
            {bookmarked ? '저장됨' : '저장'}
          </button>

          <button class="share-button" type="button">
            <svg viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="19" r="2.5" />
              <path d="M8.2 10.8l7.5-4.4M8.2 13.2l7.5 4.4" />
            </svg>
            공유
          </button>
        </div>
      </div>
    </section>

    <div class="content-layout">
      <div class="main-content">
        <!-- 재료 Section -->
        <section class="content-section ingredients-section">
          <div class="section-title">
            <div>
              <span>01</span>
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
            <div class="ingredient-group">
              <h3>필수 재료</h3>
              {#if ingredientList.length > 0}
                {#each ingredientList as item}
                  <div class="ingredient">
                    <span>{item}</span>
                  </div>
                {/each}
              {:else}
                <div class="ingredient">
                  <span>등록된 재료 정보가 없습니다.</span>
                </div>
              {/if}
            </div>
          </div>
        </section>

        <!-- 조리 과정 Section -->
        <section class="content-section">
          <div class="section-title">
            <div>
              <span>02</span>
              <h2>조리 과정</h2>
            </div>
          </div>

          <div class="steps">
            {#if recipeSteps.length > 0}
              {#each recipeSteps as stepText, index}
                <div class="step">
                  <div class="step-number">{index + 1}</div>

                  <div class="step-body">
                    <div class="step-image">
                      <span>STEP {index + 1}</span>
                    </div>

                    <div>
                      <h3>{stepText}</h3>
                    </div>
                  </div>
                </div>
              {/each}
            {:else}
              <p class="empty-text">등록된 조리 순서 정보가 없습니다.</p>
            {/if}
          </div>
        </section>

        <!-- 요리 팁 Section -->
        {#if data.food.metadata?.tips}
          <section class="content-section tip-section">
            <div class="section-title">
              <div>
                <span>03</span>
                <h2>요리 팁</h2>
              </div>
            </div>

            <div class="tip-box">
              <svg viewBox="0 0 24 24">
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path
                  d="M8.5 15.5A7 7 0 1 1 15.5 15c-.8.7-1.5 1.5-1.5 3H10c0-1.5-.7-2.3-1.5-3z"
                />
              </svg>

              <p>{data.food.metadata.tips}</p>
            </div>
          </section>
        {/if}

        <!-- 댓글 Section -->
        <section class="content-section comments-section">
          <div class="section-title">
            <div>
              <span>04</span>
              <h2>댓글</h2>
            </div>

            <span class="comment-count">0개</span>
          </div>

          <div class="comment-form">
            <textarea
              placeholder="레시피에 대한 의견을 남겨주세요."
              rows="3"
            ></textarea>

            <div>
              <span>로그인 후 댓글을 작성할 수 있습니다.</span>
              <a href={appPath('/login')}>로그인</a>
            </div>
          </div>
        </section>
      </div>

      <!-- 사이드바 -->
      <aside class="recipe-sidebar">
        <div class="sidebar-card">
          <h3>레시피 정보</h3>

          <div class="info-row">
            <span>준비시간</span>
            <strong>{data.food.metadata?.prep_time || '—'}</strong>
          </div>

          <div class="info-row">
            <span>조리시간</span>
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
            <span>인분</span>
            <strong>{servings}인분</strong>
          </div>
        </div>

        <a href={appPath('/recipes/new')} class="sidebar-register">
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          <span>
            <strong>나만의 레시피 등록</strong>
            <small>요리위키에 레시피를 공유해보세요.</small>
          </span>
        </a>
      </aside>
    </div>
  </main>
</div>

<style>
  :global(:root) {
    --background: #ffffff;
    --surface: #ffffff;
    --surface-subtle: #f8fafc;
    --surface-yellow: #fefce8;
    --surface-green: #f7fee7;
    --primary: #facc15;
    --accent: #65a30d;
    --text: #0f172a;
    --text-subtle: #64748b;
    --text-muted: #94a3b8;
    --border: #e2e8f0;
    --border-green: #d9f99d;
    --border-accent: #a3e635;
  }

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
    width: min(1120px, calc(100% - 48px));
    margin: 0 auto;
    padding-bottom: 80px;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 28px 0 18px;
    color: var(--text-muted);
    font-size: 14px;
  }

  .breadcrumb a:hover {
    color: var(--accent);
  }

  .breadcrumb svg {
    width: 12px;
    height: 12px;
  }

  .recipe-hero {
    display: grid;
    grid-template-columns: 1.02fr 1fr;
    gap: 45px;
    padding-bottom: 50px;
    border-bottom: 1px solid var(--border);
  }

  .hero-image {
    min-height: 430px;
    display: grid;
    place-items: center;
    border-radius: 22px;
    background: var(--surface-yellow);
    color: var(--accent);
    font-size: 16px;
    font-weight: 700;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 0;
  }

  .category {
    color: var(--accent);
    font-size: 14px;
    font-weight: 800;
  }

  .hero-content h1 {
    margin: 12px 0 15px;
    font-size: 40px;
    line-height: 1.22;
    letter-spacing: -0.07em;
  }

  .description {
    max-width: 500px;
    margin: 0;
    color: var(--text-subtle);
    font-size: 14px;
    line-height: 1.75;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 25px;
  }

  .author-avatar {
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--surface-green);
    color: var(--accent);
    width: 38px;
    height: 38px;
  }

  .author-avatar svg {
    width: 20px;
    height: 20px;
  }

  .author strong,
  .author span {
    display: block;
  }

  .author strong {
    font-size: 14px;
  }

  .author span {
    margin-top: 3px;
    color: var(--text-muted);
    font-size: 14px;
  }

  .recipe-stats {
    display: flex;
    gap: 22px;
    margin-top: 25px;
    padding: 17px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .recipe-stats div {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--text-subtle);
    font-size: 14px;
  }

  .recipe-stats svg {
    width: 15px;
    height: 15px;
    color: var(--accent);
  }

  .hero-actions {
    display: flex;
    gap: 7px;
    margin-top: 18px;
  }

  .hero-actions button {
    height: 38px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 13px;
    border: 1px solid var(--border);
    border-radius: 9px;
    background: var(--surface);
    color: var(--text-subtle);
    font-size: 14px;
    cursor: pointer;
  }

  .hero-actions button:hover {
    border-color: var(--primary);
  }

  .hero-actions svg {
    width: 15px;
    height: 15px;
  }

  .hero-actions .liked {
    border-color: var(--primary);
    background: var(--surface-yellow);
    color: #ca8a04;
  }

  .hero-actions .bookmarked {
    border-color: var(--border-accent);
    background: var(--surface-green);
    color: var(--accent);
  }

  .content-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 260px;
    gap: 50px;
    margin-top: 55px;
  }

  .main-content {
    min-width: 0;
  }

  .content-section {
    padding-bottom: 55px;
    margin-bottom: 50px;
    border-bottom: 1px solid var(--border);
  }

  .section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
  }

  .section-title > div:first-child {
    display: flex;
    align-items: baseline;
    gap: 11px;
  }

  .section-title span:first-child {
    color: var(--accent);
    font-size: 14px;
    font-weight: 800;
  }

  .section-title h2 {
    margin: 0;
    font-size: 23px;
    letter-spacing: -0.06em;
  }

  .servings {
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--text-muted);
    font-size: 14px;
  }

  .servings button {
    width: 27px;
    height: 27px;
    border: 1px solid var(--border);
    border-radius: 7px;
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
  }

  .servings button:hover {
    border-color: var(--primary);
  }

  .servings strong {
    min-width: 15px;
    color: var(--text);
    text-align: center;
  }

  .ingredient-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .ingredient-group {
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--surface);
  }

  .ingredient-group h3 {
    margin: 0 0 12px;
    font-size: 14px;
  }

  .ingredient {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 0;
    border-top: 1px solid var(--border);
    font-size: 14px;
  }

  .ingredient span {
    color: var(--text-subtle);
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .step {
    display: flex;
    gap: 17px;
  }

  .step-number {
    width: 29px;
    height: 29px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--primary);
    color: #0f172a;
    font-size: 14px;
    font-weight: 800;
  }

  .step-body {
    display: grid;
    grid-template-columns: 170px 1fr;
    gap: 18px;
    flex: 1;
  }

  .step-image {
    height: 125px;
    display: grid;
    place-items: center;
    border-radius: 13px;
    background: var(--surface-yellow);
    color: var(--accent);
    font-size: 14px;
    font-weight: 700;
  }

  .step-body h3 {
    margin: 4px 0 8px;
    font-size: 14px;
    line-height: 1.7;
    letter-spacing: -0.03em;
    font-weight: 400;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .empty-text {
    color: var(--text-muted);
    font-size: 14px;
  }

  .tip-box {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    padding: 18px;
    border: 1px solid var(--border-green);
    border-radius: 13px;
    background: var(--surface-green);
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
    line-height: 1.7;
    white-space: pre-wrap;
  }

  .comment-count {
    color: var(--text-muted);
    font-size: 14px;
  }

  .comment-form {
    padding: 15px;
    border: 1px solid var(--border);
    border-radius: 13px;
    background: var(--surface-subtle);
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
  }

  .comment-form textarea::placeholder {
    color: var(--text-muted);
  }

  .comment-form > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 9px;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 14px;
  }

  .comment-form a {
    color: var(--accent);
    font-weight: 750;
  }

  .recipe-sidebar {
    position: sticky;
    top: 95px;
    align-self: start;
  }

  .sidebar-card {
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 15px;
    background: var(--surface);
  }

  .sidebar-card h3 {
    margin: 0 0 14px;
    font-size: 14px;
  }

  .info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-top: 1px solid var(--border);
    font-size: 14px;
  }

  .info-row span {
    color: var(--text-muted);
  }

  .info-row strong {
    font-weight: 650;
  }

  .sidebar-register {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
    padding: 14px;
    border: 1px solid var(--border-green);
    border-radius: 13px;
    background: var(--surface-green);
  }

  .sidebar-register > svg {
    width: 21px;
    height: 21px;
    flex-shrink: 0;
    color: var(--accent);
  }

  .sidebar-register strong,
  .sidebar-register small {
    display: block;
  }

  .sidebar-register strong {
    font-size: 14px;
  }

  .sidebar-register small {
    margin-top: 3px;
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.4;
  }

  @media (max-width: 900px) {
    .recipe-hero {
      grid-template-columns: 1fr;
    }
    .hero-image {
      min-height: 360px;
    }
    .content-layout {
      grid-template-columns: 1fr;
    }
    .recipe-sidebar {
      position: static;
      order: -1;
    }
  }

  @media (max-width: 650px) {
    main {
      width: calc(100% - 28px);
    }
    .recipe-hero {
      gap: 25px;
    }
    .hero-image {
      min-height: 280px;
    }
    .hero-content h1 {
      font-size: 31px;
    }
    .recipe-stats {
      gap: 14px;
    }
    .hero-actions {
      flex-wrap: wrap;
    }
    .step-body {
      grid-template-columns: 1fr;
    }
    .step-image {
      height: 180px;
    }
  }
</style>