<script lang="ts">
 import { page } from '$app/state';
 import { goto, invalidateAll } from '$app/navigation';
 import { api, uploadRecipeImage, type Food } from '$lib/api';
 import { isAdmin } from '$lib/auth';
 import { appPath } from '$lib/app-path';
 let { food }: { food: Food } = $props();
 let editing=$state(false); let ingredients=$state(''); let recipe=$state(''); let time=$state(''); let busy=$state(false); let error=$state('');
 let allowed=$derived(!!page.data.user && (isAdmin(page.data.user) || food.author_id === page.data.user.id));
 async function imageChanged(e: Event){const file=(e.currentTarget as HTMLInputElement).files?.[0];if(!file)return;busy=true;error='';try{await uploadRecipeImage(food.id,file);await invalidateAll();}catch(e){error=(e as Error).message;}finally{busy=false;}}
 async function clearImage(){busy=true;error='';try{await api(`/food/image?id=${food.id}`,{method:'DELETE',headers:{'content-type':'application/json'}});await invalidateAll();}catch(e){error=(e as Error).message;}finally{busy=false;}}
 function edit(){ingredients=food.ingredients;recipe=food.recipe;time=food.estimated_time;editing=true;}
 async function save(e:SubmitEvent){e.preventDefault();busy=true;error='';try{await api(`/food?id=${food.id}`,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({ingredients,recipe,estimated_time:time})});editing=false;await invalidateAll();}catch(e){error=(e as Error).message;}finally{busy=false;}}
 async function remove(){if(!confirm('이 레시피를 삭제하시겠습니까?'))return;busy=true;error='';try{await api(`/food?name=${encodeURIComponent(food.name)}`,{method:'DELETE',headers:{'content-type':'application/json'}});await goto(appPath('/recipes'));}catch(e){error=(e as Error).message;}finally{busy=false;}}
</script>
{#if allowed}<section><button onclick={edit} disabled={busy}>수정</button> <button onclick={remove} disabled={busy}>삭제</button>
<label>대표 이미지 변경<input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onchange={imageChanged} /></label><button disabled={busy} onclick={clearImage}>대표 이미지 삭제</button>
{#if editing}<form onsubmit={save}><label>재료<textarea bind:value={ingredients} required rows="5"></textarea></label><label>조리 방법<textarea bind:value={recipe} required rows="10"></textarea></label><label>조리 시간<input bind:value={time} required /></label><button disabled={busy}>저장</button> <button type="button" onclick={()=>editing=false}>취소</button></form>{/if}<p role="alert">{error}</p></section>{/if}
<style>section{margin:20px 0}button{padding:9px 16px;background:var(--primary);border:0;border-radius:8px;cursor:pointer}label{display:block;margin:12px 0}textarea,input{display:block;box-sizing:border-box;width:100%;padding:12px;background:var(--surface);color:var(--text);border:1px solid var(--border);border-radius:8px;font:inherit}</style>
