import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import {
  AuthServerConfig,
  ClientConfig,
} from './files/shared/model/server-configs';
import { AuthServerHome } from './files/auth-server/AuthServerHome';

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

app.use('/files/*', serveStatic({ root: './src' }));

app.get('/', (c) => {
  return c.html(
    <AuthServerHome authServerConfig={authServer} clientsConfig={clients} />,
  );
});

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
