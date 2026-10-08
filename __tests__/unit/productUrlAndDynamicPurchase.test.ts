import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { getProductUrl } from '@/lib/productUrl';
import { INITIAL_PRODUCTS, INITIAL_CERTIFICATES } from '@/data/mockData';
import { fetchGoogleSheetData } from '@/lib/googleSheets';

describe('Product URL & Dynamic Purchase 100% Protection', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe('getProductUrl()', () => {
    it('returns direct clean path /product/[id] for pre-rendered static products', () => {
      const staticProduct = INITIAL_PRODUCTS[0];
      const url = getProductUrl(staticProduct);
      expect(url).toBe(`/product/${staticProduct.id}`);
    });

    it('returns /product?id=[id] for newly added dynamic products to prevent 404', () => {
      const dynamicProduct = {
        id: 'prod-20260929-124918',
        sku: 'KDD-2025-999',
        titleTh: 'เหรียญพระพุทธมงคลจำลอง รุ่นสร้างบารมี',
      };
      const url = getProductUrl(dynamicProduct);
      expect(url).toBe('/product?id=prod-20260929-124918');
    });

    it('handles string input correctly', () => {
      expect(getProductUrl('prod-001')).toBe('/product/prod-001');
      expect(getProductUrl('prod-custom-99')).toBe('/product?id=prod-custom-99');
      expect(getProductUrl(null)).toBe('/shop');
      expect(getProductUrl(undefined)).toBe('/shop');
    });
  });

  describe('Product Merging from Google Sheets', () => {
    const origUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;

    beforeEach(() => {
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL = 'https://script.google.com/macros/s/MOCK/exec';
    });

    afterEach(() => {
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL = origUrl;
    });

    it('merges new products from Google Sheet without deleting existing initial products', async () => {
      const newSheetProduct = {
        id: 'prod-new-999',
        sku: 'SPP-NEW-999',
        title_th: 'พระเครื่องรุ่นพิเศษปี 2026',
        category: 'amulet',
        price: 2590,
        stock: 5,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'success',
          data: {
            products: [newSheetProduct],
            certificates: [],
            orders: [],
            inquiries: [],
          },
        }),
      } as any);

      const result = await fetchGoogleSheetData();
      
      // All 15 initial products must be retained
      expect(result.products.length).toBe(INITIAL_PRODUCTS.length + 1);

      // The new product must exist in the returned list
      const added = result.products.find((p) => p.id === 'prod-new-999');
      expect(added).toBeDefined();
      expect(added?.titleTh).toBe('พระเครื่องรุ่นพิเศษปี 2026');
      expect(added?.regularPrice).toBe(2590);
    });

    it('updates existing product price and stock when matching SKU is provided from Google Sheet', async () => {
      const updatedSheetProduct = {
        id: 'prod-001',
        sku: 'SPP-BRC-001',
        title_th: 'กำไลหินมงคล อัปเดตราคาใหม่',
        price: 2190,
        stock: 99,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'success',
          data: {
            products: [updatedSheetProduct],
            certificates: [],
            orders: [],
            inquiries: [],
          },
        }),
      } as any);

      const result = await fetchGoogleSheetData();
      const updated = result.products.find((p) => p.id === 'prod-001');
      expect(updated).toBeDefined();
      expect(updated?.titleTh).toBe('กำไลหินมงคล อัปเดตราคาใหม่');
      expect(updated?.regularPrice).toBe(2190);
      expect(updated?.stock).toBe(99);
    });
  });
});
