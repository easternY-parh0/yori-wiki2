import { loadExploration } from '$lib/load-exploration';
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch, parent, depends }) => {
  depends('explore:data');
  return loadExploration(fetch, Boolean((await parent()).user));
};
