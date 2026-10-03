type NamedItem = {
    name: string;
};

const CHOSEONG = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
    'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
    'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

function normalize(value: string) {
    return value
        .trim()
        .normalize('NFC')
        .toLocaleLowerCase('ko-KR');
}

export function getChoseong(value: string) {
    return Array.from(normalize(value))
        .map((char) => {
            const code = char.charCodeAt(0);

            if (code >= 0xac00 && code <= 0xd7a3) {
                const index = Math.floor((code - 0xac00) / 588);
                return CHOSEONG[index];
            }

            return char;
        })
        .join('');
}

function getMatchRank(name: string, query: string) {
    const normalizedName = normalize(name);
    const normalizedQuery = normalize(query);
    const choseong = getChoseong(normalizedName);

    if (!normalizedQuery) {
        return null;
    }

    // 정확히 일치
    if (normalizedName === normalizedQuery) {
        return 0;
    }

    // 김 → 김치찌개
    if (normalizedName.startsWith(normalizedQuery)) {
        return 1;
    }

    // ㄱㅊ → 김치찌개
    if (choseong.startsWith(normalizedQuery)) {
        return 2;
    }

    // 양파 → 매운양파볶음
    if (normalizedName.includes(normalizedQuery)) {
        return 3;
    }

    // ㅇㅍ → 매운양파볶음 등의 초성 부분 일치
    if (choseong.includes(normalizedQuery)) {
        return 4;
    }

    return null;
}

export function getSearchSuggestions<T extends NamedItem>(
    items: T[],
    query: string,
    limit = 10
): T[] {
    const ranked = items
        .map((item) => ({
            item,
            rank: getMatchRank(item.name, query)
        }))
        .filter(
            (
                entry
            ): entry is {
                item: T;
                rank: number;
            } => entry.rank !== null
        )
        .sort((a, b) => {
            if (a.rank !== b.rank) {
                return a.rank - b.rank;
            }

            return a.item.name.localeCompare(
                b.item.name,
                'ko-KR',
                {
                    sensitivity: 'base',
                    numeric: true
                }
            );
        });

    const seen = new Set<string>();

    return ranked
        .filter(({ item }) => {
            const key = normalize(item.name);

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);
            return true;
        })
        .slice(0, limit)
        .map(({ item }) => item);
}