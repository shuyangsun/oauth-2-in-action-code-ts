export type OAuthEntity = 'client' | 'auth_server' | 'protected_resource';

export function getOAuthEntity(entity: OAuthEntity): string {
  switch (entity) {
    case 'client':
      return 'Client';
    case 'auth_server':
      return 'Auth';
    case 'protected_resource':
      return 'Resource';
    default:
      throw new Error(`Unknown entity: ${entity}`);
  }
}
