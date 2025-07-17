import type { FC } from 'hono/jsx';
import { Layout } from 'shared/Layout';
import { Navbar } from 'shared/Navbar';

interface Prop {
  accessToken: string | undefined;
  scope: string | undefined;
}

export const Main: FC<Prop> = ({ accessToken, scope }: Prop) => {
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

        <div className="flex items-center space-x-3">
          <span className="text-gray-300 text-lg">Scope value:</span>
          <span
            className={`font-mono text-sm px-3 py-1 rounded ${scope ? 'bg-gray-900 text-red-400 border border-gray-600' : 'bg-red-600 text-white'}`}
          >
            {scope ?? 'NONE'}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <a
          href="/authorize"
          className="flex-1 bg-blue-600 border-2 border-blue-500 text-white font-medium py-3 px-6 rounded-md text-center hover:bg-blue-700 hover:border-blue-600 transition-colors shadow-lg"
        >
          Get OAuth Token
        </a>
        <a
          href={accessToken ? '/fetch-resource' : '#'}
          className={`flex-1 font-medium py-3 px-6 rounded-md text-center transition-colors shadow-lg ${
            accessToken
              ? 'bg-green-600 border-2 border-green-500 text-white hover:bg-green-700 hover:border-green-600'
              : 'bg-gray-500 border-2 border-gray-400 text-gray-300 cursor-not-allowed'
          }`}
          onClick={accessToken ? undefined : (e) => e.preventDefault()}
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
      <Navbar name="OAuth Client" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Main {...prop} />
      </div>
    </Layout>
  );
};
