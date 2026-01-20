/**
 * friendsRequestController.js
 *
 * - Handles friend request logic: accepting, rejecting, and refreshing friend lists.
 */
import { pool } from "./databaseController.js";

export const acceptFriendRequest = async (req, res) => {
  const current = req.body.data.currentUserId;
  const friend = req.body.data.friendId;

  try {
    await pool.query(
      "INSERT INTO friend_list (user_id, friend_id) VALUES (?, ?), (?, ?)",
      [current, friend, friend, current],
    );

    res.sendStatus(204);
  } catch (error) {
    console.log("AcceptFriendError:", error);
  }
};

export const rejectFriendRequest = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM notifications WHERE notification_id = ?", [
      id,
    ]);

    res.sendStatus(204);
  } catch (error) {
    console.log("RejectFriendError:", error);
  }
};

export const refreshFriendsList = async (req, res) => {
  const userId = req.query.userId;

  try {
    const [newList] = await pool.query(
      "SELECT u.username, u.room_id, u.user_id AS friendId FROM users u JOIN friend_list f ON f.friend_id = u.user_id WHERE f.user_id = ?;",
      [userId],
    );

    res.status(200).json({ newList });
  } catch (error) {
    console.log("refreshingFriendsListError:", error);
  }
};
