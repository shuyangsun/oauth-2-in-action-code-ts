import type { FC } from 'hono/jsx';

export const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/src/files/style.css" />
        <title>OAuth in Action: OAuth Client</title>
      </head>
      <body className="min-h-screen bg-slate-800">{props.children}</body>
    </html>
  );
};
