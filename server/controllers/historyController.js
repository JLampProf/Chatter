/**
 * historyController.js
 *
 * - Handles chat history retrieval and related logic.
 */
import { pool } from "./databaseController.js";
import { pool } from "./databaseController.js";

export const historyHandler = async (req, res) => {
  /**
   * Retrieves the chat history for a given chat room or user.
   */
  const current = req.params.currentUserId; // Current user ID from request parameters
  const friend = req.params.friendId; // Friend ID from request parameters

  try {
    const [history] = await pool.query(
      "SELECT * FROM (SELECT * FROM chats WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY message_time DESC LIMIT 30) AS latest ORDER BY message_time ASC;",
      [current, friend, friend, current],
    );

    return res.status(200).json({ history });
  } catch (error) {
    console.log();
    res.sendStatus(500);
  }
};
