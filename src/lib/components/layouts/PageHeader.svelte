<script lang="ts">
    import type { Snippet } from 'svelte';
    import Breadcrumb from '$lib/components/layouts/Breadcrumb.svelte';

    interface BreadcrumbItem {
        label: string;
        href?: string;
    }

    interface ActionLink {
        label: string;
        href: string;
    }

    interface Props {
        // [기본 요소]
        title: string;
        lead?: string;
        breadcrumbs?: BreadcrumbItem[];

        // [우측 선택 요소]
        date?: string;           // YYYY-MM-DD 또는 YYYY.MM.DD 형식 지원
        dateLabel?: string;      // 예: '작성일', '시행일' (기본값: '일자')
        actionLink?: ActionLink; // 노란색 하이퍼링크 버튼 ({ label, href })
    }

    let {
        title,
        lead,
        breadcrumbs = [],
        date,
        dateLabel = '일자',
        actionLink
    }: Props = $props();

    // D+일수 계산 로직 ($derived)
    const dDayText = $derived.by(() => {
        if (!date) return null;
        
        // 날짜 문자열 파싱 (YYYY-MM-DD 또는 YYYY.MM.DD)
        const formattedDateStr = date.replace(/\./g, '-');
        const targetDate = new Date(formattedDateStr);
        if (isNaN(targetDate.getTime())) return null;

        const today = new Date();
        // 날짜 단위 비교를 위해 시간 제거
        today.setHours(0, 0, 0, 0);
        targetDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - targetDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0) {
            return `(D+${diffDays}일)`;
        } else {
            return `(D${diffDays}일)`; // 미래 날짜일 경우 (D-X일)
        }
    });

    // 우측 영역 렌더링 여부 자동 판별
    const hasRightContent = $derived(Boolean(date || actionLink));
</script>

<header class="document-header">
    <!-- 1. Breadcrumb (전달되었을 때만 출력) -->
    {#if breadcrumbs && breadcrumbs.length > 0}
        <div class="breadcrumb-container">
            <Breadcrumb items={breadcrumbs} />
        </div>
    {/if}

    <div class="header-main-layout">
        <!-- 2. 좌측 메인 영역 (제목, 설명글) -->
        <div class="header-content">
            <div class="title-row">
                <h1>{title}</h1>
            </div>

            {#if lead}
                <p class="lead">{lead}</p>
            {/if}
        </div>

        <!-- 3. 우측 선택 영역 (날짜, D+일수, 노란색 링크 버튼) -->
        {#if hasRightContent}
            <div class="header-right-meta">
                <!-- 날짜 및 D+일수 -->
                {#if date}
                    <div class="meta-data-group">
                        <div class="date-line">
                            {#if dateLabel}
                                <span>{dateLabel}:</span>
                            {/if}
                            <strong>{date}</strong>
                        </div>
                        {#if dDayText}
                            <span class="day-count">{dDayText}</span>
                        {/if}
                    </div>
                {/if}

                <!-- 노란색 하이퍼링크 버튼 -->
                {#if actionLink}
                    <div class="actions-group">
                        <a href={actionLink.href} class="action-btn yellow">
                            {actionLink.label}
                        </a>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</header>

<style>
    .document-header {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding-bottom: 28px;
        border-bottom: 1px solid var(--border, #e5e7eb);
        width: 100%;
    }

    .breadcrumb-container {
        margin-bottom: -4px;
    }

    .header-main-layout {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 40px;
        width: 100%;
    }

    /* 좌측 메인 영역 */
    .header-content {
        max-width: 680px;
        flex: 1;
        min-width: 0;
    }

    .title-row {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    h1 {
        margin: 0;
        font-size: 38px;
        font-weight: 750;
        letter-spacing: -0.075em;
        line-height: 1.25;
        color: var(--text, #111827);
        word-break: keep-all;
    }

    .lead {
        margin: 12px 0 0;
        color: var(--text-subtle, #4b5563);
        font-size: 14px;
        line-height: 1.85;
        letter-spacing: -0.015em;
        word-break: keep-all;
    }

    /* 우측 메타 영역 */
    .header-right-meta {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
        flex-shrink: 0;
        gap: 8px;
    }

    .meta-data-group {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
    }

    .date-line {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 5px;
        color: var(--text-muted, #6b7280);
        font-size: 11px;
        white-space: nowrap;
    }

    .date-line strong {
        color: var(--text, #111827);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0;
    }

    .day-count {
        display: block;
        color: var(--text-muted, #9ca3af);
        font-size: 11px;
        font-weight: 500;
        white-space: nowrap;
    }

    /* 노란색 버튼 그룹 */
    .actions-group {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 2px;
    }

    .action-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 34px;
        padding: 0 14px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.15s ease;
        border: 1px solid transparent;
        white-space: nowrap;
    }

    /* 노란색 테마 버튼 (CSS 변수 사용) */
    .action-btn.yellow {
        background: var(--primary);
        color: #0f172a;
    }

    .action-btn.yellow:hover {
        background: var(--accent);
        color: #fff;
    }

    /* 반응형 디자인 */
    @media (max-width: 700px) {
        .header-main-layout {
            align-items: flex-start;
            flex-direction: column;
            gap: 18px;
        }

        .header-content {
            max-width: none;
        }

        h1 {
            font-size: 31px;
        }

        .lead {
            font-size: 13px;
            line-height: 1.8;
        }

        .header-right-meta {
            align-items: flex-start;
            width: 100%;
        }

        .meta-data-group {
            align-items: flex-start;
        }

        .date-line {
            justify-content: flex-start;
        }

        .actions-group {
            width: 100%;
        }

        .action-btn {
            flex: 1;
        }
    }
</style>