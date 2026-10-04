<script lang="ts">
 import RecipeActions from '$lib/components/RecipeActions.svelte';
	import { appPath } from '$lib/app-path';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.food.name} | 요리위키</title>
</svelte:head>
<div style="max-width:900px;margin:auto;padding:0 24px"><RecipeActions food={data.food} /></div>

<main>
  <a href={appPath('/recipes')}>← 레시피 목록</a>
  <h1>{data.food.name}</h1>
  {#if data.food.metadata?.description}<p>{data.food.metadata.description}</p>{/if}
  {#if data.food.metadata?.image_url}<img src={data.food.metadata.image_url} alt={data.food.name} style="max-width:100%;max-height:400px;object-fit:contain" />{/if}
  <p>난이도: {data.food.metadata?.difficulty ?? '미등록'} / 10 · {data.food.metadata?.servings ?? '?'}인분</p>
  <p>조리 시간: {data.food.estimated_time}</p>
  <h2>재료</h2>
  <p class="content">{data.food.ingredients}</p>
  <h2>조리 방법</h2>
  <p class="content">{data.food.recipe}</p>
  {#if data.food.metadata?.tips}<h2>요리 팁</h2><p class="content">{data.food.metadata.tips}</p>{/if}
  {#if data.food.metadata?.tags?.length}<p>{data.food.metadata.tags.map(tag => `#${tag}`).join(' ')}</p>{/if}
</main>

<style>
  main { max-width: 900px; margin: 40px auto; padding: 24px; }
  .content { white-space: pre-wrap; line-height: 1.8; overflow-wrap: anywhere; }
</style>
