<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { appPath } from '$lib/app-path';
	import type { SearchResults } from '$lib/load-search';

	type Suggestion = SearchResults['items'][number];
	type Variant = 'home' | 'page';

	let {
		value = $bindable(''),
		id = 'recipe-query',
		placeholder = '요리를 검색하세요',
		variant = 'page'
	}: {
		value?: string;
		id?: string;
		placeholder?: string;
		variant?: Variant;
	} = $props();

	let suggestions = $state<Suggestion[]>([]);
	let opened = $state(false);
	let loading = $state(false);
	let activeIndex = $state(-1);

	let composing = false;
	let timer: ReturnType<typeof setTimeout> | undefined;
	let requestVersion = 0;
	let controller: AbortController | null = null;

	const cache = new Map<string, Suggestion[]>();

	function normalize(text: string) {
		return text
			.normalize('NFKC')
			.trim()
			.toLocaleLowerCase('ko-KR')
			.replace(/\s+/g, ' ');
	}

	function relevanceScore(recipe: Suggestion, query: string) {
		const name = normalize(recipe.name);
		const keyword = normalize(query);

		if (!keyword) {
			return Number.NEGATIVE_INFINITY;
		}

		// 1. 요리 이름 완전 일치
		if (name === keyword) {
			return 10000;
		}

		// 2. 요리 이름이 검색어로 시작
		if (name.startsWith(keyword)) {
			return 9000 - Math.min(name.length - keyword.length, 200);
		}

		// 3. 요리 이름 중간에 검색어 포함
		const position = name.indexOf(keyword);

		if (position >= 0) {
			return (
				8000 -
				Math.min(position * 100, 1000) -
				Math.min(name.length - keyword.length, 200)
			);
		}

		// 4. 이름에는 없지만 별칭에 일치
		if (recipe.matchingFields?.includes('aliases')) {
			return 7000;
		}

		return Number.NEGATIVE_INFINITY;
	}

	function rankSuggestions(items: Suggestion[], query: string) {
		return items
			.map((recipe) => ({
				recipe,
				score: relevanceScore(recipe, query)
			}))
			.filter(({ score }) => Number.isFinite(score))
			.sort((a, b) => {
				if (a.score !== b.score) {
					return b.score - a.score;
				}

				// 점수가 같으면 이름이 짧은 요리를 먼저
				if (a.recipe.name.length !== b.recipe.name.length) {
					return a.recipe.name.length - b.recipe.name.length;
				}

				// 그래도 같으면 가나다순
				return a.recipe.name.localeCompare(
					b.recipe.name,
					'ko'
				);
			})
			.slice(0, 8)
			.map(({ recipe }) => recipe);
	}

	async function loadSuggestions(
		query: string,
		currentRequest: number
	) {
		const keyword = normalize(query);

		if (!keyword) {
			return;
		}

		const cached = cache.get(keyword);

		if (cached) {
			if (currentRequest === requestVersion) {
				suggestions = cached;
				opened = cached.length > 0;
				activeIndex = -1;
			}

			return;
		}

		controller?.abort();
		controller = new AbortController();

		loading = true;

		try {
			const params = new URLSearchParams({
				q: query.trim(),
				field: 'name',
				sort: 'relevance',
				page: '1'
			});

			const response = await fetch(
				appPath(`/api/search?${params}`),
				{
					signal: controller.signal
				}
			);

			if (!response.ok) {
				throw new Error(
					'검색 추천을 불러오지 못했습니다.'
				);
			}

			const result: SearchResults =
				await response.json();

			const ranked = rankSuggestions(
				result.items,
				query
			);

			cache.set(keyword, ranked);

			if (currentRequest !== requestVersion) {
				return;
			}

			suggestions = ranked;
			opened = ranked.length > 0;
			activeIndex = -1;
		} catch (error) {
			if (
				error instanceof DOMException &&
				error.name === 'AbortError'
			) {
				return;
			}

			if (currentRequest === requestVersion) {
				suggestions = [];
				opened = false;
			}
		} finally {
			if (currentRequest === requestVersion) {
				loading = false;
			}
		}
	}

	function scheduleSuggestions(text: string) {
		if (timer) {
			clearTimeout(timer);
		}

		requestVersion += 1;

		const currentRequest = requestVersion;
		const keyword = normalize(text);

		if (!keyword) {
			controller?.abort();

			suggestions = [];
			opened = false;
			loading = false;
			activeIndex = -1;

			return;
		}

		// 너무 자주 API를 호출하지 않도록 300ms 대기
		timer = setTimeout(() => {
			void loadSuggestions(
				text,
				currentRequest
			);
		}, 300);
	}

	function handleInput(event: Event) {
		const input =
			event.currentTarget as HTMLInputElement;

		value = input.value;

		if (!composing) {
			scheduleSuggestions(value);
		}
	}

	function handleCompositionStart() {
		composing = true;
	}

	function handleCompositionEnd(event: Event) {
		composing = false;

		const input =
			event.currentTarget as HTMLInputElement;

		value = input.value;

		scheduleSuggestions(value);
	}

	function handleFocus() {
		if (suggestions.length > 0 && value.trim()) {
			opened = true;
		}
	}

	function handleBlur() {
		// 추천 항목 클릭이 먼저 처리되도록 약간 늦게 닫음
		setTimeout(() => {
			opened = false;
		}, 150);
	}

	async function handleKeydown(
		event: KeyboardEvent
	) {
		if (!opened || suggestions.length === 0) {
			return;
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();

			activeIndex =
				(activeIndex + 1) %
				suggestions.length;

			return;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();

			activeIndex =
				(activeIndex - 1 + suggestions.length) %
				suggestions.length;

			return;
		}

		if (
			event.key === 'Enter' &&
			activeIndex >= 0
		) {
			event.preventDefault();

			const selected =
				suggestions[activeIndex];

			await goto(
				appPath(`/recipes/${selected.id}`)
			);

			return;
		}

		if (event.key === 'Escape') {
			opened = false;
			activeIndex = -1;
		}
	}

	onDestroy(() => {
		if (timer) {
			clearTimeout(timer);
		}

		controller?.abort();
	});
