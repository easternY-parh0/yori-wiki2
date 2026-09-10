import { resolve } from '$app/paths';
import type { Pathname } from '$app/types';

/** Convert an unprefixed application path to a public URL (SSR and browser).
 * Keep page.url.pathname as-is: it is already a public path.
 */
export function appPath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const resolved = resolve(path as Pathname);
  // The application uses SvelteKit's default trailingSlash = 'never'.
  return path === '/' ? resolved.replace(/\/$/, '') || '/' : resolved;
}
