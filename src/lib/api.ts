import { appPath } from '$lib/app-path';
export type FoodSummary = { id: number; name: string; estimated_time: string };
export type Food = FoodSummary & { ingredients: string; recipe: string };
export type FoodInput = Omit<Food, 'id'>;

export async function api<T>(path: string, options?: RequestInit, fetcher: typeof fetch = fetch): Promise<T> {
  const response = await fetcher(appPath(`/api${path}`), options);
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export const getFoods = (fetcher: typeof fetch = fetch) => api<FoodSummary[]>('/food', undefined, fetcher);
export const getFood = (id: string, fetcher: typeof fetch = fetch) => api<Food>(`/food?id=${encodeURIComponent(id)}`, undefined, fetcher);
export const createFood = (food: FoodInput) => api<number>('/food', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(food)
});
