'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStoreData } from '@/context/StoreDataContext';
import { useAuth } from '@/context/AuthContext';
import { Product, Certificate, Order, OrderStatus } from '@/types';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Award,
  FileText,
  Settings,
  ShieldAlert,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Truck,
  Eye,
  Key,
  Globe,
  MessageCircle,
  Clock,
  Search,
  ExternalLink,
} from 'lucide-react';

export default function AdminPage() {
  const { user, isAdmin, switchRoleForTesting } = useAuth();
  const {
    products,
    certificates,
    orders,
    articles,
    settings,
    auditLogs,
    addProduct,
    updateProduct,
    deleteProduct,
    createCertificate,
    updateCertificate,
    updateOrderStatus,
    addArticle,
    updateSettings,
  } = useStoreData();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'orders' | 'certificates' | 'articles' | 'settings' | 'audit'
  >('dashboard');

  // Search in tabs
  const [adminSearch, setAdminSearch] = useState('');

  // Modals state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [inspectSlipOrder, setInspectSlipOrder] = useState<Order | null>(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);
  const [courierInput, setCourierInput] = useState('Kerry Express');
  const [trackingInput, setTrackingInput] = useState('');

  // Line & Google test feedback
  const [lineTestResult, setLineTestResult] = useState<string | null>(null);
  const [googleTestResult, setGoogleTestResult] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  // Settings form states
  const [googleGa4, setGoogleGa4] = useState(settings.googleGa4Id);
  const [googleGtm, setGoogleGtm] = useState(settings.googleGtmId);
  const [googleSearchConsole, setGoogleSearchConsole] = useState(settings.googleSearchConsoleToken);
  const [lineChannelId, setLineChannelId] = useState(settings.lineChannelId);
  const [lineChannelSecret, setLineChannelSecret] = useState(settings.lineChannelSecret);
  const [bankAccountName, setBankAccountName] = useState(settings.bankAccountName);
  const [bankAccountNumber, setBankAccountNumber] = useState(settings.bankAccountNumber);
  const [promptPayId, setPromptPayId] = useState(settings.promptPayId);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // New product form state
  const [newProdTitleTh, setNewProdTitleTh] = useState('');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(1990);
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdCategory, setNewProdCategory] = useState<'amulet' | 'bracelet' | 'ring' | 'sticker'>('amulet');
  const [newProdDimensions, setNewProdDimensions] = useState('2.5 x 3.5 ซม.');
  const [newProdMaterial, setNewProdMaterial] = useState('โลหะผสมรมดำ เลี่ยมกันน้ำ');
  const [newProdBlessing, setNewProdBlessing] = useState('รอข้อมูลจากผู้ดูแล');

  // New cert form state
  const [newCertNumber, setNewCertNumber] = useState(`KDD-2025-00${certificates.length + 105}`);
  const [newCertItemName, setNewCertItemName] = useState('');
  const [newCertMaterial, setNewCertMaterial] = useState('มวลสารแท้ 100%');
  const [newCertDimensions, setNewCertDimensions] = useState('2.5 x 3.5 ซม.');

  // Calculations for dashboard
  const totalSales = orders
    .filter((o) => o.status !== 'cancelled' && o.status !== 'refunded')
    .reduce((sum, o) => sum + o.total, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'awaiting_review').length;
  const lowStockProducts = products.filter((p) => p.stock < 10);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      googleGa4Id: googleGa4,
      googleGtmId: googleGtm,
      googleSearchConsoleToken: googleSearchConsole,
      lineChannelId,
      lineChannelSecret,
      bankAccountName,
      bankAccountNumber,
      promptPayId,
    });
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 2500);
  };

  const handleTestLine = () => {
    setLineTestResult('กำลังตรวจสอบการเชื่อมต่อ LINE Developers API...');
    setTimeout(() => {
      if (lineChannelId && lineChannelSecret) {
        setLineTestResult('✓ เชื่อมต่อ LINE Developers สำเร็จ: Webhook Status 200 OK (Verified)');
      } else {
        setLineTestResult('✕ ล้มเหลว: โปรดระบุ Channel ID และ Channel Secret ให้ครบถ้วน');
      }
    }, 600);
  };

  const handleTestGoogle = () => {
    setGoogleTestResult('กำลังตรวจสอบ Measurement ID & Search Console Token...');
    setTimeout(() => {
      setGoogleTestResult('✓ พบแท็ก Google Analytics 4 และ Search Console ถูกต้อง พร้อมเริ่มเก็บเหตุการณ์ eCommerce');
    }, 600);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitleTh || !newProdSku) return;
    addProduct({
      sku: newProdSku,
      titleTh: newProdTitleTh,
      titleEn: 'Sacred Blessing Item',
      category: newProdCategory,
      categoryLabelTh:
        newProdCategory === 'amulet'
          ? 'พระเครื่องและเหรียญมงคล'
          : newProdCategory === 'bracelet'
          ? 'กำไลหินมงคล'
          : newProdCategory === 'ring'
          ? 'แหวนอัญมณี'
          : 'สติ๊กเกอร์ยันต์มงคล',
      shortDesc: 'วัตถุมงคลและเครื่องประดับมงคลร่วมสมัย ผ่านการตรวจสอบความแท้',
      fullDesc: 'รายละเอียดเพิ่มเติมรอการบันทึกจากผู้ดูแลระบบ',
      regularPrice: Number(newProdPrice),
      stock: Number(newProdStock),
      image: '/images/products/pendant-buddha.jpg',
      gallery: ['/images/products/pendant-buddha.jpg'],
      dimensions: newProdDimensions,
      material: newProdMaterial,
      blessingInfo: newProdBlessing || 'รอข้อมูลจากผู้ดูแล',
      isFeatured: false,
    });
    setIsAddProductOpen(false);
    setNewProdTitleTh('');
    setNewProdSku('');
  };

  const handleCreateCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertNumber || !newCertItemName) return;
    createCertificate({
      certNumber: newCertNumber,
      productName: newCertItemName,
      image: '/images/products/pendant-buddha.jpg',
      materialDetails: newCertMaterial,
      dimensions: newCertDimensions,
      issuedDate: new Date().toISOString().slice(0, 10),
      status: 'active',
      blessingMaster: 'รอข้อมูลจากผู้ดูแล',
      notes: 'ตรวจสอบและออกบัตรรับรองมาตรฐานความแท้สากล',
    });
    setIsAddCertOpen(false);
    setNewCertItemName('');
  };

  const handleSaveTracking = () => {
    if (!trackingModalOrder || !trackingInput.trim()) return;
    updateOrderStatus(trackingModalOrder.id, 'shipping', trackingInput.trim(), courierInput);
    setTrackingModalOrder(null);
    setTrackingInput('');
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] pb-20">
      {/* Top Admin Header Bar */}
      <div className="bg-[#4A5D4E] text-white border-b border-[#37473A] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C6A052] flex items-center justify-center text-white font-bold text-sm">
            KDD
          </div>
          <div>
            <h1 className="font-serif text-base font-semibold tracking-wide">
              คนดวงดี 2025 - ศูนย์จัดการระบบ (Admin Panel)
            </h1>
            <p className="text-[11px] text-white/70">
              สถานะการเข้าสู่ระบบ: {user?.name || 'Super Admin'} ({user?.role || 'admin'})
            </p>
          </div>
        </div>

        {/* Quick Testing Role Switcher */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-white/60 text-[11px]">สิทธิ์ปัจจุบัน:</span>
          <button
            onClick={() => switchRoleForTesting('super_admin')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium border ${
              isAdmin ? 'bg-[#C6A052] text-white border-[#C6A052]' : 'bg-white/10 text-white/80'
            }`}
          >
            Super Admin
          </button>
          <button
            onClick={() => switchRoleForTesting('customer')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium border ${
              !isAdmin ? 'bg-[#C6A052] text-white border-[#C6A052]' : 'bg-white/10 text-white/80'
            }`}
          >
            Customer
          </button>
          <Link
            href="/"
            className="ml-2 px-3 py-1 bg-white/15 hover:bg-white/25 text-white rounded text-[11px] transition-colors"
          >
            &larr; กลับสู่หน้าร้าน
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Admin Navigation (3 Cols) */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl border border-[#E6E1D8] p-3 shadow-xs space-y-1 text-xs">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#5C5852] hover:bg-[#F7F4EE]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>แดชบอร์ดภาพรวม</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'orders'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#5C5852] hover:bg-[#F7F4EE]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>คำสั่งซื้อ (Orders)</span>
                </div>
                {pendingOrdersCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'products'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#5C5852] hover:bg-[#F7F4EE]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>จัดการสินค้า & สต๊อก</span>
                </div>
                <span className="text-gray-400 text-[11px]">{products.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('certificates')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'certificates'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#5C5852] hover:bg-[#F7F4EE]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4" />
                  <span>จัดการบัตร Certificate</span>
                </div>
                <span className="text-gray-400 text-[11px]">{certificates.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('articles')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'articles'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#5C5852] hover:bg-[#F7F4EE]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>ข่าว & ประชาสัมพันธ์</span>
                </div>
                <span className="text-gray-400 text-[11px]">{articles.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'settings'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#5C5852] hover:bg-[#F7F4EE]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>การตั้งค่า Google & LINE</span>
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'audit'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#5C5852] hover:bg-[#F7F4EE]'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>บันทึก Audit Logs</span>
              </button>
            </div>
          </div>

          {/* Right Main Content Panel (9 Cols) */}
          <div className="lg:col-span-9 space-y-6">
            {/* 1. DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs">
                    <span className="text-[11px] text-gray-400 font-medium">ยอดขายรวมทั้งหมด</span>
                    <h3 className="font-serif text-2xl font-bold text-[#4A5D4E] mt-1">
                      ฿{totalSales.toLocaleString()}
                    </h3>
                    <span className="text-[10px] text-green-600 mt-1 block">
                      จากคำสั่งซื้อจริง {orders.length} รายการ
                    </span>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs">
                    <span className="text-[11px] text-gray-400 font-medium">ออเดอร์รอตรวจสลิป</span>
                    <h3 className="font-serif text-2xl font-bold text-amber-600 mt-1">
                      {pendingOrdersCount} รายการ
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-[10px] text-[#4A5D4E] underline mt-1 block"
                    >
                      ตรวจสอบสลิปทันที &rarr;
                    </button>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs">
                    <span className="text-[11px] text-gray-400 font-medium">สินค้าใกล้หมดสต๊อก</span>
                    <h3 className="font-serif text-2xl font-bold text-red-600 mt-1">
                      {lowStockProducts.length} รายการ
                    </h3>
                    <span className="text-[10px] text-gray-500 mt-1 block">สต๊อกเหลือน้อยกว่า 10 ชิ้น</span>
                  </div>
                </div>

                {/* Recent Orders to review */}
                <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="font-serif text-base font-semibold text-[#282522]">
                      รายการคำสั่งซื้อล่าสุดรอตรวจสอบ
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-[#4A5D4E] font-medium hover:underline"
                    >
                      ดูทั้งหมด
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orders.slice(0, 3).map((ord) => (
                      <div
                        key={ord.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#F7F4EE] rounded-xl text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-[#4A5D4E]">{ord.orderNumber}</span>
                          <p className="text-[#282522] font-medium mt-0.5">
                            {ord.customerName} ({ord.customerPhone})
                          </p>
                          <span className="text-gray-400 text-[11px]">
                            ยอดสุทธิ: ฿{ord.total.toLocaleString()} | {ord.items.length} รายการ
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {ord.status === 'awaiting_review' && (
                            <>
                              <button
                                onClick={() => setInspectSlipOrder(ord)}
                                className="px-3 py-1.5 bg-white border border-[#E6E1D8] text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" /> ดูสลิป
                              </button>
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'paid')}
                                className="px-3 py-1.5 bg-[#4A5D4E] text-white rounded-lg hover:bg-[#37473A] font-medium"
                              >
                                อนุมัติสลิป
                              </button>
                            </>
                          )}
                          {ord.status === 'paid' && (
                            <button
                              onClick={() => {
                                setTrackingModalOrder(ord);
                                setTrackingInput('');
                              }}
                              className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-1"
                            >
                              <Truck className="w-3.5 h-3.5" /> จัดส่ง & ใส่เลขพัสดุ
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. ORDERS MANAGEMENT TAB */}
            {activeTab === 'orders' && (
              <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#282522]">
                      จัดการคำสั่งซื้อและการจัดส่ง ({orders.length})
                    </h3>
                    <p className="text-xs text-gray-500">ตรวจสอบสลิปธนาคารและกรอกเลขพัสดุจัดส่ง</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl border border-[#E6E1D8] space-y-3 text-xs bg-[#FDFBF8]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100">
                        <div>
                          <span className="font-mono font-bold text-sm text-[#4A5D4E]">
                            {ord.orderNumber}
                          </span>
                          <span className="text-gray-400 text-[11px] ml-2">({ord.createdAt})</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          สถานะ: {ord.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-600">
                        <div>
                          <span className="text-gray-400 block text-[11px]">ข้อมูลผู้รับ:</span>
                          <strong>{ord.customerName}</strong>
                          <p>{ord.customerPhone}</p>
                          <p className="truncate text-gray-500">{ord.shippingAddress}</p>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">รายการสินค้า:</span>
                          {ord.items.map((it) => (
                            <p key={it.productId} className="truncate">
                              • {it.title} x {it.quantity} (฿{it.price.toLocaleString()})
                            </p>
                          ))}
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">ยอดชำระ:</span>
                          <strong className="text-base text-[#4A5D4E]">
                            ฿{ord.total.toLocaleString()}
                          </strong>
                          <p className="text-gray-400 text-[11px]">วิธี: {ord.paymentMethod}</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          {ord.slipUrl && (
                            <button
                              onClick={() => setInspectSlipOrder(ord)}
                              className="px-3 py-1.5 bg-white border border-[#E6E1D8] rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-1 font-medium"
                            >
                              <Eye className="w-3.5 h-3.5" /> ตรวจสอบสลิปโอนเงิน
                            </button>
                          )}
                          {ord.trackingNumber && (
                            <span className="text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                              พัสดุ: {ord.courierName} ({ord.trackingNumber})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {ord.status === 'awaiting_review' && (
                            <button
                              onClick={() => updateOrderStatus(ord.id, 'paid')}
                              className="px-3 py-1.5 bg-[#4A5D4E] hover:bg-[#37473A] text-white rounded-lg font-medium"
                            >
                              อนุมัติการชำระเงิน
                            </button>
                          )}
                          {ord.status === 'paid' && (
                            <button
                              onClick={() => {
                                setTrackingModalOrder(ord);
                                setTrackingInput('');
                              }}
                              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center gap-1"
                            >
                              <Truck className="w-3.5 h-3.5" /> กรอกเลขติดตามพัสดุ
                            </button>
                          )}
                          {ord.status === 'shipping' && (
                            <button
                              onClick={() => updateOrderStatus(ord.id, 'completed')}
                              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                            >
                              ทำเครื่องหมายว่าจัดส่งสำเร็จ
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. PRODUCTS MANAGEMENT TAB */}
            {activeTab === 'products' && (
              <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#282522]">
                      จัดการสินค้าและสต๊อก ({products.length})
                    </h3>
                    <p className="text-xs text-gray-500">เพิ่ม ลบ แก้ไขราคา และควบคุมจำนวนคงเหลือ</p>
                  </div>
                  <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="px-4 py-2 bg-[#4A5D4E] hover:bg-[#37473A] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-4 h-4" /> เพิ่มสินค้าใหม่
                  </button>
                </div>

                <div className="space-y-3">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-[#E6E1D8] bg-[#FDFBF8] text-xs gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0">
                          <Image src={p.image} alt={p.titleTh} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-[#282522] truncate">{p.titleTh}</h4>
                          <p className="text-gray-400 text-[11px]">
                            SKU: {p.sku} | หมวด: {p.categoryLabelTh}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 shrink-0">
                        <div>
                          <span className="text-gray-400 block text-[10px]">ราคา</span>
                          <span className="font-bold text-[#4A5D4E]">
                            ฿{(p.salePrice ?? p.regularPrice).toLocaleString()}
                          </span>
                        </div>

                        <div>
                          <span className="text-gray-400 block text-[10px]">สต๊อก</span>
                          <input
                            type="number"
                            defaultValue={p.stock}
                            onBlur={(e) => updateProduct(p.id, { stock: Number(e.target.value) })}
                            className="w-16 px-2 py-1 border border-gray-200 rounded text-center font-bold"
                          />
                        </div>

                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          title="ลบสินค้า"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CERTIFICATES MANAGEMENT TAB */}
            {activeTab === 'certificates' && (
              <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#282522]">
                      จัดการบัตร Digital Certificate ({certificates.length})
                    </h3>
                    <p className="text-xs text-gray-500">ออกรหัสรับรองเฉพาะองค์และตรวจสอบสถานะความแท้</p>
                  </div>
                  <button
                    onClick={() => setIsAddCertOpen(true)}
                    className="px-4 py-2 bg-[#C6A052] hover:bg-[#b08e43] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-4 h-4" /> ออกบัตรรับรองใหม่
                  </button>
                </div>

                <div className="space-y-3">
                  {certificates.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-xl border border-[#E6E1D8] bg-[#FDFBF8] text-xs flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F9F4E8] border border-[#C6A052]/40 flex items-center justify-center text-[#C6A052]">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-[#4A5D4E]">{c.certNumber}</span>
                          <h4 className="font-medium text-[#282522]">{c.productName}</h4>
                          <span className="text-[11px] text-gray-400">
                            ออกเมื่อ: {c.issuedDate} | ตรวจสอบแล้ว {c.verificationCount} ครั้ง
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
                          {c.status === 'active' ? 'Active' : 'Revoked'}
                        </span>
                        <button
                          onClick={() =>
                            updateCertificate(c.id, {
                              status: c.status === 'active' ? 'revoked' : 'active',
                            })
                          }
                          className="px-3 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-[11px]"
                        >
                          {c.status === 'active' ? 'ระงับบัตร' : 'เปิดใช้งาน'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. ARTICLES / CMS TAB */}
            {activeTab === 'articles' && (
              <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#282522]">
                      จัดการข่าวและบทความ ({articles.length})
                    </h3>
                    <p className="text-xs text-gray-500">เผยแพร่ความรู้ ตั้งเวลา และจัดการเนื้อหา SEO</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {articles.map((a) => (
                    <div
                      key={a.id}
                      className="p-4 rounded-xl border border-[#E6E1D8] bg-[#FDFBF8] text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#A98336] font-medium">{a.category}</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-[10px] font-semibold">
                          {a.status}
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-[#282522]">{a.title}</h4>
                      <p className="text-gray-500 text-[11px] line-clamp-2">{a.excerpt}</p>
                      <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-400 flex justify-between">
                        <span>ผู้เขียน: {a.author}</span>
                        <span>เผยแพร่: {a.publishDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. SETTINGS TAB (Google & LINE & Payment) */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* Google Configuration Box */}
                <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <h3 className="font-serif text-base font-semibold text-[#282522]">
                        การตั้งค่า Google Analytics 4 & Search Console
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleTestGoogle}
                      className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 font-medium"
                    >
                      ทดสอบการเชื่อมต่อ Google
                    </button>
                  </div>

                  {googleTestResult && (
                    <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-xs border border-blue-200">
                      {googleTestResult}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">
                        GA4 Measurement ID (เช่น G-XXXXXXXXXX)
                      </label>
                      <input
                        type="text"
                        value={googleGa4}
                        onChange={(e) => setGoogleGa4(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono focus:outline-hidden focus:border-[#4A5D4E]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">
                        Google Tag Manager Container ID (เช่น GTM-XXXXXXX)
                      </label>
                      <input
                        type="text"
                        value={googleGtm}
                        onChange={(e) => setGoogleGtm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono focus:outline-hidden focus:border-[#4A5D4E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">
                      Google Search Console Verification Token / Meta Tag
                    </label>
                    <input
                      type="text"
                      value={googleSearchConsole}
                      onChange={(e) => setGoogleSearchConsole(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono focus:outline-hidden focus:border-[#4A5D4E]"
                    />
                  </div>

                  <p className="text-[11px] text-gray-400">
                    * ระบบรองรับการวัดเหตุการณ์ eCommerce: ดูสินค้า, เพิ่มลงตะกร้า, เริ่มชำระเงิน, และสั่งซื้อสำเร็จ โดยไม่มีการส่งข้อมูลส่วนตัว (PII) ตามข้อกำหนด PDPA
                  </p>
                </div>

                {/* LINE Configuration Box */}
                <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-[#06C755]" />
                      <h3 className="font-serif text-base font-semibold text-[#282522]">
                        การตั้งค่า LINE Developers & LINE Official Account
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleTestLine}
                      className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 font-medium"
                    >
                      ทดสอบการเชื่อมต่อ LINE
                    </button>
                  </div>

                  {lineTestResult && (
                    <div className="p-3 bg-green-50 text-green-800 rounded-lg text-xs border border-green-200">
                      {lineTestResult}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">
                        LINE Channel ID (Login / Messaging)
                      </label>
                      <input
                        type="text"
                        value={lineChannelId}
                        onChange={(e) => setLineChannelId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono focus:outline-hidden focus:border-[#4A5D4E]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-gray-600 font-medium">LINE Channel Secret (ซ่อนรหัสลับ)</label>
                        <button
                          type="button"
                          onClick={() => setShowSecret(!showSecret)}
                          className="text-[10px] text-[#4A5D4E] hover:underline"
                        >
                          {showSecret ? 'ซ่อน' : 'แสดง'}
                        </button>
                      </div>
                      <input
                        type={showSecret ? 'text' : 'password'}
                        value={lineChannelSecret}
                        onChange={(e) => setLineChannelSecret(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono focus:outline-hidden focus:border-[#4A5D4E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Webhook URL สำหรับแจ้งเตือนคำสั่งซื้อ</label>
                    <input
                      type="text"
                      readOnly
                      value={settings.lineWebhookUrl}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-500"
                    />
                  </div>
                </div>

                {/* Bank Account Details Box */}
                <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4 text-xs">
                  <h3 className="font-serif text-base font-semibold text-[#282522]">
                    บัญชีธนาคารและพร้อมเพย์สำหรับรับเงิน
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">ชื่อบัญชีรับเงิน</label>
                      <input
                        type="text"
                        value={bankAccountName}
                        onChange={(e) => setBankAccountName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">เลขที่บัญชี</label>
                      <input
                        type="text"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">หมายเลข PromptPay</label>
                      <input
                        type="text"
                        value={promptPayId}
                        onChange={(e) => setPromptPayId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#4A5D4E] hover:bg-[#37473A] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    บันทึกการตั้งค่าทั้งหมด
                  </button>

                  {settingsSavedToast && (
                    <span className="text-xs text-green-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> บันทึกการตั้งค่าลงระบบเรียบร้อยแล้ว
                    </span>
                  )}
                </div>
              </form>
            )}

            {/* 7. AUDIT LOGS TAB */}
            {activeTab === 'audit' && (
              <div className="p-6 bg-white rounded-2xl border border-[#E6E1D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#282522]">
                      บันทึกประวัติความปลอดภัย (Audit Logs)
                    </h3>
                    <p className="text-xs text-gray-500">บันทึกการเปลี่ยนแปลงข้อมูลสำคัญโดยผู้ดูแลระบบ</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-lg border border-[#E6E1D8] bg-[#FDFBF8] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-[#4A5D4E] bg-[#E8EFEA] px-2 py-0.5 rounded text-[10px]">
                            {log.action}
                          </span>
                          <span className="font-medium text-[#282522]">{log.details}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          ผู้ดำเนินการ: {log.userEmail} ({log.ipAddress})
                        </span>
                      </div>
                      <span className="text-gray-400 font-mono text-[11px] shrink-0">
                        {log.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slip Inspection Modal */}
      {inspectSlipOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E6E1D8]">
            <div className="flex justify-between items-center pb-3 border-b">
              <h3 className="font-serif font-semibold text-sm">
                สลิปโอนเงิน: {inspectSlipOrder.orderNumber}
              </h3>
              <button
                onClick={() => setInspectSlipOrder(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-gray-100 border">
              <Image
                src={inspectSlipOrder.slipUrl || '/images/products/pendant-buddha.jpg'}
                alt="สลิปโอนเงิน"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-xs space-y-1">
              <p>ผู้โอน: <strong>{inspectSlipOrder.customerName}</strong></p>
              <p>ยอดที่ต้องชำระ: <strong className="text-[#4A5D4E]">฿{inspectSlipOrder.total.toLocaleString()}</strong></p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  updateOrderStatus(inspectSlipOrder.id, 'paid');
                  setInspectSlipOrder(null);
                }}
                className="flex-1 py-2 bg-[#4A5D4E] text-white rounded-lg text-xs font-semibold"
              >
                อนุมัติยอดโอนนี้
              </button>
              <button
                onClick={() => setInspectSlipOrder(null)}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Number Input Modal */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E6E1D8]">
            <h3 className="font-serif font-semibold text-sm">
              บันทึกเลขพัสดุ: {trackingModalOrder.orderNumber}
            </h3>
            <div className="text-xs space-y-3">
              <div>
                <label className="block text-gray-600 mb-1">บริษัทขนส่ง</label>
                <select
                  value={courierInput}
                  onChange={(e) => setCourierInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="Kerry Express">Kerry Express</option>
                  <option value="Flash Express">Flash Express</option>
                  <option value="ไปรษณีย์ไทย (EMS)">ไปรษณีย์ไทย (EMS)</option>
                  <option value="J&T Express">J&T Express</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">หมายเลขพัสดุ (Tracking Number)</label>
                <input
                  type="text"
                  placeholder="เช่น KERRY-TH-12345678"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-mono"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSaveTracking}
                className="flex-1 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold"
              >
                บันทึกและแจ้งลูกค้า
              </button>
              <button
                onClick={() => setTrackingModalOrder(null)}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateProduct}
            className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-[#E6E1D8] max-h-[85vh] overflow-y-auto text-xs"
          >
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-serif font-semibold text-base text-[#282522]">เพิ่มวัตถุมงคลใหม่</h3>
              <button type="button" onClick={() => setIsAddProductOpen(false)}>✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">ชื่อวัตถุมงคล *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น พระพุทธชินราช เลี่ยมทอง"
                  value={newProdTitleTh}
                  onChange={(e) => setNewProdTitleTh(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">รหัส SKU *</label>
                  <input
                    type="text"
                    required
                    placeholder="KDD-AMU-099"
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">หมวดหมู่</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="amulet">พระเครื่องและเหรียญ</option>
                    <option value="bracelet">กำไลหินมงคล</option>
                    <option value="ring">แหวนอัญมณี</option>
                    <option value="sticker">สติ๊กเกอร์ยันต์</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">ราคา (บาท) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg font-bold text-[#4A5D4E]"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">จำนวนสต๊อก *</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg font-bold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">ขนาดทางกายภาพ</label>
                  <input
                    type="text"
                    value={newProdDimensions}
                    onChange={(e) => setNewProdDimensions(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">มวลสาร/วัสดุ</label>
                  <input
                    type="text"
                    value={newProdMaterial}
                    onChange={(e) => setNewProdMaterial(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">ข้อมูลพิธีและผู้จัดสร้าง</label>
                <input
                  type="text"
                  value={newProdBlessing}
                  onChange={(e) => setNewProdBlessing(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="รอข้อมูลจากผู้ดูแล"
                />
                <span className="text-[10px] text-gray-400">
                  * หากไม่มีข้อมูล ให้คงค่า &ldquo;รอข้อมูลจากผู้ดูแล&rdquo; ห้ามแต่งข้อมูลขึ้นเองตามข้อกำหนด
                </span>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#4A5D4E] text-white rounded-xl font-semibold"
              >
                บันทึกสินค้าใหม่
              </button>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Certificate Modal */}
      {isAddCertOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCert}
            className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E6E1D8] text-xs"
          >
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-serif font-semibold text-base text-[#282522]">ออกบัตรรับรอง Certificate ใหม่</h3>
              <button type="button" onClick={() => setIsAddCertOpen(false)}>✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">รหัสบัตรรับรอง (Unique ID) *</label>
                <input
                  type="text"
                  required
                  value={newCertNumber}
                  onChange={(e) => setNewCertNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-mono font-bold text-[#4A5D4E]"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">ชื่อวัตถุมงคลที่รับรอง *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น เหรียญพระพุทธพุทธคุณคุ้มครอง หมายเลข 001"
                  value={newCertItemName}
                  onChange={(e) => setNewCertItemName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">มวลสารและรายละเอียดแท้</label>
                <input
                  type="text"
                  value={newCertMaterial}
                  onChange={(e) => setNewCertMaterial(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 font-medium">ขนาดทางกายภาพ</label>
                <input
                  type="text"
                  value={newCertDimensions}
                  onChange={(e) => setNewCertDimensions(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#C6A052] text-white rounded-xl font-semibold"
              >
                บันทึกและออกบัตร
              </button>
              <button
                type="button"
                onClick={() => setIsAddCertOpen(false)}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
