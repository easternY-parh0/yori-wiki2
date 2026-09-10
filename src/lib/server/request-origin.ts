/** The configured public origin is independent of BASE_PATH and proxy headers. */
export function expectedRequestOrigin(configured: string | undefined, fallback: string): string {
  if (!configured?.trim()) return fallback;
  const value = new URL(configured.trim());
  if (!['http:', 'https:'].includes(value.protocol) || value.username || value.password ||
      value.pathname !== '/' || value.search || value.hash) {
    throw new Error('PUBLIC_ORIGIN must contain only the HTTP(S) scheme, hostname and optional port.');
  }
  return value.origin;
}
