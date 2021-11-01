import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ContextInterface {
  socket: Socket | null;
}

interface ProviderProps {
  children?: React.ReactNode;
  id: string;
}

const SocketContext = createContext<ContextInterface | null>(null);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }: ProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}