/**
 * refresh.js
 *
 * - Express router for token refresh endpoints
 */

import express from "express";
import { refreshToken } from "../../controllers/refreshController.js";

export const refreshRouter = express.Router(); // Create router for refresh endpoints

refreshRouter.post("/", refreshToken); // Refresh JWT token
