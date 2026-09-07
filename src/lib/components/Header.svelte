<script lang="ts">
	let {
		darkMode = false,
		toggleTheme
	}: {
		darkMode?: boolean;
		toggleTheme: () => void;
	} = $props();

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

{#if menuOpen}
	<button class="overlay" type="button" aria-label="메뉴 닫기" onclick={closeMenu}></button>
{/if}

<aside class:visible={menuOpen} class="navigation">
	<div class="navigation-header">
		<a href="/" class="navigation-logo" onclick={closeMenu}>
			<div class="brand-mark">
				<svg viewBox="0 0 24 24">
					<path d="M7 10V5M10 10V5M13 10V5M5 10h10M8 10v9M18 19V5M18 5c-2 2-2 5 0 7" />
				</svg>
			</div>
			<span>요리위키</span>
		</a>

		<button class="close-button" type="button" aria-label="메뉴 닫기" onclick={closeMenu}>
			<svg viewBox="0 0 24 24">
				<path d="M6 6l12 12M18 6L6 18" />
			</svg>
		</button>
	</div>

	<a href="/profile" class="profile-card" onclick={closeMenu}>
		<div class="profile-icon">
			<svg viewBox="0 0 24 24">
				<circle cx="12" cy="8" r="3" />
				<path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
			</svg>
		</div>

		<div class="profile-text">
			<strong>사용자님</strong>
			<span>마이페이지</span>
		</div>

		<svg class="profile-arrow" viewBox="0 0 24 24">
			<path d="M9 5l7 7-7 7" />
		</svg>
	</a>

	<nav>
		<a href="/" onclick={closeMenu}>
			<svg viewBox="0 0 24 24">
				<path d="M3 11.5L12 4l9 7.5M5.5 10v9h13v-9" />
			</svg>
			홈
		</a>

		<a href="/recipes" onclick={closeMenu}>
			<svg viewBox="0 0 24 24">
				<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />
			</svg>
			레시피
		</a>

		<a href="/ingredients" onclick={closeMenu}>
			<svg viewBox="0 0 24 24">
				<path d="M12 20c5-2 7-6 7-11-5 0-9 2-11 6M12 20C7 19 5 15 5 10c5 0 8 2 10 5" />
			</svg>
			식재료 위키
		</a>

		<a href="/community" onclick={closeMenu}>
			<svg viewBox="0 0 24 24">
				<path d="M4 5h16v12H8l-4 3zM8 9h8M8 12h5" />
			</svg>
			커뮤니티
		</a>

		<a href="/profile" onclick={closeMenu}>
			<svg viewBox="0 0 24 24">
				<circle cx="12" cy="8" r="3" />
				<path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
			</svg>
			마이페이지
		</a>
	</nav>

	<div class="navigation-bottom">
		<a href="/notice" onclick={closeMenu}>공지사항</a>
		<a href="/faq" onclick={closeMenu}>FAQ</a>
		<a href="/settings" onclick={closeMenu}>설정</a>
	</div>
</aside>

<header>
	<div class="header-left">
		<button class="menu-button" type="button" aria-label="메뉴 열기" aria-expanded={menuOpen} onclick={toggleMenu}>
			<span></span>
			<span></span>
			<span></span>
		</button>

		<a href="/" class="header-logo">
			<div class="brand-mark">
				<svg viewBox="0 0 24 24">
					<path d="M7 10V5M10 10V5M13 10V5M5 10h10M8 10v9M18 19V5M18 5c-2 2-2 5 0 7" />
				</svg>
			</div>
			요리위키
		</a>
	</div>

	<div class="header-actions">
		<button class="theme-button" type="button" aria-label="다크모드 전환" onclick={toggleTheme}>
            {#if darkMode}
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            {:else}
                <svg viewBox="0 0 24 24">
                    <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5a8.5 8.5 0 1 0 12 12z" />
                </svg>
            {/if}
        </button>

		<a href="/login" class="login-button">로그인</a>
	</div>
</header>

<style>
	:global(:root) {
		--background: #fff;
		--surface: #fff;
		--surface-subtle: #f8fafc;
		--surface-yellow: #fefce8;
		--surface-green: #f7fee7;
		--primary: #facc15;
		--accent: #65a30d;
		--text: #0f172a;
		--text-subtle: #64748b;
		--text-muted: #94a3b8;
		--border: #e2e8f0;
		--overlay: rgba(15, 23, 42, 0.25);
	}

	:global(:root.dark-theme) {
		--background: #0f172a;
		--surface: #1e293b;
		--surface-subtle: #172235;
		--surface-yellow: #292614;
		--surface-green: #172414;
		--primary: #facc15;
		--accent: #84cc16;
		--text: #f8fafc;
		--text-subtle: #94a3b8;
		--text-muted: #94a3b8;
		--border: #334155;
		--overlay: rgba(2, 6, 23, 0.72);
		color-scheme: dark;
	}

	:global(body) {
		margin: 0;
		background: var(--background);
		color: var(--text);
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	header {
		position: sticky;
		top: 0;
		z-index: 50;
		height: 68px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32px;
		background: var(--background);
		border-bottom: 1px solid var(--border);
	}

	.header-left,
	.header-actions {
		display: flex;
		align-items: center;
	}

	.header-actions {
		gap: 8px;
	}

	.menu-button {
		width: 38px;
		height: 38px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
		margin-right: 10px;
		border: 0;
		border-radius: 10px;
		background: transparent;
		cursor: pointer;
	}

	.menu-button:hover,
	.theme-button:hover {
		background: var(--surface-yellow);
	}

	.menu-button span {
		width: 19px;
		height: 2px;
		border-radius: 999px;
		background: var(--text);
	}

	.header-logo,
	.navigation-logo {
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 800;
		letter-spacing: -0.06em;
	}

	.header-logo {
		font-size: 20px;
	}

	.brand-mark {
		width: 28px;
		height: 28px;
		display: grid;
		place-items: center;
		border-radius: 9px;
		background: var(--primary);
		color: #0f172a;
	}

	.brand-mark svg {
		width: 18px;
		height: 18px;
	}

	.theme-button {
		width: 38px;
		height: 38px;
		display: grid;
		place-items: center;
		border: 0;
		border-radius: 10px;
		background: transparent;
		color: var(--text);
		cursor: pointer;
	}

	.theme-button svg {
		width: 19px;
		height: 19px;
	}

	.login-button {
		padding: 9px 15px;
		border-radius: 999px;
		background: var(--primary);
		color: #0f172a;
		font-size: 11px;
		font-weight: 750;
	}

	.login-button:hover {
		background: var(--accent);
		color: #fff;
	}

	.overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		border: 0;
		background: var(--overlay);
		backdrop-filter: blur(2px);
	}

	.navigation {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 110;
		width: 300px;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		padding: 24px 18px;
		background: var(--surface);
		border-right: 1px solid var(--border);
		box-shadow: 12px 0 35px rgba(0, 0, 0, 0.12);
		transform: translateX(-100%);
		transition: transform 0.25s ease;
	}

	.navigation.visible {
		transform: translateX(0);
	}

	.navigation-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 4px 6px 22px;
		border-bottom: 1px solid var(--border);
	}

	.close-button {
		width: 34px;
		height: 34px;
		display: grid;
		place-items: center;
		border: 0;
		border-radius: 9px;
		background: var(--surface-yellow);
		color: var(--text);
		cursor: pointer;
	}

	.close-button svg {
		width: 17px;
		height: 17px;
	}

	.profile-card {
		display: flex;
		align-items: center;
		gap: 11px;
		margin: 18px 0 10px;
		padding: 13px;
		border: 1px solid var(--primary);
		border-radius: 13px;
		background: var(--surface-yellow);
	}

	.profile-icon {
		width: 36px;
		height: 36px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 10px;
		background: var(--primary);
		color: #0f172a;
	}

	.profile-icon svg {
		width: 19px;
		height: 19px;
	}

	.profile-text {
		min-width: 0;
		flex: 1;
	}

	.profile-text strong,
	.profile-text span {
		display: block;
	}

	.profile-text strong {
		font-size: 11px;
	}

	.profile-text span {
		margin-top: 3px;
		color: var(--text-muted);
		font-size: 8px;
	}

	.profile-arrow {
		width: 15px;
		height: 15px;
		color: var(--accent);
	}

	.navigation nav {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-top: 9px;
	}

	.navigation nav a {
		display: flex;
		align-items: center;
		gap: 13px;
		padding: 12px 13px;
		border-radius: 11px;
		font-size: 13px;
		font-weight: 650;
	}

	.navigation nav a:hover {
		background: var(--surface-yellow);
	}

	.navigation nav svg {
		width: 18px;
		height: 18px;
	}

	.navigation-bottom {
		display: flex;
		gap: 7px;
		margin-top: auto;
		padding-top: 18px;
		border-top: 1px solid var(--border);
	}

	.navigation-bottom a {
		flex: 1;
		padding: 10px;
		border-radius: 9px;
		background: var(--surface-subtle);
		color: var(--text-subtle);
		font-size: 9px;
		font-weight: 650;
		text-align: center;
	}

	@media (max-width: 560px) {
		header {
			padding: 0 16px;
		}

		.login-button {
			display: none;
		}

		.navigation {
			width: min(300px, 88vw);
		}
	}
</style>