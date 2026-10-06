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
</script>

<a href={href} class="recipe">
    <div class="recipe-image">
        <img src={image || noRecipeImg} alt={title} />
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
            <span>좋아요 {views}</span>
        </div>
    </div>
</a>

<style>
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

    .recipe-info {
        padding: 16px;
    }

    .tag {
        display: inline-block;
        color: var(--accent);
        font-size: 11px;
        font-weight: 750;
    }

    .recipe h3 {
        margin: 6px 0 8px;
        font-size: 17px;
        font-weight: 700;
        line-height: 1.3;
        letter-spacing: -.03em;
    }

    .recipe p {
        margin: 0 0 14px;
        color: var(--text-subtle);
        font-size: 13px;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .recipe-meta {
        display: flex;
        justify-content: space-between;
        padding-top: 12px;
        border-top: 1px solid var(--border);
        color: var(--text-subtle);
        font-size: 12px;
    }
</style>