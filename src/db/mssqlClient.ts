import sql from 'mssql';

export interface DbConfig {
  host: string;
  user: string;
  password: string;
  name: string;
}

export interface DbClient {
  query<T = any>(query: string, params?: Record<string, unknown>): Promise<T[]>;
  close(): Promise<void>;
}

export async function createDbClient(cfg: DbConfig): Promise<DbClient> {
  const pool = await sql.connect({
    server: cfg.host,
    user: cfg.user,
    password: cfg.password,
    database: cfg.name,
    options: { encrypt: true, trustServerCertificate: true },
  });

  return {
    async query<T>(queryText: string, params: Record<string, unknown> = {}): Promise<T[]> {
      const request = pool.request();
      Object.entries(params).forEach(([key, value]) => request.input(key, value as any));
      const result = await request.query<T>(queryText);
      return result.recordset;
    },
    async close() {
      await pool.close();
    },
  };
}
