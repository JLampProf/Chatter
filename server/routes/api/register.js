/**
 * register.js
 *
 * - Express router for user registration endpoints
 */

import express from "express";
import { registerHandler } from "../../controllers/registerController.js";

export const registerRouter = express.Router(); // Create router for register endpoints

registerRouter.post("/", registerHandler); // Register new user
