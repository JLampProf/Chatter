import mysql2 from "mysql2/promise";
import { DB_USER, DB_HOST, DB_NAME, DB_PASS } from "../config/config.js";

export const pool = mysql2.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});
