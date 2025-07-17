import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello client!');
});

app.get('/ping', (c) => {
  return c.text('pong');
});

export default app;
