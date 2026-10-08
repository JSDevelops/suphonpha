'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from '@/components/SafeImage';
import { useCart } from '@/context/CartContext';
import { useStoreData } from '@/context/StoreDataContext';
import {
  Building,
  UploadCloud,
  CheckCircle2,
  ArrowLeft,
  Truck,
  Copy,
  Check,
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, discount, shippingFee, total, clearCart } = useCart();
  const { settings, createOrder } = useStoreData();

  // Form states
  const [customerName, setCustomerName] = useState('คุณณัฐพร วงศ์สว่าง');
  const [customerPhone, setCustomerPhone] = useState('081-234-5678');
  const [customerEmail, setCustomerEmail] = useState('customer@suphonpha.com');
  const [shippingAddress, setShippingAddress] = useState(
    '123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110'
  );
  const paymentMethod = 'bank_transfer' as const;

  // Slip upload simulation
  const [slipUploaded, setSlipUploaded] = useState(false);
  const [slipFileName, setSlipFileName] = useState('');

  // Order submission
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A98336]">
            สั่งซื้อสำเร็จเรียบร้อย
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#282522]">
            ขอบพระคุณสำหรับคำสั่งซื้อ
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
            คำสั่งซื้อเลขที่ <strong className="font-mono text-[#4A5D4E]">{confirmedOrder.orderNumber}</strong> ได้รับการบันทึกในระบบแล้ว
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] text-left text-xs space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="flex justify-between pb-3 border-b border-gray-100">
            <span className="text-gray-500">สถานะคำสั่งซื้อ:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
              {confirmedOrder.status === 'awaiting_review' ? 'รอแอดมินตรวจสอบสลิป' : 'ชำระแล้ว'}
            </span>
          </div>

          <div className="flex justify-between pb-3 border-b border-gray-100">
            <span className="text-gray-500">วิธีชำระเงิน:</span>
            <span className="font-semibold text-[#4A5D4E] flex items-center gap-1">
              <Building className="w-3.5 h-3.5" />
              โอนผ่านบัญชีธนาคาร
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-gray-400 block font-medium">รายการสินค้า:</span>
            {confirmedOrder.items.map((it: any) => (
              <div key={it.productId} className="flex justify-between text-[#282522]">
                <span>{it.title} x {it.quantity}</span>
                <span className="font-medium">฿{(it.price * it.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-1">
            <div className="flex justify-between text-gray-500">
              <span>ค่าจัดส่ง</span>
              <span>{confirmedOrder.shippingFee === 0 ? 'ฟรี' : `฿${confirmedOrder.shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-[#282522] pt-1">
              <span>ยอดชำระสุทธิ</span>
              <span className="text-[#4A5D4E]">฿{confirmedOrder.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <span className="text-gray-400 block">จัดส่งไปยัง:</span>
            <p className="font-medium text-[#282522] mt-0.5">{confirmedOrder.shippingAddress}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Link
            href="/account"
            className="px-6 py-2.5 bg-[#4A5D4E] text-white text-xs font-semibold rounded-lg hover:bg-[#37473A] transition-colors"
          >
            ดูประวัติคำสั่งซื้อ & ติดตามพัสดุ
          </Link>
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-white border border-[#E6E1D8] text-[#5C5852] text-xs font-medium rounded-lg hover:bg-[#F7F4EE] transition-colors"
          >
            กลับสู่หน้าร้าน
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#282522]">ไม่มีสินค้าในตะกร้าของคุณ</h2>
        <p className="text-xs text-gray-500">กรุณาเลือกสินค้าจากหน้าร้านก่อนทำการชำระเงิน</p>
        <Link
          href="/shop"
          className="inline-block px-6 py-2.5 bg-[#4A5D4E] text-white text-xs font-semibold rounded-lg hover:bg-[#37473A]"
        >
          ไปยังหน้ารวมสินค้า
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !shippingAddress) {
      alert('กรุณากรอกข้อมูลที่อยู่จัดส่งให้ครบถ้วน');
      return;
    }
    setSubmitting(true);

    try {
      const order = await createOrder({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        items,
        subtotal,
        discount,
        shippingFee,
        total,
        status: 'awaiting_review',
        paymentMethod: 'bank_transfer',
        slipUrl: slipUploaded ? '/images/products/pendant-buddha.jpg' : undefined,
      });

      clearCart();
      setConfirmedOrder(order);
    } catch (err) {
      console.error('Error creating order:', err);
      alert('เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back link */}
      <div>
        <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs text-[#5C5852] hover:text-[#4A5D4E]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>กลับไปเลือกสินค้าเพิ่มเติม</span>
        </Link>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#282522] mt-2">
          ดำเนินการชำระเงิน (Checkout)
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Shipping & Payment Options (8 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Contact & Shipping Address */}
          <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-4 shadow-2xs">
            <h3 className="font-serif text-base font-semibold text-[#282522] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4A5D4E] text-white text-xs flex items-center justify-center font-sans">
                1
              </span>
              ข้อมูลผู้รับและที่อยู่จัดส่ง
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">ชื่อ-นามสกุล ผู้รับ *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#4A5D4E]"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1 font-medium">เบอร์โทรศัพท์ติดต่อ *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#4A5D4E]"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-gray-600 mb-1 font-medium">อีเมลสำหรับรับใบเสร็จ</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#4A5D4E]"
              />
            </div>

            <div className="text-xs">
              <label className="block text-gray-600 mb-1 font-medium">ที่อยู่จัดส่งโดยละเอียด *</label>
              <textarea
                rows={3}
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#4A5D4E]"
              />
            </div>
          </div>

          {/* Step 2: Payment Method (Bank Transfer Only) */}
          <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-5 shadow-2xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-serif text-base font-semibold text-[#282522] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4A5D4E] text-white text-xs flex items-center justify-center font-sans">
                  2
                </span>
                วิธีชำระเงิน
              </h3>
              <span className="text-xs px-2.5 py-1 bg-[#E8EFEA] text-[#4A5D4E] font-medium rounded-full flex items-center gap-1.5 border border-[#4A5D4E]/20">
                <Building className="w-3.5 h-3.5" />
                โอนผ่านบัญชีธนาคารเท่านั้น
              </span>
            </div>

            {/* Designated Bank Transfer Card */}
            <div className="p-4 rounded-xl border-2 border-[#4A5D4E] bg-[#E8EFEA]/30 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#4A5D4E] text-white flex items-center justify-center shadow-xs shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#282522]">โอนเงินผ่านบัญชีธนาคาร (Bank Transfer)</h4>
                  <p className="text-xs text-gray-600">{settings.bankName} • มีระบบตรวจสอบสลิปปลอดภัย</p>
                </div>
              </div>
              <span className="text-xs bg-[#4A5D4E] text-white px-2.5 py-1 rounded-full font-medium shrink-0">
                เลือกแล้ว
              </span>
            </div>

            {/* Bank Details & Slip Upload Box */}
            <div className="p-5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-20 h-20 rounded-2xl bg-white border border-[#E6E1D8] flex items-center justify-center shadow-xs shrink-0 text-[#4A5D4E]">
                  <Building className="w-10 h-10" />
                </div>

                <div className="text-xs space-y-2 text-[#5C5852] w-full">
                  <p className="font-medium text-[#282522]">
                    ชื่อบัญชี: <strong className="text-sm">{settings.bankAccountName}</strong>
                  </p>
                  <p>
                    ธนาคาร: <strong>{settings.bankName}</strong>
                  </p>
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="font-mono">
                      เลขที่บัญชี: <strong className="text-[#4A5D4E] text-base tracking-wider">{settings.bankAccountNumber}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(settings.bankAccountNumber.replace(/-/g, ''));
                        setCopiedAccount(true);
                        setTimeout(() => setCopiedAccount(false), 2000);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-white border border-[#D8D1C7] hover:border-[#4A5D4E] text-[#4A5D4E] font-medium rounded-lg transition-colors shadow-2xs cursor-pointer"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#4A5D4E]" />
                          <span>คัดลอกเลขบัญชีแล้ว</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>คัดลอกเลขบัญชี</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#A98336] font-semibold pt-1">
                    ยอดที่ต้องโอนชำระ: <span className="text-base text-[#4A5D4E]">฿{total.toLocaleString()}</span> บาท
                  </p>
                </div>
              </div>

              {/* Slip Upload Area */}
              <div className="pt-3 border-t border-[#E6E1D8]">
                <label className="block text-xs font-semibold text-[#282522] mb-2">
                  แนบหลักฐานการโอนเงิน (สลิป)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-white border border-[#E6E1D8] rounded-lg text-xs font-medium text-[#4A5D4E] hover:bg-[#E8EFEA] transition-colors flex items-center gap-1.5 shadow-2xs">
                    <UploadCloud className="w-4 h-4" />
                    <span>{slipUploaded ? 'เปลี่ยนรูปสลิป' : 'เลือกไฟล์รูปภาพสลิป'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setSlipUploaded(true);
                          setSlipFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>

                  {slipUploaded ? (
                    <span className="text-xs text-green-700 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-4 h-4" /> {slipFileName || 'แนบสลิปเรียบร้อย'}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">
                      (สามารถแนบสลิปตอนนี้ หรือแจ้งสลิปย้อนหลังผ่านหน้าประวัติคำสั่งซื้อ)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Sidebar (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#282522]">
              สรุปรายการสั่งซื้อ ({items.length})
            </h3>

            {/* Item list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.productId} className="flex gap-3 text-xs py-2 border-b border-gray-100">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F7F4EE] shrink-0 border border-gray-100">
                    <Image src={it.image} alt={it.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-[#282522] truncate">{it.title}</h5>
                    <p className="text-gray-400 text-[11px]">จำนวน: {it.quantity} ชิ้น</p>
                    <span className="font-semibold text-[#4A5D4E]">
                      ฿{(it.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-2 text-xs text-[#5C5852]">
              <div className="flex justify-between">
                <span>ยอดรวมสินค้า</span>
                <span>฿{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#4A5D4E]">
                  <span>ส่วนลดคูปอง</span>
                  <span>-฿{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ค่าจัดส่ง</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#4A5D4E] font-medium">ฟรี</span>
                  ) : (
                    `฿${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#282522] pt-2 border-t border-gray-100">
                <span>ยอดสุทธิที่ต้องชำระ</span>
                <span className="text-[#4A5D4E]">฿{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#4A5D4E] hover:bg-[#37473A] text-white text-xs font-semibold tracking-wider rounded-xl transition-all shadow-md disabled:opacity-50"
            >
              {submitting ? 'กำลังบันทึกคำสั่งซื้อ...' : 'ยืนยันการสั่งซื้อ'}
            </button>

            <div className="pt-2 text-[11px] text-[#8E8A83] text-center space-y-1">
              <p className="flex items-center justify-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#4A5D4E]" />
                จัดส่งสินค้าภายใน 1-2 วันทำการหลังยืนยันยอด
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
