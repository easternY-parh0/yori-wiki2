<script lang="ts">
  import { AXES, hull, area, inside, point, extent, EPS, type Axis, type Dish } from '$lib/exploration';
  let { dishes, cooked, onfocus }: { dishes: Dish[]; cooked: number[]; onfocus: (id: number) => void } = $props();
  let x = $state<Axis>('time');
  let y = $state<Axis>('ingredients');
  let showArea = $state(false);
  const plotted = $derived(dishes.filter(d => point(d, x, y) !== null));
  const experienced = $derived(plotted.filter(d => cooked.includes(d.id)));
  const polygon = $derived(hull(experienced.map(d => point(d, x, y)!)));
  const valid = $derived(area(polygon) > EPS);
  const easy = $derived(valid ? plotted.filter(d => !cooked.includes(d.id) && inside(point(d, x, y)!, polygon)) : []);
  const xRange = $derived(extent(plotted, x));
  const yRange = $derived(extent(plotted, y));
  const xLabel = $derived(AXES.find(a => a.key === x)!);
  const yLabel = $derived(AXES.find(a => a.key === y)!);
  const px = (value: number) => xRange[1] === xRange[0] ? 335 : 80 + (value - xRange[0]) / (xRange[1] - xRange[0]) * 510;
  const py = (value: number) => yRange[1] === yRange[0] ? 210 : 350 - (value - yRange[0]) / (yRange[1] - yRange[0]) * 280;
  const ticks = [0, .25, .5, .75, 1];
  const format = (v: number) => Number(v.toFixed(1));
  function changeX(value: Axis) { if (value === y) y = x; x = value; }
  function changeY(value: Axis) { if (value === x) x = y; y = value; }
</script>

