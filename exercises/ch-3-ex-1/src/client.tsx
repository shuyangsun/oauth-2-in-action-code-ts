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
  authorizationEndpoint: 'http://localhost:9001/authorize',
  tokenEndpoint: 'http://localhost:9001/token',
};

const client: ClientConfig = {
  clientId: '',
  clientSecret: '',
  redirectUris: ['http://localhost:9000/callback'],
  scope: undefined,
};

const protectedResource = 'http://localhost:9002/resource';
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

app.get('/callback', (c) => {
  /*
   * TODO: Parse the response from the authorization server and get a token
   */
  return c.html(
    <ErrorPage name={pageName} error={`/callback not implemented`} />,
  );
});

app.get('/fetch-resource', (c) => {
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
