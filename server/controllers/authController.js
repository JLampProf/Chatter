import jwt from "jsonwebtoken";
import { AUTH_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/config.js";

export const createToken = (payload) => {
  const { userId } = payload;

  const authToken = jwt.sign(payload, AUTH_TOKEN_SECRET, {
    expiresIn: "15m",
    issuer: "chatter",
    audience: userId.toString(),
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "3d",
    issuer: "chatter",
    audience: userId.toString(),
  });

  return { authToken, refreshToken };
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, AUTH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    req.user = decoded;

    next();
  });
};
