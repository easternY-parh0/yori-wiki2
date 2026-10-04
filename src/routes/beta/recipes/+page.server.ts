import {
    loadSearch,
    type SearchResults
} from '$lib/load-search';

import type { RequestEvent } from '@sveltejs/kit';

export const load = async ({
    fetch,
    url
}: RequestEvent) => {
    const rawMinTime =
        url.searchParams.get('minTime');

    const minTime =
        rawMinTime !== null
            ? Number(rawMinTime)
            : null;
    const rawMinDifficulty =
    url.searchParams.get('minDifficulty');

    const minDifficulty =
        rawMinDifficulty !== null
            ? Number(rawMinDifficulty)
            : null;

    // 최소시간이 없으면 기존 검색 그대로 사용
    const hasMinTime =
    minTime !== null &&
    Number.isFinite(minTime) &&
    minTime > 0;

    const hasMinDifficulty =
        minDifficulty !== null &&
        Number.isFinite(minDifficulty) &&
        minDifficulty > 1;

    if (!hasMinTime && !hasMinDifficulty) {
        return await loadSearch(fetch, url);
    }
    /*
     * 백엔드는 maxTime까지만 지원하므로
     * 검색 결과 전체 페이지를 가져온 뒤
     * beta에서 minTime을 추가로 적용한다.
     */

    const firstUrl = new URL(url);
    firstUrl.searchParams.set('page', '1');

    const firstData =
        await loadSearch(fetch, firstUrl);

    if (
        firstData.error ||
        !firstData.result
    ) {
        return firstData;
    }

    const firstResult =
        firstData.result;

    const remainingResults =
        await Promise.all(
            Array.from(
                {
                    length: Math.max(
                        0,
                        firstResult.pages - 1
                    )
                },
                async (_, index) => {
                    const pageUrl =
                        new URL(url);

                    pageUrl.searchParams.set(
                        'page',
                        String(index + 2)
                    );

                    return await loadSearch(
                        fetch,
                        pageUrl
                    );
                }
            )
        );

    const failedResult =
        remainingResults.find(
            (item) =>
                item.error ||
                !item.result
        );

    if (failedResult) {
        return {
            result: null,
            error:
                failedResult.error ||
                '검색 결과를 불러오지 못했습니다.'
        };
    }

    const allItems = [
        ...firstResult.items,
        ...remainingResults.flatMap(
            (item) =>
                item.result?.items ?? []
        )
    ];

    const filteredItems =
    allItems.filter((recipe) => {
        const cookingTime =
            recipe.metadata
                ?.cooking_time_minutes;

        const difficulty =
            recipe.metadata
                ?.difficulty;

        // 최소 조리시간 조건
        if (hasMinTime) {
            if (
                minTime === null ||
                typeof cookingTime !== 'number' ||
                !Number.isFinite(cookingTime) ||
                cookingTime < minTime
            ) {
                return false;
            }
        }

        // 최소 난이도 조건
        if (hasMinDifficulty) {
            if (
                minDifficulty === null ||
                typeof difficulty !== 'number' ||
                !Number.isFinite(difficulty) ||
                difficulty < minDifficulty
            ) {
                return false;
            }
        }

        return true;
    });

    const pageSize =
        firstResult.pageSize;

    const requestedPage =
        Math.max(
            1,
            Number(
                url.searchParams.get(
                    'page'
                )
            ) || 1
        );

    const pages =
        filteredItems.length === 0
            ? 0
            : Math.ceil(
                  filteredItems.length /
                      pageSize
              );

    const currentPage =
        pages === 0
            ? 1
            : Math.min(
                  requestedPage,
                  pages
              );

    const start =
        (currentPage - 1) *
        pageSize;

    const result: SearchResults = {
        ...firstResult,
        items: filteredItems.slice(
            start,
            start + pageSize
        ),
        total: filteredItems.length,
        page: currentPage,
        pages
    };

    return {
        result,
        error: ''
    };
};