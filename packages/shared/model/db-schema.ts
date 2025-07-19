export interface Token {
  token: string;
  created: Date;
  expires: Date;
}

export interface DbRecordCh3Ex2 {
  client_id: string;
  scope?: string;
  refresh_token: Token;
  access_token: Token;
}

export interface DbSchemaCh3Ex2 {
  records: DbRecordCh3Ex2[];
}
