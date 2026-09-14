<script lang="ts">
    import { appPath } from '$lib/app-path';
    import { page } from '$app/state';
    import { invalidateAll, goto } from '$app/navigation';
    import { authPost } from '$lib/auth';

    let logoutPending = $state(false);
    let authError = $state('');

    async function logout() {
        logoutPending = true;
        try { 
            await authPost('logout', {}); 
            await invalidateAll(); 
            closeMenu(); 
            await goto(appPath('/login')); 
        } catch (error) { 
            authError = error instanceof Error ? error.message : '로그아웃에 실패했습니다.'; 
        } finally { 
            logoutPending = false; 
        }
    }

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
        <a href={appPath('/')} class="navigation-logo" onclick={closeMenu}>
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

    <!-- 프로필 영역 (로그인 여부에 따른 분기) -->
    {#if page.data.user}
        <a href={appPath('/profile')} class="profile-card" onclick={closeMenu}>
            <div class="profile-icon">
                {#if page.data.user.avatarUrl}
                    <img src={page.data.user.avatarUrl} alt="프로필" class="avatar-img" />
                {:else}
                    <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="3" />
                        <path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
                    </svg>
                {/if}
            </div>

            <div class="profile-text">
                <strong>{page.data.user.nickname}님</strong>
                <span>마이페이지 보기</span>
            </div>

            <svg class="profile-arrow" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
            </svg>
        </a>
    {:else}
        <a href={appPath('/login')} class="profile-card guest-card" onclick={closeMenu}>
            <div class="profile-icon">
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="3" />
                    <path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
                </svg>
            </div>

            <div class="profile-text">
                <strong>로그인이 필요합니다</strong>
                <span>클릭하여 로그인하기</span>
            </div>

            <svg class="profile-arrow" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
            </svg>
        </a>
    {/if}

    <nav>
        <a href={appPath('/search')} onclick={closeMenu}>요리 탐색</a>
        <a href={appPath('/')} onclick={closeMenu}>
            <svg viewBox="0 0 24 24">
                <path d="M3 11.5L12 4l9 7.5M5.5 10v9h13v-9" />
            </svg>
            홈
        </a>

        <a href={appPath('/recipes')} onclick={closeMenu}>
            <svg viewBox="0 0 24 24">
                <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />
            </svg>
            레시피
        </a>

        <a href={appPath('/ingredients')} onclick={closeMenu}>
            <svg viewBox="0 0 24 24">
                <path d="M12 20c5-2 7-6 7-11-5 0-9 2-11 6M12 20C7 19 5 15 5 10c5 0 8 2 10 5" />
            </svg>
            식재료 위키
        </a>

        <a href={appPath('/community')} onclick={closeMenu}>
            <svg viewBox="0 0 24 24">
                <path d="M4 5h16v12H8l-4 3zM8 9h8M8 12h5" />
            </svg>
            커뮤니티
        </a>

        <!-- 로그인 회원 전용 메뉴 -->
        {#if page.data.user}
            <a href={appPath('/profile')} onclick={closeMenu}>
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="3" />
                    <path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
                </svg>
                마이페이지
            </a>
        {/if}
    </nav>

    <div class="navigation-bottom">
        <a href={appPath('/notice')} onclick={closeMenu}>공지사항</a>
        <a href={appPath('/faq')} onclick={closeMenu}>FAQ</a>
        <a href={appPath('/settings')} onclick={closeMenu}>설정</a>
    </div>
</aside>

<header>
    <div class="header-left">
        <button class="menu-button" type="button" aria-label="메뉴 열기" aria-expanded={menuOpen} onclick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </button>

        <a href={appPath('/')} class="header-logo">
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

        <a href={appPath('/search')} class="header-link-btn">탐색</a>

        {#if page.data.user}
            <!-- 로그인 시: 프로필 정보 + 로그아웃 버튼 -->
            <a href={appPath('/profile')} class="user-profile-badge">
                <div class="header-avatar">
                    {#if page.data.user.avatarUrl}
                        <img src={page.data.user.avatarUrl} alt="프로필" />
                    {:else}
                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="3" />
                            <path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
                        </svg>
                    {/if}
                </div>
                <span class="user-nickname">{page.data.user.nickname}님</span>
            </a>
            <button type="button" class="logout-button" onclick={logout} disabled={logoutPending}>로그아웃</button>
        {:else}
            <!-- 비로그인 시: 로그인 버튼 -->
            <a href={appPath('/login')} class="login-button">로그인</a>
        {/if}

        {#if authError}<span role="alert" class="auth-error-msg">{authError}</span>{/if}
    </div>
</header>

<style>
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
        gap: 10px;
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

    /* 헤더 로그인/탐색 버튼 공통 디자인 */
    .header-link-btn,
    .login-button {
        padding: 8px 16px;
        border-radius: 999px;
        background: var(--surface-subtle);
        color: var(--text);
        font-size: 14px;
        font-weight: 700;
        transition: background 0.2s ease;
    }

    .login-button {
        background: var(--primary);
        color: #0f172a;
    }

    .login-button:hover {
        background: var(--accent);
        color: #fff;
    }

    /* 상단 회원 전용 정보 배지 */
    .user-profile-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 12px 4px 4px;
        border-radius: 999px;
        background: var(--surface-yellow);
        text-decoration: none;
        color: var(--text);
    }

    .user-profile-badge:hover {
        opacity: 0.9;
    }

    .header-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--primary);
        display: grid;
        place-items: center;
        overflow: hidden;
        color: #0f172a;
    }

    .header-avatar img,
    .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .header-avatar svg {
        width: 18px;
        height: 18px;
    }

    .user-nickname {
        font-size: 13px;
        font-weight: 700;
    }

    .logout-button {
        padding: 7px 12px;
        border-radius: 8px;
        border: 1px solid var(--border);
        background: transparent;
        color: var(--text-subtle);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
    }

    .logout-button:hover {
        background: var(--surface-subtle);
        color: var(--text);
    }

    .auth-error-msg {
        font-size: 12px;
        color: #ef4444;
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
        border-radius: 999px;
        background: var(--surface-subtle);
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
        text-decoration: none;
    }

    .guest-card {
        border-color: var(--border);
        background: var(--surface-subtle);
    }

    .profile-icon {
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        flex-shrink: 0;
        border-radius: 50%;
        background: var(--primary);
        color: #0f172a;
        overflow: hidden;
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
        font-size: 13px;
        color: var(--text);
    }

    .profile-text span {
        margin-top: 2px;
        color: var(--text-muted);
        font-size: 11px;
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
        font-size: 14px;
        font-weight: 650;
        color: var(--text);
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
        border: 0;
        border-radius: 9px;
        background: var(--surface-subtle);
        color: var(--text-subtle);
        font-size: 11px;
        font-weight: 650;
        text-align: center;
        cursor: pointer;
    }

    @media (max-width: 560px) {
        header {
            padding: 0 16px;
        }

        .user-nickname {
            display: none;
        }

        .navigation {
            width: min(300px, 88vw);
        }
    }
</style>