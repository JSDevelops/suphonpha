'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ShieldCheck, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenCert?: (code: string) => void;
}

export function ProductCard({ product, onOpenCert }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const price = product.salePrice ?? product.regularPrice;

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E6E1D8] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_32px_-8px_rgba(40,37,34,0.12),0_4px_12px_rgba(198,160,82,0.15)] hover:border-[#C6A052]/50 flex flex-col">
      {/* Product Image Frame */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square bg-[#F7F4EE] overflow-hidden">
        <Image
          src={product.image}
          alt={product.titleTh}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-108"
        />

        {/* Badges container */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start justify-between gap-1 pointer-events-none">
          {product.certificateCode ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenCert?.(product.certificateCode!);
              }}
              className="pointer-events-auto flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium bg-white/95 text-[#A98336] border border-[#C6A052]/40 backdrop-blur-xs shadow-2xs hover:bg-[#F9F4E8] hover:border-[#C6A052] hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <ShieldCheck className="w-3 h-3 text-[#C6A052] shrink-0" />
              <span className="hidden xs:inline">มีใบรับรอง</span>
              <span className="xs:hidden">แท้</span>
            </button>
          ) : <div />}

          {product.salePrice && product.salePrice < product.regularPrice && (
            <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-[#4A5D4E] text-white shadow-xs shrink-0">
              ลดพิเศษ
            </span>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] tracking-wider text-[#8E8A83] uppercase block truncate">
            {product.categoryLabelTh}
          </span>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-serif text-xs sm:text-sm font-medium text-[#282522] mt-0.5 line-clamp-2 group-hover:text-[#4A5D4E] transition-colors leading-snug">
              {product.titleTh}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-1.5">
          <div className="flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-1.5 min-w-0">
            <span className="font-serif text-sm sm:text-base font-semibold text-[#4A5D4E] whitespace-nowrap">
              ฿{price.toLocaleString()}
            </span>
            {product.salePrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through whitespace-nowrap">
                ฿{product.regularPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Quick Add to Cart button with 3D tactile press feel */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-gradient-to-b from-[#FFFFFF] to-[#F7F4EE] hover:bg-gradient-to-b hover:from-[#4A5D4E] hover:to-[#3A4A3E] text-[#4A5D4E] hover:text-white border border-[#D8D1C7] hover:border-[#4A5D4E] shadow-[0_2px_6px_rgba(0,0,0,0.04),0_1px_0_0_#C5BEB3] hover:shadow-[0_6px_14px_rgba(74,93,78,0.3),0_2px_0_0_#2A362C] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-xs'
            }`}
            title="เพิ่มลงในตะกร้า"
            aria-label="เพิ่มลงในตะกร้า"
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
