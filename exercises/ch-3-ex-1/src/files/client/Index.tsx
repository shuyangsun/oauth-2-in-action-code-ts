import type { FC } from 'hono/jsx';

interface Props {
  accessToken: string | undefined;
}

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/src/files/style.css" rel="stylesheet" />
        <title>OAuth in Action: OAuth Client</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

export const ClientHome: FC<Props> = ({ accessToken }: Props) => {
  return (
    <Layout>
      <nav>
        <a href="/">
          OAuth in Action:
          <span>OAuth Client</span>
        </a>
      </nav>

      <div>
        <p>
          Access token value:
          <span>{accessToken ?? 'NONE'}</span>
        </p>
        <a href="/authorize">Get OAuth Token</a>
        <a href="/fetch_resource">Get Protected Resource</a>
      </div>
    </Layout>
  );
};
