export type UserRole = 'customer' | 'editor' | 'admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  lineId?: string;
  role: UserRole;
  emailVerified: boolean;
  phoneVerified: boolean;
  consentMarketing: boolean;
  consentTerms: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  sku: string;
  titleTh: string;
  titleEn: string;
  category: 'amulet' | 'bracelet' | 'ring' | 'sticker' | 'sacred_object';
  categoryLabelTh: string;
  shortDesc: string;
  fullDesc: string;
  regularPrice: number;
  salePrice?: number;
  stock: number;
  image: string;
  gallery: string[];
  dimensions?: string;
  material?: string;
  blessingInfo?: string; // "รอข้อมูลจากผู้ดูแล" if unconfirmed
  certificateId?: string;
  certificateCode?: string;
  isFeatured?: boolean;
  seoTitle?: string;
  seoDesc?: string;
}

export interface Certificate {
  id: string;
  certNumber: string; // e.g. KDD-2025-00892
  productId?: string;
  productName: string;
  image: string;
  materialDetails: string;
  dimensions: string;
  issuedDate: string;
  status: 'active' | 'revoked' | 'pending';
  blessingMaster: string; // "รอข้อมูลจากผู้ดูแล" if not set
  notes?: string;
  verificationCount: number;
}

export type OrderStatus =
  | 'pending_payment'
  | 'awaiting_review'
  | 'paid'
  | 'processing'
  | 'shipping'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  productId: string;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'bank_transfer' | 'promptpay' | 'gateway_card';
  slipUrl?: string;
  trackingNumber?: string;
  courierName?: string;
  createdAt: string;
  paidAt?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  status: 'draft' | 'published' | 'scheduled';
  publishDate: string;
  seoTitle?: string;
  seoDesc?: string;
}

export interface SystemSettings {
  googleGa4Id: string;
  googleGtmId: string;
  googleSearchConsoleToken: string;
  lineChannelId: string;
  lineChannelSecret: string; // masked in UI
  lineWebhookUrl: string;
  lineMessagingEnabled: boolean;
  paymentGatewayProvider: string; // Omise, GBPrimePay, etc.
  paymentGatewayKey: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
  promptPayId: string;
  companyName: string;
  companyTaxId: string;
  address: string;
  phoneNumber: string;
  googleMapsUrl: string;
  siteName: string;
  siteDescription: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  action: string;
  details: string;
  ipAddress: string;
}

export interface CustomInquiry {
  id?: string;
  contactName: string;
  phone: string;
  lineId: string;
  email?: string;
  amuletType: string;
  quantity: string;
  budget?: string;
  materials?: string;
  ceremonyNeeds?: string;
  details: string;
  createdAt?: string;
  status?: string;
}

