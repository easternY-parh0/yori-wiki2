import { appPath } from '$lib/app-path';
export type FoodSummary = { id: number; name: string; estimated_time: string; author_id?: number | null; author?: string | null; likes?: number; image_url?: string | null };
export type RecipeMetadata = { description?: string; category?: string; difficulty?: number; servings?: number; tags?: string[]; aliases?: string[]; ingredient_names?: string[]; image_url?: string | null; tips?: string; created_at?: string; likes?: number; prep_time?: string; cook_time?: string };
export type Food = FoodSummary & { ingredients: string; recipe: string; author_id?: number | null; author?: string | null; likes?: number; metadata?: RecipeMetadata };
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

export async function uploadRecipeImage(id: number, file: File) {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) throw new Error('PNG, JPEG, WebP 이미지(5MB 이하)를 선택해주세요.');
  const data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('이미지를 읽을 수 없습니다.'));
    reader.readAsDataURL(file);
  });
  return api<{ image_url: string }>(`/food/image?id=${id}`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ mime: file.type, data }) });
}
