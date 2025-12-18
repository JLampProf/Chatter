import express from "express";
import {
  searchUser,
  searchFriendRoom,
} from "../../controllers/searchController.js";

export const searchRouter = express.Router();

searchRouter.get("/", searchUser);
searchRouter.get("/:id", searchFriendRoom);
