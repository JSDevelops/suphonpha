'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Certificate, Order, Article, OrderStatus } from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CERTIFICATES,
  INITIAL_ORDERS,
  INITIAL_ARTICLES,
  INITIAL_SETTINGS,
} from '@/data/mockData';
import { fetchGoogleSheetData, submitOrderToGoogleSheet } from '@/lib/googleSheets';

interface StoreDataContextType {
  products: Product[];
  certificates: Certificate[];
  orders: Order[];
  articles: Article[];
  settings: typeof INITIAL_SETTINGS;
  isLoading: boolean;
  verifyCertificate: (code: string) => Certificate | null;
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, courierName?: string) => void;
  refreshFromGoogleSheet: () => Promise<void>;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

export const StoreDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [articles] = useState<Article[]>(INITIAL_ARTICLES);
  const [settings] = useState(INITIAL_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync with Google Sheet / LocalStorage on mount
  useEffect(() => {
    async function loadData() {
      try {
        const sheetData = await fetchGoogleSheetData();
        if (sheetData.products?.length > 0) setProducts(sheetData.products);
        if (sheetData.certificates?.length > 0) setCertificates(sheetData.certificates);
        if (sheetData.orders?.length > 0) setOrders(sheetData.orders);
      } catch (err) {
        console.warn('Using local starter data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const refreshFromGoogleSheet = async () => {
    setIsLoading(true);
    try {
      const sheetData = await fetchGoogleSheetData();
      if (sheetData.products?.length > 0) setProducts(sheetData.products);
      if (sheetData.certificates?.length > 0) setCertificates(sheetData.certificates);
      if (sheetData.orders?.length > 0) setOrders(sheetData.orders);
    } catch (e) {
      console.error('Failed to refresh from Google Sheet:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCertificate = (code: string) => {
    if (!code) return null;
    const clean = code.trim().toUpperCase();
    const found = certificates.find((c) => {
      const target = c.certNumber.toUpperCase();
      return (
        target === clean ||
        target.replace(/^SPP-/, 'KDD-') === clean ||
        target.replace(/^KDD-/, 'SPP-') === clean
      );
    });
    return found || null;
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const count = orders.length + 1;
    const orderNumber = `KDD-ORD-2026-${String(count).padStart(4, '0')}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };

    // 1. Update local state
    setOrders((prev) => [newOrder, ...prev]);

    // 2. Post directly to Google Sheet
    try {
      await submitOrderToGoogleSheet(newOrder);
    } catch (e) {
      console.warn('Order saved locally, failed to sync with remote sheet:', e);
    }

    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    courierName?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status,
            trackingNumber: trackingNumber ?? o.trackingNumber,
            courierName: courierName ?? o.courierName,
            paidAt: status === 'paid' || status === 'shipping' ? new Date().toISOString().replace('T', ' ').slice(0, 19) : o.paidAt,
          };
        }
        return o;
      })
    );
  };

  return (
    <StoreDataContext.Provider
      value={{
        products,
        certificates,
        orders,
        articles,
        settings,
        isLoading,
        verifyCertificate,
        createOrder,
        updateOrderStatus,
        refreshFromGoogleSheet,
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
};

export const useStoreData = () => {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error('useStoreData must be used within a StoreDataProvider');
  }
  return context;
};
