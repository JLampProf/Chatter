import { pool } from "./databaseController.js";

export const saveMessageHandler = async (req, res) => {
  const data = req.body.data.messageData;
  const { message, receiverId, sender_id, roomId } = data;

  try {
    await pool.query(
      "INSERT INTO chats (message, receiver_id, sender_id, room_id) VALUES (?, ?, ?, ?)",
      [message, receiverId, sender_id, roomId]
    );

    await pool.query(
      "INSERT INTO notifications (notification_type, content, to_user_id, from_user_id) VALUES (?, ?, ?, ?)",
      ["new_message", message, receiverId, sender_id]
    );

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
