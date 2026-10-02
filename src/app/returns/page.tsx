import React from 'react';
import { Metadata } from 'next';
import { RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'เงื่อนไขการรับประกันและการเปลี่ยนสินค้า',
  description: 'นโยบายการรับประกันความเสียหายจากการจัดส่ง และการเปลี่ยนสินค้าของร้าน สุพรภา (Suphonpha)',
};

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-semibold tracking-widest text-[#A98336] uppercase">
          GUARANTEE & RETURNS
        </span>
        <h1 className="font-serif text-3xl font-medium text-[#282522] mt-1">
          เงื่อนไขการรับประกันและการเปลี่ยนคืนสินค้า
        </h1>
      </div>

      <div className="p-8 bg-white rounded-3xl border border-[#E6E1D8] space-y-6 text-xs sm:text-sm text-[#5C5852] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">
            1. การรับประกันกรณีชำรุดเสียหายจากการขนส่ง
          </h2>
          <p>
            หากพัสดุหรือกล่องบรรจุภัณฑ์ฉีกขาด หรือสินค้าภายในแตกหักเสียหายจากการขนส่ง ทางร้านยินดีเปลี่ยนชิ้นใหม่ให้ทันทีโดยไม่มีค่าใช้จ่าย เพียงถ่ายคลิปวิดีโอขณะเปิดกล่องพัสดุและแจ้งทีมงานภายใน 7 วัน นับจากวันที่ได้รับพัสดุ
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">
            2. การรับประกันความแท้ตลอดชีพ (Lifetime Authenticity Guarantee)
          </h2>
          <p>
            วัตถุมงคลและเครื่องประดับทุกชิ้นที่มีบัตรรับรอง Digital Certificate หากตรวจสอบพบว่ามวลสารไม่ตรงกับข้อมูลในบัตรรับรอง ทางร้านยินดีคืนเงินเต็มจำนวน 100%
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">
            3. ที่อยู่สำหรับการส่งเคลมหรือส่งคืนสินค้า
          </h2>
          <div className="p-4 bg-[#F7F4EE] rounded-xl text-xs space-y-1">
            <p><strong>ผู้รับ:</strong> บริษัท สุพรภา จำกัด (แผนกบริการลูกค้า)</p>
            <p><strong>ที่อยู่:</strong> เลขที่ 25 ซอยริมทางด่วน 2 แขวงพระโขนงใต้ เขตพระโขนง กรุงเทพมหานคร 10260</p>
            <p><strong>โทรศัพท์:</strong> <a href="tel:0653062263" className="text-[#4A5D4E] font-medium hover:underline">065-306-2263</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
