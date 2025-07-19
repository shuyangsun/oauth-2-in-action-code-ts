import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { ProtectedResourceHome } from 'shared/components/protected-resource/ProtectedResourceHome';
import { getAccessToken } from 'shared/middleware/oauth2-0';

// Define the type for context variables
type Variables = {
  accessToken: string;
};

const resource = {
  name: 'Protected Resource',
  description: 'This data has been protected by OAuth 2.0',
};

const app = new Hono<{ Variables: Variables }>();

app.use('/client-scripts/*', serveStatic({ root: '../../packages/shared' }));

app.get('/', (c) => {
  return c.html(<ProtectedResourceHome />);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

app.post('/resource', getAccessToken, (c) => {
  const accessToken = c.get('accessToken');
  if (accessToken) {
    return c.json({
      data: resource,
    });
  } else {
    return c.json({ error: 'no_access_token' }, 400);
  }
});

export default app;
