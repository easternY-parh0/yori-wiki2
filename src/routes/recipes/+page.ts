import { loadSearch } from '$lib/load-search';
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch, url }) => ({ search: await loadSearch(fetch, url) });
