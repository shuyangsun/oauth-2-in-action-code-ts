import { OAuthEntity } from './oauth-entities';

export type Theme = {
  pageBg: string;
  navBg: string;
  navBorder: string;
  navText: string;
  navHomeLinkText: string;
  navHomeLinkBg: string;
  navHomeLinkBgHover: string;
  mainBg: string;
  mainBorder: string;
  labelText: string;
  codeInlineBg: string;
  codeInlineText: string;
  codeInlineBorder: string;
  codeInlineNoneBg: string;
  codeInlineNoneText: string;
  primaryButtonBg: string;
  primaryButtonBorder: string;
  primaryButtonText: string;
  primaryButtonBgHover: string;
  primaryButtonBorderHover: string;
  yesButtonBg: string;
  yesButtonBorder: string;
  yesButtonText: string;
  yesButtonBgHover: string;
  yesButtonBorderHover: string;
  noButtonBg: string;
  noButtonBorder: string;
  noButtonText: string;
  noButtonBgHover: string;
  noButtonBorderHover: string;
  codeBlockText: string;
  checkboxText: string;
  checkboxFocusRing: string;
  checkboxBorder: string;
  h2Text: string;
  cardBg: string;
  iconText: string;
  iconTextHover: string;
  errorText: string;
};

const clientTheme: Theme = {
  pageBg: 'slate-800',
  navBg: 'slate-900',
  navBorder: 'slate-700',
  navText: 'gray-300',
  navHomeLinkText: 'white',
  navHomeLinkBg: 'blue-900',
  navHomeLinkBgHover: 'blue-800',
  mainBg: 'gray-800',
  mainBorder: 'gray-700',
  labelText: 'gray-300',
  codeInlineBg: 'gray-900',
  codeInlineText: 'red-400',
  codeInlineBorder: 'gray-600',
  codeInlineNoneBg: 'red-600',
  codeInlineNoneText: 'white',
  primaryButtonBg: 'blue-600',
  primaryButtonBorder: 'blue-500',
  primaryButtonText: 'white',
  primaryButtonBgHover: 'blue-700',
  primaryButtonBorderHover: 'blue-600',
  yesButtonBg: 'green-600',
  yesButtonBorder: 'green-500',
  yesButtonText: 'white',
  yesButtonBgHover: 'green-700',
  yesButtonBorderHover: 'green-600',
  noButtonBg: 'red-600',
  noButtonBorder: 'red-500',
  noButtonText: 'white',
  noButtonBgHover: 'red-700',
  noButtonBorderHover: 'red-600',
  codeBlockText: 'green-400',
  checkboxText: 'blue-600',
  checkboxFocusRing: 'blue-500',
  checkboxBorder: 'gray-300',
  h2Text: 'white',
  cardBg: 'gray-700',
  iconText: 'gray-400',
  iconTextHover: 'white',
  errorText: 'red-400',
};

const protectedResourceTheme: Theme = {
  pageBg: 'gray-900',
  navBg: 'emerald-900',
  navBorder: 'emerald-700',
  navText: 'gray-300',
  navHomeLinkText: 'white',
  navHomeLinkBg: 'emerald-800',
  navHomeLinkBgHover: 'emerald-700',
  mainBg: 'gray-800',
  mainBorder: 'gray-700',
  labelText: 'gray-300',
  codeInlineBg: 'gray-900',
  codeInlineText: 'emerald-400',
  codeInlineBorder: 'gray-600',
  codeInlineNoneBg: 'red-600',
  codeInlineNoneText: 'white',
  primaryButtonBg: 'emerald-600',
  primaryButtonBorder: 'emerald-500',
  primaryButtonText: 'white',
  primaryButtonBgHover: 'emerald-700',
  primaryButtonBorderHover: 'emerald-600',
  yesButtonBg: 'green-600',
  yesButtonBorder: 'green-500',
  yesButtonText: 'white',
  yesButtonBgHover: 'green-700',
  yesButtonBorderHover: 'green-600',
  noButtonBg: 'red-600',
  noButtonBorder: 'red-500',
  noButtonText: 'white',
  noButtonBgHover: 'red-700',
  noButtonBorderHover: 'red-600',
  codeBlockText: 'green-400',
  checkboxText: 'emerald-600',
  checkboxFocusRing: 'emerald-500',
  checkboxBorder: 'gray-300',
  h2Text: 'white',
  cardBg: 'gray-700',
  iconText: 'gray-400',
  iconTextHover: 'white',
  errorText: 'red-400',
};

export function getTheme(entity: OAuthEntity): Theme {
  switch (entity) {
    case 'client':
      return clientTheme;
    case 'auth_server':
      return clientTheme; // Same as client for now.
    case 'protected_resource':
      return protectedResourceTheme;
  }
}
