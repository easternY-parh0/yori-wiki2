<script lang="ts">
	import { appPath } from '$lib/app-path';
	import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';

	let notifications = $state(true);
	let recipeUpdates = $state(true);
	let communityUpdates = $state(false);
	let privateProfile = $state(false);
	let showActivity = $state(true);

	let showDeleteModal = $state(false);

	const breadcrumbItems = [
		{ label: '요리위키', href: appPath('/') },
		{ label: '설정' }
	];
</script>

<svelte:head>
	<title>설정 | 요리위키</title>
	<meta name="description" content="요리위키 계정 및 서비스 설정" />
</svelte:head>

<main class="page">
	<Breadcrumb items={breadcrumbItems} />
	
	<section class="settings-header">
		<div>
			<h1>설정</h1>
			<p>요리위키 이용 환경과 계정 정보를 관리할 수 있습니다.</p>
		</div>
	</section>

	<div class="settings-layout">
		<aside class="settings-nav">
			<a href="#account" class="active">
				<svg viewBox="0 0 24 24">
					<circle cx="12" cy="8" r="3" />
					<path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
				</svg>
				계정
			</a>

			<a href="#notifications">
				<svg viewBox="0 0 24 24">
					<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
				</svg>
				알림
			</a>

			<a href="#privacy">
				<svg viewBox="0 0 24 24">
					<rect x="5" y="10" width="14" height="10" rx="2" />
					<path d="M8 10V7a4 4 0 0 1 8 0v3" />
				</svg>
				개인정보
			</a>

			<a href="#service">
				<svg viewBox="0 0 24 24">
					<path d="M12 3v18M3 12h18" />
					<circle cx="12" cy="12" r="9" />
				</svg>
				서비스
			</a>
		</aside>

		<div class="settings-content">
			<section id="account" class="settings-card">
				<div class="card-heading">
					<div class="heading-icon">
						<svg viewBox="0 0 24 24">
							<circle cx="12" cy="8" r="3" />
							<path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
						</svg>
					</div>
					<div>
						<h2>계정 정보</h2>
						<p>요리위키 계정의 기본 정보를 관리합니다.</p>
					</div>
				</div>

				<div class="form-list">
					<div class="form-row">
						<div>
							<label>닉네임</label>
							<span>다른 사용자에게 표시되는 이름입니다.</span>
						</div>
						<div class="input-wrap">
							<input value="사용자님" />
						</div>
					</div>

					<div class="form-row">
						<div>
							<label>이메일</label>
							<span>계정에 등록된 이메일 주소입니다.</span>
						</div>
						<div class="input-wrap">
							<input value="placeholder@example.com" disabled />
						</div>
					</div>

					<div class="form-row">
						<div>
							<label>비밀번호</label>
							<span>정기적으로 비밀번호를 변경하는 것을 권장합니다.</span>
						</div>
						<a href={appPath('/profile/password')} class="outline-button">비밀번호 변경</a>
					</div>
				</div>

				<div class="card-footer">
					<button class="primary-button" type="button">변경사항 저장</button>
				</div>
			</section>

			<section id="notifications" class="settings-card">
				<div class="card-heading">
					<div class="heading-icon">
						<svg viewBox="0 0 24 24">
							<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
						</svg>
					</div>
					<div>
						<h2>알림 설정</h2>
						<p>요리위키에서 받을 알림을 선택합니다.</p>
					</div>
				</div>

				<div class="option-list">
					<label class="option-row">
						<div>
							<strong>전체 알림</strong>
							<span>요리위키의 주요 소식을 알림으로 받습니다.</span>
						</div>
						<input type="checkbox" bind:checked={notifications} />
						<span class="toggle"></span>
					</label>

					<label class="option-row">
						<div>
							<strong>레시피 알림</strong>
							<span>관심 레시피와 관련된 새로운 소식을 받습니다.</span>
						</div>
						<input type="checkbox" bind:checked={recipeUpdates} />
						<span class="toggle"></span>
					</label>

					<label class="option-row">
						<div>
							<strong>커뮤니티 알림</strong>
							<span>댓글이나 게시글 활동에 대한 알림을 받습니다.</span>
						</div>
						<input type="checkbox" bind:checked={communityUpdates} />
						<span class="toggle"></span>
					</label>
				</div>
			</section>

			<section id="privacy" class="settings-card">
				<div class="card-heading">
					<div class="heading-icon">
						<svg viewBox="0 0 24 24">
							<rect x="5" y="10" width="14" height="10" rx="2" />
							<path d="M8 10V7a4 4 0 0 1 8 0v3" />
						</svg>
					</div>
					<div>
						<h2>개인정보 및 공개 설정</h2>
						<p>프로필과 활동 정보의 공개 범위를 설정합니다.</p>
					</div>
				</div>

				<div class="option-list">
					<label class="option-row">
						<div>
							<strong>비공개 프로필</strong>
							<span>다른 사용자에게 프로필 정보를 제한적으로 표시합니다.</span>
						</div>
						<input type="checkbox" bind:checked={privateProfile} />
						<span class="toggle"></span>
					</label>

					<label class="option-row">
						<div>
							<strong>활동 내역 표시</strong>
							<span>좋아요, 레시피 등록 등의 활동을 프로필에 표시합니다.</span>
						</div>
						<input type="checkbox" bind:checked={showActivity} />
						<span class="toggle"></span>
					</label>
				</div>
			</section>

			<section id="service" class="settings-card">
				<div class="card-heading">
					<div class="heading-icon">
						<svg viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="3" />
							<path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6.4v-2.5h.1a1.7 1.7 0 0 0 1.5-1A1.7 1.7 0 0 0 7.7 8.6l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.1h2.5v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.4 1z" />
						</svg>
					</div>
					<div>
						<h2>서비스</h2>
						<p>요리위키 서비스와 관련된 정보를 확인합니다.</p>
					</div>
				</div>

				<div class="link-list">
					<a href={appPath('/terms')}>
						<div>
							<strong>이용약관</strong>
							<span>요리위키 서비스 이용약관을 확인합니다.</span>
						</div>
						<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
					</a>

					<a href={appPath('/privacy')}>
						<div>
							<strong>개인정보처리방침</strong>
							<span>개인정보 처리 및 보호에 관한 내용을 확인합니다.</span>
						</div>
						<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
					</a>

					<a href={appPath('/faq')}>
						<div>
							<strong>자주 묻는 질문</strong>
							<span>서비스 이용에 궁금한 점이 있다면 확인해보세요.</span>
						</div>
						<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
					</a>
				</div>
			</section>

			<section class="danger-card">
				<div>
					<span class="danger-label">ACCOUNT</span>
					<h2>계정 삭제</h2>
					<p>계정을 삭제하면 작성한 레시피와 활동 정보가 삭제될 수 있습니다.</p>
				</div>

				<button class="danger-button" type="button" onclick={() => (showDeleteModal = true)}>
					계정 삭제
				</button>
			</section>
		</div>
	</div>
