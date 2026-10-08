'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, ShoppingBag, BookOpen, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pathname = window.location.pathname;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    // ตรวจสอบว่าเป็นการเข้าถึงหน้ารายละเอียดสินค้า เช่น /product/prod-20260929-124918 หรือ /suphonpha/product/xxxx
    const match = pathname.match(/(?:\/suphonpha)?\/product\/([^/?#]+)/);
    if (match && match[1] && match[1] !== 'index.html') {
      const productId = match[1];
      setIsRedirecting(true);
      // เปลี่ยนเส้นทางไปยัง /product?id=xxx ซึ่งเป็นหน้า static fallback ที่เปิดได้ 100% ไม่ติด 404
      const targetUrl = `${basePath}/product?id=${encodeURIComponent(productId)}`;
      window.location.replace(targetUrl);
    }
  }, []);

  if (isRedirecting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
        <div className="inline-block w-8 h-8 border-3 border-[#4A5D4E] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#5C5852]">กำลังเปิดหน้ารายละเอียดวัตถุมงคล...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E6E1D8] p-8 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-[#A98336] flex items-center justify-center mx-auto border border-[#C6A052]/30">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A98336]">
            404 PAGE NOT FOUND
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#282522]">
            ไม่พบหน้าที่คุณต้องการ
          </h1>
          <p className="text-xs text-[#5C5852] font-light leading-relaxed">
            หน้าที่คุณกำลังค้นหาอาจถูกย้าย ลบออก หรือชื่อลิงก์ไม่ถูกต้อง
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#4A5D4E] hover:bg-[#37473A] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>กลับหน้าแรก</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F7F4EE] hover:bg-[#EAE4D7] text-[#4A5D4E] border border-[#E6E1D8] text-xs font-medium rounded-xl transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>เลือกชมสินค้าในร้าน</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
