'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  ExternalLink,
  ChevronRight,
  Receipt,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  Copy,
  Check,
  Send,
  RefreshCw,
} from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';
import { Order, OrderStatus } from '@/types';
import SafeImage from '@/components/SafeImage';

const STATUS_FILTERS: { key: string; label: string; countStatus?: OrderStatus }[] = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'awaiting_review', label: 'รอตรวจสลิป', countStatus: 'awaiting_review' },
  { key: 'paid', label: 'ชำระเงินแล้ว', countStatus: 'paid' },
  { key: 'processing', label: 'กำลังจัดเตรียม', countStatus: 'processing' },
  { key: 'shipping', label: 'กำลังจัดส่ง', countStatus: 'shipping' },
  { key: 'completed', label: 'สำเร็จ', countStatus: 'completed' },
  { key: 'cancelled', label: 'ยกเลิก', countStatus: 'cancelled' },
];

const COURIER_OPTIONS = [
  'Flash Express',
  'Kerry Express (KEX)',
  'ไปรษณีย์ไทย (EMS)',
  'J&T Express',
  'Ninja Van',
  'DHL Express',
  'รับที่สำนักงานพระโขนง',
];

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, refreshFromGoogleSheet, isLoading } = useStoreData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Modal จัดการออเดอร์
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editStatus, setEditStatus] = useState<OrderStatus>('awaiting_review');
  const [courierName, setCourierName] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal ดูรูปสลิปขนาดใหญ่
  const [slipModalImage, setSlipModalImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // กรองออเดอร์
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.customerPhone && o.customerPhone.includes(searchQuery)) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus =
        selectedStatusFilter === 'all' ? true : o.status === selectedStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, searchQuery, selectedStatusFilter]);

  const handleOpenManageModal = (order: Order) => {
    setSelectedOrder(order);
    setEditStatus(order.status);
    setCourierName(order.courierName || 'Flash Express');
    setTrackingNumber(order.trackingNumber || '');
  };

  const handleSaveOrderStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setIsSubmitting(true);
    try {
      const res = await updateOrderStatus(
        selectedOrder.orderNumber,
        editStatus,
        trackingNumber.trim() || undefined,
        courierName.trim() || undefined
      );

      setNotification({
        type: res.success ? 'success' : 'error',
        message: res.message || 'อัปเดตสถานะคำสั่งซื้อเรียบร้อยแล้ว',
      });
      setSelectedOrder(null);
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

  const handleQuickApproveSlip = async (order: Order) => {
    setIsSubmitting(true);
    try {
      await updateOrderStatus(order.orderNumber, 'paid');
      setNotification({
        type: 'success',
        message: `อนุมัติสลิปของออเดอร์ ${order.orderNumber} เรียบร้อยแล้ว`,
      });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'awaiting_review':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3 text-amber-600" />
            รอตรวจสอบสลิป
          </span>
        );
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ชำระเงินแล้ว
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <RefreshCw className="w-3 h-3 text-blue-600" />
            กำลังจัดเตรียม
          </span>
        );
      case 'shipping':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <Truck className="w-3 h-3 text-purple-600" />
            กำลังจัดส่ง
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-800 border border-stone-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <CheckCircle2 className="w-3 h-3 text-stone-600" />
            จัดส่งสำเร็จ
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3 text-rose-600" />
            ยกเลิก
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
            {status}
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
              รายการคำสั่งซื้อ & ตรวจสลิป
            </h1>
            <span className="bg-[var(--brand-sage-light)] text-[var(--brand-sage-dark)] font-bold text-xs px-2.5 py-0.5 rounded-full">
              {orders.length} รายการ
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            ตรวจสลิปโอนเงิน อนุมัติการชำระเงิน และอัปเดตเลขพัสดุจัดส่ง (บันทึกลง Google Sheet แบบเรียลไทม์)
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
            <span>รีเฟรชข้อมูล</span>
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

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-[var(--border-warm)] shadow-xs space-y-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {STATUS_FILTERS.map((tab) => {
            const count = tab.countStatus
              ? orders.filter((o) => o.status === tab.countStatus).length
              : orders.length;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedStatusFilter === tab.key
                    ? 'bg-[var(--brand-sage-dark)] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:bg-stone-100 hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    selectedStatusFilter === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="ค้นหาตามเลขออเดอร์, ชื่อลูกค้า, เบอร์โทรศัพท์, หรือเลขพัสดุ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-[var(--border-warm)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)] focus:bg-white"
          />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[var(--border-warm)] p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[var(--brand-sage-dark)]">
            ไม่พบคำสั่งซื้อ
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {searchQuery ? 'ลองเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรอง' : 'ยังไม่มีคำสั่งซื้อในสถานะนี้'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-[var(--border-warm)] p-4 sm:p-5 shadow-xs hover:border-[var(--brand-sage)]/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left Column: Order info & Customer */}
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[var(--brand-sage-dark)]">
                    #{order.orderNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(order.orderNumber, order.id)}
                    className="text-stone-400 hover:text-stone-600 p-0.5"
                    title="คัดลอกเลขออเดอร์"
                  >
                    {copiedId === order.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {getStatusBadge(order.status)}
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {order.createdAt ? new Date(order.createdAt).toLocaleString('th-TH') : '-'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[var(--text-muted)]">ลูกค้า: </span>
                    <strong className="text-[var(--text-primary)]">{order.customerName}</strong>
                    {order.customerPhone && (
                      <a
                        href={`tel:${order.customerPhone}`}
                        className="ml-2 text-[var(--brand-sage)] hover:underline inline-flex items-center gap-0.5"
                      >
                        <Phone className="w-2.5 h-2.5" />
                        {order.customerPhone}
                      </a>
                    )}
                  </div>
                  <div className="truncate">
                    <span className="text-[var(--text-muted)]">จัดส่ง: </span>
                    <span className="text-stone-700" title={order.shippingAddress}>
                      {order.shippingAddress || 'ไม่ระบุที่อยู่'}
                    </span>
                  </div>
                </div>

                {/* Items Summary */}
                {order.items && order.items.length > 0 && (
                  <div className="bg-stone-50 rounded-lg p-2 text-xs text-stone-700 space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="truncate pr-2">
                          • {item.title} <span className="text-stone-400">x{item.quantity}</span>
                        </span>
                        <span className="font-mono text-stone-900 font-semibold shrink-0">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tracking & Courier Info if any */}
                {order.trackingNumber && (
                  <div className="flex items-center gap-2 text-xs bg-purple-50 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-100">
                    <Truck className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    <span>
                      {order.courierName || 'ขนส่ง'}:{' '}
                      <strong className="font-mono">{order.trackingNumber}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Total Price & Actions */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 pt-3 lg:pt-0 border-stone-100 gap-3 shrink-0">
                <div className="text-left lg:text-right">
                  <div className="text-[11px] text-[var(--text-muted)]">ยอดชำระสุทธิ</div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-[var(--brand-sage-dark)]">
                    ฿{order.total.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {order.paymentMethod === 'bank_transfer'
                      ? 'โอนผ่านบัญชีธนาคาร'
                      : order.paymentMethod === 'promptpay'
                      ? 'พร้อมเพย์ QR'
                      : 'บัตรเครดิต'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* View Slip Button */}
                  {order.slipUrl ? (
                    <button
                      type="button"
                      onClick={() => setSlipModalImage(order.slipUrl!)}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-semibold inline-flex items-center gap-1 transition-all"
                    >
                      <Receipt className="w-3.5 h-3.5 text-amber-600" />
                      <span>ดูสลิป</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-stone-400 italic">ไม่มีสลิป</span>
                  )}

                  {/* Quick Approve Button for awaiting_review */}
                  {order.status === 'awaiting_review' && (
                    <button
                      type="button"
                      onClick={() => handleQuickApproveSlip(order)}
                      disabled={isSubmitting}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1 transition-all shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>อนุมัติสลิป</span>
                    </button>
                  )}

                  {/* Manage / Update status */}
                  <button
                    type="button"
                    onClick={() => handleOpenManageModal(order)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold inline-flex items-center gap-1 transition-all"
                  >
                    <span>จัดการ</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal จัดการสถานะคำสั่งซื้อ & เลขพัสดุ */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[var(--border-warm)] space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="font-serif text-lg font-bold text-[var(--brand-sage-dark)]">
                  จัดการคำสั่งซื้อ #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  ลูกค้า: {selectedOrder.customerName} ({selectedOrder.customerPhone || 'ไม่ระบุเบอร์'})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveOrderStatus} className="space-y-4 text-xs">
              {/* เปลี่ยนสถานะ */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-800">สถานะคำสั่งซื้อ</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as OrderStatus)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:ring-2 focus:ring-[var(--brand-sage)]"
                >
                  <option value="awaiting_review">รอตรวจสอบสลิป</option>
                  <option value="paid">ชำระเงินแล้ว (เตรียมจัดส่ง)</option>
                  <option value="processing">กำลังจัดเตรียมสินค้า / ปลุกเสก</option>
                  <option value="shipping">กำลังจัดส่งพัสดุ</option>
                  <option value="completed">จัดส่งสำเร็จเรียบร้อย</option>
                  <option value="cancelled">ยกเลิกคำสั่งซื้อ</option>
                </select>
              </div>

              {/* บริษัทขนส่ง */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-800">บริษัทขนส่ง</label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:ring-2 focus:ring-[var(--brand-sage)]"
                >
                  {COURIER_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* เลขพัสดุ */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-800">
                  เลขติดตามพัสดุ (Tracking Number)
                </label>
                <input
                  type="text"
                  placeholder="เช่น TH0123456789 หรือ KEX12345678"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono focus:ring-2 focus:ring-[var(--brand-sage)]"
                />
              </div>

              {/* สลิปโอนเงินตัวอย่างใน Modal */}
              {selectedOrder.slipUrl && (
                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-800">สลิปโอนเงินที่ลูกค้าแนบมา</label>
                  <div className="relative h-40 bg-stone-100 rounded-xl overflow-hidden border border-stone-200">
                    <SafeImage
                      src={selectedOrder.slipUrl}
                      alt="สลิปโอนเงิน"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setSlipModalImage(selectedOrder.slipUrl!)}
                      className="absolute bottom-2 right-2 bg-black/70 hover:bg-black text-white text-[11px] px-2.5 py-1 rounded-lg font-medium inline-flex items-center gap-1 shadow-sm"
                    >
                      <Eye className="w-3 h-3" />
                      ขยายดูภาพเต็ม
                    </button>
                  </div>
                </div>
              )}

              {/* ที่อยู่จัดส่ง */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1">
                <div className="font-semibold text-stone-700 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-500" />
                  ที่อยู่จัดส่งพัสดุ
                </div>
                <p className="text-stone-600 leading-relaxed">{selectedOrder.shippingAddress}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
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

      {/* Modal ดูรูปสลิปขนาดใหญ่ */}
      {slipModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSlipModalImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-4 overflow-hidden relative shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h4 className="font-semibold text-sm text-stone-800">หลักฐานสลิปการโอนเงิน</h4>
              <button
                type="button"
                onClick={() => setSlipModalImage(null)}
                className="text-stone-400 hover:text-stone-600 p-1 text-base font-bold"
              >
                ✕
              </button>
            </div>
            <div className="relative h-[65vh] w-full bg-stone-50 rounded-xl overflow-hidden">
              <SafeImage
                src={slipModalImage}
                alt="สลิปโอนเงินเต็มจอ"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <a
                href={slipModalImage}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--brand-sage)] hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>เปิดรูปต้นฉบับในแท็บใหม่</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
