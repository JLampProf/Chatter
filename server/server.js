import express from "express";
import cors from "cors";

//config
import { PORT } from "./config/config.js";
import { corsOptions } from "./config/config.js";

//verification
import { verifyToken } from "./controllers/authController.js";

//route imports
import { loginRouter } from "./routes/api/login.js";
import { registerRouter } from "./routes/api/register.js";

const app = express();

//Middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded());
app.use(express.json());

//routes
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
