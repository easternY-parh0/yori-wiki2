<script lang="ts">
	import { appPath } from '$lib/app-path';
	import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';

	// 빵부시 경로
	const breadcrumbItems = [
		{ label: '요리위키', href: appPath('/') },
		{ label: '문의하기' }
	];

	// 문의 폼 상태
	let name = $state('');
	let email = $state('');
	let category = $state('general');
	let subject = $state('');
	let message = $state('');
	let agreePrivacy = $state(false);
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!agreePrivacy) {
			alert('개인정보 수집 및 이용에 동의해주세요.');
			return;
		}

		isSubmitting = true;

		// API 전송 시뮬레이션
		setTimeout(() => {
			isSubmitting = false;
			isSuccess = true;

			// 폼 초기화
			name = '';
			email = '';
			category = 'general';
			subject = '';
			message = '';
			agreePrivacy = false;
		}, 1000);
	}
</script>

<svelte:head>
	<title>문의하기 | 요리위키</title>
	<meta name="description" content="요리위키에 궁금한 점이나 의견을 남겨주세요." />
</svelte:head>

<div class="page">
	<main>
		<div class="document">
			<!-- Breadcrumb -->
			<Breadcrumb items={breadcrumbItems} />

			<!-- Header -->
			<header class="document-header">
				<div class="header-content">
					<h1>문의하기</h1>
					<p class="lead">
						요리위키 서비스 이용 중 궁금한 점이나 제안하고 싶은 의견이 있으시다면 언제든
						문의해주세요. 확인 후 빠르게 답변드리겠습니다.
					</p>
				</div>
			</header>

			<!-- Quick Contact Grid -->
			<div class="contact-grid">
				<div class="contact-card">
					<div class="contact-icon">
						<svg viewBox="0 0 24 24">
							<path d="M4 5h16v14H4z" />
							<path d="M4 7l8 6 8-6" />
						</svg>
					</div>
					<div class="contact-content">
						<strong>이메일 문의</strong>
						<span>support@yoriwiki.com</span>
						<span class="sub-text">평일 10:00 - 18:00 (주말/공휴일 제외)</span>
					</div>
				</div>

				<div class="contact-card">
					<div class="contact-icon">
						<svg viewBox="0 0 24 24">
							<path
								d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
							/>
						</svg>
					</div>
					<div class="contact-content">
						<strong>커뮤니티 & 피드백</strong>
						<span>요리위키 카카오톡 채널</span>
						<span class="sub-text">@요리위키 공식 채널</span>
					</div>
				</div>
			</div>

			<!-- Contact Form Section -->
			<section class="form-section">
				<h2><span>01</span> 1:1 문의 접수</h2>

				{#if isSuccess}
					<div class="success-box">
						<div class="success-icon">
							<svg viewBox="0 0 24 24">
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
								<polyline points="22 4 12 14.01 9 11.01" />
							</svg>
						</div>
						<div class="success-content">
							<strong>문의가 성공적으로 접수되었습니다.</strong>
							<p>남겨주신 이메일로 빠른 시일 내에 답변드리도록 하겠습니다.</p>
							<button class="reset-btn" onclick={() => (isSuccess = false)}
								>추가 문의하기</button
							>
						</div>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="contact-form">
						<div class="form-grid">
							<!-- 이름/닉네임 -->
							<div class="form-group">
								<label for="name">이름 / 닉네임 <span class="required">*</span></label>
								<input
									type="text"
									id="name"
									bind:value={name}
									placeholder="성함 또는 닉네임을 입력해주세요"
									required
								/>
							</div>

							<!-- 이메일 -->
							<div class="form-group">
								<label for="email">답변받을 이메일 <span class="required">*</span></label>
								<input
									type="email"
									id="email"
									bind:value={email}
									placeholder="example@email.com"
									required
								/>
							</div>
						</div>

						<!-- 문의 유형 -->
						<div class="form-group">
							<label for="category">문의 유형 <span class="required">*</span></label>
							<select id="category" bind:value={category} required>
								<option value="general">일반 문의</option>
								<option value="account">계정 및 로그인</option>
								<option value="content">레시피/콘텐츠 수정 요청</option>
								<option value="bug">오류 및 버그 제보</option>
								<option value="partnership">제휴 및 사업 문의</option>
							</select>
						</div>

						<!-- 제목 -->
						<div class="form-group">
							<label for="subject">제목 <span class="required">*</span></label>
							<input
								type="text"
								id="subject"
								bind:value={subject}
								placeholder="문의 제목을 입력해주세요"
								required
							/>
						</div>

						<!-- 내용 -->
						<div class="form-group">
							<label for="message">문의 내용 <span class="required">*</span></label>
							<textarea
								id="message"
								rows="6"
								bind:value={message}
								placeholder="문의하실 내용을 상세히 적어주시면 더 정확한 답변이 가능합니다."
								required
							></textarea>
						</div>

						<!-- 개인정보 동의 -->
						<div class="agree-box">
							<label class="checkbox-label">
								<input type="checkbox" bind:checked={agreePrivacy} required />
								<span>
									[필수] 문의 처리를 위한 <strong>개인정보 수집 및 이용</strong>에
									동의합니다.
								</span>
							</label>
							<a href={appPath('/privacy')} target="_blank" class="privacy-link"
								>처리방침 보기</a
							>
						</div>

						<!-- 제출 버튼 -->
						<button type="submit" class="submit-btn" disabled={isSubmitting}>
							{isSubmitting ? '접수 중...' : '문의 보내기'}
						</button>
					</form>
				{/if}
			</section>

			<!-- Notice -->
			<div class="notice-box">
				<svg viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="9" />
					<path d="M12 11v5M12 8h.01" />
				</svg>
				<p>
					본 페이지의 문의하기 기능은 학교 프로젝트를 위한 시뮬레이션 예시입니다. 실제로 전송된
					데이터는 저장되지 않거나 별도 관리자 메일로 연동될 수 있습니다.
				</p>
			</div>
		</div>
	</main>
</div>

<style>
	svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.page {
		min-height: 100vh;
		background: var(--background);
	}

	main {
		min-height: calc(100vh - 68px);
		padding: 42px 24px 100px;
	}

	.document {
		width: min(1160px, calc(100% - 48px));
		margin: 0 auto;
	}

	/* Header */

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

	/* Contact Grid */

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
		margin: 28px 0 44px;
	}

	.contact-card {
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 18px 20px;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--surface-subtle);
	}

	.contact-icon {
		display: grid;
		width: 42px;
		height: 42px;
		flex-shrink: 0;
		place-items: center;
		border-radius: 9px;
		background: var(--surface-green);
		color: var(--accent);
	}

	.contact-icon svg {
		width: 21px;
		height: 21px;
	}

	.contact-content strong {
		display: block;
		color: var(--text);
		font-size: 14px;
		font-weight: 650;
	}

	.contact-content span {
		display: block;
		margin-top: 3px;
		color: var(--text-subtle);
		font-size: 13px;
	}

	.contact-content .sub-text {
		margin-top: 2px;
		color: var(--text-muted);
		font-size: 11px;
	}

	/* Form Section */

	.form-section {
		width: 100%;
		scroll-margin-top: 100px;
		padding: 0 0 40px;
		margin-bottom: 40px;
		border-bottom: 1px solid var(--border);
	}

	h2 {
		display: flex;
		align-items: baseline;
		gap: 10px;
		margin: 0 0 24px;
		font-size: 18px;
		font-weight: 700;
		letter-spacing: -0.055em;
	}

	h2 span {
		color: var(--accent);
		font-size: 14px;
		font-weight: 650;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-group label {
		color: var(--text);
		font-size: 13px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.required {
		color: var(--accent);
	}

	input[type='text'],
	input[type='email'],
	select,
	textarea {
		width: 100%;
		box-sizing: border-box;
		padding: 12px 14px;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--surface-subtle);
		color: var(--text);
		font-size: 13px;
		font-family: inherit;
		outline: none;
		transition: border-color 0.15s ease;
	}

	input[type='text']:focus,
	input[type='email']:focus,
	select:focus,
	textarea:focus {
		border-color: var(--accent);
	}

	textarea {
		resize: vertical;
		line-height: 1.6;
	}

	/* Checkbox & Agree Box */

	.agree-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 14px 16px;
		border-radius: 8px;
		background: var(--surface-subtle);
		font-size: 12px;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--text-subtle);
		cursor: pointer;
	}

	.checkbox-label input {
		accent-color: var(--accent);
		cursor: pointer;
	}

	.checkbox-label strong {
		color: var(--text);
	}

	.privacy-link {
		color: var(--text-muted);
		text-decoration: underline;
		font-size: 11px;
	}

	.privacy-link:hover {
		color: var(--accent);
	}

	/* Buttons */

	.submit-btn {
		width: 100%;
		padding: 14px;
		border: none;
		border-radius: 8px;
		background: var(--accent);
		color: #ffffff;
		font-size: 14px;
		font-weight: 650;
		letter-spacing: -0.02em;
		cursor: pointer;
		transition: opacity 0.15s ease;
	}

	.submit-btn:hover {
		opacity: 0.9;
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Success State */

	.success-box {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 24px;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--surface-subtle);
	}

	.success-icon {
		display: grid;
		width: 40px;
		height: 40px;
		place-items: center;
		border-radius: 50%;
		background: var(--surface-green);
		color: var(--accent);
		flex-shrink: 0;
	}

	.success-icon svg {
		width: 22px;
		height: 22px;
	}

	.success-content strong {
		display: block;
		color: var(--text);
		font-size: 15px;
		font-weight: 650;
	}

	.success-content p {
		margin: 6px 0 16px;
		color: var(--text-subtle);
		font-size: 13px;
	}

	.reset-btn {
		padding: 8px 16px;
		border: 1px solid var(--border);
		border-radius: 6px;
		background: var(--background);
		color: var(--text);
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
	}

	/* Notice */

	.notice-box {
		display: flex;
		align-items: flex-start;
		gap: 11px;
		width: 100%;
		box-sizing: border-box;
		padding: 15px 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		background: transparent;
		color: var(--text-subtle);
	}

	.notice-box svg {
		width: 17px;
		height: 17px;
		flex-shrink: 0;
		margin-top: 1px;
		color: var(--text-muted);
	}

	.notice-box p {
		margin: 0;
		font-size: 12px;
		line-height: 1.75;
	}

	/* Mobile Responsive */

	@media (max-width: 700px) {
		main {
			padding: 30px 16px 75px;
		}

		.document {
			width: 100%;
		}

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

		.contact-grid {
			grid-template-columns: 1fr;
			gap: 12px;
			margin: 20px 0 34px;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.agree-box {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}

		.form-section {
			padding-bottom: 34px;
			margin-bottom: 34px;
		}
	}
</style>