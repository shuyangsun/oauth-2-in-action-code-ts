import type { FC } from 'hono/jsx';
import { Layout } from 'shared/Layout';
import { Navbar } from 'shared/Navbar';

export const ProtectedResourceHome: FC = () => {
  return (
    <Layout>
      <Navbar name="OAuth Protected Resource" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
          <div className="space-y-4">
            <div className="text-gray-300 text-lg">
              <p className="mb-4">
                To access the resource, send a{' '}
                <code className="bg-gray-900 text-red-400 px-2 py-1 rounded font-mono text-sm border border-gray-600">
                  POST
                </code>{' '}
                request to
              </p>
              <div className="flex items-center space-x-3">
                <span>endpoint</span>
                <span className="font-mono text-sm px-3 py-1 rounded bg-gray-900 text-red-400 border border-gray-600">
                  http://localhost:9002/resource
                </span>
              </div>
              <p className="mt-4 text-gray-400">
                Make sure to include a valid OAuth token in your request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
