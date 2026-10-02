'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  ExternalLink,
  QrCode,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  X,
  Printer,
  Copy,
  Check,
} from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';
import { Certificate } from '@/types';
import SafeImage from '@/components/SafeImage';

interface CertificateFormData {
  id?: string;
  certNumber: string;
  productName: string;
  image: string;
  materialDetails: string;
  dimensions: string;
  issuedDate: string;
  status: 'active' | 'revoked' | 'pending';
  blessingMaster: string;
  notes: string;
  verificationCount: number;
}

const DEFAULT_CERT_FORM: CertificateFormData = {
  certNumber: '',
  productName: '',
  image: '/images/products/pendant-buddha.jpg',
  materialDetails: 'ชนวนสัมฤทธิ์โบราณ ผสมมวลสารศักดิ์สิทธิ์',
  dimensions: 'ขนาดกว้าง 2.2 ซม. สูง 3.5 ซม.',
  issuedDate: new Date().toISOString().slice(0, 10),
  status: 'active',
  blessingMaster: 'คณะสงฆ์และพระเกจิอาจารย์ร่วมเจริญพระพุทธมนต์',
  notes: 'ออกโดยศูนย์พระเครื่องและวัตถุมงคล สุพรภา (บจก. สุพรภา)',
  verificationCount: 1,
};

