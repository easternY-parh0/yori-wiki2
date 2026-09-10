/** @param {string} value */
export function normalizeBasePath(value = '') {
  if (value && (!value.startsWith('/') || /[?#\\\s]|\/\/|(?:^|\/)\.{1,2}(?:\/|$)/.test(value))) {
    throw new Error('BASE_PATH must be empty or an absolute URL path without query, hash, whitespace, or dot segments.');
  }
  return value.replace(/\/+$/, '');
}

/** @param {string | undefined} value */
export function parseAllowedHosts(value) {
  return value?.split(',').map(host => host.trim()).filter(Boolean);
}

// Process environment only: svelte-kit sync and Vite must use the same values.
export const basePath = normalizeBasePath(process.env.BASE_PATH);
export const allowedHosts = parseAllowedHosts(process.env.ALLOWED_HOSTS);
