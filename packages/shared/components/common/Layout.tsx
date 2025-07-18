import type { FC } from 'hono/jsx';

export const Layout: FC = (props) => {
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
      <body className="min-h-screen bg-slate-800">{props.children}</body>
    </html>
  );
};
