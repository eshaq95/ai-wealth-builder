'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showToast: (toast: Toast) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (toast: Toast) => {
    // Implement your toast logic here
    console.log(toast);
  };

  return (
    <AppContext.Provider value={{ isLoading, setIsLoading, showToast }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