<div class="map-controls">
  <label>가로축 <select value={x} onchange={e => changeX(e.currentTarget.value as Axis)}>{#each AXES as a}<option value={a.key}>{a.label} ({a.unit})</option>{/each}</select></label>
  <label>세로축 <select value={y} onchange={e => changeY(e.currentTarget.value as Axis)}>{#each AXES as a}<option value={a.key}>{a.label} ({a.unit})</option>{/each}</select></label>
  <label class="area-toggle"><input type="checkbox" bind:checked={showArea} /> 영역 보기</label>
</div>
<div class="map-layout">
  <div>
    <div class="legend"><span><i class="untried"></i> 전체 요리</span><span><i></i> 해본 요리</span><span>{plotted.length}개 표시</span></div>
    <div class="chart-scroll">
      <svg viewBox="0 0 640 420" role="group" aria-label={`${xLabel.label}와 ${yLabel.label}로 보는 요리 경험 지도`}>
        <title>요리 경험 지도 — 점을 선택해 요리 정보 보기</title>
        <rect x="80" y="70" width="510" height="280" rx="12" class="plot-background" />
        {#each ticks as t}
          <line x1="80" x2="590" y1={350 - t * 280} y2={350 - t * 280} class="grid" />
          <line x1={80 + t * 510} x2={80 + t * 510} y1="70" y2="350" class="grid" />
          <text x={80 + t * 510} y="377" text-anchor="middle">{xRange[0] === xRange[1] ? t === .5 ? format(xRange[0]) : '' : format(xRange[0] + t * (xRange[1] - xRange[0]))}</text>
          <text x="64" y={355 - t * 280} text-anchor="end">{yRange[0] === yRange[1] ? t === .5 ? format(yRange[0]) : '' : format(yRange[0] + t * (yRange[1] - yRange[0]))}</text>
        {/each}
        <text x="80" y="38">{yLabel.label} ({yLabel.unit})</text>
        <text x="590" y="406" text-anchor="end">{xLabel.label} ({xLabel.unit})</text>
        {#if showArea && valid}<polygon points={polygon.map(p => `${px(p.x)},${py(p.y)}`).join(' ')} class="experience-area" />{/if}
        {#each [...plotted.filter(d => !cooked.includes(d.id)), ...experienced] as dish (dish.id)}
          <g role="button" tabindex="0" aria-label={`${dish.name}, ${xLabel.label} ${dish.values[x]}, ${yLabel.label} ${dish.values[y]}${cooked.includes(dish.id) ? ', 해본 요리' : ''}`} onclick={() => onfocus(dish.id)} onkeydown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onfocus(dish.id); } }}>
            <title>{dish.name} · {xLabel.label} {dish.values[x]} · {yLabel.label} {dish.values[y]}{cooked.includes(dish.id) ? ' · 해본 요리' : ''}</title>
            <circle cx={px(dish.values[x]!)} cy={py(dish.values[y]!)} r="11" class="hit-target" />
            <circle cx={px(dish.values[x]!)} cy={py(dish.values[y]!)} r={cooked.includes(dish.id) ? 7 : 5} class:done={cooked.includes(dish.id)} class="dot" />
          </g>
        {/each}
      </svg>
    </div>
    {#if !plotted.length}<p class="notice">선택한 두 축의 데이터가 있는 요리가 아직 없습니다.</p>{/if}
    {#if dishes.length > plotted.length}<p class="note">축 값이 없는 {dishes.length - plotted.length}개는 지도에서 제외했습니다. 아래 전체 목록에서 확인할 수 있습니다.</p>{/if}
    {#if showArea && !valid}<p class="notice">영역을 만들려면 같은 직선 위에 있지 않은 경험 점이 최소 3개 필요합니다.</p>{/if}
    <p class="note">같은 좌표의 점은 겹칩니다. 전체 목록에서도 요리를 선택할 수 있습니다. 난이도는 데이터의 1~10단계이며 높을수록 어렵습니다.</p>
  </div>
  <aside>
    <span class="eyebrow">내 경험 안에서</span>
    <h3>쉽게 시도해 볼 요리</h3>
    <p>선택한 두 축에서 경험 영역의 내부 또는 경계에 있는, 아직 해보지 않은 요리입니다.</p>
    {#if !showArea}<p class="notice">‘영역 보기’를 켜서 확인하세요.</p>
    {:else if !valid}<p class="notice">경험을 더 기록하면 후보가 나타납니다.</p>
    {:else if !easy.length}<p class="notice">이 영역 안에는 아직 새로운 후보가 없습니다.</p>
    {:else}<ul>{#each easy as dish}<li><button type="button" onclick={() => onfocus(dish.id)}>{dish.name} <span>살펴보기 ↗</span></button></li>{/each}</ul>{/if}
    <p class="note">영역 포함은 특성의 익숙함을 뜻하며 실제 조리 난이도를 보장하지 않습니다.</p>
  </aside>
</div>

<style>
  .map-controls,
  .legend {
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    align-items: center;
  }

  .map-controls {
    padding: 18px 0;
  }

  .map-controls label {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 14px;
    font-weight: 650;
  }

  select {
    font: inherit;
    padding: 10px;
    border: 1px solid var(--border);
    border-radius: 9px;
    background: var(--surface);
    color: var(--text);
  }

  input {
    accent-color: var(--accent);
    width: 18px;
    height: 18px;
  }

  .area-toggle {
    margin-left: auto;
  }

  .legend {
    font-size: 14px;
    color: var(--text-subtle);
    padding: 12px 0;
  }

  .legend span {
    display: flex;
    gap: 7px;
    align-items: center;
  }

  i {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--accent);
    display: inline-block;
  }

  i.untried {
    background: transparent;
    border: 2px solid #94a3b8;
  }

  .map-layout {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(240px, 1fr);
    gap: 26px;
  }

  .chart-scroll {
    overflow-x: auto;
  }

  svg {
    display: block;
    width: 100%;
    min-width: 540px;
  }

  text {
    fill: var(--text-subtle);
    font-size: 14px;
  }

  .plot-background {
    fill: var(--surface-subtle);
  }

  .grid {
    stroke: var(--border);
    stroke-dasharray: 3 5;
  }

  .experience-area {
    fill: #84cc1626;
    stroke: var(--accent);
    stroke-width: 2;
  }

  .dot {
    fill: var(--surface);
    stroke: #94a3b8;
    stroke-width: 2;
  }

  .dot.done {
    fill: var(--accent);
    stroke: var(--text);
  }

  .hit-target {
    fill: transparent;
  }

  g[role="button"] {
    cursor: pointer;
  }

  g:focus .dot,
  g:hover .dot {
    stroke: var(--text);
    stroke-width: 4;
  }

  aside {
    border-left: 1px solid var(--border);
    padding: 22px 0 0 24px;
  }

  h3 {
    font-size: 20px;
    margin: 9px 0;
  }

  .eyebrow {
    font-size: 14px;
    color: var(--accent);
    font-weight: 750;
  }

  p {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-subtle);
  }

  .note {
    font-size: 14px;
  }

  .notice {
    padding: 14px;
    border-radius: 10px;
    background: var(--surface-subtle);
  }

  ul {
    padding: 0;
    list-style: none;
    max-height: 350px;
    overflow: auto;
  }

  li {
    border-bottom: 1px solid var(--border);
  }

  li button {
    border: 0;
    background: none;
    color: var(--text);
    width: 100%;
    text-align: left;
    padding: 14px 0;
    cursor: pointer;
    font-size: 16px;
  }

  li span {
    display: block;
    font-size: 14px;
    color: var(--accent);
    margin-top: 5px;
  }

  @media (max-width: 850px) {
    .map-layout {
      grid-template-columns: 1fr;
    }
    aside {
      border-left: 0;
      border-top: 1px solid var(--border);
      padding: 20px 0;
    }
    .area-toggle {
      margin-left: 0;
    }
  }
</style>
