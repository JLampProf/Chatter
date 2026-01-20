/**
 * SessionRestoreIndicator.jsx
 *
 * - Shows a loading indicator when session is being restored
 * - Uses AuthContext to check session state
 */

import React from "react";
import { useGlobalAuth } from "../context/AuthContext.jsx";

/**
 * - SessionRestoreIndicator()
 *
 * - Renders a message if session is restoring
 */
const SessionRestoreIndicator = () => {
  const { isRestoring } = useGlobalAuth();

  if (!isRestoring) return null; // Only show indicator if session is restoring

  return <div className="session-restore-indicator">Restoring session...</div>;
};

export default SessionRestoreIndicator;
