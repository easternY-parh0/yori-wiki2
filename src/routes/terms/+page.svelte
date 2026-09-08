<script lang="ts">

</script>

<svelte:head>
	<title>서비스 이용약관 | 요리위키</title>
	<meta name="description" content="요리위키 서비스 이용약관" />
</svelte:head>

<div class="page">
	<main>
		<div class="document">
			<div class="document-top">
				<span class="label">POLICY</span>
				<span class="date">시행일: 2026. 00. 00.</span>
			</div>

			<h1>서비스 이용약관</h1>
			<p class="lead">요리위키 서비스를 이용하기 위해 필요한 기본적인 약속과 이용 조건을 안내합니다.</p>

			<nav class="toc">
				<strong>목차</strong>
				<a href="#article-1">제1조 목적</a>
				<a href="#article-2">제2조 서비스의 이용</a>
				<a href="#article-3">제3조 회원의 의무</a>
				<a href="#article-4">제4조 게시물의 관리</a>
				<a href="#article-5">제5조 서비스의 변경</a>
				<a href="#article-6">제6조 이용계약의 해지</a>
				<a href="#article-7">제7조 기타</a>
			</nav>

			<section id="article-1">
				<h2><span>01</span> 목적</h2>
				<p>본 약관은 요리위키가 제공하는 레시피 공유 및 커뮤니티 서비스의 이용과 관련하여 서비스와 회원 간의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.</p>
			</section>

			<section id="article-2">
				<h2><span>02</span> 서비스의 이용</h2>
				<p>회원은 회원가입을 완료한 이후 요리위키에서 제공하는 레시피 조회, 레시피 등록, 댓글 작성 및 커뮤니티 등의 서비스를 이용할 수 있습니다.</p>
				<p>서비스의 구체적인 기능과 이용 방법은 서비스 운영 상황에 따라 변경될 수 있으며, 중요한 변경사항은 서비스 내에서 안내합니다.</p>
			</section>

			<section id="article-3">
				<h2><span>03</span> 회원의 의무</h2>
				<p>회원은 서비스 이용 과정에서 타인의 권리를 침해하거나 서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.</p>
				<ul>
					<li>타인의 개인정보를 무단으로 게시하거나 이용하는 행위</li>
					<li>타인을 사칭하거나 허위 정보를 이용하는 행위</li>
					<li>서비스의 운영을 방해하는 행위</li>
					<li>관련 법령 또는 본 약관을 위반하는 행위</li>
				</ul>
			</section>

			<section id="article-4">
				<h2><span>04</span> 게시물의 관리</h2>
				<p>회원이 작성한 레시피, 댓글 및 기타 게시물의 책임은 해당 게시물을 작성한 회원에게 있습니다.</p>
				<p>서비스 운영 목적에 부적절하거나 다른 이용자에게 피해를 줄 수 있는 게시물은 운영 정책에 따라 수정 또는 삭제될 수 있습니다.</p>
			</section>

			<section id="article-5">
				<h2><span>05</span> 서비스의 변경</h2>
				<p>요리위키는 서비스의 품질 향상과 운영상의 필요에 따라 서비스의 일부 또는 전체를 변경하거나 일시적으로 중단할 수 있습니다.</p>
			</section>

			<section id="article-6">
				<h2><span>06</span> 이용계약의 해지</h2>
				<p>회원은 언제든지 서비스에서 제공하는 절차에 따라 회원 탈퇴를 신청할 수 있습니다. 탈퇴와 관련된 세부 사항은 개인정보 처리방침 및 별도의 운영정책에 따릅니다.</p>
			</section>

			<section id="article-7">
				<h2><span>07</span> 기타</h2>
				<p>본 약관에서 정하지 않은 사항은 관련 법령 및 일반적인 서비스 운영 관행에 따릅니다.</p>
			</section>

			<div class="notice-box">
				<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
				<p>본 페이지의 내용은 학교 프로젝트를 위한 예시이며, 실제 서비스 운영 시 법률 검토를 거쳐 수정해야 합니다.</p>
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
    width: min(760px, 100%);
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
    background: var(--surface-yellow);
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
    margin: 13px 0 40px;
    color: var(--text-subtle);
    font-size: 14px;
    line-height: 1.8;
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
    letter-spacing: 0.02em;
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

  ul {
    margin: 15px 0 0;
    padding-left: 18px;
    color: var(--text-subtle);
    font-size: 14px;
    line-height: 2;
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

    .date {
      padding-top: 5px;
    }

    h1 {
      font-size: 30px;
    }
  }
</style>