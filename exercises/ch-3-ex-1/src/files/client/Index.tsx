import type { FC } from 'hono/jsx';

interface Props {
  accessToken: string | undefined;
  scope: string | undefined;
}

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
        <title>OAuth in Action: OAuth Client</title>
      </head>
      <body className="min-h-screen bg-slate-800">{props.children}</body>
    </html>
  );
};

export const ClientHome: FC<Props> = ({ accessToken, scope }: Props) => {
  return (
    <Layout>
      <nav className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <a
            href="/"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <span className="text-xl font-light">OAuth in Action:</span>
            <span className="text-xl font-normal text-white bg-blue-600 px-3 py-1 rounded">
              OAuth Client
            </span>
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-200 rounded-lg shadow-lg p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-gray-600 text-lg">Access token value:</span>
              <span
                className={`font-mono text-sm px-3 py-1 rounded ${accessToken ? 'bg-red-500 text-white' : 'bg-red-500 text-white'}`}
              >
                {accessToken ?? 'NONE'}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-gray-600 text-lg">Scope value:</span>
              <span className="font-mono text-sm bg-red-500 text-white px-3 py-1 rounded">
                {scope ?? 'NONE'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="/authorize"
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-md text-center hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Get OAuth Token
            </a>
            <a
              href="/fetch_resource"
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-md text-center hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Get Protected Resource
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};
