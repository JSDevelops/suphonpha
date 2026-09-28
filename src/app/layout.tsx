import type { Metadata } from 'next';
import { Cinzel, Sarabun } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const cinzel = Cinzel({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const sarabun = Sarabun({
  variable: '--font-thai',
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://konduangdee2025.com'),
  title: 'คนดวงดี 2025 | วัตถุมงคลและเครื่องประดับมงคลร่วมสมัย',
  description:
    'จำหน่ายเครื่องรางนำโชค วัตถุมงคล พระเครื่อง และเครื่องประดับสายมูร่วมสมัย อบอุ่น มินิมอล พร้อมระบบตรวจสอบ Digital Certificate แท้ทุกชิ้น',
  keywords: [
    'คนดวงดี 2025',
    'วัตถุมงคล',
    'พระเครื่อง',
    'กำไลหินมงคล',
    'สติ๊กเกอร์ยันต์',
    'เครื่องรางนำโชค',
    'Digital Certificate วัตถุมงคล',
  ],
  openGraph: {
    title: 'คนดวงดี 2025 | วัตถุมงคลและเครื่องประดับมงคลร่วมสมัย',
    description:
      'เครื่องรางนำโชค วัตถุมงคล พระเครื่อง และกำไลหินมงคล ดีไซน์ร่วมสมัย ตรวจสอบที่มาได้ทุกชิ้น',
    images: ['/images/hero-banner.jpg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${cinzel.variable} ${sarabun.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7F4EE] text-[#282522]">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

