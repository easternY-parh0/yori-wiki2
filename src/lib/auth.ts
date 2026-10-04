import { api } from './api';
export type User = { id: number; email: string; nickname: string; role: 'user' | 'admin' | 'super_admin' };
export const authPost = <T>(path: string, body: object) => api<T>(`/auth/${path}`, {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body)
});

export const isAdmin = (user: User | null | undefined) => user?.role === 'admin' || user?.role === 'super_admin';
