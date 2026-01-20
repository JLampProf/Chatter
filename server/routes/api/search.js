/**
 * search.js
 *
 * - Express router for user search endpoints
 */

import express from "express";
import {
  searchUser,
  searchFriendRoom,
} from "../../controllers/searchController.js";

export const searchRouter = express.Router(); // Create router for search endpoints

searchRouter.get("/", searchUser); // Search for user by name
searchRouter.get("/:id", searchFriendRoom); // Get room ID for friend
