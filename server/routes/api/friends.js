import express from "express";
import { searchUser } from "../../controllers/friendsController.js";
import { searchFriendRoom } from "../../controllers/friendsController.js";

export const friendsRouter = express.Router();

friendsRouter.get("/", searchUser);
friendsRouter.get("/:id", searchFriendRoom);
