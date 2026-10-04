<script lang="ts">
  type TimerItem = {
    id: string;
    title: string;
    totalSeconds: number;
    remainingSeconds: number;
    isRunning: boolean;
    intervalId: ReturnType<typeof setInterval> | null;
    isEditing: boolean;
    inputMinutes: number;
    inputSeconds: number;
  };

  let {
    timer,
    onRemove,
    onAddTime,
    onApplyCustomTime,
    onToggle,
    onReset,
    formatTime
  }: {
    timer: TimerItem;
    onRemove: (id: string) => void;
    onAddTime: (id: string, addedSec: number) => void;
    onApplyCustomTime: (id: string) => void;
    onToggle: (id: string) => void;
    onReset: (id: string) => void;
    formatTime: (totalSec: number) => string;
  } = $props();
</script>

<div class="tool-card timer-card">
  <div class="card-head">
    <div class="title-wrap">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
      <input type="text" bind:value={timer.title} class="title-input" />
    </div>
    <button type="button" class="del-btn" onclick={() => onRemove(timer.id)}>✕</button>
  </div>

  <div class="timer-display-wrap">
    {#if timer.isEditing}
      <div class="timer-input-box">
        <input type="number" bind:value={timer.inputMinutes} min="0" max="999" placeholder="분" />
        <span class="unit">분</span>
        <input type="number" bind:value={timer.inputSeconds} min="0" max="59" placeholder="초" />
        <span class="unit">초</span>
        <button type="button" class="set-confirm-btn" onclick={() => onApplyCustomTime(timer.id)}>설정</button>
      </div>
    {:else}
      <button
        type="button"
        class="timer-value"
        onclick={() => {
          timer.isEditing = true;
        }}
      >
        {formatTime(timer.remainingSeconds)}
        <span class="edit-hint">수정</span>
      </button>
    {/if}
  </div>

  <div class="timer-adjust-grid">
    <button type="button" onclick={() => onAddTime(timer.id, 600)}>+10분</button>
    <button type="button" onclick={() => onAddTime(timer.id, 60)}>+1분</button>
    <button type="button" onclick={() => onAddTime(timer.id, 10)}>+10초</button>
    <button type="button" onclick={() => onAddTime(timer.id, -60)}>-1분</button>
  </div>

  <div class="card-controls">
    <button type="button" class="ctrl-btn primary" onclick={() => onToggle(timer.id)}>
      {timer.isRunning ? '일시정지' : '시작'}
    </button>
    <button type="button" class="ctrl-btn" onclick={() => onReset(timer.id)}>리셋</button>
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

  .timer-display-wrap {
    margin: 6px 0 10px;
    text-align: center;
  }

  .timer-value {
    border: 0;
    background: transparent;
    font-size: 28px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    color: var(--text);
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 6px;
  }

  .timer-value:hover {
    background: var(--surface-subtle);
  }

  .edit-hint {
    font-size: 10px;
    color: var(--accent);
    font-weight: 600;
    margin-left: 4px;
  }

  .timer-input-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: var(--text);
  }

  .timer-input-box input {
    width: 48px;
    height: 32px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    border-radius: 6px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
  }

  .timer-adjust-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin-bottom: 10px;
  }

  .timer-adjust-grid button {
    padding: 5px 0;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--surface);
    font-size: 10px;
    font-weight: 600;
    color: var(--text-subtle);
    cursor: pointer;
  }

  .timer-adjust-grid button:hover {
    border-color: var(--border-accent);
    background: var(--surface-green);
    color: var(--accent);
  }

  .card-controls {
    display: flex;
    gap: 6px;
  }

  .ctrl-btn {
    flex: 1;
    height: 32px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
    color: var(--text);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .ctrl-btn.primary {
    background: var(--primary);
    border-color: var(--primary);
    color: #0f172a;
  }

  .set-confirm-btn {
    height: 32px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
    color: var(--text);
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    padding: 0 8px;
  }
</style>