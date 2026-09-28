'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStoreData } from '@/context/StoreDataContext';
import { ProductCard } from '@/components/ProductCard';
import { CertificateModal } from '@/components/CertificateModal';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Search,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  const { products, articles } = useStoreData();
  const [selectedCertCode, setSelectedCertCode] = useState<string>('');
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);
  const [verifyInput, setVerifyInput] = useState<string>('');

  const handleOpenCert = (code: string) => {
    setSelectedCertCode(code);
    setCertModalOpen(true);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInput.trim()) return;
    setSelectedCertCode(verifyInput.trim());
    setCertModalOpen(true);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO BANNER SECTION (Warm Minimal, 3D Dimensional Buttons & Interactive Ambient Details) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="relative rounded-3xl overflow-hidden bg-radial from-[#FAF8F5] via-[#EFECE6] to-[#E6E1D7] border border-[#E6E1D8] shadow-sm hover:shadow-xl transition-shadow duration-700">
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#C6A052]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-[#4A5D4E]/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative">
            {/* Left Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6 z-10">
              {/* Interactive Collection Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-xs border border-[#C6A052]/30 text-[#4A5D4E] text-xs font-medium tracking-wide shadow-2xs hover:shadow-md hover:border-[#C6A052] hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A052] animate-pulse" />
                <span className="font-medium">คอลเลกชันใหม่ปี 2025</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A5D4E]/50"></span>
                <span className="text-[11px] text-[#A98336]">ผ่านพิธีพุทธาภิเษกแท้</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#282522] leading-[1.18] tracking-tight">
                Meaningful Jewelry for a Kinder Tomorrow
              </h1>

              <p className="text-sm sm:text-base text-[#5C5852] font-light leading-relaxed max-w-lg">
                Authentic Thai amulets and sacred jewelry for protection, prosperity and peace in everyday life.
                วัตถุมงคลและเครื่องประดับสายมูร่วมสมัย ตรวจสอบที่มาได้ทุกชิ้น
              </p>

              {/* Quick Category Tags with Dimensional Hover */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  href="/shop"
                  className="text-xs px-3 py-1 rounded-lg bg-white/70 hover:bg-white text-[#5C5852] hover:text-[#4A5D4E] border border-[#E0DACF] hover:border-[#C6A052] hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200"
                >
                  ✨ พระเครื่องเลี่ยมทอง
                </Link>
                <Link
                  href="/shop"
                  className="text-xs px-3 py-1 rounded-lg bg-white/70 hover:bg-white text-[#5C5852] hover:text-[#4A5D4E] border border-[#E0DACF] hover:border-[#C6A052] hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200"
                >
                  📿 กำไลหินมงคลแท้
                </Link>
                <Link
                  href="/shop"
                  className="text-xs px-3 py-1 rounded-lg bg-white/70 hover:bg-white text-[#5C5852] hover:text-[#A98336] border border-[#E0DACF] hover:border-[#C6A052] hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 font-medium"
                >
                  🧧 สติ๊กเกอร์ยันต์ 99.-
                </Link>
              </div>

              {/* 3D Dimensional Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                {/* Primary Button: 3D Sage Green with Light Sweep & Elevation */}
                <Link
                  href="/shop"
                  className="group relative overflow-hidden w-full sm:w-auto px-8 py-3.5 bg-gradient-to-b from-[#4A5D4E] to-[#3A4A3E] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 border border-[#4A5D4E] shadow-[0_4px_12px_rgba(74,93,78,0.28),0_2px_0_0_#2A362C] hover:shadow-[0_12px_24px_-4px_rgba(74,93,78,0.4),0_4px_0_0_#2A362C] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(74,93,78,0.3),0_1px_0_0_#2A362C] inline-flex items-center justify-center gap-2.5 touch-target"
                >
                  {/* Subtle Light Sheen on Hover */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <span className="relative z-10">เลือกชมสินค้าทั้งหมด</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>

                {/* Secondary Button: 3D Porcelain & Warm Gold with Elevation */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCertCode('KDD-2025-00101');
                    setCertModalOpen(true);
                  }}
                  className="group relative overflow-hidden w-full sm:w-auto px-7 py-3.5 bg-gradient-to-b from-[#FFFFFF] to-[#F7F4EE] hover:bg-white text-[#4A5D4E] hover:text-[#282522] text-xs sm:text-sm font-medium border border-[#D8D1C7] hover:border-[#C6A052] rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05),0_2px_0_0_#C5BEB3] hover:shadow-[0_12px_24px_-4px_rgba(198,160,82,0.3),0_4px_0_0_#B38E3F] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.06),0_1px_0_0_#B38E3F] inline-flex items-center justify-center gap-2 touch-target"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C6A052] group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300" />
                  <span className="font-semibold">ตรวจสอบ Certificate</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-[#D8D1C7]/60 flex flex-wrap items-center gap-5 sm:gap-7 text-xs text-[#5C5852]">
                <div className="flex items-center gap-1.5 hover:text-[#4A5D4E] transition-colors cursor-default">
                  <CheckCircle className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                  <span>ของแท้ 100% มีใบรับรอง</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-[#4A5D4E] transition-colors cursor-default">
                  <CheckCircle className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                  <span>จัดส่งฟรีตั้งแต่ ฿999</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-[#A98336] transition-colors cursor-default">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A052] shrink-0" />
                  <span>ตรวจเช็ก NFC / QR Code ได้ทันที</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Column with Interactive Floating Card */}
            <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:h-[560px] w-full bg-[#E6E1D8] overflow-hidden group">
              <Image
                src="/images/hero-banner.jpg"
                alt="Sacred Buddha Pendant on Sandstone"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

              {/* Floating Interactive 3D Certificate Preview Badge */}
              <button
                type="button"
                onClick={() => handleOpenCert('KDD-2025-00101')}
                className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/90 hover:bg-white backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/80 hover:border-[#C6A052] shadow-xl hover:shadow-2xl hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 text-left cursor-pointer group/badge"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F9F4E8] to-[#EFECE6] flex items-center justify-center text-[#C6A052] shrink-0 border border-[#C6A052]/30 shadow-xs group-hover/badge:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5 text-[#C6A052]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#282522]">พระสมเด็จเลี่ยมทองคำแท้</span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                        ของแท้
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5C5852] mt-0.5 flex items-center gap-1 group-hover/badge:text-[#4A5D4E]">
                      <span>คลิกเพื่อดูใบรับรองดิจิทัล (KDD-2025-00101)</span>
                      <ArrowRight className="w-3 h-3 group-hover/badge:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES HIGHLIGHT (Including 99 THB Sticker) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] tracking-widest text-[#8E8A83] uppercase font-semibold">
            CURATED COLLECTIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#282522] mt-1">
            หมวดหมู่วัตถุมงคลและเครื่องประดับ
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Link
            href="/shop?cat=sticker"
            className="group p-5 bg-white rounded-2xl border border-[#E6E1D8] hover:border-[#C6A052] transition-all duration-300 hover:shadow-md text-center"
          >
            <div className="relative w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden bg-[#F7F4EE]">
              <Image
                src="/images/products/yantra-sticker.jpg"
                alt="สติ๊กเกอร์ยันต์มงคล"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="font-serif text-sm font-medium text-[#282522] group-hover:text-[#4A5D4E] transition-colors">
              สติ๊กเกอร์ยันต์มงคล
            </h3>
            <p className="text-[11px] text-[#A98336] font-medium mt-1">เริ่มต้นเพียง 99 บาท</p>
          </Link>

          <Link
            href="/shop?cat=bracelet"
            className="group p-5 bg-white rounded-2xl border border-[#E6E1D8] hover:border-[#C6A052] transition-all duration-300 hover:shadow-md text-center"
          >
            <div className="relative w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden bg-[#F7F4EE]">
              <Image
                src="/images/products/bracelet-prosperity.jpg"
                alt="กำไลหินมงคล"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="font-serif text-sm font-medium text-[#282522] group-hover:text-[#4A5D4E] transition-colors">
              กำไลหินมงคลแท้
            </h3>
            <p className="text-[11px] text-[#A98336] font-medium mt-1">เริ่มต้น 1,990 บาท</p>
          </Link>

          <Link
            href="/shop?cat=amulet"
            className="group p-5 bg-white rounded-2xl border border-[#E6E1D8] hover:border-[#C6A052] transition-all duration-300 hover:shadow-md text-center"
          >
            <div className="relative w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden bg-[#F7F4EE]">
              <Image
                src="/images/products/pendant-buddha.jpg"
                alt="พระเครื่องและเหรียญพุทธคุณ"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="font-serif text-sm font-medium text-[#282522] group-hover:text-[#4A5D4E] transition-colors">
              พระเครื่องเลี่ยมทอง
            </h3>
            <p className="text-[11px] text-[#A98336] font-medium mt-1">หลากหลายระดับราคา</p>
          </Link>

          <Link
            href="/shop?cat=ring"
            className="group p-5 bg-white rounded-2xl border border-[#E6E1D8] hover:border-[#C6A052] transition-all duration-300 hover:shadow-md text-center"
          >
            <div className="relative w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden bg-[#F7F4EE]">
              <Image
                src="/images/products/citrine-ring.jpg"
                alt="แหวนอัญมณีมงคล"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="font-serif text-sm font-medium text-[#282522] group-hover:text-[#4A5D4E] transition-colors">
              แหวนอัญมณีเสริมดวง
            </h3>
            <p className="text-[11px] text-[#A98336] font-medium mt-1">พลอยแท้ธรรมชาติ</p>
          </Link>
        </div>
      </section>

      {/* 3. NEW ARRIVALS GRID (Matching Reference Mockup 4 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] tracking-widest text-[#8E8A83] uppercase font-semibold">
              FEATURED PRODUCTS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#282522] mt-1 tracking-wide">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A5D4E] hover:text-[#37473A] transition-colors"
          >
            <span>ดูสินค้าทั้งหมดในร้าน ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards in responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenCert={handleOpenCert}
            />
          ))}
        </div>
      </section>

      {/* 4. DIGITAL CERTIFICATE VERIFICATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#4A5D4E] to-[#37473A] text-white p-8 sm:p-12 shadow-xl border border-[#C6A052]/30">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C6A052] text-xs font-medium border border-[#C6A052]/30">
              <ShieldCheck className="w-4 h-4" />
              <span>ความโปร่งใสและมาตรฐานความแท้</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight">
              ตรวจสอบความแท้ของวัตถุมงคลด้วยระบบ Digital Certificate
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              วัตถุมงคลทุกชิ้นจากคนดวงดี 2025 จะมีรหัสกำกับเฉพาะองค์และ QR Code เพื่อให้คุณสามารถตรวจสอบมวลสาร ขนาด วันที่ออกบัตร และสถานะความถูกต้องได้ตลอดเวลา
            </p>

            {/* Quick Verify Form */}
            <form onSubmit={handleVerifySubmit} className="pt-3 flex flex-col sm:flex-row gap-2 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="กรอกรหัสบัตร เช่น KDD-2025-00101"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white text-[#282522] rounded-xl text-xs sm:text-sm focus:outline-hidden font-mono shadow-md"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#C6A052] hover:bg-[#b38f42] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md shrink-0"
              >
                ตรวจสอบทันที
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 4.5 CUSTOM SACRED COMMISSIONS & PRE-ORDER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E6E1D8] p-8 sm:p-12 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold tracking-widest text-[#A98336] uppercase">
              SPECIAL COMMISSIONS & PRE-ORDERS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#282522] leading-snug">
              บริการสั่งสร้างวัตถุมงคลเฉพาะรุ่น & สั่งจองล่วงหน้า
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5852] font-light leading-relaxed">
              สำหรับวัด, องค์กร, หน่วยงาน หรือคณะศรัทธา ที่ต้องการจัดสร้างวัตถุมงคลเฉพาะกิจ พุทธศิลป์ประณีต พร้อมคัดสรรและผสมมวลสารแท้ ประสานงานพิธีพุทธาภิเษก และออกบัตร Digital Certificate ประจำองค์
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/custom-order"
              className="px-8 py-3.5 bg-[#4A5D4E] hover:bg-[#37473A] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              <span>ปรึกษาและสั่งสร้างวัตถุมงคล</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ARTICLES & KNOWLEDGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] tracking-widest text-[#8E8A83] uppercase font-semibold">
              KNOWLEDGE & WISDOM
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#282522] mt-1">
              บทความและเกร็ดความรู้ร่วมสมัย
            </h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A5D4E] hover:text-[#37473A] transition-colors"
          >
            <span>อ่านบทความทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <Link
              key={art.id}
              href="/articles"
              className="group flex flex-col sm:flex-row gap-5 p-5 bg-white rounded-2xl border border-[#E6E1D8] hover:border-[#C6A052]/50 transition-all hover:shadow-md"
            >
              <div className="relative w-full sm:w-44 h-44 shrink-0 rounded-xl overflow-hidden bg-[#F7F4EE]">
                <Image
                  src={art.coverImage}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#A98336] font-medium uppercase tracking-wider">
                    {art.category}
                  </span>
                  <h3 className="font-serif text-base font-medium text-[#282522] mt-1 line-clamp-2 group-hover:text-[#4A5D4E] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#5C5852] font-light mt-2 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#8E8A83]">
                  <span>{art.publishDate}</span>
                  <span className="text-[#4A5D4E] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    อ่านต่อ <BookOpen className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        initialCode={selectedCertCode}
      />
    </div>
  );
}
