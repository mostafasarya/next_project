'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface VariantValue {
  id: string;
  name: string;
  color?: string;
}

interface VariantType {
  id: string;
  name: string;
  type: 'color' | 'size' | 'custom';
  values: VariantValue[];
}

interface VariantsContextType {
  variants: VariantType[];
  setVariants: (variants: VariantType[]) => void;
  addVariant: (variant: VariantType) => void;
  updateVariant: (variantId: string, updatedVariant: VariantType) => void;
  deleteVariant: (variantId: string) => void;
  addValueToVariant: (variantId: string, value: VariantValue) => void;
  updateValueInVariant: (variantId: string, valueId: string, updatedValue: VariantValue) => void;
  deleteValueFromVariant: (variantId: string, valueId: string) => void;
}

const VariantsContext = createContext<VariantsContextType | undefined>(undefined);

export const useVariants = () => {
  const context = useContext(VariantsContext);
  if (!context) {
    throw new Error('useVariants must be used within a VariantsProvider');
  }
  return context;
};

interface VariantsProviderProps {
  children: ReactNode;
}

export const VariantsProvider: React.FC<VariantsProviderProps> = ({ children }) => {
  const [variants, setVariants] = useState<VariantType[]>([]);

  // Initialize with default variants
  useEffect(() => {
    const defaultVariants: VariantType[] = [
      {
        id: 'color',
        name: 'Color',
        type: 'color',
        values: [
          { id: 'red', name: 'Red', color: '#ff0000' },
          { id: 'green', name: 'Green', color: '#00ff00' },
          { id: 'blue', name: 'Blue', color: '#0000ff' },
          { id: 'black', name: 'Black', color: '#000000' },
          { id: 'white', name: 'White', color: '#ffffff' },
          { id: 'yellow', name: 'Yellow', color: '#ffff00' },
          { id: 'purple', name: 'Purple', color: '#800080' },
          { id: 'orange', name: 'Orange', color: '#ffa500' }
        ]
      },
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        values: [
          { id: 'xs', name: 'XS' },
          { id: 's', name: 'S' },
          { id: 'm', name: 'M' },
          { id: 'l', name: 'L' },
          { id: 'xl', name: 'XL' },
          { id: 'xxl', name: 'XXL' }
        ]
      }
    ];

    // Load from localStorage or use defaults
    const savedVariants = localStorage.getItem('variants');
    if (savedVariants) {
      try {
        setVariants(JSON.parse(savedVariants));
      } catch {
        setVariants(defaultVariants);
      }
    } else {
      setVariants(defaultVariants);
    }
  }, []);

  // Save to localStorage whenever variants change
  useEffect(() => {
    if (variants.length > 0) {
      localStorage.setItem('variants', JSON.stringify(variants));
    }
  }, [variants]);

  const addVariant = (variant: VariantType) => {
    setVariants(prev => [...prev, variant]);
  };

  const updateVariant = (variantId: string, updatedVariant: VariantType) => {
    setVariants(prev => 
      prev.map(variant => 
        variant.id === variantId ? updatedVariant : variant
      )
    );
  };

  const deleteVariant = (variantId: string) => {
    setVariants(prev => prev.filter(variant => variant.id !== variantId));
  };

  const addValueToVariant = (variantId: string, value: VariantValue) => {
    setVariants(prev => 
      prev.map(variant => 
        variant.id === variantId 
          ? { ...variant, values: [...variant.values, value] }
          : variant
      )
    );
  };

  const updateValueInVariant = (variantId: string, valueId: string, updatedValue: VariantValue) => {
    setVariants(prev => 
      prev.map(variant => 
        variant.id === variantId 
          ? { 
              ...variant, 
              values: variant.values.map(value => 
                value.id === valueId ? updatedValue : value
              )
            }
          : variant
      )
    );
  };

  const deleteValueFromVariant = (variantId: string, valueId: string) => {
    setVariants(prev => 
      prev.map(variant => 
        variant.id === variantId 
          ? { ...variant, values: variant.values.filter(value => value.id !== valueId) }
          : variant
      )
    );
  };

  const value: VariantsContextType = {
    variants,
    setVariants,
    addVariant,
    updateVariant,
    deleteVariant,
    addValueToVariant,
    updateValueInVariant,
    deleteValueFromVariant,
  };

  return (
    <VariantsContext.Provider value={value}>
      {children}
    </VariantsContext.Provider>
  );
};
