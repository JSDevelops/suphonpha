'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from '@/components/SafeImage';
import Link from 'next/link';
import { useStoreData } from '@/context/StoreDataContext';
import { useCart } from '@/context/CartContext';
import { CertificateModal } from '@/components/CertificateModal';
import {
  ShieldCheck,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Truck,
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
} from 'lucide-react';

export default function ProductDetailClient({ productId }: { productId: string }) {
  const router = useRouter();
  const { products } = useStoreData();
  const { addToCart, setIsCartOpen } = useCart();

  const product = products.find((p) => p.id === productId) || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const price = product.salePrice ?? product.regularPrice;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28 sm:pb-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#8E8A83]">
        <Link href="/" className="hover:text-[#4A5D4E]">หน้าแรก</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-[#4A5D4E]">สินค้าทั้งหมด</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/shop?cat=${product.category}`} className="hover:text-[#4A5D4E]">
          {product.categoryLabelTh}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#282522] truncate max-w-xs">{product.titleTh}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#E6E1D8] shadow-sm">
            <Image
              src={activeImage}
              alt={product.titleTh}
              fill
              priority
              className="object-cover transition-all duration-300"
            />

            {product.certificateCode && (
              <button
                type="button"
                onClick={() => setCertModalOpen(true)}
                className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#A98336] border border-[#C6A052]/50 shadow-xs hover:bg-[#F9F4E8] transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#C6A052]" />
                <span>บัตรรับรองแท้ {product.certificateCode}</span>
              </button>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 bg-white ${
                    activeImage === img ? 'border-[#4A5D4E]' : 'border-[#E6E1D8]'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#A98336] uppercase">
              {product.categoryLabelTh}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#282522] mt-1 leading-snug">
              {product.titleTh}
            </h1>
            <p className="text-xs font-mono text-[#8E8A83] mt-1">รหัสสินค้า (SKU): {product.sku}</p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 p-4 bg-white rounded-xl border border-[#E6E1D8]">
            <span className="font-serif text-3xl font-semibold text-[#4A5D4E]">
              ฿{price.toLocaleString()}
            </span>
            {product.salePrice && (
              <span className="text-sm text-gray-400 line-through">
                ฿{product.regularPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 font-medium rounded-md border border-green-200 ml-auto">
              พร้อมจัดส่ง ({product.stock} ชิ้น)
            </span>
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-[#5C5852] leading-relaxed font-light">
            {product.shortDesc}
          </p>

          {/* Specifications Table */}
          <div className="p-4 bg-white rounded-xl border border-[#E6E1D8] space-y-3 text-xs">
            <h4 className="font-serif text-sm font-semibold text-[#282522] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C6A052]" />
              ข้อมูลจำเพาะและมวลสาร
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#5C5852] pt-2 border-t border-gray-100">
              <div>
                <span className="text-[11px] text-gray-400 block">ขนาดทางกายภาพ:</span>
                <span className="font-medium text-[#282522]">{product.dimensions || 'รอข้อมูลจากผู้ดูแล'}</span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 block">วัสดุ/เนื้อมวลสาร:</span>
                <span className="font-medium text-[#282522]">{product.material || 'รอข้อมูลจากผู้ดูแล'}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <span className="text-[11px] text-gray-400 block">ข้อมูลพิธีและผู้จัดสร้าง:</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-[#F7F4EE] text-gray-600 rounded text-[11px] font-medium">
                {product.blessingInfo || 'รอข้อมูลจากผู้ดูแล'}
              </span>
            </div>
          </div>

          {/* Quantity & Cart Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-[#5C5852]">จำนวน:</span>
              <div className="flex items-center border border-[#E6E1D8] rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-semibold text-gray-800">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white hover:bg-[#F7F4EE] text-[#4A5D4E] font-semibold text-xs tracking-wider rounded-xl border border-[#4A5D4E] transition-all shadow-xs"
              >
                {addedToast ? <Check className="w-4 h-4 text-green-600" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{addedToast ? 'เพิ่มลงในตะกร้าแล้ว' : 'เพิ่มลงในตะกร้า'}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#4A5D4E] hover:bg-[#37473A] text-white font-semibold text-xs tracking-wider rounded-xl transition-all shadow-md"
              >
                <span>สั่งซื้อทันที (Buy Now)</span>
              </button>
            </div>
          </div>

          {/* Guarantees & Shipping info */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E6E1D8] text-[11px] text-[#5C5852]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#4A5D4E]" />
              <span>จัดส่งฟรีเมื่อมียอดตั้งแต่ ฿999</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#4A5D4E]" />
              <span>เปลี่ยนสินค้ากรณีชำรุดจากการส่ง</span>
            </div>
          </div>

          {/* Consumer Protection Disclaimer Box */}
          <div className="p-3.5 bg-[#F9F4E8] rounded-xl border border-[#C6A052]/40 text-[11px] text-[#8E8A83] leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#C6A052] shrink-0 mt-0.5" />
            <p>
              <strong>คำชี้แจงความโปร่งใส:</strong> วัตถุมงคลและเครื่องประดับนี้เป็นเครื่องยึดเหนี่ยวจิตใจในการเจริญสติและการทำความดี เป็นความเชื่อส่วนบุคคล ทางร้านไม่กล่าวอ้างสรรพคุณหรือผลลัพธ์ปาฏิหาริย์เกินจริง
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        initialCode={product.certificateCode}
      />

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E6E1D8] p-3 shadow-lg safe-bottom">
        <div className="flex items-center gap-3">
          <div className="flex flex-col min-w-[80px]">
            <span className="text-[10px] text-gray-400">ราคาบูชา</span>
            <span className="font-serif text-base font-bold text-[#4A5D4E] leading-tight">
              ฿{price.toLocaleString()}
            </span>
          </div>
          <div className="flex-1 flex gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-11 h-11 bg-[#F7F4EE] hover:bg-[#E8EFEA] text-[#4A5D4E] border border-[#E6E1D8] rounded-xl flex items-center justify-center shrink-0 transition-colors"
              aria-label="เพิ่มลงในตะกร้า"
            >
              {addedToast ? <Check className="w-5 h-5 text-green-600" /> : <ShoppingBag className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 py-3 px-4 bg-[#4A5D4E] hover:bg-[#37473A] text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center transition-colors"
            >
              <span>สั่งซื้อทันที (Buy Now)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
