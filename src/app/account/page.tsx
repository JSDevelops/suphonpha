'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from '@/components/SafeImage';
import { useAuth } from '@/context/AuthContext';
import { useStoreData } from '@/context/StoreDataContext';
import {
  User,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  LogOut,
  AlertCircle,
} from 'lucide-react';

export default function AccountPage() {
  const { user, loginWithEmail, loginWithPhoneOtp, loginWithLine, logout, isAuthenticated } =
    useAuth();
  const { orders } = useStoreData();

  // Login forms state
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | 'line'>('email');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    const res = await loginWithEmail(emailInput, passwordInput);
    if (!res.success) {
      setAuthError(res.message || 'เข้าสู่ระบบไม่สำเร็จ');
    }
  };

  const handleSendOtp = () => {
    if (!phoneInput || phoneInput.length < 9) {
      setAuthError('กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง');
      return;
    }
    setOtpSent(true);
    setAuthError('');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginWithPhoneOtp(phoneInput, otpInput);
    if (!res.success) {
      setAuthError(res.message || 'รหัส OTP ไม่ถูกต้อง');
    }
  };

  const handleLineLogin = async () => {
    await loginWithLine();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'awaiting_review':
        return (
          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> รอตรวจสอบสลิป
          </span>
        );
      case 'paid':
        return (
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> ชำระแล้ว / กำลังเตรียมพัสดุ
          </span>
        );
      case 'shipping':
        return (
          <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" /> กำลังจัดส่งพัสดุ
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> จัดส่งสำเร็จเรียบร้อย
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <span className="text-xs tracking-widest text-[#8E8A83] uppercase font-semibold">
          CUSTOMER PORTAL
        </span>
        <h1 className="font-serif text-3xl font-medium text-[#282522] mt-1">
          บัญชีลูกค้า & ติดตามคำสั่งซื้อ
        </h1>
      </div>

      {!isAuthenticated ? (
        /* Login / Register Card */
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-[#E6E1D8] shadow-sm p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-serif text-xl font-medium text-[#282522]">เข้าสู่ระบบสมาชิก</h2>
            <p className="text-xs text-[#8E8A83]">
              เลือกช่องทางเข้าสู่ระบบเพื่อดูสถานะคำสั่งซื้อและจัดการข้อมูลส่วนตัว
            </p>
          </div>

          {/* Channel Selector */}
          <div className="flex rounded-xl bg-[#F7F4EE] p-1 border border-[#E6E1D8]">
            <button
              onClick={() => {
                setAuthMethod('email');
                setAuthError('');
              }}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                authMethod === 'email' ? 'bg-white text-[#4A5D4E] shadow-xs' : 'text-gray-500'
              }`}
            >
              อีเมล
            </button>
            <button
              onClick={() => {
                setAuthMethod('phone');
                setAuthError('');
              }}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                authMethod === 'phone' ? 'bg-white text-[#4A5D4E] shadow-xs' : 'text-gray-500'
              }`}
            >
              เบอร์โทร OTP
            </button>
            <button
              onClick={() => {
                setAuthMethod('line');
                setAuthError('');
              }}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                authMethod === 'line' ? 'bg-[#06C755] text-white shadow-xs' : 'text-gray-500'
              }`}
            >
              LINE Login
            </button>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Email form */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">อีเมล</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#4A5D4E]"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">รหัสผ่าน</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#4A5D4E]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#4A5D4E] hover:bg-[#37473A] text-white rounded-lg font-semibold tracking-wide transition-colors"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          )}

          {/* Phone OTP form */}
          {authMethod === 'phone' && (
            <div className="space-y-4 text-xs">
              {!otpSent ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">หมายเลขเบอร์โทรศัพท์</label>
                    <input
                      type="tel"
                      placeholder="0812345678"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg font-mono focus:outline-hidden focus:border-[#4A5D4E]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full py-2.5 bg-[#4A5D4E] text-white rounded-lg font-semibold transition-colors"
                  >
                    ขอรหัสยืนยัน OTP
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3">
                  <p className="text-gray-500 text-[11px]">
                    รหัส OTP ถูกส่งไปยังเบอร์ {phoneInput} (รหัสทดสอบ: <strong>123456</strong>)
                  </p>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">รหัส OTP 6 หลัก</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="123456"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg font-mono tracking-widest text-center text-sm focus:outline-hidden focus:border-[#4A5D4E]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#4A5D4E] text-white rounded-lg font-semibold transition-colors"
                  >
                    ยืนยันรหัส OTP
                  </button>
                </form>
              )}
            </div>
          )}

          {/* LINE Login button */}
          {authMethod === 'line' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-gray-600">
                เข้าสู่ระบบด้วยบัญชี LINE อย่างสะดวก ปลอดภัย โดยไม่ต้องจำรหัสผ่าน
              </p>
              <button
                type="button"
                onClick={handleLineLogin}
                className="w-full py-3 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>เข้าสู่ระบบด้วย LINE</span>
              </button>
            </div>
          )}

          <div className="pt-2 text-[10px] text-gray-400 text-center leading-relaxed">
            การเข้าสู่ระบบถือว่าท่านยอมรับข้อกำหนดการให้บริการและนโยบายความเป็นส่วนตัว (PDPA) ของ คนดวงดี 2025
          </div>
        </div>
      ) : (
        /* Authenticated Customer View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: User Profile & Connected Channels (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E8EFEA] text-[#4A5D4E] flex items-center justify-center font-bold text-base">
                  {user?.name?.slice(0, 1) || 'U'}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#282522]">{user?.name}</h3>
                  <span className="text-[11px] text-gray-500">{user?.email}</span>
                </div>
              </div>

              {/* Connected Channels List */}
              <div className="pt-3 border-t border-gray-100 space-y-2.5 text-xs">
                <span className="text-gray-400 text-[11px] font-medium block">
                  ช่องทางเข้าสู่ระบบที่เชื่อมต่อ:
                </span>

                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-[#4A5D4E]" />
                    <span>อีเมล</span>
                  </div>
                  <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-medium">
                    เชื่อมต่อแล้ว
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-[#4A5D4E]" />
                    <span>เบอร์โทรศัพท์</span>
                  </div>
                  <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-medium">
                    {user?.phone || 'เชื่อมต่อแล้ว'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MessageCircle className="w-4 h-4 text-[#06C755]" />
                    <span>LINE Login</span>
                  </div>
                  <span className="text-[10px] text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full font-medium">
                    {user?.lineId ? 'เชื่อมต่อแล้ว' : 'ยังไม่เชื่อม'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <Link
                  href="/admin"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-[var(--brand-sage-dark)] hover:bg-[var(--brand-sage)] rounded-xl transition-all shadow-xs"
                >
                  <Package className="w-4 h-4 text-[var(--brand-gold)]" />
                  <span>เข้าสู่ระบบจัดการหลังบ้าน (Admin CMS)</span>
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Orders History & Tracking (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-[#282522] flex items-center gap-2">
                <Package className="w-5 h-5 text-[#4A5D4E]" />
                ประวัติคำสั่งซื้อทั้งหมด ({orders.length})
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#E6E1D8]">
                <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="text-xs text-gray-500">ท่านยังไม่มีประวัติคำสั่งซื้อ</p>
                <Link
                  href="/shop"
                  className="mt-3 inline-block px-4 py-2 bg-[#4A5D4E] text-white text-xs rounded-lg"
                >
                  เลือกชมวัตถุมงคล
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400">เลขคำสั่งซื้อ:</span>
                        <h4 className="font-mono text-xs sm:text-sm font-bold text-[#4A5D4E]">
                          {ord.orderNumber}
                        </h4>
                        <span className="text-[10px] text-gray-400">สั่งซื้อเมื่อ: {ord.createdAt}</span>
                      </div>
                      <div>{getStatusBadge(ord.status)}</div>
                    </div>

                    {/* Tracking Info if available */}
                    {ord.trackingNumber && (
                      <div className="p-3 bg-[#E8EFEA] rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#4A5D4E]" />
                          <span>
                            ผู้จัดส่ง: <strong>{ord.courierName || 'ขนส่งเอกชน'}</strong> (เลขพัสดุ:{' '}
                            <strong className="font-mono text-[#4A5D4E]">{ord.trackingNumber}</strong>)
                          </span>
                        </div>
                        <a
                          href="https://th.kerryexpress.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#4A5D4E] font-medium hover:underline inline-flex items-center gap-1 text-[11px]"
                        >
                          <span>เช็กพัสดุ</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* Items preview */}
                    <div className="space-y-2">
                      {ord.items.map((it) => (
                        <div key={it.productId} className="flex gap-3 text-xs items-center">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F7F4EE] border border-gray-100 shrink-0">
                            <Image src={it.image} alt={it.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-[#282522] truncate">{it.title}</h5>
                            <span className="text-gray-400 text-[11px]">
                              จำนวน {it.quantity} ชิ้น | SKU: {it.sku}
                            </span>
                          </div>
                          <span className="font-semibold text-[#4A5D4E]">
                            ฿{(it.price * it.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total & Action */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        วิธีชำระ: {ord.paymentMethod === 'promptpay' ? 'พร้อมเพย์' : 'โอนธนาคาร'}
                      </span>
                      <span className="text-sm font-bold text-[#282522]">
                        ยอดสุทธิ: <strong className="text-[#4A5D4E]">฿{ord.total.toLocaleString()}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
