import type { FC } from 'hono/jsx';
import { Layout } from '../common/Layout';
import { Navbar } from '../common/navbar/Navbar';
import { getTheme } from '../common/theme';
import { InlineCopy } from '../common/code/InlineCopy';

interface Prop {
  pageTitle: string;
  accessToken?: string;
  refreshToken?: string;
  scope?: string;
}

export const Main: FC<Prop> = ({ accessToken, refreshToken }: Prop) => {
  const t = getTheme('client');
  return (
    <div
      className={`bg-${t.mainBg} rounded-lg shadow-xl p-8 space-y-6 border border-${t.mainBorder}`}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className={`text-${t.labelText} text-lg`}>
            Access token value:
          </span>
          <InlineCopy value={accessToken} />
        </div>

        {refreshToken && (
          <div className="flex items-center space-x-3">
            <span className={`text-${t.labelText} text-lg`}>
              Refresh token value:
            </span>
            <InlineCopy value={refreshToken} />
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <a
          href="/authorize"
          className={`flex-1 bg-${t.primaryButtonBg} border-2 border-${t.primaryButtonBorder} text-${t.primaryButtonText} font-medium py-3 px-6 rounded-md text-center hover:bg-${t.primaryButtonBgHover} hover:border-${t.primaryButtonBorderHover} transition-colors shadow-lg`}
        >
          Get OAuth Token
        </a>
        <a
          href="/fetch-resource"
          className={`flex-1 font-medium py-3 px-6 rounded-md text-center transition-colors shadow-lg bg-${t.yesButtonBg} border-2 border-${t.yesButtonBorder} text-${t.yesButtonText} hover:bg-${t.yesButtonBgHover} hover:border-${t.yesButtonBorderHover}`}
        >
          Get Protected Resource
        </a>
      </div>
    </div>
  );
};

export const ClientHome: FC<Prop> = (prop: Prop) => {
  return (
    <Layout oauthEntity="client">
      <Navbar pageTitle={prop.pageTitle} oauthEntity="client" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Main {...prop} />
      </div>
    </Layout>
  );
};
