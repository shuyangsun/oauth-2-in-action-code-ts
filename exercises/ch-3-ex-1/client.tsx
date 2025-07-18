import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { ClientHome } from 'shared/components/client/ClientHome';
import { ErrorPage } from 'shared/components/common/Error';
import { Data } from 'shared/components/client/Data';

/** TODO: uncomment this block as needed

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
  scope: undefined,  // not needed for this exercise
};

const protectedResource = 'TODO: assign endpoint';

let state: string | undefined = undefined;
let access_token: string | undefined = undefined;

*/

const pageName = 'OAuth Client';

const app = new Hono();

app.use('/client-scripts/*', serveStatic({ root: '../../packages/shared' }));

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
  return c.html(<Data name="TODO" description="Unimplemented" />);
});

app.get('/', (c) => {
  return c.html(<ClientHome accessToken={undefined} scope={undefined} />);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
