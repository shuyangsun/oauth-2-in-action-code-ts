import { Hono } from 'hono';
import { ClientHome } from './files/client/Index';

const app = new Hono();

app.get('/', (c) => {
  return c.html(<ClientHome accessToken={undefined} />);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
