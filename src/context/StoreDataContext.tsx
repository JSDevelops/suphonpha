'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Certificate, Order, Article, OrderStatus, CustomInquiry } from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CERTIFICATES,
  INITIAL_ORDERS,
  INITIAL_ARTICLES,
  INITIAL_SETTINGS,
  INITIAL_INQUIRIES,
} from '@/data/mockData';
import {
  fetchGoogleSheetData,
  submitOrderToGoogleSheet,
  saveProductToGoogleSheet,
  deleteProductFromGoogleSheet,
  updateOrderStatusInGoogleSheet,
  saveCertificateToGoogleSheet,
  deleteCertificateFromGoogleSheet,
  updateInquiryStatusInGoogleSheet,
} from '@/lib/googleSheets';

interface StoreDataContextType {
  products: Product[];
  certificates: Certificate[];
  orders: Order[];
  articles: Article[];
  inquiries: CustomInquiry[];
  settings: typeof INITIAL_SETTINGS;
  isLoading: boolean;
  verifyCertificate: (code: string) => Certificate | null;
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Promise<Order>;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    courierName?: string
  ) => Promise<{ success: boolean; message?: string }>;
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => Promise<{ success: boolean; message?: string; product?: Product }>;
  updateProduct: (product: Product) => Promise<{ success: boolean; message?: string }>;
  deleteProduct: (productId: string, sku?: string) => Promise<{ success: boolean; message?: string }>;
  addCertificate: (cert: Omit<Certificate, 'id'> & { id?: string }) => Promise<{ success: boolean; message?: string; certificate?: Certificate }>;
  updateCertificate: (cert: Certificate) => Promise<{ success: boolean; message?: string }>;
  deleteCertificate: (certNumber: string, id?: string) => Promise<{ success: boolean; message?: string }>;
  updateInquiryStatus: (inquiryId: string, status: string) => Promise<{ success: boolean; message?: string }>;
  refreshFromGoogleSheet: () => Promise<void>;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

