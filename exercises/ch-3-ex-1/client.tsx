import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { ClientHome } from 'shared/components/client/ClientHome';
import { ErrorPage } from 'shared/components/common/Error';
import { checkError } from 'shared/middleware/error';

/** TODO: uncomment this block as needed

import { Data } from 'shared/components/client/Data';
import { buildUrl, encodeClientCredentials } from 'shared/util/util';
import { AuthServerConfig, ClientConfig } from 'shared/model/server-configs';

const authServer: AuthServerConfig = {
  authorizationEndpoint: 'TODO: assign endpoint',
  tokenEndpoint: 'TODO: assign endpoint',
};

const client: ClientConfig = {
  clientId: 'TODO: assign client ID',
  clientSecret: 'TODO: assign client secret',
  redirectUris: ['TODO: assign redirect URL'],
};

const protectedResource = 'TODO: assign endpoint';

const state: string | undefined = undefined;

*/

const accessToken: string | undefined = undefined;

const pageName = 'OAuth Client';

const app = new Hono();
app.onError(async (err, c) => {
  return c.html(<ErrorPage {...{ pageName, error: err.message }} />);
});

app.use('/*', checkError(pageName));

app.use('/client-scripts/*', serveStatic({ root: '../../packages/shared' }));

app.get('/authorize', (c) => {
  /*
   * TODO: Send the user to the authorization server
   *
   * Hint: return c.redirect(...);
   */
  throw new Error(`${new URL(c.req.url).pathname} not implemented`);
});

app.get('/callback', async (c) => {
  /*
   * TODO: Parse the response from the authorization server and get a token
   *
   * Hint: return c.redirect(...);
   */
  throw new Error(`${new URL(c.req.url).pathname} not implemented`);
});

app.get('/fetch-resource', async (c) => {
  /*
   * TODO: Use the access token to call the resource server
   *
   * Hint: return c.html(<Data {...response.data} />);
   */
  throw new Error(`${new URL(c.req.url).pathname} not implemented`);
});

app.get('/', async (c) => {
  return c.html(<ClientHome {...{ accessToken }} />);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
