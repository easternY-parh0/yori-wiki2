<script lang="ts">
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

  type ConverterItem = {
    id: string;
    title: string;
    category: UnitCategory;
    fromUnit: string;
    toUnit: string;
    inputValue: number;
  };

  let {
    id,
    onRemove,
  }: {
    id: string;
    onRemove: (id: string) => void;
  } = $props();

  // --------------------------------------------------
  // Unit Catalog
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Converter State
  // --------------------------------------------------

  let converter = $state<ConverterItem>({
    id,
    title: "단위 변환기",
    category: "volume",
    fromUnit: "cup",
    toUnit: "ml",
    inputValue: 1,
  });

  // --------------------------------------------------
  // Category
  // --------------------------------------------------

  function changeCategory(category: UnitCategory) {
    const units = unitCatalog[category];

    converter.category = category;
    converter.fromUnit = units[0].value;
    converter.toUnit = units[1]?.value ?? units[0].value;
  }

  // --------------------------------------------------
  // Calculation
  // --------------------------------------------------

  function calculateResult(): string {
    const units = unitCatalog[converter.category];

    const fromDef = units.find(
      (unit) => unit.value === converter.fromUnit,
    );

    const toDef = units.find(
      (unit) => unit.value === converter.toUnit,
    );

    if (!fromDef || !toDef) {
      return "0";
    }

    const input = Number(converter.inputValue) || 0;

    const baseValue = fromDef.toBase(input);
    const result = toDef.fromBase(baseValue);

    if (!Number.isFinite(result)) {
      return "0";
    }

    return Number.isInteger(result)
      ? result.toString()
      : result.toFixed(2);
  }
</script>

<div class="tool-card converter-card">
  <div class="card-head">
    <div class="title-wrap">
      <svg viewBox="0 0 24 24">
        <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6" />
      </svg>

      <input
        type="text"
        bind:value={converter.title}
        class="title-input"
      />
    </div>

    <button
      type="button"
      class="del-btn"
      onclick={() => onRemove(id)}
      aria-label="단위 변환기 삭제"
    >
      ✕
    </button>
  </div>

  <div class="category-tabs">
    <button
      type="button"
      class:active={converter.category === "volume"}
      onclick={() => changeCategory("volume")}
    >
      부피
    </button>

    <button
      type="button"
      class:active={converter.category === "weight"}
      onclick={() => changeCategory("weight")}
    >
      무게
    </button>

    <button
      type="button"
      class:active={converter.category === "temperature"}
      onclick={() => changeCategory("temperature")}
    >
      온도
    </button>

    <button
      type="button"
      class:active={converter.category === "length"}
      onclick={() => changeCategory("length")}
    >
      길이
    </button>

    <button
      type="button"
      class:active={converter.category === "energy"}
      onclick={() => changeCategory("energy")}
    >
      열량
    </button>
  </div>

  <div class="conv-body">
    <div class="conv-field">
      <input
        type="number"
        bind:value={converter.inputValue}
        min="0"
        step="any"
        class="field-input"
      />

      <select
        bind:value={converter.fromUnit}
        class="field-select"
      >
        {#each unitCatalog[converter.category] as unit}
          <option value={unit.value}>
            {unit.label}
          </option>
        {/each}
      </select>
    </div>

    <div class="conv-divider">
      <svg viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5" />
      </svg>
    </div>

    <div class="conv-field">
      <div class="field-result">
        {calculateResult()}
      </div>

      <select
        bind:value={converter.toUnit}
        class="field-select"
      >
        {#each unitCatalog[converter.category] as unit}
          <option value={unit.value}>
            {unit.label}
          </option>
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