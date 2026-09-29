'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Filter,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Layers,
  Flame,
  Award,
  CircleDollarSign,
  User,
} from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';
import { CustomInquiry } from '@/types';

const INQUIRY_STATUSES = [
  'รอเจ้าหน้าที่ติดต่อกลับ',
  'กำลังประสานงานโรงหล่อ',
  'กำลังจัดเตรียมมวลสารศักดิ์สิทธิ์',
  'กำลังประกอบพิธีพุทธาภิเษก',
  'ผลิตเสร็จสิ้น/ส่งมอบแล้ว',
  'ยกเลิกคำขอ',
];

export default function AdminInquiriesPage() {
  const { inquiries, updateInquiryStatus, refreshFromGoogleSheet, isLoading } = useStoreData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal State
  const [selectedInquiry, setSelectedInquiry] = useState<CustomInquiry | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchQuery =
        inq.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.phone.includes(searchQuery) ||
        inq.lineId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.amuletType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inq.id && inq.id.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = selectedStatus === 'all' || inq.status === selectedStatus;
      return matchQuery && matchStatus;
    });
  }, [inquiries, searchQuery, selectedStatus]);

  const handleOpenStatusModal = (inq: CustomInquiry) => {
    setSelectedInquiry(inq);
    setNewStatus(inq.status || 'รอเจ้าหน้าที่ติดต่อกลับ');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !selectedInquiry.id) return;

    setIsSubmitting(true);
    try {
      const res = await updateInquiryStatus(selectedInquiry.id, newStatus);
      setNotification({
        type: res.success ? 'success' : 'error',
        message: res.message || 'อัปเดตสถานะคำขอเรียบร้อยแล้ว',
      });
      setSelectedInquiry(null);
      setTimeout(() => setNotification(null), 4000);
    } catch {
      setNotification({
        type: 'error',
        message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'รอเจ้าหน้าที่ติดต่อกลับ':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3 text-amber-600" />
            รอติดต่อกลับ
          </span>
        );
      case 'กำลังประสานงานโรงหล่อ':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <Layers className="w-3 h-3 text-blue-600" />
            กำลังขึ้นแบบ/โรงหล่อ
          </span>
        );
      case 'กำลังจัดเตรียมมวลสารศักดิ์สิทธิ์':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <Sparkles className="w-3 h-3 text-purple-600" />
            เตรียมมวลสาร
          </span>
        );
      case 'กำลังประกอบพิธีพุทธาภิเษก':
        return (
          <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-800 border border-orange-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <Flame className="w-3 h-3 text-orange-600" />
            เข้าพิธีปลุกเสก
          </span>
        );
      case 'ผลิตเสร็จสิ้น/ส่งมอบแล้ว':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ส่งมอบสำเร็จ
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
            {status || 'รอดำเนินการ'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--brand-sage-dark)]">
              คำขอสั่งสร้างวัตถุมงคลเฉพาะบุคคล
            </h1>
            <span className="bg-[var(--brand-sage-light)] text-[var(--brand-sage-dark)] font-bold text-xs px-2.5 py-0.5 rounded-full">
              {inquiries.length} คำขอ
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            รายการคำขอสั่งสร้างพระเครื่อง เครื่องราง ประจำองค์กรและตระกูล (บันทึกลง Google Sheet แท็บ CustomInquiries)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refreshFromGoogleSheet()}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[var(--border-warm)] rounded-xl text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-stone-50 transition-all shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>รีเฟรช</span>
          </button>
          <Link
            href="/custom-order"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-dark)] text-stone-950 font-bold rounded-xl text-xs transition-all shadow-xs"
          >
            <span>ดูหน้าแบบฟอร์มสั่งสร้าง</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 border shadow-sm transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[var(--border-warm)] shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="ค้นหาตามชื่อผู้ติดต่อ, เบอร์โทร, LINE ID, หรือประเภทวัตถุมงคล..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-[var(--border-warm)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-stone-50 border border-[var(--border-warm)] rounded-xl text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
          >
            <option value="all">สถานะทั้งหมด</option>
            {INQUIRY_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inquiries Cards List */}
      {filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[var(--border-warm)] p-12 text-center">
          <Sparkles className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[var(--brand-sage-dark)]">
            ไม่พบคำขอสั่งสร้าง
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {searchQuery ? 'ลองเปลี่ยนคำค้นหา' : 'ยังไม่มีคำขอสั่งสร้างวัตถุมงคลเข้ามาในระบบ'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div
              key={inq.id || inq.phone}
              className="bg-white rounded-2xl border border-[var(--border-warm)] p-5 sm:p-6 shadow-xs hover:border-[var(--brand-sage)] transition-all space-y-4"
            >
              {/* Top row: ID, Status, Date */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg">
                    {inq.id || 'INQ-REQ'}
                  </span>
                  {getStatusBadge(inq.status)}
                </div>

                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleString('th-TH') : '-'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenStatusModal(inq)}
                    className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg transition-colors inline-flex items-center gap-1"
                  >
                    <span>เปลี่ยนสถานะ</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Middle row: Customer Info & Project Specs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Col 1: Contact Info */}
                <div className="space-y-2 bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[var(--brand-sage)]" />
                    {inq.contactName}
                  </div>
                  <div className="space-y-1.5 text-stone-700">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                      <a href={`tel:${inq.phone}`} className="text-[var(--brand-sage)] hover:underline font-mono">
                        {inq.phone}
                      </a>
                    </div>
                    {inq.lineId && (
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>LINE: </span>
                        <a
                          href={`https://line.me/ti/p/~${inq.lineId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 font-mono hover:underline inline-flex items-center gap-0.5"
                        >
                          <strong>{inq.lineId}</strong>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    )}
                    {inq.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-stone-400 shrink-0" />
                        <span className="truncate">{inq.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Col 2: Production specs */}
                <div className="space-y-2 bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    สเปกการสั่งสร้าง
                  </div>
                  <div className="space-y-1 text-stone-700">
                    <div>
                      <span className="text-[var(--text-muted)]">ประเภท: </span>
                      <strong className="text-stone-900">{inq.amuletType}</strong>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">จำนวน: </span>
                      <strong className="text-stone-900">{inq.quantity} ชิ้น</strong>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">งบประมาณ: </span>
                      <strong className="text-emerald-700">{inq.budget || 'ตามประเมิน'}</strong>
                    </div>
                  </div>
                </div>

                {/* Col 3: Materials & Ceremony */}
                <div className="space-y-2 bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    มวลสาร & พิธีกรรม
                  </div>
                  <div className="space-y-1 text-stone-700">
                    <div>
                      <span className="text-[var(--text-muted)]">มวลสาร: </span>
                      <span>{inq.materials || 'ตามมาตรฐานศูนย์'}</span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">พิธี: </span>
                      <span>{inq.ceremonyNeeds || 'เจริญพระพุทธมนต์'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row: Details description */}
              {inq.details && (
                <div className="bg-stone-50/60 p-3 rounded-xl border border-stone-100 text-xs text-stone-700">
                  <span className="font-semibold text-stone-900">รายละเอียดเพิ่มเติม: </span>
                  <span className="leading-relaxed">{inq.details}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal เปลี่ยนสถานะคำขอ */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[var(--border-warm)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif text-lg font-bold text-[var(--brand-sage-dark)]">
                อัปเดตสถานะคำขอสั่งสร้าง
              </h3>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
              <div>
                <span className="text-[var(--text-muted)]">ผู้สั่งสร้าง: </span>
                <strong className="text-stone-900">{selectedInquiry.contactName}</strong>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-stone-800">เลือกสถานะดำเนินการ</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:ring-2 focus:ring-[var(--brand-sage)]"
                >
                  {INQUIRY_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-medium text-stone-600 hover:bg-stone-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[var(--brand-sage-dark)] hover:bg-[var(--brand-sage)] text-white font-bold rounded-xl shadow-sm inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  <span>บันทึกลง Google Sheet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
