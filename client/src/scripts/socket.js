/**
 * socket.js
 *
 * - Configures the Socket.io client for real-time events
 * - Manual connection after login
 */

import { io } from "socket.io-client";

const BACK_URL = import.meta.env.VITE_BACK_URL; // Backend URL from environment

/**
 * - socket
 *
 * - Socket.io client instance for real-time communication
 */
export const socket = io(BACK_URL, {
  autoConnect: false, // Manual connect after login
});
