export function buildUrl(
  base: string,
  options: Record<string, string>,
  hash?: string,
): string {
  const url = new URL(base);
  url.search = '';

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

export function generateRandomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getBearerToken(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }
  const bearerStart = 'bearer ';
  if (!value.toLowerCase().startsWith(bearerStart)) {
    return bearerStart;
  }
  const token = value.slice(bearerStart.length);
  if (!token) {
    return undefined;
  }
  return token;
}
