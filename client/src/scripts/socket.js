import { io } from "socket.io-client";

const BACK_URL = import.meta.env.VITE_BACK_URL;

export const socket = io(BACK_URL, {
  autoConnect: false,
});
