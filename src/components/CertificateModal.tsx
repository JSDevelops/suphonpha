'use client';

import React, { useState } from 'react';
import Image from '@/components/SafeImage';
import { useStoreData } from '@/context/StoreDataContext';
import { Certificate } from '@/types';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Search, QrCode, Calendar, Award } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export function CertificateModal({ isOpen, onClose, initialCode = '' }: CertificateModalProps) {
  const { verifyCertificate, certificates } = useStoreData();
  const [searchCode, setSearchCode] = useState(initialCode);
  const [result, setResult] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (codeToTest?: string) => {
    const query = codeToTest || searchCode;
    if (!query.trim()) return;
    const cert = verifyCertificate(query);
    setResult(cert);
    setSearched(true);
  };

  const handleSelectSample = (sampleCode: string) => {
    setSearchCode(sampleCode);
    handleVerify(sampleCode);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-[#FDFBF8] rounded-2xl shadow-2xl border border-[#C6A052]/40 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#4A5D4E] text-white p-6 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C6A052]/20 border border-[#C6A052]/50 flex items-center justify-center text-[#C6A052]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-white tracking-wide">
                ตรวจสอบใบรับรองความแท้ (Digital Certificate)
              </h3>
              <p className="text-xs text-white/80 font-light">
                ระบบตรวจสอบย้อนกลับมาตรฐานความโปร่งใส &ldquo;สุพรภา (Suphonpha)&rdquo;
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input & Sample quick pills */}
        <div className="p-6 border-b border-[#E6E1D8] bg-[#F7F4EE]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="กรอกรหัสบัตรรับรอง เช่น KDD-2025-00101..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E6E1D8] rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#4A5D4E] shadow-2xs font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#4A5D4E] hover:bg-[#37473A] text-white text-xs sm:text-sm font-medium rounded-xl transition-colors shadow-xs"
            >
              ตรวจสอบ
            </button>
          </form>

          {/* Quick select sample certs */}
          <div className="mt-3 flex items-center gap-2 text-xs flex-wrap">
            <span className="text-gray-500">ทดสอบคลิกรหัสตัวอย่าง:</span>
            {certificates.slice(0, 3).map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectSample(c.certNumber)}
                className="px-2 py-0.5 bg-white hover:bg-[#E8EFEA] border border-[#E6E1D8] rounded-md font-mono text-[11px] text-[#4A5D4E] transition-colors"
              >
                {c.certNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {result ? (
            <div className="relative bg-white rounded-xl border-2 border-[#C6A052]/50 p-6 shadow-sm overflow-hidden">
              {/* Decorative Corner Borders */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C6A052]" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C6A052]" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C6A052]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C6A052]" />

              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E6E1D8]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F9F4E8] border border-[#C6A052] flex items-center justify-center text-[#C6A052]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest text-[#8E8A83] uppercase block font-semibold">
                      OFFICIAL AUTHENTICITY CERTIFICATE
                    </span>
                    <h4 className="font-serif text-base font-semibold text-[#282522]">
                      ใบรับรองวัตถุมงคลแท้ ประจำองค์
                    </h4>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  {result.status === 'active' ? 'รับรองความถูกต้อง (VALID)' : 'ระงับการใช้งาน'}
                </span>
              </div>

              {/* Body Content */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                {/* Product Image */}
                <div className="sm:col-span-1">
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-[#E6E1D8] bg-[#F7F4EE]">
                    <Image
                      src={result.image}
                      alt={result.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 p-2 bg-[#F7F4EE] rounded-lg text-center border border-[#E6E1D8]">
                    <QrCode className="w-6 h-6 mx-auto text-[#4A5D4E] mb-1" />
                    <span className="text-[10px] font-mono text-gray-500 block">QR รหัสประจำองค์</span>
                    <span className="text-xs font-mono font-bold text-[#4A5D4E]">{result.certNumber}</span>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="sm:col-span-2 space-y-3.5 text-xs text-[#5C5852]">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">ชื่อวัตถุมงคล</span>
                    <p className="font-serif text-sm font-semibold text-[#282522] mt-0.5">
                      {result.productName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-[10px] text-gray-400 block">ขนาดทางกายภาพ</span>
                      <p className="font-medium text-[#282522] mt-0.5">{result.dimensions}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">วันที่ออกใบรับรอง</span>
                      <p className="font-medium text-[#282522] mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {result.issuedDate}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 block">รายละเอียดมวลสารและวัสดุ</span>
                    <p className="font-medium text-[#282522] mt-0.5">{result.materialDetails}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 block">ข้อมูลพิธีและผู้จัดสร้าง</span>
                    <p className="font-medium text-[#282522] mt-0.5">
                      {result.blessingMaster === 'รอข้อมูลจากผู้ดูแล' ? (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[11px]">
                          รอข้อมูลจากผู้ดูแล
                        </span>
                      ) : (
                        result.blessingMaster
                      )}
                    </p>
                  </div>

                  {result.notes && (
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-[10px] text-gray-400 block">บันทึกการตรวจสอบคุณภาพ</span>
                      <p className="italic text-gray-600 mt-0.5">{result.notes}</p>
                    </div>
                  )}

                  <div className="pt-2 text-[10px] text-gray-400">
                    มีการตรวจสอบใบรับรองนี้แล้ว {result.verificationCount} ครั้ง
                  </div>
                </div>
              </div>

              {/* Official Disclaimer Footer */}
              <div className="mt-6 pt-4 border-t border-[#E6E1D8] text-[10px] text-gray-400 leading-relaxed text-center">
                * ใบรับรองดิจิทัลนี้ออกโดยระบบกลางของ สุพรภา (Suphonpha) เพื่อยืนยันความแท้ของมวลสารและฝีมือเชิงช่าง วัตถุมงคลทุกชิ้นเป็นเครื่องยึดเหนี่ยวจิตใจและความเชื่อส่วนบุคคล ไม่มีการรับประกันผลลัพธ์เชิงพาณิชย์ใดๆ
              </div>
            </div>
          ) : searched ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-base font-semibold text-gray-800">
                ไม่พบข้อมูลรหัสใบรับรอง &ldquo;{searchCode}&rdquo;
              </h4>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                โปรดตรวจสอบตัวอักษรและตัวเลขบนการ์ดรับรองอีกครั้ง หรือติดต่อแอดมินเพื่อขอความช่วยเหลือ
              </p>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500 text-xs">
              <ShieldCheck className="w-12 h-12 mx-auto text-[#C6A052] mb-3 opacity-60" />
              <p>กรอกรหัสบัตรรับรอง หรือเลือกรหัสตัวอย่างด้านบนเพื่อเริ่มตรวจสอบ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
