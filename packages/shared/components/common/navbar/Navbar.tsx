import type { FC } from 'hono/jsx';
import { getOAuthEntityURI, OAuthEntity } from '../oauth-entities';
import { IconTitleWithStatus } from './IconTitleStatus';

interface Props {
  oauthEntity: OAuthEntity;
}

export const Navbar: FC<Props> = ({ oauthEntity }: Props) => {
  const entities: OAuthEntity[] = [
    'client',
    'auth_server',
    'protected_resource',
  ];

  return (
    <div className="flex items-center justify-center my-6">
      <nav className="bg-gray-800 rounded-full px-3 py-2 shadow-2xl">
        <ul className="flex items-center gap-2">
          {entities.map((entity) => {
            const active = entity === oauthEntity;

            return (
              <li key={entity}>
                <a
                  href={getOAuthEntityURI(entity)}
                  className={`
                    relative flex items-center gap-1 px-4 py-2.5 rounded-full
                    transition-all duration-300 ease-in-out
                    ${
                      active
                        ? 'bg-gray-900 text-white'
                        : 'bg-transparent text-gray-400 hover:text-gray-200 min-w-[48px]'
                    }
                  `}
                >
                  <IconTitleWithStatus {...{ entity, active, online: true }} />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <script src="/client-scripts/navbar-status-updater.js"></script>
    </div>
  );
};
