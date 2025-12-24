import express from "express";
import { historyHandler } from "../../controllers/historyController.js";

export const historyRoute = express.Router();

historyRoute.get("/:currentUserId/:friendId", historyHandler);
