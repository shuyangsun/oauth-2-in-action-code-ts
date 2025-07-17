import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import {
  AuthServerConfig,
  ClientConfig,
} from './files/shared/model/server-configs';
import { AuthServerHome } from './files/auth-server/AuthServerHome';
import { ErrorPage } from './files/shared/Error';
import { Approve } from './files/auth-server/Approve';
import { load } from '../src/files/shared/nosql';

const app = new Hono();

// Authorization server information
const authServer: AuthServerConfig = {
  authorizationEndpoint: 'http://localhost:9001/authorize',
  tokenEndpoint: 'http://localhost:9001/token',
};

// Client information
const clients: ClientConfig[] = [
  {
    clientId: 'oauth-client-1',
    clientSecret: 'oauth-client-secret-1',
    redirectUris: ['http://localhost:9000/callback'],
    scope: 'foo bar',
  },
];

const codes: Record<
  string,
  {
    authorizationEndpointRequest: Record<string, string>;
    scope: string[] | undefined;
    user: string;
  }
> = {};

const requests: Record<string, Record<string, string>> = {};

function getClientConfig(
  clientId: string | undefined,
): ClientConfig | undefined {
  if (!clientId) {
    return undefined;
  }
  return clients.find((client) => client.clientId === clientId);
}

app.use('/files/*', serveStatic({ root: './src' }));

app.get('/', (c) => {
  return c.html(
    <AuthServerHome authServerConfig={authServer} clientsConfig={clients} />,
  );
});

app.get('/authorize', (c) => {
  const clientId = c.req.query('client_id');
  const redirectUri = c.req.query('redirect_uri');
  const client = getClientConfig(clientId);

  if (!client) {
    const error = clientId ? `Unknown client "${clientId}"` : 'No client ID';
    console.log(error);
    return c.html(<ErrorPage error={error} />, 400);
  } else if (!redirectUri || !client.redirectUris.includes(redirectUri)) {
    const error = `Mismatched redirect URI, expected ${client.redirectUris.join(', ')} got ${redirectUri}`;
    console.log(error);
    return c.html(<ErrorPage error={error} />, 400);
  } else {
    const reqScope = c.req.query('scope');
    const reqScopes = reqScope ? reqScope.split(' ') : undefined;
    const clienScopes = client.scope ? client.scope.split(' ') : undefined;
    if (
      reqScopes &&
      clienScopes &&
      reqScopes.some((scope) => !clienScopes.includes(scope))
    ) {
      // client asked for a scope it couldn't have
      const url = new URL(redirectUri);
      url.search = '';
      url.searchParams.set('error', 'invalid_scope');
      return c.redirect(url.toString());
    }

    const reqid = Math.random().toString(36).substring(2, 10);

    requests[reqid] = c.req.query();

    return c.html(
      <Approve
        {...{ clientConfig: client, requestId: reqid, scopes: reqScopes }}
      />,
    );
  }
});

app.post('/approve', async (c) => {
  const body = await c.req.parseBody();
  const reqid = body.reqid as string;
  const query = requests[reqid];
  delete requests[reqid];

  if (!query) {
    // there was no matching saved request, this is a server error
    return c.html(<ErrorPage error="No matching authorization request" />, 500);
  }

  const url = new URL(query.redirect_uri);
  url.search = '';
  if (body.approve !== 'true') {
    // User denied acccess
    url.searchParams.set('error', 'access_denied');
    return c.redirect(url.toString());
  }

  // User approved access
  if (query.response_type == 'code') {
    // user approved access
    const code = Math.random().toString(36).substring(2, 10);

    const user = body.user as string;
    const approvedScopes = Object.keys(body)
      .filter((key) => key.startsWith('scope_'))
      .map((key) => key.slice('scope_'.length));
    const client = getClientConfig(query.client_id);

    const clienScopes = client?.scope ? client.scope.split(' ') : undefined;
    if (
      approvedScopes &&
      clienScopes &&
      approvedScopes.some((scope) => !clienScopes.includes(scope))
    ) {
      // client asked for a scope it couldn't have
      url.searchParams.set('error', 'invalid_scope');
      return c.redirect(url.toString());
    }

    // save the code and request for later
    codes[code] = {
      authorizationEndpointRequest: query,
      scope: approvedScopes,
      user: user,
    };

    url.searchParams.set('code', code);
    if (query.state) {
      url.searchParams.set('state', query.state);
    }
    return c.redirect(url.toString());
  } else {
    // we got a response type we don't understand
    url.searchParams.set('error', 'unsupported_response_type');
    return c.redirect(url.toString());
  }
});

const nosql = load('database.nosql', { autoSave: true });

app.post('/token', async (c) => {
  const auth = c.req.header('authorization');
  const body = await c.req.parseBody();
  let clientId: string | undefined = undefined;
  let clientSecret: string | undefined = undefined;
  if (auth) {
    // check the auth header
    const clientCredentials = atob(auth.slice('Basic '.length)).split(':');
    clientId = decodeURIComponent(clientCredentials[0]);
    clientSecret = decodeURIComponent(clientCredentials[1]);
  } else {
    // otherwise, check the post body
    if (body.client_id) {
      if (clientId) {
        // if we've already seen the client's credentials in the authorization header, this is an error
        console.log('Client attempted to authenticate with multiple methods');
        return c.json({ error: 'invalid_client' }, 401);
      }

      clientId = body.client_id as string;
      clientSecret = body.client_secret as string;
    }
  }

  const client = getClientConfig(clientId);
  if (!client) {
    console.log('Unknown client %s', clientId);
    return c.json({ error: 'invalid_client' }, 401);
  }

  if (client.clientSecret != clientSecret) {
    console.log(
      'Mismatched client secret, expected %s got %s',
      client.clientSecret,
      clientSecret,
    );
    return c.json({ error: 'invalid_client' }, 401);
  }

  const grantType = body.grant_type as string;
  if (grantType === 'authorization_code') {
    const code = codes[body.code as string];

    if (code) {
      delete codes[body.code as string]; // burn our code, it's been used
      if (code.authorizationEndpointRequest.client_id == clientId) {
        const accessToken = Math.random().toString(36).substring(2, 10);

        let cscope: string[] | undefined = undefined;
        if (code.scope) {
          cscope = code.scope;
        }

        nosql.insert({
          access_token: accessToken,
          client_id: clientId,
          scope: cscope,
        });

        console.log('Issuing access token %s', accessToken);
        console.log('with scope %s', cscope);

        const token_response = {
          access_token: accessToken,
          token_type: 'Bearer',
          scope: cscope,
        };

        console.log('Issued tokens for code %s', body.code as string);
        return c.json(token_response);
      } else {
        console.log(
          'Client mismatch, expected %s got %s',
          code.authorizationEndpointRequest.client_id,
          clientId,
        );
        return c.json({ error: 'invalid_grant' }, 400);
      }
    } else {
      console.log('Unknown code, %s', body.code as string);
      return c.json({ error: 'invalid_grant' }, 400);
    }
  } else {
    console.log('Unknown grant type %s', body.grant_type as string);
    return c.json({ error: 'unsupported_grant_type' }, 400);
  }
});

app.get('/ping', (c) => {
  return c.text('pong');
});

// clear the database on startup
nosql.clear();

export default app;
