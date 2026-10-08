import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  ShoppingBag,
  Building,
  UploadCloud,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  ArrowRight,
  HelpCircle,
  FileCheck,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'คู่มือการใช้เว็บไซต์และนโยบายความโปร่งใส | สุพรภา suphonpha',
  description:
    'คู่มือการใช้งานเว็บไซต์ สุพรภา (Suphonpha) ขั้นตอนการเลือกชมวัตถุมงคล การสั่งซื้อ ชำระเงินผ่านการโอนธนาคาร การแนบสลิป ตรวจสอบสถานะพัสดุ และการตรวจสอบบัตรรับรองดิจิทัล 100%',
};

export default function UserGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#4A5D4E] text-xs font-medium border border-[#4A5D4E]/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>TRANSPARENCY & USER GUIDE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#282522] tracking-tight">
          คู่มือการใช้เว็บไซต์และนโยบายความโปร่งใส
        </h1>
        <p className="text-sm sm:text-base text-[#5C5852] font-light leading-relaxed max-w-2xl">
          ยินดีต้อนรับสู่ &ldquo;สุพรภา (Suphonpha)&rdquo; แพลตฟอร์มวัตถุมงคลและเครื่องประดับมงคลร่วมสมัยที่ยึดมั่นในความโปร่งใส ความซื่อสัตย์ และความปลอดภัยของผู้บูชาเป็นอันดับหนึ่ง
        </p>
      </div>

      {/* Transparency Statement Card (นโยบายความโปร่งใส) */}
      <div className="p-6 sm:p-8 bg-radial from-[#FAF8F5] via-[#EFECE6] to-[#E6E1D7] rounded-3xl border border-[#D8D1C7] shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-[#A98336] font-semibold text-xs tracking-wider uppercase">
          <Sparkles className="w-4 h-4" />
          <span>นโยบายความโปร่งใสและคุ้มครองผู้บริโภค (Transparency Statement)</span>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl text-[#282522] font-medium">
          เจตนารมณ์แห่งพุทธศิลป์และการบูชาอย่างมีสติ
        </h2>
        <div className="text-xs sm:text-sm text-[#5C5852] leading-relaxed space-y-2.5">
          <p>
            วัตถุมงคลและเครื่องประดับมงคลทั้งหมดของ <strong>สุพรภา (Suphonpha)</strong> ได้รับการคัดสรรและจัดสร้างขึ้นเพื่อเป็น <strong>เครื่องเตือนสติในการดำเนินชีวิตด้วยความดีงาม สุจริต และมีคุณธรรม</strong> ทุกชิ้นผ่านการตรวจสอบมวลสารจริงและพิธีเจริญพระพุทธมนต์อย่างถูกต้อง
          </p>
          <p className="p-3.5 bg-white/80 rounded-2xl border border-[#D8D1C7] text-xs text-[#282522]">
            ⚖️ <strong>คำชี้แจงเพื่อความโปร่งใส:</strong> การเช่าบูชาวัตถุมงคลเป็นความเชื่อส่วนบุคคล ทางร้านไม่มีนโยบายกล่าวอ้างผลลัพธ์ทางโชคลาภ ปาฏิหาริย์ หรือความสำเร็จเกินจริงในเชิงพาณิชย์ และมุ่งมั่นให้บริการด้วยข้อมูลที่เป็นจริง ชัดเจน และตรวจสอบได้ในทุกขั้นตอน
          </p>
        </div>
      </div>

      {/* Step by Step Guide Sections */}
      <div className="space-y-8">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A98336]">
            STEP-BY-STEP GUIDE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#282522]">
            ขั้นตอนการใช้งานเว็บไซต์อย่างง่าย 5 ขั้นตอน
          </h2>
        </div>

        {/* Step 1: Browse & Search */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E6E1D8] shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#4A5D4E] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
              1
            </span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
                การเลือกชมและค้นหาวัตถุมงคล (Browse & Search)
              </h3>
              <p className="text-xs text-gray-500">ค้นหาตามหมวดหมู่ หรือกรองตามความต้องการ</p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#5C5852] leading-relaxed space-y-3 pl-0 sm:pl-12">
            <p>
              ท่านสามารถเลือกชมวัตถุมงคลได้ผ่านเมนู <strong><Link href="/shop" className="text-[#4A5D4E] underline hover:text-[#37473A]">หน้าร้าน (Shop)</Link></strong> โดยแบ่งเป็นหมวดหมู่ชัดเจน:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <span className="p-2.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] text-center font-medium text-[#282522]">
                📿 กำไลและสร้อยข้อมือหินมงคล
              </span>
              <span className="p-2.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] text-center font-medium text-[#282522]">
                💍 แหวนนพเก้า & แหวนมงคล
              </span>
              <span className="p-2.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] text-center font-medium text-[#282522]">
                🪙 เหรียญและจี้พระเครื่อง
              </span>
              <span className="p-2.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] text-center font-medium text-[#282522]">
                🏷️ แผ่นยันต์ทองคำและสติ๊กเกอร์
              </span>
              <span className="p-2.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] text-center font-medium text-[#282522]">
                ✨ สั่งสร้างวัตถุมงคลเฉพาะบุคคล
              </span>
              <span className="p-2.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] text-center font-medium text-[#282522]">
                📜 บัตรรับรองความแท้ดิจิทัล
              </span>
            </div>
            <p className="text-xs text-gray-500">
              * แต่ละหน้าสินค้าจะมีระบุข้อมูลมวลสาร ขนาดเม็ดหิน รอบข้อมือ และพิธีพุทธาภิเษกอย่างละเอียด
            </p>
          </div>
        </div>

        {/* Step 2: Checkout & Payment */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E6E1D8] shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#4A5D4E] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
              2
            </span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
                การสั่งซื้อและการชำระเงินผ่านการโอนบัญชีธนาคาร (Ordering & Payment)
              </h3>
              <p className="text-xs text-gray-500">ระบบตรง ปลอดภัย 100% ไม่มีค่าธรรมเนียมแอบแฝง</p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#5C5852] leading-relaxed space-y-3 pl-0 sm:pl-12">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                กดปุ่ม <strong>&ldquo;หยิบใส่ตะกร้า&rdquo;</strong> หรือ <strong>&ldquo;บูชาทันที&rdquo;</strong> จากหน้ารายละเอียดสินค้า
              </li>
              <li>
                ตรวจสอบจำนวนสินค้าในตะกร้า แล้วกดปุ่ม <strong>&ldquo;ดำเนินการสั่งซื้อ (Checkout)&rdquo;</strong>
              </li>
              <li>
                กรอก <strong>ชื่อ-นามสกุล, เบอร์โทรศัพท์, อีเมล และที่อยู่จัดส่งพัสดุ</strong> ให้ครบถ้วน
              </li>
              <li>
                ระบบรองรับ <strong>การโอนเงินผ่านบัญชีธนาคาร (Bank Transfer)</strong>:
                <div className="my-2 p-4 bg-[#F7F4EE] rounded-2xl border border-[#E6E1D8] space-y-1.5 text-xs text-[#282522]">
                  <p><strong>ธนาคาร:</strong> ธนาคารกสิกรไทย สาขาสุขุมวิท 101</p>
                  <p><strong>ชื่อบัญชี:</strong> บริษัท สุพรภา จำกัด</p>
                  <p><strong>เลขที่บัญชี:</strong> <span className="font-mono font-bold text-[#4A5D4E] text-sm">237-8-02627-2</span> (มีปุ่มกดคัดลอกในหน้าชำระเงิน)</p>
                </div>
              </li>
              <li>
                <strong>แนบรูปภาพสลิปหลักฐานการโอนเงิน</strong> ผ่านช่องแนบไฟล์ในหน้าชำระเงิน เพื่อให้เจ้าหน้าที่ตรวจสอบยอดได้ทันที
              </li>
            </ol>
          </div>
        </div>

        {/* Step 3: Order Tracking & Free Shipping */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E6E1D8] shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#4A5D4E] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
              3
            </span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
                การตรวจสอบสถานะคำสั่งซื้อและการจัดส่ง (Order Tracking)
              </h3>
              <p className="text-xs text-gray-500">บริการจัดส่งฟรีทั่วประเทศ พร้อมเลข Tracking ตรวจสอบได้</p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#5C5852] leading-relaxed space-y-3 pl-0 sm:pl-12">
            <p>
              เมื่อทำการสั่งซื้อเรียบร้อยแล้ว ท่านสามารถตรวจสอบสถานะคำสั่งซื้อได้ที่หน้า <strong><Link href="/account" className="text-[#4A5D4E] underline hover:text-[#37473A]">ประวัติคำสั่งซื้อ & ติดตามพัสดุ</Link></strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
                <span className="font-semibold text-amber-800 block">1. รอตรวจสอบสลิป</span>
                <span className="text-gray-600 text-[11px]">แอดมินกำลังตรวจยอดเงินและสลิป</span>
              </div>
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200">
                <span className="font-semibold text-blue-800 block">2. ชำระแล้ว / กำลังแพ็ค</span>
                <span className="text-gray-600 text-[11px]">บรรจุวัตถุมงคลอย่างทะนุถนอม</span>
              </div>
              <div className="p-3 bg-green-50/60 rounded-xl border border-green-200">
                <span className="font-semibold text-green-800 block">3. จัดส่งพัสดุแล้ว</span>
                <span className="text-gray-600 text-[11px]">แสดงเลขพัสดุ Kerry / Flash / EMS</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              * ทางร้านจัดส่งสินค้าฟรีทุกออเดอร์ทั่วประเทศ จัดส่งภายใน 1-2 วันทำการหลังยืนยันยอดชำระ
            </p>
          </div>
        </div>

        {/* Step 4: Digital Certificate Verification */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E6E1D8] shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#4A5D4E] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
              4
            </span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
                การตรวจสอบบัตรรับรองดิจิทัล (Digital Certificate Verification)
              </h3>
              <p className="text-xs text-gray-500">มาตรฐานความแท้ระดับสากล ตรวจสอบย้อนกลับได้ 24 ชั่วโมง</p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#5C5852] leading-relaxed space-y-3 pl-0 sm:pl-12">
            <p>
              วัตถุมงคลและเครื่องประดับแทบทุกชิ้นของสุพรภาจะได้รับ <strong>รหัสรับรองดิจิทัลเฉพาะองค์ (Certificate Code)</strong> เช่น <code className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-[#4A5D4E]">KDD-2025-00101</code>
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs">
              <li>
                ไปที่หน้า <strong><Link href="/certificate" className="text-[#4A5D4E] underline hover:text-[#37473A]">ตรวจสอบบัตรรับรอง (Certificate)</Link></strong>
              </li>
              <li>
                กรอกรหัสประจำตัววัตถุมงคลที่ได้รับลงในช่องค้นหา แล้วกดปุ่ม <strong>&ldquo;ตรวจสอบข้อมูล&rdquo;</strong>
              </li>
              <li>
                ระบบจะแสดงหน้าต่างบัตรรับรองดิจิทัล พร้อมภาพถ่ายองค์จริง มวลสาร ขนาด วันที่ออกบัตร และสถานะความแท้ทันที
              </li>
            </ol>
          </div>
        </div>

        {/* Step 5: Warranty & Customer Support */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E6E1D8] shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#4A5D4E] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
              5
            </span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
                การรับประกันและการดูแลหลังการเช่าบูชา (Warranty & Support)
              </h3>
              <p className="text-xs text-gray-500">รับประกันความแท้ 100% ตลอดชีพ ดูแลด้วยความจริงใจ</p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#5C5852] leading-relaxed space-y-3 pl-0 sm:pl-12">
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>รับประกันความแท้ตลอดชีพ:</strong> หากพิสูจน์ได้ว่าวัตถุมงคลหรือหินมงคลไม่ใช่ของแท้ตามที่ระบุในบัตรรับรอง ทางร้านยินดีคืนเงินเต็มจำนวน 100%
              </li>
              <li>
                <strong>รับประกันความเสียหายจากการจัดส่ง:</strong> หากพัสดุชำรุด เสียหาย หรือแตกหักระหว่างการขนส่ง กรุณาถ่ายวิดีโอขณะแกะกล่องพัสดุ และแจ้งทางร้านภายใน 7 วัน เพื่อเปลี่ยนองค์ใหม่หรือรับการชดเชย
              </li>
              <li>
                <strong>บริการร้อยสาย/ปรับขนาดฟรี:</strong> สำหรับกำไลหินมงคล สามารถส่งกลับมาปรับขนาดรอบข้อมือหรือเปลี่ยนเอ็นยืดได้ตลอดอายุการใช้งาน
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact & Inquiries */}
      <div className="p-8 bg-[#F7F4EE] rounded-3xl border border-[#E6E1D8] space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-semibold text-[#282522]">
            มีคำถามเพิ่มเติมหรือต้องการคำแนะนำส่วนตัว?
          </h3>
          <p className="text-xs text-[#5C5852]">
            ทีมงานและแอดมินยินดีให้คำปรึกษาการเลือกวัตถุมงคลตามวันเกิดและราศีอย่างเป็นกันเอง
          </p>
          <p className="text-xs text-[#4A5D4E] font-medium pt-1">
            โทร: 065-306-2263 | อีเมล: contact@suphonpha.com | บริการทุกวัน 09:00 - 20:00 น.
          </p>
        </div>

        <Link
          href="/shop"
          className="px-6 py-3 bg-[#4A5D4E] hover:bg-[#37473A] text-white text-xs font-semibold rounded-xl transition-all shadow-md shrink-0 inline-flex items-center gap-2"
        >
          <span>เลือกชมวัตถุมงคล</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
