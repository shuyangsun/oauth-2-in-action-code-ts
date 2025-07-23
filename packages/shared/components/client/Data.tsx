import type { FC } from 'hono/jsx';
import { Layout } from '../common/Layout';
import { Navbar } from '../common/Navbar';
import { getTheme } from '../common/theme';

interface Props {
  name?: string;
  description?: string;
}

export const Data: FC<Props> = (props: Props) => {
  const t = getTheme('client');
  return (
    <Layout oauthEntity="client">
      <Navbar oauthEntity="client" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div
          className={`bg-${t.mainBg} rounded-lg shadow-xl p-8 space-y-6 border border-${t.mainBorder}`}
        >
          <div className="space-y-4">
            <h2 className={`text-${t.labelText} text-xl font-semibold mb-4`}>
              Data from protected resource:
            </h2>

            <div className="mt-6">
              <pre
                className={`bg-${t.codeInlineBg} text-${t.codeBlockText} p-4 rounded-md border border-${t.codeInlineBorder} overflow-x-auto text-sm font-mono`}
              >
                {JSON.stringify(props, null, 2)}
              </pre>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <a
              href="/"
              className={`bg-${t.primaryButtonBg} border-2 border-${t.primaryButtonBorder} text-${t.primaryButtonText} font-medium py-3 px-6 rounded-md text-center hover:bg-${t.primaryButtonBgHover} hover:border-${t.primaryButtonBorderHover} transition-colors shadow-lg`}
            >
              Back to Client Home
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};
