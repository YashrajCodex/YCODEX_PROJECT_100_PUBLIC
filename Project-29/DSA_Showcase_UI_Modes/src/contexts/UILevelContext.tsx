
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UILevel = 'skeleton' | 'basic' | 'futuristic';

interface UILevelContextType {
  uiLevel: UILevel;
  setUILevel: (level: UILevel) => void;
}

const UILevelContext = createContext<UILevelContextType | undefined>(undefined);

export const UILevelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const uiLevelStored = localStorage.getItem('UILevel');
  const [uiLevel, setUILevel] = useState<UILevel>('basic');
  useEffect(() => {
      setUILevel(uiLevelStored ? JSON.parse(uiLevelStored):'basic');
  },[])
  useEffect(() => {
    localStorage.setItem('UILevel', JSON.stringify(uiLevel));
  },[uiLevel])
  return (
    <UILevelContext.Provider value={{ uiLevel, setUILevel }}>
      {children}
    </UILevelContext.Provider>
  );
};

export const useUILevel = () => {
  const context = useContext(UILevelContext);
  if (context === undefined) {
    throw new Error('useUILevel must be used within a UILevelProvider');
  }
  return context;
};
