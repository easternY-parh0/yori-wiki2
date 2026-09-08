<script lang="ts">
  import { goto } from '$app/navigation';
  import { page, navigating } from '$app/state';
  import type { loadSearch } from '$lib/load-search';
  let { data }: { data: Awaited<ReturnType<typeof loadSearch>> } = $props();
  const categories = { KOREAN: '한식', CHINESE: '중식', JAPANESE: '일식', WESTERN: '양식', BAKING: '베이킹', SNACK: '간식' };
  const labels: Record<string, string> = { name: '이름', aliases: '별칭', ingredients: '재료', recipe: '조리 방법' };
  const params = $derived(page.url.searchParams);
  const result = $derived(data.result);
  async function submit(form: HTMLFormElement, searching: boolean) {
    const values = new URLSearchParams();
    for (const [key, value] of new FormData(form)) if (typeof value === 'string' && (value || key === 'q')) values.set(key, value);
    if (!searching && !values.get('q')?.trim()) values.delete('q');
    await goto(`${page.url.pathname}?${values}`, { keepFocus: true, noScroll: true });
  }
  function pageHref(number: number) { const next = new URLSearchParams(params); next.set('page', String(number)); return `${page.url.pathname}?${next}`; }
  const pageNumbers = $derived(result ? Array.from({ length: Math.min(7, result.pages) }, (_, i) => Math.max(1, Math.min(result.page - 3, result.pages - 6)) + i) : []);
</script>

