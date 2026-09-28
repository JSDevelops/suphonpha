'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-semibold tracking-widest text-[#A98336] uppercase">
          LEGAL & COMPLIANCE
        </span>
        <h1 className="font-serif text-3xl font-medium text-[#282522] mt-1">
          นโยบายความเป็นส่วนตัว (Privacy Policy / PDPA)
        </h1>
        <p className="text-xs text-gray-500 mt-1">อัปเดตล่าสุด: มกราคม 2025</p>
      </div>

      <div className="p-8 bg-white rounded-3xl border border-[#E6E1D8] space-y-6 text-xs sm:text-sm text-[#5C5852] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">1. บทนำและขอบเขต</h2>
          <p>
            ร้าน &ldquo;คนดวงดี 2025&rdquo; ดำเนินงานโดย <strong>บริษัท สุพรภา จำกัด</strong> (เลขทะเบียนนิติบุคคล: 0105569013597) ให้ความสำคัญยิ่งต่อการคุ้มครองข้อมูลส่วนบุคคลของท่านตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) นโยบายฉบับนี้อธิบายถึงวิธีการที่เราเก็บรวบรวม ใช้ และปกป้องข้อมูลของท่านเมื่อใช้งานเว็บไซต์
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">2. ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม</h2>
          <p>เราเก็บรวบรวมข้อมูลเท่าที่จำเป็นเพื่อการให้บริการจัดส่งและยืนยันตัวตน ได้แก่:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>ข้อมูลติดต่อ: ชื่อ-นามสกุล, ที่อยู่สำหรับจัดส่งพัสดุ, หมายเลขโทรศัพท์ และอีเมล</li>
            <li>ข้อมูลการสั่งซื้อ: ประวัติรายการสินค้าที่เช่าบูชา, เวลาสั่งซื้อ, ยอดสุทธิ และหลักฐานการชำระเงิน</li>
            <li>ข้อมูลบัญชี: ข้อมูลการเชื่อมต่อ LINE User ID หรือหมายเลขโทรศัพท์สำหรับ OTP</li>
            <li>ข้อมูลทางเทคนิค: IP Address, ประเภทเบราว์เซอร์, และข้อมูลคุกกี้ที่จำเป็นสำหรับการทำงานของเว็บไซต์</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">3. การไม่ส่งข้อมูลระบุตัวตน (PII) ไปยังระบบสถิติภายนอก</h2>
          <p>
            ตามหลักปฏิบัติของระบบ Google Analytics และ Google Tag Manager ทางเราจะไม่ส่งข้อมูลระบุตัวบุคคล (เช่น อีเมล, เบอร์โทรศัพท์, หรือชื่อจริง) ไปยังเซิร์ฟเวอร์วิเคราะห์สถิติภายนอกอย่างเด็ดขาด
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">4. สิทธิของเจ้าของข้อมูลและการติดต่อ</h2>
          <p>
            ท่านมีสิทธิในการขอเข้าถึง, ขอรับสำเนา, ขอแก้ไขข้อมูลให้ถูกต้อง, หรือขอให้ลบข้อมูลส่วนบุคคลของท่านออกจากระบบได้ตลอดเวลา โดยสามารถติดต่อผู้ควบคุมข้อมูลส่วนบุคคลได้ที่:
          </p>
          <div className="p-3 bg-[#F7F4EE] rounded-xl text-xs space-y-1">
            <p><strong>บริษัท สุพรภา จำกัด</strong> (เลขทะเบียนนิติบุคคล 0105569013597)</p>
            <p>ที่อยู่: เลขที่ 25 ซอยริมทางด่วน 2 แขวงพระโขนงใต้ เขตพระโขนง กรุงเทพมหานคร 10260</p>
            <p>โทรศัพท์: <a href="tel:0653062263" className="text-[#4A5D4E] font-medium hover:underline">065-306-2263</a> | LINE: @konduangdee | อีเมล: contact@konduangdee.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}
