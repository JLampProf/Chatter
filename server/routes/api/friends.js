import express from "express";
import { saveFriendRequest } from "../../controllers/friendsController.js";

export const friendsRouter = express.Router();

friendsRouter.post("/", saveFriendRequest);
