import express from "express";
import { registerHandler } from "../../controllers/registerController.js";

export const registerRouter = express.Router();

registerRouter.post("/", registerHandler);
