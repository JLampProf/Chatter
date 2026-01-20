/**
 * friendsController.js
 *
 * - Handles friend request creation and removal
 */

import { pool } from "../controllers/databaseController.js";

/**
 * - saveFriendRequest(req, res)
 *
 * - Creates a friend request notification in the database
 */
export const saveFriendRequest = async (req, res) => {
  const { fromUserData, toUserData, fromUserDataRoomId } = req.body?.data; // Extract friend request data
  try {
    await pool.query(
      // Insert friend request notification
      "INSERT INTO notifications (notification_type, content, to_user_id, from_user_id) VALUES (?, ?, ?, ?)",
      ["friend_request", fromUserDataRoomId, toUserData, fromUserData],
    );
    res.sendStatus(200);
  } catch (error) {
    console.log("saveFriendError:", error);
    res.sendStatus(500);
  }
};

/**
 * - removeFriend(req, res)
 *
 * - Removes a friend relationship in both directions
 */
export const removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    await pool.query(
      // Remove friendship in both directions
      "DELETE FROM friend_list WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)",
      [userId, friendId, friendId, userId],
    );
    res.sendStatus(200);
  } catch (error) {
    console.log("removeFriendError:", error);
    res.sendStatus(500);
  }
};
