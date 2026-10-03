'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from '@/components/SafeImage';
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
  ChevronRight,
  Layers,
} from 'lucide-react';
import { CartDrawer } from './CartDrawer';
import { CertificateModal } from './CertificateModal';
import { SUPHONPHA_EMBLEM_BASE64 } from '@/data/logoData';
import { PRODUCT_CATEGORIES } from '@/data/categories';

export function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // ปิด dropdown เมื่อ click outside
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (userDropdownOpen && !dropdownRef.current?.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (categoryDropdownOpen && !categoryDropdownRef.current?.contains(e.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [userDropdownOpen, categoryDropdownOpen]);

  return (
    <>
      {/* Complete Fixed Header (Top bar + Main Navigation Bar stays permanently visible on scroll) */}
      <header className="fixed top-0 left-0 right-0 z-40 shadow-xs transition-all">
        {/* Top Notification Bar */}
        <div className="bg-[#4A5D4E] text-white text-xs py-2 px-3 sm:px-4 text-center tracking-wide font-light flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
          <span className="truncate">จัดส่งฟรีทั่วประเทศเมื่อสั่งซื้อครบ 999 บาท | รับประกันของแท้พร้อม Digital Certificate</span>
        </div>

        {/* Main Navigation Menu Bar */}
        <div className="bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E6E1D8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 touch-target text-[#282522] hover:text-[#4A5D4E] transition-colors"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#C6A052]/60 ring-2 ring-[#C6A052]/20 shadow-xs shrink-0 bg-gradient-to-b from-white to-[#FAF7F2] p-1 flex items-center justify-center transition-all duration-300 group-hover:border-[#C6A052] group-hover:shadow-[0_0_12px_rgba(198,160,82,0.25)]">
                  <Image
                    src={SUPHONPHA_EMBLEM_BASE64}
                    alt="สุพรภา Suphonpha"
                    fill
                    sizes="(max-width: 640px) 36px, 40px"
                    className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="shrink-0 flex flex-col justify-center">
                  <span className="font-serif text-base sm:text-xl lg:text-2xl font-normal tracking-wider text-[#282522] uppercase group-hover:text-[#4A5D4E] transition-colors whitespace-nowrap leading-tight">
                    SUPHONPHA
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-widest text-[#A98336] uppercase font-sans whitespace-nowrap font-medium">
                    สุพรภา
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links (Clean, concise, and no word-wrapping) */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-7 shrink-0">
              {/* Category Dropdown with Submenus */}
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  onMouseEnter={() => setCategoryDropdownOpen(true)}
                  className="flex items-center gap-1 text-xs xl:text-sm font-medium tracking-wide text-[#282522] hover:text-[#4A5D4E] transition-colors whitespace-nowrap py-2 cursor-pointer"
                >
                  <span>หมวดหมู่สินค้า</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#8E8A83] transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180 text-[#4A5D4E]' : ''}`} />
                </button>

                {/* Dropdown Menu Container */}
                {categoryDropdownOpen && (
                  <div
                    onMouseLeave={() => setCategoryDropdownOpen(false)}
                    className="absolute top-full left-0 w-[580px] bg-white rounded-2xl shadow-xl border border-[#E6E1D8] p-5 z-50 animate-in fade-in zoom-in-95 duration-150 grid grid-cols-2 gap-4"
                  >
                    <div className="col-span-2 pb-2.5 mb-1 border-b border-stone-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#C6A052]" />
                        <span className="font-serif text-sm font-bold text-[#282522]">หมวดหมู่วัตถุมงคลและเครื่องประดับ</span>
                      </div>
                      <Link
                        href="/shop"
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="text-xs text-[#A98336] hover:text-[#4A5D4E] font-medium flex items-center gap-1"
                      >
                        <span>ดูสินค้าทั้งหมด</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {PRODUCT_CATEGORIES.map((cat) => (
                      <div key={cat.id} className="p-2.5 rounded-xl hover:bg-[#F7F4EE]/80 transition-colors group">
                        <Link
                          href={`/shop?cat=${cat.id}`}
                          onClick={() => setCategoryDropdownOpen(false)}
                          className="flex items-center justify-between font-medium text-xs text-[#282522] group-hover:text-[#4A5D4E] mb-1.5"
                        >
                          <span className="font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A052]" />
                            {cat.label}
                          </span>
                          <ChevronRight className="w-3 h-3 text-stone-300 group-hover:text-[#4A5D4E] group-hover:translate-x-0.5 transition-all" />
                        </Link>

                        {/* Submenus */}
                        {cat.subCategories && cat.subCategories.length > 0 && (
                          <div className="pl-3 space-y-1 border-l border-stone-200/60 mt-1">
                            {cat.subCategories.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/shop?cat=${cat.id}&sub=${sub.id}`}
                                onClick={() => setCategoryDropdownOpen(false)}
                                className="block text-[11px] text-[#5C5852] hover:text-[#A98336] hover:underline truncate py-0.5"
                                title={sub.description}
                              >
                                • {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/shop"
                className="text-xs xl:text-sm font-medium tracking-wide text-[#282522] hover:text-[#4A5D4E] transition-colors whitespace-nowrap"
              >
                สินค้าทั้งหมด
              </Link>
              <button
                onClick={() => setCertModalOpen(true)}
                className="flex items-center gap-1.5 text-xs xl:text-sm font-medium tracking-wide text-[#282522] hover:text-[#4A5D4E] transition-colors whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 text-[#C6A052] shrink-0" />
                <span>ตรวจใบรับรอง</span>
              </button>
              <Link
                href="/custom-order"
                className="text-xs xl:text-sm font-medium tracking-wide text-[#A98336] hover:text-[#4A5D4E] transition-colors font-semibold whitespace-nowrap"
              >
                สั่งสร้างวัตถุมงคล
              </Link>
              <Link
                href="/articles"
                className="text-xs xl:text-sm font-medium tracking-wide text-[#282522] hover:text-[#4A5D4E] transition-colors whitespace-nowrap"
              >
                บทความน่ารู้
              </Link>
              <Link
                href="/about"
                className="text-xs xl:text-sm font-medium tracking-wide text-[#282522] hover:text-[#4A5D4E] transition-colors whitespace-nowrap"
              >
                เกี่ยวกับเรา
              </Link>
            </nav>

            {/* Header Right Action Icons */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Search Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2 touch-target text-[#282522] hover:text-[#4A5D4E] transition-colors"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1 p-2 touch-target text-[#282522] hover:text-[#4A5D4E] transition-colors"
                  aria-label="User Account"
                  aria-expanded={userDropdownOpen}
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-3 h-3 text-[#8E8A83]" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-[#E6E1D8] py-2 z-50 text-xs animate-[fadeInDown_0.2s_ease]"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 truncate">{user?.name || 'ผู้เยี่ยมชม'}</p>
                      <p className="text-gray-500 text-xs truncate">{user?.email || 'กรุณาเข้าสู่ระบบ'}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-[#E8EFEA] text-[#4A5D4E] font-medium">
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
                className="relative p-2 touch-target text-[#282522] hover:text-[#4A5D4E] transition-colors"
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

        {/* Mobile Navigation Drawer — slide-down animation */}
        <div
          className={`lg:hidden border-t border-[#E6E1D8] bg-[#F7F4EE] overflow-y-auto transition-all duration-300 ease-out ${
            mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-3 pb-6 space-y-1">
            {/* Category Accordion */}
            <div className="border-b border-[#F0ECE6]">
              <button
                type="button"
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                className="flex items-center justify-between w-full text-base font-medium text-[#282522] hover:text-[#4A5D4E] py-2.5"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C6A052]" />
                  <span>หมวดหมู่สินค้า</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${mobileCategoryOpen ? 'rotate-180 text-[#4A5D4E]' : ''}`} />
              </button>

              {mobileCategoryOpen && (
                <div className="pb-3 pl-3 pr-1 space-y-3 bg-white/70 rounded-xl p-3 mb-2 border border-stone-200/60">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="space-y-1">
                      <Link
                        href={`/shop?cat=${cat.id}`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileCategoryOpen(false);
                        }}
                        className="flex items-center justify-between text-xs font-bold text-[#282522] hover:text-[#4A5D4E] py-1 border-b border-stone-100"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A052]" />
                          {cat.label}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                      </Link>

                      {cat.subCategories && cat.subCategories.length > 0 && (
                        <div className="pl-3 space-y-1">
                          {cat.subCategories.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/shop?cat=${cat.id}&sub=${sub.id}`}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileCategoryOpen(false);
                              }}
                              className="block text-[11px] text-[#5C5852] hover:text-[#A98336] py-0.5"
                            >
                              • {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#282522] hover:text-[#4A5D4E] py-2.5 border-b border-[#F0ECE6]"
            >
              สินค้าทั้งหมด
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCertModalOpen(true);
              }}
              className="flex items-center gap-2 w-full text-left text-base font-medium text-[#282522] hover:text-[#4A5D4E] py-2.5 border-b border-[#F0ECE6]"
            >
              <ShieldCheck className="w-5 h-5 text-[#C6A052]" />
              ตรวจใบรับรอง
            </button>
            <Link
              href="/custom-order"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-[#A98336] hover:text-[#4A5D4E] py-2.5 border-b border-[#F0ECE6]"
            >
              สั่งสร้างวัตถุมงคล
            </Link>
            <Link
              href="/articles"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#282522] hover:text-[#4A5D4E] py-2.5 border-b border-[#F0ECE6]"
            >
              บทความน่ารู้
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#282522] hover:text-[#4A5D4E] py-2.5"
            >
              เกี่ยวกับเรา
            </Link>
          </div>
        </div>
        </div>
      </header>

      {/* Spacer to prevent content from slipping under fixed header */}
      <div className="h-[112px] w-full shrink-0" aria-hidden="true" />

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
