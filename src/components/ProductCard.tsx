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
    <div className="group relative bg-white rounded-xl border border-[#E6E1D8] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#C6A052]/40 flex flex-col">
      {/* Product Image Frame */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square bg-[#F7F4EE] overflow-hidden">
        <Image
          src={product.image}
          alt={product.titleTh}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Certificate Badge */}
        {product.certificateCode && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenCert?.(product.certificateCode!);
            }}
            className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/95 text-[#A98336] border border-[#C6A052]/40 backdrop-blur-xs shadow-2xs hover:bg-[#F9F4E8] transition-colors"
          >
            <ShieldCheck className="w-3 h-3 text-[#C6A052]" />
            <span>มีใบรับรองแท้</span>
          </button>
        )}

        {/* Discount Badge */}
        {product.salePrice && product.salePrice < product.regularPrice && (
          <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#4A5D4E] text-white shadow-2xs">
            ลดพิเศษ
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] tracking-wider text-[#8E8A83] uppercase">
            {product.categoryLabelTh}
          </span>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-serif text-sm font-medium text-[#282522] mt-0.5 line-clamp-2 group-hover:text-[#4A5D4E] transition-colors leading-snug">
              {product.titleTh}
            </h3>
          </Link>
        </div>

        <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-base font-semibold text-[#4A5D4E]">
              ฿{price.toLocaleString()}
            </span>
            {product.salePrice && (
              <span className="text-xs text-gray-400 line-through">
                ฿{product.regularPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Quick Add to Cart button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`p-2 rounded-lg transition-all duration-200 ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-[#F7F4EE] hover:bg-[#4A5D4E] text-[#4A5D4E] hover:text-white border border-[#E6E1D8]'
            }`}
            title="เพิ่มลงในตะกร้า"
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
