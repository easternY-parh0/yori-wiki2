<script lang="ts">
    import { appPath } from '$lib/app-path';
</script>

<svelte:head>
    <title>시원한 스무디 먹고 무더위 날려버리자! | 요리위키</title>
    <meta
        name="description"
        content="딸기, 망고, 블루베리, 수박으로 만드는 시원한 여름 스무디 이야기"
    />
</svelte:head>

<main class="article-page">
    <article class="article">
        <!-- 상단 -->
        <div class="top-bar">
            <a href={appPath('/beta')} class="back-link">
                ← 요리위키 홈
            </a>

            <span>여름 요리 이야기</span>
        </div>

        <!-- 메인 제목 -->
        <header class="hero">
            <div class="hero-text">
                <span class="badge">SUMMER · SMOOTHIE</span>

                <h1>
                    시원한 스무디 먹고<br />
                    <strong>무더위 날려버리자!</strong>
                </h1>

                <p>
                    냉동실 속 과일 몇 조각과 믹서기만 있다면
                    집에서도 시원하고 맛있는 여름 한 잔을 만들 수 있다.
                </p>
            </div>

            <div class="hero-fruit" aria-hidden="true">
                🍓 🥭 🟣
            </div>
        </header>

        <!-- 시작 -->
        <section class="intro">
            <p>
                한여름, 시원한 음료가 생각나지만 너무 단 음료는 부담스러울
                때가 있다. 그럴 때 냉동실 속 과일과 믹서기만 있으면
                집에서도 간단하게 스무디를 만들 수 있다.
            </p>

            <p>
                스무디는 과일과 얼음, 우유나 요거트 등을 함께 갈아 만드는
                음료다. 단순해 보이지만 과일과 액체의 비율에 따라
                맛과 질감이 크게 달라진다.
            </p>
        </section>

        <!-- 기본 공식 -->
        <section>
            <div class="section-title">
                <span>01</span>
                <h2>스무디의 기본 공식</h2>
            </div>

            <p>
                스무디를 처음 만든다면 복잡하게 생각할 필요가 없다.
                기본적으로 세 가지만 기억하면 된다.
            </p>

            <div class="formula">
                <div class="formula-card">
                    <span>🍓</span>
                    <strong>과일</strong>
                    <small>딸기 · 바나나 · 망고</small>
                </div>

                <b>+</b>

                <div class="formula-card">
                    <span>🥛</span>
                    <strong>액체</strong>
                    <small>우유 · 두유 · 요거트</small>
                </div>

                <b>+</b>

                <div class="formula-card">
                    <span>❄️</span>
                    <strong>차가움</strong>
                    <small>냉동 과일 · 얼음</small>
                </div>
            </div>

            <p>
                과일 자체가 충분히 달다면 꿀이나 시럽은 굳이 넣지 않아도
                좋다. 먼저 갈아본 뒤 부족한 맛을 추가하는 편이 좋다.
            </p>
        </section>

        <!-- 추천 스무디 -->
        <section>
            <div class="section-title">
                <span>02</span>
                <h2>추천 스무디 4가지</h2>
            </div>

            <div class="recipe-grid">
                <div class="recipe-card strawberry">
                    <div class="recipe-emoji">🍓🍌</div>

                    <h3>딸기바나나 스무디</h3>

                    <p>
                        스무디 입문자에게 가장 추천하기 좋은 조합이다.
                        딸기는 상큼함을, 바나나는 자연스러운 단맛과
                        부드러운 질감을 더한다.
                    </p>

                    <div class="recipe-mix">
                        냉동 딸기 + 바나나 + 우유
                    </div>
                </div>

                <div class="recipe-card mango">
                    <div class="recipe-emoji">🥭</div>

                    <h3>망고 스무디</h3>

                    <p>
                        냉동 망고에 우유나 요거트를 넣으면
                        진하고 부드러운 스무디가 된다.
                        레몬이나 라임즙을 조금 넣으면 더 산뜻하다.
                    </p>

                    <div class="recipe-mix">
                        냉동 망고 + 요거트
                    </div>
                </div>

                <div class="recipe-card blueberry">
                    <div class="recipe-emoji">🟣</div>

                    <h3>블루베리 요거트 스무디</h3>

                    <p>
                        냉동 블루베리와 요거트를 함께 갈면
                        새콤하고 부드러운 맛을 낼 수 있다.
                        바나나를 더하면 조금 더 걸쭉해진다.
                    </p>

                    <div class="recipe-mix">
                        블루베리 + 요거트 + 바나나
                    </div>
                </div>

                <div class="recipe-card watermelon">
                    <div class="recipe-emoji">🍉</div>

                    <h3>수박 스무디</h3>

                    <p>
                        먹다 남은 수박을 얼려두었다가 갈아보자.
                        수분이 많아 별도의 물을 많이 넣지 않아도 된다.
                        레몬즙도 잘 어울린다.
                    </p>

                    <div class="recipe-mix">
                        냉동 수박 + 레몬
                    </div>
                </div>
            </div>
        </section>

        <!-- 냉동 과일 -->
        <section>
            <div class="section-title">
                <span>03</span>
                <h2>얼음보다 냉동 과일을 활용하자</h2>
            </div>

            <p>
                스무디를 차갑게 만들겠다고 얼음을 너무 많이 넣으면
                맛이 묽어질 수 있다.
            </p>

            <div class="tip-box">
                <div class="tip-icon">💡</div>

                <div>
                    <strong>요리위키 TIP</strong>
                    <p>
                        바나나, 딸기, 망고 같은 과일을 미리 얼려두면
                        얼음을 많이 넣지 않아도 차갑고 걸쭉한
                        스무디를 만들 수 있다.
                    </p>
                </div>
            </div>

            <p>
                특히 바나나는 껍질을 벗긴 뒤 적당한 크기로 잘라
                냉동해두면 필요할 때 바로 사용할 수 있다.
            </p>
        </section>

        <!-- 농도 -->
        <section>
            <div class="section-title">
                <span>04</span>
                <h2>농도 조절은 조금씩</h2>
            </div>

            <div class="texture-grid">
                <div>
                    <span>💧</span>
                    <h3>너무 묽다면</h3>
                    <p>
                        냉동 과일, 바나나 또는 요거트를 조금 더 넣는다.
                    </p>
                </div>

                <div>
                    <span>🥛</span>
                    <h3>너무 걸쭉하다면</h3>
                    <p>
                        우유나 물을 조금씩 추가해 농도를 맞춘다.
                    </p>
                </div>
            </div>

            <p>
                액체를 한꺼번에 많이 넣으면 다시 농도를 맞추기 어렵다.
                처음에는 적게 넣고 믹서 상태를 보면서 조금씩 조절하는
                것이 좋다.
            </p>
        </section>

        <!-- 조합 -->
        <section>
            <div class="section-title">
                <span>05</span>
                <h2>맛있는 조합을 찾아보자</h2>
            </div>

            <p>
                스무디의 재미는 재료 조합에 있다.
                처음에는 두 가지 정도의 재료로 시작하면
                각 과일의 특징도 쉽게 느낄 수 있다.
            </p>

            <div class="pairings">
                <div>
                    <span>🍓 + 🍌</span>
                    <strong>딸기 + 바나나</strong>
                    <small>부드럽고 달콤한 맛</small>
                </div>

                <div>
                    <span>🥭 + 🥣</span>
                    <strong>망고 + 요거트</strong>
                    <small>진하고 새콤한 맛</small>
                </div>

                <div>
                    <span>🟣 + 🍌</span>
                    <strong>블루베리 + 바나나</strong>
                    <small>풍부하고 묵직한 맛</small>
                </div>

                <div>
                    <span>🍉 + 🍋</span>
                    <strong>수박 + 레몬</strong>
                    <small>가볍고 상쾌한 맛</small>
                </div>
            </div>
        </section>

        <!-- 남은 과일 -->
        <section>
            <div class="section-title">
                <span>06</span>
                <h2>남은 과일도 맛있게 활용하자</h2>
            </div>

            <p>
                조금 물러진 바나나나 한 줌 남은 블루베리처럼
                곧 먹어야 할 과일은 상태가 괜찮을 때 손질해서
                냉동해두면 좋은 스무디 재료가 된다.
            </p>

            <div class="warning-box">
                <strong>잠깐!</strong>

                <p>
                    상하거나 곰팡이가 생긴 과일은 얼리거나 갈아도
                    안전해지는 것이 아니다. 상태가 좋지 않은 식재료는
                    사용하지 않는 것이 좋다.
                </p>
            </div>
        </section>

        <!-- 마무리 -->
        <footer class="ending">
            <span>ONE MINUTE VACATION</span>

            <h2>
                믹서기 1분이 만드는<br />
                작은 여름 휴가
            </h2>

            <p>
                스무디의 가장 큰 장점은 어렵지 않다는 것이다.
                재료를 넣고 갈기만 하면 된다.
            </p>

            <p>
                하지만 차갑게 갈아낸 스무디 한 잔은
                무더운 여름날 생각보다 큰 만족감을 준다.
            </p>

            <strong>
                오늘만큼은 더위와 정면승부하지 말고,<br />
                시원하게 갈아서 마셔버리자.
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
    :global(html) {
        scroll-behavior: smooth;
    }

    .article-page {
        min-height: 100vh;
        padding: 28px 20px 90px;
        background:
            radial-gradient(
                circle at 8% 0%,
                rgba(255, 120, 150, 0.08),
                transparent 28%
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
        align-items: center;
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

    .back-link:hover {
        opacity: 1;
    }

    .hero {
        position: relative;
        display: flex;
        min-height: 360px;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
        overflow: hidden;
        padding: 58px;
        border-radius: 30px;
        background: linear-gradient(135deg, #fff1f3, #fff5da);
        color: #32272a;
    }

    .hero-text {
        position: relative;
        z-index: 2;
        max-width: 620px;
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
        font-size: clamp(2.4rem, 6vw, 4.4rem);
        line-height: 1.05;
        letter-spacing: -0.055em;
    }

    .hero h1 strong {
        color: #ed536e;
    }

    .hero p {
        max-width: 550px;
        margin: 24px 0 0;
        font-size: 1.05rem;
        line-height: 1.8;
        color: #69595d;
    }

    .hero-fruit {
        position: relative;
        z-index: 2;
        width: 200px;
        flex: 0 0 200px;
        font-size: 3.5rem;
        line-height: 1.5;
        text-align: center;
        transform: rotate(-8deg);
    }

    .intro,
    section {
        width: min(740px, 100%);
        margin-right: auto;
        margin-left: auto;
    }

    .intro {
        padding: 64px 0 10px;
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

    .section-title > span {
        font-size: 0.75rem;
        font-weight: 900;
        color: #ed536e;
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

    .formula-card {
        display: flex;
        min-height: 145px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 18px;
        border: 1px solid var(--border-color, #e8e8e8);
        border-radius: 20px;
        background: var(--card-bg, #fafafa);
        text-align: center;
    }

    .formula-card span {
        margin-bottom: 9px;
        font-size: 2rem;
    }

    .formula-card strong {
        font-size: 1rem;
    }

    .formula-card small {
        margin-top: 5px;
        opacity: 0.55;
    }

    .formula > b {
        color: #aaa;
    }

    .recipe-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
    }

    .recipe-card {
        padding: 27px;
        border-radius: 22px;
        color: #30272a;
    }

    .strawberry {
        background: #fff0f3;
    }

    .mango {
        background: #fff5dc;
    }

    .blueberry {
        background: #f2efff;
    }

    .watermelon {
        background: #eef9f2;
    }

    .recipe-emoji {
        margin-bottom: 17px;
        font-size: 2.2rem;
    }

    .recipe-card h3 {
        margin: 0 0 14px;
        font-size: 1.3rem;
        letter-spacing: -0.025em;
    }

    .recipe-card p {
        margin: 0;
        font-size: 0.92rem;
        line-height: 1.75;
    }

    .recipe-mix {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        font-size: 0.82rem;
        font-weight: 800;
    }

    .tip-box {
        display: flex;
        gap: 17px;
        align-items: flex-start;
        margin: 26px 0;
        padding: 23px;
        border-radius: 20px;
        background: #eef8ff;
        color: #263b4c;
    }

    .tip-icon {
        font-size: 1.6rem;
    }

    .tip-box strong {
        display: block;
        margin-bottom: 5px;
        font-size: 0.78rem;
        color: #527c9a;
    }

    .tip-box p {
        margin: 0;
        font-size: 0.92rem;
        line-height: 1.7;
    }

    .texture-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin: 25px 0;
    }

    .texture-grid > div {
        padding: 25px;
        border: 1px solid var(--border-color, #e8e8e8);
        border-radius: 20px;
        background: var(--card-bg, #fafafa);
    }

    .texture-grid span {
        font-size: 1.8rem;
    }

    .texture-grid h3 {
        margin: 12px 0 7px;
    }

    .texture-grid p {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.7;
        opacity: 0.7;
    }

    .pairings {
        margin: 28px 0;
        overflow: hidden;
        border: 1px solid var(--border-color, #e8e8e8);
        border-radius: 20px;
    }

    .pairings > div {
        display: grid;
        grid-template-columns: 100px 170px 1fr;
        gap: 15px;
        align-items: center;
        padding: 18px 21px;
        border-bottom: 1px solid var(--border-color, #e8e8e8);
    }

    .pairings > div:last-child {
        border-bottom: 0;
    }

    .pairings span {
        font-size: 1.35rem;
    }

    .pairings strong {
        font-size: 0.92rem;
    }

    .pairings small {
        opacity: 0.6;
    }

    .warning-box {
        margin: 25px 0;
        padding: 22px 24px;
        border: 1px solid rgba(210, 80, 80, 0.15);
        border-radius: 18px;
        background: #fff1f1;
        color: #583535;
    }

    .warning-box strong {
        display: block;
        margin-bottom: 5px;
    }

    .warning-box p {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.75;
    }

    .ending {
        width: min(800px, 100%);
        margin: 100px auto 0;
        padding: 52px;
        border-radius: 28px;
        background: #1d2a36;
        color: white;
        text-align: center;
    }

    .ending > span {
        font-size: 0.68rem;
        font-weight: 900;
        letter-spacing: 0.14em;
        color: #93b4c7;
    }

    .ending h2 {
        margin: 15px 0 26px;
        font-size: clamp(1.8rem, 5vw, 2.7rem);
        line-height: 1.3;
        letter-spacing: -0.035em;
    }

    .ending p {
        max-width: 620px;
        margin: 12px auto;
        line-height: 1.85;
        color: #cfdae1;
    }

    .ending > strong {
        display: block;
        margin-top: 30px;
        padding-top: 28px;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        font-size: 1.25rem;
        line-height: 1.65;
        color: #ffb7c3;
    }

    .bottom-nav {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }

    .bottom-nav a {
        padding: 11px 18px;
        border: 1px solid var(--border-color, #ddd);
        border-radius: 999px;
        color: inherit;
        font-size: 0.88rem;
        font-weight: 700;
        text-decoration: none;
    }

    @media (max-width: 700px) {
        .article-page {
            padding: 18px 15px 65px;
        }

        .hero {
            min-height: 0;
            padding: 40px 28px;
        }

        .hero-fruit {
            display: none;
        }

        .hero h1 {
            font-size: clamp(2.3rem, 11vw, 3.5rem);
        }

        .formula {
            grid-template-columns: 1fr;
        }

        .formula > b {
            text-align: center;
        }

        .recipe-grid,
        .texture-grid {
            grid-template-columns: 1fr;
        }

        .pairings > div {
            grid-template-columns: 85px 1fr;
        }

        .pairings small {
            grid-column: 2;
        }

        section {
            margin-top: 72px;
        }

        .ending {
            padding: 38px 23px;
        }
    }

    @media (max-width: 430px) {
        .hero {
            padding: 34px 22px;
            border-radius: 23px;
        }

        .top-bar > span {
            display: none;
        }

        .recipe-card {
            padding: 23px;
        }

        .intro p,
        section > p {
            font-size: 1rem;
            line-height: 1.85;
        }
    }
</style>