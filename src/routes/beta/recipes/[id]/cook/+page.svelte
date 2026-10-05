<script lang="ts">
  import { appPath } from '$lib/app-path';
  import type { PageData } from './$types';
  import CookingWorkspace from '$lib/components/tools/CookingWorkspace.svelte';

  let { data }: { data: PageData } = $props();

  // Recipe 파싱
  const steps = $derived.by(() => {
    const raw = data.food?.recipe || '';
    if (!raw) return [];

    const numberedParts = raw
      .split(/(?=\d+\.\s*)/g)
      .map((s) => s.replace(/^\d+\.\s*/, '').trim())
      .filter((s) => s.length > 0);

    if (numberedParts.length > 1) {
      return numberedParts;
    }

    return raw
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  });

  let currentStepIndex = $state(0);

  function prevStep() {
    if (currentStepIndex > 0) currentStepIndex--;
  }

  function nextStep() {
    if (currentStepIndex < steps.length - 1) currentStepIndex++;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
    if (e.key === 'ArrowLeft') prevStep();
    if (e.key === 'ArrowRight') nextStep();
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<svelte:head>
  <title>{data.food.name} - 요리하기 | 요리위키</title>
</svelte:head>

<div class="cook-page">
  <!-- 상단 네비게이션 -->
  <header class="cook-header">
    <nav class="breadcrumb">
      <a href={appPath('/recipes')}>레시피</a>
      <span class="sep">/</span>
      <a href={appPath(`/recipes/${data.food.id}`)}>{data.food.name}</a>
      <span class="sep">/</span>
      <span class="active">요리 진행</span>
    </nav>
    <div class="header-meta">
      <span class="time-badge">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
        조리 시간: {data.food.estimated_time || '—'}
      </span>
    </div>
  </header>

  <!-- 메인 영역 -->
  <div class="stage-container">
    <!-- 좌측 넓은 조리 영역 -->
    <main class="full-stage">
      <button
        type="button"
        class="arrow-nav-btn prev"
        disabled={currentStepIndex === 0}
        onclick={prevStep}
        aria-label="이전 단계"
      >
        <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
      </button>

      <button
        type="button"
        class="arrow-nav-btn next"
        disabled={currentStepIndex >= steps.length - 1}
        onclick={nextStep}
        aria-label="다음 단계"
      >
        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
      </button>

      <div class="stage-hero">
        <div class="hero-image-card">
          <div class="hero-image-fill">
            <span>STEP {currentStepIndex + 1} 대표 이미지</span>
          </div>
        </div>
      </div>

      <div class="stage-body">
        <div class="stage-meta-row">
          <span class="step-badge">STEP {currentStepIndex + 1}</span>
          <span class="step-progress">{currentStepIndex + 1} / {steps.length || 1}</span>
        </div>

        <div class="step-text-container">
          {#if steps.length > 0}
            <p class="description">{steps[currentStepIndex]}</p>
          {:else}
            <p class="description muted">등록된 조리 순서가 없습니다.</p>
          {/if}
        </div>
      </div>
    </main>

    <!-- 분리한 요리 워크스페이스 및 툴바 컴포넌트 -->
    <CookingWorkspace />
  </div>
</div>

<style>
  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  .cook-page {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background: var(--background);
    color: var(--text);
    overflow: hidden;
    font-size: 13px;
  }

  svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* Header */
  .cook-header {
    height: 48px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
    flex-shrink: 0;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }

  .breadcrumb a {
    color: var(--text-subtle);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: var(--accent);
  }

  .breadcrumb .sep {
    color: var(--text-muted);
  }

  .breadcrumb .active {
    color: var(--text);
    font-weight: 700;
  }

  .time-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: var(--accent);
    background: var(--surface-green);
    border: 1px solid var(--border-accent, transparent);
    padding: 3px 10px;
    border-radius: 16px;
    font-weight: 600;
  }

  .time-badge svg {
    width: 13px;
    height: 13px;
    color: var(--accent);
  }

  /* Stage Container */
  .stage-container {
    flex: 1;
    display: flex;
    min-height: 0;
    overflow: hidden;
  }

  /* Left Full Stage */
  .full-stage {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--background);
    border-right: 1px solid var(--border);
    overflow: hidden;
    position: relative;
    padding: 0 64px;
  }

  .arrow-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 30;
    transition: all 0.15s ease;
    color: var(--text-subtle);
  }

  .arrow-nav-btn:hover:not(:disabled) {
    background: var(--surface-subtle);
    transform: translateY(-50%) scale(1.06);
    border-color: var(--accent);
    color: var(--accent);
  }

  .arrow-nav-btn:disabled {
    opacity: 0.25;
    cursor: not-allowed;
    box-shadow: none;
  }

  .arrow-nav-btn.prev {
    left: 12px;
  }

  .arrow-nav-btn.next {
    right: 12px;
  }

  .arrow-nav-btn svg {
    width: 20px;
    height: 20px;
  }

  .stage-hero {
    height: 48%;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-image-card {
    width: 100%;
    height: 100%;
    background: var(--surface-subtle);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .hero-image-fill {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 600;
  }

  .stage-body {
    flex: 1;
    padding: 12px 16px 24px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .stage-meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .step-badge {
    color: var(--accent);
    font-size: 15px;
    font-weight: 800;
  }

  .step-progress {
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 600;
  }

  .step-text-container {
    flex: 1;
  }

  .description {
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--text);
    font-weight: 500;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .description.muted {
    color: var(--text-muted);
  }
</style>