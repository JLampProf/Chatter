import { pool } from "../controllers/databaseController.js";

export const searchUser = async (req, res) => {
  const friendName = req.query.name;

  try {
    const [foundUser] = await pool.query(
      "SELECT username, user_id FROM users WHERE username = ?",
      [friendName]
    );

    if (foundUser.length === 0) {
      console.log("Here");
      res.sendStatus(404);
    }

    res
      .status(200)
      .json({ username: foundUser[0].username, userID: foundUser[0].user_id });
  } catch (error) {
    throw new Error("Database Error");
  }
};

export const searchFriendRoom = async (req, res) => {
  const friendId = req.params.id;

  try {
    const [userRoomId] = await pool.query(
      "SELECT room_id FROM users WHERE user_id = ?",
      [friendId]
    );

    if (userRoomId.length === 0) {
      return res.sendStatus(400);
    }

    res.status(200).json({ roomId: userRoomId[0].room_id });
  } catch (error) {
    throw new Error("Database Error");
  }
};
