<script lang="ts">
    import { appPath } from '$lib/app-path';
</script>

<svelte:head>
    <title>자취생용 혼밥 추천 | 요리위키</title>
    <meta
        name="description"
        content="적은 재료로 빠르고 맛있게 만드는 자취생 혼밥 메뉴를 소개합니다."
    />
</svelte:head>

<main class="article-page">
    <article class="article">
        <!-- 상단 네비게이션 -->
        <div class="top-bar">
            <a href={appPath('/beta')} class="back-link">
                ← 요리위키 홈
            </a>
            <span>오늘의 혼밥</span>
        </div>

        <!-- 히어로 섹션 -->
        <header class="hero">
            <div class="hero-text">
                <span class="badge">SOLO · COOKING</span>
                <h1>
                    오늘 뭐 먹지?<br />
                    <span>자취생용 혼밥 추천</span>
                </h1>
                <p>
                    적은 재료, 적은 설거지, 충분한 만족감.<br />
                    냉장고 속 평범한 재료로 오늘의 한 끼를 만들어보자.
                </p>
            </div>
            <div class="hero-icon" aria-hidden="true">
                🍳
            </div>
        </header>

        <!-- 도입부 -->
        <section class="intro">
            <p>
                혼자 먹는 한 끼라고 해서 대충 먹어야 할 이유는 없다.
                오히려 혼밥의 장점은 내가 먹고 싶은 것을 원하는 만큼
                만들 수 있다는 것이다.
            </p>
            <p>
                문제는 시간과 설거지, 그리고 냉장고 사정이다.
                그래서 혼밥에서 가장 중요한 것은 화려함보다
                <strong>적은 재료로 빠르게 만들면서 만족스러운가</strong>이다.
            </p>
        </section>

        <!-- 섹션 01 -->
        <section>
            <div class="section-title">
                <span>01</span>
                <h2>혼밥의 기본 공식</h2>
            </div>

            <p>
                복잡한 레시피가 없어도 세 가지만 갖추면 한 끼의 형태가 만들어진다.
            </p>

            <div class="formula">
                <div>
                    <span>🍚</span>
                    <strong>탄수화물</strong>
                    <small>밥 · 면 · 빵 · 감자</small>
                </div>
                <b>+</b>
                <div>
                    <span>🥚</span>
                    <strong>단백질</strong>
                    <small>달걀 · 두부 · 참치</small>
                </div>
                <b>+</b>
                <div>
                    <span>🥄</span>
                    <strong>양념</strong>
                    <small>간장 · 고추장 · 된장</small>
                </div>
            </div>

            <p>
                새로운 재료를 계속 사기보다 익숙한 재료의 조합을 바꾸는 것이
                자취 요리에서는 훨씬 중요하다.
            </p>
        </section>

        <!-- 섹션 02 -->
        <section>
            <div class="section-title">
                <span>02</span>
                <h2>오늘 바로 만들 수 있는 혼밥 5가지</h2>
            </div>

            <div class="recipe-grid">
                <div class="recipe-card">
                    <div class="recipe-emoji">🍳</div>
                    <h3>김치볶음밥</h3>
                    <p>
                        잘 익은 김치를 먼저 충분히 볶은 뒤 밥을 넣는다.
                        신맛은 줄고 단맛과 감칠맛은 더 살아난다.
                    </p>
                    <div class="recipe-tip">
                        💡 달걀프라이 + 김가루를 더하면 완성.
                    </div>
                </div>

                <div class="recipe-card">
                    <div class="recipe-emoji">🥚</div>
                    <h3>달걀덮밥</h3>
                    <p>
                        양파와 간장으로 간단한 소스를 만든 뒤 달걀을
                        부드럽게 익혀 밥 위에 올리면 된다.
                    </p>
                    <div class="recipe-tip">
                        💡 팬 하나로 해결하고 싶은 날 추천.
                    </div>
                </div>

                <div class="recipe-card">
                    <div class="recipe-emoji">🍜</div>
                    <h3>조금 특별한 라면</h3>
                    <p>
                        대파를 먼저 볶아 향을 내거나 콩나물, 숙주,
                        달걀, 두부를 더하면 평범한 라면도 달라진다.
                    </p>
                    <div class="recipe-tip">
                        💡 추가 양념은 조금씩 넣는 것이 좋다.
                    </div>
                </div>

                <div class="recipe-card">
                    <div class="recipe-emoji">⬜</div>
                    <h3>두부조림</h3>
                    <p>
                        두부를 살짝 굽고 간장, 고춧가루, 파,
                        마늘을 섞은 양념을 넣어 졸이면 된다.
                    </p>
                    <div class="recipe-tip">
                        💡 남으면 다음 날 찌개로 활용하기도 좋다.
                    </div>
                </div>

                <div class="recipe-card full-width">
                    <div class="recipe-emoji">🧈</div>
                    <h3>간장버터밥</h3>
                    <p>
                        정말 아무것도 하기 싫은 날에는 따뜻한 밥에
                        버터와 간장만 있어도 한 끼가 된다.
                    </p>
                    <div class="recipe-tip">
                        💡 달걀 · 김가루 · 대파 중 하나만 더해보자.
                    </div>
                </div>
            </div>
        </section>

        <!-- 섹션 03 -->
        <section>
            <div class="section-title">
                <span>03</span>
                <h2>자취 냉장고의 기본 멤버</h2>
            </div>

            <p>
                매번 새로운 식재료를 살 필요는 없다. 활용도가 높은 재료를
                몇 가지 준비해두는 편이 훨씬 효율적이다.
            </p>

            <div class="pantry-grid">
                <div>
                    <span>🥚</span>
                    <strong>달걀</strong>
                    <small>볶음밥 · 라면 · 국</small>
                </div>
                <div>
                    <span>🌱</span>
                    <strong>대파</strong>
                    <small>볶음 · 국물 · 양념</small>
                </div>
                <div>
                    <span>🥬</span>
                    <strong>김치</strong>
                    <small>반찬 · 볶음밥 · 찌개</small>
                </div>
                <div>
                    <span>⬜</span>
                    <strong>두부</strong>
                    <small>조림 · 국 · 찌개</small>
                </div>
            </div>

            <div class="tip-box">
                <span>💡</span>
                <div>
                    <strong>기본 양념도 단순하게</strong>
                    <p>
                        간장, 고추장, 된장, 식초, 설탕, 참기름 정도만 있어도
                        상당히 많은 한식 혼밥을 만들 수 있다.
                    </p>
                </div>
            </div>
        </section>

        <!-- 섹션 04 -->
        <section>
            <div class="section-title">
                <span>04</span>
                <h2>남은 재료를 다음 요리로 연결하자</h2>
            </div>

            <p>
                자취 요리의 진짜 실력은 하나의 메뉴를 화려하게 만드는 것보다
                남은 재료를 다시 활용하는 데서 나온다.
            </p>

            <div class="flow">
                <div class="flow-item">
                    <strong>김치</strong>
                    <span class="arrow">→</span>
                    <p>김치볶음밥 → 김치찌개</p>
                </div>
                <div class="flow-item">
                    <strong>두부</strong>
                    <span class="arrow">→</span>
                    <p>두부조림 → 된장찌개</p>
                </div>
                <div class="flow-item">
                    <strong>대파</strong>
                    <span class="arrow">→</span>
                    <p>잘라서 냉동 → 필요할 때 바로 사용</p>
                </div>
            </div>

            <p>
                장보기 전에 “무엇을 사야 하지?”보다
                “지금 있는 것으로 무엇을 만들 수 있지?”라고 생각해보자.
            </p>
        </section>

        <!-- 섹션 05 -->
        <section>
            <div class="section-title">
                <span>05</span>
                <h2>간은 처음부터 세게 하지 말자</h2>
            </div>

            <div class="warning-box">
                <span>🥄</span>
                <div>
                    <strong>조금 넣고 맛보기</strong>
                    <p>
                        간장이나 고추장처럼 맛이 강한 양념은 처음부터
                        많이 넣지 말고 부족하면 추가하는 것이 안전하다.
                    </p>
                </div>
            </div>

            <p>
                특히 김치나 라면처럼 이미 간이 되어 있는 재료를 사용할
                때는 추가 양념을 더 조심스럽게 넣는 것이 좋다.
            </p>
        </section>

        <!-- 엔딩 섹션 -->
        <footer class="ending">
            <span>DINNER FOR ONE</span>
            <h2>
                혼자 먹는다고<br />
                아무렇게나 먹지 말자
            </h2>
            <p>
                달걀 하나, 김치 한 줌, 밥 한 공기만 있어도 요리는
                시작될 수 있다.
            </p>
            <strong>
                완벽한 레시피보다 중요한 것은<br />
                오늘의 나에게 가장 현실적인 한 끼다.
            </strong>
        </footer>

        <div class="bottom-nav">
            <a href={appPath('/beta')}>
                ← 요리위키 홈으로 돌아가기
            </a>
        </div>
    </article>
