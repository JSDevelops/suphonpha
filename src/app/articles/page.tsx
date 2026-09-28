'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStoreData } from '@/context/StoreDataContext';
import { Article } from '@/types';
import { BookOpen, Calendar, User, X, Clock, ArrowRight } from 'lucide-react';

export default function ArticlesPage() {
  const { articles } = useStoreData();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-[#E6E1D8] pb-6">
        <span className="text-xs tracking-widest text-[#8E8A83] uppercase font-semibold">
          KNOWLEDGE & ARTICLES
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#282522] mt-1">
          คลังความรู้และบทความมงคลร่วมสมัย
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] font-light mt-1">
          บทความสาระน่ารู้เกี่ยวกับพุทธศิลป์ แร่วิทยา และการดำเนินชีวิตอย่างมีสติ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <article
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="cursor-pointer group bg-white rounded-2xl border border-[#E6E1D8] overflow-hidden hover:border-[#C6A052]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 w-full bg-[#F7F4EE] overflow-hidden">
                <Image
                  src={art.coverImage}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/95 text-[#A98336] border border-[#C6A052]/30 shadow-2xs">
                  {art.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif text-base font-semibold text-[#282522] line-clamp-2 group-hover:text-[#4A5D4E] transition-colors leading-snug">
                  {art.title}
                </h3>
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
                <span className="text-[#4A5D4E] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  อ่านบทความ <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E6E1D8] overflow-hidden my-8">
            <div className="relative aspect-16/9 w-full bg-[#F7F4EE]">
              <Image
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
              <span className="text-xs text-[#A98336] font-semibold uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#282522]">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-gray-400 pb-3 border-b border-gray-100">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {selectedArticle.publishDate}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-[#5C5852] font-light leading-relaxed whitespace-pre-line space-y-4">
                {selectedArticle.content}
              </div>

              <div className="pt-4 border-t border-gray-100 text-[11px] text-gray-400 italic">
                * ข้อมูลและบทความนี้เผยแพร่เพื่อการศึกษาและการเจริญสติเท่านั้น
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
