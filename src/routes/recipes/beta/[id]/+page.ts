import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export interface Food {
  id: string;
  name: string;
  estimated_time?: string;
  ingredients?: string;
  recipe?: string;
  metadata?: {
    category?: string;
    description?: string;
    difficulty?: number;
    servings?: number;
    prep_time?: string;
    cook_time?: string;
    author?: string;
    created_at?: string;
    tips?: string;
  };
}

export const load: PageLoad = async ({ params, fetch }) => {
  const response = await fetch(`/api/food?id=${encodeURIComponent(params.id)}`);
  
  if (!response.ok) {
    error(response.status, await response.text());
  }

  const food = (await response.json()) as Food;

  return { food };
};