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
  pageBg: 'gray-900',
  navBg: 'gray-950',
  navBorder: 'sky-900',
  navText: 'sky-400',
  navHomeLinkText: 'white',
  navHomeLinkBg: 'sky-900',
  navHomeLinkBgHover: 'sky-800',
  mainBg: 'gray-800',
  mainBorder: 'sky-800',
  labelText: 'sky-300',
  codeInlineBg: 'gray-900',
  codeInlineText: 'sky-400',
  codeInlineBorder: 'sky-800',
  codeInlineNoneBg: 'sky-900',
  codeInlineNoneText: 'white',
  primaryButtonBg: 'sky-800',
  primaryButtonBorder: 'sky-700',
  primaryButtonText: 'white',
  primaryButtonBgHover: 'sky-900',
  primaryButtonBorderHover: 'sky-800',
  yesButtonBg: 'emerald-800',
  yesButtonBorder: 'emerald-700',
  yesButtonText: 'white',
  yesButtonBgHover: 'emerald-900',
  yesButtonBorderHover: 'emerald-800',
  noButtonBg: 'rose-800',
  noButtonBorder: 'rose-700',
  noButtonText: 'white',
  noButtonBgHover: 'rose-900',
  noButtonBorderHover: 'rose-800',
  codeBlockText: 'sky-400',
  checkboxText: 'sky-800',
  checkboxFocusRing: 'sky-700',
  checkboxBorder: 'sky-600',
  h2Text: 'white',
  cardBg: 'gray-700',
  iconText: 'sky-500',
  iconTextHover: 'sky-300',
  errorText: 'rose-400',
};

const protectedResourceTheme: Theme = {
  pageBg: 'gray-900',
  navBg: 'gray-950',
  navBorder: 'fuchsia-900',
  navText: 'fuchsia-400',
  navHomeLinkText: 'white',
  navHomeLinkBg: 'fuchsia-900',
  navHomeLinkBgHover: 'fuchsia-800',
  mainBg: 'gray-800',
  mainBorder: 'fuchsia-800',
  labelText: 'fuchsia-300',
  codeInlineBg: 'gray-900',
  codeInlineText: 'fuchsia-400',
  codeInlineBorder: 'fuchsia-800',
  codeInlineNoneBg: 'fuchsia-900',
  codeInlineNoneText: 'white',
  primaryButtonBg: 'fuchsia-800',
  primaryButtonBorder: 'fuchsia-700',
  primaryButtonText: 'white',
  primaryButtonBgHover: 'fuchsia-900',
  primaryButtonBorderHover: 'fuchsia-800',
  yesButtonBg: 'emerald-800',
  yesButtonBorder: 'emerald-700',
  yesButtonText: 'white',
  yesButtonBgHover: 'emerald-900',
  yesButtonBorderHover: 'emerald-800',
  noButtonBg: 'rose-800',
  noButtonBorder: 'rose-700',
  noButtonText: 'white',
  noButtonBgHover: 'rose-900',
  noButtonBorderHover: 'rose-800',
  codeBlockText: 'fuchsia-400',
  checkboxText: 'fuchsia-800',
  checkboxFocusRing: 'fuchsia-700',
  checkboxBorder: 'fuchsia-600',
  h2Text: 'white',
  cardBg: 'gray-700',
  iconText: 'fuchsia-500',
  iconTextHover: 'fuchsia-300',
  errorText: 'rose-400',
};

const authServerTheme: Theme = {
  pageBg: 'gray-900',
  navBg: 'gray-950',
  navBorder: 'amber-900',
  navText: 'amber-400',
  navHomeLinkText: 'white',
  navHomeLinkBg: 'amber-900',
  navHomeLinkBgHover: 'amber-800',
  mainBg: 'gray-800',
  mainBorder: 'amber-800',
  labelText: 'amber-300',
  codeInlineBg: 'gray-900',
  codeInlineText: 'amber-400',
  codeInlineBorder: 'amber-800',
  codeInlineNoneBg: 'amber-900',
  codeInlineNoneText: 'white',
  primaryButtonBg: 'amber-800',
  primaryButtonBorder: 'amber-700',
  primaryButtonText: 'white',
  primaryButtonBgHover: 'amber-900',
  primaryButtonBorderHover: 'amber-800',
  yesButtonBg: 'emerald-800',
  yesButtonBorder: 'emerald-700',
  yesButtonText: 'white',
  yesButtonBgHover: 'emerald-900',
  yesButtonBorderHover: 'emerald-800',
  noButtonBg: 'rose-800',
  noButtonBorder: 'rose-700',
  noButtonText: 'white',
  noButtonBgHover: 'rose-900',
  noButtonBorderHover: 'rose-800',
  codeBlockText: 'amber-400',
  checkboxText: 'amber-800',
  checkboxFocusRing: 'amber-700',
  checkboxBorder: 'amber-600',
  h2Text: 'white',
  cardBg: 'gray-700',
  iconText: 'amber-500',
  iconTextHover: 'amber-300',
  errorText: 'rose-400',
};

export function getTheme(entity: OAuthEntity): Theme {
  switch (entity) {
    case 'client':
      return clientTheme;
    case 'auth_server':
      return authServerTheme;
    case 'protected_resource':
      return protectedResourceTheme;
  }
}
