'use client';

import React from 'react';
import Link from 'next/link';
import Image from '@/components/SafeImage';
import { ShieldCheck, Truck, RefreshCw, Lock, MessageCircle, Phone, MapPin, Building2 } from 'lucide-react';

export function Footer() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const slideTitles = [
    { label: 'ติดต่อร้าน', id: 0 },
    { label: 'หมวดหมู่', id: 1 },
    { label: 'บริการ', id: 2 },
    { label: 'นโยบาย', id: 3 },
  ];

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: index * containerWidth,
        behavior: 'smooth',
      });
      setActiveSlide(index);
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const idx = Math.round(scrollLeft / clientWidth);
      if (idx !== activeSlide && idx >= 0 && idx <= 3) {
        setActiveSlide(idx);
      }
    }
  };

  return (
    <footer className="bg-[#EFECE6] border-t border-[#E6E1D8] text-[#5C5852] text-xs pt-12 sm:pt-16 pb-12">
      {/* 4 Guarantees Badges (Swipeable on mobile, grid on desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 border-b border-[#D8D1C7]">
        <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x scrollbar-none gap-3 md:gap-6 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-4">
          <div className="snap-start shrink-0 w-[240px] md:w-auto p-3.5 md:p-0 bg-white/70 md:bg-transparent rounded-xl md:rounded-none border border-[#E6E1D8] md:border-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4A5D4E] shadow-2xs shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C6A052]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#282522]">รับประกันของแท้ 100%</h4>
              <p className="text-[11px] text-[#8E8A83]">พร้อมบัตร Digital Certificate</p>
            </div>
          </div>

          <div className="snap-start shrink-0 w-[240px] md:w-auto p-3.5 md:p-0 bg-white/70 md:bg-transparent rounded-xl md:rounded-none border border-[#E6E1D8] md:border-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4A5D4E] shadow-2xs shrink-0">
              <Truck className="w-5 h-5 text-[#4A5D4E]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#282522]">จัดส่งปลอดภัย รวดเร็ว</h4>
              <p className="text-[11px] text-[#8E8A83]">แพ็กกันกระแทกอย่างดี มีเลขพัสดุ</p>
            </div>
          </div>

          <div className="snap-start shrink-0 w-[240px] md:w-auto p-3.5 md:p-0 bg-white/70 md:bg-transparent rounded-xl md:rounded-none border border-[#E6E1D8] md:border-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4A5D4E] shadow-2xs shrink-0">
              <RefreshCw className="w-5 h-5 text-[#4A5D4E]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#282522]">นโยบายดูแลหลังการขาย</h4>
              <p className="text-[11px] text-[#8E8A83]">เปลี่ยนเคลมหากชำรุดจากการส่ง</p>
            </div>
          </div>

          <div className="snap-start shrink-0 w-[240px] md:w-auto p-3.5 md:p-0 bg-white/70 md:bg-transparent rounded-xl md:rounded-none border border-[#E6E1D8] md:border-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4A5D4E] shadow-2xs shrink-0">
              <Lock className="w-5 h-5 text-[#4A5D4E]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#282522]">ข้อมูลปลอดภัย PDPA</h4>
              <p className="text-[11px] text-[#8E8A83]">มาตรฐานความปลอดภัยข้อมูลสากล</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* MOBILE SLIDER ONLY (< md) */}
        <div className="block md:hidden">
          {/* Slide Tab Buttons */}
          <div className="flex items-center justify-between gap-1.5 p-1 bg-white/80 rounded-2xl border border-[#E6E1D8] mb-4">
            {slideTitles.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSlide(tab.id)}
                className={`flex-1 py-1.5 text-center text-[11px] font-medium rounded-xl transition-all ${
                  activeSlide === tab.id
                    ? 'bg-[#4A5D4E] text-white shadow-xs font-semibold'
                    : 'text-[#635F59] hover:text-[#282522]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Swipeable Slide Container */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3.5 -mx-4 px-4 pb-2"
          >
            {/* Slide 1: ข้อมูลร้าน & ติดต่อ */}
            <div className="snap-center shrink-0 w-[calc(100vw-2rem)] max-w-[360px] bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C6A052]/70 ring-1 ring-[#C6A052]/30 bg-gradient-to-b from-white to-[#FAF7F2] p-0.5 shadow-2xs">
                    <Image
                      src="/images/logo-suphonpha-emblem.png"
                      alt="สุพรภา Suphonpha - คนดวงดี 2025"
                      fill
                      sizes="36px"
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div>
                    <span className="font-serif text-base font-semibold text-[#282522] tracking-wider block leading-tight">
                      SUPHONPHA
                    </span>
                    <span className="text-[10px] text-[#A98336] font-medium tracking-wide">
                      คนดวงดี 2025
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#635F59] leading-relaxed">
                  แพลตฟอร์มจำหน่ายเครื่องรางนำโชค วัตถุมงคล พระเครื่อง และของเก่ามงคลร่วมสมัย ดำเนินงานถูกต้องตามกฎหมาย พร้อมระบบตรวจสอบ Digital Certificate ทุกชิ้น
                </p>

                {/* Company Details */}
                <div className="space-y-1.5 text-[11px] text-[#635F59] pt-1 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 font-medium text-[#282522]">
                    <Building2 className="w-3.5 h-3.5 text-[#A98336] shrink-0" />
                    <span>บริษัท สุพรภา จำกัด (เลขทะเบียน: 0105569013597)</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">เลขที่ 25 ซอยริมทางด่วน 2 แขวงพระโขนงใต้ เขตพระโขนง กรุงเทพฯ 10260</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl font-medium text-xs transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>LINE: @konduangdee</span>
                </a>
                <a
                  href="tel:0653062263"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#F7F4EE] border border-[#D8D1C7] hover:border-[#4A5D4E] text-[#4A5D4E] rounded-xl font-medium text-xs transition-colors shadow-2xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>โทร 065-306-2263</span>
                </a>
              </div>
            </div>

            {/* Slide 2: หมวดหมู่วัตถุมงคล */}
            <div className="snap-center shrink-0 w-[calc(100vw-2rem)] max-w-[360px] bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-3">
                  <h4 className="font-serif text-sm font-semibold text-[#282522]">หมวดหมู่วัตถุมงคล</h4>
                  <span className="text-[10px] text-[#A98336] bg-[#F9F4E8] px-2 py-0.5 rounded-full border border-[#C6A052]/30">
                    ของแท้ 100%
                  </span>
                </div>
                <ul className="space-y-2.5 text-xs">
                  <li>
                    <Link href="/shop?cat=amulet" className="flex items-center justify-between py-1 text-[#282522] hover:text-[#4A5D4E]">
                      <span>✨ พระเครื่องและเหรียญมงคล</span>
                      <span className="text-gray-400 text-xs">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?cat=bracelet" className="flex items-center justify-between py-1 text-[#282522] hover:text-[#4A5D4E]">
                      <span>📿 กำไลและสร้อยข้อมือหินแท้</span>
                      <span className="text-gray-400 text-xs">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?cat=ring" className="flex items-center justify-between py-1 text-[#282522] hover:text-[#4A5D4E]">
                      <span>💍 แหวนอัญมณีเสริมดวง</span>
                      <span className="text-gray-400 text-xs">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?cat=sticker" className="flex items-center justify-between py-1 text-[#282522] hover:text-[#4A5D4E]">
                      <span>🧧 สติ๊กเกอร์ยันต์มงคล (เริ่มต้น 99.-)</span>
                      <span className="text-gray-400 text-xs">→</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <Link
                href="/certificate"
                className="w-full py-2.5 px-3 bg-gradient-to-r from-[#F9F4E8] to-[#EFECE6] border border-[#C6A052]/40 rounded-xl text-center text-xs font-semibold text-[#A98336] flex items-center justify-center gap-1.5 shadow-2xs hover:bg-[#F9F4E8]"
              >
                <ShieldCheck className="w-4 h-4 text-[#C6A052]" />
                <span>ตรวจสอบ Digital Certificate</span>
              </Link>
            </div>

            {/* Slide 3: บริการและข้อมูลร้าน */}
            <div className="snap-center shrink-0 w-[calc(100vw-2rem)] max-w-[360px] bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-3">
                  <h4 className="font-serif text-sm font-semibold text-[#282522]">บริการและข้อมูลร้าน</h4>
                  <span className="text-[10px] text-[#4A5D4E] bg-[#E8EFEA] px-2 py-0.5 rounded-full font-medium">
                    บริการลูกค้า
                  </span>
                </div>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link href="/about" className="block py-1 text-[#282522] hover:text-[#4A5D4E]">
                      เรื่องราวแบรนด์ คนดวงดี
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles" className="block py-1 text-[#282522] hover:text-[#4A5D4E]">
                      บทความน่ารู้และการดูแล
                    </Link>
                  </li>
                  <li>
                    <Link href="/custom-order" className="block py-1 text-[#A98336] font-semibold hover:text-[#4A5D4E]">
                      ⚡ สั่งสร้างวัตถุมงคลเฉพาะรุ่น
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="block py-1 text-[#5C5852] hover:text-[#4A5D4E]">
                      นโยบายการจัดส่งสินค้า
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="block py-1 text-[#5C5852] hover:text-[#4A5D4E]">
                      เงื่อนไขการคืนและการรับประกัน
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="block py-1 text-[#5C5852] hover:text-[#4A5D4E]">
                      คำถามที่พบบ่อย (FAQ)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Slide 4: นโยบายและความปลอดภัย */}
            <div className="snap-center shrink-0 w-[calc(100vw-2rem)] max-w-[360px] bg-white rounded-2xl p-5 border border-[#E6E1D8] shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-3">
                  <h4 className="font-serif text-sm font-semibold text-[#282522]">นโยบายและความโปร่งใส</h4>
                  <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-mono">
                    PDPA OK
                  </span>
                </div>
                <ul className="space-y-2.5 text-xs mb-4">
                  <li>
                    <Link href="/privacy" className="flex items-center justify-between py-1 text-[#282522] hover:text-[#4A5D4E]">
                      <span>นโยบายความเป็นส่วนตัว (PDPA)</span>
                      <span className="text-gray-400 text-xs">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="flex items-center justify-between py-1 text-[#282522] hover:text-[#4A5D4E]">
                      <span>ข้อกำหนดและเงื่อนไขการสั่งซื้อ</span>
                      <span className="text-gray-400 text-xs">→</span>
                    </Link>
                  </li>
                </ul>

                <div className="p-3 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] text-[11px] text-[#635F59] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#4A5D4E] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>มาตรฐานความปลอดภัยสากล</span>
                  </div>
                  <p className="leading-relaxed">
                    ระบบของเรารักษาความปลอดภัยข้อมูลส่วนบุคคลตามมาตรฐาน PDPA พร้อมระบบยืนยันสลิปอัตโนมัติ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Swipe Indicator Dots & Guide */}
          <div className="flex items-center justify-between pt-2 px-1 text-[11px] text-[#8E8A83]">
            <div className="flex items-center gap-1.5">
              {slideTitles.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSlide(tab.id)}
                  aria-label={`ไปสไลด์ที่ ${tab.id + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === tab.id ? 'w-6 bg-[#4A5D4E]' : 'w-2 bg-[#D8D1C7]'
                  }`}
                />
              ))}
            </div>
            <span>👈 ปัดซ้าย-ขวาเพื่อเลือกดู ({activeSlide + 1}/4)</span>
          </div>
        </div>

        {/* DESKTOP GRID ONLY (hidden on mobile, visible on md and up) */}
        <div className="hidden md:grid md:grid-cols-5 gap-8">
          {/* Brand Intro */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C6A052]/70 ring-1 ring-[#C6A052]/30 bg-gradient-to-b from-white to-[#FAF7F2] p-0.5 shadow-2xs">
                <Image
                  src="/images/logo-suphonpha-emblem.png"
                  alt="สุพรภา Suphonpha - คนดวงดี 2025"
                  fill
                  sizes="36px"
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-semibold text-[#282522] tracking-wider block leading-tight">
                  SUPHONPHA
                </span>
                <span className="text-[10px] text-[#A98336] font-medium tracking-wide">
                  คนดวงดี 2025
                </span>
              </div>
            </div>
            <p className="text-xs text-[#635F59] leading-relaxed max-w-sm">
              แพลตฟอร์มจำหน่ายเครื่องรางนำโชค วัตถุมงคล พระเครื่อง และของเก่ามงคลร่วมสมัย ดำเนินงานถูกต้องตามกฎหมาย พร้อมระบบตรวจสอบ Digital Certificate ทุกชิ้น
            </p>

            {/* Official Company Details */}
            <div className="space-y-1.5 text-[11px] text-[#635F59] pt-1">
              <div className="flex items-center gap-1.5 font-medium text-[#282522]">
                <Building2 className="w-3.5 h-3.5 text-[#A98336] shrink-0" />
                <span>บริษัท สุพรภา จำกัด (เลขทะเบียน: 0105569013597)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span className="leading-snug">เลขที่ 25 ซอยริมทางด่วน 2 แขวงพระโขนงใต้ เขตพระโขนง กรุงเทพฯ 10260</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#4A5D4E] shrink-0" />
                <a href="tel:0653062263" className="font-semibold text-[#4A5D4E] hover:underline">
                  โทร. 065-306-2263
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href="https://line.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-lg font-medium text-xs transition-colors shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>LINE: @konduangdee</span>
              </a>
              <a
                href="tel:0653062263"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D8D1C7] hover:border-[#4A5D4E] text-[#4A5D4E] rounded-lg font-medium text-xs transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>โทร 065-306-2263</span>
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#282522] mb-3">หมวดหมู่วัตถุมงคล</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?cat=amulet" className="hover:text-[#4A5D4E] transition-colors">
                  พระเครื่องและเหรียญมงคล
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=bracelet" className="hover:text-[#4A5D4E] transition-colors">
                  กำไลและสร้อยข้อมือหินแท้
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=ring" className="hover:text-[#4A5D4E] transition-colors">
                  แหวนอัญมณีเสริมดวง
                </Link>
              </li>
              <li>
                <Link href="/shop?cat=sticker" className="hover:text-[#4A5D4E] transition-colors">
                  สติ๊กเกอร์ยันต์มงคล (เริ่มต้น 99.-)
                </Link>
              </li>
              <li>
                <Link href="/certificate" className="text-[#C6A052] font-medium hover:underline">
                  ตรวจสอบ Digital Certificate
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Service & Info */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#282522] mb-3">บริการและข้อมูลร้าน</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-[#4A5D4E] transition-colors">
                  เรื่องราวแบรนด์ คนดวงดี
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-[#4A5D4E] transition-colors">
                  บทความน่ารู้และการดูแล
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="text-[#A98336] font-medium hover:underline">
                  สั่งสร้างวัตถุมงคลเฉพาะรุ่น
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#4A5D4E] transition-colors">
                  นโยบายการจัดส่งสินค้า
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#4A5D4E] transition-colors">
                  เงื่อนไขการคืนและการรับประกัน
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#4A5D4E] transition-colors">
                  คำถามที่พบบ่อย (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#282522] mb-3">นโยบายความโปร่งใส</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-[#4A5D4E] transition-colors">
                  นโยบายความเป็นส่วนตัว (PDPA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#4A5D4E] transition-colors">
                  ข้อกำหนดและเงื่อนไขการสั่งซื้อ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 p-4 bg-[#F7F4EE] rounded-xl border border-[#D8D1C7] text-[11px] leading-relaxed text-[#8E8A83]">
          <strong className="text-[#5C5852] block mb-1">
            คำชี้แจงเพื่อความโปร่งใสและความคุ้มครองผู้บริโภค:
          </strong>
          วัตถุมงคล เครื่องประดับ และเครื่องรางนำโชคทั้งหมดที่จำหน่ายบนเว็บไซต์ &ldquo;คนดวงดี 2025&rdquo; เป็นงานพุทธศิลป์และเครื่องประดับที่ออกแบบเพื่อเป็นเครื่องเตือนสติในการดำรงชีวิตด้วยความดีงาม สุจริต และเป็นความเชื่อส่วนบุคคล ทางร้านไม่มีนโยบายกล่าวอ้างผลลัพธ์ทางโชคลาภ ปาฏิหาริย์ หรือความสำเร็จเกินจริงในเชิงพาณิชย์ โปรดใช้วิจารณญาณในการตัดสินใจ
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-[11px] text-[#8E8A83] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} KON DUANG DEE 2025. สงวนลิขสิทธิ์ทุกประการ.</span>
          <span className="text-[10px]">
            ออกแบบด้วยแนวคิด Warm Minimal | พัฒนาด้วย Next.js 16 Fullstack
          </span>
        </div>
      </div>
    </footer>
  );
}
