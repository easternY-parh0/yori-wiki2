<script lang="ts">
	interface BreadcrumbItem {
		label: string;
		href?: string;
	}

	let { items = [] }: { items: BreadcrumbItem[] } = $props();
</script>

{#if items.length > 0}
	<div class="breadcrumb">
		{#each items as item, i}
			{#if item.href && i < items.length - 1}
				<a href={item.href}>{item.label}</a>
				<span>›</span>
			{:else}
				<span>{item.label}</span>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-bottom: 25px;
		color: var(--text-muted);
		font-size: 12px;
	}

	.breadcrumb a {
		color: var(--text-subtle);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	.breadcrumb span {
		color: var(--text-muted);
	}

	.breadcrumb span:last-child {
		color: var(--text-subtle);
	}

	@media (max-width: 700px) {
		.breadcrumb {
			margin-bottom: 20px;
			font-size: 11px;
		}
	}
</style>