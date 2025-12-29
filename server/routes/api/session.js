import express from "express";
import { getSession } from "../../controllers/sessionController.js";

export const sessionRouter = express.Router();

sessionRouter.get("/", getSession);

export default sessionRouter;
