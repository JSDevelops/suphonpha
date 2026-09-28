import { describe, it, expect } from 'vitest';
import {
  fetchGoogleSheetData,
  submitOrderToGoogleSheet,
  submitCustomInquiryToGoogleSheet,
} from '@/lib/googleSheets';

describe('Google Sheets Direct Client Unit Tests', () => {
  describe('fetchGoogleSheetData', () => {
    it('returns products, certificates, and orders with fallbacks', async () => {
      const data = await fetchGoogleSheetData();
      expect(data).toBeDefined();
      expect(Array.isArray(data.products)).toBe(true);
      expect(data.products.length).toBeGreaterThan(0);
      expect(Array.isArray(data.certificates)).toBe(true);
      expect(data.certificates.length).toBeGreaterThan(0);
    });
  });

  describe('submitOrderToGoogleSheet', () => {
    it('successfully processes order submission', async () => {
      const result = await submitOrderToGoogleSheet({
        id: 'ord-test-unit',
        orderNumber: 'KDD-ORD-UNIT-99',
        customerName: 'คุณทดสอบ ระบบ',
        customerPhone: '065-306-2263',
        customerEmail: 'test@example.com',
        shippingAddress: '123 กทม.',
        items: [],
        subtotal: 1590,
        discount: 0,
        shippingFee: 0,
        total: 1590,
        status: 'awaiting_review',
        paymentMethod: 'bank_transfer',
        createdAt: new Date().toISOString(),
      });
      expect(result.success).toBe(true);
    });
  });

  describe('submitCustomInquiryToGoogleSheet', () => {
    it('successfully processes custom amulet inquiry submission', async () => {
      const result = await submitCustomInquiryToGoogleSheet({
        contactName: 'คุณศรัทธา มงคลยิ่ง',
        phone: '065-306-2263',
        lineId: 'sattha_line',
        amuletType: 'พระผงพุทธคุณ',
        quantity: '1,000 องค์',
        budget: '80,000 บาท',
      });
      expect(result.success).toBe(true);
      expect(result.inquiryId).toBeDefined();
    });
  });
});
