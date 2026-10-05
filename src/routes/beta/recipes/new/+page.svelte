<script lang="ts">
	import { createFood, uploadRecipeImage } from '$lib/api';
	import { appPath } from '$lib/app-path';
	import { goto } from '$app/navigation';

	let title = $state('');
	let description = $state('');
	let category = $state('');
	let difficulty = $state('5');
	let cookingTime = $state('');
	let servings = $state('2');
	let imageUrl = $state('');
 let imageFile = $state<File | null>(null);
 let createdId: number | null = null;

	let ingredients = $state([{ name: '', amount: '' }]);
	let steps = $state([{ description: '' }]);

	let tagInput = $state('');
	let tags = $state<string[]>([]);

	let submitting = $state(false);
	let errorMessage = $state('');

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

	function addTag() {
		const value = tagInput.trim();

		if (!value) return;

		if (tags.includes(value)) {
			tagInput = '';
			return;
		}

		tags = [...tags, value];
		tagInput = '';
	}

	function removeTag(index: number) {
		tags = tags.filter((_, i) => i !== index);
	}

	function handleTagKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			addTag();
		}
	}

	function getValidationError() {
		if (!title.trim()) {
			return '레시피 이름을 입력해주세요.';
		}

		if (!category) {
			return '카테고리를 선택해주세요.';
		}

		const cookingTimeNumber = Number(cookingTime);

		if (!cookingTime || !Number.isInteger(cookingTimeNumber) || cookingTimeNumber < 1) {
			return '조리 시간을 1분 이상 입력해주세요.';
		}

		const servingsNumber = Number(servings);

		if (!servings || !Number.isInteger(servingsNumber) || servingsNumber < 1) {
			return '인분을 1 이상 입력해주세요.';
		}

		const validIngredients = ingredients.filter(
			(item) => item.name.trim() !== ''
		);

		if (validIngredients.length === 0) {
			return '재료를 하나 이상 입력해주세요.';
		}

		const invalidIngredient = validIngredients.find(
			(item) => item.amount.trim() === ''
		);

		if (invalidIngredient) {
			return `${invalidIngredient.name.trim()}의 분량을 입력해주세요.`;
		}

		const validSteps = steps.filter(
			(step) => step.description.trim() !== ''
		);

		if (validSteps.length === 0) {
			return '조리 순서를 하나 이상 입력해주세요.';
		}

		if (imageUrl.trim()) {
			try {
				const url = new URL(imageUrl.trim());

				if (url.protocol !== 'http:' && url.protocol !== 'https:') {
					return '대표 이미지 URL은 HTTP 또는 HTTPS 주소만 사용할 수 있습니다.';
				}
			} catch {
				return '대표 이미지 URL 형식이 올바르지 않습니다.';
			}
		}

		return null;
	}

	async function submitRecipe(event: SubmitEvent) {
		event.preventDefault();

		if (submitting) return;

		errorMessage = '';

		const validationError = getValidationError();

		if (validationError) {
			errorMessage = validationError;
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		const cookingTimeNumber = Number(cookingTime);
		const servingsNumber = Number(servings);

		const validIngredients = ingredients.filter(
			(item) => item.name.trim() !== ''
		);

		const validSteps = steps.filter(
			(step) => step.description.trim() !== ''
		);

		const ingredientText = validIngredients
			.map((item) => `${item.name.trim()} ${item.amount.trim()}`.trim())
			.join('\n');

		const recipeText = validSteps
			.map((step, index) => `${index + 1}. ${step.description.trim()}`)
			.join('\n');

		const food = {
			name: title.trim(),

			ingredients: ingredientText,

			recipe: recipeText,

			estimated_time: `${cookingTimeNumber}분`,

			metadata: {
				description: description.trim(),
				category,
				difficulty: Number(difficulty),
				cooking_time_minutes: cookingTimeNumber,
				servings: servingsNumber,
				tags,
				ingredient_names: validIngredients.map(
					(item) => item.name.trim()
				),
				aliases: [],
				image_url: imageUrl.trim() || null
			}
		};

		try {
			submitting = true;

			const id = createdId ?? await createFood(food);
 createdId = id;
 if(imageFile) await uploadRecipeImage(id, imageFile);

			if (!id || !Number.isInteger(id)) {
				throw new Error('레시피 등록은 완료되었지만 생성된 레시피 ID를 받지 못했습니다.');
			}

			await goto(appPath(`/recipes/${id}`));
		} catch (error) {
			console.error(error);

			errorMessage =
				error instanceof Error
					? error.message || '레시피 등록에 실패했습니다.'
					: '레시피 등록에 실패했습니다.';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>레시피 등록 | 요리위키</title>
	<meta
		name="description"
		content="나만의 레시피를 요리위키에 등록해보세요."
	/>
</svelte:head>

<div class="page">
	<main>
		<nav class="breadcrumb">
			<a href={appPath('/')}>홈</a>

			<svg viewBox="0 0 24 24">
				<path d="M9 18l6-6-6-6" />
			</svg>

			<a href={appPath('/recipes')}>레시피</a>

			<svg viewBox="0 0 24 24">
				<path d="M9 18l6-6-6-6" />
			</svg>

			<span>레시피 등록</span>
		</nav>

		<section class="page-heading">
			<div>
				<span class="heading-label">레시피 공유</span>

				<h1>
					나만의 레시피를<br />
					<span>등록해보세요.</span>
				</h1>

				<p>
					직접 만든 요리와 맛있는 레시피를 다른 사람들과 공유해보세요.
				</p>
			</div>

			<div class="heading-icon">
				<svg viewBox="0 0 24 24">
					<path d="M7 4h10v16H7z" />
					<path d="M9.5 8h5M9.5 12h5M9.5 16h3" />
				</svg>
			</div>
		</section>

		{#if errorMessage}
			<div class="error-message" role="alert">
				<svg viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="9" />
					<path d="M12 8v5" />
					<path d="M12 16h.01" />
				</svg>

				<span>{errorMessage}</span>
			</div>
		{/if}

		<form class="recipe-form" onsubmit={submitRecipe}>
			<section class="form-section">
				<div class="section-heading">
					<div class="section-number">01</div>

					<div>
						<h2>기본 정보</h2>
						<p>레시피를 소개할 기본 정보를 입력해주세요.</p>
					</div>
				</div>

				<label>대표 이미지 파일 (PNG/JPEG/WebP, 5MB 이하)<input type="file" accept="image/png,image/jpeg,image/webp" onchange={(e)=>imageFile=e.currentTarget.files?.[0] ?? null} /></label>
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
						<span>대표 이미지의 HTTP(S) URL을 입력해주세요.</span>
						<small>이미지 파일 자체 업로드는 지원하지 않습니다.</small>
					</div>
				</div>

				<div class="form-grid">
					<label class="field field-wide">
						<span>레시피 이름 <b>*</b></span>

						<input
							bind:value={title}
							placeholder="예: 매콤한 김치볶음밥"
							maxlength="100"
						/>
					</label>

					<label class="field field-wide">
						<span>한 줄 소개</span>

						<input
							bind:value={description}
							placeholder="이 레시피를 간단하게 소개해주세요."
							maxlength="300"
						/>
					</label>

					<label class="field field-wide">
						<span>대표 이미지 URL</span>

						<input
							bind:value={imageUrl}
							type="url"
							placeholder="https://example.com/image.jpg"
						/>
					</label>

					<label class="field">
						<span>카테고리 <b>*</b></span>

						<select bind:value={category}>
							<option value="" disabled>카테고리 선택</option>
							<option value="KOREAN">한식</option>
							<option value="CHINESE">중식</option>
							<option value="JAPANESE">일식</option>
							<option value="WESTERN">양식</option>
							<option value="SNACK">분식</option>
							<option value="DESSERT">디저트</option>
							<option value="DRINK">음료</option>
						</select>
					</label>

					<label class="field">
						<span>난이도 <b>*</b></span>

						<select bind:value={difficulty}>
							{#each Array(10) as _, index}
								<option value={String(index + 1)}>
									{index + 1}단계
								</option>
							{/each}
						</select>
					</label>

					<label class="field">
						<span>조리 시간 <b>*</b></span>

						<div class="input-with-unit">
							<input
								bind:value={cookingTime}
								type="number"
								min="1"
								step="1"
								placeholder="30"
							/>

							<span>분</span>
						</div>
					</label>

					<label class="field">
						<span>인분 <b>*</b></span>

						<div class="input-with-unit">
							<input
								bind:value={servings}
								type="number"
								min="1"
								step="1"
							/>

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
							<input
								bind:value={ingredient.name}
								placeholder="예: 김치"
							/>

							<input
								bind:value={ingredient.amount}
								placeholder="예: 1컵"
							/>

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

				<button
					class="add-button"
					type="button"
					onclick={addIngredient}
				>
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
							<div class="step-number">
								{String(index + 1).padStart(2, '0')}
							</div>

							<div class="step-content">
								<textarea
									bind:value={step.description}
									rows="4"
									placeholder="조리 과정을 자세하게 작성해주세요."
								></textarea>
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

				<button
					class="add-button"
					type="button"
					onclick={addStep}
				>
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
						<input
							bind:value={tagInput}
							onkeydown={handleTagKeydown}
							placeholder="태그를 입력하고 추가해주세요."
						/>

						<button type="button" onclick={addTag}>
							추가
						</button>
					</div>

					{#if tags.length > 0}
						<div class="tag-list">
							{#each tags as tag, index}
								<button
									type="button"
									class="tag"
									onclick={() => removeTag(index)}
									aria-label={`${tag} 태그 삭제`}
								>
									#{tag}

									<span>×</span>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</section>

			<div class="form-actions">
				<a
					href={appPath('/recipes')}
					class="cancel-button"
					aria-disabled={submitting}
				>
					취소
				</a>

				<button
					class="submit-button"
					type="submit"
					disabled={submitting}
				>
					{#if submitting}
						등록 중...
					{:else}
						레시피 등록하기

						<svg viewBox="0 0 24 24">
							<path d="M5 12h14" />
							<path d="M13 6l6 6-6 6" />
						</svg>
					{/if}
				</button>
			</div>
		</form>
	</main>
</div>

<style>
	.page {
		min-height: 100vh;
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
		max-width: 1080px;
		margin: 0 auto;
		padding: 0 24px 100px;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 24px 0 18px;
		color: var(--text-muted);
		font-size: 14px;
	}

	.breadcrumb a {
		color: var(--text-subtle);
		text-decoration: none;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	.breadcrumb svg {
		width: 12px;
		height: 12px;
	}

	.page-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;
		padding: 35px 0 40px;
		border-bottom: 1px solid var(--border);
	}

	.heading-label {
		color: var(--accent);
		font-size: 14px;
		font-weight: 800;
	}

	.page-heading h1 {
		margin: 10px 0 12px;
		font-size: 40px;
		line-height: 1.18;
		letter-spacing: -0.06em;
		color: var(--text);
	}

	.page-heading h1 span {
		color: var(--accent);
	}

	.page-heading p {
		margin: 0;
		color: var(--text-subtle);
		font-size: 15px;
		line-height: 1.6;
	}

	.heading-icon {
		width: 100px;
		height: 100px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		border-radius: 24px;
		background: var(--surface-yellow);
		border: 1px solid var(--border);
		color: var(--accent);
	}

	.heading-icon svg {
		width: 44px;
		height: 44px;
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 9px;
		margin-top: 24px;
		padding: 13px 15px;
		border: 1px solid var(--danger);
		border-radius: 9px;
		background: var(--surface);
		color: var(--danger);
		font-size: 14px;
		line-height: 1.5;
	}

	.error-message svg {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	.recipe-form {
		display: flex;
		flex-direction: column;
		gap: 40px;
		margin-top: 40px;
	}

	.form-section {
		padding-bottom: 40px;
		border-bottom: 1px solid var(--border);
	}

	.section-heading {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		margin-bottom: 24px;
	}

	.section-number {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: var(--primary);
		color: #0f172a;
		font-size: 14px;
		font-weight: 850;
	}

	.section-heading h2 {
		margin: 2px 0 5px;
		font-size: 22px;
		letter-spacing: -0.04em;
		color: var(--text);
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
		border-radius: 12px;
		background: var(--surface-green);
	}

	.upload-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 46px;
		height: 46px;
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
		color: var(--text);
	}

	.upload-content span,
	.upload-content small {
		color: var(--text-muted);
		font-size: 13px;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
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
		color: var(--text);
	}

	.field b {
		color: var(--accent);
	}

	.field input,
	.field select,
	.ingredient-row input,
	.tag-input input,
	.step-content textarea {
		width: 100%;
		box-sizing: border-box;
		border: 1px solid var(--border);
		border-radius: 9px;
		outline: 0;
		background: var(--surface-subtle);
		color: var(--text);
		font-size: 14px;
		transition:
			border-color 0.15s ease,
			background 0.15s ease;
	}

	.field input,
	.field select,
	.ingredient-row input {
		height: 42px;
		padding: 0 12px;
	}

	.field input:focus,
	.field select:focus,
	.ingredient-row input:focus,
	.tag-input input:focus,
	.step-content textarea:focus {
		border-color: var(--primary);
		background: var(--surface);
	}

	.field input::placeholder,
	.ingredient-row input::placeholder,
	.tag-input input::placeholder,
	.step-content textarea::placeholder {
		color: var(--text-muted);
	}

	.input-with-unit {
		position: relative;
	}

	.input-with-unit input {
		padding-right: 48px;
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
		border-radius: 10px;
	}

	.ingredient-header,
	.ingredient-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 180px 42px;
		gap: 10px;
		align-items: center;
	}

	.ingredient-header {
		padding: 10px 12px;
		background: var(--surface-subtle);
		color: var(--text-muted);
		font-size: 13px;
	}

	.ingredient-row {
		padding: 7px 12px;
		border-top: 1px solid var(--border);
	}

	.ingredient-row input {
		background: var(--surface);
	}

	.remove-button {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
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
		gap: 18px;
	}

	.step-row {
		display: grid;
		grid-template-columns: 42px minmax(0, 1fr) 32px;
		gap: 13px;
		align-items: start;
	}

	.step-number {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		border-radius: 11px;
		background: var(--surface-yellow);
		color: var(--accent);
		font-size: 14px;
		font-weight: 850;
	}

	.step-content textarea {
		display: block;
		min-height: 100px;
		padding: 12px;
		resize: vertical;
		line-height: 1.7;
	}

	.step-remove {
		margin-top: 5px;
	}

	.tag-label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.tag-label small {
		color: var(--text-muted);
		font-size: 13px;
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

	.tag-input button:hover {
		opacity: 0.9;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 9px;
	}

	.tag {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 6px 9px;
		border: 0;
		border-radius: 7px;
		background: var(--surface-green);
		color: var(--accent);
		font-size: 13px;
		font-weight: 650;
		cursor: pointer;
	}

	.tag span {
		font-size: 15px;
		line-height: 1;
	}

	.form-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cancel-button,
	.submit-button {
		height: 46px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 9px;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
		text-decoration: none;
		box-sizing: border-box;
	}

	.cancel-button {
		padding: 0 17px;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-subtle);
	}

	.cancel-button:hover {
		border-color: var(--primary);
		color: var(--text);
	}

	.submit-button {
		gap: 8px;
		padding: 0 18px;
		border: 0;
		background: var(--primary);
		color: #0f172a;
	}

	.submit-button:hover:not(:disabled) {
		background: var(--primary-hover);
	}

	.submit-button:disabled {
		opacity: 0.6;
		cursor: wait;
	}

	.submit-button svg {
		width: 15px;
		height: 15px;
	}

	@media (max-width: 760px) {
		main {
			padding: 0 16px 70px;
		}

		.page-heading {
			align-items: flex-start;
			padding: 30px 0;
		}

		.heading-icon {
			display: none;
		}

		.page-heading h1 {
			font-size: 34px;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.field-wide {
			grid-column: auto;
		}

		.ingredient-header,
		.ingredient-row {
			grid-template-columns: minmax(0, 1fr) 120px 34px;
		}

		.form-actions {
			align-items: stretch;
			flex-direction: column;
			gap: 9px;
		}

		.cancel-button,
		.submit-button {
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
		}

		.ingredient-header {
			grid-template-columns: minmax(0, 1fr) 100px 34px;
		}

		.ingredient-row {
			grid-template-columns: minmax(0, 1fr) 100px 34px;
			padding: 7px;
		}

		.ingredient-row input {
			padding: 0 8px;
			font-size: 13px;
		}

		.step-row {
			grid-template-columns: 34px minmax(0, 1fr) 30px;
			gap: 8px;
		}

		.step-number {
			width: 34px;
			height: 34px;
			font-size: 13px;
		}

		.step-content textarea {
			min-height: 110px;
		}
	}
</style>