import { api } from './api';
export type User = { id: number; email: string; nickname: string };
export const authPost = <T>(path: string, body: object) => api<T>(`/auth/${path}`, {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body)
});
