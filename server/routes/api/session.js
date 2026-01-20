/**
 * session.js
 *
 * - Express router for session-related endpoints
 */

import express from "express";
import { getSession } from "../../controllers/sessionController.js";

export const sessionRouter = express.Router(); // Create router for session endpoints

sessionRouter.get("/", getSession); // Get current user session

export default sessionRouter;
