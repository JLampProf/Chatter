/**
 * logout.js
 *
 * - Express router for logout endpoint
 */

import express from "express";
import { logoutHandler } from "../../../server/controllers/logoutController.js";

export const logoutRouter = express.Router(); // Create router for logout endpoints

logoutRouter.delete("/", logoutHandler); // Logout user
