import { FC } from 'hono/jsx';

export const ServerStatus: FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-5">
      <div className="flex items-center space-x-1.5">
        <span id="client-text" className="text-gray-300 text-lg">
          Client
        </span>
        <span
          id="client-status"
          className="w-3 h-3 rounded-full bg-red-500"
        ></span>
      </div>
      <div className="flex items-center space-x-1.5">
        <span id="auth-server-text" className="text-gray-300 text-lg">
          Authorization Server
        </span>
        <span
          id="auth-server-status"
          className="w-3 h-3 rounded-full bg-red-500"
        ></span>
      </div>
      <div className="flex items-center space-x-1.5">
        <span id="resource-server-text" className="text-gray-300 text-lg">
          Protected Resource
        </span>
        <span
          id="resource-server-status"
          className="w-3 h-3 rounded-full bg-red-500"
        ></span>
      </div>
      <script src="/client-scripts/server-status.js" type="module"></script>
    </div>
  );
};
