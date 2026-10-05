import { appPath } from '$lib/app-path';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export type Food = import('$lib/api').Food;

export const load: PageLoad = async ({ params, fetch }) => {
  const response = await fetch(appPath(`/api/food?id=${encodeURIComponent(params.id)}`));
  
  if (!response.ok) {
    error(response.status, await response.text());
  }

  const food = (await response.json()) as Food;

  return { food };
};