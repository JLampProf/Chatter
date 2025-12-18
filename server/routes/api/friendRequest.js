import express from "express";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  refreshFriendsList,
} from "../../controllers/friendsRequestController.js";

export const friendRequestRouter = express.Router();

friendRequestRouter.post("/", acceptFriendRequest);
friendRequestRouter.delete("/:id", rejectFriendRequest);
friendRequestRouter.get("/", refreshFriendsList);
