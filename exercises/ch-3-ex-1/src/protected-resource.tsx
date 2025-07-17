import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { createMiddleware } from 'hono/factory';
import { ProtectedResourceHome } from 'shared/components/protected-resource/ProtectedResourceHome';

// Define the type for context variables
type Variables = {
  accessToken: string;
};

const resource = {
  name: 'Protected Resource',
  description: 'This data has been protected by OAuth 2.0',
};

const app = new Hono<{ Variables: Variables }>();

app.use('/files/*', serveStatic({ root: './src' }));

app.get('/', (c) => {
  return c.html(<ProtectedResourceHome />);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

const getAccessToken = createMiddleware(async (c, next) => {
  const auth = c.req.header('authorization');
  let accessToken: string | undefined = undefined;
  const bearerStart = 'bearer ';
  if (auth && auth.toLowerCase().startsWith(bearerStart)) {
    accessToken = auth.slice(bearerStart.length);
  }
  if (!accessToken) {
    const body = await c.req.parseBody();
    if (body.accessToken) {
      accessToken = body.accessToken as string;
    }
  }
  if (!accessToken) {
    accessToken = c.req.query('access_token');
  }
  c.set('accessToken', accessToken);
  await next();
});

app.post('/resource', getAccessToken, (c) => {
  const accessToken = c.get('accessToken');
  if (accessToken) {
    return c.json({
      data: resource,
    });
  } else {
    return c.json({ error: 'no access token' }, 400);
  }
});

export default app;
