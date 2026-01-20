/**
 * login.js
 *
 * - Express router for login endpoint
 */

import express from "express";
import { loginHandler } from "../../controllers/loginController.js";

export const loginRouter = express.Router(); // Create router for login endpoints

loginRouter.post("/", loginHandler); // Login user
