import express from "express";
import {
  saveFriendRequest,
  removeFriend,
} from "../../controllers/friendsController.js";

export const friendsRouter = express.Router();

friendsRouter.post("/", saveFriendRequest);
friendsRouter.delete("/remove", removeFriend);
