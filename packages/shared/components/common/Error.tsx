import type { FC } from 'hono/jsx';
import { Layout } from './Layout';
import { Navbar } from './navbar/Navbar';
import { OAuthEntity } from './oauth-entities';
import { getTheme } from './theme';

interface Props {
  oauthEntity: OAuthEntity;
  error?: string;
}

export const ErrorPage: FC<Props> = ({ oauthEntity, error }: Props) => {
  const t = getTheme(oauthEntity);
  return (
    <Layout oauthEntity={oauthEntity}>
      <Navbar {...{ oauthEntity }} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div
          className={`bg-${t.mainBg} rounded-lg shadow-xl p-8 space-y-6 border border-${t.mainBorder}`}
        >
          <h2 className={`text-2xl font-bold text-${t.h2Text} mb-4`}>Error</h2>
          <div className="space-y-3">
            <div
              className={`font-mono text-sm text-${t.errorText} px-3 py-1 mt-2`}
            >
              {error ?? 'An unknown error occurred :('}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <a
              href="/"
              className={`bg-${t.primaryButtonBg} border-2 border-${t.primaryButtonBorder} text-${t.primaryButtonText} font-medium py-3 px-6 rounded-md text-center hover:bg-${t.primaryButtonBgHover} hover:border-${t.primaryButtonBorderHover} transition-colors shadow-lg`}
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};
