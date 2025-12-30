import express from "express";
import {
  notificationsHandler,
  markAllNewMessagesReadHandler,
} from "../../controllers/notificationsController.js";

export const notificationRouter = express.Router();

notificationRouter.get("/", notificationsHandler);
notificationRouter.post("/mark-all-read", markAllNewMessagesReadHandler);
