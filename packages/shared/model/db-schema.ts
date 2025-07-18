export interface Token {
  token: string;
  created: Date;
  expires: Date;
}

export interface DbSchemaCh3Ex2 {
  records: {
    client_id: string;
    scope?: string;
    refresh_token: Token;
    access_token: Token;
  }[];
}
