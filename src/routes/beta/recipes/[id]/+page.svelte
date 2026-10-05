<script lang="ts">
  import RecipeSocial from '$lib/components/RecipeSocial.svelte';
 import RecipeActions from '$lib/components/RecipeActions.svelte';
 import { appPath } from '$lib/app-path';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let authorDisplay = $derived(data.food.author ?? '요리위키');
  let createdAt = $derived(data.food.metadata?.created_at);
  // 4. 인분 수 (최상위 servings 우선 조회)  교체 시작
  let initialServings = $derived(
  Math.max(
    1,
    Number(data.food.metadata?.servings ?? 2) || 2
  )
);

let servingOffset = $state(0);
let servings = $derived(initialServings + servingOffset);

function increaseServings() {
  servingOffset += 1;
}

function decreaseServings() {
  if (servings > 1) {
    servingOffset -= 1;
  }
}    // 교체 끝

  // ISO 날짜 문자열 포맷팅 함수 (예: 2026. 10. 5.)
  function formatDate(dateString?: string) {
    if (!dateString) return '최근 업데이트';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
//추가 시작 
//교체 시작
// 조리 순서 파싱
function parseRecipeSteps(recipe?: string) {
  if (!recipe) return [];

  const raw = recipe.trim();

  // 한 줄에 "1. 내용 2. 내용 3. 내용"으로 저장된 경우 분리
  const normalized = raw.replace(/\r?\n/g, ' ');

  const numberedSteps = [
    ...normalized.matchAll(
      /(?:^|\s)(\d+)[.)]\s*(.*?)(?=(?:\s+\d+[.)]\s*)|$)/g
    )
  ]
    .map((match) => match[2].trim())
    .filter(Boolean);

  if (numberedSteps.length > 0) {
    return numberedSteps;
  }

  // 번호가 없는 경우에는 줄바꿈 기준으로 분리
  return raw
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter(Boolean)
    .map((step) =>
      step.replace(/^[-•]\s*/, '')
    );
}

const recipeSteps = $derived(
  parseRecipeSteps(data.food.recipe)
);
// 교체 끝

// 인분 수에 맞게 재료 수량 변경
function parseQuantity(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .reduce((sum, part) => {
      // 1/2 같은 분수
      if (part.includes('/')) {
        const [numerator, denominator] = part.split('/').map(Number);

        if (denominator) {
          return sum + numerator / denominator;
        }

        return sum;
      }

      const number = Number(part);
      return Number.isFinite(number) ? sum + number : sum;
    }, 0);
}

function formatQuantity(value: number) {
  return String(Math.round(value * 100) / 100);
}

function scaleIngredient(item: string, ratio: number) {
  if (ratio === 1) return item;

  const quantityPattern =
    String.raw`(?:\d+(?:\.\d+)?(?:\s+\d+\/\d+)?|\d+\/\d+)`;

  const unitPattern =
    'kg|g|mg|ml|mL|L|cc|컵|큰술|작은술|숟가락|스푼|티스푼|테이블스푼|개|알|장|쪽|대|줄기|줌|봉지|봉|캔|팩|공기|조각|토막|마리|근|꼬집|모'; //모 추가

  const quantityWithUnit = new RegExp(
    `(${quantityPattern})(?:\\s*([~～-])\\s*(${quantityPattern}))?(\\s*(?:${unitPattern}))`,
    'gi'
  );

  return item.replace(
    quantityWithUnit,
    (
      _match,
      first: string,
      separator: string | undefined,
      second: string | undefined,
      unit: string
    ) => {
      const firstQuantity =
        formatQuantity(parseQuantity(first) * ratio);

      if (separator && second) {
        const secondQuantity =
          formatQuantity(parseQuantity(second) * ratio);

        return `${firstQuantity}${separator}${secondQuantity}${unit}`;
      }

      return `${firstQuantity}${unit}`;
    }
  );
}

const scaledIngredientList = $derived(
  ingredientList.map((item) =>
    scaleIngredient(
      item,
      servings / initialServings
    )
  )
);

function scaleCookingTime(time: string | undefined, ratio: number) {
  if (!time) return '—';
  if (ratio === 1) return time;

  return time.replace(/\d+(?:\.\d+)?/g, (value) => {
    const scaled = Number(value) * ratio;
    return String(Math.round(scaled));
  });
}

let scaledCookingTime = $derived(
  scaleCookingTime(
    data.food.estimated_time,
    servings / initialServings
  )
);
//추가 끝

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
        {#if data.food.metadata?.image_url}<img src={data.food.metadata.image_url.startsWith('/api/') ? appPath(data.food.metadata.image_url) : data.food.metadata.image_url} alt={data.food.name} style="width:100%;height:100%;object-fit:cover" />{:else}<span>{data.food.name}</span>{/if}
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
            <strong>{authorDisplay}</strong>
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>

        <div class="hero-actions">
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
            {#if scaledIngredientList.length > 0}  <!--교체-->
            {#each scaledIngredientList as item}   <!--교체-->
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
<!--추가 시작-->
<!-- 조리 순서 Section -->
<section class="content-section">
  <div class="section-title">
    <div>
      <span class="num">02</span>
      <h2>조리 순서</h2>
    </div>
  </div>

  {#if recipeSteps.length > 0}
    <div class="recipe-steps">
      {#each recipeSteps as step, index}
        <div class="recipe-step">
          <div class="step-number">
            {index + 1}
          </div>

          <div class="step-content">
            {step}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="recipe-empty">
      등록된 조리 방법이 없습니다.
    </div>
  {/if}
</section>
<!--추가 끝-->
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
        <a href={appPath(`/beta/recipes/${data.food.id}/cook`)} class="cook-button">
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
<!--교체 시작-->
          <div class="info-row">  
  <span>조리 시간</span>
  <strong>{scaledCookingTime}</strong>
</div>
<!-- 교체 끝-->
          <div class="info-row">
            <span>난이도</span>
            <strong>
              {(data.food.metadata?.difficulty) != null
                ? `${data.food.metadata?.difficulty}단계`
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
  <RecipeActions food={data.food} />
{#key data.food.id}<RecipeSocial food={data.food} />{/key}
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
/*추가 시작*/
/* Recipe Steps */
.recipe-steps {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border);
}

.recipe-step {
  display: grid;
  grid-template-columns: 42px 1fr;
  align-items: start;
  gap: 18px;
  padding: 22px 0;
  border-bottom: 1px solid var(--border);
}

.step-number {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--surface-subtle);
  border: 1px solid var(--border);

  color: var(--accent);
  font-size: 15px;
  font-weight: 800;
}

.step-content {
  padding-top: 5px;

  color: var(--text);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.8;

  word-break: keep-all;
}

.recipe-empty {
  padding: 28px 0;

  color: var(--text-muted);
  font-size: 14px;
}
/*추가 끝*/
</style>