import { Pool } from 'pg';
import { config } from 'dotenv';

config({ path: './.env' });


const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT!),
});

export { pool as db };

