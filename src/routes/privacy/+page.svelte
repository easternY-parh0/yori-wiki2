<script lang="ts">
	const effectiveDate = '2026-09-01';

	function getDaysSince(dateString: string) {
		const start = new Date(`${dateString}T00:00:00`);
		const today = new Date();

		start.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);

		const diff = today.getTime() - start.getTime();

		return Math.floor(diff / (1000 * 60 * 60 * 24));
	}

	const daysSince = $derived(getDaysSince(effectiveDate));
</script>

<svelte:head>
	<title>요리위키 | 개인정보 처리방침</title>
	<meta name="description" content="요리위키 개인정보 처리방침" />
</svelte:head>

<div class="page">
	<main>
		<div class="document">

			<!-- Breadcrumb -->
			<div class="breadcrumb">
				<a href="/">요리위키</a>
				<span>›</span>
				<span>개인정보 처리방침</span>
			</div>

			<!-- Header -->
			<header class="document-header">
				<div class="header-content">
					<h1>개인정보 처리방침</h1>

					<p class="lead">
						요리위키는 이용자의 개인정보를 소중하게 생각하며,
						서비스 제공에 필요한 범위에서 개인정보를 안전하게 처리합니다.
					</p>
				</div>

				<div class="effective-date">
					<div class="date-line">
						<span>시행일:</span>
						<strong>{effectiveDate}</strong>
					</div>

					{#if daysSince >= 0}
						<span class="day-count">(D+{daysSince}일)</span>
					{:else}
						<span class="day-count">(시행 예정)</span>
					{/if}
				</div>
			</header>

			<!-- Table of Contents -->
			<nav class="toc" aria-label="목차">
				<div class="toc-header">
					<strong>목차</strong>
				</div>

				<div class="toc-list">
					<a href="#article-1">
						<span class="toc-number">01</span>
						<span class="toc-title">개인정보의 수집</span>
					</a>

					<a href="#article-2">
						<span class="toc-number">02</span>
						<span class="toc-title">개인정보의 이용 목적</span>
					</a>

					<a href="#article-3">
						<span class="toc-number">03</span>
						<span class="toc-title">개인정보의 수집 방법 및 항목</span>
					</a>

					<a href="#article-4">
						<span class="toc-number">04</span>
						<span class="toc-title">개인정보의 보유 및 이용 기간</span>
					</a>

					<a href="#article-5">
						<span class="toc-number">05</span>
						<span class="toc-title">개인정보의 파기</span>
					</a>

					<a href="#article-6">
						<span class="toc-number">06</span>
						<span class="toc-title">개인정보의 제3자 제공</span>
					</a>

					<a href="#article-7">
						<span class="toc-number">07</span>
						<span class="toc-title">개인정보 처리의 위탁</span>
					</a>

					<a href="#article-8">
						<span class="toc-number">08</span>
						<span class="toc-title">이용자의 권리와 행사 방법</span>
					</a>

					<a href="#article-9">
						<span class="toc-number">09</span>
						<span class="toc-title">개인정보의 안전성 확보</span>
					</a>

					<a href="#article-10">
						<span class="toc-number">10</span>
						<span class="toc-title">개인정보 보호책임자 및 처리방침의 변경</span>
					</a>
				</div>
			</nav>

			<!-- Articles -->
			<div class="articles">

				<section id="article-1">
					<h2><span>01</span> 개인정보의 수집</h2>

					<p>
						요리위키는 회원가입 및 서비스 이용에 필요한 최소한의 개인정보를
						수집하는 것을 원칙으로 합니다.
					</p>

					<p>
						개인정보는 회원이 직접 정보를 입력하거나 서비스 이용 과정에서
						자동으로 생성되는 정보를 통해 수집될 수 있습니다. 요리위키는
						서비스 제공에 필요한 범위를 넘어 불필요한 개인정보를 수집하지
						않도록 노력합니다.
					</p>
				</section>

				<section id="article-2">
					<h2><span>02</span> 개인정보의 이용 목적</h2>

					<p>
						수집된 개인정보는 회원 식별, 계정 관리, 서비스 제공 및 이용자
						문의 처리 등의 목적으로 이용됩니다.
					</p>

					<ul>
						<li>회원가입 및 본인 계정 식별</li>
						<li>레시피 등록, 댓글 및 커뮤니티 기능 제공</li>
						<li>서비스 이용 과정에서 발생하는 문의사항 처리</li>
						<li>서비스 오류 확인 및 안정적인 운영</li>
						<li>서비스 기능 개선 및 이용 환경 개선</li>
					</ul>

					<p>
						수집한 개인정보를 당초 수집 목적과 다른 목적으로 이용하는 경우에는
						관련 법령에서 정하는 절차에 따라 필요한 조치를 진행합니다.
					</p>
				</section>

				<section id="article-3">
					<h2><span>03</span> 개인정보의 수집 방법 및 항목</h2>

					<p>
						요리위키는 회원가입, 서비스 이용 및 문의 과정에서 필요한 정보를
						이용자가 직접 입력하는 방식으로 개인정보를 수집할 수 있습니다.
					</p>

					<div class="info-table">
						<div class="table-head">
							<span>수집 항목</span>
							<span>이용 목적</span>
						</div>

						<div>
							<strong>이메일</strong>
							<span>회원 식별, 계정 관리 및 서비스 관련 안내</span>
						</div>

						<div>
							<strong>닉네임</strong>
							<span>서비스 내 회원 식별 및 커뮤니티 이용</span>
						</div>

						<div>
							<strong>비밀번호</strong>
							<span>회원 계정 인증 및 로그인</span>
						</div>

						<div>
							<strong>게시물 정보</strong>
							<span>레시피, 댓글 등 이용자가 서비스에 직접 등록한 콘텐츠 관리</span>
						</div>
					</div>

					<p class="sub-text">
						서비스 이용 과정에서 접속 기록, 오류 정보 등 서비스 운영에 필요한
						정보가 자동으로 생성·수집될 수 있습니다.
					</p>
				</section>

				<section id="article-4">
					<h2><span>04</span> 개인정보의 보유 및 이용 기간</h2>

					<p>
						회원의 개인정보는 원칙적으로 회원이 서비스를 이용하는 동안
						보관하며, 회원 탈퇴 시 지체 없이 파기하는 것을 원칙으로 합니다.
					</p>

					<p>
						다만 관련 법령에 따라 일정 기간 보관이 필요한 정보가 있거나,
						서비스 이용 과정에서 발생한 분쟁 및 부정 이용 기록의 확인을 위해
						필요한 경우에는 해당 기간 동안 개인정보를 보관할 수 있습니다.
					</p>

					<p>
						보유 기간이 종료된 개인정보는 관련 절차에 따라 안전하게 파기합니다.
					</p>
				</section>

				<section id="article-5">
					<h2><span>05</span> 개인정보의 파기</h2>

					<p>
						요리위키는 개인정보의 보유 기간이 종료되거나 처리 목적이 달성된
						경우 해당 개인정보를 지체 없이 파기합니다.
					</p>

					<p>
						전자적 형태로 저장된 개인정보는 복구하거나 재생할 수 없는 방법을
						사용하여 삭제하는 것을 원칙으로 하며, 별도의 보관이 필요한 정보는
						다른 개인정보와 분리하여 안전하게 관리합니다.
					</p>
				</section>

				<section id="article-6">
					<h2><span>06</span> 개인정보의 제3자 제공</h2>

					<p>
						요리위키는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
					</p>

					<p>
						다만 이용자가 개인정보 제공에 별도로 동의한 경우 또는 관련 법령에
						따라 개인정보 제공이 요구되는 경우에는 예외적으로 개인정보가
						제공될 수 있습니다.
					</p>

					<p>
						개인정보를 제3자에게 제공해야 하는 경우에는 제공받는 자,
						제공 목적, 제공 항목 및 보유 기간 등을 이용자가 확인할 수 있도록
						안내하도록 노력합니다.
					</p>
				</section>

				<section id="article-7">
					<h2><span>07</span> 개인정보 처리의 위탁</h2>

					<p>
						서비스의 안정적인 운영을 위해 개인정보 처리 업무의 일부를
						외부 서비스 제공자에게 위탁할 수 있습니다.
					</p>

					<p>
						개인정보 처리 업무를 위탁하는 경우에는 위탁받는 업체가 개인정보를
						안전하게 처리할 수 있도록 필요한 관리·감독을 실시하도록 노력합니다.
					</p>

					<div class="info-box">
						<strong>위탁 업무 예시</strong>
						<span>
							회원 인증, 데이터베이스 및 서버 운영, 이메일 발송 등
							서비스 제공에 필요한 업무가 포함될 수 있습니다.
						</span>
					</div>
				</section>

				<section id="article-8">
					<h2><span>08</span> 이용자의 권리와 행사 방법</h2>

					<p>
						이용자는 언제든지 자신의 개인정보에 대해 조회, 수정 또는 삭제를
						요청할 수 있으며, 회원 탈퇴를 통해 개인정보의 삭제를 요청할 수
						있습니다.
					</p>

					<ul>
						<li>개인정보 조회 및 수정 요청</li>
						<li>회원 탈퇴 및 개인정보 삭제 요청</li>
						<li>개인정보 처리에 관한 문의 및 확인 요청</li>
						<li>개인정보 처리에 대한 이의 제기</li>
					</ul>

					<p>
						개인정보와 관련한 요청은 서비스에서 제공하는 기능 또는 개인정보
						보호 담당자를 통해 접수할 수 있으며, 요리위키는 관련 법령에서
						정하는 범위 내에서 필요한 조치를 진행합니다.
					</p>
				</section>

				<section id="article-9">
					<h2><span>09</span> 개인정보의 안전성 확보</h2>

					<p>
						요리위키는 이용자의 개인정보가 분실, 도난, 유출 또는 훼손되지
						않도록 적절한 기술적·관리적 보호조치를 적용하는 것을 원칙으로 합니다.
					</p>

					<ul>
						<li>개인정보에 대한 접근 권한 관리</li>
						<li>개인정보 처리 시스템의 접근 통제</li>
						<li>비밀번호 등 인증정보의 안전한 관리</li>
						<li>개인정보 처리 관련 보안 점검 및 관리</li>
					</ul>

					<p>
						다만 인터넷을 통한 정보 전송이나 저장 환경의 특성상 모든 보안
						위험을 완전히 제거할 수는 없으므로, 이용자 역시 자신의 계정
						정보를 안전하게 관리해야 합니다.
					</p>
				</section>

				<section id="article-10">
					<h2><span>10</span> 개인정보 보호책임자 및 처리방침의 변경</h2>

					<p>
						요리위키는 개인정보 처리와 관련한 이용자의 문의 및 요청을
						처리하기 위해 개인정보 보호 담당자를 지정할 수 있습니다.
					</p>

					<div class="contact-card">
						<div class="contact-icon">
							<svg viewBox="0 0 24 24">
								<path d="M4 5h16v14H4z" />
								<path d="M4 7l8 6 8-6" />
							</svg>
						</div>

						<div class="contact-content">
							<strong>개인정보 보호 담당자</strong>
							<span>이름: [담당자 이름]</span>
							<span>이메일: [담당자 이메일]</span>
						</div>
					</div>
					
					<br>
					<p>
						개인정보 처리방침의 내용이 변경되는 경우에는 변경된 내용과
						시행일을 확인할 수 있도록 서비스 내에서 안내합니다.
					</p>
				</section>

			</div>

			<!-- Notice -->
			<div class="notice-box">
				<svg viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="9" />
					<path d="M12 11v5M12 8h.01" />
				</svg>

				<p>
					본 페이지의 내용은 학교 프로젝트를 위한 예시이며, 실제 서비스 운영 시
					수집 항목, 보유 기간, 위탁 현황 및 관련 법령을 검토하여 수정해야 합니다.
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

	/* Breadcrumb */

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-bottom: 25px;
		color: var(--text-muted);
		font-size: 12px;
	}

	.breadcrumb a {
		color: var(--text-subtle);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	.breadcrumb span {
		color: var(--text-muted);
	}

	.breadcrumb span:last-child {
		color: var(--text-subtle);
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

	/* Effective Date */

	.effective-date {
		flex-shrink: 0;
		padding-bottom: 2px;
		text-align: right;
	}

	.date-line {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 5px;
		color: var(--text-muted);
		font-size: 11px;
	}

	.date-line strong {
		color: var(--text);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0;
	}

	.day-count {
		display: block;
		margin-top: 3px;
		color: var(--text-muted);
		font-size: 10px;
	}

	/* Table of Contents */

	.toc {
		margin: 24px 0 44px;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--surface-subtle);
		overflow: hidden;
	}

	.toc-header {
		display: flex;
		align-items: center;
		padding: 14px 18px;
		border-bottom: 1px solid var(--border);
	}

	.toc-header strong {
		color: var(--text);
		font-size: 13px;
		font-weight: 650;
		letter-spacing: -0.035em;
	}

	.toc-list {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 4px;
	}

	.toc-list a {
		display: flex;
		align-items: center;
		width: 100%;
		min-height: 28px;
		box-sizing: border-box;
		padding: 2px 8px;
		border-radius: 5px;
		color: var(--text-subtle);
		background: transparent;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: -0.025em;
		text-decoration: none;
		outline: none;
		-webkit-tap-highlight-color: transparent;

		transition: color 0.15s ease;
	}

	.toc-list a:hover {
		color: var(--accent);
	}

	.toc-list a:active,
	.toc-list a:focus,
	.toc-list a:focus-visible {
		background: transparent;
		color: var(--text-subtle);
		outline: none;
	}

	.toc-number {
		display: inline;
		width: 20px;
		flex-shrink: 0;
		color: var(--text-muted);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0;
		transition: color 0.15s ease;
	}

	.toc-list a:hover .toc-number {
		color: var(--accent);
	}

	.toc-title {
		flex: 1;
		min-width: 0;
		font-weight: 500;
	}

	/* Articles */

	.articles {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	section {
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
		margin: 0 0 16px;
		font-size: 18px;
		font-weight: 700;
		letter-spacing: -0.055em;
	}

	h2 span {
		display: inline;
		width: auto;
		height: auto;
		flex-shrink: 0;
		border-radius: 0;
		background: transparent;
		color: var(--accent);
		font-size: 14px;
		font-weight: 650;
		letter-spacing: 0;
	}

	section p {
		width: 100%;
		max-width: none;
		margin: 0 0 12px;
		color: var(--text-subtle);
		font-size: 14px;
		line-height: 1.95;
		letter-spacing: -0.012em;
	}

	section p:last-child {
		margin-bottom: 0;
	}

	.sub-text {
		margin-top: 12px !important;
		color: var(--text-muted) !important;
		font-size: 12px !important;
	}

	/* Info Table */

	.info-table {
		width: 100%;
		margin-top: 17px;
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
	}

	.info-table > div {
		display: grid;
		grid-template-columns: 180px 1fr;
		padding: 12px 14px;
		border-bottom: 1px solid var(--border);
		font-size: 13px;
	}

	.info-table > div:last-child {
		border-bottom: 0;
	}

	.info-table .table-head {
		background: var(--surface-subtle);
		color: var(--text-muted);
		font-size: 12px;
		font-weight: 650;
	}

	.info-table strong {
		color: var(--text);
		font-weight: 600;
	}

	.info-table span {
		color: var(--text-subtle);
	}

	/* List */

	ul {
		width: 100%;
		max-width: none;
		box-sizing: border-box;
		margin: 16px 0 14px;
		padding: 14px 18px 14px 30px;
		border-radius: 8px;
		background: var(--surface-subtle);
		color: var(--text-subtle);
		font-size: 13px;
		line-height: 2;
	}

	li {
		padding-left: 3px;
	}

	/* Info Box */

	.info-box {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-top: 17px;
		padding: 14px 16px;
		border-radius: 8px;
		background: var(--surface-subtle);
	}

	.info-box strong {
		color: var(--text);
		font-size: 13px;
		font-weight: 650;
	}

	.info-box span {
		color: var(--text-subtle);
		font-size: 13px;
		line-height: 1.8;
	}

	/* Contact */

	.contact-card {
		display: flex;
		align-items: center;
		gap: 13px;
		margin-top: 18px;
		padding: 15px;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--surface-subtle);
	}

	.contact-icon {
		display: grid;
		width: 38px;
		height: 38px;
		flex-shrink: 0;
		place-items: center;
		border-radius: 9px;
		background: var(--surface-green);
		color: var(--accent);
	}

	.contact-icon svg {
		width: 19px;
		height: 19px;
	}

	.contact-content strong,
	.contact-content span {
		display: block;
	}

	.contact-content strong {
		margin-bottom: 5px;
		color: var(--text);
		font-size: 13px;
		font-weight: 650;
	}

	.contact-content span {
		margin-top: 2px;
		color: var(--text-muted);
		font-size: 12px;
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
		border-radius: 0;
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

	/* Mobile */

	@media (max-width: 700px) {
		main {
			padding: 30px 16px 75px;
		}

		.document {
			width: 100%;
		}

		.breadcrumb {
			margin-bottom: 20px;
			font-size: 11px;
		}

		.document-header {
			align-items: flex-start;
			flex-direction: column;
			gap: 18px;
			padding-bottom: 24px;
		}

		.header-content {
			max-width: none;
		}

		h1 {
			font-size: 31px;
		}

		.lead {
			font-size: 13px;
			line-height: 1.8;
		}

		.effective-date {
			padding-bottom: 0;
			text-align: left;
		}

		.date-line {
			justify-content: flex-start;
		}

		/* Mobile TOC */

		.toc {
			margin: 18px 0 40px;
			border-radius: 9px;
		}

		.toc-header {
			padding: 13px 15px;
		}

		.toc-list {
			padding: 3px;
		}

		.toc-list a {
			min-height: 27px;
			padding: 2px 7px;
			font-size: 11px;
		}

		.toc-number {
			width: 20px;
			font-size: 9px;
		}

		/* Articles */

		section {
			padding-bottom: 34px;
			margin-bottom: 34px;
		}

		h2 {
			gap: 8px;
			font-size: 17px;
		}

		h2 span {
			font-size: 10px;
		}

		section p {
			font-size: 13px;
			line-height: 1.9;
		}

		.info-table > div {
			grid-template-columns: 105px 1fr;
			padding: 10px 11px;
			font-size: 11px;
		}

		.info-table .table-head {
			font-size: 10px;
		}

		ul {
			font-size: 12px;
			line-height: 1.9;
		}

		.info-box {
			padding: 12px 13px;
		}

		.info-box strong,
		.info-box span {
			font-size: 11px;
		}

		.contact-card {
			padding: 13px;
		}

		.contact-icon {
			width: 35px;
			height: 35px;
		}

		.contact-content strong {
			font-size: 12px;
		}

		.contact-content span {
			font-size: 11px;
		}

		.notice-box p {
			font-size: 12px;
		}
	}
</style>