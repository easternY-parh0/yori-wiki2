<script lang="ts">
  type IngredientItem = {
    id: string;
    name: string;
    amount: number;
    unit: string;
  };

  type ScalerItem = {
    id: string;
    title: string;
    baseServings: number;
    targetServings: number;
    ingredients: IngredientItem[];
  };

  let {
    scaler,
    onRemove,
    onAddIngredient,
    onRemoveIngredient
  }: {
    scaler: ScalerItem;
    onRemove: (id: string) => void;
    onAddIngredient: (id: string) => void;
    onRemoveIngredient: (scalerId: string, ingredientId: string) => void;
  } = $props();
</script>

<div class="tool-card scaler-card">
  <div class="card-head">
    <div class="title-wrap">
      <svg viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      <input type="text" bind:value={scaler.title} class="title-input" />
    </div>
    <button type="button" class="del-btn" onclick={() => onRemove(scaler.id)}>✕</button>
  </div>

  <div class="servings-row">
    <div class="servings-box">
      <span>기준</span>
      <input type="number" bind:value={scaler.baseServings} min="1" />
      <span>인분</span>
    </div>

    <span class="arrow-icon">➔</span>

    <div class="servings-box highlight">
      <span>목표</span>
      <input type="number" bind:value={scaler.targetServings} min="1" />
      <span>인분</span>
    </div>
  </div>

  <div class="ingredients-list">
    {#each scaler.ingredients as ing (ing.id)}
      <div class="ing-row">
        <input type="text" bind:value={ing.name} placeholder="재료명" class="ing-name" />

        <span class="scaled-val">
          {((ing.amount * (scaler.targetServings || 1)) / (scaler.baseServings || 1)).toFixed(1)}
        </span>

        <input type="text" bind:value={ing.unit} placeholder="단위" class="ing-unit" />

        <button
          type="button"
          class="del-ing-btn"
          onclick={() => onRemoveIngredient(scaler.id, ing.id)}
        >
          ✕
        </button>
      </div>
    {/each}
  </div>

  <button type="button" class="add-sub-item-btn" onclick={() => onAddIngredient(scaler.id)}>
    + 재료 추가
  </button>
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

  .title-input {
    border: 0;
    border-bottom: 1px dashed var(--border);
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
    background: transparent;
    outline: none;
    width: 130px;
    padding: 2px 0;
  }

  .del-btn {
    border: 0;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 13px;
  }

  .del-btn:hover,
  .del-ing-btn:hover {
    color: #ef4444;
  }

  .servings-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--surface-subtle);
    padding: 8px;
    border-radius: 6px;
    margin-bottom: 8px;
    color: var(--text);
  }

  .servings-box {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
  }

  .servings-box input {
    width: 36px;
    height: 26px;
    text-align: center;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    border-radius: 4px;
    font-weight: 700;
  }

  .servings-box.highlight input {
    border-color: var(--border-accent);
    background: var(--surface-green);
    color: var(--accent);
  }

  .ingredients-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 8px;
  }

  .ing-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ing-name {
    flex: 1;
    height: 28px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    border-radius: 4px;
    padding: 0 6px;
    font-size: 11px;
  }

  .scaled-val {
    width: 40px;
    text-align: right;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
  }

  .ing-unit {
    width: 40px;
    height: 28px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    border-radius: 4px;
    padding: 0 4px;
    font-size: 11px;
  }

  .del-ing-btn {
    border: 0;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 11px;
  }

  .add-sub-item-btn {
    width: 100%;
    padding: 4px 0;
    border: 1px dashed var(--border);
    border-radius: 6px;
    background: transparent;
    font-size: 11px;
    color: var(--text-subtle);
    cursor: pointer;
  }

  .add-sub-item-btn:hover {
    border-color: var(--border-accent);
    color: var(--accent);
  }
</style>