<script lang="ts">

</script>

<svelte:head>
	<title>개인정보 처리방침 | 요리위키</title>
	<meta name="description" content="요리위키 개인정보 처리방침" />
</svelte:head>

<div class="page">
	<main>
		<div class="document">
			<div class="document-top">
				<span class="label">PRIVACY</span>
				<span class="date">시행일: 2026. 00. 00.</span>
			</div>

			<h1>개인정보 처리방침</h1>
			<p class="lead">요리위키는 이용자의 개인정보를 소중하게 생각하며, 수집된 정보가 안전하게 관리될 수 있도록 노력합니다.</p>

			<div class="summary">
				<div><strong>수집 정보</strong><span>이메일 · 닉네임</span></div>
				<div><strong>이용 목적</strong><span>회원 식별 · 서비스 제공</span></div>
				<div><strong>보관 기간</strong><span>회원 탈퇴 시까지</span></div>
			</div>

			<nav class="toc">
				<strong>목차</strong>
				<a href="#article-1">01. 개인정보의 수집</a>
				<a href="#article-2">02. 개인정보의 이용 목적</a>
				<a href="#article-3">03. 개인정보의 보유 및 이용 기간</a>
				<a href="#article-4">04. 개인정보의 제3자 제공</a>
				<a href="#article-5">05. 이용자의 권리</a>
				<a href="#article-6">06. 개인정보의 안전성 확보</a>
				<a href="#article-7">07. 개인정보 보호책임자</a>
			</nav>

			<section id="article-1">
				<h2><span>01</span> 개인정보의 수집</h2>
				<p>요리위키는 서비스 제공을 위해 필요한 최소한의 개인정보를 수집합니다.</p>
				<div class="info-table">
					<div class="table-head"><span>항목</span><span>수집 목적</span></div>
					<div><strong>이메일</strong><span>회원 식별 및 계정 관리</span></div>
					<div><strong>닉네임</strong><span>서비스 내 회원 식별 및 커뮤니티 이용</span></div>
					<div><strong>비밀번호</strong><span>회원 계정 인증</span></div>
				</div>
			</section>

			<section id="article-2">
				<h2><span>02</span> 개인정보의 이용 목적</h2>
				<p>수집된 개인정보는 회원관리, 서비스 제공, 문의사항 처리 및 서비스 개선 등의 목적으로 이용됩니다.</p>
				<p>수집 목적이 변경되는 경우 관련 법령에 따라 이용자에게 안내하고 필요한 절차를 진행합니다.</p>
			</section>

			<section id="article-3">
				<h2><span>03</span> 개인정보의 보유 및 이용 기간</h2>
				<p>회원의 개인정보는 원칙적으로 회원 탈퇴 시까지 보관하며, 탈퇴 이후에는 관련 법령 또는 서비스 운영에 필요한 경우를 제외하고 지체 없이 파기합니다.</p>
			</section>

			<section id="article-4">
				<h2><span>04</span> 개인정보의 제3자 제공</h2>
				<p>요리위키는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.</p>
				<p>다만 법령에 의해 요구되거나 이용자가 별도로 동의한 경우에는 예외적으로 개인정보가 제공될 수 있습니다.</p>
			</section>

			<section id="article-5">
				<h2><span>05</span> 이용자의 권리</h2>
				<p>이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 회원 탈퇴를 통해 개인정보의 삭제를 요청할 수 있습니다.</p>
				<ul>
					<li>개인정보 조회 및 수정 요청</li>
					<li>회원 탈퇴 및 개인정보 삭제 요청</li>
					<li>개인정보 처리에 대한 문의</li>
				</ul>
			</section>

			<section id="article-6">
				<h2><span>06</span> 개인정보의 안전성 확보</h2>
				<p>요리위키는 이용자의 개인정보가 분실, 도난, 유출 또는 훼손되지 않도록 적절한 기술적·관리적 보호조치를 적용하는 것을 원칙으로 합니다.</p>
			</section>

			<section id="article-7">
				<h2><span>07</span> 개인정보 보호책임자</h2>
				<div class="contact-card">
					<div class="contact-icon">
						<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z" /><path d="M4 7l8 6 8-6" /></svg>
					</div>
					<div>
						<strong>개인정보 보호 담당자</strong>
						<span>이름: [담당자 이름]</span>
						<span>이메일: [담당자 이메일]</span>
					</div>
				</div>
			</section>

			<div class="notice-box">
				<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
				<p>본 페이지의 내용은 학교 프로젝트를 위한 예시이며, 실제 서비스 운영 시 수집 항목과 법적 요구사항을 검토하여 수정해야 합니다.</p>
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
		padding: 60px 24px 100px;
	}

	.document {
		width: min(1160px, calc(100% - 48px));
		margin: 0 auto;
	}

	.document-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 18px;
	}

	.label {
		padding: 5px 8px;
		border-radius: 5px;
		background: var(--surface-green);
		color: var(--accent);
		font-size: 14px;
		font-weight: 800;
		letter-spacing: 0.08em;
	}

	.date {
		color: var(--text-muted);
		font-size: 14px;
	}

	h1 {
		margin: 0;
		font-size: 36px;
		letter-spacing: -0.07em;
	}

	.lead {
		margin: 13px 0 30px;
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 1.8;
	}

	.summary {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin-bottom: 35px;
		border: 1px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
	}

	.summary div {
		padding: 17px;
		border-right: 1px solid var(--border);
		background: var(--surface);
	}

	.summary div:last-child {
		border-right: 0;
	}

	.summary strong,
	.summary span {
		display: block;
	}

	.summary strong {
		margin-bottom: 6px;
		font-size: 14px;
	}

	.summary span {
		color: var(--text-muted);
		font-size: 14px;
	}

	.toc {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-bottom: 55px;
		padding: 20px;
		border: 1px solid var(--border);
		border-radius: 14px;
		background: var(--surface-subtle);
	}

	.toc strong {
		margin-bottom: 7px;
		font-size: 14px;
	}

	.toc a {
		color: var(--text-subtle);
		font-size: 14px;
	}

	.toc a:hover {
		color: var(--accent);
	}

	section {
		scroll-margin-top: 100px;
		padding: 0 0 37px;
		margin-bottom: 37px;
		border-bottom: 1px solid var(--border);
	}

	h2 {
		display: flex;
		align-items: center;
		gap: 11px;
		margin: 0 0 15px;
		font-size: 17px;
		letter-spacing: -0.045em;
	}

	h2 span {
		color: var(--accent);
		font-size: 14px;
	}

	section p {
		margin: 0 0 11px;
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 1.9;
	}

	section p:last-child {
		margin-bottom: 0;
	}

	.info-table {
		margin-top: 17px;
		border: 1px solid var(--border);
		border-radius: 10px;
		overflow: hidden;
	}

	.info-table div {
		display: grid;
		grid-template-columns: 1fr 2fr;
		padding: 12px 14px;
		border-bottom: 1px solid var(--border);
		font-size: 14px;
	}

	.info-table div:last-child {
		border-bottom: 0;
	}

	.info-table .table-head {
		background: var(--surface-subtle);
		color: var(--text-muted);
		font-weight: 700;
	}

	.info-table strong {
		font-weight: 700;
	}

	.info-table span {
		color: var(--text-subtle);
	}

	ul {
		margin: 15px 0 0;
		padding-left: 18px;
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 2;
	}

	.contact-card {
		display: flex;
		align-items: center;
		gap: 13px;
		margin-top: 18px;
		padding: 15px;
		border: 1px solid var(--border);
		border-radius: 11px;
		background: var(--surface-subtle);
	}

	.contact-icon {
		width: 38px;
		height: 38px;
		display: grid;
		place-items: center;
		border-radius: 9px;
		background: var(--surface-green);
		color: var(--accent);
	}

	.contact-icon svg {
		width: 19px;
		height: 19px;
	}

	.contact-card strong,
	.contact-card span {
		display: block;
	}

	.contact-card strong {
		margin-bottom: 5px;
		font-size: 14px;
	}

	.contact-card span {
		margin-top: 2px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.notice-box {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 15px;
		border-radius: 11px;
		background: var(--surface-yellow);
		color: var(--text-subtle);
	}

	.notice-box svg {
		width: 17px;
		height: 17px;
		flex-shrink: 0;
		color: var(--accent);
	}

	.notice-box p {
		margin: 0;
		font-size: 14px;
		line-height: 1.7;
	}

	@media (max-width: 600px) {
		main {
		padding: 35px 16px 70px;
		}

		.document-top {
		align-items: flex-start;
		gap: 15px;
		}

		h1 {
		font-size: 30px;
		}

		.summary {
		grid-template-columns: 1fr;
		}

		.summary div {
		border-right: 0;
		border-bottom: 1px solid var(--border);
		}

		.summary div:last-child {
		border-bottom: 0;
		}
	}
</style>