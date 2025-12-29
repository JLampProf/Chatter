import { pool } from "../controllers/databaseController.js";

export const saveFriendRequest = async (req, res) => {
  const { fromUserData, toUserData, fromUserDataRoomId } = req.body?.data;
  try {
    await pool.query(
      "INSERT INTO notifications (notification_type, content, to_user_id, from_user_id) VALUES (?, ?, ?, ?)",
      ["friend_request", fromUserDataRoomId, toUserData, fromUserData]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log("saveFriendError:", error);
    res.sendStatus(500);
  }
};

// Remove friend for both users
export const removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    // Remove both directions
    await pool.query(
      "DELETE FROM friend_list WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)",
      [userId, friendId, friendId, userId]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log("removeFriendError:", error);
    res.sendStatus(500);
  }
};
