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
	<title>요리위키 | 서비스 이용약관</title>
	<meta name="description" content="요리위키 서비스 이용약관" />
</svelte:head>

<div class="page">
	<main>
		<div class="document">

			<!-- Breadcrumb -->
			<div class="breadcrumb">
				<a href="/">요리위키</a>
				<span>›</span>
				<span>서비스 이용약관</span>
			</div>

			<!-- Header -->
			<header class="document-header">
				<div class="header-content">
					<h1>서비스 이용약관</h1>

					<p class="lead">
						요리위키 서비스를 이용하기 위해 필요한 기본적인 약속과
						이용 조건을 안내합니다.
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

			<nav class="toc" aria-label="목차">
				<div class="toc-header">
					<strong>목차</strong>
				</div>

				<div class="toc-list">
					<a href="#article-1">
						<span class="toc-number">01</span>
						<span class="toc-title">제1조 목적</span>
					</a>

					<a href="#article-2">
						<span class="toc-number">02</span>
						<span class="toc-title">제2조 정의</span>
					</a>

					<a href="#article-3">
						<span class="toc-number">03</span>
						<span class="toc-title">제3조 서비스의 이용</span>
					</a>

					<a href="#article-4">
						<span class="toc-number">04</span>
						<span class="toc-title">제4조 회원가입 및 계정 관리</span>
					</a>

					<a href="#article-5">
						<span class="toc-number">05</span>
						<span class="toc-title">제5조 회원의 의무</span>
					</a>

					<a href="#article-6">
						<span class="toc-number">06</span>
						<span class="toc-title">제6조 게시물의 작성 및 관리</span>
					</a>

					<a href="#article-7">
						<span class="toc-number">07</span>
						<span class="toc-title">제7조 저작권 및 게시물의 이용</span>
					</a>

					<a href="#article-8">
						<span class="toc-number">08</span>
						<span class="toc-title">제8조 금지행위</span>
					</a>

					<a href="#article-9">
						<span class="toc-number">09</span>
						<span class="toc-title">제9조 서비스의 변경 및 중단</span>
					</a>

					<a href="#article-10">
						<span class="toc-number">10</span>
						<span class="toc-title">제10조 이용계약의 해지</span>
					</a>

					<a href="#article-11">
						<span class="toc-number">11</span>
						<span class="toc-title">제11조 책임의 제한</span>
					</a>

					<a href="#article-12">
						<span class="toc-number">12</span>
						<span class="toc-title">제12조 약관의 변경</span>
					</a>

					<a href="#article-13">
						<span class="toc-number">13</span>
						<span class="toc-title">제13조 기타</span>
					</a>
				</div>
			</nav>

			<!-- Articles -->
			<div class="articles">

				<section id="article-1">
					<h2><span>01</span> 목적</h2>

					<p>
						본 약관은 요리위키가 제공하는 레시피 공유 및 커뮤니티 서비스의
						이용과 관련하여 서비스와 회원 간의 권리, 의무 및 책임사항을
						정하는 것을 목적으로 합니다.
					</p>

					<p>
						회원은 본 약관에 동의함으로써 요리위키가 제공하는 다양한
						서비스를 이용할 수 있으며, 서비스 이용 과정에서 발생하는
						권리와 의무를 성실하게 준수해야 합니다.
					</p>
				</section>

				<section id="article-2">
					<h2><span>02</span> 정의</h2>

					<p>
						본 약관에서 사용하는 용어의 의미는 다음과 같습니다. '서비스'란
						요리위키가 웹사이트 또는 기타 제공 가능한 형태를 통해 회원에게
						제공하는 레시피 조회, 레시피 등록, 댓글, 검색 및 커뮤니티 등의
						기능을 의미합니다.
					</p>

					<p>
						'회원'이란 본 약관에 동의하고 회원가입 절차를 완료하여
						요리위키의 서비스를 이용할 수 있는 사람을 의미하며,
						'게시물'이란 회원이 서비스에 작성하거나 등록하는 레시피,
						댓글, 이미지 및 기타 콘텐츠를 의미합니다.
					</p>
				</section>

				<section id="article-3">
					<h2><span>03</span> 서비스의 이용</h2>

					<p>
						회원은 회원가입을 완료한 이후 요리위키에서 제공하는 레시피 조회,
						레시피 등록, 댓글 작성, 검색 및 커뮤니티 등의 서비스를 이용할
						수 있습니다.
					</p>

					<p>
						일부 서비스는 회원가입 여부 또는 서비스 운영 정책에 따라
						이용 범위가 달라질 수 있으며, 요리위키는 서비스의 구체적인
						이용 방법과 제공 기능을 서비스 운영 상황에 따라 변경할 수
						있습니다.
					</p>

					<p>
						서비스 이용을 위해 필요한 기기, 인터넷 연결 및 통신 환경 등은
						회원이 자신의 비용과 책임으로 준비해야 합니다.
					</p>
				</section>

				<section id="article-4">
					<h2><span>04</span> 회원가입 및 계정 관리</h2>

					<p>
						회원가입은 이용자가 본 약관 및 관련 정책에 동의하고 요리위키가
						정한 가입 절차에 따라 필요한 정보를 입력한 후 가입 신청을
						완료함으로써 이루어집니다.
					</p>

					<p>
						회원은 자신의 계정 정보를 안전하게 관리해야 하며, 자신의
						계정을 다른 사람에게 양도하거나 대여해서는 안 됩니다.
						계정 정보가 유출되었거나 비정상적인 이용이 발견된 경우에는
						가능한 한 신속하게 서비스 운영자에게 알려야 합니다.
					</p>

					<p>
						회원이 제공한 정보에 변경사항이 발생한 경우에는 서비스에서
						제공하는 방법을 통해 이를 수정해야 하며, 잘못된 정보로 인해
						발생하는 불이익에 대해서는 회원에게 책임이 있을 수 있습니다.
					</p>
				</section>

				<section id="article-5">
					<h2><span>05</span> 회원의 의무</h2>

					<p>
						회원은 서비스 이용 과정에서 관련 법령과 본 약관을 준수해야 하며,
						다른 회원의 권리와 개인정보를 존중하고 서비스의 정상적인 운영을
						방해하는 행위를 해서는 안 됩니다.
					</p>

					<ul>
						<li>타인의 개인정보를 동의 없이 게시하거나 이용하는 행위</li>
						<li>타인을 사칭하거나 허위 정보를 이용하여 서비스를 이용하는 행위</li>
						<li>다른 회원의 계정이나 서비스 이용 권한을 부정하게 사용하는 행위</li>
						<li>서비스의 정상적인 운영을 방해하거나 시스템에 과도한 부담을 주는 행위</li>
						<li>관련 법령 또는 본 약관에서 금지하는 행위를 하는 경우</li>
					</ul>
				</section>

				<section id="article-6">
					<h2><span>06</span> 게시물의 작성 및 관리</h2>

					<p>
						회원이 작성한 레시피, 댓글 및 기타 게시물의 내용과 그로 인해
						발생하는 책임은 해당 게시물을 작성한 회원에게 있습니다.
						회원은 자신이 작성하는 게시물이 타인의 권리를 침해하지 않도록
						주의해야 합니다.
					</p>

					<p>
						서비스 운영 목적에 부적절하거나 다른 이용자에게 피해를 줄 수
						있는 게시물, 관련 법령 또는 운영정책에 위반되는 게시물은
						별도의 안내 후 수정, 숨김 또는 삭제될 수 있습니다.
					</p>

					<p>
						반복적인 광고, 도배성 게시물, 타인을 비방하거나 모욕하는 내용,
						서비스의 취지와 무관한 내용 등은 커뮤니티 운영을 위해
						제한될 수 있습니다.
					</p>
				</section>

				<section id="article-7">
					<h2><span>07</span> 저작권 및 게시물의 이용</h2>

					<p>
						회원이 서비스에 직접 작성한 게시물의 저작권은 원칙적으로
						해당 회원에게 귀속됩니다. 회원은 자신이 게시물을 작성하거나
						등록할 적법한 권한을 가지고 있어야 합니다.
					</p>

					<p>
						회원은 타인의 레시피, 사진, 글 또는 기타 콘텐츠를 저작권자의
						허락 없이 복제하거나 게시해서는 안 됩니다. 다른 사람의
						콘텐츠를 참고하는 경우에도 해당 콘텐츠의 이용 조건과
						저작권을 확인해야 합니다.
					</p>

					<p>
						요리위키는 서비스의 운영과 게시물 표시를 위해 필요한 범위에서
						회원이 등록한 게시물을 서비스 화면에 노출하거나 검색 결과 등에
						표시할 수 있습니다.
					</p>
				</section>

				<section id="article-8">
					<h2><span>08</span> 금지행위</h2>

					<p>
						회원은 서비스의 건전한 이용 환경을 유지하기 위해 다음과 같은
						행위를 해서는 안 됩니다.
					</p>

					<ul>
						<li>타인의 명예를 훼손하거나 불쾌감을 유발할 목적으로 게시물을 작성하는 행위</li>
						<li>상업적인 광고 또는 홍보를 반복적으로 게시하는 행위</li>
						<li>서비스를 이용하여 사기, 불법 거래 또는 기타 위법행위를 하는 행위</li>
						<li>서비스의 취약점을 악용하거나 비정상적인 방법으로 데이터에 접근하는 행위</li>
						<li>자동화된 프로그램 등을 이용하여 서비스에 과도한 요청을 보내는 행위</li>
						<li>그 밖에 서비스의 정상적인 운영을 방해한다고 판단되는 행위</li>
					</ul>
				</section>

				<section id="article-9">
					<h2><span>09</span> 서비스의 변경 및 중단</h2>

					<p>
						요리위키는 서비스의 품질 향상, 기술적인 필요 또는 운영상의
						사유에 따라 서비스의 일부 또는 전체를 변경하거나 일시적으로
						중단할 수 있습니다.
					</p>

					<p>
						서비스의 기능이나 운영 방식에 중요한 변경이 발생하는 경우에는
						가능한 범위에서 서비스 내 공지 등을 통해 회원에게 안내합니다.
					</p>

					<p>
						서버 점검, 장애, 통신망의 문제 또는 기타 합리적인 사유로
						서비스 이용이 일시적으로 제한될 수 있으며, 요리위키는
						서비스의 정상적인 제공을 위해 필요한 조치를 취합니다.
					</p>
				</section>

				<section id="article-10">
					<h2><span>10</span> 이용계약의 해지</h2>

					<p>
						회원은 언제든지 서비스에서 제공하는 절차에 따라 회원 탈퇴를
						신청할 수 있으며, 탈퇴가 완료되면 서비스 이용계약이 종료됩니다.
					</p>

					<p>
						회원 탈퇴 후에도 관련 법령이나 개인정보 처리방침에 따라
						일정 기간 보관이 필요한 정보가 있는 경우에는 해당 기간 동안
						보관될 수 있습니다.
					</p>

					<p>
						회원이 본 약관을 위반하거나 서비스 운영을 심각하게 방해하는
						경우에는 서비스 이용이 제한되거나 이용계약이 해지될 수 있습니다.
					</p>
				</section>

				<section id="article-11">
					<h2><span>11</span> 책임의 제한</h2>

					<p>
						요리위키에 등록된 레시피와 게시물의 내용은 해당 게시물을
						작성한 회원의 개인적인 정보와 의견을 포함할 수 있으며,
						요리위키의 공식적인 의견이나 전문적인 조언을 의미하지 않습니다.
					</p>

					<p>
						회원은 자신의 판단과 책임에 따라 레시피 및 게시물의 내용을
						이용해야 하며, 식재료의 알레르기 정보, 개인의 건강 상태,
						조리 환경 등에 따라 결과가 달라질 수 있다는 점을 확인해야 합니다.
					</p>

					<p>
						요리위키는 관련 법령에서 정하는 범위 내에서 서비스 이용과
						관련하여 발생한 손해에 대한 책임을 제한할 수 있습니다.
					</p>
				</section>

				<section id="article-12">
					<h2><span>12</span> 약관의 변경</h2>

					<p>
						요리위키는 서비스의 변경이나 관련 법령의 개정 등을 반영하기
						위해 본 약관을 변경할 수 있습니다. 약관을 변경하는 경우
						변경 내용과 시행일 등을 서비스 내에서 확인할 수 있도록 안내합니다.
					</p>

					<p>
						회원에게 중요한 영향을 미치는 내용이 변경되는 경우에는
						변경 사유와 주요 내용을 이해하기 쉬운 방법으로 안내하도록 노력합니다.
					</p>
				</section>

				<section id="article-13">
					<h2><span>13</span> 기타</h2>

					<p>
						본 약관에서 정하지 않은 사항은 관련 법령 및 일반적인 서비스
						운영 관행에 따르며, 서비스와 회원 간의 권리와 의무에 관하여
						필요한 경우 별도의 운영정책이나 개인정보 처리방침에서
						구체적인 내용을 정할 수 있습니다.
					</p>

					<p>
						본 약관의 일부 조항이 관련 법령에 따라 효력을 가지지 못하게
						되더라도 나머지 조항의 효력에는 영향을 미치지 않습니다.
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
					관련 법령과 서비스 운영 형태에 맞게 법률 검토를 거쳐 수정해야 합니다.
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

	/* TOC List */

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

	ul {
		width: 100%;
		max-width: none;
		box-sizing: border-box;
		margin: 16px 0 0;
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
			padding: 14px 15px;
		}

		.toc-header strong {
			font-size: 13px;
		}

		.toc-list {
			padding: 6px;
		}

		.toc-list a {
			min-height: 40px;
			gap: 12px;
			padding: 7px 9px;
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

		ul {
			font-size: 12px;
			line-height: 1.9;
		}

		.notice-box p {
			font-size: 12px;
		}
	}
</style>