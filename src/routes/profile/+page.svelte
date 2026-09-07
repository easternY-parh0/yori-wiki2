<script lang="ts">
	let activeTab = $state('내 레시피');

	const tabs = ['내 레시피', '좋아요', '북마크'];

	const recipes = [
		{ title: '플레이스홀더 레시피', category: '한식', date: '2026.08.24', status: '공개' },
		{ title: '플레이스홀더 레시피', category: '간단요리', date: '2026.08.19', status: '공개' },
		{ title: '플레이스홀더 레시피', category: '디저트', date: '2026.08.12', status: '공개' }
	];
</script>

<svelte:head>
	<title>마이페이지 | 요리위키</title>
	<meta name="description" content="요리위키 마이페이지" />
</svelte:head>

<div class="page">
	<main>
		<section class="profile-hero">
			<div class="profile-main">
				<div class="avatar">
					<span>U</span>
				</div>
				<div class="profile-info">
					<div class="name-row">
						<h1>사용자님</h1>
						<span class="member-badge">MEMBER</span>
					</div>
					<p>@placeholder · 가입일 2026.08.01</p>
					<div class="profile-stats">
						<div><strong>12</strong><span>레시피</span></div>
						<div><strong>24</strong><span>좋아요</span></div>
						<div><strong>8</strong><span>북마크</span></div>
					</div>
				</div>
			</div>
			<a href="/profile/edit" class="edit-button">
				<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" /></svg>
				프로필 수정
			</a>
		</section>

		<section class="quick-section">
			<a href="/recipes/new" class="quick-card primary">
				<div class="quick-icon">
					<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
				</div>
				<div>
					<strong>레시피 등록하기</strong>
					<span>나만의 요리를 요리위키에 공유해보세요.</span>
				</div>
				<svg class="quick-arrow" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
			</a>
			<a href="/profile/settings" class="quick-card">
				<div class="quick-icon">
					<svg viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19 13.5v-3l-2-.6a7.5 7.5 0 0 0-.7-1.7l.9-1.8-2.1-2.1-1.8.9a7.5 7.5 0 0 0-1.7-.7L11 2.5H9l-.6 2a7.5 7.5 0 0 0-1.7.7l-1.8-.9-2.1 2.1.9 1.8a7.5 7.5 0 0 0-.7 1.7l-2 .6v3l2 .6c.2.6.4 1.2.7 1.7l-.9 1.8 2.1 2.1 1.8-.9c.5.3 1.1.5 1.7.7l.6 2h2l.6-2c.6-.2 1.2-.4 1.7-.7l1.8.9 2.1-2.1-.9-1.8c.3-.5.5-1.1.7-1.7l2-.6z" /></svg>
				</div>
				<div>
					<strong>계정 관리</strong>
					<span>개인정보와 계정 설정을 관리합니다.</span>
				</div>
				<svg class="quick-arrow" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
			</a>
		</section>

		<section class="content-section">
			<div class="section-heading">
				<div>
					<span class="section-label">MY ACTIVITY</span>
					<h2>나의 활동</h2>
				</div>
			</div>

			<div class="tabs">
				{#each tabs as tab}
					<button class:active={activeTab === tab} type="button" onclick={() => (activeTab = tab)}>
						{tab}
						{#if tab === '내 레시피'}
							<span>12</span>
						{:else if tab === '좋아요'}
							<span>24</span>
						{:else}
							<span>8</span>
						{/if}
					</button>
				{/each}
			</div>

			{#if activeTab === '내 레시피'}
				<div class="recipe-list">
					{#each recipes as recipe}
						<a href="/recipes/placeholder" class="recipe-row">
							<div class="recipe-thumbnail">IMAGE</div>
							<div class="recipe-content">
								<div class="recipe-meta">
									<span>{recipe.category}</span>
									<small>{recipe.date}</small>
								</div>
								<h3>{recipe.title}</h3>
								<p>레시피 설명이 표시되는 영역입니다. 실제 등록한 레시피의 간단한 설명이 들어갑니다.</p>
							</div>
							<div class="recipe-status">{recipe.status}</div>
							<svg class="row-arrow" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
						</a>
					{/each}
				</div>
			{:else if activeTab === '좋아요'}
				<div class="empty-state">
					<div class="empty-icon">
						<svg viewBox="0 0 24 24"><path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 8.8 1.7z" /></svg>
					</div>
					<h3>좋아요한 레시피</h3>
					<p>좋아요를 누른 레시피가 이곳에 표시됩니다.</p>
				</div>
			{:else}
				<div class="empty-state">
					<div class="empty-icon">
						<svg viewBox="0 0 24 24"><path d="M6 4h12v16l-6-3-6 3z" /></svg>
					</div>
					<h3>북마크한 레시피</h3>
					<p>나중에 다시 보고 싶은 레시피를 저장해보세요.</p>
				</div>
			{/if}
		</section>

		<section class="account-section">
			<div class="account-card">
				<div class="account-card-header">
					<div>
						<span class="section-label">ACCOUNT</span>
						<h2>계정 정보</h2>
					</div>
					<a href="/settings">설정</a>
				</div>
				<div class="account-grid">
					<div>
						<span>이메일</span>
						<strong>placeholder@example.com</strong>
					</div>
					<div>
						<span>가입일</span>
						<strong>2026.08.01</strong>
					</div>
					<div>
						<span>최근 활동</span>
						<strong>2026.08.26</strong>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>

<style>
	:global(:root){--background:#fff;--surface:#fff;--surface-subtle:#f8fafc;--surface-yellow:#fefce8;--surface-green:#f7fee7;--primary:#facc15;--accent:#65a30d;--text:#0f172a;--text-subtle:#64748b;--text-muted:#94a3b8;--border:#e2e8f0;--overlay:rgba(15,23,42,.25)}
	:global(:root.dark-theme){--background:#0f172a;--surface:#1e293b;--surface-subtle:#172235;--surface-yellow:#292614;--surface-green:#172414;--primary:#facc15;--accent:#84cc16;--text:#f8fafc;--text-subtle:#94a3b8;--text-muted:#94a3b8;--border:#334155;--overlay:rgba(2,6,23,.72);color-scheme:dark}
	:global(*){box-sizing:border-box}
	:global(body){margin:0;background:var(--background);color:var(--text)}
	:global(a){color:inherit;text-decoration:none}
	button{font:inherit}
	svg{fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
	.page{min-height:100vh;background:var(--background)}
	main{width:min(1080px,100%);margin:0 auto;padding:52px 24px 100px}
	.profile-hero{display:flex;align-items:center;justify-content:space-between;padding-bottom:38px;border-bottom:1px solid var(--border)}
	.profile-main{display:flex;align-items:center;gap:22px}
	.avatar{width:86px;height:86px;display:grid;place-items:center;flex-shrink:0;border-radius:50%;background:var(--primary);color:#0f172a;font-size:28px;font-weight:800}
	.profile-info h1{margin:0;font-size:27px;letter-spacing:-.06em}
	.name-row{display:flex;align-items:center;gap:9px}
	.member-badge{padding:4px 7px;border-radius:5px;background:var(--surface-green);color:var(--accent);font-size:6px;font-weight:800;letter-spacing:.08em}
	.profile-info>p{margin:7px 0 16px;color:var(--text-muted);font-size:9px}
	.profile-stats{display:flex;gap:23px}
	.profile-stats div{display:flex;align-items:baseline;gap:5px}
	.profile-stats strong{font-size:13px}
	.profile-stats span{color:var(--text-muted);font-size:8px}
	.edit-button{display:flex;align-items:center;gap:7px;padding:9px 13px;border:1px solid var(--border);border-radius:9px;background:var(--surface);font-size:9px;font-weight:650}
	.edit-button:hover{border-color:var(--primary);background:var(--surface-yellow)}
	.edit-button svg{width:14px;height:14px}
	.quick-section{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin:30px 0 60px}
	.quick-card{display:flex;align-items:center;gap:12px;padding:17px;border:1px solid var(--border);border-radius:14px;background:var(--surface);transition:transform .18s,border-color .18s}
	.quick-card:hover{transform:translateY(-2px);border-color:var(--primary)}
	.quick-card.primary{background:var(--surface-yellow);border-color:var(--primary)}
	.quick-icon{width:37px;height:37px;display:grid;place-items:center;flex-shrink:0;border-radius:10px;background:var(--surface-subtle);color:var(--accent)}
	.quick-card.primary .quick-icon{background:var(--primary);color:#0f172a}
	.quick-icon svg{width:19px;height:19px}
	.quick-card div:nth-child(2){min-width:0;flex:1}
	.quick-card strong,.quick-card span{display:block}
	.quick-card strong{font-size:11px}
	.quick-card span{margin-top:4px;color:var(--text-muted);font-size:8px}
	.quick-arrow{width:15px;height:15px;color:var(--text-muted)}
	.section-heading{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:18px}
	.section-label{color:var(--accent);font-size:8px;font-weight:800;letter-spacing:.1em}
	.section-heading h2{margin:6px 0 0;font-size:19px;letter-spacing:-.055em}
	.tabs{display:flex;gap:3px;border-bottom:1px solid var(--border);margin-bottom:14px}
	.tabs button{position:relative;padding:11px 14px;border:0;background:transparent;color:var(--text-muted);font-size:9px;font-weight:650;cursor:pointer}
	.tabs button.active{color:var(--text)}
	.tabs button.active:after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:2px;background:var(--primary);border-radius:99px}
	.tabs span{margin-left:4px;color:var(--text-muted);font-size:7px}
	.recipe-list{border-top:1px solid var(--border)}
	.recipe-row{display:flex;align-items:center;gap:15px;padding:15px 4px;border-bottom:1px solid var(--border)}
	.recipe-row:hover{background:var(--surface-yellow)}
	.recipe-thumbnail{width:94px;height:70px;display:grid;place-items:center;flex-shrink:0;border-radius:9px;background:var(--surface-subtle);color:var(--text-muted);font-size:7px}
	.recipe-content{min-width:0;flex:1}
	.recipe-meta{display:flex;gap:8px;align-items:center}
	.recipe-meta span{color:var(--accent);font-size:7px;font-weight:700}
	.recipe-meta small{color:var(--text-muted);font-size:7px}
	.recipe-content h3{margin:5px 0;font-size:12px}
	.recipe-content p{margin:0;color:var(--text-muted);font-size:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
	.recipe-status{padding:5px 7px;border-radius:5px;background:var(--surface-green);color:var(--accent);font-size:6px;font-weight:700}
	.row-arrow{width:14px;height:14px;color:var(--text-muted)}
	.empty-state{padding:55px 20px;border:1px dashed var(--border);border-radius:13px;text-align:center}
	.empty-icon{width:42px;height:42px;display:grid;place-items:center;margin:0 auto 12px;border-radius:12px;background:var(--surface-yellow);color:var(--accent)}
	.empty-icon svg{width:20px;height:20px}
	.empty-state h3{margin:0 0 6px;font-size:12px}
	.empty-state p{margin:0;color:var(--text-muted);font-size:8px}
	.account-section{margin-top:58px}
	.account-card{padding:22px;border:1px solid var(--border);border-radius:14px;background:var(--surface)}
	.account-card-header{display:flex;align-items:flex-end;justify-content:space-between;padding-bottom:17px;border-bottom:1px solid var(--border)}
	.account-card-header h2{margin:6px 0 0;font-size:17px}
	.account-card-header>a{color:var(--accent);font-size:8px;font-weight:700}
	.account-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding-top:18px}
	.account-grid span,.account-grid strong{display:block}
	.account-grid span{margin-bottom:6px;color:var(--text-muted);font-size:7px}
	.account-grid strong{font-size:9px}
	@media(max-width:700px){main{padding-top:35px}.profile-hero{align-items:flex-start;gap:20px}.profile-main{gap:15px}.avatar{width:68px;height:68px;font-size:22px}.profile-info h1{font-size:22px}.edit-button{font-size:0;padding:10px}.edit-button svg{width:17px;height:17px}.quick-section{grid-template-columns:1fr}.account-grid{grid-template-columns:1fr 1fr}}
	@media(max-width:520px){.profile-hero{display:block}.edit-button{display:flex;width:max-content;margin-top:20px;font-size:9px}.recipe-status{display:none}.recipe-thumbnail{width:78px;height:62px}.recipe-content p{display:none}.account-grid{grid-template-columns:1fr}}
</style>