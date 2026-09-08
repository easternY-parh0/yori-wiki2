import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Food } from '$lib/api';

export const load: PageLoad = async ({ params, fetch }) => {
  const response = await fetch(`/api/food?id=${encodeURIComponent(params.id)}`);
  if (!response.ok) error(response.status, await response.text());
  return { food: await response.json() as Food };
};
