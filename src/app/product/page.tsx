import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ProductDetailClient from './[id]/ProductDetailClient';

export const metadata: Metadata = {
  title: 'รายละเอียดวัตถุมงคล | สุพรภา (Suphonpha)',
  description: 'เช่าบูชาวัตถุมงคล พระเครื่อง เครื่องราง และกำไลหินมงคลแท้ พร้อมบัตรรับรอง Digital Certificate',
};

function ProductDetailFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
      <div className="inline-block w-8 h-8 border-3 border-[#4A5D4E] border-t-transparent rounded-full animate-spin" />
      <p className="text-xs text-stone-500">กำลังโหลดข้อมูลวัตถุมงคล...</p>
    </div>
  );
}

export default function ProductDynamicPage() {
  return (
    <Suspense fallback={<ProductDetailFallback />}>
      <ProductDetailClient />
    </Suspense>
  );
}
