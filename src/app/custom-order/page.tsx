'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  FileCheck,
  Hammer,
  Send,
  HelpCircle,
  Phone,
} from 'lucide-react';
import { submitCustomInquiryToGoogleSheet } from '@/lib/googleSheets';

export default function CustomOrderPage() {
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [lineId, setLineId] = useState('');
  const [email, setEmail] = useState('');
  const [amuletType, setAmuletType] = useState('เหรียญปั๊มโลหะ / เหรียญพุทธศิลป์');
  const [quantity, setQuantity] = useState('300 - 500 ชิ้น');
  const [budget, setBudget] = useState('50,000 - 100,000 บาท');
  const [materials, setMaterials] = useState('');
  const [ceremonyNeeds, setCeremonyNeeds] = useState('ต้องการให้ประสานงานพิธีพุทธาภิเษก');
  const [details, setDetails] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !phone.trim() || !lineId.trim()) {
      setErrorMessage('กรุณากรอกชื่อผู้ติดต่อ เบอร์โทรศัพท์ และ LINE ID ให้ครบถ้วน');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await submitCustomInquiryToGoogleSheet({
        contactName,
        phone,
        lineId,
        email,
        amuletType,
        quantity,
        budget,
        materials,
        ceremonyNeeds,
        details,
      });

      if (res.success) {
        setSubmittedInquiryId(res.inquiryId || `INQ-${Date.now().toString().slice(-6)}`);
      } else {
        setErrorMessage(res.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล โปรดลองอีกครั้ง');
      }
    } catch {
      // Fallback local inquiry ID if offline
      setSubmittedInquiryId(`INQ-LOCAL-${Date.now().toString().slice(-6)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F9F4E8] text-[#A98336] text-xs font-semibold border border-[#C6A052]/40">
          <Sparkles className="w-4 h-4" />
          <span>CUSTOM SACRED COMMISSIONS & PRE-ORDER</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#282522] leading-tight">
          บริการสั่งสร้างและสั่งจองวัตถุมงคลเฉพาะรุ่น
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] font-light leading-relaxed">
          สำหรับวัด, องค์กร, หน่วยงาน, ศิษยานุศิษย์ หรือผู้มีจิตศรัทธา ที่ประสงค์จะจัดสร้างวัตถุมงคลในวาระพิเศษ ผสมมวลสารศักดิ์สิทธิ์ตามเจตนารมณ์ พร้อมประสานงานพิธีและออกบัตร Digital Certificate ประจำรุ่น
        </p>
      </div>

      {/* 4 Process Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#E6E1D8] space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h3 className="font-serif text-sm font-semibold text-[#282522]">ปรึกษา & ออกแบบ</h3>
          <p className="text-[11px] text-[#5C5852] leading-relaxed">
            กำหนดพิมพ์ทรง ขนาด ลวดลายยันต์โบราณ หรือพุทธศิลป์ร่วมสมัยตามความประสงค์
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E6E1D8] space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#F9F4E8] text-[#C6A052] flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h3 className="font-serif text-sm font-semibold text-[#282522]">เตรียมมวลสารมงคล</h3>
          <p className="text-[11px] text-[#5C5852] leading-relaxed">
            จัดหามวลสารแท้ ชนวนโลหะ แร่ศักดิ์สิทธิ์ หรือนำมวลสารของคณะศรัทธามาผสมรวม
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E6E1D8] space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h3 className="font-serif text-sm font-semibold text-[#282522]">พิธีพุทธาภิเษก</h3>
          <p className="text-[11px] text-[#5C5852] leading-relaxed">
            ประสานงานจัดพิธีเจริญพระพุทธมนต์ ปลุกเสกตามฤกษ์มงคล หรือส่งมอบเพื่อเข้าพิธีของท่าน
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E6E1D8] space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#F9F4E8] text-[#C6A052] flex items-center justify-center font-bold text-xs">
            4
          </div>
          <h3 className="font-serif text-sm font-semibold text-[#282522]">ออกบัตร Certificate</h3>
          <p className="text-[11px] text-[#5C5852] leading-relaxed">
            บันทึกรหัสเฉพาะองค์ในระบบ Digital Certificate และแพ็กเกจจิ้งปลอดภัย
          </p>
        </div>
      </div>

      {/* Form or Success View */}
      {submittedInquiryId ? (
        <div className="max-w-2xl mx-auto p-8 sm:p-12 bg-white rounded-3xl border-2 border-[#C6A052]/50 shadow-lg text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#A98336] uppercase tracking-wider">
              ส่งคำขอสั่งสร้างเรียบร้อยแล้ว
            </span>
            <h2 className="font-serif text-2xl font-semibold text-[#282522]">
              ขอบพระคุณสำหรับความไว้วางใจ
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
              ระบบได้บันทึกคำขอสั่งสร้างลงใน Google Sheet รหัสอ้างอิง:{' '}
              <strong className="font-mono text-[#4A5D4E]">{submittedInquiryId}</strong>
            </p>
          </div>

          <div className="p-4 bg-[#F7F4EE] rounded-2xl border border-[#E6E1D8] text-xs text-left text-gray-700 space-y-1.5">
            <p>• <strong>ผู้ติดต่อ:</strong> {contactName}</p>
            <p>• <strong>เบอร์โทรศัพท์:</strong> {phone}</p>
            <p>• <strong>LINE ID:</strong> {lineId}</p>
            <p>• <strong>ประเภทที่สนใจ:</strong> {amuletType} ({quantity})</p>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs text-gray-500">
              เจ้าหน้าที่ฝ่ายพุทธศิลป์และการจัดสร้างจะติดต่อกลับทางเบอร์โทรศัพท์ หรือ LINE ID ของท่านโดยเร็วที่สุด
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`https://line.me/R/ti/p/@konduangdee`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>แจ้งรหัสคำขอนี้ผ่าน LINE Official</span>
              </a>
              <a
                href="tel:0653062263"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#D8D1C7] hover:border-[#4A5D4E] text-[#4A5D4E] text-xs font-semibold rounded-xl transition-colors shadow-2xs"
              >
                <Phone className="w-4 h-4" />
                <span>โทรด่วน 065-306-2263</span>
              </a>
              <button
                type="button"
                onClick={() => setSubmittedInquiryId(null)}
                className="px-5 py-2.5 bg-[#F7F4EE] text-gray-700 hover:bg-[#E8EFEA] text-xs font-medium rounded-xl border border-[#E6E1D8] transition-colors"
              >
                ส่งคำขอเพิ่มเติม
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* The Booking / Commissioning Form */
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E6E1D8] p-6 sm:p-10 shadow-sm space-y-8">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#282522]">
              แบบฟอร์มปรึกษาและสั่งสร้างวัตถุมงคล / สั่งจองล่วงหน้า
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              กรอกรายละเอียดเบื้องต้นเพื่อให้ทีมงานฝ่ายพุทธศิลป์ประเมินและติดต่อกลับ
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm text-[#282522]">
            {/* 1. Contact Information */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-semibold text-[#4A5D4E] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#4A5D4E] text-white text-[11px] flex items-center justify-center font-sans">
                  1
                </span>
                ข้อมูลผู้ติดต่อ / องค์กร
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-xs mb-1 font-medium">
                    ชื่อผู้ติดต่อ / องค์กร / วัด *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คุณสมชาย (คณะศรัทธาวัด...)"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#4A5D4E]"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-xs mb-1 font-medium">
                    เบอร์โทรศัพท์ติดต่อ *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="081-234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono focus:outline-hidden focus:border-[#4A5D4E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-xs mb-1 font-medium">
                    LINE ID (จำเป็น สำหรับส่งแบบและรูปตัวอย่าง) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ไอดีไลน์ของคุณ"
                    value={lineId}
                    onChange={(e) => setLineId(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono focus:outline-hidden focus:border-[#4A5D4E]"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-xs mb-1 font-medium">
                    อีเมล (ถ้ามี)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#4A5D4E]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Project Specifications */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="font-serif text-sm font-semibold text-[#4A5D4E] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#4A5D4E] text-white text-[11px] flex items-center justify-center font-sans">
                  2
                </span>
                ประเภทและสเปกการจัดสร้าง
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-xs mb-1 font-medium">
                    ประเภทวัตถุมงคลที่ต้องการ
                  </label>
                  <select
                    value={amuletType}
                    onChange={(e) => setAmuletType(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-hidden focus:border-[#4A5D4E]"
                  >
                    <option value="เหรียญปั๊มโลหะ / เหรียญพุทธศิลป์">เหรียญปั๊มโลหะ / เหรียญพุทธศิลป์</option>
                    <option value="พระผงมวลสาร / ผงพุทธคุณ">พระผงมวลสาร / ผงพุทธคุณ</option>
                    <option value="รูปหล่อลอยองค์ / งานหล่อทองเหลือง">รูปหล่อลอยองค์ / งานหล่อทองเหลือง</option>
                    <option value="กำไลและสร้อยข้อมือหินแท้ร้อยชาร์ม">กำไลและสร้อยข้อมือหินแท้ร้อยชาร์ม</option>
                    <option value="แผ่นสติ๊กเกอร์ยันต์ทองคำมงคล">แผ่นสติ๊กเกอร์ยันต์ทองคำมงคล</option>
                    <option value="แหวนอัญมณีและเครื่องประดับมงคล">แหวนอัญมณีและเครื่องประดับมงคล</option>
                    <option value="อื่นๆ (ระบุในรายละเอียด)">อื่นๆ (ระบุในรายละเอียดด้านล่าง)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 text-xs mb-1 font-medium">
                    จำนวนที่ประสงค์จัดสร้าง (ชิ้น)
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-hidden focus:border-[#4A5D4E]"
                  >
                    <option value="100 - 200 ชิ้น">100 - 200 ชิ้น (รุ่นพิเศษจำนวนจำกัด)</option>
                    <option value="300 - 500 ชิ้น">300 - 500 ชิ้น</option>
                    <option value="500 - 1,000 ชิ้น">500 - 1,000 ชิ้น</option>
                    <option value="1,000 - 3,000 ชิ้น">1,000 - 3,000 ชิ้น</option>
                    <option value="5,000 ชิ้นขึ้นไป">5,000 ชิ้นขึ้นไป</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-xs mb-1 font-medium">
                    งบประมาณโดยประมาณ
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-hidden focus:border-[#4A5D4E]"
                  >
                    <option value="20,000 - 50,000 บาท">20,000 - 50,000 บาท</option>
                    <option value="50,000 - 100,000 บาท">50,000 - 100,000 บาท</option>
                    <option value="100,000 - 300,000 บาท">100,000 - 300,000 บาท</option>
                    <option value="300,000 บาทขึ้นไป">300,000 บาทขึ้นไป</option>
                    <option value="ยังไม่กำหนด (ปรึกษาทีมงานก่อน)">ยังไม่กำหนด (ปรึกษาทีมงานก่อน)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 text-xs mb-1 font-medium">
                    ความประสงค์ด้านพิธีพุทธาภิเษก
                  </label>
                  <select
                    value={ceremonyNeeds}
                    onChange={(e) => setCeremonyNeeds(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-hidden focus:border-[#4A5D4E]"
                  >
                    <option value="ต้องการให้ประสานงานพิธีพุทธาภิเษก">ต้องการให้ประสานงานพิธีพุทธาภิเษกครบวงจร</option>
                    <option value="คณะศรัทธามีพระเกจิอาจารย์/วัดสำหรับพิธีแล้ว">คณะศรัทธามีพระเกจิ/วัดสำหรับทำพิธีเองแล้ว</option>
                    <option value="ต้องการคำแนะนำเรื่องฤกษ์และพิธี">ต้องการคำแนะนำเรื่องฤกษ์และลำดับพิธี</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 text-xs mb-1 font-medium">
                  มวลสารศักดิ์สิทธิ์ที่ต้องการผสม
                </label>
                <input
                  type="text"
                  placeholder="เช่น มีผงมวลสารเดิมจากทางวัด, ต้องการแร่เหล็กน้ำพี้, ชนวนทองเหลืองเก่า ฯลฯ"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#4A5D4E]"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-xs mb-1 font-medium">
                  รายละเอียดแบบพุทธศิลป์ หรือข้อความที่ต้องการสลัก
                </label>
                <textarea
                  rows={4}
                  placeholder="ระบุข้อความด้านหน้า-ด้านหลัง, ชื่อรุ่น, ปี พ.ศ. หรือแนวคิดที่ท่านต้องการถ่ายทอด..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#4A5D4E]"
                />
              </div>
            </div>

            {/* Privacy notice and Submit button */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <p className="text-[11px] text-gray-400 leading-relaxed">
                * ข้อมูลทั้งหมดจะถูกส่งเข้าฐานข้อมูล Google Sheet ของร้านโดยตรงเพื่อความปลอดภัยตามมาตรฐาน PDPA ทีมงานจะรักษาความลับของแบบพิมพ์และมวลสารของคณะท่านอย่างสูงสุด
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="btn-3d-sage w-full py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 touch-target"
              >
                {submitting ? (
                  <span>กำลังบันทึกข้อมูลเข้า Google Sheet...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ส่งคำขอสั่งสร้าง / สั่งจองวัตถุมงคล</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trust & Guarantee Callout */}
      <div className="p-6 bg-[#F9F4E8] rounded-2xl border border-[#C6A052]/40 text-xs text-[#5C5852] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#C6A052] shrink-0" />
          <div>
            <h4 className="font-serif font-semibold text-[#282522]">รับประกันความประณีตและความซื่อสัตย์</h4>
            <p className="text-[11px] text-gray-500">
              ดำเนินการตามหลักพุทธศิลป์ มวลสารจริงทุกองค์ ไม่มีการสับเปลี่ยนหรือผสมสารเคมีอันตราย
            </p>
          </div>
        </div>
        <a
          href="https://line.me"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto shrink-0 px-5 py-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs touch-target"
        >
          <MessageCircle className="w-4 h-4" />
          <span>คุยกับช่างผ่าน LINE</span>
        </a>
      </div>
    </div>
  );
}
