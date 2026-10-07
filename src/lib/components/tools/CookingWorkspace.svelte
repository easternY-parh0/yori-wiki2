<script lang="ts">
  import TimerTool from "$lib/components/tools/TimerTool.svelte";
  import StopwatchTool from "$lib/components/tools/StopwatchTool.svelte";
  import ConverterTool from "$lib/components/tools/ConverterTool.svelte";
  import ScalerTool from "$lib/components/tools/ScalerTool.svelte";
  import RiceCalculatorTool from "$lib/components/tools/RiceCalculatorTool.svelte";
  import TempGuideTool from "$lib/components/tools/TempGuideTool.svelte";
  import SubstitutionTool from "$lib/components/tools/SubstitutionTool.svelte";
  import CookingNoteTool from "$lib/components/tools/CookingNoteTool.svelte";

  // Workspace

  const workspaceWidth = 720;

  let viewportEl: HTMLDivElement | null = null;

  let zoom = $state(1);
  let panX = $state(0);
  let panY = $state(0);

  let selectedNodeId = $state<string | null>(null);
  let draggingNodeId = $state<string | null>(null);
  let isPanning = $state(false);

  let highestZIndex = $state(10);

  type ToolType =
    | "timer"
    | "stopwatch"
    | "converter"
    | "scaler"
    | "rice"
    | "temperature"
    | "substitution"
    | "note";

  type WorkspaceNode = {
    id: string;
    type: ToolType;
    x: number;
    y: number;
    zIndex: number;
  };

  let nodes = $state<WorkspaceNode[]>([
  ]);

  // Workspace Helpers

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  function getViewportCenterWorld() {
    if (!viewportEl) {
      return {
        x: workspaceWidth / 2,
        y: 340,
      };
    }

    return {
      x: (viewportEl.clientWidth / 2 - panX) / zoom,

      y: (viewportEl.clientHeight / 2 - panY) / zoom,
    };
  }

  function getSpawnPosition() {
    const center = getViewportCenterWorld();

    const offsetX = (Math.random() - 0.5) * 240;
    const offsetY = (Math.random() - 0.5) * 180;

    return {
      x: center.x + offsetX - 160,
      y: center.y + offsetY - 110,
    };
  }

  function addWorkspaceNode(type: ToolType, id: string) {
    const position = getSpawnPosition();

    highestZIndex += 1;

    nodes = [
      ...nodes,
      {
        id,
        type,
        x: position.x,
        y: position.y,
        zIndex: highestZIndex,
      },
    ];

    selectedNodeId = id;
  }

  function removeWorkspaceNode(id: string) {
    nodes = nodes.filter((node) => node.id !== id);

    if (selectedNodeId === id) {
      selectedNodeId = null;
    }
  }

  function bringNodeToFront(id: string) {
    highestZIndex += 1;

    nodes = nodes.map((node) =>
      node.id === id
        ? {
            ...node,
            zIndex: highestZIndex,
          }
        : node,
    );

    selectedNodeId = id;
  }

  // Node Drag

  let nodeDragState: {
    id: string;
    offsetX: number;
    offsetY: number;
  } | null = null;

  function startNodeDrag(id: string, e: MouseEvent) {
    const target = e.target as HTMLElement | null;

    if (
      target?.closest(
        "button, input, textarea, select, option, a, [contenteditable='true'], .no-drag",
      )
    ) {
      return;
    }

    if (!viewportEl) return;

    e.preventDefault();
    e.stopPropagation();

    const node = nodes.find((item) => item.id === id);

    if (!node) return;

    const rect = viewportEl.getBoundingClientRect();

    const mouseWorldX = (e.clientX - rect.left - panX) / zoom;

    const mouseWorldY = (e.clientY - rect.top - panY) / zoom;

    nodeDragState = {
      id,
      offsetX: mouseWorldX - node.x,
      offsetY: mouseWorldY - node.y,
    };

    draggingNodeId = id;

    bringNodeToFront(id);

    window.addEventListener("mousemove", handleNodeDrag);

    window.addEventListener("mouseup", stopNodeDrag);
  }

  function handleNodeDrag(e: MouseEvent) {
    if (!nodeDragState || !viewportEl) {
      return;
    }

    const rect = viewportEl.getBoundingClientRect();

    const mouseWorldX = (e.clientX - rect.left - panX) / zoom;

    const mouseWorldY = (e.clientY - rect.top - panY) / zoom;

    const nextX = mouseWorldX - nodeDragState.offsetX;

    const nextY = mouseWorldY - nodeDragState.offsetY;

    nodes = nodes.map((node) =>
      node.id === nodeDragState!.id
        ? {
            ...node,
            x: nextX,
            y: nextY,
          }
        : node,
    );
  }

  function stopNodeDrag() {
    nodeDragState = null;
    draggingNodeId = null;

    window.removeEventListener("mousemove", handleNodeDrag);

    window.removeEventListener("mouseup", stopNodeDrag);
  }

  // Canvas Panning

  let panState: {
    startMouseX: number;
    startMouseY: number;
    startPanX: number;
    startPanY: number;
  } | null = null;

  function startPanning(e: MouseEvent) {
    if (e.button !== 0) return;

    if (e.target !== e.currentTarget) {
      return;
    }

    e.preventDefault();

    isPanning = true;

    panState = {
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startPanX: panX,
      startPanY: panY,
    };

    selectedNodeId = null;

    window.addEventListener("mousemove", handlePanning);

    window.addEventListener("mouseup", stopPanning);
  }

  function handlePanning(e: MouseEvent) {
    if (!panState) return;

    panX = panState.startPanX + (e.clientX - panState.startMouseX);

    panY = panState.startPanY + (e.clientY - panState.startMouseY);
  }

  function stopPanning() {
    panState = null;
    isPanning = false;

    window.removeEventListener("mousemove", handlePanning);

    window.removeEventListener("mouseup", stopPanning);
  }

  // Zoom

  function zoomTo(nextZoom: number) {
    const newZoom = clamp(nextZoom, 0.45, 1.8);

    if (!viewportEl) {
      zoom = newZoom;
      return;
    }

    const centerX = viewportEl.clientWidth / 2;

    const centerY = viewportEl.clientHeight / 2;

    const worldX = (centerX - panX) / zoom;

    const worldY = (centerY - panY) / zoom;

    zoom = newZoom;

    panX = centerX - worldX * newZoom;

    panY = centerY - worldY * newZoom;
  }

  function zoomIn() {
    zoomTo(zoom + 0.1);
  }

  function zoomOut() {
    zoomTo(zoom - 0.1);
  }

  function resetView() {
    zoom = 1;
    panX = 0;
    panY = 0;
  }

  function centerWorkspace() {
    if (!viewportEl || nodes.length === 0) {
      resetView();
      return;
    }

    const minX = Math.min(...nodes.map((node) => node.x));

    const minY = Math.min(...nodes.map((node) => node.y));

    const maxX = Math.max(...nodes.map((node) => node.x + 320));

    const maxY = Math.max(...nodes.map((node) => node.y + 240));

    const contentWidth = Math.max(320, maxX - minX);

    const contentHeight = Math.max(240, maxY - minY);

    const availableWidth = viewportEl.clientWidth - 80;

    const availableHeight = viewportEl.clientHeight - 80;

    const fitZoom = clamp(
      Math.min(
        availableWidth / contentWidth,

        availableHeight / contentHeight,
      ),
      0.45,
      1.4,
    );

    zoom = fitZoom;

    const centerX = viewportEl.clientWidth / 2;

    const centerY = viewportEl.clientHeight / 2;

    const contentCenterX = (minX + maxX) / 2;

    const contentCenterY = (minY + maxY) / 2;

    panX = centerX - contentCenterX * zoom;

    panY = centerY - contentCenterY * zoom;
  }

  function handleWheel(e: WheelEvent) {
    if (!viewportEl) return;

    e.preventDefault();

    const rect = viewportEl.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;

    const mouseY = e.clientY - rect.top;

    const worldX = (mouseX - panX) / zoom;

    const worldY = (mouseY - panY) / zoom;

    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;

    const newZoom = clamp(zoom * zoomFactor, 0.45, 1.8);

    zoom = newZoom;

    panX = mouseX - worldX * newZoom;

    panY = mouseY - worldY * newZoom;
  }

  // Timer

  function addTimer() {
    const newId = `timer-${Date.now()}`;

    addWorkspaceNode("timer", newId);
  }

  // Stopwatch

  function addStopwatch() {
    const newId = `sw-${Date.now()}`;

    addWorkspaceNode("stopwatch", newId);
  }

  // Converter

  function addConverter() {
    const newId = `conv-${Date.now()}`;

    addWorkspaceNode("converter", newId);
  }

  // Scaler

  function addScaler() {
    const newId = `scaler-${Date.now()}`;

    addWorkspaceNode("scaler", newId);
  }

  // Rice

  function addRiceCalc() {
    const newId = `rice-${Date.now()}`;

    addWorkspaceNode("rice", newId);
  }

  // Temperature

  function addTempGuide() {
    const newId = `temp-${Date.now()}`;

    addWorkspaceNode("temperature", newId);
  }

  // Substitution

  function addSubstGuide() {
    const newId = `subst-${Date.now()}`;

    addWorkspaceNode("substitution", newId);
  }

  // Notes

  function addNote() {
    const newId = `note-${Date.now()}`;

    addWorkspaceNode("note", newId);
  }
