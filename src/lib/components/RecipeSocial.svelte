<script lang="ts">
 import { onMount } from 'svelte';
 import { page } from '$app/state';
 import { invalidateAll } from '$app/navigation';
 import { api, type Food } from '$lib/api';
 import { isAdmin } from '$lib/auth';
 let { food }: { food: Food } = $props();
 type Comment = { id: number; content: string; author_id: number; author: string; created_at: string };
 let comments = $state<Comment[]>([]); let nextBefore = $state<number | null>(null);
 let saved = $state(false); let liked = $state(false); let busy = $state(false); let error = $state(''); let content = $state('');
 let editing = $state<number | null>(null); let draft = $state('');
 async function load(more = false) {
  const result = await api<{ comments: Comment[]; nextBefore: number | null }>(`/food/comments?id=${food.id}${more && nextBefore ? `&before=${nextBefore}` : ''}`);
  comments = more ? [...comments, ...result.comments] : result.comments; nextBefore = result.nextBefore;
 }
 onMount(() => { void (async () => { try { await load(); if (page.data.user) { liked = (await api<{ liked: boolean }>(`/food/like?id=${food.id}`)).liked; saved = (await api<{ saved: boolean }>(`/food/save?id=${food.id}`)).saved; } } catch(e) { error=(e as Error).message; } })(); });
 async function act(action: () => Promise<void>) { if(busy)return; busy=true;error='';try{await action();}catch(e){error=(e as Error).message;}finally{busy=false;} }
 async function like(){ await act(async()=>{const result=await api<{liked:boolean}>(`/food/like?id=${food.id}`,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({liked:!liked})});liked=result.liked;await invalidateAll();}); }
 async function save(){await act(async()=>{const result=await api<{saved:boolean}>(`/food/save?id=${food.id}`,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({saved:!saved})});saved=result.saved;});}
 async function write(e:SubmitEvent){e.preventDefault();await act(async()=>{await api(`/food/comments?id=${food.id}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({content})});content='';await load();});}
 async function change(id:number,method:'PUT'|'DELETE'){await act(async()=>{await api(`/food/comments?id=${food.id}&commentId=${id}`,{method,headers:{'content-type':'application/json'},...(method==='PUT'?{body:JSON.stringify({content:draft})}:{})});editing=null;await load();});}
</script>
<section>
 <p>작성자: {food.author ?? '요리위키'}</p>
 <button disabled={busy || !page.data.user} aria-pressed={liked} onclick={like}>{liked ? '♥ 좋아요 취소' : '♡ 좋아요'} · {food.likes ?? 0}</button>
 <button disabled={busy || !page.data.user} aria-pressed={saved} onclick={save}>{saved ? '저장 취소' : '레시피 저장'}</button>
 {#if !page.data.user}<p>좋아요와 댓글 작성은 로그인 후 이용할 수 있습니다.</p>{/if}
 <h2>댓글</h2>
 {#if page.data.user}<form onsubmit={write}><label>댓글 작성<textarea bind:value={content} required maxlength="2000" rows="3"></textarea></label><button disabled={busy}>등록</button></form>{/if}
 {#each comments as comment (comment.id)}<article><p><strong>{comment.author}</strong> · {comment.created_at}</p>
 {#if editing === comment.id}<label>댓글 수정<textarea bind:value={draft} maxlength="2000"></textarea></label><button disabled={busy || !draft.trim()} onclick={()=>change(comment.id,'PUT')}>저장</button><button onclick={()=>editing=null}>취소</button>{:else}<p class="content">{comment.content}</p>{/if}
 {#if page.data.user && (comment.author_id === page.data.user.id || isAdmin(page.data.user))}<button disabled={busy} onclick={()=>{editing=comment.id;draft=comment.content;}}>수정</button><button disabled={busy} onclick={()=>change(comment.id,'DELETE')}>삭제</button>{/if}
 </article>{:else}<p>아직 댓글이 없습니다.</p>{/each}
 {#if nextBefore}<button disabled={busy} onclick={()=>act(()=>load(true))}>댓글 더 보기</button>{/if}
 {#if error}<p role="alert">{error}</p>{/if}
</section>
<style>section{margin:24px 0}button{padding:9px 16px;margin:4px;background:var(--primary);border:0;border-radius:8px;cursor:pointer}textarea{display:block;width:100%;box-sizing:border-box;padding:12px;background:var(--surface);color:var(--text);border:1px solid var(--border);border-radius:8px;font:inherit}article{padding:12px 0;border-bottom:1px solid var(--border)}.content{white-space:pre-wrap;overflow-wrap:anywhere}</style>
