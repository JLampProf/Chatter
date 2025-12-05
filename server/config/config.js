import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  DB_NAME,
  DB_PASS,
  DB_USER,
  DB_HOST,
  AUTH_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = process.env;

const whitelist = ["http://localhost:5173"];

export const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export const cookieObject = {
  httpOnly: true,
  // secure: false,
  // sameSite: "none",
  maxAge: 3 * 24 * 60 * 60 * 1000,
};
