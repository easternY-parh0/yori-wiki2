<script lang="ts">
    import { appPath } from '$lib/app-path';
    import noRecipeImg from '$lib/assets/image/no-image.png';

    interface Props {
        id?: number;
        title: string;
        description?: string;
        image?: string;
        category?: string;
        cookingTime?: string;
        views?: number;
        href?: string;
    }

    let {
        title,
        description = '레시피 설명이 들어가는 영역입니다.',
        image = noRecipeImg,
        category = '한식',
        cookingTime = '30분',
        views = 0,
        href = appPath('/recipes/example')
    }: Props = $props();

    function handleBookmark(event: MouseEvent) {
        event.preventDefault();
        // 즐겨찾기 로직 구현 위치
    }
</script>

<a href={href} class="recipe">
    <div class="recipe-image">
        <img src={image || noRecipeImg} alt={title} />
        <button 
            class="bookmark" 
            type="button" 
            aria-label="즐겨찾기" 
            onclick={handleBookmark}
        >
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 4h12v17l-6-4-6 4z" />
            </svg>
        </button>
    </div>

    <div class="recipe-info">
        {#if category}
            <span class="tag">{category}</span>
        {/if}
        <h3>{title}</h3>
        {#if description}
            <p>{description}</p>
        {/if}
        <div class="recipe-meta">
            <span>조리시간 {cookingTime}</span>
            <span>조회 {views}</span>
        </div>
    </div>
</a>

<style>
    svg {
        fill: none;
        stroke: currentColor;
        stroke-width: 1.7;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .recipe {
        display: block;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 17px;
        background: var(--surface);
        text-decoration: none;
        color: inherit;
        transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
    }

    .recipe:hover {
        transform: translateY(-3px);
        border-color: var(--primary);
        box-shadow: 0 12px 25px var(--shadow-card);
    }

    .recipe-image {
        position: relative;
        height: 180px;
        background: var(--surface-yellow);
        overflow: hidden;
    }

    .recipe-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .bookmark {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        border: 1px solid var(--border);
        border-radius: 50%;
        background: var(--surface);
        color: var(--text);
        cursor: pointer;
    }

    .bookmark:hover {
        background: var(--primary);
        color: #0f172a;
    }

    .bookmark svg {
        width: 15px;
        height: 15px;
    }

    .recipe-info {
        padding: 14px;
    }

    .tag {
        color: var(--accent);
        font-size: 8px;
        font-weight: 750;
    }

    .recipe h3 {
        margin: 6px 0;
        font-size: 15px;
        letter-spacing: -.04em;
    }

    .recipe p {
        margin: 0 0 13px;
        color: var(--text-subtle);
        font-size: 9px;
    }

    .recipe-meta {
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
        border-top: 1px solid var(--border);
        color: var(--text-subtle);
        font-size: 8px;
    }
</style>