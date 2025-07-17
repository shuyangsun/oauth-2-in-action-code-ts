import { FC } from 'hono/jsx';

export const ServerStatus: FC = () => {
  return (
    <div className="flex items-center space-x-5">
      <div className="flex items-center space-x-1.5">
        <span className="text-gray-300 text-lg">Client</span>
        <span
          id="client-status"
          className="w-3 h-3 rounded-full bg-red-500"
        ></span>
      </div>
      <div className="flex items-center space-x-1.5">
        <span className="text-gray-300 text-lg">Auth Server</span>
        <span
          id="auth-server-status"
          className="w-3 h-3 rounded-full bg-red-500"
        ></span>
      </div>
      <div className="flex items-center space-x-1.5">
        <span className="text-gray-300 text-lg">Resource Server</span>
        <span
          id="resource-server-status"
          className="w-3 h-3 rounded-full bg-red-500"
        ></span>
      </div>
      <script src="/files/shared/server-status.js" type="module"></script>
    </div>
  );
};
