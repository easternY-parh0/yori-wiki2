<script lang="ts">
  // 1. 검색 결과 타입 정의
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

  // 컨텍스트 메뉴 제어
  function handleContextMenu(event: MouseEvent) {
    const selection = window.getSelection()?.toString().trim();

    if (selection && selection.length > 0) {
      event.preventDefault();
      selectedText = selection;
      
      // 화면 밖으로 메뉴가 나가지 않도록 좌표 조정
      const x = Math.min(event.clientX, window.innerWidth - 220);
      const y = Math.min(event.clientY, window.innerHeight - 150);
      
      menuPosition = { x, y };
      showMenu = true;
    } else {
      showMenu = false;
    }
  }

  function handleClickOutside() {
    showMenu = false;
  }

  // 외부 사전/백과 사전 API 검색
  async function searchExternal() {
    showMenu = false;
    isLoading = true;
    searchResult = null;

    try {
      const encodedQuery = encodeURIComponent(selectedText);
      const res = await fetch(`https://ko.wikipedia.org/api/rest_v1/page/summary/${encodedQuery}`);
      
      if (!res.ok) throw new Error('재료 및 요리 정보를 찾을 수 없습니다.');

      const data = await res.json();
      searchResult = {
        title: data.title,
        extract: data.extract || '상세 설명 정보가 존재하지 않습니다.',
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

<svelte:window onclick={handleClickOutside} />

<div class="wiki-container" oncontextmenu={handleContextMenu}>
  <!-- 헤더 영역 -->
  <header class="wiki-header">
    <div class="logo">🍳 YoriWiki <span>Beta</span></div>
    <nav class="nav-links">
      <span class="active">레시피 탐색</span>
      <span>식재료 사전</span>
      <span>커뮤니티</span>
    </nav>
  </header>

  <!-- 메인 아티클 영역 -->
  <article class="recipe-card">
    <div class="badge">오늘의 추천 레시피</div>
    <h1>클래식 파스타 알리오 올리오 (Aglio e Olio)</h1>
    <p class="meta">작성자: Chef Min | 난이도: ★★☆☆☆ | 소요시간: 15분</p>

    <div class="divider"></div>

    <section class="recipe-content">
      <h2>소개 및 역사</h2>
      <p>
        <strong>알리오 올리오</strong>는 이탈리아 나폴리 지방에서 유래한 가장 대표적인 오일 파스타입니다. 
        이름 그대로 <em>마늘(Aglio)</em>과 <em>기름(Olio)</em>을 주재료로 사용하며, 심플하지만 깊은 감칠맛을 자랑합니다.
      </p>

      <h2>필수 재료 (2인분 기준)</h2>
      <ul class="ingredient-list">
        <li>스파게티 면 200g</li>
        <li>통마늘 8~10쪽 (편으로 썰기)</li>
        <li>엑스트라 버진 올리브유 6큰술</li>
        <li>페페론치노 3~4개</li>
        <li>파슬리, 파르미지아노 레지아노 치즈 약간</li>
      </ul>

      <div class="tip-box">
        💡 <strong>이용 팁:</strong> 궁금한 재료나 요어(예: <span>올리브유</span>, <span>페페론치노</span>, <span>스파게티</span>)를 드래그한 후 마우스 우클릭을 누르면 실시간 요리 백과 사전 검색을 할 수 있습니다.
      </div>
    </section>
  </article>
</div>

<!-- 우클릭 팝업 커스텀 메뉴 -->
{#if showMenu}
  <div 
    class="custom-menu" 
    style="top: {menuPosition.y}px; left: {menuPosition.x}px;"
  >
    <button onclick={searchExternal}>
      <span class="icon">📖</span>
      <span class="label"><strong>"{selectedText}"</strong> 사전 검색</span>
    </button>
  </div>
{/if}

<!-- 검색 결과 오버레이 모달 / 오프캔버스 패널 -->
{#if isLoading}
  <div class="result-card loading">
    <div class="spinner"></div>
    <p>요리 백과에서 정보를 탐색하고 있습니다...</p>
  </div>
{:else if searchResult}
  <div class="result-card">
    <button class="close-btn" onclick={() => searchResult = null}>&times;</button>
    
    {#if searchResult.thumbnail}
      <img src={searchResult.thumbnail} alt={searchResult.title} class="card-img" />
    {/if}

    <div class="card-body">
      <span class="sub-badge">YoriWiki 백과</span>
      <h3>{searchResult.title}</h3>
      <p>{searchResult.extract}</p>
      
      {#if searchResult.url}
        <a href={searchResult.url} target="_blank" rel="noopener noreferrer" class="more-link">
          위키백과에서 원문 자세히 보기 ↗
        </a>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* 기본 레이아웃 & 테마 설정 */
  :global(body) {
    margin: 0;
    background-color: #f8f9fa;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #333;
  }

  .wiki-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
  }

  /* 헤더 스타일 */
  .wiki-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 2px solid #e9ecef;
    margin-bottom: 30px;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    color: #ff6b6b;
  }

  .logo span {
    font-size: 0.8rem;
    background: #ffe3e3;
    color: #ff6b6b;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .nav-links span {
    margin-left: 20px;
    font-weight: 500;
    color: #666;
    cursor: pointer;
  }

  .nav-links .active {
    color: #ff6b6b;
    font-weight: 700;
  }

  /* 아티클 레시피 카터 */
  .recipe-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  .badge {
    display: inline-block;
    background: #fff0f6;
    color: #e64980;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 12px;
  }

  h1 {
    font-size: 2rem;
    margin: 0 0 8px 0;
    color: #1a1a1a;
  }

  .meta {
    color: #868e96;
    font-size: 0.9rem;
    margin: 0;
  }

  .divider {
    height: 1px;
    background: #f1f3f5;
    margin: 24px 0;
  }

  .recipe-content h2 {
    font-size: 1.25rem;
    margin-top: 24px;
    color: #212529;
  }

  .recipe-content p {
    line-height: 1.7;
    color: #495057;
  }

  .ingredient-list {
    background: #f8f9fa;
    padding: 20px 20px 20px 40px;
    border-radius: 8px;
    line-height: 1.8;
  }

  .tip-box {
    margin-top: 30px;
    background: #e7f5ff;
    border-left: 4px solid #339af0;
    padding: 16px;
    border-radius: 4px;
    font-size: 0.95rem;
    color: #1864ab;
  }

  .tip-box span {
    background: #d0ebff;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
  }

  /* 플로팅 컨텍스트 메뉴 */
  .custom-menu {
    position: fixed;
    z-index: 1000;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    padding: 6px;
    border: 1px solid #f1f3f5;
    animation: fadeIn 0.15s ease-out;
  }

  .custom-menu button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 0.9rem;
    color: #333;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .custom-menu button:hover {
    background-color: #ffebd2;
    color: #d9480f;
  }

  /* 우측 하단 미니 오버레이 바 카드 */
  .result-card {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 340px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
    overflow: hidden;
    z-index: 1000;
    border: 1px solid #f1f3f5;
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .card-img {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }

  .card-body {
    padding: 20px;
  }

  .sub-badge {
    font-size: 0.75rem;
    font-weight: 700;
    color: #ff6b6b;
    text-transform: uppercase;
  }

  .card-body h3 {
    margin: 6px 0 12px 0;
    font-size: 1.2rem;
  }

  .card-body p {
    font-size: 0.9rem;
    color: #495057;
    line-height: 1.5;
    max-height: 120px;
    overflow-y: auto;
    margin-bottom: 16px;
  }

  .more-link {
    display: inline-block;
    font-size: 0.85rem;
    color: #339af0;
    text-decoration: none;
    font-weight: 600;
  }

  .more-link:hover {
    text-decoration: underline;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 14px;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading {
    padding: 30px;
    text-align: center;
    font-size: 0.9rem;
    color: #666;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #ff6b6b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 12px auto;
  }

  /* 애니메이션 */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>