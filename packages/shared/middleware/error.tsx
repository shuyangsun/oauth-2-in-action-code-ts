import { Context, MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';
import { ErrorPage } from '../components/common/Error';

async function getReqErrorMessage(c: Context): Promise<string | undefined> {
  const error =
    c.req.query('error') ?? ((await c.req.parseBody()).error as string);
  if (error) {
    return typeof error === 'string' ? error : 'unknown_error';
  }
  return undefined;
}

export function checkError(pageName: string): MiddlewareHandler {
  return createMiddleware(async (c, next) => {
    const error = await getReqErrorMessage(c);

    if (error) {
      return c.html(<ErrorPage {...{ pageName, error }} />);
    }

    await next();
  });
}
