import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.DOTENV_PATH || undefined });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3307),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'movie_app',
  connectionLimit: 10
});

export default pool;

