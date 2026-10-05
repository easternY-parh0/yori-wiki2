<script lang="ts">
	let {
		open = $bindable(true),
		title = '준비 중입니다',
		description = '더 좋은 서비스를 제공하기 위해 기능 개발 및 점검 중입니다.\n빠른 시일 내에 찾아뵙겠습니다!',
		confirmText = '확인',
		onClose
	}: {
		open?: boolean;
		title?: string;
		description?: string;
		confirmText?: string;
		onClose?: () => void;
	} = $props();

	function handleClose() {
		open = false;
		if (onClose) onClose();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- 오버레이 (바깥 클릭 시 닫힘) -->
	<button class="overlay" type="button" aria-label="팝업 닫기" onclick={handleClose}></button>

	<!-- 모달 콘텐츠 -->
	<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
		<!-- 상단 닫기 버튼 -->
		<button class="close-button" type="button" aria-label="팝업 닫기" onclick={handleClose}>
			<svg viewBox="0 0 24 24">
				<path d="M6 6l12 12M18 6L6 18" />
			</svg>
		</button>

		<!-- 아이콘 브랜드 영역 -->
		<div class="modal-icon-container">
			<div class="brand-mark">
				<svg viewBox="0 0 24 24">
					<!-- 공사/준비중 의미의 망치 및 주공구 아이콘 또는 시계/경고 아이콘 -->
					<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
				</svg>
			</div>
		</div>

		<!-- 텍스트 내용 -->
		<div class="modal-body">
			<h2 id="modal-title">{title}</h2>
			<p>{description}</p>
		</div>

		<!-- 하단 버튼 영역 -->
		<div class="modal-actions">
			<button class="confirm-button" type="button" onclick={handleClose}>
				{confirmText}
			</button>
		</div>
	</div>
{/if}

<style>
	/* 공통 SVG 스타일 */
	svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	/* 오버레이 (헤더/네비게이션과 동일한 스타일 및 애니메이션 적용) */
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		border: 0;
		background: var(--overlay);
		backdrop-filter: blur(2px);
		animation: fadeIn 0.2s ease-out;
	}

	/* 팝업 카드 */
	.modal-card {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 210;
		width: min(400px, 90vw);
		padding: 28px 24px 24px;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 20px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* 닫기 X 버튼 */
	.close-button {
		position: absolute;
		top: 16px;
		right: 16px;
		width: 34px;
		height: 34px;
		display: grid;
		place-items: center;
		border: 0;
		border-radius: 999px;
		background: var(--surface-subtle);
		color: var(--text);
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.close-button:hover {
		background: var(--surface-yellow);
	}

	.close-button svg {
		width: 17px;
		height: 17px;
	}

	/* 브랜드 심볼 및 아이콘 배경 */
	.modal-icon-container {
		margin-bottom: 16px;
	}

	.brand-mark {
		width: 52px;
		height: 52px;
		display: grid;
		place-items: center;
		border-radius: 16px;
		background: var(--primary);
		color: #0f172a;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
	}

	.brand-mark svg {
		width: 28px;
		height: 28px;
	}

	/* 텍스트 내용 */
	.modal-body {
		margin-bottom: 24px;
	}

	.modal-body h2 {
		margin: 0 0 8px;
		font-size: 20px;
		font-weight: 800;
		color: var(--text);
		letter-spacing: -0.04em;
	}

	.modal-body p {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--text-muted, #64748b);
		white-space: pre-line; /* 줄바꿈 문자를 인식하도록 설정 */
		word-break: keep-all;
	}

	/* 하단 버튼 */
	.modal-actions {
		width: 100%;
	}

	.confirm-button {
		width: 100%;
		padding: 12px 0;
		border: 0;
		border-radius: 12px;
		background: var(--primary);
		color: #0f172a;
		font-size: 15px;
		font-weight: 700;
		cursor: pointer;
		transition: background 0.2s ease, transform 0.1s ease;
	}

	.confirm-button:hover {
		background: var(--accent);
		color: #ffffff;
	}

	.confirm-button:active {
		transform: scale(0.98);
	}

	/* 애니메이션 효과 */
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes popIn {
		from {
			opacity: 0;
			transform: translate(-50%, -46%) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}
</style>