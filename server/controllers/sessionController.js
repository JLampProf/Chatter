/**
 * sessionController.js
 *
 * - Handles fetching the current user session and friend list
 */

import { pool } from "./databaseController.js";

/**
 * - getSession(req, res)
 *
 * - Fetches user data and friend list for the current session
 */
export const getSession = async (req, res) => {
  try {
    const userId = req.user.userId; // Get user ID from JWT
    const [userRows] = await pool.query(
      // Fetch user data
      "SELECT user_id, username, room_id FROM users WHERE user_id = ?",
      [userId],
    );
    if (userRows.length === 0) return res.sendStatus(400);
    const userData = userRows[0];
    const [friendList] = await pool.query(
      // Fetch user's friends
      "SELECT u.username, u.room_id, u.user_id AS friendId FROM users u JOIN friend_list f ON f.friend_id = u.user_id WHERE f.user_id = ?;",
      [userId],
    );
    res.status(200).json({ userData, friendList });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default getSession;
