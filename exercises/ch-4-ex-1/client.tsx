import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { ClientHome } from 'shared/components/client/ClientHome';
import { ErrorPage } from 'shared/components/common/Error';

import {
  buildUrl,
  encodeClientCredentials,
  generateRandomString,
} from 'shared/util/util';
import { AuthServerConfig, ClientConfig } from 'shared/model/server-configs';
import { Data } from 'shared/components/client/Data';
import { checkError } from 'shared/middleware/error';

const authServer: AuthServerConfig = {
  authorizationEndpoint: 'http://localhost:9001/authorize',
  tokenEndpoint: 'http://localhost:9001/token',
};

const client: ClientConfig = {
  clientId: 'oauth-client-1',
  clientSecret: 'oauth-client-secret-1',
  redirectUris: ['http://localhost:9000/callback'],
};

const protectedResource = 'http://localhost:9002/resource';

let state: string | undefined = undefined;
let accessToken: string | undefined = undefined;
let refreshToken: string | undefined = undefined;

const oauthEntity = 'client';

const app = new Hono();
app.onError(async (err, c) => {
  return c.html(<ErrorPage {...{ oauthEntity, error: err.message }} />);
});
app.use('/*', checkError(oauthEntity));

app.use('/client-scripts/*', serveStatic({ root: '../../packages/shared' }));

app.get('/authorize', (c) => {
  state = generateRandomString(8);
  const url = buildUrl(authServer.authorizationEndpoint, {
    response_type: 'code',
    client_id: client.clientId,
    redirect_uri: client.redirectUris[0],
    state: state,
  });
  return c.redirect(url);
});

app.get('/callback', async (c) => {
  const code = c.req.query('code');
  if (!code) {
    throw new Error('no authorization code from auth server');
  }

  const callbackState = c.req.query('state');
  if (callbackState !== state) {
    throw new Error('state mismatch');
  }
  state = undefined;

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
    throw new Error(responseJson.error);
  }
  accessToken = responseJson.access_token;
  if (!accessToken) {
    throw new Error('no access token from auth server');
  }
  refreshToken = responseJson.refresh_token;
  if (!refreshToken) {
    throw new Error('no refresh token from auth server');
  }
  if (responseJson.token_type !== 'Bearer') {
    throw new Error('unrecognized token type');
  }
  return c.redirect('/');
});

app.get('/fetch-resource', async (c) => {
  if (!accessToken) {
    throw new Error('no access token found');
  }
  const headers = {
    Authorization: 'Bearer ' + accessToken,
  };
  const response = await fetch(protectedResource, {
    method: 'POST',
    headers,
  });
  const responseJson = await response.json();
  if (responseJson.error && refreshToken) {
    const tokenApiHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        encodeClientCredentials(client.clientId, client.clientSecret),
    };
    const tokenApiFormData = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
    const tokenResponse = await fetch(authServer.tokenEndpoint, {
      method: 'POST',
      headers: tokenApiHeaders,
      body: new URLSearchParams(tokenApiFormData),
    });
    const respJson = await tokenResponse.json();
    if (respJson.access_token) {
      accessToken = respJson.access_token;
      if (respJson.refresh_token && respJson !== refreshToken) {
        refreshToken = respJson.refresh_token;
      }
      return c.redirect('/fetch-resource');
    }
    return c.redirect(`/?error=${encodeURIComponent(responseJson.error)}`);
  }

  return c.html(<Data pageTitle="ch-4-ex-1" {...responseJson.data} />);
});

app.get('/', async (c) => {
  return c.html(
    <ClientHome {...{ pageTitle: 'ch-4-ex-1', accessToken, refreshToken }} />,
  );
});

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