</script>

<!-- Workspace -->
<aside class="workspace-panel">
  <div class="panel-header">
    <div class="header-left">
      <div class="workspace-title-row">
        <div class="workspace-dot"></div>

        <h2>요리 워크스페이스</h2>
      </div>

      <div class="workspace-subtitle">요리를 완성하는 당신만의 실험실</div>
    </div>

    <div class="header-actions">
      <div class="zoom-controls">
        <button
          type="button"
          class="header-icon-btn"
          onclick={zoomOut}
          aria-label="축소"
        >
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14" />
          </svg>
        </button>

        <button type="button" class="zoom-label" onclick={resetView}>
          {Math.round(zoom * 100)}%
        </button>

        <button
          type="button"
          class="header-icon-btn"
          onclick={zoomIn}
          aria-label="확대"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>

        <button
          type="button"
          class="header-icon-btn"
          onclick={centerWorkspace}
          aria-label="모듈 정렬"
          title="모듈 전체 보기"
        >
          <svg viewBox="0 0 24 24">
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M16 3h3a2 2 0 0 1 2 2v3" />
            <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
            <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <div class="workspace-body">
    <!-- 2D Sandbox -->
    <div
      bind:this={viewportEl}
      class="sandbox-viewport"
      class:panning={isPanning}
      onmousedown={startPanning}
      onwheel={handleWheel}
    >
      <div
        class="sandbox-grid"
        style={`--grid-size:${40 * zoom}px; --grid-x:${panX % (40 * zoom)}px; --grid-y:${panY % (40 * zoom)}px;`}
      ></div>

      <!-- Sandbox World -->
      <div
        class="sandbox-world"
        style={`transform: translate3d(${panX}px, ${panY}px, 0) scale(${zoom});`}
        onmousedown={(e) => {
          if (e.target === e.currentTarget) {
            startPanning(e);
          }
        }}
      >
        {#if nodes.length === 0}
          <div class="empty-state">
            <div class="empty-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 3v18M3 12h18" />
              </svg>
            </div>

            <strong> 요리 작업판이 비어 있습니다 </strong>

            <span>
              오른쪽 도구 모음에서 모듈을 추가하고<br />
              원하는 위치로 자유롭게 옮겨보세요.
            </span>
          </div>
        {/if}

        <!-- Workspace Nodes -->
        {#each nodes as node (node.id)}
          <div
            class="workspace-node"
            class:selected={selectedNodeId === node.id}
            class:dragging={draggingNodeId === node.id}
            style={`left:${node.x}px; top:${node.y}px; z-index:${node.zIndex};`}
            onmousedown={(e) => startNodeDrag(node.id, e)}
          >
            <div class="node-drag-overlay">
              <div class="node-handle-dots">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            {#if node.type === "timer"}
              <TimerTool
                id={node.id}
                initialTitle="타이머"
                initialSeconds={180}
                onRemove={removeWorkspaceNode}
              />
            {:else if node.type === "stopwatch"}
              <StopwatchTool
                id={node.id}
                initialTitle="스톱워치"
                onRemove={removeWorkspaceNode}
              />
            {:else if node.type === "converter"}
              <ConverterTool 
                id={node.id} 
                onRemove={removeWorkspaceNode} 
              />
            {:else if node.type === "scaler"}
              <ScalerTool 
                id={node.id} 
                onRemove={removeWorkspaceNode} 
              />
            {:else if node.type === "rice"}
              <RiceCalculatorTool 
                id={node.id} 
                onRemove={removeWorkspaceNode} 
              />
            {:else if node.type === "temperature"}
              <TempGuideTool
                id={node.id}
                onRemove={removeWorkspaceNode}
              />
            {:else if node.type === "substitution"}
              <SubstitutionTool
                id={node.id}
                onRemove={removeWorkspaceNode}
              />
            {:else if node.type === "note"}
              <CookingNoteTool
                id={node.id}
                onRemove={removeWorkspaceNode}
              />
            {/if}
          </div>
        {/each}
      </div>

      {#if nodes.length > 0}
        <div class="canvas-hint">
          <span>드래그</span>
          <b>모듈 이동</b>

          <span>빈 공간 드래그</span>
          <b>화면 이동</b>

          <span>휠</span>
          <b>확대 / 축소</b>
        </div>
      {/if}
    </div>
  </div>
</aside>

<!-- Side Toolbar -->
<nav class="side-toolbar" aria-label="요리 도구 모음">
  <div class="toolbar-top">
    <div class="toolbar-divider"></div>

    <!-- Timer -->
    <div class="tool-item">
      <button
        type="button"
        class="tool-icon-btn"
        onclick={addTimer}
        aria-label="타이머 추가"
      >
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </button>

      <div class="custom-tooltip">타이머 추가</div>
    </div>

    <!-- Stopwatch -->
    <div class="tool-item">
      <button
        type="button"
        class="tool-icon-btn"
        onclick={addStopwatch}
        aria-label="스톱워치 추가"
      >
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2 2M12 2v3M9 2h6" />
        </svg>
      </button>

      <div class="custom-tooltip">스톱워치 추가</div>
    </div>

    <!-- Converter -->
    <div class="tool-item">
      <button
        type="button"
        class="tool-icon-btn"
        onclick={addConverter}
        aria-label="단위 변환기 추가"
      >
        <svg viewBox="0 0 24 24">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6" />
        </svg>
      </button>

      <div class="custom-tooltip">단위 변환기 추가</div>
    </div>

    <!-- Scaler -->
    <div class="tool-item">
      <button
        type="button"
        class="tool-icon-btn"
        onclick={addScaler}
        aria-label="재료 분량 계산기 추가"
      >
        <svg viewBox="0 0 24 24">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </button>

      <div class="custom-tooltip">재료 / 인분 계산기</div>
    </div>

    <!-- Rice -->
    <div class="tool-item">
      <button
        type="button"
        class="tool-icon-btn"
        onclick={addRiceCalc}
        aria-label="밥물 계산기 추가"
      >
        <svg viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </button>

      <div class="custom-tooltip">밥물 맞추기</div>
    </div>

    <!-- Temperature -->
    <div class="tool-item">
      <button
        type="button"
        class="tool-icon-btn"
        onclick={addTempGuide}
        aria-label="고기 적정 온도 가이드 추가"
      >
        <svg viewBox="0 0 24 24">
          <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
        </svg>
      </button>

      <div class="custom-tooltip">고기 적정 온도 가이드</div>
    </div>

    <!-- Substitution -->
    <div class="tool-item">
      <button
        type="button"
        class="tool-icon-btn"
        onclick={addSubstGuide}
        aria-label="식재료 대체 가이드 추가"
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          />
        </svg>
      </button>

      <div class="custom-tooltip">식재료 대체 가이드</div>
    </div>

    <!-- Note -->
    <div class="tool-item">
      <button
        type="button"
        class="tool-icon-btn"
        onclick={addNote}
        aria-label="요리 메모장 추가"
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      <div class="custom-tooltip">요리 메모장</div>
    </div>
  </div>
</nav>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .workspace-panel {
    position: relative;
    width: 720px;
    height: 100%;
    min-height: 0;
    border-right: 1px solid var(--border);
    background: var(--surface-subtle);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow: hidden;
  }

  .panel-header {
    height: 58px;
    min-height: 58px;
    padding: 0 12px 0 16px;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-left {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .workspace-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .workspace-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 12%, transparent);
  }

  .panel-header h2 {
    margin: 0;
    font-size: 14px;
    line-height: 1;
    font-weight: 750;
    color: var(--text);
  }

  .workspace-subtitle {
    padding-left: 16px;
    font-size: 10px;
    line-height: 1.2;
    color: var(--text-subtle);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .zoom-controls {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 2px;
    border: 1px solid var(--border);
    background: var(--surface-subtle);
    border-radius: 8px;
  }

  .header-icon-btn,
  .zoom-label {
    border: 0;
    background: transparent;
    cursor: pointer;
    color: var(--text-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition:
      color 0.15s ease,
      background-color 0.15s ease;
  }

  .header-icon-btn {
    width: 26px;
    height: 26px;
  }

  .header-icon-btn svg {
    width: 14px;
    height: 14px;
  }

  .zoom-label {
    min-width: 42px;
    height: 26px;
    padding: 0 5px;
    font-size: 10px;
    font-weight: 700;
  }

  .header-icon-btn:hover,
  .zoom-label:hover {
    background: var(--surface-subtle);
    color: var(--accent);
  }

  .workspace-body {
    position: relative;
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.3;
    }
  }

  .sandbox-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    cursor: grab;
    background: var(--surface-subtle);
    user-select: none;
    isolation: isolate;
  }

  .sandbox-viewport.panning {
    cursor: grabbing;
  }

  .sandbox-grid {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: linear-gradient(
        to right,
        color-mix(in srgb, var(--border) 55%, transparent) 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        color-mix(in srgb, var(--border) 55%, transparent) 1px,
        transparent 1px
      );
    background-size:
      var(--grid-size) var(--grid-size),
      var(--grid-size) var(--grid-size);
    background-position:
      var(--grid-x) var(--grid-y),
      var(--grid-x) var(--grid-y);
  }

  .sandbox-world {
    position: absolute;
    inset: 0;
    transform-origin: 0 0;
    z-index: 10;
    width: 100%;
    height: 100%;
  }

  .workspace-node {
    position: absolute;
    width: 320px;
    cursor: grab;
    transform-origin: center center;
    user-select: none;
    filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.07));
    transition:
      box-shadow 0.15s ease,
      filter 0.15s ease;
  }

  .workspace-node:hover {
    filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.11));
  }

  .workspace-node.selected {
    filter: drop-shadow(
      0 8px 26px color-mix(in srgb, var(--accent) 18%, transparent)
    );
  }

  .workspace-node.dragging {
    cursor: grabbing;
    filter: drop-shadow(0 16px 34px rgba(0, 0, 0, 0.18));
  }

  .node-drag-overlay {
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 22px;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .workspace-node:hover .node-drag-overlay,
  .workspace-node.selected .node-drag-overlay,
  .workspace-node.dragging .node-drag-overlay {
    opacity: 1;
  }

  .node-handle-dots {
    display: grid;
    grid-template-columns: repeat(3, 3px);
    gap: 2px;
    padding: 4px 7px;
    border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
    background: color-mix(in srgb, var(--surface) 90%, transparent);
    border-radius: 0 0 6px 6px;
    backdrop-filter: blur(8px);
  }

  .node-handle-dots span {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--text-subtle);
  }

  .empty-state {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: var(--text-subtle);
    pointer-events: none;
  }

  .empty-icon {
    width: 54px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    border: 1px dashed var(--border);
    border-radius: 14px;
    background: var(--surface);
  }

  .empty-icon svg {
    width: 22px;
    height: 22px;
  }

  .empty-state strong {
    margin-bottom: 5px;
    color: var(--text);
    font-size: 13px;
    font-weight: 700;
  }

  .empty-state span {
    font-size: 11px;
    line-height: 1.6;
  }

  .canvas-hint {
    position: absolute;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    z-index: 400;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 10px;
    color: var(--text-subtle);
    background: color-mix(in srgb, var(--surface) 90%, transparent);
    border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
    border-radius: 8px;
    font-size: 9px;
    white-space: nowrap;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);
    pointer-events: none;
  }

  .canvas-hint span {
    opacity: 0.7;
  }

  .canvas-hint b {
    color: var(--text);
    font-weight: 700;
  }

  .side-toolbar {
    position: relative;
    width: 48px;
    height: 100%;
    background: var(--surface);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    flex-shrink: 0;
    border-left: 1px solid var(--border);
    z-index: 1000;
  }

  .toolbar-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .toolbar-divider {
    width: 22px;
    height: 1px;
    margin: 2px 0;
    background: var(--border);
  }

  .tool-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tool-icon-btn {
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-subtle);
    transition:
      color 0.15s ease,
      background-color 0.15s ease,
      transform 0.15s ease;
  }

  .tool-icon-btn svg {
    width: 20px;
    height: 20px;
  }

  .tool-icon-btn:hover {
    color: var(--accent);
    background: var(--surface-subtle);
  }

  .tool-icon-btn:active {
    transform: scale(0.94);
  }

  @keyframes pulse-bg {
    0%,
    100% {
      background-color: #fee2e2;
    }

    50% {
      background-color: #fca5a5;
    }
  }

  .custom-tooltip {
    position: absolute;
    right: 48px;
    top: 50%;
    transform: translateY(-50%) translateX(6px);
    background: var(--text);
    color: var(--background);
    font-size: 11px;
    font-weight: 600;
    padding: 5px 10px;
    border-radius: 6px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      visibility 0.2s;
    box-shadow: 0 4px 12px var(--shadow-menu);
    z-index: 2000;
  }

  .custom-tooltip::after {
    content: "";
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 4px 0 4px 4px;
    border-style: solid;
    border-color: transparent transparent transparent var(--text);
  }

  .tool-item:hover .custom-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(0);
  }

  @media (max-width: 900px) {
    .workspace-node {
      width: 300px;
    }

    .canvas-hint {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .workspace-node {
      width: 280px;
    }

    .zoom-controls {
      display: none;
    }

    .workspace-subtitle {
      display: none;
    }

    .panel-header {
      padding-left: 12px;
    }
  }
</style>
