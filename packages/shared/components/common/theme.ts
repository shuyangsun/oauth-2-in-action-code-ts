import { OAuthEntity } from './oauth-entities';

export type Theme = {
  navBg: string;
  navBorder: string;
  navText: string;
  navHomeLinkText: string;
  navHomeLinkBg: string;
  navHomeLinkBgHover: string;
};

const defaultTheme: Theme = {
  navBg: 'slate-900',
  navBorder: 'slate-700',
  navText: 'gray-300',
  navHomeLinkText: 'white',
  navHomeLinkBg: 'blue-900',
  navHomeLinkBgHover: 'blue-800',
};

export function getTheme(entity: OAuthEntity): Theme {
  switch (entity) {
    case 'client':
      return defaultTheme;
    case 'auth_server':
      return defaultTheme;
    case 'protected_resource':
      return defaultTheme;
  }
  return defaultTheme;
}
