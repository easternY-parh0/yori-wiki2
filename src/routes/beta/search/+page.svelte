<script lang="ts">
  import Exploration from '$lib/components/Exploration.svelte';
  import RecipeSearch from '$lib/components/RecipeSearch.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>요리 탐색 | 요리위키</title>
  <meta name="description" content="해본 요리에서 출발해 익숙한 요리와 새로운 요리를 탐색하세요." />
</svelte:head>

<RecipeSearch data={data.search} />

<Exploration {data} view="explore" />
