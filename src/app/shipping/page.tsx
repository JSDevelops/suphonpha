import React from 'react';
import { Metadata } from 'next';
import { Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'นโยบายการจัดส่ง (Shipping Policy)',
  description: 'นโยบายการจัดส่งสินค้าของ คนดวงดี 2025 จัดส่งด่วนทั่วประเทศ รับประกันความปลอดภัยและการแพ็กเกจจิ้งมาตรฐานสากล',
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-semibold tracking-widest text-[#A98336] uppercase">
          LOGISTICS & DELIVERY
        </span>
        <h1 className="font-serif text-3xl font-medium text-[#282522] mt-1">
          นโยบายการจัดส่งสินค้า (Shipping Policy)
        </h1>
        <p className="text-xs text-gray-500 mt-1">บริการจัดส่งด่วนมาตรฐานทั่วประเทศไทย</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-2">
          <Truck className="w-8 h-8 text-[#4A5D4E]" />
          <h3 className="font-serif font-semibold text-[#282522]">จัดส่งฟรีทั่วประเทศ</h3>
          <p className="text-xs text-[#5C5852]">
            เมื่อมียอดสั่งซื้อสุทธิตั้งแต่ <strong>999 บาทขึ้นไป</strong> (หากยอดต่ำกว่า คิดค่าจัดส่งอัตราเดียว 50 บาท)
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-2">
          <Clock className="w-8 h-8 text-[#4A5D4E]" />
          <h3 className="font-serif font-semibold text-[#282522]">ระยะเวลาจัดส่ง</h3>
          <p className="text-xs text-[#5C5852]">
            กรุงเทพฯ และปริมณฑล 1-2 วันทำการ / ต่างจังหวัด 2-3 วันทำการ (จัดส่งผ่าน Kerry, Flash, ไปรษณีย์ไทย)
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-2">
          <ShieldCheck className="w-8 h-8 text-[#4A5D4E]" />
          <h3 className="font-serif font-semibold text-[#282522]">การแพ็กสินค้าปลอดภัย</h3>
          <p className="text-xs text-[#5C5852]">
            บรรจุกล่องบุฟองน้ำกันกระแทกอย่างหนาแน่น พร้อมใบรับรอง Certificate และของกำนัลในทุกกล่องพัสดุ
          </p>
        </div>
      </div>
    </div>
  );
}
