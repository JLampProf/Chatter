import express from "express";
import { logoutHandler } from "../../../server/controllers/logoutController.js";

export const logoutRouter = express.Router();

logoutRouter.delete("/", logoutHandler);