</main>

<style>
    .article-page {
        min-height: 100vh;
        padding: 32px 20px 90px;
        background: var(--background);
        color: var(--text);
    }

    .article {
        width: min(840px, 100%);
        margin: 0 auto;
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        font-size: 12px;
    }

    .top-bar span {
        font-weight: 700;
        color: var(--text-subtle);
    }

    .back-link {
        color: var(--accent);
        font-weight: 700;
        text-decoration: none;
        transition: opacity 0.18s ease;
    }

    .back-link:hover {
        opacity: 0.8;
    }

    /* 히어로 섹션 */
    .hero {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
        padding: 48px 42px;
        border: 1px solid var(--border);
        border-radius: 24px;
        background: var(--surface-yellow);
    }

    .hero-text {
        max-width: 580px;
    }

    .badge {
        display: inline-block;
        margin-bottom: 16px;
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--surface);
        border: 1px solid var(--border);
        color: var(--accent);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.08em;
    }

    .hero h1 {
        margin: 0;
        font-size: clamp(2.2rem, 5vw, 3.2rem);
        line-height: 1.15;
        letter-spacing: -0.06em;
        color: var(--text);
    }

    .hero h1 span {
        color: var(--accent);
    }

    .hero p {
        margin-top: 18px;
        font-size: 14px;
        line-height: 1.7;
        color: var(--text-subtle);
    }

    .hero-icon {
        flex: 0 0 120px;
        font-size: 4.5rem;
        text-align: center;
    }

    /* 본문 영역 */
    .intro,
    section {
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }

    .intro {
        padding-top: 48px;
    }

    .intro p,
    section > p {
        margin: 14px 0;
        font-size: 14px;
        line-height: 1.85;
        color: var(--text);
        word-break: keep-all;
    }

    section {
        margin-top: 60px;
    }

    .section-title {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 20px;
    }

    .section-title span {
        font-size: 12px;
        font-weight: 800;
        color: var(--accent);
    }

    .section-title h2 {
        margin: 0;
        font-size: 22px;
        letter-spacing: -0.05em;
        color: var(--text);
    }

    /* 공식 섹션 */
    .formula {
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr;
        gap: 8px;
        align-items: center;
        margin: 24px 0;
    }

    .formula div {
        display: flex;
        min-height: 110px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        border: 1px solid var(--border);
        background: var(--surface);
        padding: 12px 8px;
        text-align: center;
    }

    .formula div span {
        margin-bottom: 8px;
        font-size: 1.8rem;
    }

    .formula div strong {
        font-size: 12px;
    }

    .formula div small {
        margin-top: 4px;
        font-size: 11px;
        color: var(--text-subtle);
    }

    .formula b {
        color: var(--text-muted, #94a3b8);
        font-size: 14px;
    }

    /* 레시피 그리드 */
    .recipe-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-top: 20px;
    }

    .recipe-card {
        padding: 24px;
        border-radius: 18px;
        border: 1px solid var(--border);
        background: var(--surface);
        transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .recipe-card.full-width {
        grid-column: 1 / -1;
    }

    .recipe-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px var(--shadow-card, rgba(0, 0, 0, 0.04));
    }

    .recipe-emoji {
        margin-bottom: 12px;
        font-size: 2rem;
    }

    .recipe-card h3 {
        margin: 0 0 10px;
        font-size: 16px;
        letter-spacing: -0.03em;
    }

    .recipe-card p {
        margin: 0;
        font-size: 12px;
        line-height: 1.65;
        color: var(--text-subtle);
    }

    .recipe-tip {
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid var(--border);
        font-size: 11px;
        font-weight: 700;
        line-height: 1.5;
        color: var(--accent);
    }

    /* 팬트리 그리드 */
    .pantry-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin: 24px 0;
    }

    .pantry-grid div {
        padding: 20px 12px;
        border-radius: 16px;
        border: 1px solid var(--border);
        background: var(--surface);
        text-align: center;
    }

    .pantry-grid span {
        display: block;
        margin-bottom: 8px;
        font-size: 1.8rem;
    }

    .pantry-grid strong {
        display: block;
        font-size: 13px;
    }

    .pantry-grid small {
        display: block;
        margin-top: 4px;
        font-size: 11px;
        color: var(--text-subtle);
    }

    /* 팁 박스 & 경고 박스 */
    .tip-box,
    .warning-box {
        display: flex;
        gap: 16px;
        margin: 20px 0;
        padding: 20px;
        border-radius: 18px;
        border: 1px solid var(--border-green, var(--border));
        background: var(--surface-green);
    }

    .tip-box > span,
    .warning-box > span {
        font-size: 1.8rem;
    }

    .tip-box strong,
    .warning-box strong {
        font-size: 13px;
    }

    .tip-box p,
    .warning-box p {
        margin: 4px 0 0;
        font-size: 12px;
        line-height: 1.6;
        color: var(--text-subtle);
    }

    /* 프로세스 및 흐름 (Flow) */
    .flow {
        display: grid;
        gap: 10px;
        margin: 24px 0;
    }

    .flow-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        border: 1px solid var(--border);
        border-radius: 16px;
        background: var(--surface);
    }

    .flow-item strong {
        min-width: 60px;
        font-size: 13px;
    }

    .flow-item .arrow {
        color: var(--accent);
        font-weight: 800;
        font-size: 13px;
    }

    .flow-item p {
        margin: 0;
        font-size: 12px;
        color: var(--text-subtle);
    }

    /* 엔딩 영역 */
    .ending {
        width: 100%;
        margin: 80px auto 0;
        padding: 48px 32px;
        border-radius: 24px;
        border: 1px solid var(--border);
        background: var(--surface-yellow);
        text-align: center;
    }

    .ending > span {
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.12em;
        color: var(--accent);
    }

    .ending h2 {
        margin: 14px 0 20px;
        font-size: clamp(1.6rem, 4vw, 2.2rem);
        line-height: 1.3;
        letter-spacing: -0.05em;
        color: var(--text);
    }

    .ending p {
        font-size: 13px;
        color: var(--text-subtle);
        line-height: 1.7;
    }

    .ending strong {
        display: block;
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid var(--border);
        font-size: 14px;
        line-height: 1.7;
        color: var(--text);
    }

    .bottom-nav {
        margin-top: 40px;
        text-align: center;
    }

    .bottom-nav a {
        color: var(--accent);
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
    }

    /* 반응형 레이아웃 */
    @media (max-width: 700px) {
        .hero {
            padding: 36px 24px;
        }

        .hero-icon {
            display: none;
        }

        .formula {
            grid-template-columns: 1fr;
            gap: 10px;
        }

        .formula b {
            text-align: center;
        }

        .recipe-grid,
        .pantry-grid {
            grid-template-columns: 1fr;
        }

        section {
            margin-top: 50px;
        }

        .ending {
            padding: 36px 20px;
        }
    }
</style>