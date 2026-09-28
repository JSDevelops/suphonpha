'use client';

import React, { useState } from 'react';
import Image from '@/components/SafeImage';
import { useStoreData } from '@/context/StoreDataContext';
import { CertificateModal } from '@/components/CertificateModal';
import {
  ShieldCheck,
  Search,
  Award,
  CheckCircle2,
  Calendar,
  Lock,
  QrCode,
  Sparkles,
} from 'lucide-react';

export default function CertificatePage() {
  const { certificates } = useStoreData();
  const [searchInput, setSearchInput] = useState('');
  const [activeCertCode, setActiveCertCode] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setActiveCertCode(searchInput.trim());
    setModalOpen(true);
  };

  const handleInspect = (code: string) => {
    setActiveCertCode(code);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F4E8] text-[#A98336] text-xs font-semibold border border-[#C6A052]/40">
          <Award className="w-4 h-4" />
          <span>DIGITAL CERTIFICATE VERIFICATION</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#282522]">
          ระบบตรวจสอบใบรับรองความแท้
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] font-light leading-relaxed">
          ความโปร่งใสคือหัวใจของ &ldquo;คนดวงดี 2025&rdquo; วัตถุมงคลและเครื่องประดับแทบทุกชิ้นจะได้รับรหัสประจำตัวเฉพาะองค์ ซึ่งบันทึกข้อมูลมวลสาร ขนาด และวันที่ออกบัตรในฐานข้อมูลกลาง เพื่อให้คุณตรวจสอบความแท้ได้ตลอด 24 ชั่วโมง
        </p>

        {/* Search verification box */}
        <form onSubmit={handleSearch} className="pt-4 max-w-lg mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="กรอกรหัสบัตรรับรอง เช่น KDD-2025-00101"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#E6E1D8] rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#4A5D4E] font-mono shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#4A5D4E] hover:bg-[#37473A] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs shrink-0"
          >
            ตรวจสอบ
          </button>
        </form>
      </div>

      {/* 3 Pillars of Authenticity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-semibold text-[#282522]">
            รหัสประจำองค์เฉพาะตัว (Unique ID)
          </h3>
          <p className="text-xs text-[#5C5852] leading-relaxed">
            แต่ละชิ้นมีรหัสอ้างอิงที่ไม่ซ้ำกัน ไม่สามารถโอนถ่ายหรือปลอมแปลงข้อมูลได้
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#F9F4E8] text-[#C6A052] flex items-center justify-center">
            <QrCode className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-semibold text-[#282522]">
            สแกนรวดเร็วผ่าน QR Code
          </h3>
          <p className="text-xs text-[#5C5852] leading-relaxed">
            เพียงใช้กล้องสมาร์ตโฟนสแกน QR Code บนการ์ดรับรอง ระบบจะเปิดหน้าข้อมูลบัตรรับรองทันที
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-semibold text-[#282522]">
            บันทึกประวัติการตรวจสอบย้อนกลับ
          </h3>
          <p className="text-xs text-[#5C5852] leading-relaxed">
            ระบุวันเวลาที่ออกบัตรและบันทึกสถิติการตรวจสอบเพื่อความมั่นใจในมาตรฐานสูงสุด
          </p>
        </div>
      </div>

      {/* List of Active Certificates currently in database */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#282522]">
              รายการบัตรรับรองตัวอย่างในระบบ
            </h2>
            <p className="text-xs text-gray-500">คลิกที่บัตรเพื่อดูใบรับรองดิจิทัลฉบับเต็ม</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => handleInspect(cert.certNumber)}
              className="cursor-pointer group bg-white rounded-2xl border border-[#E6E1D8] overflow-hidden hover:border-[#C6A052] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="p-4 space-y-3">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F7F4EE]">
                  <Image
                    src={cert.image}
                    alt={cert.productName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/95 text-[#4A5D4E] border border-gray-200">
                    {cert.certNumber}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-xs font-semibold text-[#282522] line-clamp-2 group-hover:text-[#4A5D4E] transition-colors">
                    {cert.productName}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> ออกบัตร: {cert.issuedDate}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#F7F4EE] border-t border-[#E6E1D8] flex items-center justify-between text-[11px]">
                <span className="text-green-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> รับรองแล้ว
                </span>
                <span className="text-[#C6A052] font-medium group-hover:underline">
                  เปิดดูใบรับรอง &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCode={activeCertCode}
      />
    </div>
  );
}
