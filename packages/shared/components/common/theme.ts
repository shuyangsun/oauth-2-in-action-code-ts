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
  pageBg: 'TODO_LLM',
  navBg: 'TODO_LLM',
  navBorder: 'TODO_LLM',
  navText: 'TODO_LLM',
  navHomeLinkText: 'TODO_LLM',
  navHomeLinkBg: 'TODO_LLM',
  navHomeLinkBgHover: 'TODO_LLM',
  mainBg: 'TODO_LLM',
  mainBorder: 'TODO_LLM',
  labelText: 'TODO_LLM',
  codeInlineBg: 'TODO_LLM',
  codeInlineText: 'TODO_LLM',
  codeInlineBorder: 'TODO_LLM',
  codeInlineNoneBg: 'TODO_LLM',
  codeInlineNoneText: 'TODO_LLM',
  primaryButtonBg: 'TODO_LLM',
  primaryButtonBorder: 'TODO_LLM',
  primaryButtonText: 'TODO_LLM',
  primaryButtonBgHover: 'TODO_LLM',
  primaryButtonBorderHover: 'TODO_LLM',
  yesButtonBg: 'TODO_LLM',
  yesButtonBorder: 'TODO_LLM',
  yesButtonText: 'TODO_LLM',
  yesButtonBgHover: 'TODO_LLM',
  yesButtonBorderHover: 'TODO_LLM',
  noButtonBg: 'TODO_LLM',
  noButtonBorder: 'TODO_LLM',
  noButtonText: 'TODO_LLM',
  noButtonBgHover: 'TODO_LLM',
  noButtonBorderHover: 'TODO_LLM',
  codeBlockText: 'TODO_LLM',
  checkboxText: 'TODO_LLM',
  checkboxFocusRing: 'TODO_LLM',
  checkboxBorder: 'TODO_LLM',
  h2Text: 'TODO_LLM',
  cardBg: 'TODO_LLM',
  iconText: 'TODO_LLM',
  iconTextHover: 'TODO_LLM',
  errorText: 'TODO_LLM',
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
