"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
const { io, Socket } = require("socket.io-client");

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface User {
  id: string;
  fullName: string;
  imageUrl: string;
}

interface ISocketContext {
  sendMessage: (msg: string) => void;
  messages: Array<{
    user: string;
    userId: string;
    imageUrl: string;
    message: string;
  }>;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<typeof Socket>();
  const [messages, setMessages] = useState<
    Array<{ userId: string; user: string; imageUrl: string; message: string }>
  >([]);

  const user: User = {
    id: "user123",
    fullName: "John Doe",
    imageUrl: "https://example.com/john-doe.jpg",
  };

  // Memoize user details to avoid unnecessary recalculations
  const username = useMemo(() => user?.fullName ?? "Guest", [user]);
  const userId = useMemo(() => user?.id ?? "", [user]);
  const imageUrl = useMemo(() => user?.imageUrl ?? "", [user]);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      if (socket) {
        socket.emit("event:message", {
          message: msg,
          user: username,
          userId: userId,
          imageUrl: imageUrl,
        });
      }
    },
    [socket, username, userId, imageUrl]
  );

  const messageReceived = useCallback((msg: string) => {
    try {
      const { message, user, userId, imageUrl } = JSON.parse(msg) as {
        message: string;
        user: string;
        userId: string;
        imageUrl: string;
      };

      setMessages((prev) => [...prev, { userId, user, imageUrl, message }]);
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:8090");
    setSocket(socket);

    socket.on("message", messageReceived);

    // Cleanup on unmount
    return () => {
      socket.off("message", messageReceived);
      socket.disconnect();
      setSocket(undefined);
    };
  }, [messageReceived]);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
