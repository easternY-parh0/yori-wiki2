# YoriWiki 프런트엔드

SvelteKit 2 / Svelte 5 / Vite 기반 UI와 Express 백엔드에 연결하는 서버 API 프록시입니다.
상위 저장소에서는 `frontend/` Git 서브모듈로 관리합니다.

## 실행

Node.js >= 22.12, npm이 필요합니다. 상위 저장소에서는 `npm run setup`, `npm start`로 두 서버를 실행합니다.
프런트엔드만 실행하려면 별도로 백엔드를 시작한 뒤:

```sh
npm ci
cp .env.example .env
npm run dev
```

`.env`의 `BACKEND_URL`은 서버 프록시에서 읽으며 기본값은 `http://127.0.0.1:8080`입니다.
통합 실행기는 셸의 `BACKEND_URL` 또는 `http://127.0.0.1:${PORT}`를 전달하므로 `.env`보다 우선합니다.

```sh
BASE_PATH=/projects/yori ALLOWED_HOSTS=project.example.com npm run dev
BASE_PATH=/projects/yori npm run check
BASE_PATH=/projects/yori npm run build
```

PowerShell에서는 `$env:BASE_PATH='/projects/yori'`, `$env:ALLOWED_HOSTS='project.example.com'`를 설정한 후 실행합니다.
`BASE_PATH`와 `ALLOWED_HOSTS`는 **프로세스 환경 변수**로 설정합니다. `.env`에서 읽지 않습니다.
`BASE_PATH` 기본값은 빈 문자열(도메인 루트)이며, 끝의 `/`는 제거합니다. `/` 역시 빈 접두사로 정규화합니다.
중복 슬래시, 쿼리, 해시, 공백, 역슬래시, `.`/`..` 세그먼트는 오류로 거부합니다.
빌드 시 결정되는 값이므로 배포 경로를 바꾸면 다시 빌드해야 합니다.

`ALLOWED_HOSTS`는 쉼표로 나누고 공백과 빈 항목을 제거합니다. 생략하면 Vite 기본 로컬 호스트 제한을 유지합니다.
`FRONTEND_PORT`는 상위 `dev.mjs`만 읽습니다. 단독 실행 포트는 `npm run dev -- --port 5174 --strictPort`로 지정합니다.

## 공개 경로 규칙

`src/lib/app-path.ts`의 `appPath('/login')`처럼 접두사 없는 앱 경로를 전달합니다.
공식 [`resolve`](https://svelte.dev/docs/kit/$app-paths#resolve)를 사용하며 `paths.relative: false`로 SSR과 브라우저에서 절대 공개 경로를 만듭니다.
홈은 루트 배포에서 `/`, 접두사 배포에서 해당 접두사를 반환합니다. 쿼리와 동적 레시피 경로도 지원합니다.
외부 URL, `mailto:`, `tel:`, 해시 및 상대 링크는 그대로 반환합니다.

이미 공개 경로인 `page.url.pathname`은 다시 감싸지 않습니다. 검색 폼·페이지 이동·초기화가 여기에 해당합니다.
`api('/food')`처럼 API 함수에 주는 경로는 백엔드 상대 경로이며, 함수 안에서 공개 `/api` 경로를 만듭니다.
프록시 내부의 BACKEND_URL 기준 URL 생성과 Express 라우트에는 접두사를 붙이지 않습니다.

## 배포

nginx는 접두사를 보존해 SvelteKit에 전달해야 합니다. 기본 `trailingSlash: 'never'`를 유지합니다.
현재 adapter-auto를 사용합니다. Raspberry Pi 등 일반 Node 서버의 운영 배포에는 adapter-node 같은 적합한 어댑터가 필요합니다.
`npm run preview`는 로컬 빌드 확인용이며 Vite 개발 서버도 권장 운영 서버가 아닙니다.

전체 환경 변수, nginx/systemd 예시 및 업데이트 순서는 상위 YoriWiki README를 참고하세요.
