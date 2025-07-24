export type OAuthEntity = 'client' | 'auth_server' | 'protected_resource';

export function getOAuthEntityName(entity: OAuthEntity): string {
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

export function getOAuthEntityURI(entity: OAuthEntity): string {
  switch (entity) {
    case 'client':
      return 'http://localhost:9000';
    case 'auth_server':
      return 'http://localhost:9001';
    case 'protected_resource':
      return 'http://localhost:9002';
    default:
      throw new Error(`Unknown entity: ${entity}`);
  }
}
