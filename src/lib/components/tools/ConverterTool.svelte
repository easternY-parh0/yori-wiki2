<script lang="ts">
  type UnitCategory = 'volume' | 'weight' | 'temperature' | 'length' | 'energy';

  type UnitDef = {
    label: string;
    value: string;
    toBase: (v: number) => number;
    fromBase: (v: number) => number;
  };

  type ConverterItem = {
    id: string;
    title: string;
    category: UnitCategory;
    fromUnit: string;
    toUnit: string;
    inputValue: number;
  };

  let {
    converter: conv,
    unitCatalog,
    onRemove,
    onCategoryChange,
    calculateResult
  }: {
    converter: ConverterItem;
    unitCatalog: Record<UnitCategory, UnitDef[]>;
    onRemove: (id: string) => void;
    onCategoryChange: (id: string, category: UnitCategory) => void;
    calculateResult: (conv: ConverterItem) => string;
  } = $props();
</script>

<div class="tool-card converter-card">
  <div class="card-head">
    <div class="title-wrap">
      <svg viewBox="0 0 24 24"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6" /></svg>
      <input type="text" bind:value={conv.title} class="title-input" />
    </div>
    <button type="button" class="del-btn" onclick={() => onRemove(conv.id)}>✕</button>
  </div>

  <div class="category-tabs">
    <button class:active={conv.category === 'volume'} onclick={() => onCategoryChange(conv.id, 'volume')}>부피</button>
    <button class:active={conv.category === 'weight'} onclick={() => onCategoryChange(conv.id, 'weight')}>무게</button>
    <button class:active={conv.category === 'temperature'} onclick={() => onCategoryChange(conv.id, 'temperature')}>온도</button>
    <button class:active={conv.category === 'length'} onclick={() => onCategoryChange(conv.id, 'length')}>길이</button>
    <button class:active={conv.category === 'energy'} onclick={() => onCategoryChange(conv.id, 'energy')}>열량</button>
  </div>

  <div class="conv-body">
    <div class="conv-field">
      <input type="number" bind:value={conv.inputValue} min="0" step="any" class="field-input" />
      <select bind:value={conv.fromUnit} class="field-select">
        {#each unitCatalog[conv.category] as unit}
          <option value={unit.value}>{unit.label}</option>
        {/each}
      </select>
    </div>

    <div class="conv-divider">
      <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" /></svg>
    </div>

    <div class="conv-field">
      <div class="field-result">{calculateResult(conv)}</div>
      <select bind:value={conv.toUnit} class="field-select">
        {#each unitCatalog[conv.category] as unit}
          <option value={unit.value}>{unit.label}</option>
        {/each}
      </select>
    </div>
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

  .del-btn:hover {
    color: #ef4444;
  }

  .category-tabs {
    display: flex;
    gap: 2px;
    background: var(--border);
    padding: 2px;
    border-radius: 6px;
    margin-bottom: 10px;
  }

  .category-tabs button {
    flex: 1;
    border: 0;
    background: transparent;
    font-size: 10px;
    padding: 4px 0;
    color: var(--text-subtle);
    border-radius: 4px;
    cursor: pointer;
  }

  .category-tabs button.active {
    background: var(--surface);
    font-weight: 700;
    color: var(--accent);
  }

  .conv-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .conv-field {
    display: flex;
    gap: 6px;
  }

  .field-input,
  .field-result {
    width: 80px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    background: var(--surface);
    color: var(--text);
  }

  .field-result {
    background: var(--surface-green);
    border-color: var(--border-green);
    color: var(--accent);
    overflow: hidden;
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

  .conv-divider {
    display: flex;
    justify-content: center;
    color: var(--text-muted);
  }

  .conv-divider svg {
    width: 14px;
    height: 14px;
  }
</style>