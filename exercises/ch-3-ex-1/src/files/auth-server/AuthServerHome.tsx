import type { FC } from 'hono/jsx';
import { Layout } from 'shared/Layout';
import { Navbar } from 'shared/Navbar';
import { AuthServerConfig, ClientConfig } from 'shared/model/server-configs';

interface Prop {
  authServerConfig: AuthServerConfig;
  clientsConfig: ClientConfig[];
}

const AuthServerInfo: FC<{ config: AuthServerConfig }> = ({
  config,
}: {
  config: AuthServerConfig;
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">
        Authorization Server Information
      </h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-gray-300 text-sm">Authorization endpoint:</span>
          <span className="font-mono text-sm text-red-400 bg-gray-900 px-3 py-1 break-all rounded border border-gray-600">
            {config.authorizationEndpoint}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-300 text-sm">Token endpoint:</span>
          <span className="font-mono text-sm text-red-400 bg-gray-900 px-3 py-1 break-all rounded border border-gray-600">
            {config.tokenEndpoint}
          </span>
        </div>
      </div>
    </div>
  );
};

const ClientInfo: FC<{
  config: ClientConfig;
}> = ({ config }: { config: ClientConfig }) => {
  const clientId = `client-${config.clientId}`;

  return (
    <div
      className="bg-gray-700 rounded-md p-4 space-y-4"
      data-client={clientId}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onclick={`toggleClient('${clientId}')`}
      >
        <div className="flex items-center space-x-3">
          <span className="text-gray-300">Client ID:</span>
          <span className="font-mono text-sm text-red-400 bg-gray-900 px-3 py-1 rounded border border-gray-600">
            {config.clientId}
          </span>
        </div>
        <button
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle details"
        >
          <svg
            className="w-5 h-5 expand-icon cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <svg
            className="w-5 h-5 collapse-icon cursor-pointer hidden"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>

      <div className="client-details hidden space-y-4 pt-2">
        <div className="flex items-center space-x-3">
          <span className="text-gray-300">Client secret:</span>
          <span className="font-mono text-sm text-red-400 bg-gray-900 px-3 py-1 break-all rounded border border-gray-600">
            {config.clientSecret}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-300">Scope:</span>
          <span className="font-mono text-sm text-red-400 bg-gray-900 px-3 py-1 rounded border border-gray-600">
            {config.scope}
          </span>
        </div>
        <div className="space-y-2">
          <span className="text-gray-300">Redirect URIs:</span>
          <ul className="space-y-2 ml-4">
            {config.redirectUris.map((uri) => (
              <li
                key={uri}
                className="font-mono text-sm text-red-400 bg-gray-900 px-3 py-1 block break-all rounded border border-gray-600"
              >
                {uri}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ClientsInfo: FC<{ configs: ClientConfig[] }> = ({
  configs,
}: {
  configs: ClientConfig[];
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">
        Registered Clients Information
      </h2>
      <div className="space-y-4">
        {configs.map((config) => (
          <ClientInfo key={config.clientId} config={config} />
        ))}
      </div>
      <script src="/files/shared/toggle-card.js"></script>
    </div>
  );
};

export const AuthServerHome: FC<Prop> = ({
  authServerConfig,
  clientsConfig,
}: Prop) => {
  return (
    <Layout>
      <Navbar name="OAuth Authorization Server" />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <AuthServerInfo config={authServerConfig} />
        <ClientsInfo configs={clientsConfig} />
      </div>
    </Layout>
  );
};
