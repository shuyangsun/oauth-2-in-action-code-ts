import { ServerStatus } from '../shared/ServerStatus';
import type { FC } from 'hono/jsx';

interface Props {
  name: string;
}

export const Navbar: FC<Props> = ({ name }: Props) => {
  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="mx-auto px-6 md:px-16 lg:px-20 xl:px-32 py-4">
        <div className="flex items-center justify-between text-gray-300">
          <div className="inline-flex items-center space-x-2">
            <span className="text-xl font-light">OAuth in Action:</span>
            <a
              href="/"
              className="text-xl font-normal text-white bg-blue-900 px-3 py-1 rounded hover:bg-blue-800 transition-colors"
            >
              {name}
            </a>
          </div>
          <span>
            <ServerStatus />
          </span>
        </div>
      </div>
    </nav>
  );
};