export default function AdminCertificatesPage() {
  const { certificates, products, addCertificate, updateCertificate, deleteCertificate, refreshFromGoogleSheet, isLoading } =
    useStoreData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'revoked'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CertificateFormData>(DEFAULT_CERT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Preview & Delete State
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Certificate | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredCerts = useMemo(() => {
    return certificates.filter((c) => {
      const matchQuery =
        c.certNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.blessingMaster && c.blessingMaster.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [certificates, searchQuery, statusFilter]);

  const handleOpenAddModal = () => {
    const autoNumber = `KDD-2025-${String(Math.floor(10000 + Math.random() * 90000))}`;
    setFormData({
      ...DEFAULT_CERT_FORM,
      certNumber: autoNumber,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cert: Certificate) => {
    setFormData({
      id: cert.id,
      certNumber: cert.certNumber,
      productName: cert.productName,
      image: cert.image,
      materialDetails: cert.materialDetails || '',
      dimensions: cert.dimensions || '',
      issuedDate: cert.issuedDate || new Date().toISOString().slice(0, 10),
      status: cert.status,
      blessingMaster: cert.blessingMaster || '',
      notes: cert.notes || '',
      verificationCount: cert.verificationCount || 1,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSelectProduct = (productId: string) => {
    const selected = products.find((p) => p.id === productId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        productName: selected.titleTh,
        image: selected.image,
        materialDetails: selected.material || prev.materialDetails,
        dimensions: selected.dimensions || prev.dimensions,
        blessingMaster: selected.blessingInfo || prev.blessingMaster,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.certNumber.trim() || !formData.productName.trim()) {
      setNotification({ type: 'error', message: 'กรุณากรอกรหัสใบรับรองและชื่อวัตถุมงคล' });
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing) {
        const res = await updateCertificate(formData as Certificate);
        setNotification({ type: res.success ? 'success' : 'error', message: res.message || 'อัปเดตใบรับรองสำเร็จ' });
      } else {
        const res = await addCertificate(formData);
        setNotification({ type: res.success ? 'success' : 'error', message: res.message || 'ออกใบรับรองใหม่สำเร็จ' });
      }
      setIsModalOpen(false);
      setTimeout(() => setNotification(null), 4000);
    } catch {
      setNotification({ type: 'error', message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSubmitting(true);
    try {
      const res = await deleteCertificate(deleteTarget.certNumber, deleteTarget.id);
      setNotification({ type: res.success ? 'success' : 'error', message: res.message || 'ลบใบรับรองสำเร็จ' });
      setDeleteTarget(null);
      setTimeout(() => setNotification(null), 4000);
    } catch {
      setNotification({ type: 'error', message: 'เกิดข้อผิดพลาดในการลบใบรับรอง' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--brand-sage-dark)]">
              ระบบออกใบรับรองพระแท้ & วัตถุมงคล
            </h1>
            <span className="bg-[var(--brand-gold)]/20 text-[var(--brand-gold-dark)] border border-[var(--brand-gold)]/30 font-bold text-xs px-2.5 py-0.5 rounded-full">
              {certificates.length} ใบรับรอง
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            ออกใบรับรองดิจิทัล (Digital Certificate) ตรวจสอบย้อนกลับด้วยรหัสเฉพาะบุคคล และบันทึกลง Google Sheet
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
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-dark)] text-stone-950 font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>ออกใบรับรองใหม่</span>
          </button>
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

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[var(--border-warm)] shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="ค้นหาตามรหัสรับรอง (เช่น KDD-2025-XXXXX), ชื่อวัตถุมงคล, หรือพระอาจารย์..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-[var(--border-warm)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              statusFilter === 'all'
                ? 'bg-[var(--brand-sage-dark)] text-white'
                : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              statusFilter === 'active'
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
            }`}
          >
            รับรองแล้ว ({certificates.filter((c) => c.status === 'active').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('revoked')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              statusFilter === 'revoked'
                ? 'bg-rose-700 text-white'
                : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
            }`}
          >
            ยกเลิก ({certificates.filter((c) => c.status === 'revoked').length})
          </button>
        </div>
      </div>

      {/* Certificates Cards Grid */}
      {filteredCerts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[var(--border-warm)] p-12 text-center">
          <ShieldCheck className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[var(--brand-sage-dark)]">
            ไม่พบใบรับรอง
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {searchQuery ? 'ลองเปลี่ยนคำค้นหา' : 'ยังไม่มีใบรับรองในระบบ กดปุ่ม "ออกใบรับรองใหม่" ด้านบนเพื่อเพิ่ม'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id || cert.certNumber}
              className="bg-white rounded-2xl border border-[var(--border-warm)] overflow-hidden shadow-xs hover:border-[var(--brand-gold)] transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                {/* Header card */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-[var(--brand-gold)]/20 text-[var(--brand-gold-dark)] border border-[var(--brand-gold)]/40 font-mono font-bold text-xs px-2.5 py-1 rounded-lg">
                      {cert.certNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(cert.certNumber)}
                      className="text-stone-400 hover:text-stone-600 p-1"
                      title="คัดลอกรหัส"
                    >
                      {copiedCode === cert.certNumber ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      cert.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {cert.status === 'active' ? 'รับรองแท้' : 'ระงับ/ยกเลิก'}
                  </span>
                </div>

                {/* Product Image & Title */}
                <div className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <SafeImage src={cert.image} alt={cert.productName} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-sm text-[var(--brand-sage-dark)] line-clamp-2 leading-tight">
                      {cert.productName}
                    </h3>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      ออกเมื่อ: {cert.issuedDate}
                    </p>
                  </div>
                </div>

                {/* Details list */}
                <div className="bg-stone-50 rounded-xl p-3 text-xs space-y-1.5 text-stone-700 border border-stone-100">
                  <div>
                    <span className="text-[var(--text-muted)]">มวลสาร: </span>
                    <span className="font-medium">{cert.materialDetails || '-'}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)]">ขนาด: </span>
                    <span className="font-medium">{cert.dimensions || '-'}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)]">พิธี/เกจิ: </span>
                    <span className="font-medium">{cert.blessingMaster || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="bg-stone-50/70 px-5 py-3 border-t border-[var(--border-warm)] flex items-center justify-between">
                <Link
                  href={`/certificate?code=${cert.certNumber}`}
                  target="_blank"
                  className="text-xs text-[var(--brand-sage)] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>ดูหน้าตรวจสิทธิ์</span>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPreviewCert(cert)}
                    className="p-1.5 hover:bg-stone-200 rounded-lg text-stone-600 transition-colors"
                    title="ดูตัวอย่างการ์ดใบรับรอง"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(cert)}
                    className="p-1.5 hover:bg-stone-200 rounded-lg text-stone-600 transition-colors"
                    title="แก้ไขข้อมูล"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(cert)}
                    className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600 transition-colors"
                    title="ลบใบรับรอง"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal เพิ่ม / แก้ไขใบรับรอง */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[var(--border-warm)] max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif text-lg font-bold text-[var(--brand-sage-dark)]">
                {isEditing ? 'แก้ไขใบรับรอง' : 'ออกใบรับรองพระแท้ดิจิทัลใหม่'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* เลือกจากสินค้าที่มีอยู่เพื่อความรวดเร็ว */}
              {!isEditing && products.length > 0 && (
                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 space-y-1.5">
                  <label className="font-semibold text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    ดึงข้อมูลอัตโนมัติจากสินค้าในระบบ (ทางเลือก)
                  </label>
                  <select
                    onChange={(e) => handleSelectProduct(e.target.value)}
                    defaultValue=""
                    className="w-full p-2 bg-white border border-amber-200 rounded-lg text-stone-800"
                  >
                    <option value="" disabled>
                      -- เลือกสินค้าเพื่อเติมข้อมูลอัตโนมัติ --
                    </option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.titleTh} ({p.sku})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* รหัสใบรับรอง & สถานะ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">รหัสใบรับรอง (Cert No.) *</label>
                  <input
                    type="text"
                    required
                    value={formData.certNumber}
                    onChange={(e) => setFormData({ ...formData, certNumber: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono uppercase font-bold focus:ring-2 focus:ring-[var(--brand-sage)]"
                    placeholder="KDD-2025-XXXXX"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">สถานะการรับรอง</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:ring-2 focus:ring-[var(--brand-sage)]"
                  >
                    <option value="active">รับรองแท้ (Active)</option>
                    <option value="revoked">ระงับ / ยกเลิก (Revoked)</option>
                    <option value="pending">รอการตรวจสอบ (Pending)</option>
                  </select>
                </div>
              </div>

              {/* ชื่อวัตถุมงคล */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-800">ชื่อวัตถุมงคล / รายการที่รับรอง *</label>
                <input
                  type="text"
                  required
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-sage)]"
                  placeholder="เช่น เหรียญพระพุทธมงคล หรือ กำไลหินมงคล"
                />
              </div>

              {/* URL รูปภาพ */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-800">URL รูปภาพวัตถุมงคล</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-sage)] font-mono text-[11px]"
                  placeholder="/images/drive/... หรือ https://..."
                />
              </div>

              {/* มวลสาร & ขนาด */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">มวลสาร / วัสดุที่สร้าง</label>
                  <input
                    type="text"
                    value={formData.materialDetails}
                    onChange={(e) => setFormData({ ...formData, materialDetails: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-sage)]"
                    placeholder="เช่น สัมฤทธิ์โบราณ, หินธรรมชาติแท้"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">ขนาด / มิติ</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-sage)]"
                    placeholder="เช่น กว้าง 2.2 ซม. สูง 3.5 ซม."
                  />
                </div>
              </div>

              {/* พระเกจิอาจารย์ & วันที่ออก */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">พระอาจารย์ / พิธีปลุกเสก</label>
                  <input
                    type="text"
                    value={formData.blessingMaster}
                    onChange={(e) => setFormData({ ...formData, blessingMaster: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-sage)]"
                    placeholder="พระเกจิอาจารย์ หรือ ชื่อพิธี"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-800">วันที่ออกบัตรรับรอง</label>
                  <input
                    type="date"
                    value={formData.issuedDate}
                    onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-sage)]"
                  />
                </div>
              </div>

              {/* หมายเหตุ */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-800">หมายเหตุรับรอง</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-sage)]"
                  placeholder="ข้อความระบุท้ายใบรับรอง..."
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
                  <span>{isEditing ? 'บันทึกการแก้ไข' : 'ออกใบรับรองลง Google Sheet'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Preview การ์ดใบรับรองดิจิทัล */}
      {previewCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-[var(--brand-gold)] relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-1 pb-3 border-b border-stone-200">
              <div className="text-[11px] font-bold tracking-widest text-[var(--brand-gold-dark)] uppercase">
                CERTIFICATE OF AUTHENTICITY
              </div>
              <h3 className="font-serif text-lg font-bold text-[var(--brand-sage-dark)]">
                บัตรรับรองพระแท้และวัตถุมงคล
              </h3>
              <p className="text-[11px] text-[var(--text-muted)]">
                ศูนย์พระเครื่อง สุพรภา (บจก. สุพรภา)
              </p>
            </div>

            {/* Product Image */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <SafeImage src={previewCert.image} alt={previewCert.productName} fill className="object-contain" />
            </div>

            {/* Info */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center bg-stone-50 p-2.5 rounded-xl">
                <span className="text-[var(--text-muted)]">รหัสรับรอง:</span>
                <span className="font-mono font-bold text-stone-900">{previewCert.certNumber}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">วัตถุมงคล: </span>
                <strong className="text-stone-900">{previewCert.productName}</strong>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">มวลสาร: </span>
                <span className="text-stone-800">{previewCert.materialDetails}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">พิธี: </span>
                <span className="text-stone-800">{previewCert.blessingMaster}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-200">
              <div className="text-[10px] text-stone-500">
                สถานะ: <strong className="text-emerald-700">รับรองแท้ 100%</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold inline-flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>พิมพ์</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="px-4 py-1.5 bg-[var(--brand-sage-dark)] text-white rounded-xl text-xs font-semibold"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal ยืนยันการลบ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-serif font-bold text-base text-stone-900">
                ยืนยันการลบใบรับรอง?
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                คุณแน่ใจหรือไม่ว่าต้องการลบใบรับรองรหัส <strong>{deleteTarget.certNumber}</strong>{' '}
                ({deleteTarget.productName}) ออกจาก Google Sheet อย่างถาวร?
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-medium text-stone-700 hover:bg-stone-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? 'กำลังลบ...' : 'ลบใบรับรอง'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
