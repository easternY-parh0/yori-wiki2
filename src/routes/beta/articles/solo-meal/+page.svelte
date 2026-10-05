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
        <div class="top-bar">
            <a href={appPath('/beta')} class="back-link">
                ← 요리위키 홈
            </a>

            <span>오늘의 혼밥</span>
        </div>

        <header class="hero">
            <div class="hero-text">
                <span class="badge">SOLO · COOKING</span>

                <h1>
                    오늘 뭐 먹지?<br />
                    <strong>자취생용 혼밥 추천</strong>
                </h1>

                <p>
                    적은 재료, 적은 설거지, 충분한 만족감.
                    냉장고 속 평범한 재료로 오늘의 한 끼를 만들어보자.
                </p>
            </div>

            <div class="hero-icon" aria-hidden="true">
                🍳
            </div>
        </header>

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

        <section>
            <div class="section-title">
                <span>01</span>
                <h2>혼밥의 기본 공식</h2>
            </div>

            <p>
                복잡한 레시피가 없어도 세 가지만 갖추면 한 끼의 형태가
                만들어진다.
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

        <section>
            <div class="section-title">
                <span>02</span>
                <h2>오늘 바로 만들 수 있는 혼밥 5가지</h2>
            </div>

            <div class="recipe-grid">
                <div class="recipe-card kimchi">
                    <div class="recipe-emoji">🍳</div>

                    <h3>김치볶음밥</h3>

                    <p>
                        잘 익은 김치를 먼저 충분히 볶은 뒤 밥을 넣는다.
                        신맛은 줄고 단맛과 감칠맛은 더 살아난다.
                    </p>

                    <div class="recipe-tip">
                        달걀프라이 + 김가루를 더하면 완성.
                    </div>
                </div>

                <div class="recipe-card egg">
                    <div class="recipe-emoji">🥚</div>

                    <h3>달걀덮밥</h3>

                    <p>
                        양파와 간장으로 간단한 소스를 만든 뒤 달걀을
                        부드럽게 익혀 밥 위에 올리면 된다.
                    </p>

                    <div class="recipe-tip">
                        팬 하나로 해결하고 싶은 날 추천.
                    </div>
                </div>

                <div class="recipe-card ramen">
                    <div class="recipe-emoji">🍜</div>

                    <h3>조금 특별한 라면</h3>

                    <p>
                        대파를 먼저 볶아 향을 내거나 콩나물, 숙주,
                        달걀, 두부를 더하면 평범한 라면도 달라진다.
                    </p>

                    <div class="recipe-tip">
                        추가 양념은 조금씩 넣는 것이 좋다.
                    </div>
                </div>

                <div class="recipe-card tofu">
                    <div class="recipe-emoji">⬜</div>

                    <h3>두부조림</h3>

                    <p>
                        두부를 살짝 굽고 간장, 고춧가루, 파,
                        마늘을 섞은 양념을 넣어 졸이면 된다.
                    </p>

                    <div class="recipe-tip">
                        남으면 다음 날 찌개로 활용하기도 좋다.
                    </div>
                </div>

                <div class="recipe-card butter">
                    <div class="recipe-emoji">🧈</div>

                    <h3>간장버터밥</h3>

                    <p>
                        정말 아무것도 하기 싫은 날에는 따뜻한 밥에
                        버터와 간장만 있어도 한 끼가 된다.
                    </p>

                    <div class="recipe-tip">
                        달걀 · 김가루 · 대파 중 하나만 더해보자.
                    </div>
                </div>
            </div>
        </section>

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
                <strong>기본 양념도 단순하게</strong>

                <p>
                    간장, 고추장, 된장, 식초, 설탕, 참기름 정도만 있어도
                    상당히 많은 한식 혼밥을 만들 수 있다.
                </p>
            </div>
        </section>

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
                <div>
                    <strong>김치</strong>
                    <span>→</span>
                    <p>김치볶음밥 → 김치찌개</p>
                </div>

                <div>
                    <strong>두부</strong>
                    <span>→</span>
                    <p>두부조림 → 된장찌개</p>
                </div>

                <div>
                    <strong>대파</strong>
                    <span>→</span>
                    <p>잘라서 냉동 → 필요할 때 바로 사용</p>
                </div>
            </div>

            <p>
                장보기 전에 “무엇을 사야 하지?”보다
                “지금 있는 것으로 무엇을 만들 수 있지?”라고 생각해보자.
            </p>
        </section>

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
        padding: 28px 20px 90px;
        background:
            radial-gradient(
                circle at 10% 0%,
                rgba(245, 190, 85, 0.09),
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
        background: linear-gradient(135deg, #fff2c9, #f7e2aa);
        color: #3c3321;
    }

    .hero-text {
        max-width: 640px;
    }

    .badge {
        display: inline-block;
        margin-bottom: 18px;
        padding: 7px 11px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.6);
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
        color: #a96322;
    }

    .hero p {
        margin-top: 24px;
        font-size: 1.05rem;
        line-height: 1.8;
        color: #675a3d;
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
        color: #a96322;
    }

    .section-title h2 {
        margin: 0;
        font-size: clamp(1.55rem, 4vw, 2.2rem);
        letter-spacing: -0.035em;
    }

    .formula {
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr;
        gap: 12px;
        align-items: center;
        margin: 30px 0;
    }

    .formula > div {
        display: flex;
        min-height: 145px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        background: var(--card-bg, #faf8f2);
        text-align: center;
    }

    .formula span {
        margin-bottom: 8px;
        font-size: 2rem;
    }

    .formula small {
        margin-top: 5px;
        opacity: 0.55;
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
        color: #332d25;
    }

    .kimchi {
        background: #fff0e9;
    }

    .egg {
        background: #fff7da;
    }

    .ramen {
        background: #f8eee7;
    }

    .tofu {
        background: #f2f3e9;
    }

    .butter {
        grid-column: 1 / -1;
        background: #fff5cf;
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
    }

    .pantry-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin: 28px 0;
    }

    .pantry-grid > div {
        padding: 22px 12px;
        border-radius: 18px;
        background: var(--card-bg, #fafafa);
        text-align: center;
    }

    .pantry-grid span,
    .pantry-grid strong,
    .pantry-grid small {
        display: block;
    }

    .pantry-grid span {
        margin-bottom: 10px;
        font-size: 1.8rem;
    }

    .pantry-grid small {
        margin-top: 6px;
        line-height: 1.5;
        opacity: 0.55;
    }

    .tip-box {
        margin-top: 20px;
        padding: 22px 24px;
        border-radius: 18px;
        background: #fff7e6;
        color: #4d402c;
    }

    .tip-box p {
        margin: 7px 0 0;
        line-height: 1.7;
    }

    .flow {
        display: grid;
        gap: 12px;
        margin: 27px 0;
    }

    .flow > div {
        display: grid;
        grid-template-columns: 90px 30px 1fr;
        align-items: center;
        padding: 18px 22px;
        border: 1px solid var(--border-color, #e8e8e8);
        border-radius: 17px;
    }

    .flow span {
        color: #a96322;
        font-weight: 900;
    }

    .flow p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.7;
    }

    .warning-box {
        display: flex;
        gap: 18px;
        margin: 25px 0;
        padding: 23px;
        border-radius: 20px;
        background: #fff1e8;
        color: #543a2a;
    }

    .warning-box > span {
        font-size: 1.8rem;
    }

    .warning-box p {
        margin: 5px 0 0;
        line-height: 1.7;
    }

    .ending {
        width: min(800px, 100%);
        margin: 100px auto 0;
        padding: 52px;
        border-radius: 28px;
        background: #2d2921;
        color: white;
        text-align: center;
    }

    .ending > span {
        font-size: 0.68rem;
        font-weight: 900;
        letter-spacing: 0.14em;
        color: #c6b38b;
    }

    .ending h2 {
        margin: 15px 0 26px;
        font-size: clamp(1.8rem, 5vw, 2.7rem);
        line-height: 1.3;
    }

    .ending p {
        color: #dad4c7;
        line-height: 1.8;
    }

    .ending strong {
        display: block;
        margin-top: 28px;
        padding-top: 26px;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        font-size: 1.2rem;
        line-height: 1.7;
        color: #ffd48f;
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

        .recipe-grid {
            grid-template-columns: 1fr;
        }

        .butter {
            grid-column: auto;
        }

        .pantry-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        section {
            margin-top: 72px;
        }

        .ending {
            padding: 38px 23px;
        }
    }

    @media (max-width: 430px) {
        .flow > div {
            grid-template-columns: 70px 20px 1fr;
            padding: 16px;
        }
    }
</style>