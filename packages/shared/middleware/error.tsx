import { Context, MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';
import { ErrorPage } from '../components/common/Error';
import { OAuthEntity } from '../components/common/oauth-entities';

async function getReqErrorMessage(c: Context): Promise<string | undefined> {
  const error =
    c.req.query('error') ?? ((await c.req.parseBody()).error as string);
  if (error) {
    return typeof error === 'string' ? error : 'unknown_error';
  }
  return undefined;
}

export function checkError(oauthEntity: OAuthEntity): MiddlewareHandler {
  return createMiddleware(async (c, next) => {
    const error = await getReqErrorMessage(c);

    if (error) {
      return c.html(<ErrorPage {...{ oauthEntity, error }} />);
    }

    await next();
  });
}
