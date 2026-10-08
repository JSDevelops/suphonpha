import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import CheckoutPage from '@/app/checkout/page';
import { INITIAL_SETTINGS } from '@/data/mockData';

vi.mock('@/context/CartContext', () => ({
  useCart: () => ({
    items: [
      {
        productId: 'prod-001',
        title: 'กำไลหินมงคล สตรอว์เบอร์รีควอตซ์',
        price: 1690,
        image: '/images/drive/550048_0.jpg',
        quantity: 1,
      },
    ],
    itemCount: 1,
    subtotal: 1690,
    shippingFee: 0,
    discount: 0,
    total: 1690,
    clearCart: vi.fn(),
  }),
}));

vi.mock('@/context/StoreDataContext', () => ({
  useStoreData: () => ({
    settings: INITIAL_SETTINGS,
    createOrder: vi.fn().mockResolvedValue({
      id: 'ord-test-01',
      orderNumber: 'KDD-ORD-2026-TEST',
      paymentMethod: 'bank_transfer',
      status: 'awaiting_review',
      items: [
        {
          productId: 'prod-001',
          title: 'กำไลหินมงคล สตรอว์เบอร์รีควอตซ์',
          price: 1690,
          image: '/images/drive/550048_0.jpg',
          quantity: 1,
        },
      ],
      total: 1690,
      shippingAddress: '123 Test Rd',
    }),
  }),
}));

describe('Checkout Payment Method Verification', () => {
  it('renders ONLY bank transfer payment method and displays bank details', () => {
    render(<CheckoutPage />);

    // Verify bank transfer is present
    expect(screen.getByText(/โอนเงินผ่านบัญชีธนาคาร/i)).toBeTruthy();
    expect(screen.getByText(/โอนผ่านบัญชีธนาคารเท่านั้น/i)).toBeTruthy();

    // Verify bank account details from settings are rendered
    expect(screen.getByText(INITIAL_SETTINGS.bankAccountName)).toBeTruthy();
    expect(screen.getByText(INITIAL_SETTINGS.bankAccountNumber)).toBeTruthy();

    // Verify PromptPay and Credit card options are NOT displayed
    expect(screen.queryByText(/พร้อมเพย์ QR Code/i)).toBeNull();
    expect(screen.queryByText(/บัตรเครดิต \/ เดบิต/i)).toBeNull();
    expect(screen.queryByText(/เชื่อมต่อ Payment Gateway/i)).toBeNull();
  });
});
