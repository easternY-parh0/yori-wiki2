<script lang="ts">
	import { onMount } from 'svelte';
	import { appPath } from '$lib/app-path';
	import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';
    import PreparingModal from '$lib/components/layouts/PreparingModal.svelte';

	let isPreparingOpen = $state(true)

	// Svelte 5 Runes 상태 선언
	let theme = $state<'system' | 'light' | 'dark'>('system');
	let fontSize = $state<'small' | 'medium' | 'large'>('medium');

	let notifications = $state(true);
	let recipeUpdates = $state(true);
	let communityUpdates = $state(false);
	let marketingUpdates = $state(false);

	let privateProfile = $state(false);
	let showActivity = $state(true);
	let allowSearchEngine = $state(true);

	let showDeleteModal = $state(false);

	// 현재 활성화된 섹션 ID 감지 상태
	let activeSection = $state('account');

	const breadcrumbItems = [
		{ label: '요리위키', href: appPath('/') },
		{ label: '설정' }
	];

	// IntersectionObserver를 사용한 스크롤 감지 하이라이팅
	onMount(() => {
		const sections = document.querySelectorAll('section[id]');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{
				// 상단 헤더 높이(약 80px)를 고려하여 관찰 영역 오프셋 지정
				rootMargin: '-80px 0px -60% 0px',
				threshold: 0.1
			}
		);

		sections.forEach((section) => observer.observe(section));

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>설정 | 요리위키</title>
	<meta name="description" content="요리위키 계정 및 서비스 설정" />

	<!-- Font Awesome CDN -->
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
	/>
</svelte:head>

<PreparingModal bind:open={isPreparingOpen} />

<main class="page">
	<Breadcrumb items={breadcrumbItems} />

	<section class="settings-header">
		<div>
			<h1>설정</h1>
			<p>요리위키 이용 환경과 계정, 개인정보 보호 옵션을 자유롭게 관리하세요.</p>
		</div>
	</section>

	<div class="settings-layout">
		<!-- 좌측 사이드바 네비게이션 -->
		<aside class="settings-nav">
			<a href="#account" class:active={activeSection === 'account'}>
				<i class="fa-solid fa-user"></i>
				<span>계정</span>
			</a>

			<a href="#display" class:active={activeSection === 'display'}>
				<i class="fa-solid fa-palette"></i>
				<span>화면 테마</span>
			</a>

			<a href="#notifications" class:active={activeSection === 'notifications'}>
				<i class="fa-solid fa-bell"></i>
				<span>알림</span>
			</a>

			<a href="#privacy" class:active={activeSection === 'privacy'}>
				<i class="fa-solid fa-shield-halved"></i>
				<span>개인정보</span>
			</a>

			<a href="#service" class:active={activeSection === 'service'}>
				<i class="fa-solid fa-circle-info"></i>
				<span>서비스 정보</span>
			</a>
		</aside>

		<!-- 메인 설정 콘텐츠 영역 -->
		<div class="settings-content">
			<!-- 1. 계정 정보 -->
			<section id="account" class="settings-card">
				<div class="card-heading">
					<div class="heading-icon">
						<i class="fa-solid fa-user"></i>
					</div>

					<div>
						<h2>계정 정보</h2>
						<p>프로필 및 기본 계정 정보를 관리합니다.</p>
					</div>
				</div>

				<div class="form-list">
					<!-- 프로필 사진 -->
					<div class="form-row profile-row">
						<div>
							<span class="form-label">프로필 사진</span>
							<span>커뮤니티 및 작성한 레시피에 표시되는 이미지입니다.</span>
						</div>

						<div class="avatar-group">
							<div class="avatar-preview">
								<i class="fa-solid fa-utensils"></i>
							</div>

							<div class="avatar-actions">
								<button type="button" class="outline-button sm">
									사진 변경
								</button>

								<button type="button" class="text-button text-danger">
									삭제
								</button>
							</div>
						</div>
					</div>

					<!-- 닉네임 -->
					<div class="form-row">
						<div>
							<label for="nickname">닉네임</label>
							<span>다른 사용자에게 표시되는 이름입니다.</span>
						</div>

						<div class="input-wrap">
							<input
								id="nickname"
								value="사용자님"
								placeholder="닉네임을 입력하세요"
							/>
						</div>
					</div>

					<!-- 이메일 -->
					<div class="form-row">
						<div>
							<label for="email">이메일</label>
							<span>계정에 등록된 이메일 주소입니다. (변경 불가)</span>
						</div>

						<div class="input-wrap">
							<input
								id="email"
								type="email"
								value="placeholder@example.com"
								disabled
							/>
						</div>
					</div>

					<!-- 비밀번호 -->
					<div class="form-row">
						<div>
							<span class="form-label">비밀번호</span>
							<span>주기적으로 비밀번호를 변경하여 보안을 유지하세요.</span>
						</div>

						<a href={appPath('/profile/password')} class="outline-button">
							<i class="fa-solid fa-key icon-left"></i>
							비밀번호 변경
						</a>
					</div>
				</div>

				<div class="card-footer">
					<button class="primary-button" type="button">
						변경사항 저장
					</button>
				</div>
			</section>

			<!-- 2. 화면 및 테마 설정 -->
			<section id="display" class="settings-card">
				<div class="card-heading">
					<div class="heading-icon">
						<i class="fa-solid fa-palette"></i>
					</div>

					<div>
						<h2>화면 테마 및 디스플레이</h2>
						<p>앱의 가독성과 화면 모양을 맞춤 설정합니다.</p>
					</div>
				</div>

				<div class="form-list">
					<!-- 테마 모드 -->
					<div class="form-row">
						<div>
							<label for="theme">테마 모드</label>
							<span>선호하는 화면 색상 모드를 선택하세요.</span>
						</div>

						<div class="select-wrap">
							<select id="theme" bind:value={theme}>
								<option value="system">시스템 설정 따름</option>
								<option value="light">라이트 모드</option>
								<option value="dark">다크 모드</option>
							</select>
						</div>
					</div>

					<!-- 글자 크기 -->
					<div class="form-row">
						<div>
							<label for="font-size">본문 글자 크기</label>
							<span>레시피 상세 보기의 기본 텍스트 크기를 설정합니다.</span>
						</div>

						<div class="select-wrap">
							<select id="font-size" bind:value={fontSize}>
								<option value="small">작게</option>
								<option value="medium">보통 (기본)</option>
								<option value="large">크게</option>
							</select>
						</div>
					</div>
				</div>
			</section>

			<!-- 3. 알림 설정 -->
			<section id="notifications" class="settings-card">
				<div class="card-heading">
					<div class="heading-icon">
						<i class="fa-solid fa-bell"></i>
					</div>

					<div>
						<h2>알림 설정</h2>
						<p>원하는 수신 푸시/이메일 알림 항목을 지정합니다.</p>
					</div>
				</div>

				<div class="option-list">
					<label class="option-row">
						<div>
							<strong>전체 푸시 알림</strong>
							<span>요리위키의 주요 기능 수신 알림을 활성화합니다.</span>
						</div>

						<input
							type="checkbox"
							bind:checked={notifications}
						/>
						<span class="toggle"></span>
					</label>

					<label class="option-row">
						<div>
							<strong>레시피 알림</strong>
							<span>
								구독한 채널 및 관심 레시피의 신규 업데이트를 안내받습니다.
							</span>
						</div>

						<input
							type="checkbox"
							bind:checked={recipeUpdates}
						/>
						<span class="toggle"></span>
					</label>

					<label class="option-row">
						<div>
							<strong>커뮤니티 알림</strong>
							<span>내 글의 댓글, 좋아요 및 답글 소식을 알려드립니다.</span>
						</div>

						<input
							type="checkbox"
							bind:checked={communityUpdates}
						/>
						<span class="toggle"></span>
					</label>

					<label class="option-row">
						<div>
							<strong>이벤트 및 혜택 알림 (선택)</strong>
							<span>
								맞춤형 요리 클래스, 할인 쿠폰 및 이벤트 소식을 받습니다.
							</span>
						</div>

						<input
							type="checkbox"
							bind:checked={marketingUpdates}
						/>
						<span class="toggle"></span>
					</label>
				</div>
			</section>

			<!-- 4. 개인정보 및 공개 설정 -->
			<section id="privacy" class="settings-card">
				<div class="card-heading">
					<div class="heading-icon">
						<i class="fa-solid fa-shield-halved"></i>
					</div>

					<div>
						<h2>개인정보 및 공개 설정</h2>
						<p>프로필 및 내 활동 내역의 공개 범위를 조정합니다.</p>
					</div>
				</div>

				<div class="option-list">
					<label class="option-row">
						<div>
							<strong>비공개 프로필</strong>
							<span>
								다른 사용자가 내 프로필 방문 시 정보를 제한적으로 표시합니다.
							</span>
						</div>

						<input
							type="checkbox"
							bind:checked={privateProfile}
						/>
						<span class="toggle"></span>
					</label>

					<label class="option-row">
						<div>
							<strong>활동 내역 공개</strong>
							<span>
								스크랩한 레시피, 작성한 후기 등의 활동 내역을 공개합니다.
							</span>
						</div>

						<input
							type="checkbox"
							bind:checked={showActivity}
						/>
						<span class="toggle"></span>
					</label>

					<label class="option-row">
						<div>
							<strong>검색 엔진 수집 허용</strong>
							<span>
								외부 검색 엔진(구글, 네이버 등)에 내 공개 프로필 노출을 허용합니다.
							</span>
						</div>

						<input
							type="checkbox"
							bind:checked={allowSearchEngine}
						/>
						<span class="toggle"></span>
					</label>
				</div>
			</section>

			<!-- 5. 서비스 정보 -->
			<section id="service" class="settings-card">
				<div class="card-heading">
					<div class="heading-icon">
						<i class="fa-solid fa-circle-info"></i>
					</div>

					<div>
						<h2>서비스 정보 및 약관</h2>
						<p>요리위키 서비스 약관 및 버전 정보를 확인합니다.</p>
					</div>
				</div>

				<div class="link-list">
					<a href={appPath('/terms')}>
						<div>
							<strong>이용약관</strong>
							<span>요리위키 서비스 이용 약관을 확인합니다.</span>
						</div>

						<i class="fa-solid fa-chevron-right arrow-icon"></i>
					</a>

					<a href={appPath('/privacy')}>
						<div>
							<strong>개인정보처리방침</strong>
							<span>개인정보 수집 및 처리 보호 지침을 확인합니다.</span>
						</div>

						<i class="fa-solid fa-chevron-right arrow-icon"></i>
					</a>

					<a href={appPath('/faq')}>
						<div>
							<strong>자주 묻는 질문 (FAQ)</strong>
							<span>서비스 궁금증이나 이용 안내를 찾을 수 있습니다.</span>
						</div>

						<i class="fa-solid fa-chevron-right arrow-icon"></i>
					</a>

					<div class="info-row">
						<div>
							<strong>현재 앱 버전</strong>
							<span>v2.4.0 (최신 버전 사용 중)</span>
						</div>

						<span class="badge">최신</span>
					</div>
				</div>
			</section>

			<!-- 계정 삭제 카드 -->
			<section class="danger-card">
				<div>
					<span class="danger-label">DANGER ZONE</span>
					<h2>계정 삭제</h2>
					<p>
						계정을 삭제하면 등록한 레시피 및 북마크 정보가 모두
						복구 불가능하게 삭제됩니다.
					</p>
				</div>

				<button
					class="danger-button"
					type="button"
					onclick={() => (showDeleteModal = true)}
				>
					<i class="fa-solid fa-trash-can icon-left"></i>
					계정 삭제
				</button>
			</section>
		</div>
	</div>
</main>

<!-- 삭제 확인 모달 -->
{#if showDeleteModal}
	<div class="modal-backdrop">
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="delete-title"
		>
			<div class="modal-icon">
				<i class="fa-solid fa-triangle-exclamation"></i>
			</div>

			<h2 id="delete-title">정말 계정을 삭제하시겠습니까?</h2>

			<p>
				삭제된 계정과 모든 데이터는 복구할 수 없습니다.
				계속하시겠습니까?
			</p>

			<div class="modal-actions">
				<button
					type="button"
					class="cancel-button"
					onclick={() => (showDeleteModal = false)}
				>
					취소
				</button>

				<button
					type="button"
					class="danger-button"
					onclick={() => (showDeleteModal = false)}
				>
					삭제하기
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	/* 부드러운 스크롤 적용 */
	:global(html) {
		scroll-behavior: smooth;
	}

	.page {
		width: min(1160px, calc(100% - 48px));
		min-height: 100vh;
		padding: 48px 24px 100px;
		background: var(--background);
		color: var(--text);
		margin: 0 auto;
	}

	/* Header */
	.settings-header {
		padding-bottom: 28px;
		border-bottom: 1px solid var(--border);
	}

	.settings-header h1 {
		margin: 0;
		font-size: 36px;
		font-weight: 800;
		letter-spacing: -0.05em;
		line-height: 1.2;
	}

	.settings-header p {
		margin: 8px 0 0;
		color: var(--text-muted);
		font-size: 14px;
		line-height: 1.6;
	}

	/* Layout */
	.settings-layout {
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		gap: 50px;
		margin-top: 36px;
	}

	/* Navigation */
	.settings-nav {
		position: sticky;
		top: 100px;
		align-self: start;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.settings-nav a {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 14px;
		border-radius: 8px;
		color: var(--text-muted);
		font-size: 14px;
		font-weight: 550;
		text-decoration: none;
		transition: all 0.15s ease;
	}

	.settings-nav a i {
		font-size: 15px;
		width: 18px;
		text-align: center;
	}

	.settings-nav a:hover {
		color: var(--text);
		background: var(--surface-yellow, rgba(0, 0, 0, 0.03));
	}

	.settings-nav a.active {
		color: var(--accent, #e11d48);
		background: var(--surface-yellow, rgba(225, 29, 72, 0.08));
		font-weight: 700;
	}

	/* Content & Cards */
	.settings-content {
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.settings-card {
		padding: 0 0 38px;
		margin-bottom: 38px;
		border-bottom: 1px solid var(--border);
		scroll-margin-top: 100px;
	}

	.card-heading {
		display: flex;
		align-items: center;
		gap: 14px;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--border);
	}

	.heading-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: var(--surface-yellow, #f1f5f9);
		color: var(--accent, #0f172a);
		font-size: 16px;
	}

	.card-heading h2 {
		margin: 0;
		font-size: 18px;
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.card-heading p {
		margin: 3px 0 0;
		color: var(--text-muted);
		font-size: 12px;
	}

	/* Form Elements & Rows */
	.form-list {
		padding: 0;
	}

	.form-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;
		padding: 18px 0;
		border-bottom: 1px solid var(--border);
	}

	.form-row:last-child {
		border-bottom: 0;
	}

	.form-row > div:first-child {
		min-width: 0;
	}

	.form-row label,
	.form-label {
		display: block;
		margin-bottom: 4px;
		color: var(--text);
		font-size: 13px;
		font-weight: 650;
	}

	.form-row > div:first-child > span:not(.form-label) {
		display: block;
		color: var(--text-muted);
		font-size: 11px;
		line-height: 1.5;
	}

	/* Profile Avatar Row */
	.profile-row {
		align-items: center;
	}

	.avatar-group {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.avatar-preview {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--border);
		display: grid;
		place-items: center;
		font-size: 20px;
		color: var(--text-muted);
	}

	.avatar-actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	/* Inputs & Selects */
	.input-wrap input,
	.select-wrap select {
		width: 220px;
		box-sizing: border-box;
		padding: 8px 12px;
		border: 1px solid var(--border);
		border-radius: 8px;
		outline: none;
		background: transparent;
		color: var(--text);
		font: inherit;
		font-size: 13px;
		transition: border-color 0.15s ease;
	}

	.select-wrap select {
		cursor: pointer;
	}

	.input-wrap input:focus,
	.select-wrap select:focus {
		border-color: var(--accent);
	}

	.input-wrap input:disabled {
		color: var(--text-muted);
		background: rgba(0, 0, 0, 0.02);
		cursor: not-allowed;
	}

	/* Buttons */
	.icon-left {
		margin-right: 6px;
	}

	.outline-button,
	.primary-button,
	.cancel-button,
	.danger-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border-radius: 8px;
		padding: 8px 14px;
		font: inherit;
		font-size: 12px;
		font-weight: 650;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.outline-button.sm {
		padding: 6px 10px;
		font-size: 11px;
	}

	.text-button {
		background: none;
		border: none;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		padding: 4px 8px;
	}

	.text-danger {
		color: #dc2626;
	}

	.outline-button,
	.cancel-button {
		border: 1px solid var(--border);
		background: transparent;
		color: var(--text);
	}

	.outline-button:hover,
	.cancel-button:hover {
		border-color: var(--accent);
		background: var(--surface-yellow, rgba(0, 0, 0, 0.03));
		color: var(--accent);
	}

	.card-footer {
		display: flex;
		justify-content: flex-end;
		padding-top: 18px;
	}

	.primary-button {
		border: 1px solid var(--primary, #0f172a);
		background: var(--primary, #0f172a);
		color: #ffffff;
	}

	.primary-button:hover {
		border-color: var(--accent, #2563eb);
		background: var(--accent, #2563eb);
	}

	/* Option Switches (Toggles) */
	.option-list {
		padding: 0;
	}

	.option-row {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 25px;
		padding: 18px 0;
		border-bottom: 1px solid var(--border);
		cursor: pointer;
	}

	.option-row:last-child {
		border-bottom: 0;
	}

	.option-row > div {
		min-width: 0;
		flex: 1;
	}

	.option-row strong {
		display: block;
		margin-bottom: 3px;
		color: var(--text);
		font-size: 13px;
		font-weight: 650;
	}

	.option-row div span {
		display: block;
		color: var(--text-muted);
		font-size: 11px;
		line-height: 1.5;
	}

	.option-row input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}

	.toggle {
		position: relative;
		display: block;
		width: 36px !important;
		height: 20px;
		flex-shrink: 0;
		border-radius: 999px;
		background: var(--border);
		transition: background 0.2s ease;
	}

	.toggle::after {
		content: '';
		position: absolute;
		top: 3px;
		left: 3px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: #fff;
		transition: transform 0.2s ease;
	}

	.option-row input:checked + .toggle {
		background: var(--accent, #2563eb);
	}

	.option-row input:checked + .toggle::after {
		transform: translateX(16px);
	}

	/* Links & Service List */
	.link-list {
		display: flex;
		flex-direction: column;
	}

	.link-list a,
	.info-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
		padding: 16px 0;
		border-bottom: 1px solid var(--border);
		color: inherit;
		text-decoration: none;
	}

	.link-list a:last-child,
	.info-row:last-child {
		border-bottom: 0;
	}

	.link-list a:hover strong {
		color: var(--accent);
	}

	.link-list strong {
		display: block;
		margin-bottom: 3px;
		color: var(--text);
		font-size: 13px;
		font-weight: 650;
		transition: color 0.15s ease;
	}

	.link-list span {
		display: block;
		color: var(--text-muted);
		font-size: 11px;
	}

	.arrow-icon {
		font-size: 12px;
		color: var(--text-muted);
	}

	.badge {
		padding: 2px 8px;
		border-radius: 12px;
		background: rgba(34, 197, 94, 0.12);
		color: #16a34a;
		font-size: 10px;
		font-weight: 700;
	}

	/* Danger Card */
	.danger-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 25px;
		padding-top: 10px;
	}

	.danger-card h2 {
		margin: 4px 0;
		font-size: 15px;
		font-weight: 700;
	}

	.danger-card p {
		margin: 0;
		color: var(--text-muted);
		font-size: 12px;
	}

	.danger-label {
		display: block;
		color: #dc2626;
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.05em;
	}

	.danger-button {
		border: 1px solid rgba(220, 38, 38, 0.45);
		background: transparent;
		color: #dc2626;
		white-space: nowrap;
	}

	.danger-button:hover {
		background: #dc2626;
		color: #fff;
	}

	/* Modal */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: grid;
		place-items: center;
		padding: 20px;
		background: rgba(15, 23, 42, 0.6);
		backdrop-filter: blur(4px);
	}

	.modal {
		width: min(400px, 100%);
		box-sizing: border-box;
		padding: 28px;
		border: 1px solid var(--border);
		border-radius: 16px;
		background: var(--surface, #ffffff);
		color: var(--text);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
		text-align: center;
	}

	.modal-icon {
		width: 48px;
		height: 48px;
		margin: 0 auto 16px;
		border-radius: 50%;
		background: #fef2f2;
		color: #dc2626;
		display: grid;
		place-items: center;
		font-size: 20px;
	}

	.modal h2 {
		margin: 0 0 8px;
		font-size: 17px;
		font-weight: 700;
	}

	.modal p {
		margin: 0;
		color: var(--text-muted);
		font-size: 13px;
		line-height: 1.6;
	}

	.modal-actions {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-top: 24px;
	}

	/* Responsive Mobile */
	@media (max-width: 760px) {
		.page {
			padding: 24px 16px 60px;
		}

		.settings-header h1 {
			font-size: 28px;
		}

		.settings-layout {
			display: block;
			margin-top: 24px;
		}

		.settings-nav {
			position: static;
			flex-direction: row;
			gap: 8px;
			margin-bottom: 28px;
			overflow-x: auto;
			padding-bottom: 8px;
			border-bottom: 1px solid var(--border);
		}

		.settings-nav a {
			flex-shrink: 0;
			padding: 8px 12px;
			font-size: 13px;
			border-radius: 20px;
		}

		.settings-nav a span {
			white-space: nowrap;
		}

		.form-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
		}

		.input-wrap,
		.select-wrap,
		.input-wrap input,
		.select-wrap select {
			width: 100%;
		}

		.danger-card {
			flex-direction: column;
			align-items: flex-start;
		}

		.danger-button {
			width: 100%;
		}
	}
</style>