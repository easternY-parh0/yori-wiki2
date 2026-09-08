import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const proxy: RequestHandler = async ({ params, url, request, fetch }) => {
  const path = params.path;
  if (!['test', 'food', 'food/rate', 'food/rating', 'explore', 'search', 'auth/signup', 'auth/check-email', 'auth/login', 'auth/me', 'auth/logout', 'auth/cooked'].includes(path)) {
    return new Response('API를 찾을 수 없습니다.', { status: 404 });
  }
  const target = new URL(`/${path}`, env.BACKEND_URL || 'http://127.0.0.1:8080');
  target.search = url.search;
  if (path.startsWith('auth/') && request.method !== 'GET') {
    if (request.headers.get('origin') !== url.origin) return new Response('허용되지 않은 요청입니다.', { status: 403 });
    if (!request.headers.get('content-type')?.startsWith('application/json')) return new Response('JSON 요청이 필요합니다.', { status: 415 });
  }
  try {
    const response = await fetch(target, {
      method: request.method,
      headers: { 'content-type': request.headers.get('content-type') || 'application/json', cookie: request.headers.get('cookie') || '' },
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.text(),
      signal: AbortSignal.timeout(10000)
    });
    const headers = new Headers({ 'content-type': response.headers.get('content-type') || 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
    for (const cookie of response.headers.getSetCookie()) headers.append('set-cookie', cookie);
    return new Response(response.body, {
      status: response.status,
      headers
    });
  } catch {
    return new Response('백엔드에 연결할 수 없습니다. 서버 실행 상태를 확인해주세요.', { status: 502 });
  }
};

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
