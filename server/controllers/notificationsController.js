import { pool } from "./databaseController.js";

export const notificationsHandler = async (req, res) => {
  const { userId } = req.query;

  try {
    const [notifications] = await pool.query(
      "SELECT n.*, u.username FROM notifications n JOIN users u ON u.user_id = n.from_user_id WHERE n.to_user_id = ?",
      [userId]
    );

    const friendRequests = notifications.filter(
      (item) => item.notification_type === "friend_request"
    );

    const newMessages = notifications.filter(
      (item) => item.notification_type === "new_message"
    );

    res.status(200).json({ friendRequests, newMessages });
  } catch (error) {
    console.log("notificationsHandler:", error);
    throw new Error("Database Error");
  }
};
