/**
 * friends.js
 *
 * - Express router for friend request and removal endpoints
 */

import express from "express";
import {
  saveFriendRequest,
  removeFriend,
} from "../../controllers/friendsController.js";

export const friendsRouter = express.Router(); // Create router for friends endpoints

friendsRouter.post("/", saveFriendRequest); // Send friend request
friendsRouter.delete("/remove", removeFriend); // Remove friend
