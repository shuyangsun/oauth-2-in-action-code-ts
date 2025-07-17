import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { ClientHome } from '../files/client/ClientHome';
import { ErrorPage } from 'shared/Error';

import { buildUrl, encodeClientCredentials } from 'shared/util';
import { AuthServerConfig, ClientConfig } from 'shared/model/server-configs';
import { Data } from '../files/client/Data';

const authServer: AuthServerConfig = {
  authorizationEndpoint: 'http://localhost:9001/authorize',
  tokenEndpoint: 'http://localhost:9001/token',
};

const client: ClientConfig = {
  clientId: 'oauth-client-1',
  clientSecret: 'oauth-client-secret-1',
  redirectUris: ['http://localhost:9000/callback'],
  scope: undefined, // not needed for this exercise
};

const protectedResource = 'http://localhost:9002/resource';

let state: string | undefined = undefined;
let accessToken: string | undefined = undefined;

const pageName = 'OAuth Client';

const app = new Hono();

app.use('/files/*', serveStatic({ root: './src' }));

app.get('/authorize', (c) => {
  state = Math.random().toString(36).substring(2, 10);
  const url = buildUrl(authServer.authorizationEndpoint, {
    response_type: 'code',
    client_id: client.clientId,
    redirect_uri: client.redirectUris[0],
    state: state,
  });
  return c.redirect(url);
});

app.get('/callback', async (c) => {
  const error = c.req.query('error');
  if (error) {
    return c.redirect(`/?error=${encodeURIComponent(error)}`);
  }
  const callbackState = c.req.query('state');
  if (callbackState !== state) {
    return c.redirect(`/?error=${encodeURIComponent('state mismatched')}`);
  }
  state = undefined;

  const code = c.req.query('code');
  if (!code) {
    return c.redirect(
      `/?error=${encodeURIComponent('no authorization code from auth server')}`,
    );
  }

  const tokenApiHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic ' + encodeClientCredentials(client.clientId, client.clientSecret),
  };
  const tokenApiFormData = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: client.redirectUris[0], // must include for security reasons
  };
  const tokenResponse = await fetch(authServer.tokenEndpoint, {
    method: 'POST',
    headers: tokenApiHeaders,
    body: new URLSearchParams(tokenApiFormData),
  });

  const responseJson = await tokenResponse.json();
  if (responseJson.error) {
    return c.redirect(`/?error=${encodeURIComponent(responseJson.error)}`);
  }
  accessToken = responseJson.access_token;
  if (!accessToken) {
    return c.redirect(
      `/?error=${encodeURIComponent('no access token from auth server')}`,
    );
  }
  if (responseJson.token_type !== 'Bearer') {
    return c.redirect(
      `/?error=${encodeURIComponent('unrecognized token type')}`,
    );
  }
  return c.html(<ClientHome accessToken={accessToken} scope={undefined} />);
});

app.get('/fetch-resource', async (c) => {
  if (!accessToken) {
    return c.redirect(`/?error=${encodeURIComponent('no access token found')}`);
  }
  const headers = {
    Authorization: 'Bearer ' + accessToken,
  };
  const response = await fetch(protectedResource, {
    method: 'POST',
    headers,
  });
  const responseJson = await response.json();
  if (responseJson.error) {
    return c.redirect(`/?error=${encodeURIComponent(responseJson.error)}`);
  }
  return c.html(<Data {...responseJson.data} />);
});

app.get('/', (c) => {
  const error = c.req.query('error');
  if (error) {
    return c.html(<ErrorPage name={pageName} error={error} />);
  }
  return c.html(<ClientHome accessToken={undefined} scope={undefined} />);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
