import { ServerStatus } from '../ServerStatus';
import type { FC } from 'hono/jsx';
import { getOAuthEntity, OAuthEntity } from '../oauth-entities';
import { getTheme } from '../theme';

interface Props {
  oauthEntity: OAuthEntity;
}

export const Navbar: FC<Props> = ({ oauthEntity }: Props) => {
  const pageName = getOAuthEntity(oauthEntity);
  const t = getTheme(oauthEntity);
  return (
    <nav className={`bg-${t.navBg} border-${t.navBorder} border-b`}>
      <div className="mx-auto px-6 md:px-16 lg:px-20 xl:px-32 py-4">
        <div
          className={`flex flex-col md:flex-row md:items-center md:justify-between text-${t.navText} space-y-3 md:space-y-0`}
        >
          <div className="flex flex-col md:inline-flex md:flex-row md:items-center space-y-2 md:space-y-0">
            <span className="text-xl font-light">
              OAuth in Action:
              <a
                href="/"
                className={`text-xl font-normal text-${t.navHomeLinkText} bg-${t.navHomeLinkBg} px-3 py-1 rounded hover:bg-${t.navHomeLinkBgHover} transition-colors self-start ml-2`}
              >
                {pageName}
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
