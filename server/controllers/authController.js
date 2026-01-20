/**
 * authController.js
 *
 * - Handles JWT token creation and verification
 */

import jwt from "jsonwebtoken";
import { AUTH_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/config.js";

/**
 * - createToken(payload)
 *
 * - Creates access and refresh JWT tokens for a user
 */
export const createToken = (payload) => {
  const { userId } = payload;
  // Create short-lived access token
  const authToken = jwt.sign(payload, AUTH_TOKEN_SECRET, {
    expiresIn: "15m",
    issuer: "chatter",
    audience: userId.toString(),
  });
  // Create long-lived refresh token
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "3d",
    issuer: "chatter",
    audience: userId.toString(),
  });
  return { authToken, refreshToken };
};

/**
 * - verifyToken(req, res, next)
 *
 * - Middleware to verify JWT access token and attach user to request
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get auth header
  if (!authHeader) {
    return res.sendStatus(401); // No token provided
  }
  const token = authHeader.split(" ")[1]; // Extract token
  jwt.verify(token, AUTH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = decoded; // Attach user info to request
    next(); // Continue to next middleware
  });
};
