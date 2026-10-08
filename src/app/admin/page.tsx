'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package,
  PlusCircle,
  FileSpreadsheet,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Tag,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';
import SafeImage from '@/components/SafeImage';

export default function AdminDashboardPage() {
  const { products, orders, certificates, isLoading } = useStoreData();
  const isSheetConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;

  // คำนวณสถิติ
  const totalProducts = products.length;
  const outOfStock = products.filter((p) => Number(p.stock) <= 0).length;
  const lowStock = products.filter((p) => Number(p.stock) > 0 && Number(p.stock) <= 3).length;
  const featuredProducts = products.filter((p) => p.isFeatured).length;
  const totalOrders = orders.length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[var(--brand-sage-dark)] to-[var(--brand-sage)] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-[var(--brand-gold)]/20 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 px-3 py-1 rounded-full text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            ระบบคลาวด์ Google Sheet CMS
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            ยินดีต้อนรับสู่ระบบจัดการร้าน สุพรภา (Suphonpha)
          </h1>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed mb-6">
            คุณสามารถเพิ่มสินค้าใหม่ แก้ไขข้อมูล ปรับราคาและสต็อก โดยข้อมูลจะถูกจัดเก็บลงใน Google Sheet
            และสะท้อนไปยังหน้าร้านแบบอัตโนมัติ
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-dark)] text-stone-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              ลงสินค้าใหม่ / จัดการสินค้า
            </Link>
            <Link
              href="/admin/guide"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-all border border-white/30 shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-[var(--brand-gold)]" />
              <span>คู่มือการใช้งานระบบ (เปิดแท็บใหม่)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/shop"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-all border border-white/20"
            >
              <span>ดูหน้าร้านค้า</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Connection Info Alert */}
      {!isSheetConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                ยังไม่ได้เชื่อมต่อ Google Sheet API (ขณะนี้ทำงานในโหมด Local Test)
              </h4>
              <p className="text-xs text-amber-750 mt-1 text-stone-600">
                สามารถทดลองเพิ่ม/แก้ไข/ลบสินค้าได้ทันที (ระบบจะจำลองลงในเครื่อง) หากต้องการต่อกับ Google Sheet จริง
                เพียงนำโค้ดใน <code className="bg-amber-150 px-1 py-0.5 rounded font-mono text-[11px]">google-apps-script.js</code> ไปวางใน Apps Script แล้วใส่ URL ในไฟล์ <code className="bg-amber-150 px-1 py-0.5 rounded font-mono text-[11px]">.env.local</code>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl p-5 border border-[var(--border-warm)] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium text-[var(--text-secondary)]">สินค้าทั้งหมด</span>
            <Package className="w-4 h-4 text-[var(--brand-sage)]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-[var(--brand-sage-dark)]">
            {isLoading ? '...' : totalProducts}
          </div>
          <p className="text-xs text-stone-500 mt-1">รายการพร้อมจำหน่ายในระบบ</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[var(--border-warm)] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium text-[var(--text-secondary)]">คำสั่งซื้อในระบบ</span>
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-700">
            {isLoading ? '...' : totalOrders}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            รอตรวจสลิป {orders.filter((o) => o.status === 'awaiting_review').length} รายการ
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[var(--border-warm)] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium text-[var(--text-secondary)]">ใบรับรองพระแท้</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-700">
            {isLoading ? '...' : certificates.length}
          </div>
          <p className="text-xs text-stone-500 mt-1">Digital Certificate ออกแล้ว</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[var(--border-warm)] shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium text-[var(--text-secondary)]">งานสั่งสร้างเฉพาะบุคคล</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-purple-700">
            {isLoading ? '...' : (useStoreData().inquiries || []).length}
          </div>
          <p className="text-xs text-stone-500 mt-1">คำขอสั่งสร้างจากลูกค้า</p>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-[var(--border-warm)] shadow-xs flex flex-col justify-between hover:border-[var(--brand-sage)] transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-sage-light)] text-[var(--brand-sage-dark)] flex items-center justify-center mb-3">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[var(--brand-sage-dark)] mb-1">
              จัดการสินค้า & สต็อก
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              เพิ่มวัตถุมงคลใหม่, อัปเดตรูปภาพ, กำหนดราคา, มวลสาร, และปรับสต็อกสินค้า
            </p>
          </div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-sage)] hover:text-[var(--brand-sage-dark)] group"
          >
            <span>จัดการสินค้า</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[var(--border-warm)] shadow-xs flex flex-col justify-between hover:border-emerald-400 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[var(--brand-sage-dark)] mb-1">
              คำสั่งซื้อ & ตรวจสลิป
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              ตรวจสลิปโอนเงิน อนุมัติการชำระเงิน และกรอกเลขพัสดุ (Kerry, Flash, EMS)
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 group"
          >
            <span>ดูรายการออเดอร์</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[var(--border-warm)] shadow-xs flex flex-col justify-between hover:border-amber-400 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[var(--brand-sage-dark)] mb-1">
              ใบรับรองพระแท้
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              ออกใบรับรองดิจิทัล รหัสเฉพาะองค์ มวลสาร และข้อมูลพระเกจิผู้ปลุกเสก
            </p>
          </div>
          <Link
            href="/admin/certificates"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 group"
          >
            <span>จัดการใบรับรอง</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[var(--border-warm)] shadow-xs flex flex-col justify-between hover:border-purple-400 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[var(--brand-sage-dark)] mb-1">
              งานสั่งสร้างเฉพาะบุคคล
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              ติดตามคำขอสั่งสร้างพระเครื่อง มวลสาร พิธี และติดต่อกลับลูกค้าทางโทรศัพท์หรืออีเมล
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 group"
          >
            <span>ดูงานสั่งสร้าง</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Latest Products Preview */}
      <div className="bg-white rounded-2xl p-6 border border-[var(--border-warm)] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-bold text-[var(--brand-sage-dark)]">
            สินค้าล่าสุดในระบบ ({products.slice(0, 5).length} จาก {products.length})
          </h3>
          <Link
            href="/admin/products"
            className="text-xs font-semibold text-[var(--brand-sage)] hover:underline"
          >
            ดูทั้งหมด
          </Link>
        </div>

        <div className="divide-y divide-stone-100">
          {products.slice(0, 5).map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden relative shrink-0 border border-stone-200">
                  <SafeImage
                    src={p.image}
                    alt={p.titleTh}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm text-stone-900 truncate">
                    {p.titleTh}
                  </div>
                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <span className="font-mono">{p.sku}</span>
                    <span>•</span>
                    <span>{p.categoryLabelTh || p.category}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-[var(--brand-sage-dark)]">
                  ฿{Number(p.salePrice || p.regularPrice).toLocaleString()}
                </div>
                <div className="text-xs text-stone-500">
                  สต็อก: <span className="font-medium">{p.stock} ชิ้น</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
