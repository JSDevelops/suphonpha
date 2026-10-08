import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Cookie,
  FileText,
  UserCheck,
  Server,
  RefreshCw,
  Mail,
  Phone,
  Building,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว คุกกี้ และความปลอดภัยข้อมูลส่วนบุคคล (PDPA) | สุพรภา suphonpha',
  description:
    'นโยบายการคุ้มครองข้อมูลส่วนบุคคล (PDPA) นโยบายการใช้คุกกี้ และมาตรการความปลอดภัยข้อมูลของ สุพรภา (Suphonpha) บริษัท สุพรภา จำกัด ความโปร่งใสในการจัดเก็บและดูแลข้อมูลลูกค้า',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="space-y-2">
        <span className="text-xs font-semibold tracking-widest text-[#A98336] uppercase">
          LEGAL, PRIVACY & COOKIES
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#282522]">
          นโยบายความเป็นส่วนตัว คุกกี้ และความปลอดภัยข้อมูลส่วนบุคคล
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852]">
          ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) | อัปเดตล่าสุด: ตุลาคม 2026
        </p>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-[#E6E1D8] shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-xs text-[#282522]">มาตรฐาน PDPA ครบถ้วน</h4>
            <p className="text-[11px] text-gray-500">คุ้มครองสิทธิเจ้าของข้อมูล 100%</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#E6E1D8] shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF4E6] text-[#A98336] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-xs text-[#282522]">ความปลอดภัยระดับสูง</h4>
            <p className="text-[11px] text-gray-500">SSL/TLS เข้ารหัสข้อมูล 256-Bit</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#E6E1D8] shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-xs text-[#282522]">โปร่งใสด้านคุกกี้</h4>
            <p className="text-[11px] text-gray-500">ผู้ใช้สามารถเลือกปรับแต่งได้</p>
          </div>
        </div>
      </div>

      {/* Policy Content Card */}
      <div className="p-6 sm:p-10 bg-white rounded-3xl border border-[#E6E1D8] space-y-8 text-xs sm:text-sm text-[#5C5852] leading-relaxed shadow-xs">
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="w-6 h-6 rounded-full bg-[#4A5D4E] text-white text-xs flex items-center justify-center font-semibold">
              1
            </span>
            <h2 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
              บทนำและเจตนารมณ์ความโปร่งใส
            </h2>
          </div>
          <p>
            เว็บไซต์ <strong>&ldquo;สุพรภา (Suphonpha)&rdquo;</strong> ดำเนินงานโดย <strong>บริษัท สุพรภา จำกัด</strong> (เลขทะเบียนนิติบุคคล: 0105569013597) ให้ความสำคัญสูงสุดในการคุ้มครองข้อมูลส่วนบุคคลของลูกค้าและผู้เข้าชมเว็บไซต์ นโยบายฉบับนี้จัดทำขึ้นตาม <strong>พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (Personal Data Protection Act: PDPA)</strong> เพื่อชี้แจงอย่างเปิดเผยและโปร่งใสเกี่ยวกับประเภทข้อมูลที่เราจัดเก็บ วัตถุประสงค์ การใช้งาน การดูแลรักษาความปลอดภัย และสิทธิอันชอบธรรมของท่าน
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="w-6 h-6 rounded-full bg-[#4A5D4E] text-white text-xs flex items-center justify-center font-semibold">
              2
            </span>
            <h2 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
              ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม
            </h2>
          </div>
          <p>
            ทางร้านเก็บรวบรวมข้อมูลส่วนบุคคลเฉพาะที่จำเป็นสำหรับการให้บริการสั่งซื้อ จัดส่งพัสดุ และการออกใบรับรองดิจิทัล ได้แก่:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] space-y-1">
              <h4 className="font-semibold text-xs text-[#282522]">ข้อมูลสำหรับการจัดส่ง (Shipping Data)</h4>
              <p className="text-[11px] text-gray-600">
                ชื่อ-นามสกุลผู้รับ, ที่อยู่จัดส่งพัสดุ, หมายเลขโทรศัพท์ และอีเมลสำหรับแจ้งรหัสพัสดุ
              </p>
            </div>
            <div className="p-3.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] space-y-1">
              <h4 className="font-semibold text-xs text-[#282522]">ข้อมูลคำสั่งซื้อและการชำระเงิน (Order & Payment)</h4>
              <p className="text-[11px] text-gray-600">
                รายการสินค้าที่สั่งซื้อ, ยอดเงินสุทธิ, วันที่เวลาสั่งซื้อ และไฟล์ภาพสลิปหลักฐานการโอนเงิน
              </p>
            </div>
            <div className="p-3.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] space-y-1">
              <h4 className="font-semibold text-xs text-[#282522]">ข้อมูลบัตรรับรองดิจิทัล (Digital Certificate)</h4>
              <p className="text-[11px] text-gray-600">
                รหัสรับรองวัตถุมงคล (เช่น KDD-2025-XXXXX) ประวัติมวลสาร และวันที่ออกใบรับรองความแท้
              </p>
            </div>
            <div className="p-3.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] space-y-1">
              <h4 className="font-semibold text-xs text-[#282522]">ข้อมูลการสั่งสร้างวัตถุมงคลเฉพาะบุคคล</h4>
              <p className="text-[11px] text-gray-600">
                วันเดือนปีเกิด (ถ้ามีสำหรับผูกดวง), มวลสารที่ต้องการ และรายละเอียดข้อความสั่งทำ
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="w-6 h-6 rounded-full bg-[#4A5D4E] text-white text-xs flex items-center justify-center font-semibold">
              3
            </span>
            <h2 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
              นโยบายการใช้คุกกี้ (Cookie Policy)
            </h2>
          </div>
          <p>
            คุกกี้ (Cookies) คือไฟล์ข้อความขนาดเล็กที่ถูกบันทึกลงบนอุปกรณ์ของท่านเมื่อเข้าชมเว็บไซต์ เพื่อช่วยให้ระบบจดจำการใช้งานและเพิ่มความสะดวกสบาย โดยเราจำแนกคุกกี้ออกเป็น 3 ประเภท:
          </p>
          <div className="space-y-2.5 pt-1">
            <div className="p-3.5 bg-white rounded-xl border border-[#E6E1D8] flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#4A5D4E] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#282522] block">1. คุกกี้ที่จำเป็นอย่างยิ่ง (Strictly Necessary Cookies)</strong>
                <span className="text-gray-600 text-xs">
                  จำเป็นต่อการทำงานหลักของระบบ เช่น การจดจำสินค้าในตะกร้าช้อปปิ้ง เซสชันของคำสั่งซื้อ และระบบความปลอดภัย หากไม่มีคุกกี้นี้ เว็บไซต์จะไม่สามารถให้บริการได้อย่างถูกต้อง (ไม่สามารถปิดการใช้งานได้)
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-[#E6E1D8] flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#A98336] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#282522] block">2. คุกกี้เพื่อประสิทธิภาพและการวิเคราะห์ (Analytics Cookies)</strong>
                <span className="text-gray-600 text-xs">
                  ช่วยให้เราทราบจำนวนผู้เข้าชม หน้าเว็บที่ได้รับความนิยม และความเร็วในการโหลด โดยข้อมูลที่เก็บรวบรวมเป็นข้อมูลสถิติรวมที่ไม่สามารถระบุตัวตนของผู้ใช้งานได้ (Non-Personally Identifiable Information)
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-[#E6E1D8] flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#282522] block">3. คุกกี้เพื่อการทำงานของฟังก์ชัน (Functional Cookies)</strong>
                <span className="text-gray-600 text-xs">
                  จดจำตัวเลือกของท่าน เช่น รหัสใบรับรองที่ดูล่าสุด หรือสถานะการยินยอมคุกกี้ เพื่อให้ท่านไม่ต้องตั้งค่าใหม่เมื่อกลับมาเยือนอีกครั้ง
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 pt-1">
            * ท่านสามารถลบหรือปฏิเสธคุกกี้ได้ผ่านการตั้งค่าในบราวเซอร์ของท่าน (Chrome, Safari, Edge, Firefox) หรือผ่านแบนเนอร์ตั้งค่าคุกกี้ที่ปรากฏบนเว็บไซต์ของเรา
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="w-6 h-6 rounded-full bg-[#4A5D4E] text-white text-xs flex items-center justify-center font-semibold">
              4
            </span>
            <h2 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
              มาตรการรักษาความปลอดภัยข้อมูลส่วนบุคคล (Data Security)
            </h2>
          </div>
          <p>
            ทางร้านมีมาตรการความปลอดภัยทางเทคนิคและการบริหารจัดการที่เข้มงวดเพื่อป้องกันไม่ให้ข้อมูลสูญหาย ถูกเข้าถึงโดยมิชอบ หรือถูกทำลาย:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs sm:text-sm">
            <li>
              <strong>การเข้ารหัส HTTPS (SSL/TLS 256-Bit):</strong> ทุกการเชื่อมต่อและการส่งข้อมูลระหว่างบราวเซอร์ของท่านกับเซิร์ฟเวอร์ได้รับการเข้ารหัสอย่างปลอดภัยสูงสุด
            </li>
            <li>
              <strong>การจำกัดสิทธิ์การเข้าถึงข้อมูล (Role-Based Access Control):</strong> เฉพาะเจ้าหน้าที่และแอดมินที่ได้รับมอบหมายเท่านั้นที่สามารถตรวจสอบสลิปและข้อมูลที่อยู่จัดส่งได้
            </li>
            <li>
              <strong>นโยบายไม่ขายและไม่เปิดเผยข้อมูล (Strict Non-Disclosure):</strong> เราไม่มีนโยบายจำหน่าย แลกเปลี่ยน หรือส่งต่อข้อมูลส่วนบุคคลของท่านให้แก่บริษัทโฆษณาภายนอกโดยเด็ดขาด
            </li>
            <li>
              <strong>การจัดเก็บไฟล์สลิปและหลักฐานการโอน:</strong> ไฟล์สลิปถูกจัดเก็บในระบบที่ปลอดภัยเพื่อใช้เฉพาะในการตรวจสอบยอดชำระเงินและออกใบเสร็จเท่านั้น
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="w-6 h-6 rounded-full bg-[#4A5D4E] text-white text-xs flex items-center justify-center font-semibold">
              5
            </span>
            <h2 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
              สิทธิของเจ้าของข้อมูลส่วนบุคคลตาม PDPA
            </h2>
          </div>
          <p>ท่านในฐานะเจ้าของข้อมูลส่วนบุคคลมีสิทธิตามกฎหมายดังต่อไปนี้:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
            <div className="p-3 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8]">
              <strong>• สิทธิขอเข้าถึงและรับสำเนาข้อมูล</strong> ของตนเองที่อยู่ในความรับผิดชอบของเรา
            </div>
            <div className="p-3 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8]">
              <strong>• สิทธิขอให้แก้ไขข้อมูล</strong> ให้ถูกต้อง เป็นปัจจุบัน และสมบูรณ์
            </div>
            <div className="p-3 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8]">
              <strong>• สิทธิขอให้ลบหรือทำลายข้อมูล</strong> เมื่อพ้นความจำเป็นตามกฎหมาย
            </div>
            <div className="p-3 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8]">
              <strong>• สิทธิเพิกถอนความยินยอม</strong> ในการประมวลผลข้อมูลส่วนบุคคลเมื่อใดก็ได้
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <span className="w-6 h-6 rounded-full bg-[#4A5D4E] text-white text-xs flex items-center justify-center font-semibold">
              6
            </span>
            <h2 className="font-serif text-base sm:text-lg font-semibold text-[#282522]">
              ช่องทางการติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO Contact)
            </h2>
          </div>
          <p>
            หากท่านมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัว การใช้คุกกี้ หรือต้องการใช้สิทธิตามกฎหมาย PDPA สามารถติดต่อเราได้ที่:
          </p>
          <div className="p-5 bg-[#F7F4EE] rounded-2xl border border-[#E6E1D8] space-y-2 text-xs text-[#282522]">
            <p className="font-bold text-sm text-[#4A5D4E]">บริษัท สุพรภา จำกัด (Suphonpha Co., Ltd.)</p>
            <p><strong>เลขประจำตัวผู้เสียภาษี / เลขทะเบียนนิติบุคคล:</strong> 0105569013597</p>
            <p><strong>สถานที่ติดต่อ:</strong> เลขที่ 25 ซอยริมทางด่วน 2 แขวงพระโขนงใต้ เขตพระโขนง กรุงเทพมหานคร 10260</p>
            <p className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="flex items-center gap-1 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#4A5D4E]" /> 065-306-2263
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                <Mail className="w-3.5 h-3.5 text-[#4A5D4E]" /> contact@suphonpha.com
              </span>
            </p>
          </div>
        </section>
      </div>

      {/* Helpful Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-[#E6E1D8] text-xs">
        <div>
          <h4 className="font-semibold text-sm text-[#282522]">ต้องการศึกษาข้อมูลเพิ่มเติม?</h4>
          <p className="text-gray-500">ดูขั้นตอนการสั่งซื้อ ตรวจสอบบัตรรับรอง หรือข้อกำหนดการใช้งาน</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/user-guide"
            className="px-4 py-2 bg-[#4A5D4E] hover:bg-[#37473A] text-white font-medium rounded-xl transition-colors shadow-2xs"
          >
            คู่มือการใช้เว็บไซต์
          </Link>
          <Link
            href="/terms"
            className="px-4 py-2 bg-[#F7F4EE] hover:bg-[#EAE4D7] text-[#4A5D4E] border border-[#E6E1D8] font-medium rounded-xl transition-colors"
          >
            ข้อกำหนดการสั่งซื้อ
          </Link>
        </div>
      </div>
    </div>
  );
}
