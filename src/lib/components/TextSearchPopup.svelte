<script lang="ts">
  interface SearchResult {
    title: string;
    extract: string;
    url: string | null;
    thumbnail?: string | null;
  }

  let selectedText = $state('');
  let menuPosition = $state({ x: 0, y: 0 });
  let showMenu = $state(false);
  
  let searchResult = $state<SearchResult | null>(null);
  let isLoading = $state(false);

  // 텍스트 선택(드래그) 완료 감지
  function handleMouseUp(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // 툴팁이나 카드 영역 내부를 클릭한 경우는 처리 방지
    if (target.closest('.custom-tooltip') || target.closest('.result-card')) return;

    // DOM 선택 상태 반영을 위해 setTimeout 사용
    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (selection && selection.rangeCount > 0 && text && text.length > 0) {
        selectedText = text;

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // 선택 영역의 위치 좌표 계산 (텍스트 바로 위)
        const x = Math.min(Math.max(rect.left + rect.width / 2 - 18, 10), window.innerWidth - 50);
        const y = Math.max(rect.top - 42, 10);

        menuPosition = { x, y };
        showMenu = true;
      }
    }, 20);
  }

  // 화면 다른 곳 클릭 시 툴팁 닫기
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // 툴팁 및 결과 카드가 아닌 곳을 누르고, 드래그 중이 아닐 때 닫기
    if (!target.closest('.custom-tooltip') && !target.closest('.result-card')) {
      const selection = window.getSelection();
      if (!selection || selection.toString().trim().length === 0) {
        showMenu = false;
      }
    }
  }

  // 외부 사전 검색 API 호출
  async function searchExternal() {
    showMenu = false;
    isLoading = true;
    searchResult = null;

    try {
      const encodedQuery = encodeURIComponent(selectedText);
      const res = await fetch(`https://ko.wikipedia.org/api/rest_v1/page/summary/${encodedQuery}`);
      
      if (!res.ok) throw new Error('검색 결과를 찾을 수 없습니다.');

      const data = await res.json();
      searchResult = {
        title: data.title,
        extract: data.extract || '상세 정보가 존재하지 않습니다.',
        url: data.content_urls?.desktop?.page || null,
        thumbnail: data.thumbnail?.source || null
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '정보를 불러오는 중 오류가 발생했습니다.';
      searchResult = { title: '검색 실패', extract: errorMessage, url: null };
    } finally {
      isLoading = false;
    }
  }
</script>

<!-- FontAwesome 6 CDN 로드 -->
<svelte:head>
  <link 
    rel="stylesheet" 
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
  />
</svelte:head>

<!-- window 전역 이벤트 바인딩 -->
<svelte:window onmouseup={handleMouseUp} onclick={handleClickOutside} />

<!-- 텍스트 선택 시 상단에 뜨는 플로팅 툴팁 버튼 -->
{#if showMenu}
  <div 
    class="custom-tooltip" 
    style="top: {menuPosition.y}px; left: {menuPosition.x}px;"
  >
    <button onclick={searchExternal} title="YoriWiki 사전 검색">
      <i class="fa-solid fa-book-open icon" aria-hidden="true"></i>
    </button>
  </div>
{/if}

<!-- 검색 결과 우측 하단 팝업 카드 -->
{#if isLoading}
  <div class="result-card loading">
    <div class="spinner"></div>
    <p>요리 백과 사전 탐색 중...</p>
  </div>
{:else if searchResult}
  <div class="result-card">
    <button class="close-btn" onclick={() => searchResult = null} aria-label="닫기">
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>
    
    {#if searchResult.thumbnail}
      <img src={searchResult.thumbnail} alt={searchResult.title} class="card-img" />
    {/if}

    <div class="card-body">
      <span class="sub-badge">요리위키-백과</span>
      <h3>{searchResult.title}</h3>
      <p>{searchResult.extract}</p>
      
      {#if searchResult.url}
        <a href={searchResult.url} target="_blank" rel="noopener noreferrer" class="more-link">
          위키백과에서 원문 보기 ↗
        </a>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* 플로팅 툴팁 버튼 스타일 */
  .custom-tooltip {
    position: fixed;
    z-index: 99999;
    background: var(--background, #ffffff);
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    padding: 3px;
    border: 1px solid var(--border, #e5e7eb);
    animation: fadeIn 0.15s ease-out;
  }

  .custom-tooltip button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-subtle, #4b5563);
    border-radius: 50%;
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .custom-tooltip button:hover {
    background-color: var(--surface-subtle, #f9fafb);
    color: var(--accent, #10b981);
  }

  .custom-tooltip .icon {
    font-size: 13px;
    pointer-events: none;
  }

  /* 결과 카드 스타일 */
  .result-card {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 340px;
    background: var(--background, #ffffff);
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    z-index: 99999;
    border: 1px solid var(--border, #e5e7eb);
    animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .card-img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-bottom: 1px solid var(--border, #e5e7eb);
  }

  .card-body {
    padding: 20px;
  }

  .sub-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 650;
    color: var(--accent, #10b981);
    letter-spacing: -0.01em;
  }

  .card-body h3 {
    margin: 6px 0 10px 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text, #111827);
    letter-spacing: -0.03em;
  }

  .card-body p {
    font-size: 13px;
    color: var(--text-subtle, #4b5563);
    line-height: 1.7;
    max-height: 120px;
    overflow-y: auto;
    margin: 0 0 16px 0;
    letter-spacing: -0.01em;
  }

  .more-link {
    display: inline-block;
    font-size: 12px;
    color: var(--text-muted, #6b7280);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.15s ease;
  }

  .more-link:hover {
    color: var(--accent, #10b981);
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--surface-subtle, rgba(0, 0, 0, 0.05));
    color: var(--text-subtle, #4b5563);
    border: none;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.15s ease, color 0.15s ease;
    z-index: 1;
    font-size: 14px;
  }

  .close-btn:hover {
    background: var(--border, #e5e7eb);
    color: var(--text, #111827);
  }

  .loading {
    padding: 30px;
    text-align: center;
    font-size: 13px;
    color: var(--text-subtle, #4b5563);
  }

  .spinner {
    width: 22px;
    height: 22px;
    border: 2px solid var(--border, #e5e7eb);
    border-top-color: var(--accent, #10b981);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 12px auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>