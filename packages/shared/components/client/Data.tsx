import type { FC } from 'hono/jsx';
import { Layout } from '../common/Layout';
import { Navbar } from '../common/Navbar';

interface Props {
  name: string | undefined;
  description: string | undefined;
}

export const Data: FC<Props> = (props: Props) => {
  return (
    <Layout>
      <Navbar name="OAuth Client" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
          <div className="space-y-4">
            <h2 className="text-gray-300 text-xl font-semibold mb-4">
              Data from protected resource:
            </h2>

            <div className="mt-6">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-md border border-gray-600 overflow-x-auto text-sm font-mono">
                {JSON.stringify(props, null, 2)}
              </pre>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <a
              href="/"
              className="bg-blue-600 border-2 border-blue-500 text-white font-medium py-3 px-6 rounded-md text-center hover:bg-blue-700 hover:border-blue-600 transition-colors shadow-lg"
            >
              Back to Client Home
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};
