'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  updatedAt: number;
}

const COOKIE_STORAGE_KEY = 'suphonpha_cookie_consent';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!stored) {
        // หน่วงเวลาเล็กน้อยเพื่อให้แอนิเมชันเปิดขึ้นมาอย่างนุ่มนวล
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage unavailable fallback
    }
  }, []);

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      updatedAt: Date.now(),
    };
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      updatedAt: Date.now(),
    };
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleSaveCustom = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: analyticsEnabled,
      updatedAt: Date.now(),
    };
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Cookie Banner Bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-5 pointer-events-none">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#E6E1D8] shadow-2xl p-4 sm:p-6 pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 flex-1">
              <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center shrink-0 border border-[#4A5D4E]/20 mt-0.5">
                <Cookie className="w-5 h-5 text-[#4A5D4E]" />
              </div>

              <div className="space-y-1 text-xs sm:text-sm text-[#5C5852] leading-relaxed">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-[#282522]">
                    การใช้คุกกี้และความปลอดภัยข้อมูลส่วนบุคคล (PDPA)
                  </h4>
                  <span className="text-[10px] bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full">
                    ปลอดภัย 100%
                  </span>
                </div>
                <p className="text-xs text-[#6B665E]">
                  เว็บไซต์ &ldquo;สุพรภา (Suphonpha)&rdquo; ใช้คุกกี้ที่จำเป็นเพื่อการทำงานของระบบตะกร้าสินค้า และคุกกี้เพื่อการวิเคราะห์ทางสถิติเพื่อพัฒนาประสบการณ์ใช้งานของท่านตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA){' '}
                  <Link
                    href="/privacy"
                    className="text-[#4A5D4E] underline hover:text-[#37473A] font-medium inline-flex items-center gap-0.5"
                  >
                    อ่านนโยบายความเป็นส่วนตัวและคุกกี้
                  </Link>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto shrink-0 justify-end pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="px-3 py-2 text-xs font-medium text-[#5C5852] hover:text-[#282522] bg-[#F7F4EE] hover:bg-[#EAE4D7] rounded-xl transition-colors border border-[#E6E1D8] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>ตั้งค่าคุกกี้</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptNecessary}
                className="px-3.5 py-2 text-xs font-medium text-[#4A5D4E] hover:text-[#37473A] bg-white hover:bg-[#E8EFEA] rounded-xl transition-colors border border-[#4A5D4E]/30 cursor-pointer"
              >
                เฉพาะที่จำเป็น
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#4A5D4E] hover:bg-[#37473A] rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>ยอมรับทั้งหมด</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E6E1D8] shadow-2xl overflow-hidden p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#282522]">
                    ตั้งค่าความยินยอมการใช้คุกกี้
                  </h3>
                  <p className="text-[11px] text-gray-400">เลือกประเภทคุกกี้ที่คุณอนุญาตให้ใช้งาน</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* 1. Necessary Cookies */}
              <div className="p-3.5 bg-[#F7F4EE] rounded-xl border border-[#E6E1D8] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#282522]">1. คุกกี้ที่จำเป็นอย่างยิ่ง (Strictly Necessary)</span>
                  <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                    เปิดใช้งานเสมอ
                  </span>
                </div>
                <p className="text-[#6B665E] leading-relaxed">
                  จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์ เช่น การจัดเก็บสินค้าในตะกร้า การยืนยันสลิปคำสั่งซื้อ และระบบความปลอดภัย ไม่สามารถปิดได้
                </p>
              </div>

              {/* 2. Analytics Cookies */}
              <div className="p-3.5 bg-white rounded-xl border border-[#E6E1D8] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#282522]">2. คุกกี้เพื่อการวิเคราะห์และสถิติ (Analytics)</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4A5D4E]"></div>
                  </label>
                </div>
                <p className="text-[#6B665E] leading-relaxed">
                  ช่วยให้เราเข้าใจการเข้าชมเว็บไซต์ เพื่อนำไปปรับปรุงความเร็วและประสิทธิภาพของระบบ โดยไม่ระบุตัวบุคคล (Non-PII)
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={handleAcceptNecessary}
                className="px-4 py-2 text-xs text-[#5C5852] hover:text-[#282522] bg-[#F7F4EE] rounded-xl border border-[#E6E1D8]"
              >
                ใช้เฉพาะที่จำเป็น
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#4A5D4E] hover:bg-[#37473A] rounded-xl shadow-xs"
              >
                บันทึกการตั้งค่า
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookieConsentBanner;
