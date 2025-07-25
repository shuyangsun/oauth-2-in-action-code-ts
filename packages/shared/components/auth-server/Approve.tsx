import type { FC } from 'hono/jsx';
import { Layout } from '../common/Layout';
import { Navbar } from '../common/navbar/Navbar';
import { ClientConfig } from '../../model/server-configs';
import { getTheme } from '../common/theme';
import { InlineCopy } from '../common/code/InlineCopy';

interface Prop {
  pageTitle: string;
  clientConfig: ClientConfig;
  requestId: string;
  scopes: string[] | undefined;
}

const Scope: FC<{ scopes: string[] }> = ({ scopes }: { scopes: string[] }) => {
  const t = getTheme('auth_server');
  return (
    <div className="space-y-3">
      <p className={`text-${t.labelText} text-lg`}>
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
              className={`h-4 w-4 text-${t.checkboxText} focus:ring-${t.checkboxFocusRing} border-${t.checkboxBorder} rounded cursor-pointer`}
            />
            <label
              htmlFor={`scope_${scope}`}
              className={`text-${t.labelText} font-mono text-sm`}
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
  pageTitle,
  clientConfig,
  requestId,
  scopes,
}: Prop) => {
  const t = getTheme('auth_server');
  return (
    <Layout oauthEntity="auth_server">
      <Navbar pageTitle={pageTitle} oauthEntity="auth_server" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div
          className={`bg-${t.mainBg} rounded-lg shadow-xl p-8 space-y-6 border border-${t.mainBorder}`}
        >
          <form action="/approve" method="post">
            <input type="hidden" name="reqid" value={requestId} />

            <div className="space-y-4">
              <h2 className={`text-2xl font-bold text-${t.h2Text} mb-4`}>
                Approve this client?
              </h2>

              <div className="flex items-center space-x-3">
                <span className={`text-${t.labelText} text-lg`}>
                  Client ID:
                </span>
                <InlineCopy value={clientConfig.clientId} />
              </div>

              {scopes && <Scope scopes={scopes} />}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                type="submit"
                name="approve"
                value="true"
                className={`flex-1 bg-${t.yesButtonBg} border-2 border-${t.yesButtonBorder} text-${t.yesButtonText} font-medium py-3 px-6 rounded-md text-center hover:bg-${t.yesButtonBgHover} hover:border-${t.yesButtonBorderHover} transition-colors shadow-lg cursor-pointer`}
              >
                Approve
              </button>
              <button
                type="submit"
                name="approve"
                value="false"
                className={`flex-1 bg-${t.noButtonBg} border-2 border-${t.noButtonBorder} text-${t.noButtonText} font-medium py-3 px-6 rounded-md text-center hover:bg-${t.noButtonBgHover} hover:border-${t.noButtonBorderHover} transition-colors shadow-lg cursor-pointer`}
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
