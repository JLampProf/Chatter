import { pool } from "../controllers/databaseController.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const createSession = async (refreshToken, sessionID) => {
  const decodedToken = jwt.decode(refreshToken);

  const { userId, exp } = decodedToken;

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  try {
    await pool.query(
      "INSERT INTO sessions (refresh_token, user_id, session_id, expires, valid) VALUES (?, ?, ?, ?, ?)",
      [hashedRefreshToken, userId, sessionID, new Date(exp * 1000), true]
    );

    return;
  } catch (error) {
    //Future Error Function here
    console.log("Unable to create Session.", error);
    throw new Error("Unable to create Session");
  }
};
