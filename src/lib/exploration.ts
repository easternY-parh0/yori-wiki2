export type Point = { x: number; y: number };
export const EPS = 1e-9;
const cross = (a: Point, b: Point, c: Point) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

// Monotone Chain, CCW. Collinear interiors and duplicate coordinates are removed.
export function hull(points: Point[]): Point[] {
  const sorted = [...points].filter(p => Number.isFinite(p.x) && Number.isFinite(p.y)).sort((a, b) => a.x - b.x || a.y - b.y);
  const unique = sorted.filter((p, i) => !i || p.x !== sorted[i - 1].x || p.y !== sorted[i - 1].y);
  if (unique.length < 3) return unique;
  const chain = (rows: Point[]) => {
    const out: Point[] = [];
    for (const p of rows) {
      while (out.length > 1 && cross(out[out.length - 2], out[out.length - 1], p) <= EPS) out.pop();
      out.push(p);
    }
    return out;
  };
  return [...chain(unique).slice(0, -1), ...chain([...unique].reverse()).slice(0, -1)];
}
export function area(polygon: Point[]): number {
  if (polygon.length < 3) return 0;
  return Math.abs(polygon.reduce((sum, p, i) => {
    const q = polygon[(i + 1) % polygon.length];
    return sum + p.x * q.y - p.y * q.x;
  }, 0)) / 2;
}
// Boundaries count as familiar; degenerate hulls never count as an area.
export function inside(p: Point, polygon: Point[]): boolean {
  return area(polygon) > EPS && polygon.every((a, i) => cross(a, polygon[(i + 1) % polygon.length], p) >= -EPS);
}

export const AXES = [
  { key: 'time', label: '조리 시간', unit: '분' },
  { key: 'ingredients', label: '재료 수', unit: '개' },
  { key: 'steps', label: '조리 단계 수', unit: '단계' },
  { key: 'difficulty', label: '난이도', unit: '단계' }
] as const;
export type Axis = typeof AXES[number]['key'];
export type Recipe = { id: number; name: string; estimated_time: string; ingredients: string; recipe: string; metadata?: Record<string, unknown> };
export type Dish = Recipe & { values: Record<Axis, number | null> };
const positive = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v > 0;
export function toDish(recipe: Recipe): Dish {
  const meta = recipe.metadata || {};
  const ingredients = positive(meta.ingredient_count) && Number.isInteger(meta.ingredient_count) ? meta.ingredient_count : Array.isArray(meta.ingredient_names) && meta.ingredient_names.length && meta.ingredient_names.every(v => typeof v === 'string' && v.trim())
    ? new Set(meta.ingredient_names.map(v => (v as string).trim().normalize('NFC'))).size : null;
  const steps = positive(meta.step_count) && Number.isInteger(meta.step_count) ? meta.step_count : null;
  const difficulty = positive(meta.difficulty) && Number.isInteger(meta.difficulty) && meta.difficulty <= 10 ? meta.difficulty : null;
  return { ...recipe, values: { time: positive(meta.cooking_time_minutes) ? meta.cooking_time_minutes : null, ingredients, steps, difficulty } };
}

export function extent(dishes: Dish[], axis: Axis): [number, number] {
  const values = dishes.map(d => d.values[axis]).filter((v): v is number => v !== null);
  return values.length ? [Math.min(...values), Math.max(...values)] : [0, 0];
}
export function point(dish: Dish, x: Axis, y: Axis): Point | null {
  return dish.values[x] === null || dish.values[y] === null ? null : { x: dish.values[x], y: dish.values[y] };
}
export type VectorDish = { dish: Dish; vector: number[] };
export function space(dishes: Dish[]) {
  const axes = AXES.map(a => a.key).filter(key => { const [min, max] = extent(dishes, key); return max > min; });
  const ranges = axes.map(key => extent(dishes, key));
  const rows: VectorDish[] = dishes.filter(d => axes.length > 0 && axes.every(key => d.values[key] !== null)).map(dish => ({
    dish, vector: axes.map((key, i) => (dish.values[key]! - ranges[i][0]) / (ranges[i][1] - ranges[i][0]))
  }));
  const pairs: [number, number][] = [];
  for (let i = 0; i < axes.length; i++) for (let j = i + 1; j < axes.length; j++) pairs.push([i, j]);
  return { axes, rows, pairs };
}
const project = (v: number[], pair: [number, number]): Point => ({ x: v[pair[0]], y: v[pair[1]] });
const distance = (a: number[], b: number[]) => Math.sqrt(a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0) / a.length);
const nearest = (row: VectorDish, refs: VectorDish[]) => refs.length ? Math.min(...refs.map(ref => distance(row.vector, ref.vector))) : 0;

export function coverage(dishes: Dish[], cooked: number[], limit = 8) {
  const { rows, pairs } = space(dishes);
  const selected = new Set(cooked);
  const experience = rows.filter(row => selected.has(row.dish.id));
  const valid = pairs.map(pair => ({ pair, polygon: hull(experience.map(row => project(row.vector, pair))) })).filter(item => area(item.polygon) > EPS);
  const ranked = valid.length ? rows.filter(row => !selected.has(row.dish.id)).map(row => ({
    dish: row.dish, hits: valid.filter(item => inside(project(row.vector, item.pair), item.polygon)).length, total: valid.length
  })).filter(row => row.hits > 0).sort((a, b) => b.hits - a.hits || a.dish.id - b.dish.id).slice(0, limit) : [];
  return { ranked, validPairs: valid.length, excluded: dishes.length - rows.length };
}

export type Recommendation = { dish: Dish; gain: number; novelty: number; score: number; areaUsed: boolean };
export function recommend(dishes: Dish[], cooked: number[], mode: 'familiar' | 'new', limit = 8, maxMinutes = Infinity): Recommendation[] {
  const { rows, pairs } = space(dishes);
  const done = new Set(cooked);
  const experience = rows.filter(row => done.has(row.dish.id));
  if (!experience.length) return [];
  const candidates = rows.filter(row => !done.has(row.dish.id) && row.dish.values.time !== null && row.dish.values.time <= maxMinutes);
  const chosen: VectorDish[] = [];
  const result: Recommendation[] = [];
  while (result.length < limit && candidates.length) {
    const refs = mode === 'new' ? [...experience, ...chosen] : experience;
    const polygons = pairs.map(pair => ({ pair, polygon: hull(refs.map(row => project(row.vector, pair))) })).filter(item => area(item.polygon) > EPS);
    const scored = candidates.map(row => {
      const gain = polygons.length ? polygons.reduce((sum, item) => sum + Math.max(0, area(hull([...item.polygon, project(row.vector, item.pair)])) - area(item.polygon)), 0) / polygons.length : 0;
      const novelty = nearest(row, refs);
      const diversity = chosen.length ? nearest(row, chosen) : 0;
      const score = mode === 'new'
        ? polygons.length ? 0.65 * gain + 0.35 * novelty : novelty
        : polygons.length ? 0.55 * (1 - gain) + 0.30 * (1 - novelty) + 0.15 * diversity : 0.85 * (1 - novelty) + 0.15 * diversity;
      return { row, gain, novelty, score, areaUsed: polygons.length > 0 };
    }).sort((a, b) => b.score - a.score || a.row.dish.id - b.row.dish.id);
    const best = scored[0];
    chosen.push(best.row);
    result.push({ dish: best.row.dish, gain: best.gain, novelty: best.novelty, score: best.score, areaUsed: best.areaUsed });
    candidates.splice(candidates.findIndex(row => row.dish.id === best.row.dish.id), 1);
  }
  return result;
}
