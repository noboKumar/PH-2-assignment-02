import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.connectionStr,
});

const initDB = async () => {
  await pool.query(`
        
        `);
};

export default initDB;
