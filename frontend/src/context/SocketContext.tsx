import React, { createContext, useContext, ReactNode } from 'react';

interface SocketContextType {
  socket: any;
  connected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Socket mock para prototipo - no hace nada real
export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const mockSocket = {
    emit: (event: string, data: any) => {
      console.log('Socket mock emit:', event, data);
    },
    on: (event: string, callback: Function) => {
      console.log('Socket mock on:', event);
    },
    off: (event: string) => {
      console.log('Socket mock off:', event);
    }
  };

  return (
    <SocketContext.Provider value={{ socket: mockSocket, connected: true }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

