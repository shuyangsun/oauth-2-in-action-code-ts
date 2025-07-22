export type OAuthEntity = 'client' | 'auth_server' | 'protected_resource';

export function getOAuthEntity(entity: OAuthEntity): string {
  switch (entity) {
    case 'client':
      return 'OAuth Client';
    case 'auth_server':
      return 'OAuth Authorization Server';
    case 'protected_resource':
      return 'OAuth Protected Resource';
    default:
      throw new Error(`Unknown entity: ${entity}`);
  }
}
