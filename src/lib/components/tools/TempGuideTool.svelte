<script lang="ts">
  let {
    id,
    onRemove,
  }: {
    id: string;
    onRemove: (id: string) => void;
  } = $props();

  type MeatType = "beef" | "pork" | "chicken" | "fish";

  let meatType = $state<MeatType>("beef");
</script>

<div class="tool-card temp-card">
  <div class="card-head">
    <div class="title-wrap">
      <svg viewBox="0 0 24 24">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
      </svg>

      <span class="static-title">고기 익힘 온도 가이드</span>
    </div>

    <button
      type="button"
      class="del-btn"
      onclick={() => onRemove(id)}
      aria-label="고기 익힘 온도 가이드 삭제"
    >
      ✕
    </button>
  </div>

  <select bind:value={meatType} class="field-select">
    <option value="beef">소고기 (Beef)</option>
    <option value="pork">돼지고기 (Pork)</option>
    <option value="chicken">닭/오리고기 (Poultry)</option>
    <option value="fish">생선 (Fish)</option>
  </select>

  <div class="temp-info-grid">
    {#if meatType === "beef"}
      <div>
        <span>레어 (Rare)</span>
        <strong>52°C</strong>
      </div>

      <div>
        <span>미디엄 (Medium)</span>
        <strong>60°C</strong>
      </div>

      <div>
        <span>웰던 (Well Done)</span>
        <strong>71°C+</strong>
      </div>
    {:else if meatType === "pork"}
      <div>
        <span>안심/등심 (Medium)</span>
        <strong>63°C</strong>
      </div>

      <div>
        <span>완전 익힘 (Well)</span>
        <strong>71°C</strong>
      </div>
    {:else if meatType === "chicken"}
      <div>
        <span>닭가슴살/안심</span>
        <strong>74°C</strong>
      </div>

      <div>
        <span>닭다리/통구이</span>
        <strong>75°C+</strong>
      </div>
    {:else}
      <div>
        <span>생선 구이/스테이크</span>
        <strong>63°C</strong>
      </div>
    {/if}
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

  .temp-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 6px;
    margin-top: 8px;
  }

  .temp-info-grid div {
    background: var(--surface-subtle);
    border: 1px solid var(--border);
    padding: 6px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .temp-info-grid span {
    font-size: 10px;
    color: var(--text-subtle);
  }

  .temp-info-grid strong {
    font-size: 13px;
    color: #ef4444;
  }
</style>