</main>

{#if showDeleteModal}
	<div class="modal-backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
			<div class="modal-icon">
				<svg viewBox="0 0 24 24">
					<path d="M12 9v4M12 17h.01" />
					<path d="M10.3 4.5L2.8 17.5A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.5l-7.5-13a2 2 0 0 0-3.4 0z" />
				</svg>
			</div>

			<h2 id="delete-title">계정을 삭제하시겠어요?</h2>
			<p>실제 서비스에서는 계정 삭제 전 확인 절차가 진행됩니다. 현재는 화면만 구현되어 있습니다.</p>

			<div class="modal-actions">
				<button type="button" class="cancel-button" onclick={() => (showDeleteModal = false)}>취소</button>
				<button type="button" class="danger-button" onclick={() => (showDeleteModal = false)}>삭제하기</button>
			</div>
		</div>
	</div>
{/if}

<style>
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

	/* Layout */

	.settings-layout {
		display: grid;
		grid-template-columns: 150px minmax(0, 1fr);
		gap: 60px;
		margin-top: 38px;
	}

	/* Navigation */

	.settings-nav {
		position: sticky;
		top: 90px;
		align-self: start;
		display: flex;
		flex-direction: column;
	}

	.settings-nav a {
		display: block;
		padding: 9px 0;
		color: var(--text-muted);
		font-size: 13px;
		font-weight: 550;
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.settings-nav a:hover,
	.settings-nav a.active {
		color: var(--text);
	}

	.settings-nav a.active {
		font-weight: 700;
	}

	.settings-nav svg {
		display: none;
	}

	/* Content */

	.settings-content {
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	/* Sections */

	.settings-card {
		padding: 0 0 38px;
		margin-bottom: 38px;
		border-bottom: 1px solid var(--border);
	}

	.card-heading {
		display: block;
		padding: 0 0 19px;
		border-bottom: 1px solid var(--border);
	}

	.heading-icon {
		display: none;
	}

	.card-heading h2 {
		margin: 0 0 5px;
		font-size: 17px;
		font-weight: 700;
		letter-spacing: -0.045em;
	}

	.card-heading p {
		margin: 0;
		color: var(--text-muted);
		font-size: 12px;
		line-height: 1.7;
	}

	/* Account */

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

	.form-row label {
		display: block;
		margin-bottom: 4px;
		color: var(--text);
		font-size: 13px;
		font-weight: 650;
	}

	.form-row span {
		display: block;
		color: var(--text-muted);
		font-size: 11px;
		line-height: 1.6;
	}

	.input-wrap {
		flex-shrink: 0;
	}

	.input-wrap input {
		width: 230px;
		box-sizing: border-box;
		padding: 8px 10px;
		border: 1px solid var(--border);
		border-radius: 7px;
		outline: none;
		background: transparent;
		color: var(--text);
		font: inherit;
		font-size: 12px;
		transition: border-color 0.15s ease;
	}

	.input-wrap input:focus {
		border-color: var(--accent);
	}

	.input-wrap input:disabled {
		color: var(--text-muted);
		opacity: 0.7;
		cursor: not-allowed;
	}

	/* Buttons */

	.outline-button,
	.primary-button,
	.cancel-button,
	.danger-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border-radius: 7px;
		padding: 8px 12px;
		font: inherit;
		font-size: 11px;
		font-weight: 650;
		text-decoration: none;
		cursor: pointer;
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;
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
		background: var(--surface-yellow);
		color: var(--accent);
	}

	.card-footer {
		display: flex;
		justify-content: flex-end;
		padding-top: 17px;
	}

	.primary-button {
		border: 1px solid var(--primary);
		background: var(--primary);
		color: #0f172a;
	}

	.primary-button:hover {
		border-color: var(--accent);
		background: var(--accent);
		color: #fff;
	}

	/* Options */

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
		margin-bottom: 4px;
		color: var(--text);
		font-size: 13px;
		font-weight: 650;
	}

	.option-row div span {
		display: block;
		color: var(--text-muted);
		font-size: 11px;
		line-height: 1.6;
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
		width: 32px !important;
		height: 18px;
		flex-shrink: 0;
		border-radius: 999px;
		background: var(--border);
		transition: background 0.2s ease;
	}

	.toggle::after {
		content: "";
		position: absolute;
		top: 3px;
		left: 3px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #fff;
		transition: transform 0.2s ease;
	}

	.option-row input:checked + .toggle {
		background: var(--accent);
	}

	.option-row input:checked + .toggle::after {
		transform: translateX(14px);
	}

	/* Service */

	.link-list {
		display: flex;
		flex-direction: column;
	}

	.link-list a {
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 17px 0;
		border-bottom: 1px solid var(--border);
		color: inherit;
		text-decoration: none;
	}

	.link-list a:last-child {
		border-bottom: 0;
	}

	.link-list a:hover strong {
		color: var(--accent);
	}

	.link-list a div {
		flex: 1;
		min-width: 0;
	}

	.link-list strong {
		display: block;
		margin-bottom: 4px;
		color: var(--text);
		font-size: 13px;
		font-weight: 650;
		transition: color 0.15s ease;
	}

	.link-list span {
		display: block;
		color: var(--text-muted);
		font-size: 11px;
		line-height: 1.6;
	}

	.link-list svg {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
		color: var(--text-muted);
	}

	/* Account Delete */

	.danger-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 25px;
		padding-top: 3px;
	}

	.danger-card h2 {
		margin: 5px 0;
		font-size: 14px;
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.danger-card p {
		margin: 0;
		color: var(--text-muted);
		font-size: 11px;
		line-height: 1.7;
	}

	.danger-label {
		display: block;
		color: #dc2626;
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.08em;
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
		background: rgba(15, 23, 42, 0.58);
		backdrop-filter: blur(3px);
	}

	.modal {
		width: min(380px, 100%);
		box-sizing: border-box;
		padding: 27px;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--surface);
		color: var(--text);
		box-shadow: 0 18px 50px rgba(0, 0, 0, 0.16);
	}

	.modal-icon {
		display: none;
	}

	.modal h2 {
		margin: 0 0 8px;
		font-size: 16px;
		font-weight: 700;
		letter-spacing: -0.04em;
	}

	.modal p {
		margin: 0;
		color: var(--text-muted);
		font-size: 12px;
		line-height: 1.75;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 7px;
		margin-top: 22px;
	}

	/* Mobile */

	@media (max-width: 760px) {
		.page {
			padding: 35px 16px 70px;
		}

		.settings-header {
			padding-bottom: 24px;
		}

		.settings-header h1 {
			font-size: 30px;
		}

		.settings-header p {
			font-size: 12px;
		}

		.settings-layout {
			display: block;
			margin-top: 25px;
		}

		.settings-nav {
			position: static;
			display: flex;
			flex-direction: row;
			gap: 22px;
			margin-bottom: 32px;
			overflow-x: auto;
			border-bottom: 1px solid var(--border);
		}

		.settings-nav a {
			flex-shrink: 0;
			padding: 0 0 11px;
			font-size: 12px;
		}

		.settings-nav a.active {
			border-bottom: 1px solid var(--text);
		}

		.settings-card {
			padding-bottom: 32px;
			margin-bottom: 32px;
		}

		.card-heading {
			padding-bottom: 16px;
		}

		.card-heading h2 {
			font-size: 16px;
		}

		.card-heading p {
			font-size: 11px;
		}

		.form-row {
			align-items: flex-start;
			flex-direction: column;
			gap: 10px;
		}

		.input-wrap {
			width: 100%;
		}

		.input-wrap input {
			width: 100%;
		}

		.form-row .outline-button {
			align-self: flex-start;
		}

		.option-row {
			gap: 15px;
		}

		.danger-card {
			align-items: flex-start;
			flex-direction: column;
		}

		.danger-button {
			align-self: flex-start;
		}
	}
</style>