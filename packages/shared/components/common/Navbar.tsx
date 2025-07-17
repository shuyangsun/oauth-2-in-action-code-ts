import { ServerStatus } from './ServerStatus';
import type { FC } from 'hono/jsx';

interface Props {
  name: string;
}

export const Navbar: FC<Props> = ({ name }: Props) => {
  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="mx-auto px-6 md:px-16 lg:px-20 xl:px-32 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-300 space-y-3 md:space-y-0">
          <div className="flex flex-col md:inline-flex md:flex-row md:items-center space-y-2 md:space-y-0">
            <span className="text-xl font-light">
              OAuth in Action:
              <a
                href="/"
                className="text-xl font-normal text-white bg-blue-900 px-3 py-1 rounded hover:bg-blue-800 transition-colors self-start ml-2"
              >
                {name}
              </a>
            </span>
          </div>
          <div className="md:inline">
            <ServerStatus />
          </div>
        </div>
      </div>
    </nav>
  );
};
