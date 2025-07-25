import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory';
import { serveStatic } from '@hono/node-server/serve-static';
import { ProtectedResourceHome } from 'shared/components/protected-resource/ProtectedResourceHome';
import { checkError } from 'shared/middleware/error';
import { ErrorPage } from 'shared/components/common/Error';

/* TODO: uncomment this block as needed

import { DbSchemaCh3Ex2 } from 'shared/model/db-schema';
import { JSONFilePreset } from 'lowdb/node';

const resource = {
  name: 'Protected Resource',
  description: 'This data has been protected by OAuth 2.0',
};

const nosql = await JSONFilePreset<DbSchemaCh3Ex2>('database.nosql.json', {
  records: [],
});

*/

// Define the type for context variables
type Variables = {
  accessToken?: string;
};

const oauthEntity = 'protected_resource';

const app = new Hono<{ Variables: Variables }>();
app.onError(async (err, c) => {
  return c.html(<ErrorPage {...{ oauthEntity, error: err.message }} />);
});
app.use('/*', checkError(oauthEntity));

app.use('/client-scripts/*', serveStatic({ root: '../../packages/shared' }));

app.get('/', (c) => {
  return c.html(<ProtectedResourceHome pageTitle="ch-4-ex-1" />);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

const getAccessToken = createMiddleware(async (c, next) => {
  /*
   * TODO: Scan for an access token on the incoming request.
   */
  await next();
});

/*
 *  middleware ────────┐
 *                     ▼
 */
app.post('/resource', getAccessToken, async (c) => {
  /*
   * TODO: Check to see if the access token was found or not
   */
  c.json({ error: '/resource endpoint not implemented' });
});

export default app;
