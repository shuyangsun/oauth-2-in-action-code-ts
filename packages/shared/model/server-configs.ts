export interface AuthServerConfig {
  authorizationEndpoint: string;
  tokenEndpoint: string;
}

export interface ClientConfig {
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  scope?: string;
}
