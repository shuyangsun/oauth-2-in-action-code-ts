import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { ClientHome } from './files/client/ClientHome';

const app = new Hono();

app.use('/files/*', serveStatic({ root: './src' }));

app.get('/', (c) => {
  return c.html(<ClientHome accessToken={undefined} scope={undefined} />);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
