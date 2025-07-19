import { createMiddleware } from 'hono/factory';
import { getBearerToken } from '../util/util';

export const getAccessToken = createMiddleware(async (c, next) => {
  if (c.req.query('access_token')) {
    c.set('error', 'tokens in URL query parameters are forbidden in OAuth 2.1');
    await next();
    return;
  }

  const accessToken =
    getBearerToken(c.req.header('authorization')) ??
    getBearerToken((await c.req.parseBody()).accessToken as string);

  c.set('accessToken', accessToken);
  await next();
});
