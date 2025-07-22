import type { FC } from 'hono/jsx';
import { Layout } from '../common/Layout';
import { Navbar } from '../common/Navbar';

interface Prop {
  accessToken?: string;
  refreshToken?: string;
  scope?: string;
}

export const Main: FC<Prop> = ({ accessToken, refreshToken }: Prop) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-gray-300 text-lg">Access token value:</span>
          <span
            className={`font-mono text-sm px-3 py-1 rounded ${accessToken ? 'bg-gray-900 text-red-400 border border-gray-600' : 'bg-red-600 text-white'}`}
          >
            {accessToken ?? 'NONE'}
          </span>
        </div>

        {refreshToken && (
          <div className="flex items-center space-x-3">
            <span className="text-gray-300 text-lg">Refresh token value:</span>
            <span
              className={`font-mono text-sm px-3 py-1 rounded ${refreshToken ? 'bg-gray-900 text-red-400 border border-gray-600' : 'bg-red-600 text-white'}`}
            >
              {accessToken ?? 'NONE'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <a
          href="/authorize"
          className="flex-1 bg-blue-600 border-2 border-blue-500 text-white font-medium py-3 px-6 rounded-md text-center hover:bg-blue-700 hover:border-blue-600 transition-colors shadow-lg"
        >
          Get OAuth Token
        </a>
        <a
          href="/fetch-resource"
          className="flex-1 font-medium py-3 px-6 rounded-md text-center transition-colors shadow-lg bg-green-600 border-2 border-green-500 text-white hover:bg-green-700 hover:border-green-600"
        >
          Get Protected Resource
        </a>
      </div>
    </div>
  );
};

export const ClientHome: FC<Prop> = (prop: Prop) => {
  return (
    <Layout>
      <Navbar oauthEntity="client" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Main {...prop} />
      </div>
    </Layout>
  );
};
