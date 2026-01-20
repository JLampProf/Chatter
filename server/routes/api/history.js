/**
 * history.js
 *
 * - Express router for chat history endpoints
 */

import express from "express";
import { historyHandler } from "../../controllers/historyController.js";

export const historyRoute = express.Router(); // Create router for history endpoints

historyRoute.get("/:currentUserId/:friendId", historyHandler); // Get chat history between users
