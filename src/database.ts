import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, ENV } =
  process.env;

let pool: Pool = new Pool();

if (ENV === 'test') {
  pool = new Pool({
    host: POSTGRES_HOST,
    database: 'online_store_test',
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT as string, 10)
  });
} else {
  pool = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT as string, 10)
  });
}

export default pool;
