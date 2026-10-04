<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { api } from '$lib/api';
  import { isAdmin } from '$lib/auth';
  import { appPath } from '$lib/app-path';
  import { renderMarkdown } from '$lib/markdown';
  import RoleBadge from './RoleBadge.svelte';
  let { kind, writing = false }: { kind: 'community' | 'notice'; writing?: boolean } = $props();
  type Post = { id:number; title:string; content:string; category:string; author:string; author_role:string; created_at:string };
  let posts = $state<Post[]>([]);
  let loading = $state(true);
  let error = $state('');
  let query = $state('');
  let category = $state('');
  let title = $state('');
  let content = $state('');
  let saving = $state(false);
  let composing = $state(false);
  $effect(() => { composing = writing; });
  let selected = $state<number | null>(null);
  let categories = $derived(kind === 'notice' ? ['서비스', '업데이트', '이벤트', '안내'] : ['요리 이야기', '레시피 질문', '요리 팁', '자유 이야기']);
  let allowed = $derived(kind === 'notice' ? isAdmin(page.data.user) : !!page.data.user);
  let filtered = $derived(posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase())));
  async function reload() {
    loading = true;
    try { posts = await api<Post[]>(`/posts?kind=${kind}`); }
    catch (e) { error = (e as Error).message; }
    finally { loading = false; }
  }
  onMount(reload);
  async function submit(event: SubmitEvent) {
    event.preventDefault(); if (saving) return;
    saving = true; error = '';
    try {
      const result = await api<{id:number}>('/posts', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({kind, category:category || categories[0], title, content}) });
      title = ''; content = ''; composing = false; selected = result.id; await reload();
    } catch(e) { error = (e as Error).message; }
    finally { saving = false; }
  }
</script>
<svelte:head><title>{kind === 'notice' ? '공지사항' : '커뮤니티'} | 요리위키</title></svelte:head>
<main>
  <header><div><h1>{kind === 'notice' ? '공지사항' : '커뮤니티'}</h1><p>{kind === 'notice' ? '요리위키의 새로운 소식과 안내입니다.' : '요리에 대한 질문과 경험을 함께 나눠보세요.'}</p></div>
    {#if allowed}<button onclick={() => composing = !composing}>{composing ? '목록 보기' : '글쓰기'}</button>{/if}
  </header>
  {#if error}<p role="alert">{error}</p>{/if}
  {#if composing && allowed}
    <form onsubmit={submit}>
      <label>분류<select bind:value={category}>{#each categories as c}<option value={c}>{c}</option>{/each}</select></label>
      <label>제목<input bind:value={title} required maxlength="200" /></label>
      <label>내용 (마크다운)<textarea bind:value={content} required maxlength="50000" rows="14" placeholder="# 제목&#10;**강조**, 목록, 링크를 작성해보세요."></textarea></label>
      <h2>미리보기</h2><div class="markdown">{@html renderMarkdown(content)}</div>
      <button disabled={saving}>{saving ? '등록 중…' : '등록하기'}</button>
    </form>
  {:else}
    {#if !page.data.user}<p><a href={appPath('/login')}>로그인</a> 후 글을 작성할 수 있습니다.</p>{:else if writing && !allowed}<p>관리자만 공지사항을 작성할 수 있습니다.</p>{/if}
    <input type="search" aria-label="게시글 제목 검색" placeholder="게시글 제목 검색" bind:value={query} />
    {#if loading}<p>불러오는 중…</p>{:else}
      <p>총 {filtered.length}개의 글</p>
      {#each filtered as post}
        <article>
          <button class="post" aria-expanded={selected === post.id} onclick={() => selected = selected === post.id ? null : post.id}><small>{post.category}</small><h2>{post.title}</h2><span>{post.author} <RoleBadge role={post.author_role} /> · {post.created_at}</span></button>
          {#if selected === post.id}<div class="markdown">{@html renderMarkdown(post.content)}</div>{/if}
        </article>
      {:else}<p>등록된 글이 없습니다.</p>{/each}
    {/if}
  {/if}
</main>
<style>
 main{max-width:1000px;margin:40px auto;padding:24px;color:var(--text)} header{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:32px}h1{font-size:32px}p,small{color:var(--text-subtle)}button{cursor:pointer;border:0;border-radius:9px;background:var(--primary);color:#0f172a;padding:12px 18px;font:inherit}button:disabled{opacity:.5}label{display:block;margin:18px 0}input,textarea,select{display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:12px;border:1px solid var(--border);border-radius:9px;background:var(--surface);color:var(--text);font:inherit}article{border-bottom:1px solid var(--border)}.post{width:100%;text-align:left;background:transparent;color:var(--text);padding:22px 0}.post h2{font-size:19px;margin:8px 0}.post span{font-size:13px}.markdown{padding:20px;background:var(--surface-subtle);border-radius:12px;line-height:1.8;overflow-wrap:anywhere;margin-bottom:20px}.markdown :global(a){color:var(--accent);text-decoration:underline}.markdown :global(blockquote){border-left:3px solid var(--accent);padding-left:15px}a{color:var(--accent)}
</style>
