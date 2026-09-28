import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import React from 'react';
import { StoreDataProvider, useStoreData } from '@/context/StoreDataContext';
import { INITIAL_PRODUCTS, INITIAL_CERTIFICATES } from '@/data/mockData';

describe('StoreDataContext Unit Tests', () => {
  beforeEach(() => {
    // Mock global fetch for /api/sheet/sync and /api/sheet/order
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url === '/api/sheet/sync') {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            status: 'success',
            data: {
              products: INITIAL_PRODUCTS,
              certificates: INITIAL_CERTIFICATES,
              orders: [],
            },
          }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({ status: 'success' }),
      });
    });
  });

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <StoreDataProvider>{children}</StoreDataProvider>
  );

  it('provides initial products and settings correctly', async () => {
    const { result } = renderHook(() => useStoreData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.products.length).toBeGreaterThan(0);
    expect(result.current.settings.companyName).toBe('บริษัท สุพรภา จำกัด');
    expect(result.current.settings.phoneNumber).toBe('065-306-2263');
  });

  describe('Certificate Verification Logic (verifyCertificate)', () => {
    it('verifies an authentic active certificate code correctly (case-insensitive and trimmed)', async () => {
      const { result } = renderHook(() => useStoreData(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      // Test with exact code
      const cert1 = result.current.verifyCertificate('KDD-2025-00101');
      expect(cert1).not.toBeNull();
      expect(cert1?.status).toBe('active');
      expect(cert1?.productName).toBeDefined();

      // Test with lowercase and extra whitespace
      const certLower = result.current.verifyCertificate('  kdd-2025-00101  ');
      expect(certLower).not.toBeNull();
      expect(certLower?.certNumber).toBe('KDD-2025-00101');
    });

    it('identifies revoked certificates properly', async () => {
      const { result } = renderHook(() => useStoreData(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      const revokedCert = INITIAL_CERTIFICATES.find((c) => c.status === 'revoked');

      if (revokedCert) {
        const cert = result.current.verifyCertificate(revokedCert.certNumber);
        expect(cert).not.toBeNull();
        expect(cert?.status).toBe('revoked');
      }
    });

    it('returns null when certificate code does not exist', async () => {
      const { result } = renderHook(() => useStoreData(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      const cert = result.current.verifyCertificate('NON-EXISTENT-CODE-999');
      expect(cert).toBeNull();
    });
  });

  describe('Order Creation and Status Updates', () => {
    it('creates a new order with auto-generated orderNumber and prepends to orders', async () => {
      const { result } = renderHook(() => useStoreData(), { wrapper });

      const initialCount = result.current.orders.length;
      let createdOrder: any;

      await act(async () => {
        createdOrder = await result.current.createOrder({
          customerName: 'คุณภัทรดนัย บุญมี',
          customerPhone: '089-111-2222',
          customerEmail: 'phat@test.com',
          shippingAddress: '456 ถนนสุขุมวิท พระโขนง กทม.',
          items: [
            {
              productId: INITIAL_PRODUCTS[0].id,
              title: INITIAL_PRODUCTS[0].titleTh,
              sku: INITIAL_PRODUCTS[0].sku,
              price: 1590,
              quantity: 1,
              image: INITIAL_PRODUCTS[0].image,
            },
          ],
          subtotal: 1590,
          shippingFee: 0,
          discount: 0,
          total: 1590,
          paymentMethod: 'promptpay',
          status: 'pending_payment',
        });
      });

      expect(createdOrder).toBeDefined();
      expect(createdOrder.orderNumber).toMatch(/^KDD-ORD-2026-\d{4}$/);
      expect(result.current.orders.length).toBe(initialCount + 1);
      expect(result.current.orders[0].id).toBe(createdOrder.id);
    });

    it('updates order status and attaches courier tracking number', async () => {
      const { result } = renderHook(() => useStoreData(), { wrapper });

      let order: any;
      await act(async () => {
        order = await result.current.createOrder({
          customerName: 'คุณสมศักดิ์ มั่นคง',
          customerPhone: '081-333-4444',
          customerEmail: 'somsak@test.com',
          shippingAddress: '789 ถนนพระราม 4 กทม.',
          items: [],
          subtotal: 990,
          shippingFee: 50,
          discount: 0,
          total: 1040,
          paymentMethod: 'bank_transfer',
          status: 'pending_payment',
        });
      });

      act(() => {
        result.current.updateOrderStatus(
          order.id,
          'shipping',
          'TH-KERRY-12345678',
          'Kerry Express'
        );
      });

      const updated = result.current.orders.find((o) => o.id === order.id);
      expect(updated?.status).toBe('shipping');
      expect(updated?.trackingNumber).toBe('TH-KERRY-12345678');
      expect(updated?.courierName).toBe('Kerry Express');
      expect(updated?.paidAt).toBeDefined();
    });
  });
});
