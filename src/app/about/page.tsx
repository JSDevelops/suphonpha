'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Heart, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold tracking-widest text-[#A98336] uppercase">
          OUR STORY & PHILOSOPHY
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#282522]">
          เรื่องราวและเจตนารมณ์ &ldquo;คนดวงดี 2025&rdquo;
        </h1>
        <p className="text-sm sm:text-base text-[#5C5852] font-light max-w-2xl mx-auto leading-relaxed">
          ผสานคุณค่าแห่งพุทธศิลป์ ความเชื่อ และเครื่องประดับร่วมสมัย เข้ากับความโปร่งใสในยุคดิจิทัล
        </p>
      </div>

      {/* Brand Image Banner */}
      <div className="relative aspect-16/9 rounded-3xl overflow-hidden bg-[#E6E1D8] border border-[#E6E1D8] shadow-sm">
        <Image
          src="/images/hero-banner.jpg"
          alt="คนดวงดี 2025 Authentic Spiritual Jewelry"
          fill
          className="object-cover"
        />
      </div>

      {/* Core Principles (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#282522]">เครื่องเตือนสติในการทำดี</h3>
          <p className="text-xs text-[#5C5852] leading-relaxed">
            เราเชื่อมั่นว่าวัตถุมงคลที่แท้จริงคือ &ldquo;เครื่องเตือนสติ&rdquo; ให้ผู้ครอบครองยึดมั่นในศีลธรรม ความเพียร และการประพฤติตนในทางที่ชอบ
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F9F4E8] text-[#C6A052] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#282522]">โปร่งใส ตรวจสอบได้</h3>
          <p className="text-xs text-[#5C5852] leading-relaxed">
            วัตถุมงคลทุกองค์มีหมายเลขกำกับเฉพาะตัว พร้อมระบบ Digital Certificate ออนไลน์ ตรวจสอบมวลสารและขนาดได้อย่างเปิดเผย ไม่มีหมกเม็ด
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#282522]">ดีไซน์ Warm Minimal</h3>
          <p className="text-xs text-[#5C5852] leading-relaxed">
            ออกแบบให้สวมใส่ง่าย เข้ากับเสื้อผ้าและการใช้ชีวิตในชีวิตประจำวันของคนยุคใหม่ สง่างาม สุภาพ และไม่ล้าสมัย
          </p>
        </div>
      </div>

      {/* Consumer Protection Pledge */}
      <div className="p-8 bg-[#F9F4E8] rounded-3xl border border-[#C6A052]/40 space-y-3 text-xs text-[#5C5852] leading-relaxed">
        <h4 className="font-serif text-base font-semibold text-[#282522] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#C6A052]" />
          พันธสัญญาความซื่อสัตย์และการไม่โฆษณาเกินจริง
        </h4>
        <p>
          ร้าน &ldquo;คนดวงดี 2025&rdquo; ยึดถือนโยบายไม่กล่าวอ้างสรรพคุณปาฏิหาริย์หรือรับประกันผลทางวัตถุหรือโชคลาภที่ไม่สามารถยืนยันได้ตามกฎหมายคุ้มครองผู้บริโภค หากรายการใดไม่มีข้อมูลพิธีหรือผู้จัดสร้างอย่างเป็นทางการ ระบบจะระบุว่า <strong>&ldquo;รอข้อมูลจากผู้ดูแล&rdquo;</strong> เสมอ เพื่อให้ลูกค้าได้รับข้อมูลตามข้อเท็จจริงสูงสุด
        </p>
      </div>

      {/* Contact & Support */}
      <div className="p-8 bg-white rounded-3xl border border-[#E6E1D8] space-y-6">
        <h3 className="font-serif text-xl font-medium text-[#282522]">ช่องทางติดต่อเรา</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#5C5852]">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-[#06C755] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#282522] block font-medium">LINE Official Account</strong>
              <p>@konduangdee (มีเครื่องหมาย @)</p>
              <span className="text-[11px] text-gray-400">ให้บริการทุกวัน เวลา 09:00 - 20:00 น.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#4A5D4E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#282522] block font-medium">อีเมลฝ่ายบริการลูกค้า</strong>
              <p>contact@konduangdee.com</p>
              <span className="text-[11px] text-gray-400">ตอบกลับภายใน 24 ชั่วโมงทำการ</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#4A5D4E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#282522] block font-medium">ฝ่ายประสานงานและจัดส่ง</strong>
              <p>02-XXX-XXXX (รอข้อมูลจากผู้ดูแล)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#4A5D4E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#282522] block font-medium">ที่ตั้งสำนักงาน</strong>
              <p>กรุงเทพมหานคร ประเทศไทย (รอข้อมูลจากผู้ดูแล)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
