<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	let darkMode = $state(false);

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');

		darkMode = savedTheme === 'dark';
		document.documentElement.classList.toggle('dark-theme', darkMode);
	});

	function toggleTheme() {
		darkMode = !darkMode;

		document.documentElement.classList.toggle('dark-theme', darkMode);
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
	}
</script>

<Header {darkMode} {toggleTheme} />

{@render children()}

<Footer />