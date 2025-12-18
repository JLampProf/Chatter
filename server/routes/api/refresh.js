import express from "express";
import { refreshToken } from "../../controllers/refreshController.js";

export const refreshRouter = express.Router();

refreshRouter.post("/", refreshToken);
