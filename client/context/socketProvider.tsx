"use client";
import React, { useCallback, useEffect } from "react";
const { io } = require("socket.io-client");

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
    // Simulate sending a message to the server
    console.log(`Sending message: ${msg}`);
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:8090");
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  );
};
