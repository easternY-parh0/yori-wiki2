import type { Recipe } from './exploration';

export async function loadExploration(fetcher: typeof fetch, signedIn: boolean) {
  let recipes: Recipe[] = [];
  let warning = '';
  let loadError = '';
  let cookedError = '';
  let cooked: number[] = [];
  await Promise.all([
    (async () => {
      try {
        const response = await fetcher('/api/explore');
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        recipes = data.recipes;
        warning = data.warning;
      } catch (error) { loadError = error instanceof Error ? error.message : '요리를 불러오지 못했습니다.'; }
    })(),
    (async () => {
      if (!signedIn) return;
      try {
        const response = await fetcher('/api/auth/cooked');
        if (!response.ok) throw new Error(await response.text());
        cooked = (await response.json()).ids;
      } catch (error) { cookedError = error instanceof Error ? error.message : '경험 기록을 불러오지 못했습니다.'; }
    })()
  ]);
  return { recipes, warning, loadError, cooked, cookedError };
}
