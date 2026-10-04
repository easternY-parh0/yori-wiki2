<script lang="ts">
 import { page } from '$app/state';
 import { api } from '$lib/api';
 let email = $state(''); let message = $state(''); let busy = $state(false);
 async function register(e: SubmitEvent) { e.preventDefault(); busy=true; message=''; try { await api('/auth/admins', {method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({email})}); message=`${email} 계정을 Admin으로 등록했습니다.`; email=''; } catch(e) {message=(e as Error).message;} finally {busy=false;} }
</script>
<svelte:head><title>관리자 등록 | 요리위키</title></svelte:head>
<main><h1>관리자 등록</h1>
{#if page.data.user?.role === 'super_admin'}<p>가입된 계정의 이메일을 입력하면 Admin 권한을 부여합니다.</p><form onsubmit={register}><label>이메일 <input type="email" bind:value={email} required /></label><button disabled={busy}>{busy ? '등록 중…' : 'Admin 등록'}</button></form>{:else}<p>Super Admin만 이용할 수 있습니다.</p>{/if}
<p role="status">{message}</p></main>
<style>main{max-width:800px;margin:50px auto;padding:24px}input,button{padding:12px;border:1px solid var(--border);border-radius:8px;font:inherit}button{background:var(--primary);margin:12px;cursor:pointer}</style>
