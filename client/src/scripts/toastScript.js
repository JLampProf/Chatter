/**
 * toastScript.js
 *
 * - Utility for showing toast notifications
 */

import { toast } from "react-toastify";

/**
 * - toastMessage(message)
 *
 * - Shows a toast notification with the given message
 */
export const toastMessage = (message) => {
  toast(message); // Show toast notification
};
