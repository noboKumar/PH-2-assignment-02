import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.connectionStr,
});

const initDB = async () => {
  // users
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        CHECK  (email = lower(email)),
        password  TEXT NOT NULL,
        phone VARCHAR(11) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT "customer",
        CHECK (role IN ("admin", "customer")),
        )
        `);
};

export default initDB;
