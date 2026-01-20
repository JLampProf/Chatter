/**
 * friendRequest.js
 *
 * - Express router for friend request accept/reject/refresh endpoints
 */

import express from "express";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  refreshFriendsList,
} from "../../controllers/friendsRequestController.js";

export const friendRequestRouter = express.Router(); // Create router for friend request endpoints

friendRequestRouter.post("/", acceptFriendRequest); // Accept friend request
friendRequestRouter.delete("/:id", rejectFriendRequest); // Reject friend request
friendRequestRouter.get("/", refreshFriendsList); // Refresh friend list
