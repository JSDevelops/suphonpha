'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Package,
  PlusCircle,
  Edit2,
  Trash2,
  ShoppingBag,
  Receipt,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileSpreadsheet,
  KeyRound,
  ExternalLink,
  Layers,
  ArrowRight,
  HelpCircle,
  Clock,
  Zap,
  Lock,
  Copy,
  Check,
  AlertTriangle,
  Send,
  Eye,
  CheckCheck,
} from 'lucide-react';
import { OFFICIAL_ADMIN_ACCOUNTS } from '@/context/AuthContext';

export default function AdminGuidePage() {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[var(--brand-sage-dark)] via-[var(--brand-sage)] to-[#3A4A3D] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[var(--brand-gold)]/20 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ADMIN CMS & OPERATIONAL MANUAL</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            คู่มือการใช้งานระบบจัดการหลังบ้าน สุพรภา
          </h1>
          <p className="text-stone-200 text-sm sm:text-base font-light leading-relaxed">
            คู่มือขั้นตอนและวิธีการลงสินค้า แก้ไข อัปเดตสต็อก ตรวจสอบคำสั่งซื้อ & สลิปโอนเงิน
            ออกใบรับรองพระแท้ดิจิทัล งานสั่งสร้าง และการเชื่อมต่อ Google Sheets API แบบละเอียดครบทุกขั้นตอน
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-dark)] text-stone-950 text-xs font-bold transition-all shadow-sm"
            >
              <Package className="w-4 h-4" />
              <span>เข้าสู่หน้าแดชบอร์ดหลัก</span>
            </Link>
            <Link
              href="/shop"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-all"
            >
              <span>เปิดดูหน้าร้าน (Shop)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-gold)]">
          QUICK JUMP NAVIGATION
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          <a
            href="#section-products"
            className="p-3 bg-white rounded-2xl border border-[var(--border-warm)] hover:border-[var(--brand-sage)] transition-colors flex flex-col items-center text-center gap-2 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--brand-sage-light)] text-[var(--brand-sage-dark)] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="w-4 h-4" />
            </div>
            <span className="font-semibold text-stone-800">1. จัดการสินค้า</span>
          </a>

          <a
            href="#section-orders"
            className="p-3 bg-white rounded-2xl border border-[var(--border-warm)] hover:border-[var(--brand-sage)] transition-colors flex flex-col items-center text-center gap-2 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="font-semibold text-stone-800">2. คำสั่งซื้อ & สลิป</span>
          </a>

          <a
            href="#section-certificates"
            className="p-3 bg-white rounded-2xl border border-[var(--border-warm)] hover:border-[var(--brand-sage)] transition-colors flex flex-col items-center text-center gap-2 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-semibold text-stone-800">3. ใบรับรองพระแท้</span>
          </a>

          <a
            href="#section-inquiries"
            className="p-3 bg-white rounded-2xl border border-[var(--border-warm)] hover:border-[var(--brand-sage)] transition-colors flex flex-col items-center text-center gap-2 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-semibold text-stone-800">4. งานสั่งสร้าง</span>
          </a>

          <a
            href="#section-sheets"
            className="p-3 bg-white rounded-2xl border border-[var(--border-warm)] hover:border-[var(--brand-sage)] transition-colors flex flex-col items-center text-center gap-2 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <span className="font-semibold text-stone-800">5. Google Sheets</span>
          </a>

          <a
            href="#section-accounts"
            className="p-3 bg-white rounded-2xl border border-[var(--border-warm)] hover:border-[var(--brand-sage)] transition-colors flex flex-col items-center text-center gap-2 shadow-2xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <KeyRound className="w-4 h-4" />
            </div>
            <span className="font-semibold text-stone-800">6. รหัสผ่าน Admin</span>
          </a>
        </div>
      </div>

      {/* SECTION 1: Product Management */}
      <section id="section-products" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-warm)]">
          <div className="w-10 h-10 rounded-2xl bg-[var(--brand-sage-dark)] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            1
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--brand-sage-dark)]">
              คู่มือขั้นตอนการลงสินค้า แก้ไข และจัดการสินค้า (Products CMS)
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              จัดการรายการวัตถุมงคล สร้อยข้อมือหินมงคล แหวนนพเก้า แผ่นยันต์ และพระเครื่อง
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1.1 ขั้นตอนการลงสินค้าใหม่ */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--border-warm)] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 font-semibold text-stone-900 text-sm">
              <PlusCircle className="w-4 h-4 text-[var(--brand-sage)]" />
              <span>1.1 ขั้นตอนการลงสินค้าใหม่ (Add New Product)</span>
            </div>
            <ol className="list-decimal pl-5 space-y-2.5 text-xs text-stone-600 leading-relaxed">
              <li>
                ไปที่เมนู <strong>&ldquo;จัดการสินค้า&rdquo;</strong> (`/admin/products`) จากแถบเมนูด้านบน
              </li>
              <li>
                คลิกปุ่มสีทอง <strong>&ldquo;+ ลงสินค้าใหม่&rdquo;</strong> ที่มุมขวาบน จะมีหน้าต่างแบบฟอร์มเปิดขึ้นมา
              </li>
              <li>
                <strong>กรอกข้อมูลพื้นฐาน:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-stone-500">
                  <li><strong>ชื่อสินค้าภาษาไทย:</strong> เช่น <em>กำไลหินมงคล สตรอว์เบอร์รีควอตซ์แท้</em></li>
                  <li><strong>ชื่อสินค้าภาษาอังกฤษ:</strong> เช่น <em>Strawberry Quartz Lucky Bracelet</em></li>
                  <li><strong>รหัสสินค้า (SKU):</strong> เช่น `SPP-BRA-001` (หากเว้นว่างไว้ ระบบจะสร้างให้อัตโนมัติ)</li>
                  <li><strong>หมวดหมู่:</strong> เลือก กำไล/สร้อยข้อมือ, วัตถุมงคล, พระเครื่อง, แหวนมงคล, สติ๊กเกอร์ยันต์</li>
                </ul>
              </li>
              <li>
                <strong>ราคาและสต็อกสินค้า:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-stone-500">
                  <li><strong>ราคาปกติ (บาท):</strong> ระบุราคาเต็ม เช่น `1890`</li>
                  <li><strong>ราคาโปรโมชั่น (บาท):</strong> ระบุราคาพิเศษ เช่น `1690` (หากไม่มีให้เว้นว่าง)</li>
                  <li><strong>จำนวนสต็อก:</strong> เช่น `10` (หากใส่ 0 ระบบจะขึ้นว่า &ldquo;สินค้าหมด&rdquo;)</li>
                </ul>
              </li>
              <li>
                <strong>รูปภาพสินค้า (Image URL):</strong>
                <p className="mt-1">
                  ใส่ลิงก์รูปภาพ เช่น รูปในเว็บ `/images/products/pendant-buddha.jpg` หรือลิงก์ภาพจาก Google Drive หรือ Cloud Storage และสามารถเพิ่มรูปในอัลบั้ม Gallery ได้ไม่จำกัด
                </p>
              </li>
              <li>
                <strong>ข้อมูลมวลสารและพิธีพุทธาภิเษก:</strong>
                <p className="mt-1">
                  ระบุมวลสาร ขนาดรอบข้อมือ/ขนาดองค์พระ และพระเกจิผู้ปลุกเสก เพื่อให้ลูกค้าอ่านประกอบการตัดสินใจ
                </p>
              </li>
              <li>
                <strong>ผูกรหัสบัตรรับรอง (Cert Code):</strong> ใส่รหัสบัตรรับรองดิจิทัล เช่น `KDD-2025-00101` เพื่อให้ปุ่ม &ldquo;ตรวจสอบพระแท้&rdquo; เชื่อมต่อไปยังบัตรใบนั้นได้ทันที
              </li>
              <li>
                กดปุ่ม <strong>&ldquo;บันทึกสินค้า&rdquo;</strong> — สินค้าจะปรากฏหน้าร้านและส่งข้อมูลขึ้น Google Sheets ทันที!
              </li>
            </ol>
          </div>

          {/* 1.2 ขั้นตอนการแก้ไขและลบสินค้า */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--border-warm)] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 font-semibold text-stone-900 text-sm">
              <Edit2 className="w-4 h-4 text-amber-600" />
              <span>1.2 การแก้ไข ปรับราคา สต็อก และลบสินค้า</span>
            </div>
            <ul className="space-y-3 text-xs text-stone-600 leading-relaxed">
              <li className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-1">🔍 การค้นหาและกรองสินค้า:</strong>
                ใช้ช่องค้นหาที่หน้า `/admin/products` เพื่อค้นหาด้วยชื่อสินค้า รหัส SKU หรือเลือกกรองตามหมวดหมู่ หรือกรองเฉพาะสินค้าสต็อกต่ำ/หมดสต็อก
              </li>
              <li className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-1">✏️ การแก้ไขข้อมูล:</strong>
                กดปุ่มไอคอน <strong>&ldquo;แก้ไข (ดินสอ)&rdquo;</strong> ที่แถวของสินค้านั้นๆ หน้าต่างแบบฟอร์มจะดึงข้อมูลเดิมขึ้นมา สามารถเปลี่ยนราคา ปรับสต็อก เพิ่มรูปภาพ แล้วกด &ldquo;อัปเดตสินค้า&rdquo;
              </li>
              <li className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-1">🌟 ตั้งเป็นสินค้าแนะนำ (Featured):</strong>
                เมื่อเปิดสวิตช์ &ldquo;สินค้าแนะนำ&rdquo; สินค้าชิ้นนั้นจะถูกนำไปไฮไลต์บนหน้าแรก (Homepage) และแถบแนะนำพิเศษ
              </li>
              <li className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900">
                <strong className="block mb-1">🗑️ การลบสินค้า:</strong>
                กดปุ่มไอคอน <strong>&ldquo;ถังขยะสีแดง&rdquo;</strong> ระบบจะถามยืนยันก่อนลบ เมื่อยืนยัน สินค้าจะถูกลบออกจากระบบและลบออกจาก Google Sheet แท็บ Products ทันที
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: Orders & Slips */}
      <section id="section-orders" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-warm)]">
          <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            2
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--brand-sage-dark)]">
              คู่มือการจัดการคำสั่งซื้อ & ตรวจสอบสลิปโอนเงิน (Orders & Slips)
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              ขั้นตอนตรวจสลิปยืนยันยอดเงิน เปลี่ยนสถานะพัสดุ และบันทึกเลข Tracking
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--border-warm)] shadow-2xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <span className="font-bold text-amber-800 block text-sm">1. รอตรวจสลิป</span>
              <span className="text-amber-700 font-mono text-[11px]">awaiting_review</span>
              <p className="text-stone-600 text-[11px] pt-1">
                ลูกค้าสั่งซื้อและแนบสลิปมาแล้ว รอแอดมินตรวจเช็กยอดเงินในบัญชีธนาคาร
              </p>
            </div>

            <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 space-y-1">
              <span className="font-bold text-blue-800 block text-sm">2. ชำระเงินแล้ว</span>
              <span className="text-blue-700 font-mono text-[11px]">paid</span>
              <p className="text-stone-600 text-[11px] pt-1">
                แอดมินยืนยันยอดเงินถูกต้องแล้ว ส่งต่อไปยังฝ่ายจัดเตรียมสินค้า
              </p>
            </div>

            <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-200 space-y-1">
              <span className="font-bold text-indigo-800 block text-sm">3. กำลังแพ็ค</span>
              <span className="text-indigo-700 font-mono text-[11px]">processing</span>
              <p className="text-stone-600 text-[11px] pt-1">
                ฝ่ายคลังกำลังบรรจุวัตถุมงคลและใส่บัตรรับรองลงในกล่องพัสดุ
              </p>
            </div>

            <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
              <span className="font-bold text-purple-800 block text-sm">4. กำลังจัดส่ง</span>
              <span className="text-purple-700 font-mono text-[11px]">shipping</span>
              <p className="text-stone-600 text-[11px] pt-1">
                พัสดุถูกส่งไปยังบริษัทขนส่งแล้ว พร้อมกรอกเลข Tracking Number
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-800 block text-sm">5. สำเร็จ</span>
              <span className="text-emerald-700 font-mono text-[11px]">completed</span>
              <p className="text-stone-600 text-[11px] pt-1">
                ลูกค้าได้รับวัตถุมงคลเรียบร้อย คำสั่งซื้อเสร็จสมบูรณ์ 100%
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-stone-700 leading-relaxed border-t border-stone-100 pt-5">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-amber-600" />
              <span>ขั้นตอนการตรวจสอบและดำเนินการเมื่อมีออเดอร์ใหม่:</span>
            </h3>

            <ol className="list-decimal pl-5 space-y-2">
              <li>
                เปิดไปที่หน้า <strong>&ldquo;คำสั่งซื้อ & สลิป&rdquo;</strong> (`/admin/orders`)
              </li>
              <li>
                คลิกที่แท็บ <strong>&ldquo;รอตรวจสลิป&rdquo;</strong> เพื่อดูรายการที่ลูกค้ารอการตรวจสอบ
              </li>
              <li>
                คลิกปุ่ม <strong>&ldquo;ตรวจสอบสลิป & จัดการ&rdquo;</strong> หรือไอคอนรูปตา เพื่อเปิดดูรายละเอียดออเดอร์
              </li>
              <li>
                <strong>ตรวจสอบสลิปหลักฐานโอนเงิน:</strong> ดูรูปภาพสลิปในหน้าต่าง Pop-up หรือคลิก &ldquo;ดูสลิปขนาดเต็ม&rdquo; ตรวจสอบว่าโอนเข้าบัญชีธนาคารกสิกรไทย <strong>บริษัท สุพรภา จำกัด เลขที่ 237-8-02627-2</strong> ตรงกับยอดเงินจริงหรือไม่
              </li>
              <li>
                <strong>การอัปเดตสถานะ:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-stone-600">
                  <li>หากยอดถูกต้อง ให้เปลี่ยนสถานะเป็น <strong>&ldquo;ชำระเงินแล้ว (Paid)&rdquo;</strong> หรือ <strong>&ldquo;กำลังจัดเตรียม&rdquo;</strong></li>
                  <li>เมื่อจัดส่งพัสดุแล้ว ให้เลือกบริษัทขนส่ง เช่น <em>Flash Express, Kerry Express, ไปรษณีย์ไทย EMS</em> และกรอก <strong>เลขติดตามพัสดุ (Tracking Number)</strong> เช่น `TH0123456789A`</li>
                </ul>
              </li>
              <li>
                กดปุ่ม <strong>&ldquo;บันทึกการเปลี่ยนแปลง&rdquo;</strong> — สถานะและเลข Tracking จะอัปเดตไปยังระบบและบันทึกลงใน Google Sheet ทันที ลูกค้าสามารถเปิดดูเลขพัสดุได้ที่หน้าบัญชีของตนเอง
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION 3: Digital Certificates */}
      <section id="section-certificates" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-warm)]">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            3
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--brand-sage-dark)]">
              คู่มือการออกและจัดการใบรับรองพระแท้ดิจิทัล (Digital Certificates)
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              ระบบรับประกันความแท้มาตรฐานสากล ตรวจสอบย้อนกลับได้ตลอด 24 ชั่วโมง
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-[var(--border-warm)] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 font-semibold text-stone-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>3.1 ขั้นตอนการออกใบรับรองพระแท้ใหม่</span>
            </div>
            <ol className="list-decimal pl-5 space-y-2.5 text-xs text-stone-600 leading-relaxed">
              <li>
                ไปที่หน้า <strong>&ldquo;ใบรับรองพระแท้&rdquo;</strong> (`/admin/certificates`)
              </li>
              <li>
                คลิกปุ่ม <strong>&ldquo;+ ออกใบรับรองใหม่&rdquo;</strong>
              </li>
              <li>
                <strong>รหัสใบรับรอง (Certificate Number):</strong>
                <p className="text-stone-500">
                  ตั้งรหัสตามฟอร์แมตมาตรฐาน เช่น `KDD-2025-00101` หรือ `SPP-2025-00102` รหัสนี้จะไม่ซ้ำกันในแต่ละองค์
                </p>
              </li>
              <li>
                <strong>ชื่อวัตถุมงคล / รายการ:</strong> ระบุชื่อพระเครื่องหรือวัตถุมงคล เช่น <em>พระพุทธชินราชจำลอง เลี่ยมกรอบทองคำแท้</em>
              </li>
              <li>
                <strong>ข้อมูลมวลสารและมิติ:</strong> ระบุเนื้อโลหะ ผงพุทธคุณ แร่ศักดิ์สิทธิ์ ขนาดความกว้าง-สูง
              </li>
              <li>
                <strong>พระเกจิ / พิธีพุทธาภิเษก:</strong> ระบุรายนามพระเกจิอาจารย์และวัดที่จัดพิธี
              </li>
              <li>
                <strong>รูปภาพวัตถุมงคล:</strong> ใส่รูปลิงก์ความละเอียดสูง เพื่อให้ผู้บูชาเห็นรายละเอียดตำหนิและพิมพ์ทรง
              </li>
              <li>
                กดปุ่ม <strong>&ldquo;บันทึกและออกใบรับรอง&rdquo;</strong> ข้อมูลจะถูกจัดเก็บลงใน Google Sheet แท็บ Certificates ทันที
              </li>
            </ol>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[var(--border-warm)] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 font-semibold text-stone-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>3.2 การสั่งพิมพ์บัตรและตรวจสอบสถานะ</span>
            </div>
            <ul className="space-y-3 text-xs text-stone-600 leading-relaxed">
              <li className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-1">🖨️ การสั่งพิมพ์บัตรรับรอง (Print Card):</strong>
                กดปุ่ม <strong>&ldquo;พิมพ์บัตร&rdquo;</strong> ในแต่ละแถว ระบบจะเปิดหน้าต่างบัตรรับรองที่จัดเลย์เอาต์สวยงามพร้อม QR Code เพื่อสั่งพิมพ์ลงบนกระดาษอาร์ตการ์ดหรือเคลือบพลาสติกส่งไปพร้อมสินค้า
              </li>
              <li className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-1">🌐 ลิงก์ตรวจสอบสาธารณะ 24 ชม.:</strong>
                ลูกค้าสามารถเข้าหน้า <Link href="/certificate" target="_blank" className="text-[var(--brand-sage)] underline">`/certificate`</Link> แล้วกรอกรหัสบัตรเพื่อตรวจสอบข้อมูลย้อนกลับได้ทันที
              </li>
              <li className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900">
                <strong className="block mb-1">⚠️ การระงับใบรับรอง (Revoke):</strong>
                กรณีเกิดการทุจริต ปลอมแปลง หรือคืนสินค้า สามารถแก้ไขสถานะบัตรเป็น <strong>&ldquo;ระงับ/เพิกถอน (Revoked)&rdquo;</strong> หน้าเว็บจะแจ้งเตือนว่าบัตรนี้ไม่สามารถใช้งานได้ทันที
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: Custom Inquiries */}
      <section id="section-inquiries" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-warm)]">
          <div className="w-10 h-10 rounded-2xl bg-purple-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            4
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--brand-sage-dark)]">
              คู่มือการจัดการคำของานสั่งสร้างวัตถุมงคล (Custom Inquiries)
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              ติดตามคำขอสั่งสร้างวัตถุมงคลเฉพาะบุคคล องค์กร และพระเครื่องพิมพ์พิเศษ
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--border-warm)] shadow-2xs space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            เมื่อลูกค้าหรือองค์กรกรอกแบบฟอร์มสั่งสร้างจากหน้า <strong>&ldquo;สั่งสร้างวัตถุมงคล&rdquo;</strong> (`/custom-order`) ข้อมูลจะวิ่งตรงเข้ามาที่หน้า `/admin/inquiries` และบันทึกลง Google Sheet แท็บ `CustomInquiries` โดยอัตโนมัติ
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-2">
              <strong className="text-purple-950 font-bold block">📋 ข้อมูลที่ต้องตรวจสอบ:</strong>
              <ul className="list-disc pl-4 space-y-1 text-purple-900">
                <li>ชื่อผู้ติดต่อ / องค์กร และเบอร์โทรศัพท์</li>
                <li>ประเภทวัตถุมงคล (เหรียญ, พระผง, กำไล, แหวน, ผ้ายันต์)</li>
                <li>จำนวนที่ต้องการผลิต (ชิ้น) และงบประมาณโดยประมาณ</li>
                <li>มวลสารศักดิ์สิทธิ์ที่ลูกค้านำมาผสม หรือต้องการให้ทางร้านจัดหา</li>
                <li>ความประสงค์ด้านพิธีเจริญพระพุทธมนต์ / เทวาภิเษก</li>
              </ul>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <strong className="text-stone-900 font-bold block">🔄 การเปลี่ยนสถานะงานสั่งสร้าง:</strong>
              <ol className="list-decimal pl-4 space-y-1 text-stone-600">
                <li><strong>รอเจ้าหน้าที่ติดต่อกลับ:</strong> แอดมินโทรประสานงานภายใน 24 ชม.</li>
                <li><strong>กำลังประสานงานโรงหล่อ:</strong> ช่างขึ้นแบบ 3D หรือบล็อกแม่พิมพ์</li>
                <li><strong>กำลังจัดเตรียมมวลสาร:</strong> รวบรวมแผ่นจารและผงพุทธคุณ</li>
                <li><strong>กำลังประกอบพิธีพุทธาภิเษก:</strong> อยู่ในระหว่างกำหนดการพิธี</li>
                <li><strong>ผลิตเสร็จสิ้น/ส่งมอบแล้ว:</strong> ส่งมอบงานถึงมือผู้ว่าจ้างเรียบร้อย</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Google Sheets API Connection */}
      <section id="section-sheets" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-warm)]">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            5
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--brand-sage-dark)]">
              การเชื่อมต่อและซิงค์ข้อมูลกับ Google Sheets API
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              วิเคราะห์ความเร็ว ความเสถียร และแนวทางการทำงานร่วมกับระบบคลาวด์
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 bg-white rounded-2xl border border-[var(--border-warm)] shadow-2xs space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="font-bold text-stone-900 text-sm">ความเร็วระดับ 0.01 วินาที</h3>
            <p className="text-stone-600 leading-relaxed">
              ระบบใช้เทคโนโลยี <strong>Stale-While-Revalidate (SWR)</strong> และ <strong>Optimistic UI Update</strong> เมื่อเปิดหน้าเว็บจะดึงข้อมูลแคชจากเครื่องขึ้นมาแสดงทันทีภายใน 10ms และเมื่อแอดมินแก้ไขข้อมูล หน้าจอจะเปลี่ยนทันทีโดยไม่ต้องรอ Google Sheets โหลดเสร็จ
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[var(--border-warm)] shadow-2xs space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              🔄
            </div>
            <h3 className="font-bold text-stone-900 text-sm">ปุ่มซิงค์ข้อมูลล่าสุด</h3>
            <p className="text-stone-600 leading-relaxed">
              หากมีการแก้ไขข้อมูลตรงใน Google Sheets ผ่านคอมพิวเตอร์หรือมือถือ แอดมินสามารถกดปุ่ม <strong>&ldquo;ซิงค์ข้อมูล (Refresh)&rdquo;</strong> บนแถบเมนูด้านบน เพื่อดึงข้อมูลอัปเดตใหม่ล่าสุดเข้ามายังเว็บไซต์ได้ในคลิกเดียว
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[var(--border-warm)] shadow-2xs space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              🛡️
            </div>
            <h3 className="font-bold text-stone-900 text-sm">ระบบสำรองข้อมูลอัตโนมัติ</h3>
            <p className="text-stone-600 leading-relaxed">
              หากเกิดปัญหาอินเทอร์เน็ตหลุด หรือ Google Apps Script เกิด Timeout ระบบจะไม่ค้างหรือล่ม แต่จะบันทึกข้อมูลไว้ในระบบ LocalStorage ชั่วคราว และทำการ Retry ซิงค์ข้อมูลใหม่อัตโนมัติ ปลอดภัย 100%
            </p>
          </div>
        </div>

        {/* ตารางแท็บใน Google Sheets */}
        <div className="bg-white rounded-2xl p-6 border border-[var(--border-warm)] shadow-2xs space-y-3 text-xs">
          <h3 className="font-bold text-sm text-stone-900">
            📊 โครงสร้างแผ่นงาน 4 แผ่น (Tabs) ใน Google Sheets ของร้าน:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <strong className="text-stone-900 block font-mono">1. Products</strong>
              <span className="text-stone-500 text-[11px]">จัดเก็บรายการสินค้า, ราคา, สต็อก, ลิงก์รูปภาพ, มวลสาร</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <strong className="text-stone-900 block font-mono">2. Orders</strong>
              <span className="text-stone-500 text-[11px]">จัดเก็บคำสั่งซื้อ, ยอดเงิน, ลิงก์สลิป, สถานะ, เลขพัสดุ</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <strong className="text-stone-900 block font-mono">3. Certificates</strong>
              <span className="text-stone-500 text-[11px]">จัดเก็บรหัสบัตรรับรอง, มวลสาร, พระเกจิ, วันที่ออกบัตร</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <strong className="text-stone-900 block font-mono">4. CustomInquiries</strong>
              <span className="text-stone-500 text-[11px]">จัดเก็บคำขอสั่งสร้างวัตถุมงคล, เบอร์ติดต่อ, งบประมาณ</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Admin Login Credentials */}
      <section id="section-accounts" className="scroll-mt-24 space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-warm)]">
          <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            6
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--brand-sage-dark)]">
              สรุปข้อมูลการเข้าใช้งาน และบัญชีผู้ดูแลระบบ (Admin Access Credentials)
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              ลิงก์เข้าสู่ระบบ ชื่อผู้ใช้งาน และรหัสผ่านสำหรับเจ้าหน้าที่
            </p>
          </div>
        </div>

        <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong>คำแนะนำด้านความปลอดภัย:</strong>
            <p>
              รหัสผ่านด้านล่างเป็นรหัสผ่านอย่างเป็นทางการของระบบ กรุณาเก็บรักษาเป็นความลับเฉพาะเจ้าหน้าที่ที่เกี่ยวข้อง และไม่เปิดเผยต่อบุคคลภายนอกตามมาตรการคุ้มครองข้อมูลส่วนบุคคล (PDPA)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {OFFICIAL_ADMIN_ACCOUNTS.map((acc, idx) => (
            <div
              key={acc.username}
              className="bg-white rounded-2xl p-6 border border-[var(--border-warm)] shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      acc.role === 'super_admin'
                        ? 'bg-[var(--brand-gold)] text-stone-950'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {acc.role === 'super_admin' ? '👑' : '🛡️'}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">{acc.name}</h3>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider font-mono">
                      Role: {acc.role}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-medium">
                  บัญชีที่ {idx + 1}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {acc.description}
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Username / Email</span>
                    <strong className="text-stone-900 select-all">{acc.username}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(acc.username, `${acc.username}-user`)}
                    className="p-1.5 hover:bg-stone-200 rounded-lg text-stone-600 transition-colors"
                    title="คัดลอกชื่อผู้ใช้"
                  >
                    {copiedText === `${acc.username}-user` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Password</span>
                    <strong className="text-[var(--brand-sage-dark)] select-all font-bold">
                      {acc.password}
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(acc.password, `${acc.username}-pass`)}
                    className="p-1.5 hover:bg-stone-200 rounded-lg text-stone-600 transition-colors"
                    title="คัดลอกรหัสผ่าน"
                  >
                    {copiedText === `${acc.username}-pass` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* URL สรุป */}
        <div className="p-6 bg-white rounded-2xl border border-[var(--border-warm)] shadow-2xs space-y-3 text-xs">
          <h3 className="font-bold text-sm text-stone-900">
            🔗 ลิงก์ตรงสำหรับเปิดเข้าสู่ระบบจัดการหลังบ้าน (Direct Admin URL):
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono">
            <span className="text-stone-800 select-all font-semibold">
              https://suphonpha.com/admin
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy('https://suphonpha.com/admin', 'url-admin')}
                className="px-3 py-1.5 bg-white hover:bg-stone-100 rounded-lg border border-stone-300 text-stone-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedText === 'url-admin' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>คัดลอกแล้ว</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>คัดลอกลิงก์</span>
                  </>
                )}
              </button>
              <Link
                href="/admin"
                className="px-3 py-1.5 bg-[var(--brand-sage-dark)] hover:bg-[var(--brand-sage)] text-white rounded-lg inline-flex items-center gap-1.5 transition-colors"
              >
                <span>เปิดหน้า Admin</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
