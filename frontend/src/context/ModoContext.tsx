import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ModoContextType {
  isModoProfesor: boolean;
  toggleModo: () => void;
}

const ModoContext = createContext<ModoContextType | undefined>(undefined);

export const useModo = () => {
  const context = useContext(ModoContext);
  if (context === undefined) {
    throw new Error('useModo must be used within a ModoProvider');
  }
  return context;
};

interface ModoProviderProps {
  children: ReactNode;
}

export const ModoProvider: React.FC<ModoProviderProps> = ({ children }) => {
  const [isModoProfesor, setIsModoProfesor] = useState(true);

  const toggleModo = () => {
    setIsModoProfesor(!isModoProfesor);
  };

  return (
    <ModoContext.Provider value={{ isModoProfesor, toggleModo }}>
      {children}
    </ModoContext.Provider>
  );
}; 