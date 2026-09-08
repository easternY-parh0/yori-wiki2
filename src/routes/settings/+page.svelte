<script lang="ts">
	let notifications = $state(true);
	let recipeUpdates = $state(true);
	let communityUpdates = $state(false);
	let privateProfile = $state(false);
	let showActivity = $state(true);

	let showDeleteModal = $state(false);
</script>

<svelte:head>
	<title>설정 | 요리위키</title>
	<meta name="description" content="요리위키 계정 및 서비스 설정" />
</svelte:head>

<main class="page">
	<section class="settings-header">
		<div>
			<span class="section-label">SETTINGS</span>
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
						<a href="/profile/password" class="outline-button">비밀번호 변경</a>
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
					<a href="/terms">
						<div>
							<strong>이용약관</strong>
							<span>요리위키 서비스 이용약관을 확인합니다.</span>
						</div>
						<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
					</a>

					<a href="/privacy">
						<div>
							<strong>개인정보처리방침</strong>
							<span>개인정보 처리 및 보호에 관한 내용을 확인합니다.</span>
						</div>
						<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
					</a>

					<a href="/faq">
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
		min-height: 100vh;
		padding: 55px 24px 100px;
		background: var(--background);
		color: var(--text);
	}

	.settings-header {
		width: min(1080px, 100%);
		margin: 0 auto 42px;
		padding-bottom: 30px;
		border-bottom: 1px solid var(--border);
	}

	.section-label,
	.danger-label {
		color: var(--accent);
		font-size: 14px;
		font-weight: 800;
		letter-spacing: .1em;
	}

	.settings-header h1 {
		margin: 7px 0 8px;
		font-size: 29px;
		letter-spacing: -.06em;
	}

	.settings-header p {
		margin: 0;
		color: var(--text-muted);
		font-size: 14px;
	}

	.settings-layout {
		width: min(1080px, 100%);
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		gap: 40px;
		margin: 0 auto;
	}

	.settings-nav {
		position: sticky;
		top: 95px;
		align-self: start;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.settings-nav a {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 11px;
		border-radius: 9px;
		color: var(--text-subtle);
		font-size: 14px;
		font-weight: 650;
	}

	.settings-nav a:hover,
	.settings-nav a.active {
		background: var(--surface-yellow);
		color: var(--accent);
	}

	.settings-nav svg {
		width: 16px;
		height: 16px;
	}

	.settings-content {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.settings-card,
	.danger-card {
		border: 1px solid var(--border);
		border-radius: 14px;
		background: var(--surface);
	}

	.card-heading {
		display: flex;
		align-items: center;
		gap: 13px;
		padding: 21px 22px;
		border-bottom: 1px solid var(--border);
	}

	.heading-icon {
		width: 38px;
		height: 38px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 10px;
		background: var(--surface-yellow);
		color: var(--accent);
	}

	.heading-icon svg {
		width: 19px;
		height: 19px;
	}

	.card-heading h2 {
		margin: 0 0 4px;
		font-size: 14px;
		letter-spacing: -.03em;
	}

	.card-heading p {
		margin: 0;
		color: var(--text-muted);
		font-size: 14px;
	}

	.form-list,
	.option-list {
		padding: 0 22px;
	}

	.form-row,
	.option-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 25px;
		padding: 18px 0;
		border-bottom: 1px solid var(--border);
	}

	.form-row:last-child,
	.option-row:last-child {
		border-bottom: 0;
	}

	.form-row label,
	.option-row strong {
		display: block;
		margin-bottom: 4px;
		font-size: 14px;
		font-weight: 700;
	}

	.form-row span,
	.option-row span {
		color: var(--text-muted);
		font-size: 14px;
	}

	.input-wrap input {
		width: 230px;
		padding: 9px 11px;
		border: 1px solid var(--border);
		border-radius: 8px;
		outline: 0;
		background: var(--surface-subtle);
		color: var(--text);
		font: inherit;
		font-size: 14px;
	}

	.input-wrap input:focus {
		border-color: var(--primary);
	}

	.input-wrap input:disabled {
		opacity: .6;
		cursor: not-allowed;
	}

	.outline-button,
	.primary-button,
	.cancel-button,
	.danger-button {
		border-radius: 8px;
		padding: 9px 13px;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}

	.outline-button,
	.cancel-button {
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text);
	}

	.outline-button:hover,
	.cancel-button:hover {
		background: var(--surface-yellow);
		border-color: var(--primary);
	}

	.card-footer {
		display: flex;
		justify-content: flex-end;
		padding: 16px 22px;
		border-top: 1px solid var(--border);
	}

	.primary-button {
		border: 0;
		background: var(--primary);
		color: #0f172a;
	}

	.primary-button:hover {
		background: var(--accent);
		color: #fff;
	}

	.option-row {
		position: relative;
		cursor: pointer;
	}

	.option-row > div {
		min-width: 0;
		flex: 1;
	}

	.option-row input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
	}

	.toggle {
		position: relative;
		width: 35px !important;
		height: 20px;
		flex-shrink: 0;
		border-radius: 999px;
		background: var(--border);
		transition: background .2s;
	}

	.toggle::after {
		content: "";
		position: absolute;
		top: 3px;
		left: 3px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 1px 3px rgba(0,0,0,.15);
		transition: transform .2s;
	}

	.option-row input:checked + .toggle {
		background: var(--accent);
	}

	.option-row input:checked + .toggle::after {
		transform: translateX(15px);
	}

	.link-list {
		display: flex;
		flex-direction: column;
		padding: 0 22px;
	}

	.link-list a {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 17px 0;
		border-bottom: 1px solid var(--border);
	}

	.link-list a:last-child {
		border-bottom: 0;
	}

	.link-list a:hover strong {
		color: var(--accent);
	}

	.link-list a div {
		flex: 1;
	}

	.link-list strong,
	.link-list span {
		display: block;
	}

	.link-list strong {
		margin-bottom: 4px;
		font-size: 14px;
	}

	.link-list span {
		color: var(--text-muted);
		font-size: 14px;
	}

	.link-list svg {
		width: 14px;
		height: 14px;
		color: var(--text-muted);
	}

	.danger-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 20px 22px;
		border-color: rgba(220, 38, 38, .3);
	}

	.danger-card h2 {
		margin: 6px 0;
		font-size: 14px;
	}

	.danger-card p {
		margin: 0;
		color: var(--text-muted);
		font-size: 14px;
	}

	.danger-label {
		color: #dc2626;
	}

	.danger-button {
		border: 1px solid #dc2626;
		background: transparent;
		color: #dc2626;
		white-space: nowrap;
	}

	.danger-button:hover {
		background: #dc2626;
		color: #fff;
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: grid;
		place-items: center;
		padding: 20px;
		background: rgba(15, 23, 42, .65);
		backdrop-filter: blur(3px);
	}

	.modal {
		width: min(390px, 100%);
		padding: 28px;
		border: 1px solid var(--border);
		border-radius: 16px;
		background: var(--surface);
		color: var(--text);
		box-shadow: 0 20px 60px rgba(0,0,0,.2);
	}

	.modal-icon {
		width: 42px;
		height: 42px;
		display: grid;
		place-items: center;
		margin-bottom: 15px;
		border-radius: 11px;
		background: rgba(220, 38, 38, .1);
		color: #dc2626;
	}

	.modal-icon svg {
		width: 21px;
		height: 21px;
	}

	.modal h2 {
		margin: 0 0 8px;
		font-size: 15px;
	}

	.modal p {
		margin: 0;
		color: var(--text-muted);
		font-size: 14px;
		line-height: 1.7;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 7px;
		margin-top: 23px;
	}

	@media (max-width: 760px) {
		.settings-layout {
			grid-template-columns: 1fr;
			gap: 18px;
		}

		.settings-nav {
			position: static;
			flex-direction: row;
			overflow-x: auto;
			border-bottom: 1px solid var(--border);
		}

		.settings-nav a {
			flex-shrink: 0;
		}
	}

	@media (max-width: 560px) {
		.page {
			padding: 35px 16px 70px;
		}

		.form-row {
			align-items: flex-start;
			flex-direction: column;
			gap: 11px;
		}

		.input-wrap,
		.input-wrap input {
			width: 100%;
		}

		.danger-card {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>