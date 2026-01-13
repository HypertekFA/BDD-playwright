import { DbClient } from '../db/mssqlClient';

export interface QueryResult {
  query: string;
  params?: Record<string, unknown>;
  result: any[];
  timestamp: Date;
}

export class DatabaseUtil {
  private queryResults: Map<string, QueryResult> = new Map();
  private resultCounter: number = 0;

  constructor(private dbClient: DbClient | null) {}

  /**
   * Execute a query and store the result with a key
   */
  async executeAndStore(
    key: string,
    query: string,
    params?: Record<string, unknown>
  ): Promise<any[]> {
    if (!this.dbClient) {
      throw new Error('Database client is not available');
    }

    try {
      const result = await this.dbClient.query(query, params);
      this.queryResults.set(key, {
        query,
        params,
        result,
        timestamp: new Date(),
      });
      return result;
    } catch (error) {
      console.error(`Query failed for key "${key}":`, error);
      throw error;
    }
  }

  /**
   * Execute a query without storing the result
   */
  async execute<T = any>(
    query: string,
    params?: Record<string, unknown>
  ): Promise<T[]> {
    if (!this.dbClient) {
      throw new Error('Database client is not available');
    }

    try {
      return await this.dbClient.query<T>(query, params);
    } catch (error) {
      console.error('Query execution failed:', error);
      throw error;
    }
  }

  /**
   * Execute a query and return the first row/result
   */
  async executeForOne<T = any>(
    query: string,
    params?: Record<string, unknown>
  ): Promise<T | null> {
    const results = await this.execute<T>(query, params);
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Insert data and return the auto-generated key
   */
  async insert(
    query: string,
    params?: Record<string, unknown>
  ): Promise<any> {
    return this.executeForOne(query, params);
  }

  /**
   * Update records and return the number of affected rows
   */
  async update(
    query: string,
    params?: Record<string, unknown>
  ): Promise<number> {
    if (!this.dbClient) {
      throw new Error('Database client is not available');
    }

    try {
      const result = await this.dbClient.query(query, params);
      return Array.isArray(result) ? result.length : 0;
    } catch (error) {
      console.error('Update query failed:', error);
      throw error;
    }
  }

  /**
   * Delete records and return the number of affected rows
   */
  async delete(
    query: string,
    params?: Record<string, unknown>
  ): Promise<number> {
    return this.update(query, params);
  }

  /**
   * Get a previously stored query result
   */
  getResult(key: string): QueryResult | undefined {
    return this.queryResults.get(key);
  }

  /**
   * Get the data from a previously stored query result
   */
  getResultData(key: string): any[] | undefined {
    return this.queryResults.get(key)?.result;
  }

  /**
   * Get a specific row from a stored result
   */
  getResultRow(key: string, index: number = 0): any | undefined {
    const data = this.getResultData(key);
    return data ? data[index] : undefined;
  }

  /**
   * Get a specific column value from the first row
   */
  getResultValue(key: string, columnName: string, rowIndex: number = 0): any {
    const row = this.getResultRow(key, rowIndex);
    return row ? row[columnName] : undefined;
  }

  /**
   * Clear all stored results
   */
  clearResults(): void {
    this.queryResults.clear();
    this.resultCounter = 0;
  }

  /**
   * Clear a specific stored result
   */
  clearResult(key: string): void {
    this.queryResults.delete(key);
  }

  /**
   * Get all stored results
   */
  getAllResults(): Map<string, QueryResult> {
    return new Map(this.queryResults);
  }

  /**
   * Check if a result exists
   */
  hasResult(key: string): boolean {
    return this.queryResults.has(key);
  }

  /**
   * Auto-generate a result key
   */
  generateResultKey(prefix: string = 'result'): string {
    this.resultCounter++;
    return `${prefix}_${this.resultCounter}`;
  }

  /**
   * Verify database connection is available
   */
  isConnected(): boolean {
    return this.dbClient !== null;
  }

  /**
   * Close the database connection
   */
  async close(): Promise<void> {
    if (this.dbClient) {
      await this.dbClient.close();
      this.dbClient = null;
    }
  }
}
