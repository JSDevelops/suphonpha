import { INITIAL_PRODUCTS } from '@/data/mockData';

/**
 * สร้างลิงก์เปิดหน้ารายละเอียดสินค้าที่ปลอดภัย 100% ต่อการเกิด 404 บน GitHub Pages (Static Export)
 * - หากเป็นสินค้าเริ่มต้น (INITIAL_PRODUCTS): ใช้ /product/[id] เพราะมีไฟล์ HTML pre-rendered อยู่แล้ว
 * - หากเป็นสินค้าใหม่จาก Google Sheets หรือ Admin: ใช้ /product?id=[id] ซึ่งโหลดผ่าน /product/index.html โดยไม่ติด 404
 */
export function getProductUrl(product: { id?: string; sku?: string } | string | null | undefined): string {
  if (!product) return '/shop';
  const targetId = typeof product === 'string' ? product : product.id || product.sku;
  if (!targetId) return '/shop';

  // ตรวจสอบว่าสินค้ามีหน้า HTML pre-rendered หรือไม่
  const isPreRendered = INITIAL_PRODUCTS.some((p) => p.id === targetId);

  if (isPreRendered) {
    return `/product/${targetId}`;
  }

  return `/product?id=${encodeURIComponent(targetId)}`;
}
