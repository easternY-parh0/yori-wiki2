<script lang="ts">
  import { onDestroy } from "svelte";

  type StopwatchItem = {
    id: string;
    title: string;
    elapsedSeconds: number;
    isRunning: boolean;
    laps: number[];
  };

  let {
    id,
    initialTitle = "스톱워치",
    onRemove,
  }: {
    id: string;
    initialTitle?: string;
    onRemove: (id: string) => void;
  } = $props();

  // --------------------------------------------------
  // Stopwatch State
  // --------------------------------------------------

  let sw = $state<StopwatchItem>({
    id,
    title: initialTitle,
    elapsedSeconds: 0,
    isRunning: false,
    laps: [],
  });

  let intervalId:
    ReturnType<typeof setInterval> | null = null;

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------

  function formatTime(totalSec: number) {
    const h = Math.floor(totalSec / 3600);

    const m = Math.floor(
      (totalSec % 3600) / 60,
    );

    const s = totalSec % 60;

    if (h > 0) {
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  // --------------------------------------------------
  // Start / Stop
  // --------------------------------------------------

  function start() {
    if (sw.isRunning) {
      return;
    }

    sw.isRunning = true;

    intervalId = setInterval(() => {
      sw.elapsedSeconds += 1;
    }, 1000);
  }

  function stop() {
    if (!sw.isRunning) {
      return;
    }

    sw.isRunning = false;

    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function toggle() {
    if (sw.isRunning) {
      stop();
    } else {
      start();
    }
  }

  // --------------------------------------------------
  // Reset
  // --------------------------------------------------

  function reset() {
    stop();

    sw.elapsedSeconds = 0;
    sw.laps = [];
  }

  // --------------------------------------------------
  // Lap
  // --------------------------------------------------

  function recordLap() {
    if (!sw.isRunning) {
      return;
    }

    sw.laps = [
      sw.elapsedSeconds,
      ...sw.laps,
    ];
  }

  // --------------------------------------------------
  // Remove
  // --------------------------------------------------

  function remove() {
    stop();
    onRemove(sw.id);
  }

  // --------------------------------------------------
  // Cleanup
  // --------------------------------------------------

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  });
</script>

<div class="tool-card stopwatch-card">
  <div class="card-head">
    <div class="title-wrap">
      <svg viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="13"
          r="8"
        />

        <path
          d="M12 9v4l2 2M12 2v3M9 2h6"
        />
      </svg>

      <input
        type="text"
        bind:value={sw.title}
        class="title-input"
      />
    </div>

    <button
      type="button"
      class="del-btn"
      onclick={remove}
      aria-label="스톱워치 삭제"
    >
      ✕
    </button>
  </div>

  <div class="timer-display-wrap">
    <span class="timer-value readonly">
      {formatTime(sw.elapsedSeconds)}
    </span>
  </div>

  <div class="card-controls">
    <button
      type="button"
      class="ctrl-btn primary"
      onclick={toggle}
    >
      {sw.isRunning ? "정지" : "시작"}
    </button>

    <button
      type="button"
      class="ctrl-btn"
      onclick={recordLap}
      disabled={!sw.isRunning}
    >
      기록
    </button>

    <button
      type="button"
      class="ctrl-btn"
      onclick={reset}
    >
      리셋
    </button>
  </div>

  {#if sw.laps.length > 0}
    <ul class="lap-list">
      {#each sw.laps as lap, idx}
        <li>
          <span>
            기록 {sw.laps.length - idx}
          </span>

          <strong>
            {formatTime(lap)}
          </strong>
        </li>
      {/each}
    </ul>
  {/if}
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
    padding: 2px 8px;
  }

  .timer-value.readonly {
    cursor: default;
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

  .ctrl-btn:disabled {
    cursor: default;
    opacity: 0.5;
  }

  .lap-list {
    margin: 8px 0 0;
    padding: 0;
    list-style: none;
    max-height: 80px;
    overflow-y: auto;
    border-top: 1px solid var(--border);
  }

  .lap-list li {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    padding: 4px 0;
    color: var(--text-subtle);
  }
</style>