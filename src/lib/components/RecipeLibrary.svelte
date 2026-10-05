<script lang="ts">
 import { onMount } from 'svelte';
 import { page } from '$app/state';
 import { api, type FoodSummary } from '$lib/api';
 import { appPath } from '$lib/app-path';
 type Item = FoodSummary & { liked: boolean; saved: boolean };
 let kind = $state<'recipes' | 'likes' | 'saved'>('recipes');
 let recipes = $state<Item[]>([]); let total = $state(0); let offset = $state(0);
 let busy = $state(false); let error = $state('');
 async function load(next = 0) {
  busy=true;error='';try {const result=await api<{recipes:Item[];total:number}>(`/auth/${kind}?limit=20&offset=${next}`);recipes=result.recipes;total=result.total;offset=next;}catch(e){error=(e as Error).message;}finally{busy=false;}
 }
 async function select(next:typeof kind){kind=next;await load();}
 async function remove(item:Item){busy=true;error='';try{await api(`/food/${kind==='likes'?'like':'save'}?id=${item.id}`,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify(kind==='likes'?{liked:false}:{saved:false})});await load(Math.max(0,recipes.length===1?offset-20:offset));}catch(e){error=(e as Error).message;}finally{busy=false;}}
 onMount(()=>{if(page.data.user)void load();});
</script>
<section class="library">
 <h2>나의 레시피 보관함</h2>
 {#if page.data.user}
 <nav aria-label="레시피 보관함 분류">
  <button disabled={busy} aria-pressed={kind==='recipes'} onclick={()=>select('recipes')}>등록한 레시피</button>
  <button disabled={busy} aria-pressed={kind==='likes'} onclick={()=>select('likes')}>좋아요한 레시피</button>
  <button disabled={busy} aria-pressed={kind==='saved'} onclick={()=>select('saved')}>저장한 레시피</button>
 </nav>
 <p>총 {total}개 {busy?'· 불러오는 중…':''}</p>
 <div class="cards">{#each recipes as item (item.id)}<article>
  {#if item.image_url}<img src={item.image_url.startsWith('/api/')?appPath(item.image_url):item.image_url} alt={item.name} />{/if}
  <h3><a href={appPath(`/recipes/${item.id}`)}>{item.name}</a></h3>
  <p>{item.author ?? '요리위키'} · {item.estimated_time} · 좋아요 {item.likes ?? 0}</p>
  {#if kind!=='recipes'}<button disabled={busy} onclick={()=>remove(item)}>{kind==='likes'?'좋아요 취소':'저장 취소'}</button>{/if}
 </article>{:else}{#if !busy}<p>아직 레시피가 없습니다.</p>{/if}{/each}</div>
 <button disabled={busy || offset===0} onclick={()=>load(offset-20)}>이전</button>
 <button disabled={busy || offset+20>=total} onclick={()=>load(offset+20)}>다음</button>
 {:else}<p><a href={appPath('/login')}>로그인</a>하면 등록·좋아요·저장한 레시피를 볼 수 있습니다.</p>{/if}
 {#if error}<p role="alert">{error}</p>{/if}
</section>
<style>.library{max-width:1100px;margin:30px auto;padding:24px}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}article{padding:16px;border:1px solid var(--border);border-radius:12px}img{width:100%;height:160px;object-fit:cover;border-radius:8px}button{margin:4px;padding:10px 14px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);cursor:pointer}button[aria-pressed=true]{background:var(--primary);color:#0f172a}button:disabled{opacity:.5}p{overflow-wrap:anywhere}</style>
