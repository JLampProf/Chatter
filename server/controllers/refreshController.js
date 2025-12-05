import { pool } from "../controllers/databaseController.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { createToken } from "./authController.js";
import { cookieObject, REFRESH_TOKEN_SECRET } from "../config/config.js";
import { createSession } from "../config/sessions.js";

export const refreshToken = async (req, res) => {
  const cookieToken = req?.cookies?.jwt;
  const sessionCookie = req?.cookies?.session;

  try {
    const [refreshTokenDb] = await pool.query(
      "SELECT refresh_token FROM sessions WHERE session_id = ? AND valid = ?",
      [sessionCookie, true]
    );

    if (refreshTokenDb.length === 0) {
      return res.sendStatus(500);
    }

    const refreshToken = refreshTokenDb[0].refresh_token;

    const cookieTokenHash = crypto
      .createHash("sha256")
      .update(cookieToken)
      .digest("hex");

    if (cookieTokenHash === refreshToken) {
      const decoded = jwt.verify(cookieToken, REFRESH_TOKEN_SECRET);
      const payload = {
        username: decoded.username,
        userId: decoded.userId,
      };

      try {
        await invalidateRefreshToken(sessionCookie);
      } catch (error) {
        return res.sendStatus(400);
      }

      const tokens = createToken(payload);

      try {
        await createSession(tokens.refreshToken, sessionCookie);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }

      res
        .cookie("jwt", tokens.refreshToken, cookieObject)
        .status(200)
        .json({ accessToken: tokens.authToken });
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const invalidateRefreshToken = async (sessionId) => {
  try {
    await pool.query("UPDATE sessions SET valid = ? WHERE session_id = ?", [
      false,
      sessionId,
    ]);
  } catch (error) {
    throw new Error("Could not Invalidate Token");
  }
};
