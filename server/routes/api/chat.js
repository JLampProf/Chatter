import express from "express";
import { saveMessageHandler } from "../../controllers/chatController.js";

export const chatRoute = express.Router();

chatRoute.post("/", saveMessageHandler);
