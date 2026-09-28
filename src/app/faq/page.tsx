'use client';

import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqPage() {
  const faqs = [
    {
      q: 'วัตถุมงคลทุกชิ้นเป็นของแท้หรือไม่ และมีใบรับรองอย่างไร?',
      a: 'วัตถุมงคลและเครื่องประดับมงคลทุกรายการคัดสรรผ่านการตรวจสอบความถูกต้องของมวลสารและฝีมือเชิงช่าง โดยมีบัตรรับรอง Digital Certificate ประจำองค์ พร้อมหมายเลขกำกับเฉพาะตัว สามารถนำรหัสมาพิมพ์ค้นหาหรือสแกน QR Code ตรวจสอบบนเว็บไซต์ได้ตลอดเวลา',
    },
    {
      q: 'มีค่าจัดส่งเท่าไหร่ และจัดส่งผ่านช่องทางใด?',
      a: 'ทางร้านจัดส่งฟรีทั่วประเทศเมื่อสั่งซื้อครบ 999 บาทขึ้นไป หากยอดสั่งซื้อไม่ถึง 999 บาท มีค่าจัดส่งอัตราเดียว 50 บาท จัดส่งผ่าน Kerry Express, Flash Express หรือไปรษณีย์ไทย EMS พร้อมแจ้งเลขพัสดุสำหรับติดตามสถานะ',
    },
    {
      q: 'สามารถชำระเงินผ่านช่องทางใดได้บ้าง?',
      a: 'รองรับการชำระเงินผ่านการสแกน PromptPay QR Code, โอนเงินผ่านบัญชีธนาคาร และบัตรเครดิต/เดบิตผ่านระบบ Payment Gateway ที่มีความปลอดภัยสูง',
    },
    {
      q: 'หากสินค้าชำรุดเสียหายจากการขนส่ง สามารถเคลมได้หรือไม่?',
      a: 'หากพัสดุเกิดความเสียหายจากการขนส่ง เพียงส่งคลิปวิดีโอขณะเปิดกล่องให้ทีมงานทาง LINE Official: @konduangdee ภายใน 7 วัน ทางร้านจะจัดส่งชิ้นใหม่ให้ทันทีโดยไม่มีค่าใช้จ่ายเพิ่มเติม',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-semibold tracking-widest text-[#A98336] uppercase">
          FAQ & SUPPORT
        </span>
        <h1 className="font-serif text-3xl font-medium text-[#282522] mt-1">
          คำถามที่พบบ่อย (FAQ)
        </h1>
        <p className="text-xs text-gray-500 mt-1">คำตอบสำหรับข้อสงสัยที่พบบ่อยที่สุด</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-2 text-xs sm:text-sm text-[#5C5852]"
          >
            <h3 className="font-serif text-base font-semibold text-[#282522] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#4A5D4E] shrink-0" />
              {faq.q}
            </h3>
            <p className="pl-7 leading-relaxed font-light">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
