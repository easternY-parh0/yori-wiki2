<script lang="ts">
    import Exploration from '$lib/components/Exploration.svelte';
    import type { PageData } from './$types';
    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>나의 요리 지도 | 요리위키</title>
</svelte:head>

<Exploration {data} view="profile" />