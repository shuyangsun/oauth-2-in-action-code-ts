import type { FC } from 'hono/jsx';
import { getTheme } from './theme';
import { OAuthEntity } from './oauth-entities';

interface LayoutProps {
  oauthEntity: OAuthEntity;
  children: unknown;
}

export const Layout: FC<LayoutProps> = ({ oauthEntity, children }) => {
  const t = getTheme(oauthEntity);
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>OAuth in Action: OAuth Client</title>
        {/* Using Vite to link Tailwind CSS with Components in shared package is not working. */}
        {/* <link href="/src/style.css" rel="stylesheet" /> */}
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body className={`min-h-screen bg-${t.pageBg}`}>{children}</body>
    </html>
  );
};
