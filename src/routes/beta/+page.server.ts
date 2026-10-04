import { loadSearch } from '$lib/load-search';
import type { RequestEvent } from '@sveltejs/kit';

export const load = async ({ fetch, url }: RequestEvent) => {
    // 현재 홈 URL의 검색 파라미터와 무관하게
    // 인기/최근 레시피를 각각 가져온다.
    const popularUrl = new URL(url);
    popularUrl.search = '';
    popularUrl.searchParams.set('sort', 'likes');
    popularUrl.searchParams.set('page', '1');

    const recentUrl = new URL(url);
    recentUrl.search = '';
    recentUrl.searchParams.set('sort', 'newest');
    recentUrl.searchParams.set('page', '1');

    const [popularData, recentData] = await Promise.all([
        loadSearch(fetch, popularUrl),
        loadSearch(fetch, recentUrl)
    ]);

    return {
        popularRecipes: popularData.result?.items ?? [],
        recentRecipes: recentData.result?.items ?? [],
        popularError: popularData.error,
        recentError: recentData.error
    };
};