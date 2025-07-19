import type { FC } from 'hono/jsx';
import { Layout } from './Layout';
import { Navbar } from './Navbar';

interface Props {
  pageName: string;
  error?: string;
}

export const ErrorPage: FC<Props> = ({ pageName, error }: Props) => {
  return (
    <Layout>
      <Navbar {...{ pageName }} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <div className="space-y-3">
            <div className="font-mono text-sm text-red-400 px-3 py-1 mt-2">
              {error ?? 'An unknown error occurred :('}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <a
              href="/"
              className="bg-blue-600 border-2 border-blue-500 text-white font-medium py-3 px-6 rounded-md text-center hover:bg-blue-700 hover:border-blue-600 transition-colors shadow-lg"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};
