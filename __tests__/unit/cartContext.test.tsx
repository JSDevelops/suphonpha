import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import { INITIAL_PRODUCTS } from '@/data/mockData';

describe('CartContext Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('initializes with an empty cart and zero values', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.shippingFee).toBe(0);
    expect(result.current.discount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it('adds an item to cart and calculates subtotal and sale price accurately', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = INITIAL_PRODUCTS[0]; // e.g. price 1990, salePrice 1590

    act(() => {
      result.current.addToCart(product, 1);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.itemCount).toBe(1);

    const expectedPrice = product.salePrice ?? product.regularPrice;
    expect(result.current.subtotal).toBe(expectedPrice);
  });

  it('increments quantity when the same product is added multiple times', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = INITIAL_PRODUCTS[0];
    const expectedPrice = product.salePrice ?? product.regularPrice;

    act(() => {
      result.current.addToCart(product, 1);
    });

    act(() => {
      result.current.addToCart(product, 2);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.itemCount).toBe(3);
    expect(result.current.subtotal).toBe(expectedPrice * 3);
  });

  it('updates item quantity and removes item if quantity reaches 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = INITIAL_PRODUCTS[0];

    act(() => {
      result.current.addToCart(product, 2);
    });

    act(() => {
      result.current.updateQuantity(product.id, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);

    act(() => {
      result.current.updateQuantity(product.id, 0);
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.itemCount).toBe(0);
  });

  it('removes item using removeFromCart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product1 = INITIAL_PRODUCTS[0];
    const product2 = INITIAL_PRODUCTS[1];

    act(() => {
      result.current.addToCart(product1, 1);
      result.current.addToCart(product2, 1);
    });

    expect(result.current.items.length).toBe(2);

    act(() => {
      result.current.removeFromCart(product1.id);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].productId).toBe(product2.id);
  });

  it('applies free shipping when subtotal >= 999 THB, and 50 THB fee when below 999 THB', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    // Find or create a small item < 999 THB (e.g. sticker 99 THB)
    const cheapProduct = INITIAL_PRODUCTS.find((p) => (p.salePrice ?? p.regularPrice) < 999) || {
      ...INITIAL_PRODUCTS[0],
      id: 'cheap-prod',
      regularPrice: 200,
      salePrice: undefined,
    };

    act(() => {
      result.current.addToCart(cheapProduct, 1);
    });

    // Subtotal < 999 -> shippingFee should be 50
    expect(result.current.subtotal).toBeLessThan(999);
    expect(result.current.shippingFee).toBe(50);
    expect(result.current.total).toBe(result.current.subtotal + 50);

    // Now add expensive product to exceed 999 THB
    act(() => {
      result.current.addToCart(INITIAL_PRODUCTS[0], 1); // 1590 THB
    });

    expect(result.current.subtotal).toBeGreaterThanOrEqual(999);
    expect(result.current.shippingFee).toBe(0); // Free shipping!
  });

  it('applies valid promo codes (e.g. LUCK2025) for 100 THB discount and rejects invalid codes', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = INITIAL_PRODUCTS[0];

    act(() => {
      result.current.addToCart(product, 1);
    });

    // Invalid code
    act(() => {
      const res = result.current.applyPromoCode('INVALID_CODE');
      expect(res.success).toBe(false);
    });
    expect(result.current.discount).toBe(0);

    // Valid code
    act(() => {
      const res = result.current.applyPromoCode('luck2025');
      expect(res.success).toBe(true);
    });
    expect(result.current.discount).toBe(100);
    expect(result.current.total).toBe(Math.max(0, result.current.subtotal - 100 + result.current.shippingFee));

    // Remove promo code
    act(() => {
      result.current.removePromoCode();
    });
    expect(result.current.discount).toBe(0);
  });

  it('clears cart and resets all discounts and counters', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(INITIAL_PRODUCTS[0], 2);
      result.current.applyPromoCode('LUCK2025');
    });

    expect(result.current.itemCount).toBe(2);
    expect(result.current.discount).toBe(100);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.discount).toBe(0);
    expect(result.current.total).toBe(0);
  });
});
