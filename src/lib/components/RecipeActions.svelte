<script lang="ts">
  import { page } from '$app/state';
  import { goto, invalidateAll } from '$app/navigation';
  import { api, uploadRecipeImage, type Food } from '$lib/api';
  import { isAdmin } from '$lib/auth';
  import { appPath } from '$lib/app-path';

  let { food }: { food: Food } = $props();

  let editing = $state(false);
  let ingredients = $state('');
  let recipe = $state('');
  let time = $state('');
  let busy = $state(false);
  let error = $state('');

  let allowed = $derived(
    !!page.data.user && (isAdmin(page.data.user) || food.author_id === page.data.user.id)
  );

  async function imageChanged(e: Event) {
    const file = (e.currentTarget as HTMLInputElement).files?.[0];
    if (!file) return;
    busy = true;
    error = '';
    try {
      await uploadRecipeImage(food.id, file);
      await invalidateAll();
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }

  async function clearImage() {
    if (!confirm('대표 이미지를 삭제하시겠습니까?')) return;
    busy = true;
    error = '';
    try {
      await api(`/food/image?id=${food.id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
      });
      await invalidateAll();
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }

  function edit() {
    ingredients = food.ingredients ?? '';
    recipe = food.recipe ?? '';
    time = food.estimated_time ?? '';
    editing = true;
  }

  async function save(e: SubmitEvent) {
    e.preventDefault();
    busy = true;
    error = '';
    try {
      await api(`/food?id=${food.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ingredients, recipe, estimated_time: time })
      });
      editing = false;
      await invalidateAll();
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }

  async function remove() {
    if (!confirm('이 레시피를 삭제하시겠습니까?')) return;
    busy = true;
    error = '';
    try {
      await api(`/food?name=${encodeURIComponent(food.name)}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
      });
      await goto(appPath('/recipes'));
    } catch (e) {
      error = (e as Error).message;
    } finally {
      busy = false;
    }
  }
</script>

{#if allowed}
  <section class="admin-actions">
    <div class="action-bar">
      <button type="button" class="btn secondary" onclick={edit} disabled={busy}>
        수정
      </button>

      <label class="btn secondary file-label">
        <span>대표 이미지 변경</span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          disabled={busy}
          onchange={imageChanged}
        />
      </label>

      {#if food.metadata?.image_url}
        <button type="button" class="btn secondary" disabled={busy} onclick={clearImage}>
          대표 이미지 삭제
        </button>
      {/if}

      <button type="button" class="btn danger" onclick={remove} disabled={busy}>
        삭제
      </button>
    </div>

    <!-- 수정 모달/폼 박스 -->
    {#if editing}
      <form class="recipe-form edit-container" onsubmit={save}>
        <!-- 1. 기본 정보 중 조리 시간만 구현되어 있으므로 해당 항목만 노출 -->
        <section class="form-section">
          <div class="section-heading">
            <div class="section-number">01</div>
            <div>
              <h2>기본 정보 수정</h2>
              <p>조리 시간을 수정해주세요.</p>
            </div>
          </div>

          <div class="form-grid">
            <label class="field">
              <span>조리 시간 <b>*</b></span>
              <input bind:value={time} required placeholder="예: 20분" />
            </label>
          </div>
        </section>

        <!-- 2. 재료 수정 -->
        <section class="form-section">
          <div class="section-heading">
            <div class="section-number">02</div>
            <div>
              <h2>재료 정보</h2>
              <p>레시피에 필요한 재료와 양을 수정해주세요.</p>
            </div>
          </div>

          <label class="field description-field">
            <span>재료 목록 <b>*</b></span>
            <textarea
              bind:value={ingredients}
              required
              rows="5"
              placeholder="예: 돼지고기 300g&#10;양파 1개&#10;대파 1/2대"
            ></textarea>
          </label>
        </section>

        <!-- 3. 조리 순서 수정 -->
        <section class="form-section">
          <div class="section-heading">
            <div class="section-number">03</div>
            <div>
              <h2>조리 순서</h2>
              <p>요리를 만드는 과정을 순서대로 수정해주세요.</p>
            </div>
          </div>

          <label class="field description-field">
            <span>조리 과정 <b>*</b></span>
            <textarea
              bind:value={recipe}
              required
              rows="8"
              placeholder="1. 재료를 먹기 좋은 크기로 썰어줍니다.&#10;2. 팬에 기름을 두르고 고기를 볶습니다."
            ></textarea>
          </label>
        </section>

        <!-- 버튼 영역 -->
        <div class="form-actions">
          <button type="button" class="cancel-button" onclick={() => (editing = false)}>
            취소
          </button>

          <div>
            <button class="submit-button" type="submit" disabled={busy}>
              {busy ? '저장 중…' : '수정 완료'}
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    {/if}

    {#if error}
      <p class="error-msg" role="alert">{error}</p>
    {/if}
  </section>
{/if}

<style>
  svg {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .admin-actions {
    margin: 32px 0 20px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
  }

  /* 상단 툴바 버튼 스타일 */
  .action-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s ease;
    user-select: none;
    border: 1px solid transparent;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn.secondary {
    background: var(--surface);
    color: var(--text-subtle, var(--text));
    border-color: var(--border);
  }

  .btn.secondary:hover:not(:disabled) {
    background: var(--surface-subtle, var(--surface));
    border-color: var(--text-muted);
    color: var(--text);
  }

  .btn.danger {
    background: transparent;
    color: var(--accent-red, #ef4444);
    border-color: var(--border);
  }

  .btn.danger:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.08);
    border-color: var(--accent-red, #ef4444);
  }

  .file-label {
    position: relative;
    overflow: hidden;
  }

  .file-label input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  /* 수정 폼 스타일 (등록 페이지 스타일 복사 적용) */
  .edit-container {
    margin-top: 24px;
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
    margin-bottom: 24px;
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
    letter-spacing: -0.05em;
  }

  .section-heading p {
    margin: 0;
    color: var(--text-muted);
    font-size: 14px;
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

  .field > span {
    font-size: 14px;
    font-weight: 700;
  }

  .field b {
    color: var(--accent);
  }

  .field input,
  .field textarea {
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 9px;
    outline: 0;
    background: var(--surface-subtle);
    color: var(--text);
    font-size: 14px;
    box-sizing: border-box;
  }

  .field input {
    height: 42px;
    padding: 0 12px;
  }

  .field textarea {
    padding: 12px;
    resize: vertical;
    line-height: 1.7;
  }

  .field input:focus,
  .field textarea:focus {
    border-color: var(--primary);
    background: var(--surface);
  }

  .field input::placeholder,
  .field textarea::placeholder {
    color: var(--text-muted);
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

  .cancel-button:hover {
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

  .error-msg {
    margin: 12px 0 0;
    color: var(--accent-red, #ef4444);
    font-size: 14px;
  }

  @media (max-width: 760px) {
    .form-section {
      padding: 23px 18px;
    }
    .form-grid {
      grid-template-columns: 1fr;
    }
    .form-actions {
      align-items: stretch;
      flex-direction: column;
      gap: 9px;
    }
    .form-actions > div {
      display: grid;
      grid-template-columns: 1fr;
    }
    .cancel-button {
      width: 100%;
    }
  }
</style>