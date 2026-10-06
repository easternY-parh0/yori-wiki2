<script lang="ts">
    import { appPath } from '$lib/app-path';
    import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';
    import RecipeLibrary from '$lib/components/RecipeLibrary.svelte';
    import baseProfileImg from '$lib/assets/image/base-profile.png';


    // 로그인 사용자 정보
    let currentUser = $state<{
        id: number;
        email: string;
        nickname: string;
        role: string;
    } | null>(null);

    let isLoadingUser = $state(true);

    // 프로필 표시용 상태
    let profileData = $state({
        username: '',
        avatarUrl: baseProfileImg
    });

    async function loadCurrentUser() {
        try {
            const response = await fetch('/api/auth/me', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`사용자 정보 조회 실패: ${response.status}`);
            }

            const data = await response.json();

            currentUser = data.user;

            if (data.user) {
                profileData.username = data.user.nickname;
            }
        } catch (error) {
            console.error('현재 사용자 정보를 불러오지 못했습니다.', error);
            currentUser = null;
        } finally {
            isLoadingUser = false;
        }
    }

    loadCurrentUser();

    const breadcrumbItems = [
        { label: '요리위키', href: appPath('/') },
        { label: '프로필' }
    ];
</script>

<svelte:head>
    <title>프로필 | 요리위키</title>
    <meta name="description" content="요리위키 사용자 프로필" />
</svelte:head>

<div class="page">
    <main>
        <div class="header-container">
            <Breadcrumb items={breadcrumbItems} />

            <header class="document-header">
                <div class="header-content">
                    <h1>프로필</h1>
                    <p class="lead">
                        회원님의 계정 정보를 확인할 수 있습니다.
                    </p>
                </div>
            </header>
        </div>

        <section class="profile-section">
            {#if isLoadingUser}
                <div class="profile-card loading">
                    <div class="loading-avatar"></div>

                    <div class="loading-content">
                        <div class="loading-line name"></div>
                        <div class="loading-line email"></div>
                        <div class="loading-line role"></div>
                    </div>
                </div>
            {:else if currentUser}
                <div class="profile-card">
                    <div class="profile-main">
                        <div class="profile-avatar">
                            <img
                                src={profileData.avatarUrl}
                                alt="프로필 사진"
                            />
                        </div>

                        <div class="profile-info">
                            <div class="profile-name-row">
                                <h2>{currentUser.nickname}</h2>

                                {#if currentUser.role}
                                    <span class="role-badge">
                                        {currentUser.role}
                                    </span>
                                {/if}
                            </div>

                            <p class="email">
                                {currentUser.email}
                            </p>

                            <div class="user-id">
                                회원번호 #{currentUser.id}
                            </div>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="empty-card">
                    <div class="empty-icon">!</div>

                    <h2>사용자 정보를 불러올 수 없습니다.</h2>

                    <p>
                        로그인 상태를 확인한 후 다시 시도해주세요.
                    </p>
                </div>
            {/if}
        </section>

        <RecipeLibrary />
    </main>
</div>



<style>
    .page {
        min-height: 100vh;
        background: var(--background);
        color: var(--text);
    }

    main {
        width: 100%;
        padding-bottom: 90px;
    }

    .header-container {
        width: min(1160px, calc(100% - 48px));
        margin: 0 auto;
        padding-top: 42px;
    }

    .document-header {
        padding-bottom: 28px;
        border-bottom: 1px solid var(--border);
    }

    .header-content {
        max-width: 680px;
    }

    h1 {
        margin: 0;
        font-size: 38px;
        font-weight: 750;
        letter-spacing: -0.075em;
        line-height: 1.25;
    }

    .lead {
        margin: 12px 0 0;
        color: var(--text-subtle);
        font-size: 14px;
        line-height: 1.85;
        letter-spacing: -0.015em;
    }

    .profile-section {
        width: min(1160px, calc(100% - 48px));
        margin: 48px auto 0;
    }

    .profile-card {
        display: flex;
        align-items: center;
        min-height: 220px;
        padding: 48px;
        border: 1px solid var(--border);
        border-radius: 24px;
        background: var(--surface);
        box-shadow: 0 8px 25px var(--shadow-card);
    }

    .profile-main {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    .profile-avatar {
        width: 128px;
        height: 128px;
        flex-shrink: 0;
        overflow: hidden;
        border: 2px solid var(--border-accent);
        border-radius: 50%;
        background: var(--surface-yellow);
    }

    .profile-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .profile-info {
        display: flex;
        flex-direction: column;
    }

    .profile-name-row {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .profile-name-row h2 {
        margin: 0;
        font-size: 28px;
        font-weight: 750;
        letter-spacing: -0.04em;
    }

    .role-badge {
        display: inline-flex;
        align-items: center;
        padding: 5px 11px;
        border-radius: 999px;
        background: var(--surface-yellow);
        color: var(--accent);
        font-size: 11px;
        font-weight: 750;
    }

    .email {
        margin: 10px 0 0;
        color: var(--text-subtle);
        font-size: 14px;
    }

    .user-id {
        margin-top: 14px;
        color: var(--text-muted);
        font-size: 11px;
    }

    /* Loading */
    .profile-card.loading {
        gap: 32px;
    }

    .loading-avatar {
        width: 128px;
        height: 128px;
        flex-shrink: 0;
        border-radius: 50%;
        background: var(--surface-subtle);
    }

    .loading-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .loading-line {
        height: 14px;
        border-radius: 6px;
        background: var(--surface-subtle);
    }

    .loading-line.name {
        width: 180px;
        height: 28px;
    }

    .loading-line.email {
        width: 240px;
    }

    .loading-line.role {
        width: 90px;
        height: 12px;
    }

    /* Empty */
    .empty-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 280px;
        padding: 40px;
        border: 1px solid var(--border);
        border-radius: 24px;
        background: var(--surface);
        text-align: center;
    }

    .empty-icon {
        display: grid;
        place-items: center;
        width: 42px;
        height: 42px;
        margin-bottom: 16px;
        border-radius: 50%;
        background: var(--surface-yellow);
        color: var(--accent);
        font-size: 20px;
        font-weight: 800;
    }

    .empty-card h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 750;
    }

    .empty-card p {
        margin: 8px 0 0;
        color: var(--text-muted);
        font-size: 13px;
    }

    @media (max-width: 700px) {
        .header-container,
        .profile-section {
            width: min(100% - 32px, 1160px);
        }

        .header-container {
            padding-top: 28px;
        }

        h1 {
            font-size: 31px;
        }

        .lead {
            font-size: 13px;
        }

        .profile-card {
            padding: 32px 24px;
        }

        .profile-main {
            gap: 20px;
        }

        .profile-avatar,
        .loading-avatar {
            width: 96px;
            height: 96px;
        }

        .profile-name-row {
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
        }

        .profile-name-row h2 {
            font-size: 23px;
        }
    }

    @media (max-width: 480px) {
        .profile-card {
            min-height: auto;
            padding: 28px 20px;
        }

        .profile-main {
            align-items: flex-start;
            flex-direction: column;
        }

        .profile-avatar,
        .loading-avatar {
            width: 88px;
            height: 88px;
        }

        .email {
            font-size: 13px;
            word-break: break-all;
        }
    }
</style>