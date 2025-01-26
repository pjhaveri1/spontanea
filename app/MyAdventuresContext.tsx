import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Adventure {
  id: string;
  name: string;
  photos: string;
  estimated_duration: number;
  address: string;
}

interface MyAdventuresContextProps {
  myAdventures: Adventure[];
  addAdventure: (adventure: Adventure) => void;
  removeAdventure: (id: string) => void;
}

const MyAdventuresContext = createContext<MyAdventuresContextProps | undefined>(undefined);

export const MyAdventuresProvider = ({ children }: { children: ReactNode }) => {
  const [myAdventures, setMyAdventures] = useState<Adventure[]>([]);

  const addAdventure = (adventure: Adventure) => {
    if (!myAdventures.find((item) => item.id === adventure.id)) {
      setMyAdventures((prev) => [...prev, adventure]);
    }
  };

  const removeAdventure = (id: string) => {
    setMyAdventures((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MyAdventuresContext.Provider value={{ myAdventures, addAdventure, removeAdventure }}>
      {children}
    </MyAdventuresContext.Provider>
  );
};

export const useMyAdventures = () => {
  const context = useContext(MyAdventuresContext);
  if (!context) {
    throw new Error('useMyAdventures must be used within a MyAdventuresProvider');
  }
  return context;
};
