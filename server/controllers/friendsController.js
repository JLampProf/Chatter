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
