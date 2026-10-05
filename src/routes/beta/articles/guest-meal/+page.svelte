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
                    <strong>대접용 요리 총출동</strong>
                </h1>

                <p>
                    메뉴를 많이 만드는 것보다 중요한 건 조합과 타이밍.
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
                <div class="recipe-card bulgogi">
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

                <div class="recipe-card roll">
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

                <div class="recipe-card pasta">
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

                <div class="recipe-card oven">
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
        padding: 28px 20px 90px;
        background:
            radial-gradient(
                circle at 90% 0%,
                rgba(255, 185, 120, 0.1),
                transparent 30%
            ),
            var(--background, #fff);
        color: var(--text-color, #202124);
    }

    .article {
        width: min(900px, 100%);
        margin: 0 auto;
    }

    .top-bar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
        font-size: 0.85rem;
    }

    .top-bar span {
        font-weight: 700;
        opacity: 0.45;
    }

    .back-link {
        color: inherit;
        font-weight: 700;
        text-decoration: none;
        opacity: 0.7;
    }

    .hero {
        display: flex;
        min-height: 360px;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
        padding: 58px;
        border-radius: 30px;
        background: linear-gradient(135deg, #fff1df, #f9e5d0);
        color: #3c2d25;
    }

    .hero-text {
        max-width: 650px;
    }

    .badge {
        display: inline-block;
        margin-bottom: 18px;
        padding: 7px 11px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.65);
        font-size: 0.7rem;
        font-weight: 900;
        letter-spacing: 0.1em;
    }

    .hero h1 {
        margin: 0;
        font-size: clamp(2.3rem, 6vw, 4.2rem);
        line-height: 1.08;
        letter-spacing: -0.055em;
    }

    .hero h1 strong {
        color: #bc623e;
    }

    .hero p {
        margin-top: 24px;
        font-size: 1.05rem;
        line-height: 1.8;
        color: #705a4f;
    }

    .hero-icon {
        flex: 0 0 170px;
        font-size: 6rem;
        text-align: center;
    }

    .intro,
    section {
        width: min(740px, 100%);
        margin-right: auto;
        margin-left: auto;
    }

    .intro {
        padding-top: 64px;
    }

    .intro p,
    section > p {
        margin: 15px 0;
        font-size: 1.04rem;
        line-height: 1.95;
        word-break: keep-all;
    }

    section {
        margin-top: 90px;
    }

    .section-title {
        display: flex;
        gap: 15px;
        align-items: center;
        margin-bottom: 25px;
    }

    .section-title span {
        font-size: 0.75rem;
        font-weight: 900;
        color: #bc623e;
    }

    .section-title h2 {
        margin: 0;
        font-size: clamp(1.55rem, 4vw, 2.2rem);
        letter-spacing: -0.035em;
    }

    .formula {
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
        gap: 10px;
        align-items: center;
        margin: 30px 0;
    }

    .formula div {
        display: flex;
        min-height: 130px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
        background: var(--card-bg, #faf7f4);
        text-align: center;
    }

    .formula div span {
        margin-bottom: 8px;
        font-size: 2rem;
    }

    .formula b {
        color: #aaa;
    }

    .recipe-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    .recipe-card {
        padding: 27px;
        border-radius: 22px;
        color: #352b27;
    }

    .bulgogi {
        background: #f9eee7;
    }

    .roll {
        background: #edf8ed;
    }

    .pasta {
        background: #fff2df;
    }

    .oven {
        background: #f6eee4;
    }

    .recipe-emoji {
        margin-bottom: 15px;
        font-size: 2.2rem;
    }

    .recipe-card h3 {
        margin: 0 0 13px;
        font-size: 1.3rem;
    }

    .recipe-card p {
        margin: 0;
        font-size: 0.92rem;
        line-height: 1.75;
    }

    .recipe-tip {
        margin-top: 18px;
        padding-top: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        font-size: 0.82rem;
        font-weight: 750;
        line-height: 1.6;
    }

    .tip-box {
        display: flex;
        gap: 18px;
        margin: 25px 0;
        padding: 23px;
        border-radius: 20px;
        background: #eef8ef;
        color: #314334;
    }

    .tip-box > span {
        font-size: 1.8rem;
    }

    .tip-box p {
        margin: 4px 0 0;
        line-height: 1.7;
    }

    .timeline {
        display: grid;
        gap: 12px;
        margin: 27px 0;
    }

    .timeline > div {
        display: flex;
        gap: 17px;
        padding: 20px;
        border: 1px solid var(--border-color, #e8e8e8);
        border-radius: 18px;
    }

    .timeline > div > span {
        display: grid;
        width: 34px;
        height: 34px;
        flex: 0 0 34px;
        place-items: center;
        border-radius: 50%;
        background: #bc623e;
        color: white;
        font-weight: 900;
    }

    .timeline p {
        margin: 5px 0 0;
        font-size: 0.9rem;
        opacity: 0.7;
    }

    .visual-tips {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin: 28px 0;
    }

    .visual-tips > div {
        padding: 22px;
        border-radius: 18px;
        background: var(--card-bg, #fafafa);
        text-align: center;
    }

    .visual-tips span,
    .visual-tips strong,
    .visual-tips small {
        display: block;
    }

    .visual-tips span {
        margin-bottom: 10px;
        font-size: 1.8rem;
    }

    .visual-tips small {
        margin-top: 5px;
        opacity: 0.55;
    }

    .check-box {
        margin-top: 25px;
        padding: 24px 27px;
        border-radius: 20px;
        background: var(--card-bg, #f7f7f7);
    }

    .check-box ul {
        margin: 15px 0 0;
        padding-left: 22px;
    }

    .check-box li {
        margin: 8px 0;
        line-height: 1.6;
    }

    .ending {
        width: min(800px, 100%);
        margin: 100px auto 0;
        padding: 52px;
        border-radius: 28px;
        background: #352921;
        color: white;
        text-align: center;
    }

    .ending > span {
        font-size: 0.68rem;
        font-weight: 900;
        letter-spacing: 0.14em;
        color: #cba98d;
    }

    .ending h2 {
        margin: 15px 0 26px;
        font-size: clamp(1.8rem, 5vw, 2.7rem);
        line-height: 1.3;
    }

    .ending p {
        color: #dfd5cf;
        line-height: 1.8;
    }

    .ending strong {
        display: block;
        margin-top: 28px;
        padding-top: 26px;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        font-size: 1.2rem;
        line-height: 1.7;
        color: #f3c4a7;
    }

    .bottom-nav {
        margin-top: 40px;
        text-align: center;
    }

    .bottom-nav a {
        color: inherit;
        font-weight: 700;
        text-decoration: none;
    }

    @media (max-width: 700px) {
        .hero {
            padding: 40px 27px;
        }

        .hero-icon {
            display: none;
        }

        .formula {
            grid-template-columns: 1fr;
        }

        .formula b {
            text-align: center;
        }

        .recipe-grid,
        .visual-tips {
            grid-template-columns: 1fr;
        }

        section {
            margin-top: 72px;
        }

        .ending {
            padding: 38px 23px;
        }
    }
</style>