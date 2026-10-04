<script lang="ts">
  type SubstItem = {
    id: string;
    searchKey: string;
  };

  let {
    guide: sg,
    substitutionDB,
    onRemove
  }: {
    guide: SubstItem;
    substitutionDB: Record<string, string>;
    onRemove: (id: string) => void;
  } = $props();
</script>

<div class="tool-card subst-card">
  <div class="card-head">
    <div class="title-wrap">
      <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
      <span class="static-title">재료 대체 팁</span>
    </div>

    <button type="button" class="del-btn" onclick={() => onRemove(sg.id)}>✕</button>
  </div>

  <select bind:value={sg.searchKey} class="field-select">
    {#each Object.keys(substitutionDB) as key}
      <option value={key}>{key} 없을 때</option>
    {/each}
  </select>

  <div class="subst-result">
    💡 {substitutionDB[sg.searchKey]}
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

  .field-select {
    width: 100%;
    height: 32px;
    padding: 0 6px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 11px;
    background: var(--surface);
    color: var(--text);
  }

  .subst-result {
    margin-top: 8px;
    background: var(--surface-yellow);
    border: 1px solid var(--primary);
    padding: 8px;
    border-radius: 6px;
    font-size: 12px;
    color: var(--text);
    line-height: 1.4;
  }
</style>