<section class="search-section" aria-labelledby="search-title">
  <div class="heading"><div><span class="eyebrow">레시피 검색</span><h1 id="search-title">찾고 싶은 요리가 있나요?</h1><p>요리 이름, 재료, 조리 방법으로 찾아보세요.</p></div><a href="/recipes/new" class="register">레시피 등록 ↗</a></div>
  <form method="GET" action={page.url.pathname} onsubmit={e => { e.preventDefault(); submit(e.currentTarget, true); }} aria-busy={Boolean(navigating.to)}>
    <div class="search-bar"><label for="recipe-query" class="sr-only">검색어</label><input id="recipe-query" name="q" type="search" maxlength="100" value={params.get('q') ?? ''} placeholder="예: 김치볶음밥, 두부, 파스타" /><button type="submit">검색</button></div>
    <div class="filters">
      <label>검색 범위<select name="field" value={params.get('field') || 'all'} onchange={e => submit(e.currentTarget.form!, false)}><option value="all">전체</option><option value="name">이름·별칭</option><option value="ingredients">재료</option><option value="recipe">조리 방법</option><option value="aliases">별칭</option></select></label>
      <label>여러 검색어<select name="mode" value={params.get('mode') || 'and'} onchange={e => submit(e.currentTarget.form!, false)}><option value="and">모두 포함 (AND)</option><option value="or">하나 이상 (OR)</option></select></label>
      <label>분류<select name="category" value={params.get('category') || ''} onchange={e => submit(e.currentTarget.form!, false)}><option value="">전체</option>{#each Object.entries(categories) as [key, label]}<option value={key}>{label}</option>{/each}</select></label>
      <label>조리 시간<select name="maxTime" value={params.get('maxTime') || ''} onchange={e => submit(e.currentTarget.form!, false)}><option value="">제한 없음</option><option value="15">15분 이내</option><option value="30">30분 이내</option><option value="60">60분 이내</option></select></label>
      <label>최대 난이도<select name="maxDifficulty" value={params.get('maxDifficulty') || ''} onchange={e => submit(e.currentTarget.form!, false)}><option value="">전체</option>{#each Array.from({ length: 10 }, (_, i) => i + 1) as level}<option value={level}>{level}단계 이하</option>{/each}</select></label>
      <label>정렬<select name="sort" value={params.get('sort') || 'relevance'} onchange={e => submit(e.currentTarget.form!, false)}><option value="relevance">관련도순</option><option value="time">조리 시간순</option><option value="difficulty">난이도순</option><option value="likes">좋아요순</option><option value="newest">최신순</option></select></label>
      <a class="reset" href={page.url.pathname}>초기화</a>
    </div>
  </form>
  <p class="hint">띄어쓰기와 영문 대소문자를 구분하지 않습니다. 여러 단어는 선택한 AND / OR 방식으로 검색합니다.</p>
  <div aria-live="polite" aria-busy={Boolean(navigating.to)}>
    {#if navigating.to}<p role="status">검색 중…</p>{/if}
    {#if data.error}<p role="alert" class="empty">{data.error} <a href={page.url.pathname}>검색 초기화</a></p>
    {:else if result}
      <div class="result-heading"><h2>{result.query === null ? '전체 레시피' : `“${result.query}” 검색 결과`}</h2><span>총 {result.total}개{result.pages ? ` · ${result.page}/${result.pages}페이지` : ''}</span></div>
      {#if result.warning}<p role="status">{result.warning}</p>{/if}
      {#if result.query === ''}<p class="empty">검색어를 입력해주세요. 전체 요리를 보려면 초기화를 눌러주세요.</p>
      {:else if !result.items.length}<p class="empty">검색 결과가 없습니다. 다른 검색어나 필터를 사용해보세요.</p>
      {:else}<div class="results">{#each result.items as recipe (recipe.id)}<article><span class="category">{categories[recipe.metadata?.category as keyof typeof categories] || '미분류'}</span><h3><a href={`/recipes/${recipe.id}`}>{recipe.name}</a></h3><p>{typeof recipe.metadata?.description === 'string' ? recipe.metadata.description : recipe.ingredients}</p><div class="facts"><span>{recipe.estimated_time}</span><span>재료 {String(recipe.metadata?.ingredient_count ?? '—')}개</span><span>난이도 {recipe.metadata?.difficulty == null ? '미등록' : `${recipe.metadata.difficulty}/10`}</span></div>{#if recipe.matchingFields.length}<small>{recipe.matchingFields.map(key => labels[key]).join(' · ')} 일치</small>{/if}</article>{/each}</div>{/if}
      {#if result.pages > 1}<nav aria-label="검색 결과 페이지" class="pagination">{#if result.page > 1}<a href={pageHref(result.page - 1)} rel="prev">이전</a>{/if}{#each pageNumbers as number}<a href={pageHref(number)} class:active={number === result.page} aria-current={number === result.page ? 'page' : undefined}>{number}</a>{/each}{#if result.page < result.pages}<a href={pageHref(result.page + 1)} rel="next">다음</a>{/if}</nav>{/if}
    {/if}
  </div>
</section>
<style>
  .search-section{max-width:1200px;margin:0 auto;padding:48px 24px 30px;color:var(--text)}.heading{display:flex;justify-content:space-between;align-items:center;gap:20px}h1{font-size:36px;letter-spacing:-.05em;margin:12px 0}h2{font-size:24px;margin:0}h3{font-size:21px;margin:9px 0}p{font-size:16px;line-height:1.7;color:var(--text-subtle)}a{color:inherit}.eyebrow,.category{color:var(--accent);font-size:14px;font-weight:750}.register{padding:13px;border:1px solid var(--border);border-radius:10px;text-decoration:none;white-space:nowrap}.search-bar{display:flex;gap:8px;border:2px solid var(--primary);padding:6px;border-radius:14px;margin-top:26px}.search-bar input{flex:1;min-width:0;background:transparent;border:0;padding:12px;font:inherit;font-size:18px;color:var(--text)}.search-bar button{background:var(--primary);border:0;border-radius:9px;padding:12px 25px;font-size:16px;font-weight:750;color:#172018;cursor:pointer}.filters{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end;margin:18px 0}.filters label{font-size:14px;display:flex;flex-direction:column;gap:6px}select{font:inherit;color:var(--text);background:var(--surface);padding:10px;border:1px solid var(--border);border-radius:9px}.reset{font-size:14px;padding:10px}.hint{font-size:14px}.result-heading{display:flex;align-items:center;justify-content:space-between;gap:15px;margin:30px 0 18px}.result-heading span{font-size:14px;color:var(--text-subtle)}.results{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}article{padding:22px;border:1px solid var(--border);border-radius:16px;background:var(--surface)}article h3 a{text-decoration:none}article h3 a:hover{text-decoration:underline}article p{font-size:15px;overflow-wrap:anywhere}.facts{display:flex;flex-wrap:wrap;gap:12px;font-size:14px;border-top:1px solid var(--border);padding-top:12px;color:var(--text-subtle)}small{display:block;font-size:14px;color:var(--accent);margin-top:10px}.empty{background:var(--surface-subtle);padding:24px;border-radius:14px}.pagination{display:flex;justify-content:center;gap:7px;margin:25px 0;flex-wrap:wrap}.pagination a{padding:10px 14px;border:1px solid var(--border);border-radius:9px;text-decoration:none}.pagination a.active{background:var(--primary);color:#172018}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}input:focus-visible,button:focus-visible,a:focus-visible,select:focus-visible{outline:3px solid var(--accent);outline-offset:3px}@media(max-width:850px){.results{grid-template-columns:repeat(2,minmax(0,1fr))}.heading{align-items:flex-start;flex-direction:column}}@media(max-width:560px){.search-section{padding:30px 14px}.results{grid-template-columns:1fr}.filters label{flex:1;min-width:130px}.result-heading{align-items:flex-start;flex-direction:column}}
</style>
