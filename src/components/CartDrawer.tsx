'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shippingFee,
    total,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ success: res.success, text: res.message });
  };

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF8] shadow-2xl flex flex-col border-l border-[#E6E1D8]">
          {/* Header */}
          <div className="p-5 border-b border-[#E6E1D8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-medium text-[#282522]">ตะกร้าวัตถุมงคล</h2>
              <span className="px-2 py-0.5 text-xs bg-[#E8EFEA] text-[#4A5D4E] font-medium rounded-full">
                {itemCount} รายการ
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-[#F7F4EE] px-5 py-3 border-b border-[#E6E1D8]">
            <div className="text-xs text-[#5C5852] flex justify-between mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span>
                  ซื้อเพิ่มอีก <strong className="text-[#4A5D4E]">฿{remainingForFreeShipping.toLocaleString()}</strong> เพื่อรับสิทธิ์จัดส่งฟรี!
                </span>
              ) : (
                <span className="text-[#4A5D4E] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> ยอดสั่งซื้อของคุณได้รับสิทธิ์จัดส่งฟรีทั่วประเทศ
                </span>
              )}
              <span>{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-[#E6E1D8] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#4A5D4E] h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#E8EFEA] flex items-center justify-center text-[#4A5D4E] mb-4">
                  <Tag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-base font-medium text-[#282522]">ยังไม่มีสินค้าในตะกร้า</h3>
                <p className="text-xs text-[#8E8A83] mt-1 max-w-xs">
                  เลือกชมวัตถุมงคลและเครื่องประดับสายมูร่วมสมัยเพื่อเสริมกำลังใจในชีวิตประจำวัน
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-6 py-2.5 bg-[#4A5D4E] text-white text-xs font-medium rounded-lg hover:bg-[#37473A] transition-colors"
                >
                  เลือกชมสินค้ามงคล
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3.5 p-3 bg-white rounded-xl border border-[#E6E1D8] shadow-xs"
                >
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#F7F4EE] border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-medium text-[#282522] line-clamp-2 leading-relaxed">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#8E8A83] mt-0.5">SKU: {item.sku}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-semibold text-[#4A5D4E]">
                        ฿{(item.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-300 hover:text-red-500 p-1 transition-colors"
                        title="ลบรายการ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E6E1D8] space-y-3.5">
              {/* Promo code field */}
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 bg-[#E8EFEA] rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-[#4A5D4E] font-medium">
                    <Check className="w-4 h-4" />
                    <span>โค้ด &lsquo;{promoCode}&rsquo; ลด ฿{discount}</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-red-500 hover:underline"
                  >
                    ยกเลิก
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="โค้ดส่วนลด (เช่น LUCK2025)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200 uppercase focus:outline-hidden focus:border-[#4A5D4E]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#F7F4EE] hover:bg-[#E8EFEA] text-[#4A5D4E] font-medium text-xs rounded-lg border border-[#E6E1D8] transition-colors"
                  >
                    ใช้โค้ด
                  </button>
                </form>
              )}

              {promoMessage && (
                <p
                  className={`text-[11px] flex items-center gap-1 ${
                    promoMessage.success ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {promoMessage.success ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {promoMessage.text}
                </p>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-gray-100">
                <div className="flex justify-between text-[#5C5852]">
                  <span>ยอดรวมสินค้า</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#4A5D4E]">
                    <span>ส่วนลดคูปอง</span>
                    <span>-฿{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5C5852]">
                  <span>ค่าจัดส่ง</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-[#4A5D4E] font-medium">ฟรี</span>
                    ) : (
                      `฿${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#282522] pt-2 border-t border-gray-100">
                  <span>ยอดชำระสุทธิ</span>
                  <span className="text-[#4A5D4E] text-base">฿{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#4A5D4E] hover:bg-[#37473A] text-white text-xs font-semibold tracking-wider rounded-lg transition-colors shadow-xs"
              >
                <span>ดำเนินการชำระเงิน</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
