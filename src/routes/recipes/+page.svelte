<script lang="ts">
  import RecipeSearch from '$lib/components/RecipeSearch.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>
<svelte:head><title>레시피 검색 | 요리위키</title></svelte:head>
<main><RecipeSearch data={data.search} /></main>
