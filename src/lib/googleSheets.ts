import { Product, Certificate, Order } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_CERTIFICATES } from '@/data/mockData';

const GOOGLE_SHEET_API_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;

export interface SheetDataResponse {
  products: Product[];
  certificates: Certificate[];
  orders: Order[];
}

/**
 * ดึงข้อมูลสินค้าและใบรับรองจาก Google Sheets
 * หากยังไม่ได้ตั้งค่า GOOGLE_SHEET_API_URL หรือเชื่อมต่อไม่สำเร็จ จะคืนค่าเริ่มต้น (Fallback) ทันที
 */
export async function fetchGoogleSheetData(): Promise<SheetDataResponse> {
  if (!GOOGLE_SHEET_API_URL) {
    return {
      products: INITIAL_PRODUCTS,
      certificates: INITIAL_CERTIFICATES,
      orders: [],
    };
  }

  try {
    const res = await fetch(GOOGLE_SHEET_API_URL, {
      method: 'GET',
      next: { revalidate: 60 }, // แคช 60 วินาทีตามโมเดล เพื่อประหยัดโควต้าและโหลดเร็ว
    });

    if (!res.ok) {
      throw new Error(`Google Sheet response status: ${res.status}`);
    }

    const json = await res.json();
    if (json.status === 'success' && json.data) {
      // แปลงข้อมูลจาก Google Sheet ให้ตรงกับ Interface ของเว็บ
      const rawProducts = json.data.products || [];
      const mappedProducts: Product[] = rawProducts.map((p: any, index: number) => ({
        id: p.id || `sheet-prod-${index + 1}`,
        sku: p.sku || `SKU-${index + 1}`,
        titleTh: p.title_th || p.title || 'วัตถุมงคลแท้',
        titleEn: p.title_en || 'Sacred Item',
        category: p.category || 'amulet',
        categoryLabelTh: p.category_label || 'วัตถุมงคล',
        shortDesc: p.short_desc || '',
        fullDesc: p.full_desc || '',
        regularPrice: Number(p.regular_price || p.price || 0),
        salePrice: p.sale_price ? Number(p.sale_price) : undefined,
        stock: Number(p.stock ?? 10),
        image: p.image_url || '/images/products/pendant-buddha.jpg',
        gallery: p.image_url ? [p.image_url] : ['/images/products/pendant-buddha.jpg'],
        dimensions: p.dimensions || 'รอข้อมูลจากผู้ดูแล',
        material: p.material || 'รอข้อมูลจากผู้ดูแล',
        blessingInfo: p.blessing_info || 'รอข้อมูลจากผู้ดูแล',
        certificateCode: p.cert_code || p.certificate_code || undefined,
        isFeatured: String(p.is_featured).toLowerCase() === 'true',
      }));

      const rawCerts = json.data.certificates || [];
      const mappedCerts: Certificate[] = rawCerts.map((c: any, index: number) => ({
        id: c.id || `sheet-cert-${index + 1}`,
        certNumber: c.cert_number || `KDD-2025-${String(index + 1).padStart(5, '0')}`,
        productName: c.product_name || 'วัตถุมงคลรับรองแท้',
        image: c.image_url || '/images/products/pendant-buddha.jpg',
        materialDetails: c.material || 'มวลสารแท้มาตรฐานสากล',
        dimensions: c.dimensions || 'ขนาดมาตรฐาน',
        issuedDate: c.issued_date || new Date().toISOString().slice(0, 10),
        status: (c.status || 'active').toLowerCase() === 'revoked' ? 'revoked' : 'active',
        blessingMaster: c.blessing_master || 'รอข้อมูลจากผู้ดูแล',
        notes: c.notes || '',
        verificationCount: Number(c.verification_count || 1),
      }));

      return {
        products: mappedProducts.length > 0 ? mappedProducts : INITIAL_PRODUCTS,
        certificates: mappedCerts.length > 0 ? mappedCerts : INITIAL_CERTIFICATES,
        orders: json.data.orders || [],
      };
    }
  } catch (error) {
    console.warn('Cannot fetch from Google Sheet, falling back to local data:', error);
  }

  return {
    products: INITIAL_PRODUCTS,
    certificates: INITIAL_CERTIFICATES,
    orders: [],
  };
}

/**
 * ส่งคำสั่งซื้อใหม่ไปยัง Google Sheet
 */
export async function submitOrderToGoogleSheet(order: Order): Promise<{ success: boolean; message?: string }> {
  if (!GOOGLE_SHEET_API_URL) {
    // ถ้ายังไม่ได้ตั้งค่า Google Sheet ให้บันทึกลง LocalStorage
    return { success: true, message: 'บันทึกคำสั่งซื้อลง Local Storage เรียบร้อย' };
  }

  try {
    const res = await fetch(GOOGLE_SHEET_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'CREATE_ORDER',
        order: {
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          customerEmail: order.customerEmail,
          shippingAddress: order.shippingAddress,
          items: order.items,
          total: order.total,
          paymentMethod: order.paymentMethod,
          slipUrl: order.slipUrl || '',
          status: order.status,
        },
      }),
    });

    const json = await res.json();
    return { success: json.status === 'success', message: json.message };
  } catch (err: any) {
    console.error('Error submitting order to Google Sheet:', err);
    return { success: false, message: err.message };
  }
}
