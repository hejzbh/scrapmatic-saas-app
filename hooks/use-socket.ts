import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL);

    socketInstance.on("connect", () => {
      setLoading(false);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { loading, socket };
};

export default useSocket;
