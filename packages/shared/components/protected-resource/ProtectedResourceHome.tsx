import type { FC } from 'hono/jsx';
import { Layout } from '../common/Layout';
import { Navbar } from '../common/navbar/Navbar';
import { getTheme } from '../common/theme';
import { InlineCopy } from '../common/code/InlineCopy';

export const ProtectedResourceHome: FC = () => {
  const t = getTheme('protected_resource');
  return (
    <Layout oauthEntity="protected_resource">
      <Navbar oauthEntity="protected_resource" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div
          className={`bg-${t.mainBg} rounded-lg shadow-xl p-8 space-y-6 border border-${t.mainBorder}`}
        >
          <div className="space-y-4">
            <div className={`text-${t.labelText} text-lg`}>
              <p className="mb-4">
                To access the resource, send a{' '}
                <code
                  className={`bg-${t.codeInlineBg} text-${t.codeInlineText} px-2 py-1 rounded font-mono text-sm border border-${t.codeInlineBorder}`}
                >
                  POST
                </code>{' '}
                request to
              </p>
              <div className="flex items-center space-x-3">
                <span>endpoint</span>
                <InlineCopy value="http://localhost:9002/resource" />
              </div>
              <p className={`mt-4 text-${t.iconText}`}>
                Make sure to include a valid OAuth token in your request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
