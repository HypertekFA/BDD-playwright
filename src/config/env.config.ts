import * as dotenv from 'dotenv';
dotenv.config();

type EnvName = 'dev' | 'stg' | 'prod';

const currentEnv = (process.env.ENV as EnvName) || 'dev';

const baseUrlMap: Record<EnvName, string> = {
  dev: process.env.DEV_BASE_URL!,
  stg: process.env.STG_BASE_URL!,
  prod: process.env.PROD_BASE_URL!,
};

export const config = {
  env: currentEnv,
  baseUrl: baseUrlMap[currentEnv],
  db: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    name: process.env.DB_NAME!,
  },
  defaultCredentials: {
    username: process.env.APP_USERNAME!,
    password: process.env.APP_PASSWORD!,
  },
};
