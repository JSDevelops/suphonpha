'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Upload,
  Image as ImageIcon,
  ArrowUpDown,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';
import { Product } from '@/types';
import SafeImage from '@/components/SafeImage';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { getProductUrl } from '@/lib/productUrl';
import { saveProductToGoogleSheet } from '@/lib/googleSheets';

const CATEGORY_OPTIONS = [
  { value: 'amulet', label: 'พระเครื่อง' },
  { value: 'coin', label: 'เหรียญ' },
  { value: 'bracelet', label: 'กำไลหินมงคล' },
  { value: 'ring', label: 'แหวน (หินมงคล, อัญมณี)' },
  { value: 'necklace', label: 'สร้อย, จี้' },
  { value: 'sticker', label: 'สติ๊กเกอร์ยันต์' },
  { value: 'sacred_object', label: 'ของมงคล / เครื่องราง' },
];

const PRESET_SAMPLE_IMAGES = [
  { label: 'เหรียญพระพุทธมงคล', url: '/images/products/pendant-buddha.jpg' },
  { label: 'กำไลหินมงคล', url: '/images/products/bracelet-stone.jpg' },
  { label: 'แหวนนพเก้า', url: '/images/products/ring-gold.jpg' },
  { label: 'ผ้ายันต์มหาลาภ', url: '/images/products/sticker-wealth.jpg' },
  { label: 'ท้าวเวสสุวรรณ', url: '/images/products/statue-thao-wessuwan.jpg' },
];

interface ProductFormData {
  id?: string;
  sku: string;
  titleTh: string;
  titleEn: string;
  category: 'amulet' | 'coin' | 'bracelet' | 'ring' | 'necklace' | 'sticker' | 'sacred_object';
  subCategory?: string;
  categoryLabelTh: string;
  shortDesc: string;
  fullDesc: string;
  regularPrice: number;
  salePrice?: number | '';
  stock: number;
  image: string;
  gallery: string[];
  dimensions: string;
  material: string;
  blessingInfo: string;
  certificateCode: string;
  isFeatured: boolean;
}

