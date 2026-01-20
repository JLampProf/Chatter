/**
 * notifications.js
 *
 * - Express router for notification endpoints
 */

import express from "express";
import {
  notificationsHandler,
  markAllNewMessagesReadHandler,
} from "../../controllers/notificationsController.js";

export const notificationRouter = express.Router(); // Create router for notification endpoints

notificationRouter.get("/", notificationsHandler); // Get notifications for user
notificationRouter.post("/mark-all-read", markAllNewMessagesReadHandler); // Mark all messages as read
