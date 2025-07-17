import type { FC } from 'hono/jsx';
import { Layout } from '../common/Layout';
import { Navbar } from '../common/Navbar';
import { ClientConfig } from '../../model/server-configs';

interface Prop {
  clientConfig: ClientConfig;
  requestId: string;
  scopes: string[] | undefined;
}

const Scope: FC<{ scopes: string[] }> = ({ scopes }: { scopes: string[] }) => {
  return (
    <div className="space-y-3">
      <p className="text-gray-300 text-lg">
        The client is requesting access to the following:
      </p>
      <ul className="space-y-2">
        {scopes.map((scope) => (
          <li key={scope} className="flex items-center space-x-3">
            <input
              type="checkbox"
              name={`scope_${scope}`}
              value="1"
              id={`scope_${scope}`}
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor={`scope_${scope}`}
              className="text-gray-300 font-mono text-sm"
            >
              {scope}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Approve: FC<Prop> = ({
  clientConfig,
  requestId,
  scopes,
}: Prop) => {
  return (
    <Layout>
      <Navbar name="OAuth Authorization Server" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
          <form action="/approve" method="post">
            <input type="hidden" name="reqid" value={requestId} />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                Approve this client?
              </h2>

              <div className="flex items-center space-x-3">
                <span className="text-gray-300 text-lg">Client ID:</span>
                <span className="font-mono text-sm px-3 py-1 rounded bg-gray-900 text-red-400 border border-gray-600">
                  {clientConfig.clientId}
                </span>
              </div>

              {scopes && <Scope scopes={scopes} />}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                type="submit"
                name="approve"
                value="true"
                className="flex-1 bg-green-600 border-2 border-green-500 text-white font-medium py-3 px-6 rounded-md text-center hover:bg-green-700 hover:border-green-600 transition-colors shadow-lg cursor-pointer"
              >
                Approve
              </button>
              <button
                type="submit"
                name="approve"
                value="false"
                className="flex-1 bg-red-600 border-2 border-red-500 text-white font-medium py-3 px-6 rounded-md text-center hover:bg-red-700 hover:border-red-600 transition-colors shadow-lg cursor-pointer"
              >
                Deny
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
