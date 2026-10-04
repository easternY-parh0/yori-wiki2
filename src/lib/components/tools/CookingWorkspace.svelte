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

  // Workspace Panel Resizing State
  let isWorkspaceCollapsed = $state(false);
  let workspaceWidth = $state(520);
  let isResizing = $state(false);

  function startResizing(e: MouseEvent) {
    e.preventDefault();
    isResizing = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isResizing) return;

    const newWidth = window.innerWidth - 48 - e.clientX;

    if (newWidth >= 280 && newWidth <= window.innerWidth * 0.75) {
      workspaceWidth = newWidth;
    }
  }

  function stopResizing() {
    isResizing = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResizing);
  }

  // -------------------------------------------------------------
  // 1. 타이머 모듈
  // -------------------------------------------------------------
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

    if (isWorkspaceCollapsed) isWorkspaceCollapsed = false;
  }

  function removeTimer(id: string) {
    const target = timers.find((t) => t.id === id);

    if (target?.intervalId) {
      clearInterval(target.intervalId);
    }

    timers = timers.filter((t) => t.id !== id);
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

  // -------------------------------------------------------------
  // 2. 스톱워치 모듈
  // -------------------------------------------------------------
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
    stopwatches = [
      ...stopwatches,
      {
        id: `sw-${Date.now()}`,
        title: `스톱워치 ${stopwatches.length + 1}`,
        elapsedSeconds: 0,
        isRunning: false,
        intervalId: null,
        laps: [],
      },
    ];

    if (isWorkspaceCollapsed) isWorkspaceCollapsed = false;
  }

  function removeStopwatch(id: string) {
    const target = stopwatches.find((s) => s.id === id);

    if (target?.intervalId) {
      clearInterval(target.intervalId);
    }

    stopwatches = stopwatches.filter((s) => s.id !== id);
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

  // -------------------------------------------------------------
  // 3. 통합 단위 변환기 모듈
  // -------------------------------------------------------------
  type UnitCategory = "volume" | "weight" | "temperature" | "length" | "energy";

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
    converters = [
      ...converters,
      {
        id: `conv-${Date.now()}`,
        title: `단위 변환기 ${converters.length + 1}`,
        category: "volume",
        fromUnit: "cup",
        toUnit: "ml",
        inputValue: 1,
      },
    ];

    if (isWorkspaceCollapsed) isWorkspaceCollapsed = false;
  }

  function removeConverter(id: string) {
    converters = converters.filter((c) => c.id !== id);
  }

  function onCategoryChange(convId: string, newCategory: UnitCategory) {
    converters = converters.map((c) => {
      if (c.id !== convId) return c;

      const units = unitCatalog[newCategory];

      return {
        ...c,
        category: newCategory,
        fromUnit: units[0].value,
        toUnit: units[1] ? units[1].value : units[0].value,
      };
    });
  }

  function calculateResult(conv: ConverterItem): string {
    const units = unitCatalog[conv.category];
    const fromDef = units.find((u) => u.value === conv.fromUnit);
    const toDef = units.find((u) => u.value === conv.toUnit);

    if (!fromDef || !toDef) return "0";

    const baseVal = fromDef.toBase(conv.inputValue || 0);
    const res = toDef.fromBase(baseVal);

    if (Number.isNaN(res)) return "0";

    return Number.isInteger(res) ? res.toString() : res.toFixed(2);
  }

  // -------------------------------------------------------------
  // 4. 인분 및 재료 비율 계산기
  // -------------------------------------------------------------
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
    scalers = [
      ...scalers,
      {
        id: `scaler-${Date.now()}`,
        title: "재료 분량 계산기",
        baseServings: 2,
        targetServings: 4,
        ingredients: [
          {
            id: "ing-1",
            name: "진간장",
            amount: 3,
            unit: "큰술",
          },
          {
            id: "ing-2",
            name: "설탕",
            amount: 1.5,
            unit: "큰술",
          },
          {
            id: "ing-3",
            name: "다진마늘",
            amount: 1,
            unit: "작은술",
          },
        ],
      },
    ];

    if (isWorkspaceCollapsed) isWorkspaceCollapsed = false;
  }

  function removeScaler(id: string) {
    scalers = scalers.filter((s) => s.id !== id);
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

  function removeIngredient(scalerId: string, ingId: string) {
    scalers = scalers.map((s) => {
      if (s.id !== scalerId) return s;

      return {
        ...s,
        ingredients: s.ingredients.filter((i) => i.id !== ingId),
      };
    });
  }

  // -------------------------------------------------------------
  // 5. 요리 메모장 모듈
  // -------------------------------------------------------------
  type NoteItem = {
    id: string;
    title: string;
    content: string;
  };

  let notes = $state<NoteItem[]>([]);

  function addNote() {
    notes = [
      ...notes,
      {
        id: `note-${Date.now()}`,
        title: "조리 메모",
        content: "",
      },
    ];

    if (isWorkspaceCollapsed) isWorkspaceCollapsed = false;
  }

  function removeNote(id: string) {
    notes = notes.filter((n) => n.id !== id);
  }

  // -------------------------------------------------------------
  // 6. 밥물 비율 계산기
  // -------------------------------------------------------------
  type RiceItem = {
    id: string;
    riceType: "white" | "brown" | "mixed" | "sushi";
    cupCount: number;
  };

  let riceCalculators = $state<RiceItem[]>([]);

  function addRiceCalc() {
    riceCalculators = [
      ...riceCalculators,
      {
        id: `rice-${Date.now()}`,
        riceType: "white",
        cupCount: 2,
      },
    ];

    if (isWorkspaceCollapsed) isWorkspaceCollapsed = false;
  }

  function removeRiceCalc(id: string) {
    riceCalculators = riceCalculators.filter((r) => r.id !== id);
  }

  function getWaterRecommendation(type: string, cups: number) {
    const mlPerCup = 180;
    let ratio = 1.1;

    if (type === "brown") ratio = 1.4;
    if (type === "mixed") ratio = 1.3;
    if (type === "sushi") ratio = 1.0;

    const totalWaterMl = Math.round(cups * mlPerCup * ratio);

    return {
      ml: totalWaterMl,
      cupRatio: ratio,
    };
  }

  // -------------------------------------------------------------
  // 7. 고기 익힘 내부 온도 가이드
  // -------------------------------------------------------------
  type TempGuideItem = {
    id: string;
    meatType: "beef" | "pork" | "chicken" | "fish";
  };

  let tempGuides = $state<TempGuideItem[]>([]);

  function addTempGuide() {
    tempGuides = [
      ...tempGuides,
      {
        id: `temp-${Date.now()}`,
        meatType: "beef",
      },
    ];

    if (isWorkspaceCollapsed) isWorkspaceCollapsed = false;
  }

  function removeTempGuide(id: string) {
    tempGuides = tempGuides.filter((t) => t.id !== id);
  }

  // -------------------------------------------------------------
  // 8. 식재료 대체 가이드
  // -------------------------------------------------------------
  type SubstItem = {
    id: string;
    searchKey: string;
  };

  let substGuides = $state<SubstItem[]>([]);

  const substitutionDB: Record<string, string> = {
    맛술: "청주 + 설탕 약간 또는 사과식초 + 물",
    굴소스: "간장 1큰술 + 굴소스 대체용 꿀/설탕 반큰술 + 조미료 약간",
    버터: "식용유 또는 마가린 (1:1 비율)",
    생크림: "우유 200ml + 버터 50g 융합",
    빵가루: "식빵 갈아서 사용 또는 크래커 가루",
    레몬즙: "식초 (원래 레몬즙 양의 절반)",
  };

  function addSubstGuide() {
    substGuides = [
      ...substGuides,
      {
        id: `subst-${Date.now()}`,
        searchKey: "맛술",
      },
    ];

    if (isWorkspaceCollapsed) isWorkspaceCollapsed = false;
  }

  function removeSubstGuide(id: string) {
    substGuides = substGuides.filter((s) => s.id !== id);
  }

  // -------------------------------------------------------------
  // 9. 음성 컨트롤 제어 모듈 (Web Speech API)
  // -------------------------------------------------------------
  let isListening = $state(false);
  let voiceStatusText = $state("음성 명령 대기 중...");
  let recognition: any = null;

  function toggleVoiceControl() {
    if (typeof window === "undefined") return;

    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    if (isListening) {
      if (recognition) recognition.stop();

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
      voiceStatusText = '듣고 있습니다... ("시작", "정지", "리셋")';
    };

    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];

      if (lastResult.isFinal) {
        const command = lastResult[0].transcript.trim();

        voiceStatusText = `인식됨: "${command}"`;

        if (command.includes("시작") || command.includes("출발")) {
          if (timers.length > 0) {
            toggleTimer(timers[0].id);
          }
        } else if (
          command.includes("정지") ||
          command.includes("멈춰") ||
          command.includes("일시정지")
        ) {
          if (timers.length > 0 && timers[0].isRunning) {
            toggleTimer(timers[0].id);
          }
        } else if (command.includes("리셋") || command.includes("초기화")) {
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

  onDestroy(() => {
    if (recognition) recognition.stop();

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

    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    }
  });
</script>

<!-- 우측 요리 워크스페이스 패널 -->
<aside
  class="workspace-panel"
  class:collapsed={isWorkspaceCollapsed}
  style={!isWorkspaceCollapsed ? `width: ${workspaceWidth}px;` : ""}
>
  {#if !isWorkspaceCollapsed}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resizer" onmousedown={startResizing}></div>
  {/if}

  <div class="panel-header">
    <div class="header-titles">
      <h2>요리 워크스페이스</h2>
    </div>

    <button
      type="button"
      class="collapse-btn"
      onclick={() => (isWorkspaceCollapsed = !isWorkspaceCollapsed)}
    >
      <svg viewBox="0 0 24 24">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>

  {#if !isWorkspaceCollapsed}
    <div class="panel-content">
      {#if isListening}
        <div class="voice-status-bar">
          <span class="pulse-dot"></span>
          <span>{voiceStatusText}</span>
        </div>
      {/if}

      {#each timers as timer (timer.id)}
        <TimerTool
          {timer}
          onRemove={removeTimer}
          onAddTime={addTimeToTimer}
          onApplyCustomTime={applyCustomTime}
          onToggle={toggleTimer}
          onReset={resetTimer}
          {formatTime}
        />
      {/each}

      {#each stopwatches as sw (sw.id)}
        <StopwatchTool
          stopwatch={sw}
          onRemove={removeStopwatch}
          onToggle={toggleStopwatch}
          onReset={resetStopwatch}
          onRecordLap={recordLap}
          {formatTime}
        />
      {/each}

      {#each converters as conv (conv.id)}
        <ConverterTool
          converter={conv}
          {unitCatalog}
          onRemove={removeConverter}
          {onCategoryChange}
          {calculateResult}
        />
      {/each}

      {#each scalers as scaler (scaler.id)}
        <ScalerTool
          {scaler}
          onRemove={removeScaler}
          onAddIngredient={addIngredient}
          onRemoveIngredient={removeIngredient}
        />
      {/each}

      {#each riceCalculators as rc (rc.id)}
        <RiceCalculatorTool
          rice={rc}
          onRemove={removeRiceCalc}
          {getWaterRecommendation}
        />
      {/each}

      {#each tempGuides as tg (tg.id)}
        <TempGuideTool guide={tg} onRemove={removeTempGuide} />
      {/each}

      {#each substGuides as sg (sg.id)}
        <SubstitutionTool
          guide={sg}
          {substitutionDB}
          onRemove={removeSubstGuide}
        />
      {/each}

      {#each notes as note (note.id)}
        <CookingNoteTool {note} onRemove={removeNote} />
      {/each}
    </div>
  {/if}
</aside>

<!-- 우측 테두리 없는 깔끔한 아이콘 툴바 -->
<nav class="side-toolbar" aria-label="요리 도구 모음">
  <div class="toolbar-top">
    <!-- 패널 토글 -->
    <div class="tool-item">
      <button
        type="button"
        class="tool-icon-btn"
        onclick={() => (isWorkspaceCollapsed = !isWorkspaceCollapsed)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="custom-tooltip">
        {isWorkspaceCollapsed ? "워크스페이스 펼치기" : "워크스페이스 접기"}
      </div>
    </div>

    {#if !isWorkspaceCollapsed}
      <!-- 1. 타이머 -->
      <div class="tool-item">
        <button type="button" class="tool-icon-btn" onclick={addTimer}>
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </button>

        <div class="custom-tooltip">타이머 추가</div>
      </div>

      <!-- 2. 스톱워치 -->
      <div class="tool-item">
        <button type="button" class="tool-icon-btn" onclick={addStopwatch}>
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2 2M12 2v3M9 2h6" />
          </svg>
        </button>

        <div class="custom-tooltip">스톱워치 추가</div>
      </div>

      <!-- 3. 단위 변환기 -->
      <div class="tool-item">
        <button type="button" class="tool-icon-btn" onclick={addConverter}>
          <svg viewBox="0 0 24 24">
            <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6" />
          </svg>
        </button>

        <div class="custom-tooltip">단위 변환기 추가</div>
      </div>

      <!-- 4. 인분 계산기 -->
      <div class="tool-item">
        <button type="button" class="tool-icon-btn" onclick={addScaler}>
          <svg viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </button>

        <div class="custom-tooltip">재료/인분 계산기</div>
      </div>

      <!-- 5. 밥물 비율 계산기 -->
      <div class="tool-item">
        <button type="button" class="tool-icon-btn" onclick={addRiceCalc}>
          <svg viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </button>

        <div class="custom-tooltip">밥물 맞추기</div>
      </div>

      <!-- 6. 고기 적정 온도 -->
      <div class="tool-item">
        <button type="button" class="tool-icon-btn" onclick={addTempGuide}>
          <svg viewBox="0 0 24 24">
            <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
          </svg>
        </button>

        <div class="custom-tooltip">고기 적정 온도 가이드</div>
      </div>

      <!-- 7. 식재료 대체 -->
      <div class="tool-item">
        <button type="button" class="tool-icon-btn" onclick={addSubstGuide}>
          <svg viewBox="0 0 24 24">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            />
          </svg>
        </button>

        <div class="custom-tooltip">식재료 대체 가이드</div>
      </div>

      <!-- 8. 메모장 -->
      <div class="tool-item">
        <button type="button" class="tool-icon-btn" onclick={addNote}>
          <svg viewBox="0 0 24 24">
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        <div class="custom-tooltip">요리 메모장</div>
      </div>

      <!-- 9. 음성 컨트롤 -->
      <div class="tool-item">
        <button
          type="button"
          class="tool-icon-btn"
          class:active-mic={isListening}
          onclick={toggleVoiceControl}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>

        <div class="custom-tooltip">
          {isListening ? "음성 컨트롤 끄기" : "음성 컨트롤 켜기"}
        </div>
      </div>
    {/if}
  </div>
</nav>

<style>
  svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .workspace-panel {
    position: relative;
    border-right: 1px solid var(--border);
    background: var(--surface-subtle);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .workspace-panel.collapsed {
    width: 0 !important;
    overflow: hidden;
    border-right: 0;
  }

  .resizer {
    position: absolute;
    top: 0;
    left: -4px;
    width: 8px;
    height: 100%;
    cursor: col-resize;
    z-index: 40;
    transition: background 0.15s;
  }

  .resizer:hover {
    background: var(--border-accent);
  }

  .panel-header {
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .panel-header h2 {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
  }

  .collapse-btn {
    border: 0;
    background: transparent;
    cursor: pointer;
    color: var(--text-subtle);
    padding: 4px;
    display: flex;
    align-items: center;
    border-radius: 4px;
  }

  .collapse-btn:hover {
    background: var(--surface-subtle);
  }

  .collapse-btn svg {
    width: 16px;
    height: 16px;
  }

  .panel-content {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .voice-status-bar {
    background: #1e293b;
    color: #ffffff;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
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

  .side-toolbar {
    width: 48px;
    background: var(--surface);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    flex-shrink: 0;
    border-left: 1px solid var(--border);
  }

  .toolbar-top {
    display: flex;
    flex-direction: column;
    gap: 12px;
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
      background-color 0.15s ease;
  }

  .tool-icon-btn svg {
    width: 20px;
    height: 20px;
  }

  .tool-icon-btn:hover {
    color: var(--accent);
    background: var(--surface-subtle);
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
    z-index: 100;
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
</style>
