import type { Recipe } from './exploration';
export type SearchResults = {
  items: (Recipe & { matchingFields: string[] })[];
  total: number; page: number; pages: number; pageSize: number;
  query: string | null; warning: string;
};
export async function loadSearch(fetcher: typeof fetch, url: URL): Promise<{ result: SearchResults | null; error: string }> {
  const params = new URLSearchParams();
  for (const key of ['q', 'field', 'mode', 'category', 'sort', 'maxTime', 'maxDifficulty', 'page']) {
    const value = url.searchParams.get(key);
    if (value !== null) params.set(key, value);
  }
  try {
    const response = await fetcher(`/api/search?${params}`);
    if (!response.ok) throw new Error(await response.text());
    return { result: await response.json(), error: '' };
  } catch (error) { return { result: null, error: error instanceof Error ? error.message : '검색 결과를 불러오지 못했습니다.' }; }
}
