import React from "react";
import { useGlobalAuth } from "../context/AuthContext.jsx";

const SessionRestoreIndicator = () => {
  const { isRestoring } = useGlobalAuth();

  if (!isRestoring) return null;

  return <div className="session-restore-indicator">Restoring session...</div>;
};

export default SessionRestoreIndicator;