const DEFAULT_FORM_DATA: ProductFormData = {
  sku: '',
  titleTh: '',
  titleEn: '',
  category: 'amulet',
  categoryLabelTh: 'วัตถุมงคล',
  shortDesc: '',
  fullDesc: '',
  regularPrice: 990,
  salePrice: '',
  stock: 10,
  image: '/images/products/pendant-buddha.jpg',
  gallery: ['/images/products/pendant-buddha.jpg'],
  dimensions: '',
  material: '',
  blessingInfo: '',
  certificateCode: '',
  isFeatured: false,
};

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, isLoading } = useStoreData();

  // State สำหรับค้นหาและกรอง
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'stock'>('newest');

  // State Modal ฟอร์ม
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(DEFAULT_FORM_DATA);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  // State Modal ยืนยันการลบ
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<Product | null>(null);

  // กรองสินค้า
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesQuery =
          p.titleTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.salePrice || a.regularPrice) - (b.salePrice || b.regularPrice);
        if (sortBy === 'price-desc') return (b.salePrice || b.regularPrice) - (a.salePrice || a.regularPrice);
        if (sortBy === 'stock') return a.stock - b.stock;
        return 0; // default order
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  // เปิดฟอร์มเพิ่มสินค้าใหม่
  const handleOpenAddModal = () => {
    const autoSku = `KDD-${Date.now().toString().slice(-6)}`;
    setFormData({
      ...DEFAULT_FORM_DATA,
      sku: autoSku,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // เปิดฟอร์มแก้ไขสินค้า
  const handleOpenEditModal = (product: Product) => {
    setFormData({
      id: product.id,
      sku: product.sku,
      titleTh: product.titleTh,
      titleEn: product.titleEn || '',
      category: product.category,
      categoryLabelTh: product.categoryLabelTh || 'วัตถุมงคล',
      shortDesc: product.shortDesc || '',
      fullDesc: product.fullDesc || '',
      regularPrice: product.regularPrice,
      salePrice: product.salePrice ?? '',
      stock: product.stock,
      image: product.image,
      gallery: product.gallery || [product.image],
      dimensions: product.dimensions || '',
      material: product.material || '',
      blessingInfo: product.blessingInfo || '',
      certificateCode: product.certificateCode || '',
      isFeatured: !!product.isFeatured,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // บันทึกฟอร์ม (Add หรือ Update)
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleTh.trim()) {
      showNotification('error', 'กรุณาระบุชื่อสินค้าภาษาไทย');
      return;
    }
    if (!formData.sku.trim()) {
      showNotification('error', 'กรุณาระบุรหัสสินค้า (SKU)');
      return;
    }

    setFormSubmitting(true);

    const payload: Product = {
      id: formData.id || `prod-${Date.now()}`,
      sku: formData.sku.trim(),
      titleTh: formData.titleTh.trim(),
      titleEn: formData.titleEn.trim() || formData.titleTh.trim(),
      category: formData.category,
      categoryLabelTh:
        CATEGORY_OPTIONS.find((c) => c.value === formData.category)?.label || formData.categoryLabelTh,
      shortDesc: formData.shortDesc,
      fullDesc: formData.fullDesc || formData.shortDesc,
      regularPrice: Number(formData.regularPrice),
      salePrice: formData.salePrice !== '' && formData.salePrice !== undefined ? Number(formData.salePrice) : undefined,
      stock: Number(formData.stock),
      image: formData.image || '/images/products/pendant-buddha.jpg',
      gallery: formData.gallery?.length ? formData.gallery : [formData.image],
      dimensions: formData.dimensions,
      material: formData.material,
      blessingInfo: formData.blessingInfo,
      certificateCode: formData.certificateCode,
      isFeatured: formData.isFeatured,
    };

    try {
      if (isEditing) {
        const res = await updateProduct(payload);
        showNotification('success', res.message || 'อัปเดตข้อมูลสินค้าสำเร็จ');
      } else {
        const res = await addProduct(payload);
        showNotification('success', res.message || 'บันทึกสินค้าใหม่ลง Google Sheet เรียบร้อย');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      showNotification('error', err.message || 'เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setFormSubmitting(false);
    }
  };

  // ดำเนินการลบสินค้า
  const handleConfirmDelete = async () => {
    if (!deleteConfirmTarget) return;

    try {
      const res = await deleteProduct(deleteConfirmTarget.id, deleteConfirmTarget.sku);
      showNotification('success', res.message || 'ลบสินค้าสำเร็จ');
      setDeleteConfirmTarget(null);
    } catch (err: any) {
      showNotification('error', err.message || 'เกิดข้อผิดพลาดในการลบสินค้า');
    }
  };

  // แปลงไฟล์รูปภาพที่อัปโหลดจากเครื่องเป็น Data URL
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showNotification('error', 'ขนาดไฟล์ภาพต้องไม่เกิน 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          image: base64String,
          gallery: [base64String],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSyncAllToGoogleSheets = async () => {
    if (!confirm(`ต้องการซิงค์สินค้าทั้งหมด (${products.length} รายการ) ขึ้น Google Sheet หรือไม่?`)) {
      return;
    }
    setIsSyncingAll(true);
    let successCount = 0;
    try {
      for (const p of products) {
        const res = await saveProductToGoogleSheet(p);
        if (res.success) {
          successCount++;
        }
      }
      showNotification('success', `ซิงค์สินค้าขึ้น Google Sheet สำเร็จ (${successCount}/${products.length} รายการ)`);
    } catch (err: any) {
      showNotification('error', `เกิดข้อผิดพลาดในการซิงค์: ${err.message}`);
    } finally {
      setIsSyncingAll(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-700'
              : 'bg-rose-900 text-white border-rose-700'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-300" />
          )}
          <span>{notification.message}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-stone-300 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
            <Link href="/admin" className="hover:underline">
              ระบบหลังบ้าน
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--text-primary)] font-medium">จัดการสินค้า</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--brand-sage-dark)]">
            ระบบจัดการ & ลงสินค้า (Google Sheet Products)
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            ข้อมูลทั้งหมดจะเชื่อมต่อและบันทึกไปยังแท็บ Products ใน Google Sheet โดยอัตโนมัติ
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            disabled={isSyncingAll}
            onClick={handleSyncAllToGoogleSheets}
            className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium px-3.5 py-2.5 rounded-xl text-sm transition-all border border-stone-200 shrink-0 cursor-pointer disabled:opacity-50"
            title="ซิงค์สินค้าทั้งหมดขึ้น Google Sheet"
          >
            <RefreshCw className={`w-4 h-4 text-stone-600 ${isSyncingAll ? 'animate-spin' : ''}`} />
            <span>{isSyncingAll ? 'กำลังซิงค์...' : 'ซิงค์ขึ้น Google Sheet'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 bg-[var(--brand-sage-dark)] hover:bg-[var(--brand-sage)] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm hover:shadow shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ ลงสินค้าใหม่</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-[var(--border-warm)] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาชื่อสินค้า, SKU หรือภาษาอังกฤษ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)] bg-stone-50/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category & Sort Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="กรองหมวดหมู่สินค้า"
            className="text-xs sm:text-sm py-2 px-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
          >
            <option value="all">ทุกหมวดหมู่ ({products.length})</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="เรียงลำดับสินค้า"
            className="text-xs sm:text-sm py-2 px-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
          >
            <option value="newest">ลำดับเริ่มต้น</option>
            <option value="price-asc">ราคา: ต่ำ ➜ สูง</option>
            <option value="price-desc">ราคา: สูง ➜ ต่ำ</option>
            <option value="stock">สต็อก: น้อย ➜ มาก</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[var(--border-warm)] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--text-secondary)]">
            <thead className="bg-stone-50 text-xs font-semibold text-stone-700 uppercase border-b border-stone-200">
              <tr>
                <th scope="col" className="px-4 py-3.5 w-16">
                  รูปภาพ
                </th>
                <th scope="col" className="px-4 py-3.5">
                  รหัส / ชื่อสินค้า
                </th>
                <th scope="col" className="px-4 py-3.5 hidden sm:table-cell">
                  หมวดหมู่
                </th>
                <th scope="col" className="px-4 py-3.5">
                  ราคาปกติ / โปร
                </th>
                <th scope="col" className="px-4 py-3.5">
                  สต็อก
                </th>
                <th scope="col" className="px-4 py-3.5 text-center hidden md:table-cell">
                  แนะนำ
                </th>
                <th scope="col" className="px-4 py-3.5 text-right">
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-stone-500">
                    <Package className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="font-medium text-stone-700">ไม่พบสินค้าตามเงื่อนไขที่ค้นหา</p>
                    <p className="text-xs text-stone-400 mt-1">ลองเปลี่ยนคำค้นหา หรือกดปุ่มลงสินค้าใหม่ด้านบน</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Image Thumbnail */}
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden relative border border-stone-200 shrink-0">
                        <SafeImage
                          src={p.image}
                          alt={p.titleTh}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    </td>

                    {/* Title & SKU */}
                    <td className="px-4 py-3 min-w-[200px]">
                      <div className="font-medium text-stone-900 hover:text-[var(--brand-sage-dark)] transition-colors">
                        {p.titleTh}
                      </div>
                      <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded text-[11px]">
                          {p.sku}
                        </span>
                        {p.certificateCode && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-mono">
                            {p.certificateCode}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 hidden sm:table-cell whitespace-nowrap">
                      <span className="inline-block bg-[var(--brand-sage-light)] text-[var(--brand-sage-dark)] px-2.5 py-1 rounded-full text-xs font-medium">
                        {p.categoryLabelTh || p.category}
                      </span>
                      {p.subCategory && (
                        <span className="block text-[11px] text-stone-500 mt-0.5">
                          • {PRODUCT_CATEGORIES.flatMap((c) => c.subCategories || []).find((s) => s.id === p.subCategory)?.label || p.subCategory}
                        </span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {p.salePrice ? (
                        <div>
                          <span className="text-sm font-bold text-amber-700">
                            ฿{Number(p.salePrice).toLocaleString()}
                          </span>
                          <span className="block text-xs text-stone-400 line-through">
                            ฿{Number(p.regularPrice).toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-stone-800">
                          ฿{Number(p.regularPrice).toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {p.stock <= 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                          หมดสต็อก
                        </span>
                      ) : p.stock <= 3 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          เหลือ {p.stock} ชิ้น
                        </span>
                      ) : (
                        <span className="text-xs text-stone-600 font-medium">
                          {p.stock} ชิ้น
                        </span>
                      )}
                    </td>

                    {/* Featured */}
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      {p.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3" /> แนะนำ
                        </span>
                      ) : (
                        <span className="text-stone-300 text-xs">-</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={getProductUrl(p)}
                          target="_blank"
                          className="p-1.5 text-stone-400 hover:text-[var(--brand-sage-dark)] hover:bg-stone-100 rounded-lg transition-colors"
                          title="ดูหน้าสินค้าจริง"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-stone-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                          title="แก้ไขสินค้า"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmTarget(p)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="ลบสินค้า"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="bg-stone-50 px-4 py-3 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
          <span>
            แสดงผล {filteredProducts.length} รายการ (จากทั้งหมด {products.length} รายการ)
          </span>
          <span className="text-stone-400">ระบบซิงค์ Google Sheets CMS</span>
        </div>
      </div>

      {/* ================= MODAL: ADD / EDIT PRODUCT ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[var(--brand-sage-dark)] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold">
                  {isEditing ? 'แก้ไขข้อมูลสินค้า' : 'ลงสินค้าใหม่เข้าสู่ Google Sheet'}
                </h3>
                <p className="text-xs text-stone-300">
                  กรอกรายละเอียดวัตถุมงคล ข้อมูลจะถูกบันทึกลงในชีตแท็บ Products อัตโนมัติ
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmitForm} className="overflow-y-auto flex-1 p-6 space-y-6">
              {/* ส่วนที่ 1: ข้อมูลหลัก */}
              <div>
                <h4 className="text-xs font-bold text-[var(--brand-sage-dark)] uppercase tracking-wider mb-3 pb-1 border-b border-stone-100 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" /> 1. ข้อมูลพื้นฐานสินค้า
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ชื่อสินค้า (ภาษาไทย) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น เหรียญพระพุทธมงคลจำลอง รุ่นสร้างบารมี"
                      value={formData.titleTh}
                      onChange={(e) => setFormData({ ...formData, titleTh: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ชื่อสินค้า (ภาษาอังกฤษ)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น Phra Buddha Mongkol Coin"
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      รหัสสินค้า (SKU) <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="KDD-001"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        className="w-full font-mono text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, sku: `KDD-${Date.now().toString().slice(-6)}` })
                        }
                        className="px-2.5 py-1 text-xs border border-stone-200 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-600 whitespace-nowrap"
                        title="สร้างรหัส SKU สุ่ม"
                      >
                        สุ่ม SKU
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      หมวดหมู่สินค้า
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        const label = CATEGORY_OPTIONS.find((c) => c.value === val)?.label || 'วัตถุมงคล';
                        setFormData({
                          ...formData,
                          category: val,
                          categoryLabelTh: label,
                          subCategory: undefined,
                        });
                      }}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {PRODUCT_CATEGORIES.find((c) => c.id === formData.category)?.subCategories && (
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        หมวดหมู่ย่อย (Submenu / ซับเมนู)
                      </label>
                      <select
                        value={formData.subCategory || ''}
                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value || undefined })}
                        className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                      >
                        <option value="">-- ทั้งหมด / ไม่ระบุ --</option>
                        {PRODUCT_CATEGORIES.find((c) => c.id === formData.category)?.subCategories?.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      รหัสใบรับรองพระแท้ (Certificate Code)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น KDD-2025-00101"
                      value={formData.certificateCode}
                      onChange={(e) => setFormData({ ...formData, certificateCode: e.target.value })}
                      className="w-full font-mono text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                    />
                  </div>
                </div>
              </div>

              {/* ส่วนที่ 2: ราคาและจำนวนคลัง */}
              <div>
                <h4 className="text-xs font-bold text-[var(--brand-sage-dark)] uppercase tracking-wider mb-3 pb-1 border-b border-stone-100 flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5" /> 2. ราคาและสต็อกสินค้า
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ราคาปกติ (บาท) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.regularPrice}
                      onChange={(e) => setFormData({ ...formData, regularPrice: Number(e.target.value) })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)] font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ราคาโปรโมชั่น (ถ้ามี)
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="เว้นว่างถ้าไม่มีโปรโมชั่น"
                      value={formData.salePrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salePrice: e.target.value === '' ? '' : Number(e.target.value),
                        })
                      }
                      className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)] text-amber-700 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      จำนวนสต็อก (ชิ้น)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded text-[var(--brand-sage)] focus:ring-[var(--brand-sage)] w-4 h-4"
                    />
                    <span className="text-xs font-medium text-stone-700">
                      ตั้งเป็นสินค้าแนะนำ (Featured Product) แสดงเด่นบนหน้าหลัก
                    </span>
                  </label>
                </div>
              </div>

              {/* ส่วนที่ 3: รูปภาพสินค้า */}
              <div>
                <h4 className="text-xs font-bold text-[var(--brand-sage-dark)] uppercase tracking-wider mb-3 pb-1 border-b border-stone-100 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" /> 3. รูปภาพสินค้า
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                  {/* Image Preview Box */}
                  <div className="w-full aspect-square rounded-xl bg-stone-100 border border-stone-200 overflow-hidden relative flex items-center justify-center">
                    {formData.image ? (
                      <SafeImage
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    ) : (
                      <div className="text-stone-400 text-xs text-center p-4">
                        <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        ไม่มีรูปภาพ
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        URL รูปภาพสินค้า (รองรับ https:// หรือ path ในเว็บ)
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com/image.jpg หรือ /images/products/..."
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                      />
                    </div>

                    {/* Quick Choose Preset Image */}
                    <div>
                      <div className="text-[11px] text-stone-500 mb-1">หรือเลือกภาพตัวอย่างที่มีในระบบ:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_SAMPLE_IMAGES.map((img, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                image: img.url,
                                gallery: [img.url],
                              })
                            }
                            className={`text-[11px] px-2 py-1 rounded-lg border transition-colors ${
                              formData.image === img.url
                                ? 'bg-[var(--brand-sage-dark)] text-white border-[var(--brand-sage-dark)]'
                                : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                            }`}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Upload File Input */}
                    <div>
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs cursor-pointer border border-stone-200 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>อัปโหลดรูปภาพจากอุปกรณ์ (แปลงเป็นภาพพร้อมใช้)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* ส่วนที่ 4: รายละเอียดเชิงลึก & มวลสาร */}
              <div>
                <h4 className="text-xs font-bold text-[var(--brand-sage-dark)] uppercase tracking-wider mb-3 pb-1 border-b border-stone-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 4. รายละเอียดมงคล & มวลสารศักดิ์สิทธิ์
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      คำโปรยสั้น (Short Description)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น เสริมดวงชะตา แคล้วคลาด เมตตามหานิยม ค้าขายร่ำรวย"
                      value={formData.shortDesc}
                      onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        มวลสาร / วัสดุ (Material)
                      </label>
                      <input
                        type="text"
                        placeholder="เช่น เนื้อทองทิพย์, นวโลหะเต็มสูตร, ผงพุทธคุณ 108"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        ขนาด / มิติ (Dimensions)
                      </label>
                      <input
                        type="text"
                        placeholder="เช่น กว้าง 2.2 ซม. สูง 3.5 ซม."
                        value={formData.dimensions}
                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                        className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ข้อมูลพิธีพุทธาภิเษก / เกจิอาจารย์ (Blessing Information)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น ผ่านพิธีมหาพุทธาภิเษก วัดพระธาตุดอยสุเทพ พระเกจิร่วมอธิษฐานจิต 9 รูป"
                      value={formData.blessingInfo}
                      onChange={(e) => setFormData({ ...formData, blessingInfo: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      รายละเอียดฉบับเต็ม (Full Description)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="ประวัติ ความเป็นมา วิธีการบูชา ข้อควรปฏิบัติ..."
                      value={formData.fullDesc}
                      onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 text-sm font-medium transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="inline-flex items-center gap-2 bg-[var(--brand-sage-dark)] hover:bg-[var(--brand-sage)] text-white font-bold px-6 py-2 rounded-xl text-sm transition-all shadow-sm disabled:opacity-50"
                >
                  {formSubmitting && <RefreshCw className="w-4 h-4 animate-spin" />}
                  <span>{isEditing ? 'บันทึกการแก้ไข' : 'ยืนยันลงสินค้าเข้า Google Sheet'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE CONFIRMATION ================= */}
      {deleteConfirmTarget && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                ยืนยันการลบสินค้านี้?
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                คุณกำลังจะลบ <strong>&quot;{deleteConfirmTarget.titleTh}&quot;</strong> (SKU: {deleteConfirmTarget.sku})
                ออกจากระบบและ Google Sheet การดำเนินการนี้ไม่สามารถยกเลิกได้
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmTarget(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 text-sm font-medium transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors shadow-sm"
              >
                ยืนยันลบสินค้า
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
