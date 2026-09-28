import { describe, it, expect, vi } from 'vitest';
import { GET as getSync } from '@/app/api/sheet/sync/route';
import { POST as postOrder } from '@/app/api/sheet/order/route';
import { POST as postInquiry } from '@/app/api/sheet/custom-inquiry/route';

describe('Next.js API Routes Unit Tests', () => {
  describe('GET /api/sheet/sync', () => {
    it('returns 200 with products, certificates, and orders', async () => {
      const response = await getSync();
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.status).toBe('success');
      expect(json.data).toBeDefined();
      expect(Array.isArray(json.data.products)).toBe(true);
      expect(Array.isArray(json.data.certificates)).toBe(true);
    });
  });

  describe('POST /api/sheet/order', () => {
    it('successfully processes order submission request', async () => {
      const mockReq = new Request('http://localhost:3000/api/sheet/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: {
            orderNumber: 'KDD-ORD-TEST-99',
            customerName: 'คุณทดสอบ ระบบ',
            customerPhone: '065-306-2263',
            items: [],
            total: 1590,
            status: 'pending',
          },
        }),
      });

      const response = await postOrder(mockReq);
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.success).toBe(true);
    });
  });

  describe('POST /api/sheet/custom-inquiry', () => {
    it('successfully processes custom amulet inquiry submission', async () => {
      const mockReq = new Request('http://localhost:3000/api/sheet/custom-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiry: {
            contactName: 'คุณศรัทธา มงคลยิ่ง',
            phone: '065-306-2263',
            lineId: 'sattha_line',
            amuletType: 'พระผงพุทธคุณ',
            quantity: '1,000 องค์',
            budget: '80,000 บาท',
          },
        }),
      });

      const response = await postInquiry(mockReq);
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.inquiryId).toBeDefined();
    });
  });
});
