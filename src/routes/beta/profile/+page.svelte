<script lang="ts">
    import { appPath } from '$lib/app-path';
    import RecipeCard from '$lib/components/layouts/RecipeCard.svelte';
    import baseProfileImg from '$lib/assets/image/base-profile.png';
    import PreparingModal from '$lib/components/layouts/PreparingModal.svelte';
    import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';

    let isPreparingOpen = $state(true);

    // Breadcrumb 항목
    const breadcrumbItems = [
        { label: '요리위키', href: appPath('/') },
        { label: '프로필' }
    ];

    // 프로필 정보 상태 관리 (편집 가능)
    let isEditingProfile = $state(false);
    let profileData = $state({
        username: '요리왕김요리',
        plate: 'Lv.5 수석 셰프',
        bio: '맛있는 요리를 연구하고 기록하는 공간입니다.\n건강하고 따라 하기 쉬운 레시피를 주로 공유합니다. 언제나 즐겁게 요리해요!',
        avatarUrl: baseProfileImg
    });

    // 프로필 편집 임시 폼 상태
    let editForm = $state({ ...profileData });

    // 사용 가능한 플레이트(칭호) 옵션 목록
    const plateOptions = [
        'Lv.1 요리 입문자',
        'Lv.2 자취 요리사',
        'Lv.3 홈쿠킹 마스터',
        'Lv.4 레시피 탐험가',
        'Lv.5 수석 셰프'
    ];

    function handleStartEdit() {
        editForm = { ...profileData };
        isEditingProfile = true;
    }

    function handleSaveProfile() {
        profileData = { ...editForm };
        isEditingProfile = false;
    }

    function handleCancelEdit() {
        isEditingProfile = false;
    }

    function handleImageChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            editForm.avatarUrl = URL.createObjectURL(file);
        }
    }

    // Cozy 일력(캘린더) 데이터 및 상태 관리
    let selectedDate = $state('2026-08-27');
    let currentMonthLabel = $state('2026년 8월');

    const calendarDays = [
        { dateStr: '2026-08-24', dayNum: 24, dayOfWeek: 'MON', hasRecord: true },
        { dateStr: '2026-08-25', dayNum: 25, dayOfWeek: 'TUE', hasRecord: false },
        { dateStr: '2026-08-26', dayNum: 26, dayOfWeek: 'WED', hasRecord: true },
        { dateStr: '2026-08-27', dayNum: 27, dayOfWeek: 'THU', hasRecord: true },
        { dateStr: '2026-08-28', dayNum: 28, dayOfWeek: 'FRI', hasRecord: false },
        { dateStr: '2026-08-29', dayNum: 29, dayOfWeek: 'SAT', hasRecord: true },
        { dateStr: '2026-08-30', dayNum: 30, dayOfWeek: 'SUN', hasRecord: false }
    ];

    // 날짜별 요리 일지 상세 정보
    const calendarLogs: Record<string, { title: string; mealType: string; imageNote: string; memo: string; tags: string[] }> = {
        '2026-08-24': {
            title: '월요일 아침을 깨우는 아보카도 토스트',
            mealType: '아침 식사',
            imageNote: '🥑 노릇하게 구운 바게트 위에 아보카도 슬라이스',
            memo: '아침 일찍 일어나서 파슬리와 레드페퍼 홀을 살짝 뿌려 완성했다. 커피와 완벽한 조합!',
            tags: ['#간단아침', '#브런치', '#건강식']
        },
        '2026-08-26': {
            title: '매콤달콤 비빔국수와 군만두',
            mealType: '저녁 식사',
            imageNote: '🍜 얼음 동동 띄운 매콤한 양념장',
            memo: '퇴근 후 스트레스 풀 겸 청양고추 살짝 넣은 비빔국수! 바삭한 군만두와 같이 먹으니 꿀맛이다.',
            tags: ['#면요리', '#야식', '#스트레스해소']
        },
        '2026-08-27': {
            title: '정성이 가득 담긴 소고기 미역국 & 계란말이',
            mealType: '점심 식사',
            imageNote: '🍲 깊은 맛이 나는 진한 미역국 국물',
            memo: '참기름에 소고기를 오래 볶아 국물을 우려냈다. 포슬포슬한 폭탄 계란말이도 성공적!',
            tags: ['#집밥', '#한식', '#힐링푸드']
        },
        '2026-08-29': {
            title: '주말 특식 해물 파스타',
            mealType: '주말 저녁',
            imageNote: '🍝 가리비와 새우가 듬뿍 들어간 오일 파스타',
            memo: '화이트 와인을 살짝 넣어 풍미를 더했다. 친구들을 초대해서 함께 먹은 즐거운 하루.',
            tags: ['#파스타', '#홈파티', '#주말요리']
        }
    };

    // 탭 상태 관리
    let activeTab = $state('recipes');

    // 샘플 데이터
    const myRecipes = ['내가 만든 김치찌개 레시피', '초간단 계란볶음밥', '주말 브런치 토스트', '특제 소스 닭볶음탕'];
    const myPosts = ['요리할 때 알면 좋은 칼질 팁 공유합니다.', '자취생 필수 조리도구 추천 받습니다!'];
    const likedRecipes = ['매콤달콤 떡볶이 황금레시피', '겉바속촉 에어프라이어 삼겹살'];
    const bookmarkedRecipes = ['풍미 가득 버섯 크림 파스타', '든든한 소고기 미역국'];
    const collections = [
        { title: '자취생을 위한 초간단 10분 요리', count: 5 },
        { title: '주말에 도전하는 홈레스토랑 메뉴', count: 3 },
        { title: '여름철 시원한 디저트 모음', count: 4 }
    ];
    const notifications = [
        { id: 1, text: '회원님의 레시피에 "맛있는하루"님이 좋아요를 눌렀습니다.', time: '10분 전', unread: true },
        { id: 2, text: '"요리초보"님이 회원님을 팔로우하기 시작했습니다.', time: '1시간 전', unread: true },
        { id: 3, text: '작성하신 게시글에 새로운 댓글이 등록되었습니다.', time: '어제', unread: false }
    ];
    const recentActivities = [
        { type: '레시피', text: '"초간단 계란볶음밥" 레시피를 새로 등록했습니다.', time: '2일 전' },
        { type: '댓글', text: '"자취생 필수 조리도구 추천" 게시글에 댓글을 남겼습니다.', time: '3일 전' },
        { type: '좋아요', text: '"매콤달콤 떡볶이 황금레시피"에 좋아요를 눌렀습니다.', time: '5일 전' }
    ];

    // 활동 통계 Visual 데이터
    const monthlyStats = [
        { month: '4월', count: 2, x: 20, y: 70 },
        { month: '5월', count: 4, x: 100, y: 45 },
        { month: '6월', count: 3, x: 180, y: 58 },
        { month: '7월', count: 6, x: 260, y: 20 },
        { month: '8월', count: 5, x: 340, y: 32 }
    ];

    const categoryStats = [
        { label: '한식', percent: 45, color: '#f59e0b' },
        { label: '양식', percent: 30, color: '#10b981' },
        { label: '일식/중식', percent: 15, color: '#3b82f6' },
        { label: '디저트', percent: 10, color: '#ec4899' }
    ];
