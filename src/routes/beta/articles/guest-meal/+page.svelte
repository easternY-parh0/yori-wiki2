<script lang="ts">
    import { appPath } from '$lib/app-path';
</script>

<svelte:head>
    <title>집에 손님이 찾아왔다! 대접용 요리 총출동 | 요리위키</title>
    <meta
        name="description"
        content="손님을 위한 불고기, 월남쌈, 파스타와 성공적인 손님상 구성법을 소개합니다."
    />
</svelte:head>

<main class="article-page">
    <article class="article">
        <div class="top-bar">
            <a href={appPath('/beta')} class="back-link">
                ← 요리위키 홈
            </a>

            <span>손님 초대 요리</span>
        </div>

        <header class="hero">
            <div class="hero-text">
                <span class="badge">HOME · DINING</span>

                <h1>
                    집에 손님이 찾아왔다!<br />
                    <span>대접용 요리 총출동</span>
                </h1>

                <p>
                    메뉴를 많이 만드는 것보다 중요한 건 조합과 타이밍.<br />
                    부담은 줄이고 식탁은 근사하게 만들어보자.
                </p>
            </div>

            <div class="hero-icon" aria-hidden="true">
                🍽️
            </div>
        </header>

        <section class="intro">
            <p>
                “나 오늘 너희 집 가도 돼?” 반가운 말이지만 직접 음식을
                준비해야 한다고 생각하면 갑자기 머릿속이 복잡해진다.
            </p>

            <p>
                하지만 손님상이라고 해서 모든 음식을 어렵게 만들 필요는 없다.
                좋은 손님상은 <strong>메뉴의 난이도보다 구성과 타이밍</strong>이
                중요하다.
            </p>
        </section>

        <section>
            <div class="section-title">
                <span>01</span>
                <h2>손님상은 조합이 중요하다</h2>
            </div>

            <p>
                모든 음식을 주인공으로 만들려고 하면 손님이 오기도 전에
                요리하는 사람이 지쳐버린다.
            </p>

            <div class="formula">
                <div>
                    <span>🥩</span>
                    <strong>메인 1가지</strong>
                </div>

                <b>+</b>

                <div>
                    <span>🥗</span>
                    <strong>곁들임 1~2가지</strong>
                </div>

                <b>+</b>

                <div>
                    <span>🍚</span>
                    <strong>밥 또는 면</strong>
                </div>

                <b>+</b>

                <div>
                    <span>🍲</span>
                    <strong>국물 또는 후식</strong>
                </div>
            </div>

            <p>
                예를 들어 불고기를 메인으로 골랐다면 샐러드와 밥,
                가벼운 국 정도만 있어도 충분히 풍성한 식탁이 된다.
            </p>
        </section>

        <section>
            <div class="section-title">
                <span>02</span>
                <h2>대접하기 좋은 메뉴들</h2>
            </div>

            <div class="recipe-grid">
                <div class="recipe-card">
                    <div class="recipe-emoji">🥩</div>

                    <h3>불고기</h3>

                    <p>
                        미리 양념해둘 수 있어 손님상에 특히 편한 메뉴다.
                        식사 직전에 볶기만 하면 된다.
                    </p>

                    <div class="recipe-tip">
                        양파 · 버섯 · 대파를 함께 넣으면 더 푸짐하다.
                    </div>
                </div>

                <div class="recipe-card">
                    <div class="recipe-emoji">🥬</div>

                    <h3>월남쌈</h3>

                    <p>
                        채소와 고기, 새우 등을 준비해두면 손님이 직접
                        싸 먹을 수 있어 식탁 분위기도 자연스럽게 살아난다.
                    </p>

                    <div class="recipe-tip">
                        다양한 색의 채소를 쓰면 별다른 장식이 필요 없다.
                    </div>
                </div>

                <div class="recipe-card">
                    <div class="recipe-emoji">🍝</div>

                    <h3>파스타</h3>

                    <p>
                        캐주얼한 손님상이라면 파스타도 좋은 선택이다.
                        소스는 미리 준비하고 면은 마지막에 삶자.
                    </p>

                    <div class="recipe-tip">
                        파스타는 만든 직후가 가장 맛있다.
                    </div>
                </div>

                <div class="recipe-card">
                    <div class="recipe-emoji">🍗</div>

                    <h3>오븐 · 에어프라이어 요리</h3>

                    <p>
                        닭고기와 감자, 버섯 등을 함께 익히면 손이 적게
                        가면서도 보기 좋은 메인 요리를 만들 수 있다.
                    </p>

                    <div class="recipe-tip">
                        조리되는 동안 샐러드와 식탁을 준비할 수 있다.
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="section-title">
                <span>03</span>
                <h2>샐러드는 단순한 장식이 아니다</h2>
            </div>

            <p>
                고기와 볶음 요리가 많다면 신선한 채소가 식탁의 균형을
                잡아준다.
            </p>

            <div class="tip-box">
                <span>🥗</span>

                <div>
                    <strong>간단하게 준비하기</strong>
                    <p>
                        어린잎채소나 양상추에 방울토마토와 오이를 더하고
                        드레싱만 준비해도 충분하다.
                    </p>
                </div>
            </div>

            <p>
                드레싱은 미리 준비해도 좋지만 채소와 섞는 것은 먹기 직전이
                좋다. 너무 일찍 섞으면 채소의 숨이 죽을 수 있다.
            </p>
        </section>

        <section>
            <div class="section-title">
                <span>04</span>
                <h2>맛만큼 중요한 조리 순서</h2>
            </div>

            <p>
                모든 음식을 손님이 오기 전에 완성해놓으려고 하지 말자.
                음식마다 가장 맛있는 순간이 다르다.
            </p>

            <div class="timeline">
                <div>
                    <span>1</span>
                    <div>
                        <strong>차가운 음식부터</strong>
                        <p>샐러드, 밑반찬, 소스 등을 먼저 준비한다.</p>
                    </div>
                </div>

                <div>
                    <span>2</span>
                    <div>
                        <strong>오래 걸리는 요리 시작</strong>
                        <p>오븐 요리나 국물 요리를 먼저 익힌다.</p>
                    </div>
                </div>

                <div>
                    <span>3</span>
                    <div>
                        <strong>마지막은 바로 먹는 음식</strong>
                        <p>불고기나 파스타처럼 따뜻할 때 맛있는 음식을 마무리한다.</p>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="section-title">
                <span>05</span>
                <h2>보기 좋은 식탁은 어렵지 않다</h2>
            </div>

            <p>
                플레이팅을 어렵게 생각할 필요는 없다. 작은 접시에 음식을
                가득 담기보다 넉넉한 접시를 사용하면 훨씬 여유롭고
                근사해 보인다.
            </p>

            <div class="visual-tips">
                <div>
                    <span>🍽️</span>
                    <strong>큰 접시</strong>
                    <small>음식을 여유롭게 담기</small>
                </div>

                <div>
                    <span>🌿</span>
                    <strong>초록색</strong>
                    <small>채소나 파슬리 활용</small>
                </div>

                <div>
                    <span>🍅</span>
                    <strong>포인트 색</strong>
                    <small>토마토 등으로 생기 더하기</small>
                </div>
            </div>
        </section>

        <section>
            <div class="section-title">
                <span>06</span>
                <h2>손님이 오기 전 마지막 체크</h2>
            </div>

            <p>
                메뉴 하나를 더 만드는 것보다 싱크대를 정리하고 식탁을 닦고,
                물과 컵을 준비하는 편이 더 중요할 때가 있다.
            </p>

            <div class="check-box">
                <strong>손님이 도착하기 전에</strong>

                <ul>
                    <li>조리도구와 싱크대 정리하기</li>
                    <li>접시와 컵 미리 준비하기</li>
                    <li>바로 먹어야 할 요리만 남겨두기</li>
                    <li>나도 함께 앉을 수 있는 상태 만들기</li>
                </ul>
            </div>
        </section>

        <footer class="ending">
            <span>GOOD FOOD, GOOD TABLE</span>

            <h2>
                완벽한 음식보다<br />
                기억에 남는 식탁
            </h2>

            <p>
                메인 요리 하나를 자신 있게 만들고 간단한 곁들임을 준비하면
                충분하다.
            </p>

            <strong>
                좋은 손님상의 핵심은<br />
                만든 사람도 함께 즐기는 것이다.
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

    /* Hero 영역 디자인 통일 */
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

    /* 본문 공통 섹션 */
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

    /* 포뮬러 카드 세트 */
    .formula {
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
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

    .formula b {
        color: var(--text-muted, #94a3b8);
        font-size: 14px;
    }

    /* 레시피 그리드 통일 */
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

    /* 팁 박스 통일 (Green Surface) */
    .tip-box {
        display: flex;
        gap: 16px;
        margin: 20px 0;
        padding: 20px;
        border-radius: 18px;
        border: 1px solid var(--border-green, var(--border));
        background: var(--surface-green);
    }

    .tip-box > span {
        font-size: 1.8rem;
    }

    .tip-box strong {
        font-size: 13px;
    }

    .tip-box p {
        margin: 4px 0 0;
        font-size: 12px;
        line-height: 1.6;
        color: var(--text-subtle);
    }

    /* 타임라인 영역 */
    .timeline {
        display: grid;
        gap: 10px;
        margin: 24px 0;
    }

    .timeline > div {
        display: flex;
        gap: 16px;
        align-items: center;
        padding: 18px 20px;
        border: 1px solid var(--border);
        border-radius: 16px;
        background: var(--surface);
    }

    .timeline > div > span {
        display: grid;
        width: 32px;
        height: 32px;
        flex: 0 0 32px;
        place-items: center;
        border-radius: 50%;
        background: var(--primary);
        color: #0f172a;
        font-weight: 800;
        font-size: 13px;
    }

    .timeline strong {
        font-size: 13px;
    }

    .timeline p {
        margin: 3px 0 0;
        font-size: 12px;
        color: var(--text-subtle);
    }

    /* 비주얼 팁 3분할 */
    .visual-tips {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin: 24px 0;
    }

    .visual-tips > div {
        padding: 20px 14px;
        border-radius: 16px;
        border: 1px solid var(--border);
        background: var(--surface);
        text-align: center;
    }

    .visual-tips span,
    .visual-tips strong,
    .visual-tips small {
        display: block;
    }

    .visual-tips span {
        margin-bottom: 8px;
        font-size: 1.8rem;
    }

    .visual-tips strong {
        font-size: 13px;
    }

    .visual-tips small {
        margin-top: 4px;
        font-size: 11px;
        color: var(--text-subtle);
    }

    /* 체크박스 */
    .check-box {
        margin-top: 20px;
        padding: 22px 24px;
        border-radius: 18px;
        border: 1px solid var(--border);
        background: var(--surface);
    }

    .check-box strong {
        font-size: 14px;
    }

    .check-box ul {
        margin: 12px 0 0;
        padding-left: 20px;
    }

    .check-box li {
        margin: 6px 0;
        font-size: 12px;
        line-height: 1.6;
        color: var(--text-subtle);
    }

    /* 엔딩 영역 통일 */
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
        .visual-tips {
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