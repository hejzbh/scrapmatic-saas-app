"use client";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";

const MAX_RETRIES = 5;

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [retries, setRetries] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (socket?.connected) return;

    const socketIo = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      autoConnect: false,
      reconnectionDelayMax: 5000,
    });

    setSocket(socketIo);

    const interval = setInterval(() => {
      if (!socket?.connected && retries < MAX_RETRIES) {
        console.log("Trying to connect...");
        socketIo.connect();
      }
    }, 1000);

    socketIo.on("connect", () => {
      console.log("Connected to WebSocket");
      setRetries(0);
      setLoading(false);
      clearInterval(interval);
    });

    socketIo.on("connect_error", (error) => {
      console.log("Connection failed", error);
      if (retries < MAX_RETRIES) {
        setRetries((prev) => prev + 1);
      } else {
        console.log("Max retries reached. Stopping further attempts.");
        setLoading(false);
        clearInterval(interval);
      }
    });

    socketIo.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    // Cleanup
    return () => {
      clearInterval(interval);
      setLoading(false);
      if (socketIo) {
        socketIo.disconnect();
        console.log("Disconnected from WebSocket");
      }
    };
  }, [retries]);

  return { socket, loading };
};
