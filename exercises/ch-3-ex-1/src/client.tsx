import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { ClientHome } from './files/client/ClientHome';
import { ErrorPage } from './files/shared/Error';

/** TODO: uncomment this block as needed

import { buildUrl, encodeClientCredentials } from './files/shared/util';
import {
  AuthServerConfig,
  ClientConfig,
} from './files/shared/model/server-configs';

const authServer: AuthServerConfig = {
  authorizationEndpoint: 'TODO: assign endpoint',
  tokenEndpoint: 'TODO: assign endpoint',
};

const client: ClientConfig = {
  clientId: 'TODO: assign client ID',
  clientSecret: 'TODO: assign client secret',
  redirectUris: ['TODO: assign redirect URL'],
  scope: undefined,  // not needed for this exercise
};

const protectedResource = 'TODO: assign endpoint';

let state: string | undefined = undefined;
let access_token: string | undefined = undefined;

*/

const pageName = 'OAuth Client';

const app = new Hono();

app.use('/files/*', serveStatic({ root: './src' }));

app.get('/authorize', (c) => {
  /*
   * TODO: Send the user to the authorization server
   */
  return c.html(
    <ErrorPage name={pageName} error={`/authorize not implemented`} />,
  );
});

app.get('/callback', async (c) => {
  /*
   * TODO: Parse the response from the authorization server and get a token
   */
  return c.html(
    <ErrorPage name={pageName} error={`/callback not implemented`} />,
  );
});

app.get('/fetch-resource', async (c) => {
  /*
   * TODO: Use the access token to call the resource server
   */
  return c.html(
    <ErrorPage name={pageName} error={`/fetch-resource not implemented`} />,
  );
});

app.get('/', (c) => {
  return c.html(<ClientHome accessToken={undefined} scope={undefined} />);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
