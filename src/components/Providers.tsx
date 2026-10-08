'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { StoreDataProvider } from '@/context/StoreDataContext';
import { CookieConsentBanner } from '@/components/CookieConsentBanner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreDataProvider>
        <CartProvider>
          {children}
          <CookieConsentBanner />
        </CartProvider>
      </StoreDataProvider>
    </AuthProvider>
  );
}
