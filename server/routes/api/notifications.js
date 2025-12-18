import express from "express";
import { notificationsHandler } from "../../controllers/notificationsController.js";

export const notificationRouter = express.Router();

notificationRouter.get("/", notificationsHandler);
