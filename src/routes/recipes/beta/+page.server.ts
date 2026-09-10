import { loadSearch } from '$lib/load-search';
import type { RequestEvent } from '@sveltejs/kit';

export const load = async ({ fetch, url }: RequestEvent) => {
  // fetch와 url에 명시적으로 RequestEvent 타입을 지정
  const searchData = await loadSearch(fetch, url);

  return {
    ...searchData
  };
};