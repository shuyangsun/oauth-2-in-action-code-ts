import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { ProtectedResourceHome } from 'shared/components/protected-resource/ProtectedResourceHome';
import { getAccessToken } from 'shared/middleware/oauth2-0';
import { checkError } from 'shared/middleware/error';
import { ErrorPage } from 'shared/components/common/Error';

// Define the type for context variables
type Variables = {
  accessToken: string;
};

const resource = {
  name: 'Protected Resource',
  description: 'This data has been protected by OAuth 2.0',
};

const oauthEntity = 'protected_resource';

const app = new Hono<{ Variables: Variables }>();
app.onError(async (err, c) => {
  return c.html(<ErrorPage {...{ oauthEntity, error: err.message }} />);
});
app.use('/*', checkError(oauthEntity));

app.use('/client-scripts/*', serveStatic({ root: '../../packages/shared' }));

app.get('/', (c) => {
  return c.html(<ProtectedResourceHome pageTitle="ch-3-ex-1" />);
});

app.get('/ping', (c) => {
  return c.text('pong');
});

app.post('/resource', getAccessToken, (c) => {
  const accessToken = c.var.accessToken;
  if (accessToken) {
    return c.json({
      data: resource,
    });
  } else {
    return c.json({ error: 'no_access_token' }, 400);
  }
});

export default app;
