import React, { createContext, useContext, useState } from 'react';
import { Product, Artisan } from '../types';
import { mockProducts as initialProducts, mockArtisans as initialArtisans } from '../data/mock';

interface AppDataContextType {
  products: Product[];
  artisans: Artisan[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateArtisan: (id: string, updates: Partial<Artisan>) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [artisans, setArtisans] = useState<Artisan[]>(initialArtisans);

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateArtisan = (id: string, updates: Partial<Artisan>) => {
    setArtisans((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  return (
    <AppDataContext.Provider
      value={{
        products,
        artisans,
        addProduct,
        updateProduct,
        deleteProduct,
        updateArtisan,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
