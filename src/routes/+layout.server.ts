import { appPath } from '$lib/app-path';
import type { LayoutServerLoad } from './$types';
import type { User } from '$lib/auth';

export const load: LayoutServerLoad = async ({ fetch, depends }) => {
  depends('auth:user');
  const response = await fetch(appPath('/api/auth/me'));
  return { user: response.ok ? (await response.json()).user as User : null };
};
