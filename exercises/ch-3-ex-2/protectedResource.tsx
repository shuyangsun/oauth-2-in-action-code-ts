import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { createMiddleware } from 'hono/factory';
import { ProtectedResourceHome } from 'shared/components/protected-resource/ProtectedResourceHome';
import { DbSchemaCh3Ex2 } from 'shared/model/db-schema';
import { JSONFilePreset } from 'lowdb/node';

// Define the type for context variables
type Variables = {
  accessToken: string;
};

const resource = {
  name: 'Protected Resource',
  description: 'This data has been protected by OAuth 2.0',
};

const app = new Hono<{ Variables: Variables }>();

app.use('/client-scripts/*', serveStatic({ root: '../../packages/shared' }));

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

const nosql = await JSONFilePreset<DbSchemaCh3Ex2>('database.nosql.json', {
  records: [],
});

app.post('/resource', getAccessToken, async (c) => {
  const accessToken = c.get('accessToken');
  if (!accessToken) {
    return c.json({ error: 'no_access_token' }, 400);
  }
  await nosql.read();
  const record = nosql.data.records.find(
    (record) => record.access_token.token === accessToken,
  );
  if (!record) {
    return c.json({ error: 'no_matching_access_token' }, 400);
  }
  if (new Date(record.access_token.expires) < new Date()) {
    return c.json({ error: 'access_token_expired' }, 400);
  }
  return c.json({
    data: resource,
  });
});

export default app;
