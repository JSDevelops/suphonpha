'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { StoreDataProvider } from '@/context/StoreDataContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreDataProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </StoreDataProvider>
  );
}
