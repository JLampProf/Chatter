import { pool } from "./databaseController.js";

export const searchUser = async (req, res) => {
  const friendName = req.query.name;
  const currentUser = req.query.currentUser;

  try {
    const [foundUser] = await pool.query(
      "SELECT username, user_id FROM users WHERE username = ?",
      [friendName]
    );

    if (foundUser.length === 0) {
      res.sendStatus(404);
    }

    let alreadyFriends = false;
    try {
      alreadyFriends = await checkIfAlreadyFriends(
        foundUser[0].user_id,
        currentUser
      );
    } catch (error) {
      console.log("CheckIfAlreadyTRYCATCH:", error);
      return res.sendStatus(500);
    }

    res.status(200).json({
      username: foundUser[0].username,
      userID: foundUser[0].user_id,
      alreadyFriends,
    });
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

const checkIfAlreadyFriends = async (toUser, fromUser) => {
  try {
    const [alreadyFriends] = await pool.query(
      "SELECT * FROM notifications WHERE (to_user_id = ? AND from_user_id = ?) OR (from_user_id = ? AND to_user_id = ?)",
      [toUser, fromUser, toUser, fromUser]
    );

    if (alreadyFriends.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.log("checkIfFriends:", error);
  }
};
