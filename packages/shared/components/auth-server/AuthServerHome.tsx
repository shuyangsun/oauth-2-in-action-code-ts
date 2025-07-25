import type { FC } from 'hono/jsx';
import { Layout } from '../common/Layout';
import { Navbar } from '../common/navbar/Navbar';
import { AuthServerConfig, ClientConfig } from '../../model/server-configs';
import { getTheme } from '../common/theme';
import { InlineCopy } from '../common/code/InlineCopy';

interface Prop {
  authServerConfig: AuthServerConfig;
  clientsConfig: ClientConfig[];
}

const AuthServerInfo: FC<{ config: AuthServerConfig }> = ({
  config,
}: {
  config: AuthServerConfig;
}) => {
  const t = getTheme('auth_server');
  return (
    <div
      className={`bg-${t.mainBg} rounded-lg shadow-xl p-8 space-y-6 border border-${t.mainBorder}`}
    >
      <h2 className={`text-2xl font-bold text-${t.h2Text} mb-4`}>
        Authorization Server Information
      </h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className={`text-${t.labelText} text-sm`}>
            Authorization endpoint:
          </span>
          <InlineCopy value={config.authorizationEndpoint} />
        </div>
        <div className="flex items-center space-x-3">
          <span className={`text-${t.labelText} text-sm`}>Token endpoint:</span>
          <InlineCopy value={config.tokenEndpoint} />
        </div>
      </div>
    </div>
  );
};

const ClientInfo: FC<{
  config: ClientConfig;
}> = ({ config }: { config: ClientConfig }) => {
  const clientId = `client-${config.clientId}`;
  const t = getTheme('auth_server');

  return (
    <div
      className={`bg-${t.cardBg} rounded-md p-4 space-y-4`}
      data-client={clientId}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onclick={`toggleClient('${clientId}')`}
      >
        <div className="flex items-center space-x-3">
          <span className={`text-${t.labelText}`}>Client ID:</span>
          <InlineCopy value={config.clientId} />
        </div>
        <button
          className={`text-${t.iconText} hover:text-${t.iconTextHover} transition-colors`}
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
          <span className={`text-${t.labelText}`}>Client secret:</span>
          <InlineCopy value={config.clientSecret} />
        </div>
        <div className="flex items-center space-x-3">
          <span className={`text-${t.labelText}`}>Scope:</span>
          <InlineCopy value={config.scope} />
        </div>
        <div className="space-y-2">
          <span className={`text-${t.labelText}`}>Redirect URIs:</span>
          <ul className="space-y-2 ml-4">
            {config.redirectUris.map((uri) => (
              <li key={uri}>
                <InlineCopy value={uri} />
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
  const t = getTheme('auth_server');
  return (
    <div
      className={`bg-${t.mainBg} rounded-lg shadow-xl p-8 space-y-6 border border-${t.mainBorder}`}
    >
      <h2 className={`text-2xl font-bold text-${t.h2Text} mb-4`}>
        Registered Clients Information
      </h2>
      <div className="space-y-4">
        {configs.map((config) => (
          <ClientInfo key={config.clientId} config={config} />
        ))}
      </div>
      <script src="/client-scripts/toggle-card.js"></script>
    </div>
  );
};

export const AuthServerHome: FC<Prop> = ({
  authServerConfig,
  clientsConfig,
}: Prop) => {
  return (
    <Layout oauthEntity="auth_server">
      <Navbar oauthEntity="auth_server" />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <AuthServerInfo config={authServerConfig} />
        <ClientsInfo configs={clientsConfig} />
      </div>
    </Layout>
  );
};
