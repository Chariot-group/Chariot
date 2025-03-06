"use client";

import HealthService from "@/services/healthService";
import { useEffect, useState } from "react";

const HealthCheck = () => {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const status = await HealthService.getHealth();
        setStatus(status === 200 ? "ok" : "error");
      } catch {
        setStatus("error");
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 5000); // Vérifie toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="p-4 rounded-md text-white"
      style={{ backgroundColor: status === "ok" ? "green" : "red" }}
    >
      API Status: {status === "loading" ? "Checking..." : status.toUpperCase()}
    </div>
  );
};

export default HealthCheck;
