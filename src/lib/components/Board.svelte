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
  let activeCategory = $state('전체');

  let allowed = $derived(kind === 'notice' ? isAdmin(page.data.user) : !!page.data.user);
  
  let filtered = $derived(
    posts.filter(p => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === '전체' || p.category === activeCategory;
      return matchesQuery && matchesCategory;
    })
  );

  async function reload() {
    loading = true;
    try { 
      posts = await api<Post[]>(`/posts?kind=${kind}`); 
    } catch (e) { 
      error = (e as Error).message; 
    } finally { 
      loading = false; 
    }
  }

  onMount(reload);

  async function submit(event: SubmitEvent) {
    event.preventDefault(); 
    if (saving) return;
    saving = true; 
    error = '';
    try {
      const result = await api<{id:number}>('/posts', { 
        method:'POST', 
        headers:{'content-type':'application/json'}, 
        body:JSON.stringify({kind, category: category || categories[0], title, content}) 
      });
      title = ''; 
      content = ''; 
      composing = false; 
      selected = result.id; 
      await reload();
    } catch(e) { 
      error = (e as Error).message; 
    } finally { 
      saving = false; 
    }
  }
</script>

<div class="board-container">
  {#if allowed}
    <div class="action-bar">
      <button class="write-button" onclick={() => composing = !composing}>
        <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
        {composing ? '목록 보기' : '글쓰기'}
      </button>
    </div>
  {/if}

  {#if error}
    <p role="alert" class="error-message">{error}</p>
  {/if}

  {#if composing && allowed}
    <form class="write-form" onsubmit={submit}>
      <label>
        분류
        <select bind:value={category}>
          {#each categories as c}
            <option value={c}>{c}</option>
          {/each}
        </select>
      </label>

      <label>
        제목
        <input bind:value={title} required maxlength="200" placeholder="제목을 입력하세요." />
      </label>

      <label>
        내용 (마크다운)
        <textarea bind:value={content} required maxlength="50000" rows="14" placeholder="# 제목&#10;**강조**, 목록, 링크를 작성해보세요."></textarea>
      </label>

      <h2>미리보기</h2>
      <div class="markdown">{@html renderMarkdown(content)}</div>

      <button class="primary-button" disabled={saving}>
        {saving ? '등록 중…' : '등록하기'}
      </button>
    </form>
  {:else}
    {#if !page.data.user}
      <p class="auth-notice"><a href={appPath('/login')}>로그인</a> 후 글을 작성할 수 있습니다.</p>
    {:else if writing && !allowed}
      <p class="auth-notice">관리자만 공지사항을 작성할 수 있습니다.</p>
    {/if}

    <div class="toolbar">
      <div class="category-list">
        <button
          type="button"
          class:active={activeCategory === '전체'}
          onclick={() => activeCategory = '전체'}
        >
          전체
        </button>
        {#each categories as cat}
          <button
            type="button"
            class:active={activeCategory === cat}
            onclick={() => activeCategory = cat}
          >
            {cat}
          </button>
        {/each}
      </div>

      <div class="search-box">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
        <input type="search" aria-label="게시글 제목 검색" placeholder="게시글 제목 검색" bind:value={query} />
        {#if query}
          <button
            class="clear-button"
            type="button"
            aria-label="검색어 지우기"
            onclick={() => query = ''}
          >
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        {/if}
      </div>
    </div>

    {#if loading}
      <p class="loading-state">불러오는 중…</p>
    {:else}
      <section class="post-section">
        <div class="post-toolbar">
          <div class="section-heading">
            <h2>전체 게시글 <span>({filtered.length})</span></h2>
          </div>
        </div>

        <div class="post-table">
          <div class="table-head">
            <span>카테고리</span>
            <span>제목</span>
            <span>작성자</span>
            <span>작성일</span>
          </div>

          {#each filtered as post}
            <article class="post-article">
              <button 
                type="button"
                class="post-row" 
                aria-expanded={selected === post.id} 
                onclick={() => selected = selected === post.id ? null : post.id}
              >
                <span class="post-category">{post.category}</span>
                <div class="post-title">
                  <strong>{post.title}</strong>
                </div>
                <span class="author">
                  {post.author} <RoleBadge role={post.author_role} />
                </span>
                <span class="meta">{post.created_at}</span>
              </button>
              
              {#if selected === post.id}
                <div class="markdown">
                  {@html renderMarkdown(post.content)}
                </div>
              {/if}
            </article>
          {:else}
            <p class="empty-state">등록된 글이 없습니다.</p>
          {/each}
        </div>
      </section>
    {/if}
  {/if}
</div>

<style>
  .board-container {
    width: 100%;
    color: var(--text);
  }

  .action-bar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }

  .write-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 7px;
    border: 0;
    background: var(--primary);
    color: #0f172a;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .write-button:hover {
    background: var(--accent);
    color: #fff;
  }

  .write-button svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.5;
  }

  .auth-notice {
    margin: 16px 0;
    color: var(--text-muted);
    font-size: 13px;
  }

  .auth-notice a {
    color: var(--accent);
    text-decoration: underline;
  }

  .error-message {
    padding: 12px 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    font-size: 13px;
  }

  /* Toolbar & Search */
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 28px;
  }

  .category-list {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .category-list::-webkit-scrollbar {
    display: none;
  }

  .category-list button {
    flex-shrink: 0;
    padding: 7px 14px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: transparent;
    color: var(--text-muted);
    font: inherit;
    font-size: 12px;
    font-weight: 650;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }

  .category-list button:hover {
    border-color: var(--accent);
    color: var(--text);
  }

  .category-list button.active {
    border-color: var(--accent);
    background: var(--surface-yellow);
    color: var(--accent);
    font-weight: 700;
  }

  .search-box {
    width: 230px;
    height: 36px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    padding: 0 10px;
    border: 1px solid var(--border);
    border-radius: 7px;
    background: transparent;
    transition: border-color 0.15s ease;
  }

  .search-box:focus-within {
    border-color: var(--accent);
  }

  .search-box > svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: var(--text-muted);
    stroke-width: 2;
    fill: none;
    stroke: currentColor;
  }

  .search-box input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--text);
    font: inherit;
    font-size: 12px;
  }

  .search-box input::placeholder {
    color: var(--text-muted);
  }

  .clear-button {
    width: 18px;
    height: 18px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border: 0;
    border-radius: 50%;
    background: var(--surface-subtle);
    color: var(--text-muted);
    cursor: pointer;
  }

  .clear-button svg {
    width: 10px;
    height: 10px;
    stroke-width: 2;
    fill: none;
    stroke: currentColor;
  }

  /* Post Section & Table */
  .post-section {
    margin-bottom: 38px;
  }

  .post-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 16px;
  }

  .section-heading h2 {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text);
  }

  .section-heading h2 span {
    color: var(--text-muted);
    font-weight: 500;
  }

  .post-table {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .table-head {
    display: grid;
    grid-template-columns: 110px 1fr 140px 100px;
    gap: 12px;
    padding: 8px 16px;
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 650;
    border-bottom: 1px solid var(--border);
  }

  .post-article {
    border-bottom: 1px solid var(--border);
  }

  .post-row {
    width: 100%;
    display: grid;
    grid-template-columns: 110px 1fr 140px 100px;
    gap: 12px;
    align-items: center;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: transparent;
    text-align: left;
    color: var(--text);
    cursor: pointer;
    font: inherit;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .post-row:hover {
    border-color: var(--accent);
    background: var(--surface-subtle);
  }

  .post-category {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    border: 1px solid var(--border);
    border-radius: 5px;
    background: var(--surface-subtle);
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 600;
    width: fit-content;
  }

  .post-title strong {
    font-size: 13px;
    font-weight: 650;
    color: var(--text);
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .post-row .author {
    font-size: 12px;
    color: var(--text);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .post-row .meta {
    font-size: 12px;
    color: var(--text-muted);
  }

  /* Form & Markdown */
  .write-form {
    margin-top: 16px;
  }

  .write-form label {
    display: block;
    margin: 18px 0;
    font-size: 13px;
    font-weight: 600;
  }

  .write-form input,
  .write-form textarea,
  .write-form select {
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-top: 8px;
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 99px;
    border-radius: 9px;
    background: var(--surface);
    color: var(--text);
    font: inherit;
    font-size: 13px;
  }

  .write-form h2 {
    font-size: 16px;
    margin-top: 24px;
    margin-bottom: 8px;
  }

  .markdown {
    padding: 20px;
    background: var(--surface-subtle);
    border-radius: 12px;
    line-height: 1.8;
    overflow-wrap: anywhere;
    margin: 12px 0 20px;
  }

  .markdown :global(a) {
    color: var(--accent);
    text-decoration: underline;
  }

  .markdown :global(blockquote) {
    border-left: 3px solid var(--accent);
    padding-left: 15px;
    margin: 0;
  }

  .primary-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 7px;
    padding: 10px 18px;
    border: 1px solid var(--primary);
    background: var(--primary);
    color: #0f172a;
    font: inherit;
    font-size: 12px;
    font-weight: 650;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }

  .primary-button:hover:not(:disabled) {
    border-color: var(--accent);
    background: var(--accent);
    color: #fff;
  }

  .primary-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .loading-state,
  .empty-state {
    padding: 32px 0;
    text-align: center;
    color: var(--text-muted);
    font-size: 13px;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .table-head {
      display: none;
    }

    .post-row {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .post-row .author,
    .post-row .meta {
      display: inline-flex;
      margin-right: 8px;
    }
  }

  @media (max-width: 760px) {
    .toolbar {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    .search-box {
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>