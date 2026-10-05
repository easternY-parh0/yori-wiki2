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
        <!-- 상단 Nav -->
        <div class="top-bar">
            <a href={appPath('/beta')} class="back-link">
                ← 요리위키 홈
            </a>
            <span>여름 요리 이야기</span>
        </div>

        <!-- 메인 제목 (Hero) -->
        <header class="hero">
            <div class="hero-text">
                <span class="badge">SUMMER · SMOOTHIE</span>

                <h1>
                    시원한 스무디 먹고<br />
                    <span>무더위 날려버리자!</span>
                </h1>

                <p>
                    냉동실 속 과일 몇 조각과 믹서기만 있다면<br />
                    집에서도 시원하고 맛있는 여름 한 잔을 만들 수 있다.
                </p>
            </div>

            <div class="hero-icon" aria-hidden="true">
                🍹
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
                음료다. 단순해 보이지만 <strong>과일과 액체의 비율</strong>에 따라
                맛과 질감이 크게 달라진다.
            </p>
        </section>

        <!-- 01. 기본 공식 -->
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
                <div>
                    <span>🍓</span>
                    <strong>과일</strong>
                    <small>딸기 · 바나나 · 망고</small>
                </div>

                <b>+</b>

                <div>
                    <span>🥛</span>
                    <strong>액체</strong>
                    <small>우유 · 두유 · 요거트</small>
                </div>

                <b>+</b>

                <div>
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

        <!-- 02. 추천 스무디 -->
        <section>
            <div class="section-title">
                <span>02</span>
                <h2>추천 스무디 4가지</h2>
            </div>

            <div class="recipe-grid">
                <div class="recipe-card">
                    <div class="recipe-emoji">🍓🍌</div>
                    <h3>딸기바나나 스무디</h3>
                    <p>
                        스무디 입문자에게 가장 추천하기 좋은 조합이다.
                        딸기는 상큼함을, 바나나는 자연스러운 단맛과
                        부드러운 질감을 더한다.
                    </p>
                    <div class="recipe-tip">
                        냉동 딸기 + 바나나 + 우유
                    </div>
                </div>

                <div class="recipe-card">
                    <div class="recipe-emoji">🥭</div>
                    <h3>망고 스무디</h3>
                    <p>
                        냉동 망고에 우유나 요거트를 넣으면
                        진하고 부드러운 스무디가 된다.
                        레몬이나 라임즙을 조금 넣으면 더 산뜻하다.
                    </p>
                    <div class="recipe-tip">
                        냉동 망고 + 요거트
                    </div>
                </div>

                <div class="recipe-card">
                    <div class="recipe-emoji">🟣</div>
                    <h3>블루베리 요거트 스무디</h3>
                    <p>
                        냉동 블루베리와 요거트를 함께 갈면
                        새콤하고 부드러운 맛을 낼 수 있다.
                        바나나를 더하면 조금 더 걸쭉해진다.
                    </p>
                    <div class="recipe-tip">
                        블루베리 + 요거트 + 바나나
                    </div>
                </div>

                <div class="recipe-card">
                    <div class="recipe-emoji">🍉</div>
                    <h3>수박 스무디</h3>
                    <p>
                        먹다 남은 수박을 얼려두었다가 갈아보자.
                        수분이 많아 별도의 물을 많이 넣지 않아도 된다.
                        레몬즙도 잘 어울린다.
                    </p>
                    <div class="recipe-tip">
                        냉동 수박 + 레몬
                    </div>
                </div>
            </div>
        </section>

        <!-- 03. 냉동 과일 -->
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
                <span>💡</span>
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

        <!-- 04. 농도 -->
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

        <!-- 05. 조합 -->
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

        <!-- 06. 남은 과일 -->
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
                재료를 넣고 갈기만 하면 된다. 차갑게 갈아낸 스무디 한 잔은
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

    /* Top Bar */
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

    /* Hero Area */
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
        word-break: keep-all;
    }

    .hero-icon {
        flex: 0 0 120px;
        font-size: 4.5rem;
        text-align: center;
    }

    /* Sections */
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

    /* Formula Cards */
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

    /* Recipe Grid */
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

    /* Tip Box & Warning Box */
    .tip-box,
    .warning-box {
        display: flex;
        gap: 16px;
        margin: 20px 0;
        padding: 20px;
        border-radius: 18px;
        border: 1px solid var(--border);
    }

    .tip-box {
        border-color: var(--border-green, var(--border));
        background: var(--surface-green);
    }

    .tip-box > span {
        font-size: 1.8rem;
    }

    .tip-box strong {
        font-size: 13px;
        color: var(--text);
    }

    .tip-box p {
        margin: 4px 0 0;
        font-size: 12px;
        line-height: 1.6;
        color: var(--text-subtle);
    }

    .warning-box {
        flex-direction: column;
        gap: 6px;
        background: var(--surface);
    }

    .warning-box strong {
        font-size: 13px;
        color: var(--accent);
    }

    .warning-box p {
        margin: 0;
        font-size: 12px;
        line-height: 1.6;
        color: var(--text-subtle);
    }

    /* Texture Grid */
    .texture-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin: 24px 0;
    }

    .texture-grid > div {
        padding: 20px 16px;
        border-radius: 16px;
        border: 1px solid var(--border);
        background: var(--surface);
    }

    .texture-grid span {
        font-size: 1.8rem;
    }

    .texture-grid h3 {
        margin: 8px 0 6px;
        font-size: 15px;
        letter-spacing: -0.03em;
    }

    .texture-grid p {
        margin: 0;
        font-size: 12px;
        line-height: 1.6;
        color: var(--text-subtle);
    }

    /* Pairings List */
    .pairings {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin: 24px 0;
    }

    .pairings > div {
        padding: 18px 16px;
        border: 1px solid var(--border);
        border-radius: 16px;
        background: var(--surface);
    }

    .pairings span {
        display: block;
        margin-bottom: 8px;
        font-size: 1.4rem;
    }

    .pairings strong {
        display: block;
        font-size: 13px;
    }

    .pairings small {
        display: block;
        margin-top: 4px;
        font-size: 11px;
        color: var(--text-subtle);
    }

    /* Ending Section */
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

    /* Bottom Nav */
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

    /* Responsive Design */
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
        .texture-grid,
        .pairings {
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