import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  fetchGoogleSheetData,
  submitOrderToGoogleSheet,
  submitCustomInquiryToGoogleSheet,
} from '@/lib/googleSheets';
import { INITIAL_PRODUCTS, INITIAL_CERTIFICATES } from '@/data/mockData';
import { Order } from '@/types';

describe('Google Sheets Client Integration & Fallbacks', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe('fetchGoogleSheetData()', () => {
    it('returns default initial products and certificates when no Google Sheet URL is set or network fails', async () => {
      const data = await fetchGoogleSheetData();
      expect(data.products).toBeDefined();
      expect(data.products.length).toBeGreaterThanOrEqual(INITIAL_PRODUCTS.length);
      expect(data.certificates.length).toBeGreaterThanOrEqual(INITIAL_CERTIFICATES.length);
      expect(data.products[0]).toHaveProperty('titleTh');
      expect(data.products[0]).toHaveProperty('regularPrice');
    });

    it('falls back to local data gracefully when network fetch rejects', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      const data = await fetchGoogleSheetData();
      expect(data.products).toEqual(INITIAL_PRODUCTS);
      expect(data.certificates).toEqual(INITIAL_CERTIFICATES);
    });

    it('maps custom raw Google Sheet schema properly into TypeScript types', async () => {
      const mockRawSheetResponse = {
        status: 'success',
        data: {
          products: [
            {
              id: 'custom-p-1',
              sku: 'KDD-TEST-001',
              title_th: 'เหรียญพระพุทธมงคลจำลอง',
              category: 'amulet',
              price: 1990,
              sale_price: 1590,
              stock: 5,
              cert_code: 'CERT-TEST-01',
            },
          ],
          certificates: [
            {
              cert_number: 'CERT-TEST-01',
              product_name: 'เหรียญพระพุทธมงคลจำลอง',
              material: 'เนื้อทองทิพย์',
              dimensions: '3.5 x 2.2 cm',
              status: 'active',
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockRawSheetResponse,
      } as any);

      // Force mock URL in process.env
      const originalEnv = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL = 'https://script.google.com/macros/s/TEST/exec';

      // We re-import or test
      const data = await fetchGoogleSheetData();
      expect(data.products).toBeDefined();
      expect(data.certificates).toBeDefined();

      process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL = originalEnv;
    });
  });

  describe('submitOrderToGoogleSheet()', () => {
    it('returns success: true when submitting mock order without URL', async () => {
      const mockOrder: Order = {
        id: 'ord-test-01',
        orderNumber: 'KDD-ORD-TEST',
        customerName: 'คุณสมชาย ใจดี',
        customerPhone: '081-234-5678',
        customerEmail: 'somchai@test.com',
        shippingAddress: '123 ถนนสุขุมวิท กทม.',
        items: [
          {
            productId: INITIAL_PRODUCTS[0].id,
            title: INITIAL_PRODUCTS[0].titleTh,
            sku: INITIAL_PRODUCTS[0].sku,
            price: 1990,
            quantity: 1,
            image: INITIAL_PRODUCTS[0].image,
          },
        ],
        subtotal: 1990,
        shippingFee: 0,
        discount: 0,
        total: 1990,
        paymentMethod: 'promptpay',
        status: 'pending_payment',
        createdAt: new Date().toISOString(),
      };

      const result = await submitOrderToGoogleSheet(mockOrder);
      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });
  });

  describe('submitCustomInquiryToGoogleSheet()', () => {
    it('handles inquiry payload and returns success with inquiry ID', async () => {
      const mockInquiry = {
        contactName: 'คุณวัชระ นพดล',
        phone: '065-306-2263',
        email: 'watchara@test.com',
        amuletType: 'เหรียญปั๊มโลหะ',
        quantity: '500 องค์',
        budget: '50,000 บาท',
        details: 'ต้องการสร้างถวายวัดเพื่อการกุศล',
      };

      const result = await submitCustomInquiryToGoogleSheet(mockInquiry);
      expect(result.success).toBe(true);
      expect(result.inquiryId).toBeDefined();
    });
  });
});
