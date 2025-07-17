export function buildUrl(
  base: string,
  options: Record<string, string>,
  hash?: string,
): string {
  const url = new URL(base);

  Object.entries(options).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  if (hash) {
    url.hash = hash;
  }

  return url.toString();
}

export function encodeClientCredentials(
  clientId: string,
  clientSecret: string,
): string {
  const credentials = `${encodeURIComponent(clientId)}:${encodeURIComponent(clientSecret)}`;
  return Buffer.from(credentials).toString('base64');
}
