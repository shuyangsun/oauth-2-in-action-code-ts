import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { AuthServerConfig, ClientConfig } from 'shared/model/server-configs';
import { AuthServerHome } from 'shared/components/auth-server/AuthServerHome';
import { ErrorPage } from 'shared/components/common/Error';
import { Approve } from 'shared/components/auth-server/Approve';
import { DbRecordCh3Ex2, DbSchemaCh3Ex2 } from 'shared/model/db-schema';
import { JSONFilePreset } from 'lowdb/node';
import { generateRandomString } from 'shared/util/util';
import { checkError } from 'shared/middleware/error';

const oauthEntity = 'auth_server';

const app = new Hono();
app.onError(async (err, c) => {
  return c.html(<ErrorPage {...{ oauthEntity, error: err.message }} />);
});
app.use('/*', checkError(oauthEntity));

app.use('/client-scripts/*', serveStatic({ root: '../../packages/shared' }));

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

app.get('/', (c) => {
  return c.html(
    <AuthServerHome
      pageTitle="ch-4-ex-1"
      authServerConfig={authServer}
      clientsConfig={clients}
    />,
  );
});

app.get('/authorize', (c) => {
  const clientId = c.req.query('client_id');
  const redirectUri = c.req.query('redirect_uri');
  const client = getClientConfig(clientId);

  if (!client) {
    throw new Error(clientId ? `Unknown client "${clientId}"` : 'No client ID');
  } else if (!redirectUri || !client.redirectUris.includes(redirectUri)) {
    throw new Error(
      `Mismatched redirect URI, expected ${client.redirectUris.join(', ')} got ${redirectUri}`,
    );
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
        {...{
          pageTitle: 'ch-4-ex-1',
          clientConfig: client,
          requestId: reqid,
          scopes: reqScopes,
        }}
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
    throw new Error('No matching authorization request');
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

const nosql = await JSONFilePreset<DbSchemaCh3Ex2>('database.nosql.json', {
  records: [],
});

async function issueNewTokens(
  clientId: string,
  scope?: string,
): Promise<DbRecordCh3Ex2> {
  const accessToken = generateRandomString(16);
  const refreshToken = generateRandomString(16);
  const createdTime = new Date();
  // Access token expires after 3 seconds.
  const accessTokenExpires = new Date(createdTime.getTime() + 3000);
  // Refresh token expires after one minute.
  const refreshTokenExpires = new Date(createdTime.getTime() + 60000);
  const record = {
    client_id: clientId,
    refresh_token: {
      token: refreshToken,
      created: createdTime,
      expires: refreshTokenExpires,
    },
    access_token: {
      token: accessToken,
      created: createdTime,
      expires: accessTokenExpires,
    },
    scope: scope,
  };

  // Remove the old refresh token first.
  await nosql.update(
    (data) =>
      (data.records = data.records.filter(
        (record) =>
          !(
            record.client_id === clientId &&
            record.refresh_token.token === refreshToken
          ),
      )),
  );
  await nosql.update(({ records }) => records.push(record));
  await nosql.write();
  console.log(
    `Issuing access token ${record.access_token.token}, expires at ${record.access_token.expires}`,
  );
  console.log(
    `        refresh token ${record.refresh_token.token}, expires at ${record.refresh_token.expires}`,
  );
  if (scope) {
    console.log(`with scope ${scope}`);
  }
  return record;
}

function tokenResponseFromRecord(record: DbRecordCh3Ex2) {
  return {
    access_token: record.access_token.token,
    refresh_token: record.refresh_token.token,
    token_type: 'Bearer',
    scope: record.scope,
  };
}

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
  if (!clientId || !client) {
    console.log(`Unknown client ${clientId}`);
    return c.json({ error: 'invalid_client' }, 401);
  }

  if (client.clientSecret != clientSecret) {
    console.log(
      `Mismatched client secret, expected ${client.clientSecret} got ${clientSecret}`,
    );
    return c.json({ error: 'invalid_client' }, 401);
  }

  const grantType = body.grant_type as string;
  if (grantType === 'authorization_code') {
    const code = codes[body.code as string];
    if (!code) {
      console.log(`Unknown code ${body.code as string}`);
      return c.json({ error: 'invalid_grant' }, 400);
    }

    delete codes[body.code as string]; // burn our code, it's been used

    if (code.authorizationEndpointRequest.client_id !== clientId) {
      console.log(
        `Client mismatch, expected ${code.authorizationEndpointRequest.client_id} got ${clientId}`,
      );
      return c.json({ error: 'invalid_grant' }, 400);
    }

    const cscope = code.scope?.join(' ');
    const record = await issueNewTokens(clientId, cscope);

    console.log(`Issued tokens for code ${body.code as string}`);
    return c.json(tokenResponseFromRecord(record));
  } else if (grantType === 'refresh_token') {
    const refreshToken = body.refresh_token;
    if (!refreshToken) {
      console.log('No refresh token found.');
      return c.json({ error: 'no_refresh_token' }, 400);
    }
    await nosql.read();
    const match = nosql.data.records.find(
      (record) =>
        record.client_id === clientId &&
        record.refresh_token.token === refreshToken,
    );
    if (!match) {
      console.log('Could not find matching refresh token.');
      return c.json({ error: 'no_match_refresh_token' });
    }
    if (new Date(match.refresh_token.expires) < new Date()) {
      console.log('Refresh token expired.');
      return c.json({ error: 'expired_refresh_token' });
    }
    const record = await issueNewTokens(clientId, match.scope);

    console.log('Issued refresh token');
    return c.json(tokenResponseFromRecord(record));
  } else {
    console.log(`Unknown grant type ${body.grant_type as string}`);
    return c.json({ error: 'unsupported_grant_type' }, 400);
  }
});

app.get('/ping', (c) => {
  return c.text('pong');
});

// clear the database on startup
await nosql.update((db) => (db.records = []));
await nosql.write();

export default app;
