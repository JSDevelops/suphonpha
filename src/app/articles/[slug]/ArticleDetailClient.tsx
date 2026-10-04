'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface ArticleDetailClientProps {
  title: string;
  pageUrl: string;
}

export default function ArticleDetailClient({ title, pageUrl }: ArticleDetailClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleShareLine = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-gray-400">แชร์บทความ:</span>

      {/* Copy link */}
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-[11px] text-[#5C5852] hover:text-[#4A5D4E] transition-colors cursor-pointer"
        title="คัดลอกลิงก์บทความ"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-600 font-medium">คัดลอกแล้ว</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span>คัดลอกลิงก์</span>
          </>
        )}
      </button>

      {/* Facebook Share */}
      <button
        onClick={handleShareFacebook}
        className="px-2 py-1 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] text-[11px] font-medium transition-colors cursor-pointer"
        title="แชร์ไปยัง Facebook"
      >
        Facebook
      </button>

      {/* Line Share */}
      <button
        onClick={handleShareLine}
        className="px-2 py-1 rounded-lg bg-[#06C755]/10 hover:bg-[#06C755]/20 text-[#06C755] text-[11px] font-medium transition-colors cursor-pointer"
        title="แชร์ไปยัง Line"
      >
        Line
      </button>
    </div>
  );
}
