import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import {
  AuthServerConfig,
  ClientConfig,
} from './files/shared/model/server-configs';
import { AuthServerHome } from './files/auth-server/AuthServerHome';
import { ErrorPage } from './files/shared/Error';
import { Approve } from './files/auth-server/Approve';

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

// const codes: Record<
//   string,
//   {
//     authorizationEndpointRequest: string;
//     scope: string;
//     user: string;
//   }
// > = {};

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
    return c.html(<ErrorPage error={error} />);
  } else if (!redirectUri || !client.redirectUris.includes(redirectUri)) {
    const error = `Mismatched redirect URI, expected ${client.redirectUris.join(', ')} got ${redirectUri}`;
    console.log(error);
    return c.html(<ErrorPage error={error} />);
  } else {
    const reqScope = c.req.query('scope');
    const rscope = reqScope ? reqScope.split(' ') : undefined;
    const cscope = client.scope ? client.scope.split(' ') : undefined;
    if (rscope && cscope && rscope.some((scope) => !cscope.includes(scope))) {
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
        {...{ clientConfig: client, requestId: reqid, scopes: rscope }}
      />,
    );
  }
});

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
