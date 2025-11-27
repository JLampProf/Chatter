import express from "express";
import { loginHandler } from "../../controllers/loginController.js";

export const loginRouter = express.Router();

loginRouter.post("/", loginHandler);
