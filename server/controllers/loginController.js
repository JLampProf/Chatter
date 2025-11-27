import bcrypt from "bcrypt";
import { pool } from "./databaseController.js";
import { createToken } from "./authController.js";
import { cookieObject } from "../config/config.js";

export const loginHandler = async (req, res) => {
  const { userLoginData } = req.body;
  const { user, pwd } = userLoginData;

  if (!user || !pwd) {
    return res.sendStatus(400);
  }

  const trimmedUser = user.trim();

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      trimmedUser,
    ]);

    if (rows.length <= 0) {
      return res.sendStatus(401);
    }

    const match = await bcrypt.compare(pwd, rows[0].password);

    if (!match) {
      return res.sendStatus(401);
    }

    const payload = {
      username: rows[0].username,
      userId: rows[0].user_id,
    };

    //Generate JWT
    const tokens = createToken(payload);

    const { password, ...userData } = rows[0];

    res.cookie("jwt", tokens.refreshToken, cookieObject).status(200).json({
      userData,
      accessToken: tokens.authToken,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
