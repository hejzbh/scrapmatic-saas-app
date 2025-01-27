import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const MAX_RETRIES = 7;
const RETRY_DELAY = 1000; // Delay in milliseconds between retries

export const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [retries, setRetries] = useState(0);

  const connectSocket = useCallback(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL);

    socketInstance.on("connect", () => {
      setLoading(false);
      setRetries(0); // Reset retries on successful connection
      setSocket(socketInstance);
    });

    socketInstance.on("connect_error", () => {
      if (retries < MAX_RETRIES) {
        setRetries((prev) => prev + 1);
        setTimeout(() => {
          connectSocket();
        }, RETRY_DELAY);
      } else {
        console.error("Max retries reached. Unable to connect to socket.");
        setLoading(false); // Stop loading if max retries are reached
      }
    });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [retries]);

  useEffect(() => {
    connectSocket();

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [connectSocket, socket]);

  return { loading, socket };
};

export default useSocket;
