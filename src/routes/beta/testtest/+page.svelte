<script lang="ts">
    import DocumentHeader from '$lib/components/layouts/PageHeader.svelte';

    // 테스트용 Breadcrumb 데이터
    const sampleBreadcrumbs = [
        { label: '홈', href: '/' },
        { label: '게시판', href: '/board' },
        { label: '상세보기' }
    ];
</script>

<div class="test-container">
    <h2>1. 전체 요소 포함 (제목 + 리드문 + Breadcrumb + 날짜/D-Day + 노란색 버튼)</h2>
    <DocumentHeader 
        title="시스템 점검 안내"
        lead="더 나은 서비스를 제공하기 위해 정기 시스템 점검을 실시합니다. 점검 시간 동안 서비스 이용이 제한될 수 있습니다."
        breadcrumbs={sampleBreadcrumbs}
        date="2026-09-01"
        dateLabel="시행일"
        actionLink={{ label: '점검 일정 상세보기', href: '#details' }}
    />

    <hr />

    <h2>2. 날짜 및 D-Day만 포함 (미래 날짜 입력 시 D-일수 테스트)</h2>
    <DocumentHeader 
        title="프로젝트 릴리즈 공지"
        lead="새로운 2.0 버전 출시 관련 주요 변경 사항입니다."
        breadcrumbs={sampleBreadcrumbs}
        date="2026-10-01"
        dateLabel="출시 예정일"
    />

    <hr />

    <h2>3. 노란색 버튼만 포함 (날짜 없음)</h2>
    <DocumentHeader 
        title="이용약관 개정 안내"
        lead="개인정보 처리방침 및 이용약관 개정 내용에 대해 안내해 드립니다."
        actionLink={{ label: '개정안 다운로드', href: '#download' }}
    />

    <hr />

    <h2>4. 최소한의 기본 정보만 포함 (제목 + 리드문만)</h2>
    <DocumentHeader 
        title="자주 묻는 질문 (FAQ)"
        lead="서비스 이용과 관련하여 자주 묻는 질문들을 확인해 보세요."
    />
</div>

<style>
    .test-container {
        width: 1160px;
        margin: 40px auto;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        gap: 40px;
        font-family: sans-serif;
    }

    h2 {
        font-size: 16px;
        color: #4b5563;
        margin-bottom: -16px;
    }

    hr {
        border: none;
        border-top: 1px dashed #e5e7eb;
        width: 100%;
        margin: 0;
    }
</style>