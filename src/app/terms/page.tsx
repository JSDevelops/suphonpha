'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-semibold tracking-widest text-[#A98336] uppercase">
          TERMS & CONDITIONS
        </span>
        <h1 className="font-serif text-3xl font-medium text-[#282522] mt-1">
          เงื่อนไขและข้อกำหนดการให้บริการ
        </h1>
        <p className="text-xs text-gray-500 mt-1">อัปเดตล่าสุด: มกราคม 2025</p>
      </div>

      <div className="p-8 bg-white rounded-3xl border border-[#E6E1D8] space-y-6 text-xs sm:text-sm text-[#5C5852] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">
            1. สาระสำคัญด้านความเชื่อและวัตถุมงคล
          </h2>
          <p>
            วัตถุมงคล พระเครื่อง และเครื่องประดับสายมูทั้งหมดที่ปรากฏบนเว็บไซต์ &ldquo;คนดวงดี 2025&rdquo; จัดจำหน่ายเพื่อเป็นเครื่องยึดเหนี่ยวจิตใจในการเจริญสติและการทำความดี เป็นความเชื่อส่วนบุคคล ทางร้านไม่มีนโยบายและไม่ได้รับประกันผลลัพธ์เชิงพาณิชย์ โชคลาภ หรือปาฏิหาริย์ใดๆ ผู้ซื้อควรใช้วิจารณญาณอย่างรอบคอบก่อนตัดสินใจ
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">
            2. การสั่งซื้อและการล็อกราคาสินค้า (Price Lock)
          </h2>
          <p>
            เมื่อท่านกดยืนยันคำสั่งซื้อ ระบบจะทำการบันทึกราคาสินค้า ณ เวลาที่สั่งซื้อทันที แม้จะมีการเปลี่ยนแปลงราคาหน้าร้านในภายหลัง คำสั่งซื้อของท่านจะยึดตามราคาที่ปรากฏในใบสั่งซื้อเดิมเสมอ
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">
            3. บัตรรับรอง Digital Certificate
          </h2>
          <p>
            บัตรรับรองดิจิทัลออกให้เฉพาะวัตถุมงคลที่มีหมายเลขกำกับตรงกับองค์จริง หากพบว่ามีการแก้ไข ดัดแปลง หรือปลอมแปลงรหัสรับรอง ทางร้านขอสงวนสิทธิ์ในการระงับสถานะ (Revoke) บัตรรับรองดังกล่าวทันที
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-semibold text-[#282522]">
            4. ข้อมูลนิติบุคคลผู้ให้บริการ
          </h2>
          <div className="p-4 bg-[#F7F4EE] rounded-xl text-xs space-y-1.5">
            <p><strong>ผู้ประกอบการ:</strong> บริษัท สุพรภา จำกัด</p>
            <p><strong>เลขทะเบียนนิติบุคคล / ผู้เสียภาษี:</strong> 0105569013597</p>
            <p><strong>สำนักงานตั้งอยู่เลขที่:</strong> 25 ซอยริมทางด่วน 2 แขวงพระโขนงใต้ เขตพระโขนง กรุงเทพมหานคร 10260</p>
            <p><strong>เบอร์โทรศัพท์ติดต่อ:</strong> <a href="tel:0653062263" className="text-[#4A5D4E] font-medium hover:underline">065-306-2263</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
