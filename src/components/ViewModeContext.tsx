'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ViewModeContextType {
  isCustomerView: boolean;
  toggleViewMode: () => void;
  setCustomerView: (isCustomer: boolean) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};

interface ViewModeProviderProps {
  children: ReactNode;
}

export const ViewModeProvider: React.FC<ViewModeProviderProps> = ({ children }) => {
  const [isCustomerView, setIsCustomerView] = useState(false);

  const toggleViewMode = () => {
    setIsCustomerView(prev => !prev);
  };

  const setCustomerView = (isCustomer: boolean) => {
    setIsCustomerView(isCustomer);
  };

  const value = {
    isCustomerView,
    toggleViewMode,
    setCustomerView
  };

  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
};
