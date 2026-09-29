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
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  LogOut,
  KeyRound,
  Check,
  Copy,
  AlertCircle,
} from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';
import { useAuth, OFFICIAL_ADMIN_ACCOUNTS } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { refreshFromGoogleSheet, isLoading } = useStoreData();
  const { user, loginWithEmail, logout } = useAuth();
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // State สำหรับหน้าจอเข้าสู่ระบบ Admin
  const [loginIdentifier, setLoginIdentifier] = useState('superadmin');
  const [loginPassword, setLoginPassword] = useState('Kdd@2025Super!');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const isGoogleSheetConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const isSuperAdmin = user?.role === 'super_admin';

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

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await loginWithEmail(loginIdentifier, loginPassword);
      if (!res.success) {
        setLoginError(res.message || 'รหัสผ่านไม่ถูกต้อง');
      }
    } catch {
      setLoginError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAutoFill = (username: string, pass: string) => {
    setLoginIdentifier(username);
    setLoginPassword(pass);
    setLoginError('');
  };

  // หากยังไม่ได้เข้าสู่ระบบ Admin ให้แสดงหน้าล็อกอินที่ปลอดภัย
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--bg-cream)] flex items-center justify-center p-4">
        <div className="max-w-lg w-full space-y-6">
          {/* Brand Logo & Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[var(--brand-sage-dark)] text-[var(--brand-gold)] flex items-center justify-center font-serif font-bold text-2xl mx-auto shadow-md">
              ด
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--brand-sage-dark)]">
              คนดวงดี 2025
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              ระบบจัดการหลังบ้าน (Admin & Super Admin Portal)
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--border-warm)] shadow-lg space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <KeyRound className="w-5 h-5 text-[var(--brand-sage)]" />
              <h2 className="font-serif font-bold text-base text-stone-900">
                เข้าสู่ระบบผู้ดูแลระบบ
              </h2>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-800">
                  ชื่อผู้ใช้ หรือ อีเมล (Username / Email)
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="เช่น superadmin หรือ admin"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--brand-sage)] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-stone-800">รหัสผ่าน (Password)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="กรอกรหัสผ่านผู้ดูแล..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--brand-sage)] focus:bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-[var(--brand-sage-dark)] hover:bg-[var(--brand-sage)] text-white font-bold rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
              >
                {isLoggingIn ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบจัดการหลังบ้าน'}
              </button>
            </form>

            {/* Quick Demo Credentials */}
            <div className="pt-4 border-t border-stone-100 space-y-2.5">
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                ข้อมูลรหัสผ่านสำหรับผู้ดูแล (Credentials)
              </div>

              <div className="space-y-2">
                {OFFICIAL_ADMIN_ACCOUNTS.map((acc) => (
                  <div
                    key={acc.username}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all ${
                      acc.role === 'super_admin'
                        ? 'bg-amber-50/70 border-amber-200'
                        : 'bg-emerald-50/70 border-emerald-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-bold flex items-center gap-1.5 text-stone-900">
                        {acc.role === 'super_admin' ? '👑' : '🛡️'} {acc.name}
                      </div>
                      <div className="text-stone-600 text-[11px] mt-0.5 space-x-2 font-mono">
                        <span>User: <strong>{acc.username}</strong></span>
                        <span>Pass: <strong>{acc.password}</strong></span>
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5 truncate">
                        {acc.description}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAutoFill(acc.username, acc.password)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold shrink-0 transition-all ${
                        acc.role === 'super_admin'
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      เติมรหัสนี้
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-[var(--brand-sage)] hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>กลับสู่หน้าแรกเว็บไซต์</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-cream)] text-[var(--text-primary)]">
      {/* Top Admin Notice Bar */}
      <div className="bg-[var(--brand-sage-dark)] text-white text-xs px-4 py-2 border-b border-[var(--brand-sage)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[11px] ${
                isSuperAdmin
                  ? 'bg-[var(--brand-gold)] text-stone-950'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {isSuperAdmin ? '👑 SUPER ADMIN' : '🛡️ ADMIN STAFF'}
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
                  ทำงานแบบ Local / Mock Data
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-300 text-xs">
              ผู้ใช้งาน: <strong className="text-white">{user?.name || user?.email}</strong>
            </span>

            <button
              type="button"
              onClick={handleSync}
              disabled={isLoading}
              className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded text-xs transition-all disabled:opacity-50"
              title="ดึงข้อมูลล่าสุดจาก Google Sheets"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{syncStatus || 'ซิงค์ข้อมูล'}</span>
            </button>

            <button
              type="button"
              onClick={() => logout()}
              className="inline-flex items-center gap-1 bg-rose-600/80 hover:bg-rose-600 text-white px-2.5 py-1 rounded text-xs transition-all"
              title="ออกจากระบบแอดมิน"
            >
              <LogOut className="w-3 h-3" />
              <span>ออกจากระบบ</span>
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
                  ภาพรวม
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
                  จัดการสินค้า
                </Link>

                <Link
                  href="/admin/orders"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
                    pathname.startsWith('/admin/orders')
                      ? 'bg-[var(--brand-sage-light)] text-[var(--brand-sage-dark)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-50'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  คำสั่งซื้อ & สลิป
                </Link>

                <Link
                  href="/admin/certificates"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
                    pathname.startsWith('/admin/certificates')
                      ? 'bg-[var(--brand-sage-light)] text-[var(--brand-sage-dark)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  ใบรับรองพระแท้
                </Link>

                <Link
                  href="/admin/inquiries"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
                    pathname.startsWith('/admin/inquiries')
                      ? 'bg-[var(--brand-sage-light)] text-[var(--brand-sage-dark)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-50'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  งานสั่งสร้าง
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
            className={`px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap inline-flex items-center gap-1 ${
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
            className={`px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap inline-flex items-center gap-1 ${
              pathname.startsWith('/admin/products')
                ? 'bg-[var(--brand-sage-dark)] text-white'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            สินค้า
          </Link>
          <Link
            href="/admin/orders"
            className={`px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap inline-flex items-center gap-1 ${
              pathname.startsWith('/admin/orders')
                ? 'bg-[var(--brand-sage-dark)] text-white'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            ออเดอร์
          </Link>
          <Link
            href="/admin/certificates"
            className={`px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap inline-flex items-center gap-1 ${
              pathname.startsWith('/admin/certificates')
                ? 'bg-[var(--brand-sage-dark)] text-white'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            ใบรับรอง
          </Link>
          <Link
            href="/admin/inquiries"
            className={`px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap inline-flex items-center gap-1 ${
              pathname.startsWith('/admin/inquiries')
                ? 'bg-[var(--brand-sage-dark)] text-white'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            สั่งสร้าง
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
