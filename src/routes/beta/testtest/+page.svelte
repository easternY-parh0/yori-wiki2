<script lang="ts">
  import { onMount } from 'svelte';

  // Svelte 5 Props 정의 및 양방향 바인딩($bindable) 처리
  let { isVerified = $bindable(false) } =$props();

  // 타입 명시 및 $state 룬 적용
  let canvas = $state<HTMLCanvasElement | null>(null);
  let captchaText = $state('');
  let userInput = $state('');
  let errorMessage = $state('');

  // 무작위 6자리 문자열 생성 (헷갈리는 0, O, 1, I, l 제외)
  function generateCaptchaText(length = 6) {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // 캔버스에 캡챠 이미지 그리기
  function drawCaptcha() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    captchaText = generateCaptchaText();

    // 배경 채우기
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 노이즈 선 그리기
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // 노이즈 점 그리기
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // 텍스트 그리기
    ctx.font = 'bold 24px sans-serif';
    ctx.textBaseline = 'middle';

    const startX = 20;
    const spacing = 25;

    for (let i = 0; i < captchaText.length; i++) {
      ctx.save();
      const x = startX + i * spacing;
      const y = canvas.height / 2 + (Math.random() - 0.5) * 8;
      const angle = (Math.random() - 0.5) * 0.4;

      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `rgb(${Math.random() * 150}, ${Math.random() * 150}, ${Math.random() * 150})`;
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }
  }

  // 초기화 및 새로고침
  function refreshCaptcha() {
    userInput = '';
    errorMessage = '';
    isVerified = false;
    drawCaptcha();
  }

  // 입력값 검증
  function handleVerify(e: SubmitEvent) {
    e.preventDefault();
    if (userInput.trim() === captchaText) {
      isVerified = true;
      errorMessage = '';
    } else {
      isVerified = false;
      errorMessage = '캡챠 번호가 일치하지 않습니다. 다시 시도해주세요.';
      refreshCaptcha();
    }
  }

  onMount(() => {
    drawCaptcha();
  });
</script>

<div class="captcha-container">
  <div class="canvas-wrapper">
    <canvas bind:this={canvas} width="180" height="50"></canvas>
    <button type="button" class="refresh-btn" onclick={refreshCaptcha} title="새로고침">
      🔄
    </button>
  </div>

  <form onsubmit={handleVerify} class="input-wrapper">
    <input
      type="text"
      placeholder="위의 코드를 입력하세요"
      bind:value={userInput}
      disabled={isVerified}
    />
    <button type="submit" disabled={isVerified || !userInput}>
      {isVerified ? '인증완료' : '확인'}
    </button>
  </form>

  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  {#if isVerified}
    <p class="success">인증에 성공했습니다!</p>
  {/if}
</div>

<style>
  .captcha-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 260px;
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background-color: #ffffff;
  }

  .canvas-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  canvas {
    border-radius: 4px;
    border: 1px solid #d1d5db;
  }

  .refresh-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
  }

  .input-wrapper {
    display: flex;
    gap: 6px;
  }

  input {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 14px;
  }

  button[type='submit'] {
    padding: 6px 12px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  button[type='submit']:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  .error {
    color: #dc2626;
    font-size: 12px;
    margin: 0;
  }

  .success {
    color: #16a34a;
    font-size: 12px;
    margin: 0;
  }
</style>