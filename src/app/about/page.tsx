import React from 'react';
import { Metadata } from 'next';
import Image from '@/components/SafeImage';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Heart, Mail, Phone, MapPin, Building2, CreditCard, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา (About Us)',
  description: 'เรื่องราวและเจตนารมณ์ สุพรภา (Suphonpha) ผสานคุณค่าแห่งพุทธศิลป์ ความเชื่อ และเครื่องประดับร่วมสมัย เข้ากับความโปร่งใสในยุคดิจิทัล',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold tracking-widest text-[#A98336] uppercase">
          OUR STORY & PHILOSOPHY
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#282522]">
          เรื่องราวและเจตนารมณ์ &ldquo;สุพรภา (Suphonpha)&rdquo;
        </h1>
        <p className="text-sm sm:text-base text-[#5C5852] font-light max-w-2xl mx-auto leading-relaxed">
          ผสานคุณค่าแห่งพุทธศิลป์ ความเชื่อ และเครื่องประดับร่วมสมัย เข้ากับความโปร่งใสในยุคดิจิทัล
        </p>
      </div>

      {/* Brand Image Banner */}
      <div className="relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden bg-[#F3EFEA] border border-[#E6E1D8] shadow-sm">
        <Image
          src="/images/drive/550047.jpg"
          alt="สุพรภา Suphonpha Authentic Spiritual Jewelry"
          fill
          className="object-contain p-4"
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
          ร้าน &ldquo;สุพรภา&rdquo; ยึดถือนโยบายไม่กล่าวอ้างสรรพคุณปาฏิหาริย์หรือรับประกันผลทางวัตถุหรือโชคลาภที่ไม่สามารถยืนยันได้ตามกฎหมายคุ้มครองผู้บริโภค หากรายการใดไม่มีข้อมูลพิธีหรือผู้จัดสร้างอย่างเป็นทางการ ระบบจะระบุว่า <strong>&ldquo;รอข้อมูลจากผู้ดูแล&rdquo;</strong> เสมอ เพื่อให้ลูกค้าได้รับข้อมูลตามข้อเท็จจริงสูงสุด
        </p>
      </div>

      {/* Contact & Support */}
      <div className="p-8 bg-white rounded-3xl border border-[#E6E1D8] space-y-8">
        <div className="border-b border-[#E6E1D8] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-xl font-medium text-[#282522]">ข้อมูลนิติบุคคลและช่องทางติดต่อ</h3>
            <p className="text-xs text-[#8E8A83] mt-0.5">โปร่งใส ตรวจสอบได้ตามกฎหมายและระเบียบพาณิชย์อิเล็กทรอนิกส์</p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8EFEA] text-[#344537] rounded-full text-xs font-medium">
            <Building2 className="w-3.5 h-3.5" />
            <span>เลขนิติบุคคล: 0105569013597</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#5C5852]">
          {/* Left Column: Direct Contacts */}
          <div className="space-y-5">
            <h4 className="font-semibold text-sm text-[#282522] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#A98336]" />
              ช่องทางติดต่อสอบถาม & บริการลูกค้า
            </h4>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#4A5D4E] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#282522] block font-medium">เบอร์โทรศัพท์สายตรง</strong>
                <a href="tel:0653062263" className="text-sm font-semibold text-[#4A5D4E] hover:underline">
                  065-306-2263
                </a>
                <span className="text-[11px] text-gray-400 block mt-0.5">ฝ่ายบริการลูกค้าและประสานงานจัดส่ง</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#4A5D4E] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#282522] block font-medium">อีเมลฝ่ายบริการลูกค้า</strong>
                <a href="mailto:contact@suphonpha.com" className="text-gray-700 hover:underline">
                  contact@suphonpha.com
                </a>
                <span className="text-[11px] text-gray-400 block mt-0.5">ตอบกลับภายใน 24 ชั่วโมงทำการ</span>
              </div>
            </div>
          </div>

          {/* Right Column: Company Address & Bank Account */}
          <div className="space-y-5">
            <h4 className="font-semibold text-sm text-[#282522] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#A98336]" />
              ที่ตั้งสำนักงานจดทะเบียน (Location)
            </h4>

            <div className="p-4 bg-[#F7F4EE] rounded-2xl border border-[#E6E1D8] space-y-2">
              <div className="font-semibold text-[#282522]">บริษัท สุพรภา จำกัด</div>
              <p className="text-xs text-[#5C5852] leading-relaxed">
                เลขที่ 25 ซอยริมทางด่วน 2 แขวงพระโขนงใต้ เขตพระโขนง กรุงเทพมหานคร 10260
              </p>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97+%E0%B8%AA%E0%B8%B8%E0%B8%9E%E0%B8%A3%E0%B8%A0%E0%B8%B2+%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94+%E0%B9%80%E0%B8%A5%E0%B8%82%E0%B8%97%E0%B8%B5%E0%B9%88+25+%E0%B8%8b%E0%B8%AD%E0%B8%A2%E0%B8%A3%E0%B8%B4%E0%B8%A1%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%94%E0%B9%88%E0%B8%A7%E0%B8%99+2+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%82%E0%B8%99%E0%B8%87%E0%B9%83%E0%B8%95%E0%B9%89+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%82%E0%B8%99%E0%B8%87+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%87%E0%B8%84%E0%B8%A5+10260"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D8D1C7] hover:border-[#4A5D4E] text-[#4A5D4E] rounded-lg text-xs font-medium transition-colors shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>เปิดดูแผนที่ Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              </div>
            </div>

            {/* Official Bank Account for Verification */}
            <div className="p-4 bg-[#F9F4E8] rounded-2xl border border-[#C6A052]/30 space-y-2">
              <h5 className="font-semibold text-xs text-[#282522] flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#A98336]" />
                บัญชีธนาคารทางการของนิติบุคคล
              </h5>
              <div className="text-xs space-y-1 text-[#5C5852]">
                <p>ธนาคาร: <strong className="text-[#282522]">ธนาคารกสิกรไทย สาขาสุขุมวิท 101</strong></p>
                <p>เลขที่บัญชี: <strong className="text-[#4A5D4E] font-mono text-sm tracking-wider">237-8-02627-2</strong></p>
                <p>ชื่อบัญชี: <strong className="text-[#282522]">บริษัท สุพรภา จำกัด</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
