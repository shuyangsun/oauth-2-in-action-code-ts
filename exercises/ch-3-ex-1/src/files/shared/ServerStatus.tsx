import { FC } from 'hono/jsx';

export const ServerStatus: FC = () => {
  const clientOnline = true;
  const authServerOnline = true;
  const protectedResourceOnline = true;
  return (
    <div className="flex items-center space-x-5">
      <div className="flex items-center space-x-1.5">
        <span className="text-gray-300 text-lg">Client</span>
        <span
          className={`w-3 h-3 rounded-full ${clientOnline ? 'bg-green-500' : 'bg-red-500'}`}
        ></span>
      </div>
      <div className="flex items-center space-x-1.5">
        <span className="text-gray-300 text-lg">Auth Server</span>
        <span
          className={`w-3 h-3 rounded-full ${authServerOnline ? 'bg-green-500' : 'bg-red-500'}`}
        ></span>
      </div>
      <div className="flex items-center space-x-1.5">
        <span className="text-gray-300 text-lg">Resource Server</span>
        <span
          className={`w-3 h-3 rounded-full ${protectedResourceOnline ? 'bg-green-500' : 'bg-red-500'}`}
        ></span>
      </div>
    </div>
  );
};
