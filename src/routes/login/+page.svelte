<script lang="ts">
	import { appPath } from '$lib/app-path';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { authPost } from '$lib/auth';
	let pending = $state(false);
	let message = $state('');

	let showPassword = $state(false);
	let rememberMe = $state(false);

	let email = $state('');
	let password = $state('');

	async function login() {
		if (pending) return;
		pending = true;
		message = '';
		try {
			await authPost('login', { email, password, rememberMe });
			await invalidateAll();
			await goto(appPath('/'));
		} catch (error) { message = error instanceof Error ? error.message : '로그인에 실패했습니다.'; }
		finally { pending = false; }
	}

</script>

<svelte:head>
	<title>로그인 | 요리위키</title>
	<meta name="description" content="요리위키 로그인" />
</svelte:head>

<div class="page">
	<main>
		<section class="login-layout">
			<div class="login-intro">
				<div class="intro-mark">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M7 10V5" />
						<path d="M10 10V5" />
						<path d="M13 10V5" />
						<path d="M5 10h10" />
						<path d="M8 10v9" />
						<path d="M18 19V5" />
						<path d="M18 5c-2 2-2 5 0 7" />
					</svg>
				</div>

				<h1>
					다시 만났네요.<br />
					<span>무엇을 만들어 볼까요?</span>
				</h1>

				<p>
					로그인하면 저장한 레시피와 좋아요,
					<br />
					나만의 레시피를 한곳에서 관리할 수 있어요.
				</p>

				<div class="intro-line">
					<span></span>
					맛있는 요리를 함께 만들어보세요.
				</div>
			</div>

			<div class="login-card">
				<div class="card-heading">
					<h2>로그인</h2>
					<p>요리위키 계정으로 로그인하세요.</p>
				</div>

				{#if page.url.searchParams.get('registered') === '1'}<p role="status">회원가입이 완료되었습니다. 로그인해주세요.</p>{/if}
				{#if message}<p role="alert">{message}</p>{/if}
				<form onsubmit={(event) => { event.preventDefault(); login(); }}>
					<div class="field">
						<label for="email">이메일</label>

						<div class="input-wrap">
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<rect x="3" y="5" width="18" height="14" rx="2" />
								<path d="M3 7l9 6 9-6" />
							</svg>

							<input
								id="email"
								type="email"
								bind:value={email}
								placeholder="이메일을 입력하세요"
								autocomplete="email"
								required
							/>
						</div>
					</div>

					<div class="field">
						<div class="field-label">
							<label for="password">비밀번호</label>
							<a href={appPath('/password/reset')}>비밀번호 찾기</a>
						</div>

						<div class="input-wrap">
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<rect x="4" y="10" width="16" height="10" rx="2" />
								<path d="M8 10V7a4 4 0 0 1 8 0v3" />
							</svg>

							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								bind:value={password}
								placeholder="비밀번호를 입력하세요"
								autocomplete="current-password"
								required
							/>

							<button
								type="button"
								class="password-toggle"
								aria-label={showPassword
									? '비밀번호 숨기기'
									: '비밀번호 표시'}
								onclick={() => (showPassword = !showPassword)}
							>
								{#if showPassword}
									<svg viewBox="0 0 24 24">
										<path d="M3 3l18 18" />
										<path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
										<path d="M9.9 4.3A11 11 0 0 1 12 4c5 0 8.5 4 9.5 8a12 12 0 0 1-3.1 5.1" />
										<path d="M6.2 6.2C4.4 7.5 3.3 9.3 2.5 12c1 4 4.5 8 9.5 8 1 0 1.9-.2 2.8-.5" />
									</svg>
								{:else}
									<svg viewBox="0 0 24 24">
										<path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
										<circle cx="12" cy="12" r="2.5" />
									</svg>
								{/if}
							</button>
						</div>
					</div>

					<label class="remember">
						<input type="checkbox" bind:checked={rememberMe} />
						<span class="checkbox"></span>
						<span>로그인 상태 유지</span>
					</label>

					<button class="submit-button" type="submit" disabled={pending}>
						로그인
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M5 12h14" />
							<path d="M13 6l6 6-6 6" />
						</svg>
					</button>
				</form>

				<div class="divider">
					<span>또는</span>
				</div>

				<div class="signup">
					<span>아직 계정이 없나요?</span>
					<a href={appPath('/signup')}>회원가입</a>
				</div>

				<p class="notice">
					본 서비스는 웹프로그래밍 프로젝트를 위해 제작되었습니다.
				</p>
			</div>
		</section>
	</main>
</div>

<style>
	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
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
		flex: 1;
		display: grid;
		place-items: center;
		padding: 70px 24px;
		background: var(--background);
	}

	.login-layout {
		width: min(100%, 980px);
		display: grid;
		grid-template-columns: 1fr 420px;
		gap: 80px;
		align-items: center;
	}

	.login-intro {
		padding-left: 15px;
	}

	.intro-mark {
		width: 52px;
		height: 52px;
		display: grid;
		place-items: center;
		border-radius: 15px;
		background: var(--primary);
		color: #0f172a;
	}

	.intro-mark svg {
		width: 30px;
		height: 30px;
	}

	.login-intro h1 {
		margin: 24px 0 17px;
		font-size: clamp(35px, 4vw, 51px);
		line-height: 1.14;
		letter-spacing: -.075em;
	}

	.login-intro h1 span {
		color: var(--accent);
	}

	.login-intro > p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 1.85;
	}

	.intro-line {
		display: flex;
		align-items: center;
		gap: 9px;
		margin-top: 30px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.intro-line span {
		width: 25px;
		height: 1px;
		background: var(--primary);
	}

	.login-card {
		padding: 32px;
		border: 1px solid var(--border);
		border-radius: 20px;
		background: var(--surface);
		box-shadow: 0 20px 50px var(--shadow-card);
	}

	.card-heading {
		margin-bottom: 27px;
	}

	.card-heading h2 {
		margin: 0 0 7px;
		font-size: 24px;
		letter-spacing: -.06em;
	}

	.card-heading p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 14px;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 19px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	.field > label,
	.field-label label {
		color: var(--text);
		font-size: 14px;
		font-weight: 700;
	}

	.field-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.field-label a {
		color: var(--accent);
		font-size: 14px;
	}

	.input-wrap {
		height: 47px;
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 0 12px;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--surface-subtle);
		transition: border-color .15s ease, background-color .15s ease;
	}

	.input-wrap:focus-within {
		border-color: var(--primary);
		background: var(--surface);
	}

	.input-wrap > svg {
		width: 17px;
		height: 17px;
		flex-shrink: 0;
		color: var(--accent);
	}

	.input-wrap input {
		flex: 1;
		min-width: 0;
		height: 100%;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--text);
		font-size: 14px;
	}

	.input-wrap input::placeholder {
		color: var(--text-muted);
	}

	.password-toggle {
		width: 25px;
		height: 25px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border: 0;
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
	}

	.password-toggle:hover {
		color: var(--accent);
	}

	.password-toggle svg {
		width: 16px;
		height: 16px;
	}

	.remember {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		width: fit-content;
		color: var(--text-subtle);
		font-size: 14px;
		cursor: pointer;
	}

	.remember input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.checkbox {
		width: 15px;
		height: 15px;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 4px;
		background: var(--surface);
	}

	.remember input:checked + .checkbox {
		border-color: var(--primary);
		background: var(--primary);
	}

	.remember input:checked + .checkbox::after {
		content: "";
		width: 7px;
		height: 4px;
		margin-top: -2px;
		border-left: 2px solid #0f172a;
		border-bottom: 2px solid #0f172a;
		transform: rotate(-45deg);
	}

	.submit-button {
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: 2px;
		border: 0;
		border-radius: 10px;
		background: var(--primary);
		color: #0f172a;
		font-size: 14px;
		font-weight: 800;
		cursor: pointer;
		transition: background-color .15s ease;
	}

	.submit-button:hover {
		background: var(--accent);
		color: #ffffff;
	}

	.submit-button svg {
		width: 15px;
		height: 15px;
	}

	.divider {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 24px 0 18px;
	}

	.divider::before {
		content: "";
		position: absolute;
		inset: 50% 0 auto;
		height: 1px;
		background: var(--border);
	}

	.divider span {
		position: relative;
		padding: 0 10px;
		background: var(--surface);
		color: var(--text-muted);
		font-size: 14px;
	}

	.signup {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		font-size: 14px;
	}

	.signup span {
		color: var(--text-subtle);
	}

	.signup a {
		color: var(--accent);
		font-weight: 750;
	}

	.notice {
		margin: 22px 0 0;
		padding-top: 15px;
		border-top: 1px solid var(--border);
		color: var(--text-muted);
		font-size: 14px;
		line-height: 1.5;
		text-align: center;
	}

	@media (max-width: 800px) {
		main {
			padding: 45px 20px;
		}

		.login-layout {
			grid-template-columns: 1fr;
			max-width: 500px;
			gap: 35px;
		}

		.login-intro {
			padding: 0;
			text-align: center;
		}

		.intro-mark {
			margin: 0 auto;
		}

		.intro-line {
			justify-content: center;
		}
	}

	@media (max-width: 520px) {
		main {
			padding: 35px 14px 50px;
		}

		.login-intro h1 {
			font-size: 34px;
		}

		.login-card {
			padding: 25px 20px;
		}
	}
</style>