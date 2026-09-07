<script lang="ts">
	let showPassword = $state(false);
	let showPasswordConfirm = $state(false);

	let email = $state('');
	let nickname = $state('');
	let password = $state('');
	let passwordConfirm = $state('');
	let agreeTerms = $state(false);
	let agreePrivacy = $state(false);

	function handleSignup(event: SubmitEvent) {
		event.preventDefault();
		alert('회원가입 기능은 추후 연결됩니다.');
	}
</script>

<svelte:head>
	<title>회원가입 | 요리위키</title>
</svelte:head>

<div class="page">
	<main>
		<section class="signup-wrapper">
			<div class="signup-intro">
				<div class="intro-mark">
					<svg viewBox="0 0 24 24">
						<path d="M7 10V5" />
						<path d="M10 10V5" />
						<path d="M13 10V5" />
						<path d="M5 10h10" />
						<path d="M8 10v9" />
						<path d="M18 19V5" />
						<path d="M18 5c-2 2-2 5 0 7" />
					</svg>
				</div>

				<span class="intro-label">요리위키 시작하기</span>

				<h1>함께 요리하고,<br /><strong>함께 나눠요.</strong></h1>

				<p>
					나만의 레시피를 기록하고 다른 사람들의<br />
					맛있는 레시피도 만나보세요.
				</p>

				<div class="intro-points">
					<div>
						<div class="point-icon">
							<svg viewBox="0 0 24 24">
								<path d="M5 4h14v16H5z" />
								<path d="M8 8h8M8 12h8M8 16h5" />
							</svg>
						</div>
						<span>레시피 저장</span>
					</div>

					<div>
						<div class="point-icon">
							<svg viewBox="0 0 24 24">
								<path d="M20 11a8 8 0 1 1-2.3-5.7" />
								<path d="M20 4v6h-6" />
							</svg>
						</div>
						<span>나만의 기록</span>
					</div>

					<div>
						<div class="point-icon">
							<svg viewBox="0 0 24 24">
								<path d="M12 21s-7-4.4-7-10V5l7-2 7 2v6c0 5.6-7 10-7 10z" />
								<path d="M9 12l2 2 4-4" />
							</svg>
						</div>
						<span>커뮤니티 참여</span>
					</div>
				</div>
			</div>

			<div class="signup-card">
				<div class="card-heading">
					<h2>회원가입</h2>
					<p>요리위키 계정을 만들어보세요.</p>
				</div>

				<form onsubmit={handleSignup}>
					<div class="field">
						<label for="email">이메일 <b>*</b></label>
						<div class="input-with-button">
							<input id="email" type="email" bind:value={email} placeholder="example@email.com" required />
							<button type="button">중복 확인</button>
						</div>
					</div>

					<div class="field">
						<label for="nickname">닉네임 <b>*</b></label>
						<input id="nickname" type="text" bind:value={nickname} maxlength="20" placeholder="사용할 닉네임을 입력해주세요." required />
						<small>2~20자의 한글, 영문, 숫자를 사용할 수 있어요.</small>
					</div>

					<div class="field">
						<label for="password">비밀번호 <b>*</b></label>
						<div class="password-input">
							<input id="password" type={showPassword ? 'text' : 'password'} bind:value={password} placeholder="비밀번호를 입력해주세요." required />
							<button type="button" aria-label="비밀번호 표시" onclick={() => (showPassword = !showPassword)}>
								{#if showPassword}
									<svg viewBox="0 0 24 24">
										<path d="M3 3l18 18" />
										<path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
										<path d="M9.9 5.1A10.8 10.8 0 0 1 12 5c5 0 8 4 9 7-0.4 1.2-1.2 2.5-2.3 3.5" />
										<path d="M6.1 6.1C4.4 7.2 3.4 9 3 12c.9 3 4 7 9 7 1.3 0 2.5-.3 3.6-.8" />
									</svg>
								{:else}
									<svg viewBox="0 0 24 24">
										<path d="M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z" />
										<circle cx="12" cy="12" r="2.5" />
									</svg>
								{/if}
							</button>
						</div>
						<small>8자 이상, 영문과 숫자를 포함해주세요.</small>
					</div>

					<div class="field">
						<label for="password-confirm">비밀번호 확인 <b>*</b></label>
						<div class="password-input">
							<input id="password-confirm" type={showPasswordConfirm ? 'text' : 'password'} bind:value={passwordConfirm} placeholder="비밀번호를 다시 입력해주세요." required />
							<button type="button" aria-label="비밀번호 표시" onclick={() => (showPasswordConfirm = !showPasswordConfirm)}>
								{#if showPasswordConfirm}
									<svg viewBox="0 0 24 24">
										<path d="M3 3l18 18" />
										<path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
										<path d="M9.9 5.1A10.8 10.8 0 0 1 12 5c5 0 8 4 9 7-0.4 1.2-1.2 2.5-2.3 3.5" />
										<path d="M6.1 6.1C4.4 7.2 3.4 9 3 12c.9 3 4 7 9 7 1.3 0 2.5-.3 3.6-.8" />
									</svg>
								{:else}
									<svg viewBox="0 0 24 24">
										<path d="M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z" />
										<circle cx="12" cy="12" r="2.5" />
									</svg>
								{/if}
							</button>
						</div>
					</div>

					<div class="agreements">
						<label class="agreement all">
							<input type="checkbox" bind:checked={agreeTerms} />
							<span class="checkmark"></span>
							<strong>약관 전체 동의</strong>
						</label>

						<div class="agreement-divider"></div>

						<label class="agreement">
							<input type="checkbox" bind:checked={agreeTerms} />
							<span class="checkmark"></span>
							<span>서비스 이용약관 동의 <b>(필수)</b></span>
							<a href="/terms">보기</a>
						</label>

						<label class="agreement">
							<input type="checkbox" bind:checked={agreePrivacy} />
							<span class="checkmark"></span>
							<span>개인정보 처리방침 동의 <b>(필수)</b></span>
							<a href="/privacy">보기</a>
						</label>
					</div>

					<button class="signup-button" type="submit">
						회원가입
						<svg viewBox="0 0 24 24">
							<path d="M5 12h14" />
							<path d="M13 6l6 6-6 6" />
						</svg>
					</button>
				</form>

				<div class="login-link">
					이미 계정이 있으신가요?
					<a href="/login">로그인하기</a>
				</div>
			</div>
		</section>
	</main>
</div>

<style>
	:global(:root) {
		--background: #ffffff;
		--surface: #ffffff;
		--surface-subtle: #f8fafc;
		--surface-yellow: #fefce8;
		--surface-green: #f7fee7;
		--primary: #facc15;
		--accent: #65a30d;
		--text: #0f172a;
		--text-subtle: #64748b;
		--text-muted: #94a3b8;
		--border: #e2e8f0;
		--border-accent: #a3e635;
		--overlay: rgba(15, 23, 42, .25);
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
		--border-accent: #65a30d;
		--overlay: rgba(2, 6, 23, .72);
	}

	:global(:root),
	:global(body) {
		margin: 0;
		background: var(--background);
		color: var(--text);
	}

	:global(:root.dark-theme) {
		color-scheme: dark;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(button),
	:global(input) {
		font: inherit;
	}

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
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 60px 24px 90px;
	}

	.signup-wrapper {
		width: min(920px, 100%);
		display: grid;
		grid-template-columns: 1fr 430px;
		align-items: center;
		gap: 70px;
	}

	.signup-intro {
		padding: 10px 0;
	}

	.intro-mark {
		width: 48px;
		height: 48px;
		display: grid;
		place-items: center;
		margin-bottom: 22px;
		border-radius: 14px;
		background: var(--primary);
		color: #0f172a;
	}

	.intro-mark svg {
		width: 27px;
		height: 27px;
	}

	.intro-label {
		color: var(--accent);
		font-size: 10px;
		font-weight: 800;
	}

	.signup-intro h1 {
		margin: 12px 0 17px;
		font-size: 42px;
		line-height: 1.2;
		letter-spacing: -.075em;
	}

	.signup-intro h1 strong {
		color: var(--accent);
	}

	.signup-intro > p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 11px;
		line-height: 1.8;
	}

	.intro-points {
		display: flex;
		gap: 12px;
		margin-top: 35px;
	}

	.intro-points > div {
		min-width: 105px;
		padding: 12px;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--surface);
	}

	.point-icon {
		width: 28px;
		height: 28px;
		display: grid;
		place-items: center;
		margin-bottom: 8px;
		border-radius: 8px;
		background: var(--surface-green);
		color: var(--accent);
	}

	.point-icon svg {
		width: 15px;
		height: 15px;
	}

	.intro-points span {
		font-size: 8px;
		font-weight: 700;
	}

	.signup-card {
		padding: 31px;
		border: 1px solid var(--border);
		border-radius: 20px;
		background: var(--surface);
		box-shadow: 0 18px 50px rgba(15, 23, 42, .06);
	}

	.card-heading {
		margin-bottom: 25px;
	}

	.card-heading h2 {
		margin: 0 0 6px;
		font-size: 21px;
		letter-spacing: -.055em;
	}

	.card-heading p {
		margin: 0;
		color: var(--text-muted);
		font-size: 9px;
	}

	.signup-card form {
		display: flex;
		flex-direction: column;
		gap: 17px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	.field label {
		font-size: 9px;
		font-weight: 700;
	}

	.field label b {
		color: var(--accent);
	}

	.field input {
		width: 100%;
		height: 42px;
		padding: 0 12px;
		border: 1px solid var(--border);
		border-radius: 9px;
		outline: 0;
		background: var(--surface-subtle);
		color: var(--text);
		font-size: 9px;
	}

	.field input:focus {
		border-color: var(--primary);
		background: var(--surface);
	}

	.field input::placeholder {
		color: var(--text-muted);
	}

	.field small {
		color: var(--text-muted);
		font-size: 7px;
	}

	.input-with-button {
		display: flex;
		gap: 7px;
	}

	.input-with-button input {
		flex: 1;
	}

	.input-with-button button {
		padding: 0 12px;
		border: 1px solid var(--border);
		border-radius: 9px;
		background: var(--surface);
		color: var(--text-subtle);
		font-size: 8px;
		font-weight: 700;
		cursor: pointer;
		white-space: nowrap;
	}

	.input-with-button button:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.password-input {
		position: relative;
	}

	.password-input input {
		padding-right: 42px;
	}

	.password-input button {
		position: absolute;
		top: 50%;
		right: 5px;
		width: 32px;
		height: 32px;
		display: grid;
		place-items: center;
		border: 0;
		border-radius: 7px;
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		transform: translateY(-50%);
	}

	.password-input button:hover {
		color: var(--text);
		background: var(--surface-yellow);
	}

	.password-input svg {
		width: 16px;
		height: 16px;
	}

	.agreements {
		margin-top: 3px;
		padding: 14px;
		border-radius: 10px;
		background: var(--surface-subtle);
	}

	.agreement {
		position: relative;
		display: flex;
		align-items: center;
		gap: 8px;
		min-height: 27px;
		color: var(--text-subtle);
		font-size: 8px;
		cursor: pointer;
	}

	.agreement input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.checkmark {
		width: 15px;
		height: 15px;
		flex-shrink: 0;
		border: 1px solid var(--border);
		border-radius: 4px;
		background: var(--surface);
	}

	.agreement input:checked + .checkmark {
		border-color: var(--accent);
		background: var(--accent);
	}

	.agreement input:checked + .checkmark::after {
		content: '';
		display: block;
		width: 7px;
		height: 4px;
		margin: 3px 0 0 3px;
		border-bottom: 1.5px solid #fff;
		border-left: 1.5px solid #fff;
		transform: rotate(-45deg);
	}

	.agreement.all {
		color: var(--text);
		font-size: 9px;
	}

	.agreement.all .checkmark {
		width: 17px;
		height: 17px;
	}

	.agreement-divider {
		height: 1px;
		margin: 7px 0;
		background: var(--border);
	}

	.agreement b {
		color: var(--accent);
		font-weight: 700;
	}

	.agreement a {
		margin-left: auto;
		color: var(--text-muted);
		font-size: 7px;
		text-decoration: underline;
	}

	.signup-button {
		width: 100%;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: 2px;
		border: 0;
		border-radius: 9px;
		background: var(--primary);
		color: #0f172a;
		font-size: 9px;
		font-weight: 800;
		cursor: pointer;
	}

	.signup-button:hover {
		background: var(--accent);
		color: #fff;
	}

	.signup-button svg {
		width: 14px;
		height: 14px;
	}

	.login-link {
		margin-top: 20px;
		color: var(--text-muted);
		font-size: 8px;
		text-align: center;
	}

	.login-link a {
		margin-left: 5px;
		color: var(--accent);
		font-weight: 750;
	}

	.login-link a:hover {
		text-decoration: underline;
	}

	@media (max-width: 850px) {
		main {
			padding-top: 40px;
		}

		.signup-wrapper {
			grid-template-columns: 1fr;
			max-width: 480px;
			gap: 35px;
		}

		.signup-intro {
			text-align: center;
		}

		.intro-mark {
			margin-right: auto;
			margin-left: auto;
		}

		.intro-points {
			justify-content: center;
		}
	}

	@media (max-width: 520px) {
		main {
			padding: 30px 14px 60px;
		}

		.signup-intro h1 {
			font-size: 32px;
		}

		.signup-intro > p br {
			display: none;
		}

		.intro-points {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 6px;
		}

		.intro-points > div {
			min-width: 0;
			padding: 10px 7px;
		}

		.signup-card {
			padding: 23px 17px;
			border-radius: 16px;
		}
	}
</style>