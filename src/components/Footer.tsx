'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, RefreshCw, Lock, MessageCircle, Phone, MapPin, Building2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#EFECE6] border-t border-[#E6E1D8] text-[#5C5852] text-xs pt-16 pb-12">
      {/* 4 Guarantees Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#D8D1C7]">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4A5D4E] shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#C6A052]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#282522]">รับประกันของแท้ 100%</h4>
              <p className="text-[11px] text-[#8E8A83]">พร้อมบัตร Digital Certificate</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4A5D4E] shadow-2xs">
              <Truck className="w-5 h-5 text-[#4A5D4E]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#282522]">จัดส่งปลอดภัย รวดเร็ว</h4>
              <p className="text-[11px] text-[#8E8A83]">แพ็กกันกระแทกอย่างดี มีเลขพัสดุ</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4A5D4E] shadow-2xs">
              <RefreshCw className="w-5 h-5 text-[#4A5D4E]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#282522]">นโยบายดูแลหลังการขาย</h4>
              <p className="text-[11px] text-[#8E8A83]">เปลี่ยนเคลมหากชำรุดจากการส่ง</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4A5D4E] shadow-2xs">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Intro */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#C6A052]">
                <Image
                  src="/images/logo.png"
                  alt="คนดวงดี 2025"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-lg font-medium text-[#282522] tracking-wider">
                KON DUANG DEE 2025
              </span>
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
