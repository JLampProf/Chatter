/**
 * chat.js
 *
 * - Express router for chat message endpoints
 */

import express from "express";
import { saveMessageHandler } from "../../controllers/chatController.js";

export const chatRoute = express.Router(); // Create router for chat endpoints

chatRoute.post("/", saveMessageHandler); // Save new chat message
