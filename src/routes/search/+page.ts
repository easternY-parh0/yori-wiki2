import { loadExploration } from '$lib/load-exploration';
import type { PageLoad } from './$types';
import { loadSearch } from '$lib/load-search';
export const load: PageLoad = async ({ fetch, parent, depends, url }) => {
  depends('explore:data');
  const [exploration, search] = await Promise.all([loadExploration(fetch, Boolean((await parent()).user)), loadSearch(fetch, url)]);
  return { ...exploration, search };
};