export const StoreDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [inquiries, setInquiries] = useState<CustomInquiry[]>(INITIAL_INQUIRIES);
  const [articles] = useState<Article[]>(INITIAL_ARTICLES);
  const [settings] = useState(INITIAL_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper บันทึกข้อมูลลงแคชเครื่องเพื่อความเร็วสูงสุด (Instant Load)
  const persistToCache = (updated: {
    products?: Product[];
    certificates?: Certificate[];
    orders?: Order[];
    inquiries?: CustomInquiry[];
  }) => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('suphonpha_sheet_cache');
      const prev = raw ? JSON.parse(raw) : {};
      const merged = {
        ...prev,
        ...updated,
        cachedAt: Date.now(),
      };
      localStorage.setItem('suphonpha_sheet_cache', JSON.stringify(merged));
    } catch {}
  };

  // Sync with Google Sheet / LocalStorage on mount (Stale-While-Revalidate)
  useEffect(() => {
    async function loadData() {
      // 1. Fast Cache Hydration (0.01s - แสดงข้อมูลทันที ไม่ต้องรอดาวน์โหลด)
      try {
        const raw = localStorage.getItem('suphonpha_sheet_cache');
        if (raw) {
          const cached = JSON.parse(raw);
          if (cached.products?.length > 0) setProducts(cached.products);
          if (cached.certificates?.length > 0) setCertificates(cached.certificates);
          if (cached.orders?.length > 0) setOrders(cached.orders);
          if (cached.inquiries?.length > 0) setInquiries(cached.inquiries);
          setIsLoading(false); // ปลดล็อก UI ทันที
        }
      } catch {}

      // 2. Background Revalidation จาก Google Sheets (ทำงานเบื้องหลัง)
      try {
        const sheetData = await fetchGoogleSheetData();
        if (sheetData.products?.length > 0) setProducts(sheetData.products);
        if (sheetData.certificates?.length > 0) setCertificates(sheetData.certificates);
        if (sheetData.orders?.length > 0) setOrders(sheetData.orders);
        if (sheetData.inquiries?.length > 0) setInquiries(sheetData.inquiries);
        persistToCache(sheetData);
      } catch (err) {
        console.warn('Using local starter data / cache:', err);
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
      if (sheetData.inquiries?.length > 0) setInquiries(sheetData.inquiries);
      persistToCache(sheetData);
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

    // 1. Update local state & persist to cache
    setOrders((prev) => {
      const next = [newOrder, ...prev];
      persistToCache({ orders: next });
      return next;
    });

    // 2. Post directly to Google Sheet
    try {
      await submitOrderToGoogleSheet(newOrder);
    } catch (e) {
      console.warn('Order saved locally, failed to sync with remote sheet:', e);
    }

    return newOrder;
  };

  // Helper ตรวจสอบสิทธิ์เฉพาะผู้ดูแลระบบ (Admin & Super Admin)
  const isAuthorizedAdmin = (): boolean => {
    if (process.env.NODE_ENV === 'test') return true;
    if (typeof window === 'undefined') return true;
    try {
      const rawUser = localStorage.getItem('kdd_user');
      if (!rawUser) return false;
      const parsed = JSON.parse(rawUser);
      return parsed?.role === 'admin' || parsed?.role === 'super_admin';
    } catch {
      return false;
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    courierName?: string
  ): Promise<{ success: boolean; message?: string }> => {
    if (!isAuthorizedAdmin()) {
      return { success: false, message: 'สิทธิ์ไม่เพียงพอ: สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' };
    }
    const targetOrder = orders.find((o) => o.id === orderId || o.orderNumber === orderId);

    setOrders((prev) => {
      const next = prev.map((o) => {
        if (o.id === orderId || o.orderNumber === orderId) {
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
      persistToCache({ orders: next });
      return next;
    });

    if (targetOrder) {
      try {
        const res = await updateOrderStatusInGoogleSheet(
          targetOrder.orderNumber,
          status,
          trackingNumber,
          courierName
        );
        return { success: true, message: res.message || 'อัปเดตสถานะสำเร็จ' };
      } catch (err: any) {
        console.warn('Order status updated locally, failed to sync with remote sheet:', err);
        return { success: true, message: 'อัปเดตในเครื่องสำเร็จ' };
      }
    }
    return { success: true, message: 'อัปเดตสถานะสำเร็จ' };
  };

  const addProduct = async (
    productData: Omit<Product, 'id'> & { id?: string }
  ): Promise<{ success: boolean; message?: string; product?: Product }> => {
    if (!isAuthorizedAdmin()) {
      return { success: false, message: 'สิทธิ์ไม่เพียงพอ: สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' };
    }
    const newId = productData.id || `prod-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
      sku: productData.sku || `SKU-${Date.now().toString().slice(-6)}`,
      categoryLabelTh:
        productData.categoryLabelTh ||
        (productData.category === 'amulet'
          ? 'วัตถุมงคล'
          : productData.category === 'bracelet'
          ? 'กำไล / สร้อยข้อมือ'
          : productData.category === 'ring'
          ? 'แหวนมงคล'
          : productData.category === 'sticker'
          ? 'ผ้ายันต์ / สติ๊กเกอร์'
          : 'ของมงคล'),
      gallery: productData.gallery?.length ? productData.gallery : [productData.image],
    };

    // 1. Optimistic update & cache
    setProducts((prev) => {
      const next = [newProduct, ...prev];
      persistToCache({ products: next });
      return next;
    });

    // 2. Sync to Google Sheet
    try {
      const res = await saveProductToGoogleSheet(newProduct);
      return { success: true, message: res.message || 'เพิ่มสินค้าสำเร็จ', product: newProduct };
    } catch (e: any) {
      console.warn('Product saved locally, sync warning:', e);
      return { success: true, message: 'บันทึกสินค้าในเครื่องสำเร็จ', product: newProduct };
    }
  };

  const updateProduct = async (
    product: Product
  ): Promise<{ success: boolean; message?: string }> => {
    if (!isAuthorizedAdmin()) {
      return { success: false, message: 'สิทธิ์ไม่เพียงพอ: สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' };
    }
    // 1. Optimistic update & cache
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === product.id ? product : p));
      persistToCache({ products: next });
      return next;
    });

    // 2. Sync to Google Sheet
    try {
      const res = await saveProductToGoogleSheet(product);
      return { success: true, message: res.message || 'อัปเดตสินค้าสำเร็จ' };
    } catch (e: any) {
      console.warn('Product updated locally, sync warning:', e);
      return { success: true, message: 'อัปเดตสินค้าในเครื่องสำเร็จ' };
    }
  };

  const deleteProduct = async (
    productId: string,
    sku?: string
  ): Promise<{ success: boolean; message?: string }> => {
    if (!isAuthorizedAdmin()) {
      return { success: false, message: 'สิทธิ์ไม่เพียงพอ: สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' };
    }
    // 1. Optimistic update & cache
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== productId && (!sku || p.sku !== sku));
      persistToCache({ products: next });
      return next;
    });

    // 2. Sync to Google Sheet
    try {
      const res = await deleteProductFromGoogleSheet(productId, sku);
      return { success: true, message: res.message || 'ลบสินค้าสำเร็จ' };
    } catch (e: any) {
      console.warn('Product deleted locally, sync warning:', e);
      return { success: true, message: 'ลบสินค้าในเครื่องสำเร็จ' };
    }
  };

  const addCertificate = async (
    certData: Omit<Certificate, 'id'> & { id?: string }
  ): Promise<{ success: boolean; message?: string; certificate?: Certificate }> => {
    if (!isAuthorizedAdmin()) {
      return { success: false, message: 'สิทธิ์ไม่เพียงพอ: สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' };
    }
    const newId = certData.id || `cert-${Date.now()}`;
    const newCert: Certificate = {
      ...certData,
      id: newId,
      verificationCount: certData.verificationCount || 1,
    };

    setCertificates((prev) => {
      const next = [newCert, ...prev];
      persistToCache({ certificates: next });
      return next;
    });

    try {
      const res = await saveCertificateToGoogleSheet(newCert);
      return { success: true, message: res.message || 'ออกใบรับรองสำเร็จ', certificate: newCert };
    } catch (e: any) {
      console.warn('Certificate saved locally, sync warning:', e);
      return { success: true, message: 'บันทึกใบรับรองในเครื่องสำเร็จ', certificate: newCert };
    }
  };

  const updateCertificate = async (
    cert: Certificate
  ): Promise<{ success: boolean; message?: string }> => {
    if (!isAuthorizedAdmin()) {
      return { success: false, message: 'สิทธิ์ไม่เพียงพอ: สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' };
    }
    setCertificates((prev) => {
      const next = prev.map((c) => (c.id === cert.id || c.certNumber === cert.certNumber ? cert : c));
      persistToCache({ certificates: next });
      return next;
    });

    try {
      const res = await saveCertificateToGoogleSheet(cert);
      return { success: true, message: res.message || 'อัปเดตใบรับรองสำเร็จ' };
    } catch (e: any) {
      console.warn('Certificate updated locally, sync warning:', e);
      return { success: true, message: 'อัปเดตใบรับรองในเครื่องสำเร็จ' };
    }
  };

  const deleteCertificate = async (
    certNumber: string,
    id?: string
  ): Promise<{ success: boolean; message?: string }> => {
    if (!isAuthorizedAdmin()) {
      return { success: false, message: 'สิทธิ์ไม่เพียงพอ: สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' };
    }
    setCertificates((prev) => {
      const next = prev.filter((c) => c.certNumber !== certNumber && (!id || c.id !== id));
      persistToCache({ certificates: next });
      return next;
    });

    try {
      const res = await deleteCertificateFromGoogleSheet(certNumber, id);
      return { success: true, message: res.message || 'ลบใบรับรองสำเร็จ' };
    } catch (e: any) {
      console.warn('Certificate deleted locally, sync warning:', e);
      return { success: true, message: 'ลบใบรับรองในเครื่องสำเร็จ' };
    }
  };

  const updateInquiryStatus = async (
    inquiryId: string,
    status: string
  ): Promise<{ success: boolean; message?: string }> => {
    if (!isAuthorizedAdmin()) {
      return { success: false, message: 'สิทธิ์ไม่เพียงพอ: สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' };
    }
    setInquiries((prev) => {
      const next = prev.map((inq) => (inq.id === inquiryId ? { ...inq, status } : inq));
      persistToCache({ inquiries: next });
      return next;
    });

    try {
      const res = await updateInquiryStatusInGoogleSheet(inquiryId, status);
      return { success: true, message: res.message || 'อัปเดตสถานะคำขอสำเร็จ' };
    } catch (e: any) {
      console.warn('Inquiry updated locally, sync warning:', e);
      return { success: true, message: 'อัปเดตสถานะคำขอในเครื่องสำเร็จ' };
    }
  };

  return (
    <StoreDataContext.Provider
      value={{
        products,
        certificates,
        orders,
        articles,
        inquiries,
        settings,
        isLoading,
        verifyCertificate,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        updateInquiryStatus,
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

