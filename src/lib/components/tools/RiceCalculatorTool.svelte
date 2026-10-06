<script lang="ts">
  let {
    id,
    onRemove,
  }: {
    id: string;
    onRemove: (id: string) => void;
  } = $props();

  type RiceType = "white" | "brown" | "mixed" | "sushi";

  let riceType = $state<RiceType>("white");
  let cupCount = $state(2);

  const riceRatios: Record<RiceType, number> = {
    white: 1.1,
    brown: 1.4,
    mixed: 1.3,
    sushi: 1.0,
  };

  const mlPerCup = 180;

  function getWaterRecommendation(type: RiceType, cups: number) {
    const ratio = riceRatios[type];

    const totalWaterMl = Math.round(cups * mlPerCup * ratio);

    return {
      ml: totalWaterMl,
      cupRatio: ratio,
    };
  }

  let waterRecommendation = $derived(
    getWaterRecommendation(riceType, cupCount),
  );
</script>

<div class="tool-card rice-card">
  <div class="card-head">
    <div class="title-wrap">
      <svg viewBox="0 0 24 24">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        />
      </svg>

      <span class="static-title">밥물 맞추기 계산기</span>
    </div>

    <button
      type="button"
      class="del-btn"
      onclick={() => onRemove(id)}
      aria-label="밥물 계산기 삭제"
    >
      ✕
    </button>
  </div>

  <div class="rice-controls">
    <select bind:value={riceType} class="field-select">
      <option value="white">백미 (1 : 1.1)</option>
      <option value="brown">현미 (1 : 1.4)</option>
      <option value="mixed">잡곡밥 (1 : 1.3)</option>
      <option value="sushi">초밥용/꼬들밥 (1 : 1.0)</option>
    </select>

    <div class="cup-input-box">
      <input
        type="number"
        bind:value={cupCount}
        min="0.5"
        step="0.5"
      />

      <span>컵</span>
    </div>
  </div>

  <div class="rice-result-box">
    <span>권장 물의 양:</span>

    <strong>
      {waterRecommendation.ml} ml
    </strong>
  </div>
</div>

<style>
  svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .tool-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px;
    box-shadow: 0 2px 6px var(--shadow-card);
  }

  .card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .title-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--accent);
  }

  .title-wrap svg {
    width: 16px;
    height: 16px;
  }

  .static-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
  }

  .del-btn {
    border: 0;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 13px;
  }

  .del-btn:hover {
    color: #ef4444;
  }

  .rice-controls {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
  }

  .field-select {
    flex: 1;
    height: 32px;
    padding: 0 6px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 11px;
    background: var(--surface);
    color: var(--text);
  }

  .cup-input-box {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--text);
  }

  .cup-input-box input {
    width: 48px;
    height: 32px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    border-radius: 6px;
    text-align: center;
    font-weight: 700;
  }

  .rice-result-box {
    background: var(--surface-green);
    border: 1px solid var(--border-green);
    padding: 8px 12px;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: var(--text);
  }

  .rice-result-box strong {
    font-size: 14px;
    color: var(--accent);
  }
</style>