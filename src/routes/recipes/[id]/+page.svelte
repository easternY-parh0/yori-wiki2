<script lang="ts">
	import { appPath } from '$lib/app-path';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.food.name} | 요리위키</title>
</svelte:head>

<main>
  <a href={appPath('/recipes')}>← 레시피 목록</a>
  <h1>{data.food.name}</h1>
  <p>조리 시간: {data.food.estimated_time}</p>
  <h2>재료</h2>
  <p class="content">{data.food.ingredients}</p>
  <h2>조리 방법</h2>
  <p class="content">{data.food.recipe}</p>
</main>

<style>
  main { max-width: 900px; margin: 40px auto; padding: 24px; }
  .content { white-space: pre-wrap; line-height: 1.8; overflow-wrap: anywhere; }
</style>
