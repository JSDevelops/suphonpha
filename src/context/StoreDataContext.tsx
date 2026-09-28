'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Certificate,
  Order,
  Article,
  SystemSettings,
  AuditLog,
  OrderStatus,
} from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CERTIFICATES,
  INITIAL_ORDERS,
  INITIAL_ARTICLES,
  INITIAL_SETTINGS,
  INITIAL_AUDIT_LOGS,
} from '@/data/mockData';

interface StoreDataContextType {
  products: Product[];
  certificates: Certificate[];
  orders: Order[];
  articles: Article[];
  settings: SystemSettings;
  auditLogs: AuditLog[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  createCertificate: (cert: Omit<Certificate, 'id' | 'verificationCount'>) => Certificate;
  updateCertificate: (id: string, cert: Partial<Certificate>) => void;
  verifyCertificate: (code: string) => Certificate | null;
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, courierName?: string) => void;
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

export const StoreDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const p = localStorage.getItem('kdd_products');
      if (p) setProducts(JSON.parse(p));
      const c = localStorage.getItem('kdd_certificates');
      if (c) setCertificates(JSON.parse(c));
      const o = localStorage.getItem('kdd_orders');
      if (o) setOrders(JSON.parse(o));
      const a = localStorage.getItem('kdd_articles');
      if (a) setArticles(JSON.parse(a));
      const s = localStorage.getItem('kdd_settings');
      if (s) setSettings(JSON.parse(s));
      const l = localStorage.getItem('kdd_audit_logs');
      if (l) setAuditLogs(JSON.parse(l));
    } catch {
      // ignore
    }
  }, []);

  const addAuditLog = (action: string, details: string) => {
    const log: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userEmail: 'admin@konduangdee.com',
      action,
      details,
      ipAddress: '127.0.0.1 (Local Session)',
    };
    setAuditLogs((prev) => {
      const updated = [log, ...prev];
      localStorage.setItem('kdd_audit_logs', JSON.stringify(updated));
      return updated;
    });
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...product,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => {
      const updated = [newProd, ...prev];
      localStorage.setItem('kdd_products', JSON.stringify(updated));
      return updated;
    });
    addAuditLog('CREATE_PRODUCT', `เพิ่มสินค้าใหม่: ${newProd.titleTh} (SKU: ${newProd.sku})`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      localStorage.setItem('kdd_products', JSON.stringify(updated));
      return updated;
    });
    addAuditLog('UPDATE_PRODUCT', `แก้ไขข้อมูลสินค้า ID: ${id}`);
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem('kdd_products', JSON.stringify(updated));
      return updated;
    });
    addAuditLog('DELETE_PRODUCT', `ลบสินค้า ID: ${id} (${prod?.titleTh || ''})`);
  };

  const createCertificate = (cert: Omit<Certificate, 'id' | 'verificationCount'>) => {
    const newCert: Certificate = {
      ...cert,
      id: `cert-${Date.now()}`,
      verificationCount: 0,
    };
    setCertificates((prev) => {
      const updated = [newCert, ...prev];
      localStorage.setItem('kdd_certificates', JSON.stringify(updated));
      return updated;
    });
    addAuditLog('CREATE_CERTIFICATE', `ออกบัตรรับรองใหม่ เลขที่: ${newCert.certNumber}`);
    return newCert;
  };

  const updateCertificate = (id: string, updates: Partial<Certificate>) => {
    setCertificates((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
      localStorage.setItem('kdd_certificates', JSON.stringify(updated));
      return updated;
    });
    addAuditLog('UPDATE_CERTIFICATE', `แก้ไขข้อมูลบัตรรับรอง ID: ${id}`);
  };

  const verifyCertificate = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = certificates.find(
      (c) => c.certNumber.toUpperCase() === clean
    );
    if (found) {
      // increment verification count
      updateCertificate(found.id, {
        verificationCount: (found.verificationCount || 0) + 1,
      });
      return found;
    }
    return null;
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const count = orders.length + 1;
    const orderNumber = `KDD-ORD-2026-${String(count).padStart(4, '0')}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('kdd_orders', JSON.stringify(updated));
      return updated;
    });
    addAuditLog('CREATE_ORDER', `ลูกค้าสร้างคำสั่งซื้อใหม่: ${orderNumber} ยอดสุทธิ ฿${newOrder.total}`);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    courierName?: string
  ) => {
    setOrders((prev) => {
      const updated = prev.map((o) => {
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
      });
      localStorage.setItem('kdd_orders', JSON.stringify(updated));
      return updated;
    });
    addAuditLog(
      'UPDATE_ORDER_STATUS',
      `อัปเดตสถานะคำสั่งซื้อ ID: ${orderId} เป็น ${status}${
        trackingNumber ? ` (Tracking: ${trackingNumber})` : ''
      }`
    );
  };

  const addArticle = (article: Omit<Article, 'id'>) => {
    const newArt: Article = {
      ...article,
      id: `art-${Date.now()}`,
    };
    setArticles((prev) => {
      const updated = [newArt, ...prev];
      localStorage.setItem('kdd_articles', JSON.stringify(updated));
      return updated;
    });
    addAuditLog('CREATE_ARTICLE', `เพิ่มบทความใหม่: ${newArt.title}`);
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, ...updates } : a));
      localStorage.setItem('kdd_articles', JSON.stringify(updated));
      return updated;
    });
    addAuditLog('UPDATE_ARTICLE', `แก้ไขบทความ ID: ${id}`);
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('kdd_settings', JSON.stringify(updated));
      return updated;
    });
    addAuditLog('UPDATE_SETTINGS', 'ปรับปรุงการตั้งค่าระบบ (Google/LINE/SEO/Payment)');
  };

  return (
    <StoreDataContext.Provider
      value={{
        products,
        certificates,
        orders,
        articles,
        settings,
        auditLogs,
        addProduct,
        updateProduct,
        deleteProduct,
        createCertificate,
        updateCertificate,
        verifyCertificate,
        createOrder,
        updateOrderStatus,
        addArticle,
        updateArticle,
        updateSettings,
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
