'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Package,
  LayoutDashboard,
  ExternalLink,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  FileSpreadsheet,
  Layers,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { refreshFromGoogleSheet, isLoading } = useStoreData();
  const { user, loginWithEmail } = useAuth();
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const isGoogleSheetConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  const handleSync = async () => {
    setSyncStatus('กำลังซิงค์...');
    try {
      await refreshFromGoogleSheet();
      setSyncStatus('ซิงค์ข้อมูลสำเร็จ!');
      setTimeout(() => setSyncStatus(null), 3000);
    } catch {
      setSyncStatus('เกิดข้อผิดพลาดในการซิงค์');
      setTimeout(() => setSyncStatus(null), 3000);
    }
  };

  const grantAdminRole = async () => {
    await loginWithEmail('admin@konduangdee.com', 'admin');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-cream)] text-[var(--text-primary)]">
      {/* Top Admin Notice Bar */}
      <div className="bg-[var(--brand-sage-dark)] text-white text-xs px-4 py-2 border-b border-[var(--brand-sage)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[var(--brand-gold)] text-stone-900 font-bold px-2 py-0.5 rounded text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              ADMIN PANEL
            </span>
            <span className="hidden sm:inline text-stone-300">|</span>
            <span className="text-stone-300">
              สถานะชีต:{' '}
              {isGoogleSheetConfigured ? (
                <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> เชื่อมต่อ Google Sheets API แล้ว
                </span>
              ) : (
                <span className="text-amber-300 font-medium">
                  ทำงานแบบ Local / Mock Data (ยังไม่ได้ใส่ URL ชีต)
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!isAdmin ? (
              <button
                type="button"
                onClick={grantAdminRole}
                className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-2.5 py-1 rounded text-xs transition-colors"
              >
                สลับเป็นสิทธิ์แอดมิน (Super Admin)
              </button>
            ) : (
              <span className="text-stone-300 text-xs">
                ผู้ใช้งาน: <strong className="text-white">{user?.name || user?.email}</strong> (
                {user?.role})
              </span>
            )}

            <button
              type="button"
              onClick={handleSync}
              disabled={isLoading}
              className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded text-xs transition-all disabled:opacity-50"
              title="ดึงข้อมูลล่าสุดจาก Google Sheets"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{syncStatus || 'ซิงค์ข้อมูลล่าสุด'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Navigation */}
      <header className="bg-white border-b border-[var(--border-warm)] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-lg bg-[var(--brand-sage-dark)] text-[var(--brand-gold)] flex items-center justify-center font-serif font-bold text-lg shadow-sm">
                  ด
                </div>
                <div>
                  <div className="font-serif font-bold text-base leading-tight tracking-wide text-[var(--brand-sage-dark)]">
                    คนดวงดี 2025
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] tracking-wider">
                    ระบบจัดการหลังบ้าน (Admin CMS)
                  </div>
                </div>
              </Link>

              <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-stone-200">
                <Link
                  href="/admin"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
                    pathname === '/admin'
                      ? 'bg-[var(--brand-sage-light)] text-[var(--brand-sage-dark)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  ภาพรวม (Dashboard)
                </Link>

                <Link
                  href="/admin/products"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
                    pathname.startsWith('/admin/products')
                      ? 'bg-[var(--brand-sage-light)] text-[var(--brand-sage-dark)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-50'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  จัดการสินค้า & ลงสินค้า
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/shop"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--brand-sage)] hover:text-[var(--brand-sage-dark)] font-medium px-3 py-1.5 rounded-lg border border-[var(--border-warm)] bg-stone-50 hover:bg-stone-100 transition-colors"
              >
                <span>ดูหน้าร้าน</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex border-t border-[var(--border-warm)] bg-stone-50/80 px-2 py-1.5 overflow-x-auto gap-1">
          <Link
            href="/admin"
            className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap inline-flex items-center gap-1.5 ${
              pathname === '/admin'
                ? 'bg-[var(--brand-sage-dark)] text-white'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            ภาพรวม
          </Link>
          <Link
            href="/admin/products"
            className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap inline-flex items-center gap-1.5 ${
              pathname.startsWith('/admin/products')
                ? 'bg-[var(--brand-sage-dark)] text-white'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            สินค้า & ลงสินค้า
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
