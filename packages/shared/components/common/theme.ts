import { OAuthEntity } from './oauth-entities';

export type Theme = {
  navBg: string;
  navBorder: string;
  navText: string;
  navHomeLinkText: string;
  navHomeLinkBg: string;
  navHomeLinkBgHover: string;
  mainBg: string;
  mainBorder: string;
  labelText: string;
  tokenBg: string;
  tokenText: string;
  tokenBorder: string;
  tokenNoneBg: string;
  tokenNoneText: string;
  primaryButtonBg: string;
  primaryButtonBorder: string;
  primaryButtonText: string;
  primaryButtonBgHover: string;
  primaryButtonBorderHover: string;
  secondaryButtonBg: string;
  secondaryButtonBorder: string;
  secondaryButtonText: string;
  secondaryButtonBgHover: string;
  secondaryButtonBorderHover: string;
  codeText: string;
};

const defaultTheme: Theme = {
  navBg: 'slate-900',
  navBorder: 'slate-700',
  navText: 'gray-300',
  navHomeLinkText: 'white',
  navHomeLinkBg: 'blue-900',
  navHomeLinkBgHover: 'blue-800',
  mainBg: 'gray-800',
  mainBorder: 'gray-700',
  labelText: 'gray-300',
  tokenBg: 'gray-900',
  tokenText: 'red-400',
  tokenBorder: 'gray-600',
  tokenNoneBg: 'red-600',
  tokenNoneText: 'white',
  primaryButtonBg: 'blue-600',
  primaryButtonBorder: 'blue-500',
  primaryButtonText: 'white',
  primaryButtonBgHover: 'blue-700',
  primaryButtonBorderHover: 'blue-600',
  secondaryButtonBg: 'green-600',
  secondaryButtonBorder: 'green-500',
  secondaryButtonText: 'white',
  secondaryButtonBgHover: 'green-700',
  secondaryButtonBorderHover: 'green-600',
  codeText: 'green-400',
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
