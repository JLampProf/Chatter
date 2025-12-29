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
import { searchRouter } from "./routes/api/search.js";
import { sessionRouter } from "./routes/api/session.js";
import { friendsRouter } from "./routes/api/friends.js";
import { friendRequestRouter } from "./routes/api/friendRequest.js";
import { logoutRouter } from "./routes/api/logout.js";
import { notificationRouter } from "./routes/api/notifications.js";
import { historyRoute } from "./routes/api/history.js";
import { chatRoute } from "./routes/api/chat.js";

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
app.use("/api/session", verifyToken, sessionRouter);
app.use("/api/search", verifyToken, searchRouter);
app.use("/api/friends", verifyToken, friendsRouter);
app.use("/api/friendRequest", verifyToken, friendRequestRouter);
app.use("/api/notifications", verifyToken, notificationRouter);
app.use("/api/history", verifyToken, historyRoute);
app.use("/api/chat", verifyToken, chatRoute);
app.use("/api/logout", verifyToken, logoutRouter);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("joinRoom", (roomId) => {
    console.log("Joining room:", roomId);
    socket.join(roomId);
  });

  socket.on("sendFriendRequest", ({ roomId }) => {
    io.to(roomId).emit(
      "receiveFriendRequest",
      "A new friend request was received!"
    );
  });

  socket.on("acceptFriendRequest", ({ content }) => {
    io.to(content).emit(
      "acceptedFriendRequest",
      "Friend request was accepted! Say Hi, to your new friend!"
    );
  });

  socket.on("sendMessage", ({ messageObject }) => {
    io.to(messageObject.roomId).emit("receiveMessage", { messageObject });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected.`);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
