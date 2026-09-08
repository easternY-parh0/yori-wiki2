<script lang="ts">
	let title = $state('');
	let description = $state('');
	let category = $state('');
	let difficulty = $state('보통');
	let cookingTime = $state('');
	let servings = $state('2');
	let ingredients = $state([{ name: '', amount: '' }]);
	let steps = $state([{ description: '' }]);

	function addIngredient() {
		ingredients = [...ingredients, { name: '', amount: '' }];
	}

	function removeIngredient(index: number) {
		if (ingredients.length === 1) return;
		ingredients = ingredients.filter((_, i) => i !== index);
	}

	function addStep() {
		steps = [...steps, { description: '' }];
	}

	function removeStep(index: number) {
		if (steps.length === 1) return;
		steps = steps.filter((_, i) => i !== index);
	}

	function submitRecipe(event: SubmitEvent) {
		event.preventDefault();
		alert('레시피 등록 기능은 추후 연결됩니다.');
	}

	function saveDraft() {
		alert('임시 저장 기능은 추후 연결됩니다.');
	}
</script>

<svelte:head>
	<title>레시피 등록 | 요리위키</title>
</svelte:head>

<div class="page">
	<main>
		<div class="breadcrumb">
			<a href="/">홈</a>
			<svg viewBox="0 0 24 24">
				<path d="M9 5l7 7-7 7" />
			</svg>
			<a href="/recipes">레시피</a>
			<svg viewBox="0 0 24 24">
				<path d="M9 5l7 7-7 7" />
			</svg>
			<span>레시피 등록</span>
		</div>

		<section class="page-heading">
			<div>
				<span class="heading-label">레시피 공유</span>
				<h1>나만의 레시피를<br /><span>등록해보세요.</span></h1>
				<p>직접 만든 요리와 맛있는 레시피를 다른 사람들과 공유해보세요.</p>
			</div>

			<div class="heading-icon">
				<svg viewBox="0 0 24 24">
					<path d="M7 4h10v16H7z" />
					<path d="M9.5 8h5M9.5 12h5M9.5 16h3" />
				</svg>
			</div>
		</section>

		<form class="recipe-form" onsubmit={submitRecipe}>
			<section class="form-section">
				<div class="section-heading">
					<div class="section-number">01</div>
					<div>
						<h2>기본 정보</h2>
						<p>레시피를 소개할 기본 정보를 입력해주세요.</p>
					</div>
				</div>

				<div class="image-upload">
					<div class="upload-icon">
						<svg viewBox="0 0 24 24">
							<rect x="3" y="4" width="18" height="16" rx="2" />
							<circle cx="8.5" cy="9" r="1.5" />
							<path d="M3 16l5-5 4 4 2.5-2.5L21 18" />
						</svg>
					</div>

					<div class="upload-content">
						<strong>대표 이미지</strong>
						<span>레시피를 대표할 이미지를 등록해주세요.</span>
						<small>JPG, PNG 형식 · 최대 10MB</small>
					</div>

					<button class="upload-button" type="button">
						이미지 선택
					</button>
				</div>

				<div class="form-grid">
					<label class="field field-wide">
						<span>레시피 이름 <b>*</b></span>
						<input bind:value={title} placeholder="예: 매콤한 김치볶음밥" />
					</label>

					<label class="field field-wide">
						<span>한 줄 소개</span>
						<input bind:value={description} placeholder="이 레시피를 간단하게 소개해주세요." />
					</label>

					<label class="field">
						<span>카테고리 <b>*</b></span>
						<select bind:value={category}>
							<option value="" disabled>카테고리 선택</option>
							<option value="한식">한식</option>
							<option value="중식">중식</option>
							<option value="일식">일식</option>
							<option value="양식">양식</option>
							<option value="분식">분식</option>
							<option value="디저트">디저트</option>
							<option value="음료">음료</option>
						</select>
					</label>

					<label class="field">
						<span>난이도 <b>*</b></span>
						<select bind:value={difficulty}>
							<option value="쉬움">쉬움</option>
							<option value="보통">보통</option>
							<option value="어려움">어려움</option>
						</select>
					</label>

					<label class="field">
						<span>조리 시간 <b>*</b></span>
						<div class="input-with-unit">
							<input bind:value={cookingTime} type="number" min="1" placeholder="30" />
							<span>분</span>
						</div>
					</label>

					<label class="field">
						<span>인분 <b>*</b></span>
						<div class="input-with-unit">
							<input bind:value={servings} type="number" min="1" />
							<span>인분</span>
						</div>
					</label>
				</div>
			</section>

			<section class="form-section">
				<div class="section-heading">
					<div class="section-number">02</div>
					<div>
						<h2>재료</h2>
						<p>레시피에 필요한 재료와 양을 입력해주세요.</p>
					</div>
				</div>

				<div class="ingredient-list">
					<div class="ingredient-header">
						<span>재료명</span>
						<span>분량</span>
						<span></span>
					</div>

					{#each ingredients as ingredient, index}
						<div class="ingredient-row">
							<input bind:value={ingredient.name} placeholder="예: 김치" />
							<input bind:value={ingredient.amount} placeholder="예: 1컵" />

							<button
								class="remove-button"
								type="button"
								aria-label="재료 삭제"
								onclick={() => removeIngredient(index)}
							>
								<svg viewBox="0 0 24 24">
									<path d="M5 12h14" />
								</svg>
							</button>
						</div>
					{/each}
				</div>

				<button class="add-button" type="button" onclick={addIngredient}>
					<svg viewBox="0 0 24 24">
						<path d="M12 5v14" />
						<path d="M5 12h14" />
					</svg>
					재료 추가
				</button>
			</section>

			<section class="form-section">
				<div class="section-heading">
					<div class="section-number">03</div>
					<div>
						<h2>조리 순서</h2>
						<p>요리를 만드는 과정을 순서대로 작성해주세요.</p>
					</div>
				</div>

				<div class="steps-list">
					{#each steps as step, index}
						<div class="step-row">
							<div class="step-number">{String(index + 1).padStart(2, '0')}</div>

							<div class="step-content">
								<textarea bind:value={step.description} rows="4" placeholder="조리 과정을 자세하게 작성해주세요."></textarea>

								<div class="step-image">
									<svg viewBox="0 0 24 24">
										<rect x="3" y="4" width="18" height="16" rx="2" />
										<circle cx="8.5" cy="9" r="1.5" />
										<path d="M3 16l5-5 4 4 2.5-2.5L21 18" />
									</svg>
									<span>과정 사진 추가</span>
								</div>
							</div>

							<button
								class="remove-button step-remove"
								type="button"
								aria-label="조리 단계 삭제"
								onclick={() => removeStep(index)}
							>
								<svg viewBox="0 0 24 24">
									<path d="M5 12h14" />
								</svg>
							</button>
						</div>
					{/each}
				</div>

				<button class="add-button" type="button" onclick={addStep}>
					<svg viewBox="0 0 24 24">
						<path d="M12 5v14" />
						<path d="M5 12h14" />
					</svg>
					조리 단계 추가
				</button>
			</section>

			<section class="form-section">
				<div class="section-heading">
					<div class="section-number">04</div>
					<div>
						<h2>추가 정보</h2>
						<p>레시피를 더 잘 찾을 수 있도록 정보를 추가해주세요.</p>
					</div>
				</div>

				<div class="tag-area">
					<div class="tag-label">
						<span>태그</span>
						<small>선택사항</small>
					</div>

					<div class="tag-input">
						<input placeholder="태그를 입력해주세요." />
						<button type="button">추가</button>
					</div>

					<div class="tag-list">
						<span>#간단요리</span>
						<span>#집밥</span>
						<span>#자취요리</span>
					</div>
				</div>

				<label class="field description-field">
					<span>요리 팁</span>
					<textarea rows="5" placeholder="요리하면서 알게 된 팁이나 다른 사용자에게 알려주고 싶은 내용을 작성해주세요."></textarea>
				</label>
			</section>

			<div class="form-actions">
				<a href="/recipes" class="cancel-button">취소</a>

				<div>
					<button class="draft-button" type="button" onclick={saveDraft}>
						임시 저장
					</button>

					<button class="submit-button" type="submit">
						레시피 등록하기
						<svg viewBox="0 0 24 24">
							<path d="M5 12h14" />
							<path d="M13 6l6 6-6 6" />
						</svg>
					</button>
				</div>
			</div>
		</form>
	</main>
</div>

<style>
	.page {
		min-height: 100vh;
		background: var(--background);
	}

	svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	main {
		width: min(980px, calc(100% - 48px));
		margin: 0 auto;
		padding-bottom: 80px;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 7px;
		padding-top: 28px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	.breadcrumb svg {
		width: 11px;
		height: 11px;
	}

	.page-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;
		padding: 45px 0 38px;
	}

	.heading-label {
		color: var(--accent);
		font-size: 14px;
		font-weight: 800;
	}

	.page-heading h1 {
		margin: 9px 0 12px;
		font-size: 40px;
		line-height: 1.18;
		letter-spacing: -.07em;
	}

	.page-heading h1 span {
		color: var(--accent);
	}

	.page-heading p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 14px;
	}

	.heading-icon {
		width: 100px;
		height: 100px;
		display: grid;
		place-items: center;
		border-radius: 25px;
		background: var(--surface-yellow);
		color: var(--accent);
	}

	.heading-icon svg {
		width: 44px;
		height: 44px;
	}

	.recipe-form {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.form-section {
		padding: 32px;
		border: 1px solid var(--border);
		border-radius: 20px;
		background: var(--surface);
	}

	.section-heading {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		margin-bottom: 28px;
	}

	.section-number {
		width: 36px;
		height: 36px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 10px;
		background: var(--primary);
		color: #0f172a;
		font-size: 14px;
		font-weight: 850;
	}

	.section-heading h2 {
		margin: 1px 0 5px;
		font-size: 18px;
		letter-spacing: -.05em;
	}

	.section-heading p {
		margin: 0;
		color: var(--text-muted);
		font-size: 14px;
	}

	.image-upload {
		display: flex;
		align-items: center;
		gap: 15px;
		margin-bottom: 25px;
		padding: 17px;
		border: 1px dashed var(--border-accent);
		border-radius: 13px;
		background: var(--surface-green);
	}

	.upload-icon {
		width: 46px;
		height: 46px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 11px;
		background: var(--surface);
		color: var(--accent);
	}

	.upload-icon svg {
		width: 23px;
		height: 23px;
	}

	.upload-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 4px;
	}

	.upload-content strong {
		font-size: 14px;
	}

	.upload-content span,
	.upload-content small {
		color: var(--text-muted);
		font-size: 14px;
	}

	.upload-button {
		padding: 9px 12px;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--surface);
		color: var(--text-subtle);
		font-size: 14px;
		cursor: pointer;
	}

	.upload-button:hover {
		border-color: var(--primary);
		color: var(--text);
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 19px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.field-wide {
		grid-column: 1 / -1;
	}

	.field > span,
	.tag-label > span {
		font-size: 14px;
		font-weight: 700;
	}

	.field b {
		color: var(--accent);
	}

	.field input,
	.field select,
	.field textarea,
	.ingredient-row input,
	.tag-input input {
		width: 100%;
		border: 1px solid var(--border);
		border-radius: 9px;
		outline: 0;
		background: var(--surface-subtle);
		color: var(--text);
		font-size: 14px;
	}

	.field input,
	.field select,
	.ingredient-row input {
		height: 42px;
		padding: 0 12px;
	}

	.field textarea {
		padding: 12px;
		resize: vertical;
		line-height: 1.7;
	}

	.field input:focus,
	.field select:focus,
	.field textarea:focus,
	.ingredient-row input:focus,
	.tag-input input:focus {
		border-color: var(--primary);
		background: var(--surface);
	}

	.field input::placeholder,
	.field textarea::placeholder,
	.ingredient-row input::placeholder,
	.tag-input input::placeholder {
		color: var(--text-muted);
	}

	.input-with-unit {
		position: relative;
	}

	.input-with-unit input {
		padding-right: 45px;
	}

	.input-with-unit span {
		position: absolute;
		top: 50%;
		right: 13px;
		color: var(--text-muted);
		font-size: 14px;
		transform: translateY(-50%);
	}

	.ingredient-list {
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: 12px;
	}

	.ingredient-header,
	.ingredient-row {
		display: grid;
		grid-template-columns: 1fr 180px 42px;
		gap: 10px;
		align-items: center;
	}

	.ingredient-header {
		padding: 10px 12px;
		background: var(--surface-subtle);
		color: var(--text-muted);
		font-size: 14px;
	}

	.ingredient-row {
		padding: 7px 12px;
		border-top: 1px solid var(--border);
	}

	.ingredient-row input {
		background: var(--surface);
	}

	.remove-button {
		width: 32px;
		height: 32px;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--surface);
		color: var(--text-muted);
		cursor: pointer;
	}

	.remove-button:hover {
		border-color: var(--danger);
		color: var(--danger);
	}

	.remove-button svg {
		width: 14px;
		height: 14px;
	}

	.add-button {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 11px;
		padding: 9px 12px;
		border: 1px dashed var(--border-accent);
		border-radius: 8px;
		background: var(--surface-green);
		color: var(--accent);
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}

	.add-button:hover {
		background: var(--surface-yellow);
	}

	.add-button svg {
		width: 13px;
		height: 13px;
	}

	.steps-list {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.step-row {
		display: grid;
		grid-template-columns: 42px minmax(0, 1fr) 32px;
		gap: 13px;
		align-items: start;
	}

	.step-number {
		width: 42px;
		height: 42px;
		display: grid;
		place-items: center;
		border-radius: 11px;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 14px;
		font-weight: 850;
	}

	.step-content {
		display: grid;
		grid-template-columns: 1fr 120px;
		gap: 10px;
	}

	.step-content textarea {
		min-height: 100px;
		border: 1px solid var(--border);
		border-radius: 10px;
		outline: 0;
		background: var(--surface-subtle);
		color: var(--text);
		padding: 12px;
		font-size: 14px;
		resize: vertical;
		line-height: 1.7;
	}

	.step-content textarea:focus {
		border-color: var(--primary);
		background: var(--surface);
	}

	.step-image {
		min-height: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		border: 1px dashed var(--border);
		border-radius: 10px;
		background: var(--surface-subtle);
		color: var(--text-muted);
		font-size: 14px;
		cursor: pointer;
	}

	.step-image:hover {
		border-color: var(--border-accent);
		color: var(--accent);
	}

	.step-image svg {
		width: 20px;
		height: 20px;
	}

	.step-remove {
		margin-top: 5px;
	}

	.tag-area {
		margin-bottom: 22px;
	}

	.tag-label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.tag-label small {
		color: var(--text-muted);
		font-size: 14px;
	}

	.tag-input {
		display: flex;
		gap: 7px;
	}

	.tag-input input {
		height: 42px;
		flex: 1;
		padding: 0 12px;
	}

	.tag-input button {
		padding: 0 15px;
		border: 0;
		border-radius: 8px;
		background: var(--accent);
		color: #fff;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 9px;
	}

	.tag-list span {
		padding: 6px 9px;
		border-radius: 7px;
		background: var(--surface-green);
		color: var(--accent);
		font-size: 14px;
		font-weight: 650;
	}

	.description-field {
		margin-top: 4px;
	}

	.form-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0 0;
	}

	.form-actions > div {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	.cancel-button,
	.draft-button,
	.submit-button {
		height: 43px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 9px;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}

	.cancel-button {
		padding: 0 17px;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-subtle);
	}

	.draft-button {
		padding: 0 15px;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-subtle);
	}

	.cancel-button:hover,
	.draft-button:hover {
		border-color: var(--primary);
		color: var(--text);
	}

	.submit-button {
		gap: 8px;
		padding: 0 17px;
		border: 0;
		background: var(--primary);
		color: #0f172a;
	}

	.submit-button:hover {
		background: var(--accent);
		color: #fff;
	}

	.submit-button svg {
		width: 14px;
		height: 14px;
	}

	@media (max-width: 760px) {
		main {
			width: calc(100% - 28px);
		}

		.page-heading {
			align-items: flex-start;
			padding: 38px 0 30px;
		}

		.heading-icon {
			display: none;
		}

		.page-heading h1 {
			font-size: 34px;
		}

		.form-section {
			padding: 23px 18px;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.field-wide {
			grid-column: auto;
		}

		.ingredient-header,
		.ingredient-row {
			grid-template-columns: 1fr 120px 34px;
		}

		.step-content {
			grid-template-columns: 1fr;
		}

		.step-image {
			min-height: 75px;
		}

		.form-actions {
			align-items: stretch;
			flex-direction: column;
			gap: 9px;
		}

		.form-actions > div {
			display: grid;
			grid-template-columns: 1fr 1.4fr;
		}

		.cancel-button {
			width: 100%;
		}
	}

	@media (max-width: 500px) {
		.breadcrumb {
			padding-top: 20px;
		}

		.page-heading h1 {
			font-size: 30px;
		}

		.page-heading p {
			font-size: 14px;
			line-height: 1.6;
		}

		.image-upload {
			align-items: flex-start;
			flex-wrap: wrap;
		}

		.upload-content {
			width: calc(100% - 61px);
		}

		.upload-button {
			width: 100%;
		}

		.ingredient-header {
			grid-template-columns: 1fr 100px 34px;
		}

		.ingredient-row {
			grid-template-columns: 1fr 100px 34px;
			padding: 7px;
		}

		.ingredient-row input {
			padding: 0 8px;
			font-size: 14px;
		}

		.step-row {
			grid-template-columns: 34px minmax(0, 1fr) 30px;
			gap: 8px;
		}

		.step-number {
			width: 34px;
			height: 34px;
			font-size: 14px;
		}

		.step-content textarea {
			min-height: 110px;
		}
	}
</style>