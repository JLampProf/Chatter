import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";

//config
import { PORT } from "./config/config.js";
import { corsOptions } from "./config/config.js";

//verification
import { verifyToken } from "./controllers/authController.js";

//route imports
import { loginRouter } from "./routes/api/login.js";
import { registerRouter } from "./routes/api/register.js";
import { refreshRouter } from "./routes/api/refresh.js";
import { friendsRouter } from "./routes/api/friends.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

//Middlewares
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/refresh", refreshRouter);
app.use("/api/friends", verifyToken, friendsRouter);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendFriendRequest", ({ roomId }) => {
    io.to(roomId).emit(
      "receiveFriendRequest",
      "A friend request was received!"
    );
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected.`);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
