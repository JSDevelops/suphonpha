'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import {
  ShoppingBag,
  Search,
  User,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { CartDrawer } from './CartDrawer';
import { CertificateModal } from './CertificateModal';

export function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const { user, isAdmin, switchRoleForTesting, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#4A5D4E] text-white text-xs py-2 px-4 text-center tracking-wide font-light flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C6A052]" />
        <span>จัดส่งฟรีทั่วประเทศเมื่อสั่งซื้อครบ 999 บาท | รับประกันของแท้พร้อม Digital Certificate</span>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-[#F7F4EE]/90 backdrop-blur-md border-b border-[#E6E1D8] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#282522] hover:text-[#4A5D4E] transition-colors"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#C6A052]/40 shadow-xs">
                  <Image
                    src="/images/logo.png"
                    alt="คนดวงดี 2025"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-normal tracking-wider text-[#282522] uppercase group-hover:text-[#4A5D4E] transition-colors">
                    KON DUANG DEE 2025
                  </span>
                  <span className="hidden sm:block text-[9px] tracking-widest text-[#8E8A83] uppercase -mt-1 font-sans">
                    SACRED AMULETS & CONTEMPORARY BLESSINGS
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/shop"
                className="text-sm font-medium tracking-wider text-[#282522] hover:text-[#4A5D4E] transition-colors uppercase"
              >
                SHOP (สินค้าทั้งหมด)
              </Link>
              <button
                onClick={() => setCertModalOpen(true)}
                className="flex items-center gap-1.5 text-sm font-medium tracking-wider text-[#282522] hover:text-[#4A5D4E] transition-colors uppercase"
              >
                <ShieldCheck className="w-4 h-4 text-[#C6A052]" />
                CERTIFICATE (ตรวจใบรับรอง)
              </button>
              <Link
                href="/articles"
                className="text-sm font-medium tracking-wider text-[#282522] hover:text-[#4A5D4E] transition-colors uppercase"
              >
                ARTICLES (บทความ)
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium tracking-wider text-[#282522] hover:text-[#4A5D4E] transition-colors uppercase"
              >
                ABOUT US (เกี่ยวกับเรา)
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold tracking-wider text-white bg-[#4A5D4E] rounded-full hover:bg-[#37473A] transition-colors shadow-xs"
                >
                  ADMIN PANEL
                </Link>
              )}
            </nav>

            {/* Header Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-[#282522] hover:text-[#4A5D4E] transition-colors"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1 p-2 text-[#282522] hover:text-[#4A5D4E] transition-colors"
                  aria-label="User Account"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-3 h-3 text-[#8E8A83]" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-[#E6E1D8] py-2 z-50 text-xs"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 truncate">{user?.name || 'ผู้เยี่ยมชม'}</p>
                      <p className="text-gray-500 text-[11px] truncate">{user?.email || 'กรุณาเข้าสู่ระบบ'}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] rounded-full bg-[#E8EFEA] text-[#4A5D4E] font-medium">
                        สิทธิ์: {user?.role || 'Guest'}
                      </span>
                    </div>

                    <Link
                      href="/account"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#F7F4EE] hover:text-[#4A5D4E]"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      จัดการบัญชี & ประวัติคำสั่งซื้อ
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-[#4A5D4E] font-medium hover:bg-[#F7F4EE]"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        ระบบหลังบ้าน (Admin Panel)
                      </Link>
                    )}

                    <div className="border-t border-gray-100 mt-1 pt-1 px-4 py-1">
                      <p className="text-[10px] text-gray-400 mb-1">ทดสอบเปลี่ยนสิทธิ์ (Dev Tool):</p>
                      <div className="flex gap-1">
                        <button
                          onClick={() => switchRoleForTesting('customer')}
                          className={`px-2 py-0.5 text-[10px] rounded border ${
                            user?.role === 'customer'
                              ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                              : 'bg-gray-50 text-gray-600'
                          }`}
                        >
                          Customer
                        </button>
                        <button
                          onClick={() => switchRoleForTesting('admin')}
                          className={`px-2 py-0.5 text-[10px] rounded border ${
                            user?.role === 'admin'
                              ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                              : 'bg-gray-50 text-gray-600'
                          }`}
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-xs"
                      >
                        ออกจากระบบ
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#282522] hover:text-[#4A5D4E] transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-bold text-white bg-[#4A5D4E] rounded-full shadow-xs">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E6E1D8] bg-[#F7F4EE] px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#282522] hover:text-[#4A5D4E] py-2"
            >
              SHOP (สินค้าทั้งหมด)
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCertModalOpen(true);
              }}
              className="flex items-center gap-2 w-full text-left text-base font-medium text-[#282522] hover:text-[#4A5D4E] py-2"
            >
              <ShieldCheck className="w-5 h-5 text-[#C6A052]" />
              CERTIFICATE (ตรวจใบรับรอง)
            </button>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#282522] hover:text-[#4A5D4E] py-2"
            >
              ARTICLES (บทความและความรู้)
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#282522] hover:text-[#4A5D4E] py-2"
            >
              ABOUT US (เกี่ยวกับเรา & นโยบาย)
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-white bg-[#4A5D4E] px-4 py-2 rounded-lg text-center"
              >
                ระบบจัดการหลังบ้าน (Admin Panel)
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/40 backdrop-blur-xs px-4">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-6 border border-[#E6E1D8]">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-serif text-lg font-medium text-[#282522]">ค้นหาวัตถุมงคลและเครื่องประดับ</h3>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="พิมพ์ชื่อสินค้า เช่น พระพุทธ, กำไลหิน, สติ๊กเกอร์ หรือเลข SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#4A5D4E] text-sm"
                  autoFocus
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="text-gray-400">คำค้นหายอดนิยม:</span>
                {['เหรียญพระพุทธ', 'กำไลหินไทเกอร์อายส์', 'พระปิดตา', 'สติ๊กเกอร์ยันต์ 99.-'].map((tag) => (
                  <Link
                    key={tag}
                    href={`/shop?q=${encodeURIComponent(tag)}`}
                    onClick={() => setSearchModalOpen(false)}
                    className="px-2.5 py-1 bg-[#F7F4EE] hover:bg-[#E8EFEA] text-[#4A5D4E] rounded-md transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              {searchQuery.trim() && (
                <div className="mt-5">
                  <Link
                    href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setSearchModalOpen(false)}
                    className="block w-full py-2.5 text-center bg-[#4A5D4E] text-white rounded-lg text-sm font-medium hover:bg-[#37473A] transition-colors"
                  >
                    ดูผลการค้นหาทั้งหมดสำหรับ &ldquo;{searchQuery}&rdquo;
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer & Certificate Modal */}
      <CartDrawer />
      <CertificateModal isOpen={certModalOpen} onClose={() => setCertModalOpen(false)} />
    </>
  );
}
