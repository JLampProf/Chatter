/**
 * logoutController.js
 *
 * - Handles user logout and session destruction.
 */
import { invalidateRefreshToken } from "./refreshController.js";
import { pool } from "./databaseController.js";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config/config.js";
import { format } from "date-fns";

export const logoutHandler = async (req, res) => {
  const sessionCookie = req?.cookies?.session;
  const refreshCookie = req?.cookies?.jwt;

  const decoded = jwt.verify(refreshCookie, REFRESH_TOKEN_SECRET);
  const userId = decoded.userId;

  invalidateRefreshToken(sessionCookie);

  try {
    await pool.query("DELETE FROM sessions WHERE user_id = ? AND valid = ?", [
      userId,
      false,
    ]);
    await dateCleanupCheck(userId);

    res.sendStatus(200);
  } catch (error) {
    console.log("LogoutError:", error);
    throw new Error("Failed to logout");
  }
};

const dateCleanupCheck = async (userId) => {
  const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss.000");

  try {
    await pool.query("DELETE FROM sessions WHERE expires < ? AND user_id = ?", [
      currentDate,
      userId,
    ]);
  } catch (error) {
    console.log("dateCleanUpError:", error);
  }
};
