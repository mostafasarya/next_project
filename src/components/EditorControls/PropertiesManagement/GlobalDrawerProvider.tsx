'use client';

import React, { createContext, useContext, useState } from 'react';
import SystemDrawer from './SystemDrawer';

// Define the drawer types that can be opened globally
export type GlobalDrawerType = 
  | 'image-dimensions'
  | 'card-settings' 
  | 'element-visibility'
  | 'product-name-editor'
  | 'description-editor'
  | 'description2-editor'
  | 'price-editor'
  | 'review-editor'
  | 'quantity-editor'
  | 'variant-editor'
  | 'size-editor'
  | 'add-to-cart-editor'
  | 'text-style-editor'
  | 'display-settings'
  | 'header-dimensions'
  | 'header-text-editor'
  | 'tabs-settings'
  | 'tabs-styling';

interface GlobalDrawerState {
  type: GlobalDrawerType | null;
  isOpen: boolean;
  title: string;
  width: number;
  content: React.ReactNode;
  onClose?: () => void;
}

interface GlobalDrawerContextType {
  drawerState: GlobalDrawerState;
  openDrawer: (type: GlobalDrawerType, title: string, content: React.ReactNode, width?: number, onClose?: () => void) => void;
  closeDrawer: () => void;
}

const GlobalDrawerContext = createContext<GlobalDrawerContextType | undefined>(undefined);

export const useGlobalDrawer = () => {
  const context = useContext(GlobalDrawerContext);
  if (!context) {
    throw new Error('useGlobalDrawer must be used within a GlobalDrawerProvider');
  }
  return context;
};

interface GlobalDrawerProviderProps {
  children: React.ReactNode;
}

export const GlobalDrawerProvider: React.FC<GlobalDrawerProviderProps> = ({ children }) => {
  const [drawerState, setDrawerState] = useState<GlobalDrawerState>({
    type: null,
    isOpen: false,
    title: '',
    width: 350,
    content: null,
    onClose: undefined
  });

  const openDrawer = (
    type: GlobalDrawerType, 
    title: string, 
    content: React.ReactNode, 
    width: number = 350,
    onClose?: () => void
  ) => {
    setDrawerState({
      type,
      isOpen: true,
      title,
      width,
      content,
      onClose
    });
  };

  const closeDrawer = () => {
    // Call the custom onClose if provided
    if (drawerState.onClose) {
      drawerState.onClose();
    }
    
    setDrawerState(prev => ({
      ...prev,
      isOpen: false,
      type: null,
      content: null,
      onClose: undefined
    }));
  };

  return (
    <GlobalDrawerContext.Provider value={{ drawerState, openDrawer, closeDrawer }}>
      {children}
      
      {/* Global Drawer - Rendered at the page level */}
      <SystemDrawer
        isOpen={drawerState.isOpen}
        onClose={closeDrawer}
        title={drawerState.title}
        width={drawerState.width}
        position="right"
        pushContent={true}
      >
        {drawerState.content}
      </SystemDrawer>
    </GlobalDrawerContext.Provider>
  );
};

export default GlobalDrawerProvider;
