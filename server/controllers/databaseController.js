/**
 * databaseController.js
 *
 * - Sets up the MySQL connection pool for database queries
 */

import mysql2 from "mysql2/promise";
import { DB_USER, DB_HOST, DB_NAME, DB_PASS } from "../config/config.js";

/**
 * - pool
 *
 * - MySQL connection pool for executing queries
 */
export const pool = mysql2.createPool({
  host: DB_HOST, // Database host
  user: DB_USER, // Database user
  password: DB_PASS, // Database password
  database: DB_NAME, // Database name
});
