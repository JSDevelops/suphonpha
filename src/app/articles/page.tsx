'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { useStoreData } from '@/context/StoreDataContext';
import { Calendar, User, Clock, ArrowRight, Search, Sparkles, BookOpen } from 'lucide-react';

export default function ArticlesPage() {
  const { articles } = useStoreData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => set.add(a.category));
    return ['all', ...Array.from(set)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.keywords && art.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-[#E6E1D8] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9F4E8] text-[#A98336] border border-[#C6A052]/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>KNOWLEDGE & SACRED STONES GUIDE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#282522]">
          คลังความรู้และบทความหินมงคลร่วมสมัย
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] font-light mt-1 max-w-2xl leading-relaxed">
          รวมบทความเจาะลึกศาสตร์พลังงานหินธรรมชาติ การเลือกหินมงคลตามวันเกิด พลังบำบัดสุขภาพ การงาน ความรัก และการปกป้องคุ้มครอง
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white p-4 rounded-2xl border border-[#E6E1D8] shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'btn-3d-sage text-white shadow-md'
                  : 'bg-[#F7F4EE] hover:bg-white text-[#5C5852] hover:text-[#4A5D4E] border border-[#E6E1D8] hover:border-[#C6A052]'
              }`}
            >
              {cat === 'all' ? 'บทความทั้งหมด' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative shrink-0 md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อหิน หรือหัวข้อบทความ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F4EE] border border-gray-200 rounded-xl focus:outline-hidden focus:border-[#4A5D4E]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-[#E6E1D8] space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-gray-300" />
          <h3 className="font-serif text-lg text-[#282522]">ไม่พบบทความที่ตรงกับเงื่อนไข</h3>
          <p className="text-xs text-gray-500">ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่อื่น</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <Link
              key={art.id}
              href={`/articles/${art.slug}`}
              className="group card-3d bg-white rounded-2xl border border-[#E6E1D8] overflow-hidden hover:border-[#C6A052]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full bg-[#F7F4EE] overflow-hidden">
                  <SafeImage
                    src={art.coverImage}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/95 text-[#A98336] border border-[#C6A052]/30 shadow-2xs">
                    {art.category}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <h2 className="font-serif text-base font-semibold text-[#282522] line-clamp-2 group-hover:text-[#4A5D4E] transition-colors leading-snug">
                    {art.title}
                  </h2>
                  <p className="text-xs text-[#5C5852] font-light line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#8E8A83]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {art.publishDate}
                  </span>
                  {art.readTime && (
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime}
                    </span>
                  )}
                  <span className="text-[#4A5D4E] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    อ่านฉบับเต็ม <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
