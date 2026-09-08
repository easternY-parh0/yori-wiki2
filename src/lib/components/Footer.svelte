<script lang="ts">
	const footerLinks = [
		{ label: '공지사항', href: '/notice' },
		{ label: 'FAQ', href: '/faq' },
		{ label: '이용약관', href: '/terms' },
		{ label: '개인정보처리방침', href: '/privacy' },
		{ label: '문의하기', href: '/contact' }
	];
</script>

<footer class="site-footer">
	<div class="footer-inner">
		<div class="footer-main">
			<div class="footer-brand">
				<strong>요리위키</strong>
				<p>누구나 만들고 공유하는 요리 레시피 위키</p>
			</div>

			<nav class="footer-links" aria-label="푸터 메뉴">
				{#each footerLinks as link}
					<a href={link.href}>{link.label}</a>
				{/each}
			</nav>
		</div>

		<div class="footer-info">
			<div class="business-info">
				<span>대표자명: 홍길동</span>
				<span>사업자등록번호: 000-00-00000</span>
				<span>주소: 대한민국 인천광역시</span>
				<span>이메일: example@example.com</span>
			</div>

			<div class="footer-bottom">
				<span>© 2026 요리위키 팀. All rights reserved.</span>
				<span>동아리 웹프로그래밍 프로젝트로 제작된 사이트입니다</span>
			</div>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		width: 100%;
		border-top: 1px solid var(--border);
		background: var(--surface-subtle);
		color: var(--text);
	}

	.footer-inner {
		width: min(1180px, calc(100% - 40px));
		margin: 0 auto;
		padding: 36px 0 24px;
	}

	.footer-main {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 40px;
	}

	.footer-brand strong {
		display: block;
		font-size: 15px;
		font-weight: 800;
		letter-spacing: -.04em;
	}

	.footer-brand p {
		margin: 7px 0 0;
		color: var(--text-muted);
		font-size: 9px;
	}

	.footer-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 18px;
	}

	.footer-links a {
		color: var(--text-subtle);
		font-size: 9px;
		transition: color .15s ease;
	}

	.footer-links a:hover {
		color: var(--accent);
	}

	.footer-info {
		margin-top: 28px;
		padding-top: 18px;
		border-top: 1px solid var(--border);
	}

	.business-info {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 18px;
		color: var(--text-muted);
		font-size: 8px;
		line-height: 1.6;
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin-top: 18px;
		color: var(--text-muted);
		font-size: 8px;
	}

	@media (max-width: 700px) {
		.footer-main {
			flex-direction: column;
			gap: 20px;
		}

		.footer-links {
			justify-content: flex-start;
		}

		.footer-bottom {
			align-items: flex-start;
			flex-direction: column;
			gap: 6px;
		}
	}

	@media (max-width: 480px) {
		.footer-inner {
			width: min(100% - 28px, 1180px);
			padding: 28px 0 20px;
		}

		.footer-links {
			gap: 12px;
		}
	}
</style>