import { loginHandler } from "./loginController.js";
import bcrypt from "bcrypt";
import { pool } from "./databaseController.js";

export const registerHandler = async (req, res) => {
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

    if (rows.length > 0) {
      return res.sendStatus(409);
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      trimmedUser,
      hashedPwd,
    ]);

    await loginHandler(req, res);
  } catch (error) {
    res.sendStatus(500);
  }
};