</script>

<div
	class="autocomplete"
	class:home={variant === 'home'}
	class:page={variant === 'page'}
>
	<div class="bar">
		{#if variant === 'home'}
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<circle cx="10.5" cy="10.5" r="6" />
				<path d="M15 15l5 5" />
			</svg>
		{/if}

		<label for={id} class="sr-only">
			요리 검색어
		</label>

		<input
			{id}
			name="q"
			type="search"
			maxlength="100"
			autocomplete="off"
			{placeholder}
			bind:value
			role="combobox"
			aria-autocomplete="list"
			aria-expanded={opened}
			aria-controls={`${id}-suggestions`}
			oninput={handleInput}
			oncompositionstart={handleCompositionStart}
			oncompositionend={handleCompositionEnd}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeydown}
		/>

		<button type="submit">
			검색
		</button>
	</div>

	{#if opened}
		<div
			class="suggestions"
			id={`${id}-suggestions`}
			role="listbox"
		>
			{#if loading && suggestions.length === 0}
				<div class="suggestion-status">
					검색 중…
				</div>
			{:else}
				{#each suggestions as recipe, index (recipe.id)}
					<a
						id={`${id}-suggestion-${index}`}
						href={appPath(`/recipes/${recipe.id}`)}
						role="option"
						aria-selected={activeIndex === index}
						class:active={activeIndex === index}
						onmousedown={() => {
							opened = false;
						}}
					>
						<span>{recipe.name}</span>

						{#if recipe.matchingFields?.includes('aliases') && !normalize(recipe.name).includes(normalize(value))}
							<small>별칭 일치</small>
						{/if}
					</a>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	.autocomplete {
		position: relative;
		width: 100%;
	}

	.autocomplete.home {
		max-width: 550px;
		margin-top: 27px;
	}

	.autocomplete.page {
		margin-top: 26px;
	}

	.bar {
		display: flex;
		align-items: center;
		background: var(--surface);
	}

	.home .bar {
		height: 56px;
		padding: 4px 4px 4px 16px;
		border: 1px solid var(--border);
		border-radius: 14px;
		box-shadow: 0 8px 25px var(--shadow-search);
	}

	.page .bar {
		gap: 8px;
		padding: 6px;
		border: 2px solid var(--primary);
		border-radius: 14px;
	}

	.bar:focus-within {
		outline: 3px solid var(--accent);
		outline-offset: 3px;
	}

	.home svg {
		width: 19px;
		height: 19px;
		margin-right: 9px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
		stroke-linejoin: round;
		color: var(--accent);
	}

	input {
		flex: 1;
		min-width: 0;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--text);
		font: inherit;
	}

	.home input {
		font-size: 12px;
	}

	.page input {
		padding: 12px;
		font-size: 18px;
	}

	input::placeholder {
		color: var(--text-muted);
	}

	button {
		border: 0;
		cursor: pointer;
		font-weight: 750;
		color: #172018;
		background: var(--primary);
	}

	.home button {
		height: 46px;
		padding: 0 21px;
		border-radius: 10px;
		font-size: 11px;
	}

	.page button {
		padding: 12px 25px;
		border-radius: 9px;
		font-size: 16px;
	}

	.suggestions {
		position: absolute;
		z-index: 50;
		top: calc(100% + 8px);
		left: 0;
		right: 0;
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--surface);
		box-shadow: 0 12px 30px var(--shadow-card);
	}

	.suggestions a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 13px 15px;
		color: var(--text);
		text-decoration: none;
		border-bottom: 1px solid var(--border);
	}

	.suggestions a:last-child {
		border-bottom: 0;
	}

	.suggestions a:hover,
	.suggestions a.active {
		background: var(--surface-yellow);
	}

	.suggestions span {
		font-size: 14px;
		font-weight: 650;
	}

	.suggestions small {
		flex: none;
		color: var(--accent);
		font-size: 11px;
	}

	.suggestion-status {
		padding: 14px 15px;
		color: var(--text-subtle);
		font-size: 13px;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}
</style>