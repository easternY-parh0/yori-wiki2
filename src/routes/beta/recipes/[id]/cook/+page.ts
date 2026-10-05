import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export interface Food {
  id: string | number;
  name: string;
  estimated_time?: string;
  ingredients?: string;
  recipe?: string;
  author_id?: number | string;
  likes?: number | string;
  created_at?: string;
  description?: string;
  category?: string;
  difficulty?: number;
  servings?: number;
  metadata?: {
    category?: string;
    description?: string;
    difficulty?: number;
    servings?: number;
    prep_time?: string;
    cook_time?: string;
    author_id?: string;
    likes?: string | number;
    created_at?: string;
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