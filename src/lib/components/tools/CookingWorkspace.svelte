<script lang="ts">
  import { onDestroy } from "svelte";

  import TimerTool from "$lib/components/tools/TimerTool.svelte";
  import StopwatchTool from "$lib/components/tools/StopwatchTool.svelte";
  import ConverterTool from "$lib/components/tools/ConverterTool.svelte";
  import ScalerTool from "$lib/components/tools/ScalerTool.svelte";
  import RiceCalculatorTool from "$lib/components/tools/RiceCalculatorTool.svelte";
  import TempGuideTool from "$lib/components/tools/TempGuideTool.svelte";
  import SubstitutionTool from "$lib/components/tools/SubstitutionTool.svelte";
  import CookingNoteTool from "$lib/components/tools/CookingNoteTool.svelte";

  // =============================================================
  // Workspace / 2D Sandbox 상태
  // =============================================================

  let isWorkspaceCollapsed = $state(false);
  let workspaceWidth = $state(720);
  let isResizing = $state(false);

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
    {
      id: "timer-1",
      type: "timer",
      x: 48,
      y: 48,
      zIndex: 2,
    },
    {
      id: "conv-1",
      type: "converter",
      x: 410,
      y: 64,
      zIndex: 1,
    },
  ]);

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

  function getSpawnPosition(index: number) {
    const center = getViewportCenterWorld();

    const angle = index * 0.9;
    const ring = Math.floor(index / 6);
    const radius = 100 + ring * 110;

    return {
      x: center.x + Math.cos(angle) * radius - 160,
      y: center.y + Math.sin(angle) * radius - 110,
    };
  }

  function addWorkspaceNode(type: ToolType, id: string) {
    const position = getSpawnPosition(nodes.length);

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

  // -------------------------------------------------------------
  // Workspace 패널 리사이즈
  // -------------------------------------------------------------

  function startResizing(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    isResizing = true;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isResizing) return;

    const newWidth = window.innerWidth - 48 - e.clientX;

    if (newWidth >= 320 && newWidth <= window.innerWidth * 0.8) {
      workspaceWidth = newWidth;
    }
  }

  function stopResizing() {
    isResizing = false;

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResizing);
  }

  // -------------------------------------------------------------
  // 2D Sandbox - 노드 드래그
  // -------------------------------------------------------------

  let nodeDragState: {
    id: string;
    offsetX: number;
    offsetY: number;
  } | null = null;

  function startNodeDrag(id: string, e: MouseEvent) {
    if (isResizing) return;

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
    if (!nodeDragState || !viewportEl) return;

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

  // -------------------------------------------------------------
  // 2D Sandbox - 캔버스 패닝
  // -------------------------------------------------------------

  let panState: {
    startMouseX: number;
    startMouseY: number;
    startPanX: number;
    startPanY: number;
  } | null = null;

  function startPanning(e: MouseEvent) {
    if (e.button !== 0) return;

    if (e.target !== e.currentTarget) return;

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

  // -------------------------------------------------------------
  // 2D Sandbox - Zoom
  // -------------------------------------------------------------

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

  // =============================================================
  // 1. 타이머 모듈
  // =============================================================

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

  let timers = $state<TimerItem[]>([
    {
      id: "timer-1",
      title: "메인 타이머",
      totalSeconds: 300,
      remainingSeconds: 300,
      isRunning: false,
      intervalId: null,
      isEditing: false,
      inputMinutes: 5,
      inputSeconds: 0,
    },
  ]);

  function addTimer() {
    const newId = `timer-${Date.now()}`;

    timers = [
      ...timers,
      {
        id: newId,
        title: `타이머 ${timers.length + 1}`,
        totalSeconds: 180,
        remainingSeconds: 180,
        isRunning: false,
        intervalId: null,
        isEditing: false,
        inputMinutes: 3,
        inputSeconds: 0,
      },
    ];

    if (isWorkspaceCollapsed) {
      isWorkspaceCollapsed = false;
    }

    addWorkspaceNode("timer", newId);
  }

  function removeTimer(id: string) {
    const target = timers.find((t) => t.id === id);

    if (target?.intervalId) {
      clearInterval(target.intervalId);
    }

    timers = timers.filter((t) => t.id !== id);

    removeWorkspaceNode(id);
  }

  function addTimeToTimer(id: string, addedSec: number) {
    timers = timers.map((t) => {
      if (t.id !== id) return t;

      const nextSec = Math.max(0, t.remainingSeconds + addedSec);
      const m = Math.floor(nextSec / 60);
      const s = nextSec % 60;

      return {
        ...t,
        totalSeconds: nextSec,
        remainingSeconds: nextSec,
        inputMinutes: m,
        inputSeconds: s,
      };
    });
  }

  function applyCustomTime(id: string) {
    timers = timers.map((t) => {
      if (t.id !== id) return t;

      const calculatedSec = Math.max(
        0,
        (t.inputMinutes || 0) * 60 + (t.inputSeconds || 0),
      );

      return {
        ...t,
        totalSeconds: calculatedSec,
        remainingSeconds: calculatedSec,
        isEditing: false,
      };
    });
  }

  function toggleTimer(id: string) {
    timers = timers.map((timer) => {
      if (timer.id !== id) return timer;

      if (timer.isRunning) {
        if (timer.intervalId) {
          clearInterval(timer.intervalId);
        }

        return {
          ...timer,
          isRunning: false,
          intervalId: null,
        };
      } else {
        if (timer.remainingSeconds <= 0) return timer;

        const interval = setInterval(() => {
          timers = timers.map((t) => {
            if (t.id !== id) return t;

            if (t.remainingSeconds > 0) {
              const nextRem = t.remainingSeconds - 1;

              return {
                ...t,
                remainingSeconds: nextRem,
                inputMinutes: Math.floor(nextRem / 60),
                inputSeconds: nextRem % 60,
              };
            } else {
              if (t.intervalId) {
                clearInterval(t.intervalId);
              }

              return {
                ...t,
                isRunning: false,
                intervalId: null,
              };
            }
          });
        }, 1000);

        return {
          ...timer,
          isRunning: true,
          intervalId: interval,
        };
      }
    });
  }

  function resetTimer(id: string) {
    timers = timers.map((t) => {
      if (t.id !== id) return t;

      if (t.intervalId) {
        clearInterval(t.intervalId);
      }

      return {
        ...t,
        remainingSeconds: t.totalSeconds,
        isRunning: false,
        intervalId: null,
      };
    });
  }

  function formatTime(totalSec: number) {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    if (h > 0) {
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  // =============================================================
  // 2. 스톱워치 모듈
  // =============================================================

  type StopwatchItem = {
    id: string;
    title: string;
    elapsedSeconds: number;
    isRunning: boolean;
    intervalId: ReturnType<typeof setInterval> | null;
    laps: number[];
  };

  let stopwatches = $state<StopwatchItem[]>([]);

  function addStopwatch() {
    const newId = `sw-${Date.now()}`;

    stopwatches = [
      ...stopwatches,
      {
        id: newId,
        title: `스톱워치 ${stopwatches.length + 1}`,
        elapsedSeconds: 0,
        isRunning: false,
        intervalId: null,
        laps: [],
      },
    ];

    if (isWorkspaceCollapsed) {
      isWorkspaceCollapsed = false;
    }

    addWorkspaceNode("stopwatch", newId);
  }

  function removeStopwatch(id: string) {
    const target = stopwatches.find((s) => s.id === id);

    if (target?.intervalId) {
      clearInterval(target.intervalId);
    }

    stopwatches = stopwatches.filter((s) => s.id !== id);

    removeWorkspaceNode(id);
  }

  function toggleStopwatch(id: string) {
    stopwatches = stopwatches.map((sw) => {
      if (sw.id !== id) return sw;

      if (sw.isRunning) {
        if (sw.intervalId) {
          clearInterval(sw.intervalId);
        }

        return {
          ...sw,
          isRunning: false,
          intervalId: null,
        };
      } else {
        const interval = setInterval(() => {
          stopwatches = stopwatches.map((s) =>
            s.id === id
              ? {
                  ...s,
                  elapsedSeconds: s.elapsedSeconds + 1,
                }
              : s,
          );
        }, 1000);

        return {
          ...sw,
          isRunning: true,
          intervalId: interval,
        };
      }
    });
  }

  function resetStopwatch(id: string) {
    stopwatches = stopwatches.map((sw) => {
      if (sw.id !== id) return sw;

      if (sw.intervalId) {
        clearInterval(sw.intervalId);
      }

      return {
        ...sw,
        elapsedSeconds: 0,
        isRunning: false,
        intervalId: null,
        laps: [],
      };
    });
  }

  function recordLap(id: string) {
    stopwatches = stopwatches.map((sw) => {
      if (sw.id !== id) return sw;

      return {
        ...sw,
        laps: [sw.elapsedSeconds, ...sw.laps],
      };
    });
  }

  // =============================================================
  // 3. 통합 단위 변환기
  // =============================================================

  type UnitCategory =
    | "volume"
    | "weight"
    | "temperature"
    | "length"
    | "energy";

  type UnitDef = {
    label: string;
    value: string;
    toBase: (v: number) => number;
    fromBase: (v: number) => number;
  };

  const unitCatalog: Record<UnitCategory, UnitDef[]> = {
    volume: [
      {
        label: "밀리리터 (ml)",
        value: "ml",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        label: "리터 (l)",
        value: "l",
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
      {
        label: "계량컵 (200ml)",
        value: "cup",
        toBase: (v) => v * 200,
        fromBase: (v) => v / 200,
      },
      {
        label: "미국 컵 (240ml)",
        value: "us_cup",
        toBase: (v) => v * 240,
        fromBase: (v) => v / 240,
      },
      {
        label: "큰술 (tbsp-15ml)",
        value: "tbsp",
        toBase: (v) => v * 15,
        fromBase: (v) => v / 15,
      },
      {
        label: "작은술 (tsp-5ml)",
        value: "tsp",
        toBase: (v) => v * 5,
        fromBase: (v) => v / 5,
      },
      {
        label: "액체 온스 (fl oz)",
        value: "floz",
        toBase: (v) => v * 29.5735,
        fromBase: (v) => v / 29.5735,
      },
    ],

    weight: [
      {
        label: "그램 (g)",
        value: "g",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        label: "킬로그램 (kg)",
        value: "kg",
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
      {
        label: "온스 (oz)",
        value: "oz",
        toBase: (v) => v * 28.3495,
        fromBase: (v) => v / 28.3495,
      },
      {
        label: "파운드 (lb)",
        value: "lb",
        toBase: (v) => v * 453.592,
        fromBase: (v) => v / 453.592,
      },
    ],

    temperature: [
      {
        label: "섭씨 (°C)",
        value: "c",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        label: "화씨 (°F)",
        value: "f",
        toBase: (v) => (v - 32) * (5 / 9),
        fromBase: (v) => v * (9 / 5) + 32,
      },
    ],

    length: [
      {
        label: "센티미터 (cm)",
        value: "cm",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        label: "인치 (inch)",
        value: "inch",
        toBase: (v) => v * 2.54,
        fromBase: (v) => v / 2.54,
      },
    ],

    energy: [
      {
        label: "킬로칼로리 (kcal)",
        value: "kcal",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        label: "킬로줄 (kJ)",
        value: "kj",
        toBase: (v) => v / 4.184,
        fromBase: (v) => v * 4.184,
      },
    ],
  };

  type ConverterItem = {
    id: string;
    title: string;
    category: UnitCategory;
    fromUnit: string;
    toUnit: string;
    inputValue: number;
  };

  let converters = $state<ConverterItem[]>([
    {
      id: "conv-1",
      title: "단위 변환기",
      category: "volume",
      fromUnit: "cup",
      toUnit: "ml",
      inputValue: 1,
    },
  ]);

  function addConverter() {
    const newId = `conv-${Date.now()}`;

    converters = [
      ...converters,
      {
        id: newId,
        title: `단위 변환기 ${converters.length + 1}`,
        category: "volume",
        fromUnit: "cup",
        toUnit: "ml",
        inputValue: 1,
      },
    ];

    if (isWorkspaceCollapsed) {
      isWorkspaceCollapsed = false;
    }

    addWorkspaceNode("converter", newId);
  }

  function removeConverter(id: string) {
    converters = converters.filter((c) => c.id !== id);

    removeWorkspaceNode(id);
  }

  function onCategoryChange(
    convId: string,
    newCategory: UnitCategory,
  ) {
    converters = converters.map((c) => {
      if (c.id !== convId) return c;

      const units = unitCatalog[newCategory];

      return {
        ...c,
        category: newCategory,
        fromUnit: units[0].value,
        toUnit: units[1]
          ? units[1].value
          : units[0].value,
      };
    });
  }

  function calculateResult(conv: ConverterItem): string {
    const units = unitCatalog[conv.category];

    const fromDef = units.find(
      (u) => u.value === conv.fromUnit,
    );

    const toDef = units.find(
      (u) => u.value === conv.toUnit,
    );

    if (!fromDef || !toDef) return "0";

    const baseVal = fromDef.toBase(
      conv.inputValue || 0,
    );

    const res = toDef.fromBase(baseVal);

    if (Number.isNaN(res)) return "0";

    return Number.isInteger(res)
      ? res.toString()
      : res.toFixed(2);
  }

  // =============================================================
  // 4. 인분 및 재료 비율 계산기
  // =============================================================

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

  let scalers = $state<ScalerItem[]>([]);

  function addScaler() {
    const newId = `scaler-${Date.now()}`;

    scalers = [
      ...scalers,
      {
        id: newId,
        title: "재료 분량 계산기",
        baseServings: 2,
        targetServings: 4,
        ingredients: [
          {
            id: `ing-${Date.now()}-1`,
            name: "진간장",
            amount: 3,
            unit: "큰술",
          },
          {
            id: `ing-${Date.now()}-2`,
            name: "설탕",
            amount: 1.5,
            unit: "큰술",
          },
          {
            id: `ing-${Date.now()}-3`,
            name: "다진마늘",
            amount: 1,
            unit: "작은술",
          },
        ],
      },
    ];

    if (isWorkspaceCollapsed) {
      isWorkspaceCollapsed = false;
    }

    addWorkspaceNode("scaler", newId);
  }

  function removeScaler(id: string) {
    scalers = scalers.filter((s) => s.id !== id);

    removeWorkspaceNode(id);
  }

  function addIngredient(scalerId: string) {
    scalers = scalers.map((s) => {
      if (s.id !== scalerId) return s;

      return {
        ...s,
        ingredients: [
          ...s.ingredients,
          {
            id: `ing-${Date.now()}`,
            name: "",
            amount: 1,
            unit: "g",
          },
        ],
      };
    });
  }

  function removeIngredient(
    scalerId: string,
    ingId: string,
  ) {
    scalers = scalers.map((s) => {
      if (s.id !== scalerId) return s;

      return {
        ...s,
        ingredients: s.ingredients.filter(
          (i) => i.id !== ingId,
        ),
      };
    });
  }

  // =============================================================
  // 5. 요리 메모장
  // =============================================================

  type NoteItem = {
    id: string;
    title: string;
    content: string;
  };

  let notes = $state<NoteItem[]>([]);

  function addNote() {
    const newId = `note-${Date.now()}`;

    notes = [
      ...notes,
      {
        id: newId,
        title: "조리 메모",
        content: "",
      },
    ];

    if (isWorkspaceCollapsed) {
      isWorkspaceCollapsed = false;
    }

    addWorkspaceNode("note", newId);
  }

  function removeNote(id: string) {
    notes = notes.filter((n) => n.id !== id);

    removeWorkspaceNode(id);
  }

  // =============================================================
  // 6. 밥물 비율 계산기
  // =============================================================

  type RiceItem = {
    id: string;
    riceType:
      | "white"
      | "brown"
      | "mixed"
      | "sushi";
    cupCount: number;
  };

  let riceCalculators = $state<RiceItem[]>([]);

  function addRiceCalc() {
    const newId = `rice-${Date.now()}`;

    riceCalculators = [
      ...riceCalculators,
      {
        id: newId,
        riceType: "white",
        cupCount: 2,
      },
    ];

    if (isWorkspaceCollapsed) {
      isWorkspaceCollapsed = false;
    }

    addWorkspaceNode("rice", newId);
  }

  function removeRiceCalc(id: string) {
    riceCalculators = riceCalculators.filter(
      (r) => r.id !== id,
    );

    removeWorkspaceNode(id);
  }

  function getWaterRecommendation(
    type: string,
    cups: number,
  ) {
    const mlPerCup = 180;

    let ratio = 1.1;

    if (type === "brown") ratio = 1.4;
    if (type === "mixed") ratio = 1.3;
    if (type === "sushi") ratio = 1.0;

    const totalWaterMl = Math.round(
      cups * mlPerCup * ratio,
    );

    return {
      ml: totalWaterMl,
      cupRatio: ratio,
    };
  }

  // =============================================================
  // 7. 고기 익힘 내부 온도 가이드
  // =============================================================

  type TempGuideItem = {
    id: string;
    meatType:
      | "beef"
      | "pork"
      | "chicken"
      | "fish";
  };

  let tempGuides = $state<TempGuideItem[]>([]);

  function addTempGuide() {
    const newId = `temp-${Date.now()}`;

    tempGuides = [
      ...tempGuides,
      {
        id: newId,
        meatType: "beef",
      },
    ];

    if (isWorkspaceCollapsed) {
      isWorkspaceCollapsed = false;
    }

    addWorkspaceNode("temperature", newId);
  }

  function removeTempGuide(id: string) {
    tempGuides = tempGuides.filter(
      (t) => t.id !== id,
    );

    removeWorkspaceNode(id);
  }

  // =============================================================
  // 8. 식재료 대체 가이드
  // =============================================================

  type SubstItem = {
    id: string;
    searchKey: string;
  };

  let substGuides = $state<SubstItem[]>([]);

  const substitutionDB: Record<string, string> = {
    맛술: "청주 + 설탕 약간 또는 사과식초 + 물",
    굴소스:
      "간장 1큰술 + 굴소스 대체용 꿀/설탕 반큰술 + 조미료 약간",
    버터: "식용유 또는 마가린 (1:1 비율)",
    생크림: "우유 200ml + 버터 50g 융합",
    빵가루: "식빵 갈아서 사용 또는 크래커 가루",
    레몬즙:
      "식초 (원래 레몬즙 양의 절반)",
  };

  function addSubstGuide() {
    const newId = `subst-${Date.now()}`;

    substGuides = [
      ...substGuides,
      {
        id: newId,
        searchKey: "맛술",
      },
    ];

    if (isWorkspaceCollapsed) {
      isWorkspaceCollapsed = false;
    }

    addWorkspaceNode("substitution", newId);
  }

  function removeSubstGuide(id: string) {
    substGuides = substGuides.filter(
      (s) => s.id !== id,
    );

    removeWorkspaceNode(id);
  }

  // =============================================================
  // 9. 음성 컨트롤
  // =============================================================

  let isListening = $state(false);
  let voiceStatusText = $state(
    "음성 명령 대기 중...",
  );

  let recognition: any = null;

  function toggleVoiceControl() {
    if (typeof window === "undefined") return;

    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert(
        "이 브라우저는 음성 인식을 지원하지 않습니다.",
      );
      return;
    }

    if (isListening) {
      if (recognition) {
        recognition.stop();
      }

      isListening = false;
      voiceStatusText = "음성 인식 종료됨";

      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    recognition = new SpeechRecognition();

    recognition.lang = "ko-KR";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isListening = true;
      voiceStatusText =
        '듣고 있습니다... ("시작", "정지", "리셋")';
    };

    recognition.onresult = (event: any) => {
      const lastResult =
        event.results[event.results.length - 1];

      if (lastResult.isFinal) {
        const command =
          lastResult[0].transcript.trim();

        voiceStatusText = `인식됨: "${command}"`;

        if (
          command.includes("시작") ||
          command.includes("출발")
        ) {
          if (timers.length > 0) {
            toggleTimer(timers[0].id);
          }
        } else if (
          command.includes("정지") ||
          command.includes("멈춰") ||
          command.includes("일시정지")
        ) {
          if (
            timers.length > 0 &&
            timers[0].isRunning
          ) {
            toggleTimer(timers[0].id);
          }
        } else if (
          command.includes("리셋") ||
          command.includes("초기화")
        ) {
          if (timers.length > 0) {
            resetTimer(timers[0].id);
          }
        }
      }
    };

    recognition.onerror = () => {
      voiceStatusText = "음성 인식 오류 발생";
      isListening = false;
    };

    recognition.onend = () => {
      isListening = false;
    };

    recognition.start();
  }

  // =============================================================
  // 초기화 / 정리
  // =============================================================

  onDestroy(() => {
    if (recognition) {
      recognition.stop();
    }

    timers.forEach((timer) => {
      if (timer.intervalId) {
        clearInterval(timer.intervalId);
      }
    });

    stopwatches.forEach((sw) => {
      if (sw.intervalId) {
        clearInterval(sw.intervalId);
      }
    });

    window.removeEventListener(
      "mousemove",
      handleMouseMove,
    );

    window.removeEventListener(
      "mouseup",
      stopResizing,
    );

    window.removeEventListener(
      "mousemove",
      handleNodeDrag,
    );

    window.removeEventListener(
      "mouseup",
      stopNodeDrag,
    );

    window.removeEventListener(
      "mousemove",
      handlePanning,
    );

    window.removeEventListener(
      "mouseup",
      stopPanning,
    );
  });
</script>

<!-- =============================================================
     우측 요리 워크스페이스
============================================================= -->

<aside
  class="workspace-panel"
  class:collapsed={isWorkspaceCollapsed}
  class:resizing={isResizing}
  style={!isWorkspaceCollapsed
    ? `width: ${workspaceWidth}px;`
    : ""}
>
  {#if !isWorkspaceCollapsed}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="resizer"
      onmousedown={startResizing}
    ></div>
  {/if}

  <!-- ===========================================================
       Panel Header
  ============================================================ -->

  <div class="panel-header">
    <div class="header-left">
      <div class="workspace-title-row">
        <div class="workspace-dot"></div>
        <h2>요리 워크스페이스</h2>
      </div>

      <div class="workspace-subtitle">
        요리를 완성하는 당신만의 실험실
      </div>
    </div>

    <div class="header-actions">
      {#if !isWorkspaceCollapsed}
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

          <button
            type="button"
            class="zoom-label"
            onclick={resetView}
          >
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
      {/if}

      <button
        type="button"
        class="collapse-btn"
        onclick={() =>
          (isWorkspaceCollapsed =
            !isWorkspaceCollapsed)}
        aria-label={
          isWorkspaceCollapsed
            ? "워크스페이스 펼치기"
            : "워크스페이스 접기"
        }
      >
        {#if isWorkspaceCollapsed}
          <svg viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        {:else}
          <svg viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        {/if}
      </button>
    </div>
  </div>

  {#if !isWorkspaceCollapsed}
    <div class="workspace-body">
      {#if isListening}
        <div class="voice-status-bar">
          <span class="pulse-dot"></span>
          <span>{voiceStatusText}</span>
        </div>
      {/if}

      <!-- =======================================================
           2D Sandbox Viewport
      ======================================================== -->

      <!-- svelte-ignore a11y_no_static_element_interactions -->
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

        <!--
          실제 월드.
          모든 노드는 이 레이어 안에서 x / y 좌표로 움직인다.
        -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="sandbox-world"
          style={`transform: translate3d(${panX}px, ${panY}px, 0) scale(${zoom});`}
          onmousedown={(e) => {
            if (e.target === e.currentTarget) {
              startPanning(e);
            }
          }}
        >
          <!-- 빈 공간 안내 -->
          {#if nodes.length === 0}
            <div class="empty-state">
              <div class="empty-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </div>

              <strong>요리 작업판이 비어 있습니다</strong>

              <span>
                오른쪽 도구 모음에서 모듈을 추가하고<br />
                원하는 위치로 자유롭게 옮겨보세요.
              </span>
            </div>
          {/if}

          <!-- ===================================================
               Workspace Nodes
          ==================================================== -->

          {#each nodes as node (node.id)}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="workspace-node"
              class:selected={selectedNodeId === node.id}
              class:dragging={draggingNodeId === node.id}
              style={`left:${node.x}px; top:${node.y}px; z-index:${node.zIndex};`}
              onmousedown={(e) =>
                startNodeDrag(node.id, e)}
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

                <span class="node-type-label">
                  {#if node.type === "timer"}
                    타이머
                  {:else if node.type === "stopwatch"}
                    스톱워치
                  {:else if node.type === "converter"}
                    단위
                  {:else if node.type === "scaler"}
                    분량
                  {:else if node.type === "rice"}
                    밥물
                  {:else if node.type === "temperature"}
                    온도
                  {:else if node.type === "substitution"}
                    대체
                  {:else if node.type === "note"}
                    메모
                  {/if}
                </span>
              </div>

              {#if node.type === "timer"}
                {@const timer = timers.find(
                  (item) => item.id === node.id,
                )}

                {#if timer}
                  <TimerTool
                    {timer}
                    onRemove={removeTimer}
                    onAddTime={addTimeToTimer}
                    onApplyCustomTime={applyCustomTime}
                    onToggle={toggleTimer}
                    onReset={resetTimer}
                    {formatTime}
                  />
                {/if}
              {:else if node.type === "stopwatch"}
                {@const stopwatch =
                  stopwatches.find(
                    (item) => item.id === node.id,
                  )}

                {#if stopwatch}
                  <StopwatchTool
                    {stopwatch}
                    onRemove={removeStopwatch}
                    onToggle={toggleStopwatch}
                    onReset={resetStopwatch}
                    onRecordLap={recordLap}
                    {formatTime}
                  />
                {/if}
              {:else if node.type === "converter"}
                {@const converter =
                  converters.find(
                    (item) => item.id === node.id,
                  )}

                {#if converter}
                  <ConverterTool
                    {converter}
                    {unitCatalog}
                    onRemove={removeConverter}
                    {onCategoryChange}
                    {calculateResult}
                  />
                {/if}
              {:else if node.type === "scaler"}
                {@const scaler = scalers.find(
                  (item) => item.id === node.id,
                )}

                {#if scaler}
                  <ScalerTool
                    {scaler}
                    onRemove={removeScaler}
                    onAddIngredient={addIngredient}
                    onRemoveIngredient={removeIngredient}
                  />
                {/if}
              {:else if node.type === "rice"}
                {@const rice = riceCalculators.find(
                  (item) => item.id === node.id,
                )}

                {#if rice}
                  <RiceCalculatorTool
                    {rice}
                    onRemove={removeRiceCalc}
                    {getWaterRecommendation}
                  />
                {/if}
              {:else if node.type === "temperature"}
                {@const guide = tempGuides.find(
                  (item) => item.id === node.id,
                )}

                {#if guide}
                  <TempGuideTool
                    {guide}
                    onRemove={removeTempGuide}
                  />
                {/if}
              {:else if node.type === "substitution"}
                {@const guide = substGuides.find(
                  (item) => item.id === node.id,
                )}

                {#if guide}
                  <SubstitutionTool
                    {guide}
                    {substitutionDB}
                    onRemove={removeSubstGuide}
                  />
                {/if}
              {:else if node.type === "note"}
                {@const note = notes.find(
                  (item) => item.id === node.id,
                )}

                {#if note}
                  <CookingNoteTool
                    {note}
                    onRemove={removeNote}
                  />
                {/if}
              {/if}
            </div>
          {/each}
        </div>

        <!-- =====================================================
             Canvas Help
        ====================================================== -->

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
  {/if}
</aside>

<!-- =============================================================
     우측 툴바
============================================================= -->

<nav
  class="side-toolbar"
  aria-label="요리 도구 모음"
>
  <div class="toolbar-top">
    <!-- Workspace Toggle -->

    <div class="tool-item">
      <button
        type="button"
        class="tool-icon-btn workspace-toggle-btn"
        onclick={() =>
          (isWorkspaceCollapsed =
            !isWorkspaceCollapsed)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="custom-tooltip">
        {isWorkspaceCollapsed
          ? "워크스페이스 펼치기"
          : "워크스페이스 접기"}
      </div>
    </div>

    <!-- =========================================================
         Timer
    ========================================================== -->

    {#if !isWorkspaceCollapsed}
      <div class="toolbar-divider"></div>

      <div class="tool-item">
        <button
          type="button"
          class="tool-icon-btn"
          onclick={addTimer}
        >
          <svg viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
            />
            <path d="M12 6v6l4 2" />
          </svg>
        </button>

        <div class="custom-tooltip">
          타이머 추가
        </div>
      </div>

      <!-- Stopwatch -->

      <div class="tool-item">
        <button
          type="button"
          class="tool-icon-btn"
          onclick={addStopwatch}
        >
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
        </button>

        <div class="custom-tooltip">
          스톱워치 추가
        </div>
      </div>

      <!-- Converter -->

      <div class="tool-item">
        <button
          type="button"
          class="tool-icon-btn"
          onclick={addConverter}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6"
            />
          </svg>
        </button>

        <div class="custom-tooltip">
          단위 변환기 추가
        </div>
      </div>

      <!-- Scaler -->

      <div class="tool-item">
        <button
          type="button"
          class="tool-icon-btn"
          onclick={addScaler}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
            />

            <circle
              cx="9"
              cy="7"
              r="4"
            />

            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />

            <path
              d="M16 3.13a4 4 0 0 1 0 7.75"
            />
          </svg>
        </button>

        <div class="custom-tooltip">
          재료 / 인분 계산기
        </div>
      </div>

      <!-- Rice -->

      <div class="tool-item">
        <button
          type="button"
          class="tool-icon-btn"
          onclick={addRiceCalc}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            />
          </svg>
        </button>

        <div class="custom-tooltip">
          밥물 맞추기
        </div>
      </div>

      <!-- Temperature -->

      <div class="tool-item">
        <button
          type="button"
          class="tool-icon-btn"
          onclick={addTempGuide}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"
            />
          </svg>
        </button>

        <div class="custom-tooltip">
          고기 적정 온도 가이드
        </div>
      </div>

      <!-- Substitution -->

      <div class="tool-item">
        <button
          type="button"
          class="tool-icon-btn"
          onclick={addSubstGuide}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            />
          </svg>
        </button>

        <div class="custom-tooltip">
          식재료 대체 가이드
        </div>
      </div>

      <!-- Note -->

      <div class="tool-item">
        <button
          type="button"
          class="tool-icon-btn"
          onclick={addNote}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            />
            <path
              d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
            />
          </svg>
        </button>

        <div class="custom-tooltip">
          요리 메모장
        </div>
      </div>

      <!-- Voice -->

      <div class="tool-item">
        <button
          type="button"
          class="tool-icon-btn"
          class:active-mic={isListening}
          onclick={toggleVoiceControl}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
            />
            <path
              d="M19 10v2a7 7 0 0 1-14 0v-2"
            />
            <line
              x1="12"
              y1="19"
              x2="12"
              y2="23"
            />
            <line
              x1="8"
              y1="23"
              x2="16"
              y2="23"
            />
          </svg>
        </button>

        <div class="custom-tooltip">
          {isListening
            ? "음성 컨트롤 끄기"
            : "음성 컨트롤 켜기"}
        </div>
      </div>
    {/if}
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

  /* ============================================================
     Workspace Panel
  ============================================================ */

  .workspace-panel {
    position: relative;
    height: 100%;
    min-height: 0;
    border-right: 1px solid var(--border);
    background: var(--surface-subtle);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow: hidden;
    transition:
      width 0.18s ease,
      opacity 0.18s ease;
  }

  .workspace-panel.collapsed {
    width: 0 !important;
    min-width: 0;
    overflow: hidden;
    border-right: 0;
  }

  .workspace-panel.resizing {
    transition: none;
  }

  /* ============================================================
     Resizer
  ============================================================ */

  .resizer {
    position: absolute;
    top: 0;
    left: -4px;
    width: 8px;
    height: 100%;
    cursor: col-resize;
    z-index: 100;
    transition: background 0.15s;
  }

  .resizer:hover {
    background: var(--border-accent);
  }

  /* ============================================================
     Header
  ============================================================ */

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
    box-shadow: 0 0 0 4px
      color-mix(
        in srgb,
        var(--accent) 12%,
        transparent
      );
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
  .zoom-label,
  .collapse-btn {
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
  .zoom-label:hover,
  .collapse-btn:hover {
    background: var(--surface-subtle);
    color: var(--accent);
  }

  .collapse-btn {
    width: 30px;
    height: 30px;
    margin-left: 2px;
  }

  .collapse-btn svg {
    width: 16px;
    height: 16px;
  }

  /* ============================================================
     Body
  ============================================================ */

  .workspace-body {
    position: relative;
    flex: 1;
    min-height: 0;

    display: flex;
    flex-direction: column;

    overflow: hidden;
  }

  .voice-status-bar {
    position: absolute;
    top: 12px;
    left: 12px;
    right: 12px;

    z-index: 500;

    background: #1e293b;
    color: #ffffff;

    padding: 8px 12px;
    border-radius: 8px;

    font-size: 12px;

    display: flex;
    align-items: center;
    gap: 8px;

    box-shadow:
      0 6px 18px rgba(0, 0, 0, 0.12);
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    flex: 0 0 auto;

    background: #ef4444;
    border-radius: 50%;

    animation: blink 1s infinite;
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

  /* ============================================================
     2D Viewport
  ============================================================ */

  .sandbox-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;

    overflow: hidden;

    cursor: grab;

    background:
      var(--surface-subtle);

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

    background-image:
      linear-gradient(
        to right,
        color-mix(
            in srgb,
            var(--border) 55%,
            transparent
          )
          1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        color-mix(
            in srgb,
            var(--border) 55%,
            transparent
          )
          1px,
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

  /* ============================================================
     Node
  ============================================================ */

  .workspace-node {
    position: absolute;

    width: 320px;

    cursor: grab;

    transform-origin: center center;

    user-select: none;

    filter:
      drop-shadow(
        0 4px 16px
          rgba(0, 0, 0, 0.07)
      );

    transition:
      box-shadow 0.15s ease,
      filter 0.15s ease;
  }

  .workspace-node:hover {
    filter:
      drop-shadow(
        0 8px 24px
          rgba(0, 0, 0, 0.11)
      );
  }

  .workspace-node.selected {
    filter:
      drop-shadow(
        0 8px 26px
          color-mix(
            in srgb,
            var(--accent) 18%,
            transparent
          )
      );
  }

  .workspace-node.dragging {
    cursor: grabbing;

    filter:
      drop-shadow(
        0 16px 34px
          rgba(0, 0, 0, 0.18)
      );
  }

  /* ============================================================
     Node Drag Header
  ============================================================ */

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

    border:
      1px solid
      color-mix(
        in srgb,
        var(--border) 80%,
        transparent
      );

    background:
      color-mix(
        in srgb,
        var(--surface) 90%,
        transparent
      );

    border-radius: 0 0 6px 6px;

    backdrop-filter: blur(8px);
  }

  .node-handle-dots span {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--text-subtle);
  }

  .node-type-label {
    position: absolute;
    right: 7px;

    padding: 3px 6px;

    border:
      1px solid
      color-mix(
        in srgb,
        var(--border) 80%,
        transparent
      );

    background:
      color-mix(
        in srgb,
        var(--surface) 90%,
        transparent
      );

    border-radius: 5px;

    color: var(--text-subtle);

    font-size: 9px;
    font-weight: 700;
    line-height: 1;

    backdrop-filter: blur(8px);
  }

  /* ============================================================
     Empty State
  ============================================================ */

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

  /* ============================================================
     Canvas Hint
  ============================================================ */

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

    background:
      color-mix(
        in srgb,
        var(--surface) 90%,
        transparent
      );

    border:
      1px solid
      color-mix(
        in srgb,
        var(--border) 80%,
        transparent
      );

    border-radius: 8px;

    font-size: 9px;

    white-space: nowrap;

    box-shadow:
      0 4px 14px rgba(0, 0, 0, 0.05);

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

  /* ============================================================
     Side Toolbar
  ============================================================ */

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

  .tool-icon-btn.active-mic {
    color: #ef4444;
    background: #fee2e2;

    animation: pulse-bg 1.5s infinite;
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

  .workspace-toggle-btn {
    color: var(--text);
  }

  /* ============================================================
     Tooltip
  ============================================================ */

  .custom-tooltip {
    position: absolute;

    right: 48px;
    top: 50%;

    transform:
      translateY(-50%)
      translateX(6px);

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

    box-shadow:
      0 4px 12px var(--shadow-menu);

    z-index: 2000;
  }

  .custom-tooltip::after {
    content: "";

    position: absolute;

    right: -4px;
    top: 50%;

    transform: translateY(-50%);

    border-width:
      4px 0
      4px 4px;

    border-style: solid;

    border-color:
      transparent
      transparent
      transparent
      var(--text);
  }

  .tool-item:hover .custom-tooltip {
    opacity: 1;
    visibility: visible;

    transform:
      translateY(-50%)
      translateX(0);
  }

  /* ============================================================
     Responsive
  ============================================================ */

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