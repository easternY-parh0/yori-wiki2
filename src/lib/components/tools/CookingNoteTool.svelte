<script lang="ts">
  let {
    id,
    onRemove,
  }: {
    id: string;
    onRemove: (id: string) => void;
  } = $props();

  // -----------------------------
  // Note State
  // -----------------------------

  let title = $state("조리 메모");
  let content = $state("");

  // -----------------------------
  // Actions
  // -----------------------------

  function removeNote() {
    onRemove(id);
  }
</script>

<div class="tool-card note-card">
  <div class="card-head">
    <div class="title-wrap">
      <svg viewBox="0 0 24 24">
        <path
          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        />
        <path
          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        />
      </svg>

      <input
        type="text"
        bind:value={title}
        class="title-input"
      />
    </div>

    <button
      type="button"
      class="del-btn"
      onclick={removeNote}
      aria-label="메모 삭제"
    >
      ✕
    </button>
  </div>

  <textarea
    bind:value={content}
    placeholder="메모할 내용을 입력하세요..."
    class="note-textarea"
  ></textarea>
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

  .note-textarea {
    width: 100%;
    height: 70px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    border-radius: 6px;
    padding: 8px;
    font-size: 12px;
    outline: none;
    resize: vertical;
  }
</style>