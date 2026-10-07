<script lang="ts">
	import { appPath } from '$lib/app-path';
	import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';
	import Board from '$lib/components/Board.svelte';

	const breadcrumbItems = [
		{ label: '요리위키', href: appPath('/') },
		{ label: '커뮤니티' }
	];
</script>

<svelte:head>
	<title>커뮤니티 | 요리위키</title>
	<meta name="description" content="요리위키 커뮤니티에서 요리 이야기를 나눠보세요." />
</svelte:head>

<main class="page">
	<Breadcrumb items={breadcrumbItems} />

	<section class="settings-header">
		<div>
			<h1>커뮤니티</h1>
			<p>요리에 대한 이야기를 나누고 다른 사람들의 다양한 노하우를 만나보세요.</p>
		</div>
	</section>

	<section class="board-section">
		<Board kind="community"/>
	</section>
</main>

<style>
	.page {
		width: min(1160px, calc(100% - 48px));
		min-height: 100vh;
		padding: 48px 24px 100px;
		background: var(--background);
		color: var(--text);
		margin: 0 auto;
	}

	/* Settings Header */
	.settings-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;
		padding-bottom: 28px;
		border-bottom: 1px solid var(--border);
		margin-bottom: 32px;
	}

	.settings-header h1 {
		margin: 0;
		font-size: 38px;
		font-weight: 750;
		letter-spacing: -0.07em;
		line-height: 1.3;
	}

	.settings-header p {
		margin: 9px 0 0;
		color: var(--text-muted);
		font-size: 13px;
		line-height: 1.7;
	}

	.board-section {
		margin-top: 24px;
	}

	/* Responsive */
	@media (max-width: 760px) {
		.page {
			padding: 35px 16px 70px;
		}

		.settings-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}

		.settings-header h1 {
			font-size: 30px;
		}
	}
</style>