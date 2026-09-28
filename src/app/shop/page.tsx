'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStoreData } from '@/context/StoreDataContext';
import { ProductCard } from '@/components/ProductCard';
import { CertificateModal } from '@/components/CertificateModal';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const { products } = useStoreData();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');
  const [selectedCertCode, setSelectedCertCode] = useState<string>('');
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'amulet', label: 'พระเครื่องและเหรียญมงคล' },
    { id: 'bracelet', label: 'กำไลหินมงคล' },
    { id: 'ring', label: 'แหวนอัญมณี' },
    { id: 'sticker', label: 'สติ๊กเกอร์ยันต์ (99.-)' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesQuery =
          !searchQuery.trim() ||
          p.titleTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabelTh.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.regularPrice;
        const priceB = b.salePrice ?? b.regularPrice;
        if (priceSort === 'asc') return priceA - priceB;
        if (priceSort === 'desc') return priceB - priceA;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, priceSort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#E6E1D8] pb-6">
        <span className="text-xs tracking-widest text-[#8E8A83] uppercase font-semibold">
          CATALOG & STORE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#282522] mt-1">
          วัตถุมงคลและเครื่องประดับทั้งหมด
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] font-light mt-1">
          คัดสรรงานพุทธศิลป์และเครื่องประดับสายมูร่วมสมัย ทุกชิ้นมีบัตรรับรองความแท้
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-[#E6E1D8] shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-[#4A5D4E] text-white shadow-xs'
                  : 'bg-[#F7F4EE] text-[#5C5852] hover:bg-[#E8EFEA] hover:text-[#4A5D4E]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ หรือ SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F4EE] border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#4A5D4E]"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="text-xs bg-[#F7F4EE] border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden text-[#5C5852]"
            >
              <option value="default">เรียงตามความนิยม</option>
              <option value="asc">ราคา: ต่ำไปสูง</option>
              <option value="desc">ราคา: สูงไปต่ำ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-[#E6E1D8]">
          <SlidersHorizontal className="w-10 h-10 mx-auto text-gray-300 mb-3" />
          <h3 className="font-serif text-lg text-[#282522]">ไม่พบสินค้าที่ตรงกับเงื่อนไข</h3>
          <p className="text-xs text-gray-500 mt-1">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-[#4A5D4E] text-white text-xs rounded-lg font-medium"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpenCert={(code) => {
                setSelectedCertCode(code);
                setCertModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        initialCode={selectedCertCode}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500">กำลังโหลดรายการสินค้า...</div>}>
      <ShopContent />
    </Suspense>
  );
}