</script>

<svelte:head>
    <title>프로필 | 요리위키</title>
    <meta name="description" content="요리위키 마이 페이지" />
</svelte:head>

<PreparingModal bind:open={isPreparingOpen} />

<div class="page">
    <main>
        <!-- 0. 페이지 헤더 영역 (Breadcrumb & Title) -->
        <div class="header-container">
            <Breadcrumb items={breadcrumbItems} />

            <header class="document-header">
                <div class="header-content">
                    <h1>프로필</h1>
                    <p class="lead">
                        회원님의 레시피 활동 내역과 저장한 콘텐츠를 한눈에 관리하세요.
                    </p>
                </div>
            </header>
        </div>

        <!-- 1. 프로필 상단 요약/편집 섹션 -->
        <section class="profile-header-section">
            <div class="profile-main-card">
                {#if !isEditingProfile}
                    <!-- 프로필 조회 모드 -->
                    <div class="profile-info-area">
                        <div class="profile-avatar-container">
                            <img src={profileData.avatarUrl} alt="프로필 사진" />
                        </div>
                        <div class="profile-text-info">
                            <div class="username-row">
                                <h2>{profileData.username}</h2>
                                <span class="profile-plate">{profileData.plate}</span>
                            </div>
                            <p class="profile-bio">
                                {#each profileData.bio.split('\n') as line}
                                    {line}<br />
                                {/each}
                            </p>
                            
                            <div class="follow-stats">
                                <button type="button">
                                    <strong>팔로워</strong> <span>245</span>
                                </button>
                                <span class="dot-divider">•</span>
                                <button type="button">
                                    <strong>팔로잉</strong> <span>120</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="profile-actions">
                        <button type="button" class="primary-button" onclick={handleStartEdit}>
                            프로필 편집
                        </button>
                    </div>
                {:else}
                    <!-- 프로필 직접 편집 모드 -->
                    <div class="profile-edit-form">
                        <h3>프로필 수정</h3>
                        <div class="edit-grid">
                            <!-- 프로필 이미지 변경 -->
                            <div class="avatar-edit-area">
                                <div class="profile-avatar-container large">
                                    <img src={editForm.avatarUrl} alt="미리보기 프로필 사진" />
                                </div>
                                <label class="file-upload-btn">
                                    사진 변경
                                    <input type="file" accept="image/*" onchange={handleImageChange} hidden />
                                </label>
                            </div>

                            <!-- 프로필 정보 입력 필드 -->
                            <div class="fields-edit-area">
                                <div class="form-group">
                                    <label for="edit-nickname">닉네임</label>
                                    <input id="edit-nickname" type="text" bind:value={editForm.username} class="input-text" />
                                </div>

                                <div class="form-group">
                                    <label for="edit-plate">대표 플레이트(칭호)</label>
                                    <select id="edit-plate" bind:value={editForm.plate} class="input-select">
                                        {#each plateOptions as option}
                                            <option value={option}>{option}</option>
                                        {/each}
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="edit-bio">상태 메시지</label>
                                    <textarea id="edit-bio" bind:value={editForm.bio} rows="3" class="input-textarea"></textarea>
                                </div>

                                <div class="edit-action-buttons">
                                    <button type="button" class="save-button" onclick={handleSaveProfile}>저장 완료</button>
                                    <button type="button" class="cancel-button" onclick={handleCancelEdit}>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>

            <!-- 프로필 하단 활동 통계 수치 바 -->
            <div class="profile-stats-bar">
                <div class="stat-item">
                    <span class="stat-label">등록 레시피</span>
                    <span class="stat-value">12</span>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <span class="stat-label">작성 게시글</span>
                    <span class="stat-value">8</span>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <span class="stat-label">받은 좋아요</span>
                    <span class="stat-value">340</span>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <span class="stat-label">내 컬렉션</span>
                    <span class="stat-value">3</span>
                </div>
            </div>
        </section>

        <!-- 2. Cozy 일단력(캘린더) 기능 섹션 -->
        <section class="cozy-calendar-section">
            <div class="section-title">
                <h2>나의 요리 달력</h2>
                <div class="calendar-nav">
                    <button type="button" class="month-btn" aria-label="이전 달">&lt;</button>
                    <span class="month-label">{currentMonthLabel}</span>
                    <button type="button" class="month-btn" aria-label="다음 달">&gt;</button>
                </div>
            </div>

            <!-- 일력 형태의 날짜 선택 목록 -->
            <div class="cozy-calendar-grid">
                {#each calendarDays as day}
                    <button 
                        type="button" 
                        class="day-card" 
                        class:selected={selectedDate === day.dateStr}
                        class:has-record={day.hasRecord}
                        onclick={() => selectedDate = day.dateStr}
                    >
                        <span class="day-dot"></span>
                        <span class="day-number">{day.dayNum}</span>
                        <span class="day-week">{day.dayOfWeek}</span>
                    </button>
                {/each}
            </div>

            <!-- 선택된 날짜 상세 정보 영역 -->
            <div class="day-detail-panel">
                {#if calendarLogs[selectedDate]}
                    {@const log = calendarLogs[selectedDate]}
                    <div class="detail-header">
                        <div class="detail-badge">{log.mealType}</div>
                        <h3>{log.title}</h3>
                    </div>
                    <div class="detail-body">
                        <div class="detail-image-box">
                            <span>{log.imageNote}</span>
                        </div>
                        <div class="detail-memo">
                            <p>{log.memo}</p>
                            <div class="detail-tags">
                                {#each log.tags as tag}
                                    <span class="tag">{tag}</span>
                                {/each}
                            </div>
                        </div>
                    </div>
                {:else}
                    <div class="empty-detail">
                        <p>선택하신 날짜({selectedDate})에 작성된 요리 기록이 없습니다.</p>
                        <button type="button" class="add-log-btn">+ 오늘 요리 기록하기</button>
                    </div>
                {/if}
            </div>
        </section>

        <!-- 3. Visual 활동 통계 그래프 섹션 -->
        <section class="visual-analytics-section">
            <div class="section-title">
                <h2>활동 분석 그래프</h2>
                <span class="analytics-sub">최근 5개월간의 레시피 활동 리포트</span>
            </div>

            <div class="analytics-grid">
                <!-- 월별 레시피 등록 추이 선 그래프 -->
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>월별 레시피 작성 추이</h3>
                        <span class="highlight-text">이번 달 +5개</span>
                    </div>
                    <div class="line-chart-container">
                        <svg viewBox="0 0 360 100" class="line-chart-svg">
                            <line x1="0" y1="20" x2="360" y2="20" class="grid-line" />
                            <line x1="0" y1="50" x2="360" y2="50" class="grid-line" />
                            <line x1="0" y1="80" x2="360" y2="80" class="grid-line" />

                            <polygon points="20,100 20,70 100,45 180,58 260,20 340,32 340,100" class="chart-fill" />
                            <polyline points="20,70 100,45 180,58 260,20 340,32" class="chart-line" />

                            {#each monthlyStats as stat}
                                <circle cx={stat.x} cy={stat.y} r="4" class="chart-point" />
                                <text x={stat.x} y={stat.y - 10} text-anchor="middle" class="point-label">{stat.count}개</text>
                            {/each}
                        </svg>
                        <div class="chart-x-labels">
                            {#each monthlyStats as stat}
                                <span>{stat.month}</span>
                            {/each}
                        </div>
                    </div>
                </div>

                <!-- 선호 요리 카테고리 도넛 차트 -->
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>선호 요리 분야</h3>
                        <span class="highlight-text">한식 선호도 최고</span>
                    </div>
                    <div class="donut-chart-container">
                        <div class="donut-visual">
                            <svg viewBox="0 0 36 36" class="donut-svg">
                                <circle cx="18" cy="18" r="15.915" class="donut-ring" />
                                <circle cx="18" cy="18" r="15.915" class="donut-segment" stroke="#f59e0b" stroke-dasharray="45 55" stroke-dashoffset="25" />
                                <circle cx="18" cy="18" r="15.915" class="donut-segment" stroke="#10b981" stroke-dasharray="30 70" stroke-dashoffset="80" />
                                <circle cx="18" cy="18" r="15.915" class="donut-segment" stroke="#3b82f6" stroke-dasharray="15 85" stroke-dashoffset="50" />
                                <circle cx="18" cy="18" r="15.915" class="donut-segment" stroke="#ec4899" stroke-dasharray="10 90" stroke-dashoffset="35" />
                            </svg>
                            <div class="donut-center-text">
                                <strong>45%</strong>
                                <span>한식 비중</span>
                            </div>
                        </div>
                        <div class="chart-legend">
                            {#each categoryStats as cat}
                                <div class="legend-item">
                                    <span class="legend-color" style="background: {cat.color}"></span>
                                    <span class="legend-name">{cat.label}</span>
                                    <span class="legend-value">{cat.percent}%</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. 활동 알림 섹션 -->
        <section class="notification-section">
            <div class="section-title">
                <h2>활동 알림</h2>
                <span class="badge-new">새 소식 2개</span>
            </div>
            <div class="notification-list">
                {#each notifications as noti}
                    <div class="notification-item" class:unread={noti.unread}>
                        <div class="noti-dot"></div>
                        <p>{noti.text}</p>
                        <span class="noti-time">{noti.time}</span>
                    </div>
                {/each}
            </div>
        </section>

        <!-- 5. 탭 및 콘텐츠 네비게이션 섹션 -->
        <section class="content-section">
            <div class="tab-navigation">
                <button 
                    type="button" 
                    class:active={activeTab === 'recipes'} 
                    onclick={() => activeTab = 'recipes'}
                >
                    내가 만든 레시피 <span>{myRecipes.length}</span>
                </button>
                <button 
                    type="button" 
                    class:active={activeTab === 'posts'} 
                    onclick={() => activeTab = 'posts'}
                >
                    작성한 게시글 <span>{myPosts.length}</span>
                </button>
                <button 
                    type="button" 
                    class:active={activeTab === 'likes'} 
                    onclick={() => activeTab = 'likes'}
                >
                    좋아요한 레시피 <span>{likedRecipes.length}</span>
                </button>
                <button 
                    type="button" 
                    class:active={activeTab === 'bookmarks'} 
                    onclick={() => activeTab = 'bookmarks'}
                >
                    저장한 레시피 <span>{bookmarkedRecipes.length}</span>
                </button>
                <button 
                    type="button" 
                    class:active={activeTab === 'collections'} 
                    onclick={() => activeTab = 'collections'}
                >
                    내 컬렉션 <span>{collections.length}</span>
                </button>
            </div>

            <!-- 탭 콘텐츠 내용 -->
            <div class="tab-content">
                {#if activeTab === 'recipes'}
                    <div class="recipe-grid">
                        {#each myRecipes as recipe}
                            <RecipeCard title={recipe} views={45} />
                        {/each}
                    </div>
                {:else if activeTab === 'posts'}
                    <div class="post-list">
                        {#each myPosts as post}
                            <a href={appPath('/community/example')} class="post-row">
                                <div class="post-info">
                                    <strong>{post}</strong>
                                    <span>2026.08.27 · 조회 88</span>
                                </div>
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        {/each}
                    </div>
                {:else if activeTab === 'likes'}
                    <div class="recipe-grid">
                        {#each likedRecipes as recipe}
                            <RecipeCard title={recipe} views={312} />
                        {/each}
                    </div>
                {:else if activeTab === 'bookmarks'}
                    <div class="recipe-grid">
                        {#each bookmarkedRecipes as recipe}
                            <RecipeCard title={recipe} views={150} />
                        {/each}
                    </div>
                {:else if activeTab === 'collections'}
                    <div class="collection-grid">
                        {#each collections as col}
                            <div class="collection-card">
                                <div class="collection-cover"><span>컬렉션 이미지</span></div>
                                <div class="collection-info">
                                    <h3>{col.title}</h3>
                                    <p>레시피 {col.count}개 포함됨</p>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </section>

        <!-- 6. 최근 활동 타임라인 섹션 -->
        <section class="activity-timeline-section">
            <div class="section-title">
                <h2>최근 활동 내역</h2>
                <a href={appPath('/profile/activities')}>전체보기</a>
            </div>
            <div class="timeline-panel">
                {#each recentActivities as act}
                    <div class="timeline-item">
                        <span class="timeline-badge">{act.type}</span>
                        <p class="timeline-text">{act.text}</p>
                        <span class="timeline-time">{act.time}</span>
                    </div>
                {/each}
            </div>
        </section>
    </main>
</div>

<style>
    .page {
        min-height: 100vh;
        background: var(--background);
        color: var(--text);
    }

    svg {
        fill: none;
        stroke: currentColor;
        stroke-width: 1.7;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    main {
        width: 100%;
        padding-bottom: 90px;
    }

    /* 상단 헤더 컨테이너 */
    .header-container {
        width: min(1160px, calc(100% - 48px));
        margin: 0 auto;
        padding-top: 42px;
    }

    .document-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 40px;
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

    main > section {
        width: min(1160px, calc(100% - 48px));
        margin-left: auto;
        margin-right: auto;
        margin-top: 48px;
    }

    /* 프로필 상단 요약 카드 및 편집 폼 */
    .profile-header-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .profile-main-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 48px 40px;
        border: 1px solid var(--border);
        border-radius: 24px;
        background: var(--surface);
        box-shadow: 0 8px 25px var(--shadow-card);
    }

    .profile-info-area {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    .profile-avatar-container {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid var(--border-accent);
        background: var(--surface-yellow);
        flex-shrink: 0;
    }

    .profile-avatar-container.large {
        width: 120px;
        height: 120px;
    }

    .profile-avatar-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .profile-text-info h2 {
        margin: 0;
        font-size: 28px;
        letter-spacing: -.04em;
    }

    .username-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
    }

    .profile-plate {
        padding: 5px 12px;
        border-radius: 99px;
        background: var(--surface-yellow);
        color: var(--accent);
        font-size: 11px;
        font-weight: 750;
    }

    .profile-bio {
        margin: 0 0 16px;
        color: var(--text-subtle);
        font-size: 13px;
        line-height: 1.6;
    }

    .follow-stats {
        display: flex;
        align-items: center;
        gap: 14px;
        font-size: 13px;
        color: var(--text-muted);
    }

    .follow-stats button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font: inherit;
        color: var(--text-subtle);
    }

    .follow-stats button strong {
        color: var(--text);
        font-weight: 700;
    }

    .dot-divider {
        font-size: 8px;
        opacity: 0.5;
    }

    .primary-button {
        display: inline-block;
        padding: 12px 22px;
        border-radius: 12px;
        background: var(--primary);
        color: #0f172a;
        font-size: 12px;
        font-weight: 750;
        border: none;
        cursor: pointer;
        transition: .18s ease;
    }

    .primary-button:hover {
        background: var(--accent);
        color: #fff;
        transform: translateY(-1px);
    }

    /* 프로필 인라인 편집 스타일 */
    .profile-edit-form {
        width: 100%;
    }

    .profile-edit-form h3 {
        margin: 0 0 24px;
        font-size: 18px;
        font-weight: 750;
    }

    .edit-grid {
        display: grid;
        grid-template-columns: 160px 1fr;
        gap: 32px;
        align-items: start;
    }

    .avatar-edit-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .file-upload-btn {
        padding: 8px 14px;
        background: var(--surface-subtle);
        border: 1px solid var(--border);
        border-radius: 8px;
        font-size: 12px;
        font-weight: 650;
        cursor: pointer;
    }

    .fields-edit-area {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .form-group label {
        font-size: 12px;
        font-weight: 700;
        color: var(--text-subtle);
    }

    .input-text, .input-select, .input-textarea {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: var(--background);
        color: var(--text);
        font-size: 13px;
        font-family: inherit;
        box-sizing: border-box;
    }

    .input-textarea {
        resize: vertical;
    }

    .edit-action-buttons {
        display: flex;
        gap: 10px;
        margin-top: 12px;
    }

    .save-button {
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
        background: var(--accent);
        color: #fff;
        font-size: 12px;
        font-weight: 750;
        cursor: pointer;
    }

    .cancel-button {
        padding: 10px 20px;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: transparent;
        color: var(--text-subtle);
        font-size: 12px;
        font-weight: 650;
        cursor: pointer;
    }

    /* 프로필 하단 통계 바 */
    .profile-stats-bar {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 24px 32px;
        border: 1px solid var(--border);
        border-radius: 18px;
        background: var(--surface-subtle);
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    .stat-label {
        font-size: 11px;
        color: var(--text-muted);
    }

    .stat-value {
        font-size: 18px;
        font-weight: 800;
        color: var(--text);
        letter-spacing: -.03em;
    }

    .stat-divider {
        width: 1px;
        height: 24px;
        background: var(--border);
    }

    /* Cozy 일단력(캘린더) 스타일 */
    .cozy-calendar-section {
        margin-top: 52px;
    }

    .calendar-nav {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .month-btn {
        background: none;
        border: 1px solid var(--border);
        border-radius: 6px;
        width: 26px;
        height: 26px;
        cursor: pointer;
        font-size: 12px;
        color: var(--text-subtle);
    }

    .month-label {
        font-size: 13px;
        font-weight: 700;
        margin: 0 4px;
    }

    .cozy-calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 12px;
        margin-bottom: 20px;
    }

    .day-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px 10px;
        border: 1px solid var(--border);
        border-radius: 16px;
        background: var(--surface);
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
    }

    .day-card:hover {
        transform: translateY(-2px);
        border-color: var(--accent);
    }

    .day-card.selected {
        background: var(--surface-yellow);
        border-color: var(--accent);
        box-shadow: 0 4px 12px var(--shadow-card);
    }

    .day-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: transparent;
        margin-bottom: 6px;
    }

    .day-card.has-record .day-dot {
        background: var(--accent);
    }

    .day-number {
        font-size: 22px;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1;
    }

    .day-week {
        font-size: 11px;
        font-weight: 700;
        color: var(--text-muted);
        margin-top: 6px;
    }

    .day-card.selected .day-week {
        color: var(--accent);
    }

    .day-detail-panel {
        padding: 24px;
        border: 1px solid var(--border);
        border-radius: 20px;
        background: var(--surface);
    }

    .detail-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
    }

    .detail-badge {
        padding: 4px 10px;
        border-radius: 8px;
        background: var(--surface-yellow);
        color: var(--accent);
        font-size: 11px;
        font-weight: 700;
    }

    .detail-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 750;
    }

    .detail-body {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 20px;
        align-items: center;
    }

    .detail-image-box {
        height: 120px;
        border-radius: 14px;
        background: var(--surface-subtle);
        border: 1px dashed var(--border);
        display: grid;
        place-items: center;
        padding: 12px;
        text-align: center;
        font-size: 12px;
        color: var(--text-subtle);
    }

    .detail-memo p {
        margin: 0 0 14px;
        font-size: 13px;
        line-height: 1.7;
        color: var(--text-subtle);
    }

    .detail-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .tag {
        font-size: 11px;
        color: var(--accent);
        font-weight: 600;
    }

    .empty-detail {
        text-align: center;
        padding: 32px 16px;
        color: var(--text-muted);
    }

    .empty-detail p {
        margin: 0 0 14px;
        font-size: 13px;
    }

    .add-log-btn {
        padding: 8px 16px;
        border-radius: 10px;
        border: 1px solid var(--border);
        background: var(--surface);
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
    }

    /* Visual 그래프 섹션 스타일 */
    .visual-analytics-section {
        margin-top: 52px;
    }

    .analytics-sub {
        font-size: 11px;
        color: var(--text-muted);
    }

    .analytics-grid {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 16px;
    }

    .chart-card {
        padding: 24px;
        border: 1px solid var(--border);
        border-radius: 20px;
        background: var(--surface);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .chart-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .chart-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
    }

    .highlight-text {
        font-size: 11px;
        font-weight: 700;
        color: var(--accent);
        background: var(--surface-yellow);
        padding: 4px 8px;
        border-radius: 6px;
    }

    /* 선 그래프 */
    .line-chart-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .line-chart-svg {
        width: 100%;
        height: 120px;
        overflow: visible;
    }

    .grid-line {
        stroke: var(--border);
        stroke-dasharray: 4 4;
        stroke-width: 1;
    }

    .chart-fill {
        fill: var(--primary);
        opacity: 0.15;
    }

    .chart-line {
        stroke: var(--accent);
        stroke-width: 2.5;
        fill: none;
    }

    .chart-point {
        fill: var(--surface);
        stroke: var(--accent);
        stroke-width: 2.5;
    }

    .point-label {
        font-size: 9px;
        font-weight: 700;
        fill: var(--text);
    }

    .chart-x-labels {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        font-size: 11px;
        color: var(--text-muted);
    }

    /* 도넛 차트 */
    .donut-chart-container {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .donut-visual {
        position: relative;
        width: 110px;
        height: 110px;
        flex-shrink: 0;
    }

    .donut-svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
    }

    .donut-ring {
        fill: none;
        stroke: var(--border);
        stroke-width: 3.8;
    }

    .donut-segment {
        fill: none;
        stroke-width: 3.8;
        transition: stroke-dasharray 0.3s ease;
    }

    .donut-center-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .donut-center-text strong {
        font-size: 14px;
        font-weight: 800;
        line-height: 1;
    }

    .donut-center-text span {
        font-size: 9px;
        color: var(--text-muted);
        margin-top: 2px;
    }

    .chart-legend {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
    }

    .legend-color {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .legend-name {
        flex: 1;
        color: var(--text-subtle);
    }

    .legend-value {
        font-weight: 700;
        color: var(--text);
    }

    /* 활동 알림 섹션 */
    .section-title {
        display: flex;
        align-items: end;
        justify-content: space-between;
        margin-bottom: 16px;
    }

    .section-title h2 {
        margin: 0;
        font-size: 20px;
        letter-spacing: -.05em;
    }

    .section-title > a {
        color: var(--accent);
        font-size: 11px;
        font-weight: 700;
        text-decoration: none;
    }

    .badge-new {
        color: var(--accent);
        font-size: 11px;
        font-weight: 700;
    }

    .notification-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .notification-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 20px;
        border: 1px solid var(--border);
        border-radius: 14px;
        background: var(--surface);
        font-size: 12px;
        color: var(--text-subtle);
    }

    .notification-item.unread {
        background: var(--surface-green);
        border-color: var(--border-green);
        color: var(--text);
    }

    .noti-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--border);
    }

    .notification-item.unread .noti-dot {
        background: var(--accent);
    }

    .notification-item p {
        flex: 1;
        margin: 0;
    }

    .noti-time {
        font-size: 11px;
        color: var(--text-muted);
    }

    /* 탭 네비게이션 및 콘텐츠 섹션 */
    .content-section {
        margin-top: 52px;
    }

    .tab-navigation {
        display: flex;
        gap: 8px;
        border-bottom: 1px solid var(--border);
        margin-bottom: 24px;
        overflow-x: auto;
    }

    .tab-navigation button {
        padding: 12px 18px;
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        font: inherit;
        font-size: 13px;
        font-weight: 650;
        color: var(--text-muted);
        cursor: pointer;
        white-space: nowrap;
        transition: all .2s ease;
    }

    .tab-navigation button span {
        margin-left: 4px;
        font-size: 11px;
        color: var(--text-muted);
    }

    .tab-navigation button.active {
        color: var(--accent);
        border-bottom-color: var(--accent);
    }

    .tab-navigation button.active span {
        color: var(--accent);
    }

    .recipe-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
    }

    .post-list {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--border);
        border-radius: 16px;
        background: var(--surface);
        overflow: hidden;
    }

    .post-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--border);
        text-decoration: none;
        color: inherit;
        transition: background .15s ease;
    }

    .post-row:last-child {
        border-bottom: none;
    }

    .post-row:hover {
        background: var(--surface-yellow);
    }

    .post-info strong {
        display: block;
        font-size: 13px;
        font-weight: 650;
        margin-bottom: 4px;
    }

    .post-info span {
        font-size: 11px;
        color: var(--text-muted);
    }

    .post-row svg {
        width: 16px;
        height: 16px;
        color: var(--accent);
    }

    .collection-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    .collection-card {
        border: 1px solid var(--border);
        border-radius: 16px;
        background: var(--surface);
        overflow: hidden;
        transition: transform .18s ease;
    }

    .collection-card:hover {
        transform: translateY(-3px);
        border-color: var(--primary);
    }

    .collection-cover {
        height: 130px;
        background: var(--surface-yellow);
        display: grid;
        place-items: center;
        color: var(--accent);
        font-size: 10px;
        font-weight: 700;
    }

    .collection-info {
        padding: 16px;
    }

    .collection-info h3 {
        margin: 0 0 4px;
        font-size: 14px;
        font-weight: 700;
    }

    .collection-info p {
        margin: 0;
        font-size: 11px;
        color: var(--text-subtle);
    }

    /* 최근 활동 타임라인 섹션 */
    .activity-timeline-section {
        margin-top: 52px;
    }

    .timeline-panel {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--border);
        border-radius: 16px;
        background: var(--surface);
        overflow: hidden;
    }

    .timeline-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 16px 20px;
        border-bottom: 1px solid var(--border);
        font-size: 12px;
    }

    .timeline-item:last-child {
        border-bottom: none;
    }

    .timeline-badge {
        padding: 4px 10px;
        border-radius: 8px;
        background: var(--surface-yellow);
        color: var(--accent);
        font-size: 11px;
        font-weight: 700;
        flex-shrink: 0;
    }

    .timeline-text {
        flex: 1;
        margin: 0;
        color: var(--text-subtle);
    }

    .timeline-time {
        font-size: 11px;
        color: var(--text-muted);
    }

    @media (max-width: 900px) {
        .profile-main-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            padding: 28px;
        }

        .edit-grid {
            grid-template-columns: 1fr;
        }

        .cozy-calendar-grid {
            grid-template-columns: repeat(4, 1fr);
        }

        .detail-body {
            grid-template-columns: 1fr;
        }

        .profile-actions {
            width: 100%;
        }

        .profile-actions button {
            width: 100%;
        }

        .analytics-grid {
            grid-template-columns: 1fr;
        }

        .recipe-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .collection-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 700px) {
        .document-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 18px;
            padding-bottom: 24px;
        }

        h1 {
            font-size: 31px;
        }

        .lead {
            font-size: 13px;
            line-height: 1.8;
        }
    }

    @media (max-width: 600px) {
        .cozy-calendar-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .recipe-grid {
            grid-template-columns: 1fr;
        }

        .collection-grid {
            grid-template-columns: 1fr;
        }

        .profile-stats-bar {
            padding: 16px;
        }

        .stat-value {
            font-size: 15px;
        }

        .donut-chart-container {
            flex-direction: column;
        }
    }
</style>