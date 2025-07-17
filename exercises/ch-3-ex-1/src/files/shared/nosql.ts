import * as fs from 'fs';
import * as path from 'path';

// Types for OAuth tokens stored in the database
interface BaseToken {
  client_id: string;
  scope?: string[];
  user?: string;
}

interface AccessToken extends BaseToken {
  access_token: string;
}

interface RefreshToken extends BaseToken {
  refresh_token: string;
}

type Token = AccessToken | RefreshToken;

// Query builder for find operations
class QueryBuilder<T> {
  private conditions: Array<(item: T) => boolean> = [];
  private callbackFn?: (
    err: Error | undefined,
    result: T[] | T | number | undefined,
  ) => void;
  private db: InMemoryDB<T>;
  private operation: 'find' | 'remove';
  private findOne: boolean;

  constructor(
    db: InMemoryDB<T>,
    operation: 'find' | 'remove',
    findOne = false,
  ) {
    this.db = db;
    this.operation = operation;
    this.findOne = findOne;
  }

  where(field: keyof T, value: keyof T): this {
    this.conditions.push((item) => item[field] === value);
    return this;
  }

  and(): this {
    // In the original implementation, this seems to be used to chain conditions
    // Our where() calls are already implicitly AND-ed
    return this;
  }

  callback(
    fn: (err: Error | undefined, result: T[] | T | number) => void,
  ): void {
    this.callbackFn = fn as (
      err: Error | undefined,
      result: T[] | T | number | undefined,
    ) => void;
    this.execute();
  }

  private execute(): void {
    try {
      if (this.operation === 'find') {
        const results = this.db.findWithConditions(this.conditions);
        if (this.findOne) {
          this.callbackFn?.(undefined, results[0] ?? undefined);
        } else {
          this.callbackFn?.(undefined, results);
        }
      } else if (this.operation === 'remove') {
        const count = this.db.removeWithConditions(this.conditions);
        this.callbackFn?.(undefined, count);
      }
    } catch (error) {
      this.callbackFn?.(error as Error, this.operation === 'find' ? [] : 0);
    }
  }
}

// Main in-memory database class
class InMemoryDB<T = Token> {
  private data: T[] = [];
  private filePath?: string;
  private autoSave: boolean = false;

  constructor(filePath?: string, autoSave: boolean = false) {
    this.filePath = filePath;
    this.autoSave = autoSave;
    if (filePath) {
      this.loadFromFile();
    }
  }

  insert(item: T): void {
    this.data.push(item);
    if (this.autoSave) {
      this.saveToFile();
    }
  }

  find(): QueryBuilder<T> {
    return new QueryBuilder(this, 'find');
  }

  one(): QueryBuilder<T> {
    return new QueryBuilder(this, 'find', true);
  }

  remove(): QueryBuilder<T> {
    return new QueryBuilder(this, 'remove');
  }

  clear(): void {
    this.data = [];
    if (this.autoSave) {
      this.saveToFile();
    }
  }

  findWithConditions(conditions: Array<(item: T) => boolean>): T[] {
    return this.data.filter((item) =>
      conditions.every((condition) => condition(item)),
    );
  }

  removeWithConditions(conditions: Array<(item: T) => boolean>): number {
    const initialLength = this.data.length;
    this.data = this.data.filter(
      (item) => !conditions.every((condition) => condition(item)),
    );
    const removedCount = initialLength - this.data.length;

    if (this.autoSave && removedCount > 0) {
      this.saveToFile();
    }

    return removedCount;
  }

  // Optional: Make the find/remove operations async for consistency
  async findAsync(): Promise<QueryBuilderAsync<T>> {
    return new QueryBuilderAsync(this, 'find');
  }

  async oneAsync(): Promise<QueryBuilderAsync<T>> {
    return new QueryBuilderAsync(this, 'find', true);
  }

  async removeAsync(): Promise<QueryBuilderAsync<T>> {
    return new QueryBuilderAsync(this, 'remove');
  }

  private loadFromFile(): void {
    if (!this.filePath) return;

    try {
      if (fs.existsSync(this.filePath)) {
        const content = fs.readFileSync(this.filePath, 'utf-8');
        this.data = JSON.parse(content);
      }
    } catch (error) {
      console.error('Error loading database from file:', error);
      this.data = [];
    }
  }

  private saveToFile(): void {
    if (!this.filePath) return;

    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, undefined, 2));
    } catch (error) {
      console.error('Error saving database to file:', error);
    }
  }
}

// Async version of QueryBuilder for modern usage
class QueryBuilderAsync<T> {
  private conditions: Array<(item: T) => boolean> = [];
  private db: InMemoryDB<T>;
  private operation: 'find' | 'remove';
  private findOne: boolean;

  constructor(
    db: InMemoryDB<T>,
    operation: 'find' | 'remove',
    findOne = false,
  ) {
    this.db = db;
    this.operation = operation;
    this.findOne = findOne;
  }

  where(field: keyof T, value: keyof T): this {
    this.conditions.push((item) => item[field] === value);
    return this;
  }

  and(): this {
    return this;
  }

  async execute(): Promise<T[] | T | number | undefined> {
    if (this.operation === 'find') {
      const results = this.db.findWithConditions(this.conditions);
      return this.findOne ? (results[0] ?? undefined) : results;
    } else {
      return this.db.removeWithConditions(this.conditions);
    }
  }
}

// Factory function to create a database instance (mimics nosql.load())
export function load<T = Token>(
  filePath?: string,
  options?: { autoSave?: boolean },
): InMemoryDB<T> {
  return new InMemoryDB<T>(filePath, options?.autoSave);
}

// Export types and classes
export {
  InMemoryDB,
  QueryBuilder,
  QueryBuilderAsync,
  Token,
  AccessToken,
  RefreshToken,
};

// Usage example that matches the original code:
/*
const nosql = load<Token>('database.nosql');

// Insert tokens
nosql.insert({ access_token: 'abc123', client_id: 'client-1', scope: ['read', 'write'] });
nosql.insert({ refresh_token: 'xyz789', client_id: 'client-1', scope: ['read'] });

// Find with callback (original style)
nosql.find().make(function(builder) {
  builder.where('client_id', 'client-1');
  builder.callback(function(err, tokens) {
    if (err) {
      console.error(err);
    } else {
      console.log('Found tokens:', tokens);
    }
  });
});

// Find one with callback
nosql.one().make(function(builder) {
  builder.where('access_token', 'abc123');
  builder.callback(function(err, token) {
    if (token) {
      console.log('Found token:', token);
    }
  });
});

// Remove with multiple conditions
nosql.remove().make(function(builder) {
  builder.and();
  builder.where('access_token', 'abc123');
  builder.where('client_id', 'client-1');
  builder.callback(function(err, count) {
    console.log('Removed %s tokens', count);
  });
});

// Clear all data
nosql.clear();

// Modern async usage (optional):
async function example() {
  const builder = await nosql.findAsync();
  const tokens = await builder.where('client_id', 'client-1').execute();
  console.log(tokens);
}
*/
