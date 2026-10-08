import type { Metadata, Viewport } from 'next';
import { Cinzel, Sarabun, Noto_Serif_Thai } from 'next/font/google';
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

const notoSerifThai = Noto_Serif_Thai({
  variable: '--font-thai-serif',
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const sarabun = Sarabun({
  variable: '--font-thai',
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#4A5D4E',
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://suphonpha.com';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'สุพรภา suphonpha',
    template: '%s | สุพรภา suphonpha',
  },
  description:
    'วัตถุมงคลและเครื่องประดับ คัดสรรงานพุทธศิลป์และเครื่องประดับสายมูร่วมสมัย ทุกชิ้นมีบัตรรับรองความแท้ จัดส่งฟรีทั่วประเทศ | รับประกันของแท้พร้อม Digital Certificate',
  applicationName: 'สุพรภา suphonpha',
  keywords: [
    'สุพรภา',
    'suphonpha',
    'วัตถุมงคล',
    'เครื่องประดับ',
    'พุทธศิลป์',
    'เครื่องประดับสายมูร่วมสมัย',
    'บัตรรับรองความแท้',
    'จัดส่งฟรีทั่วประเทศ',
    'Digital Certificate',
    'พระเครื่อง',
    'พระแท้',
    'กำไลหินมงคล',
    'เครื่องรางนำโชค',
  ],
  authors: [{ name: 'สุพรภา suphonpha' }],
  creator: 'สุพรภา suphonpha',
  publisher: 'สุพรภา suphonpha',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: 'any' },
      { url: `${basePath}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${basePath}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${basePath}/icon-192.png`, sizes: '192x192', type: 'image/png' },
    ],
    shortcut: `${basePath}/favicon.ico`,
    apple: [
      { url: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: `${basePath}/site.webmanifest`,
  openGraph: {
    title: 'สุพรภา suphonpha',
    description:
      'วัตถุมงคลและเครื่องประดับ คัดสรรงานพุทธศิลป์และเครื่องประดับสายมูร่วมสมัย ทุกชิ้นมีบัตรรับรองความแท้ จัดส่งฟรีทั่วประเทศ | รับประกันของแท้พร้อม Digital Certificate',
    url: siteUrl,
    siteName: 'สุพรภา suphonpha',
    locale: 'th_TH',
    type: 'website',
    images: [
      {
        url: '/images/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'สุพรภา suphonpha - วัตถุมงคลและเครื่องประดับ คัดสรรงานพุทธศิลป์และเครื่องประดับสายมูร่วมสมัย',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'สุพรภา suphonpha',
    description:
      'วัตถุมงคลและเครื่องประดับ คัดสรรงานพุทธศิลป์และเครื่องประดับสายมูร่วมสมัย ทุกชิ้นมีบัตรรับรองความแท้ จัดส่งฟรีทั่วประเทศ | รับประกันของแท้พร้อม Digital Certificate',
    images: ['/images/hero-banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'สุพรภา suphonpha',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon-512.png`,
      },
      sameAs: [
        'https://facebook.com/suphonpha',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+66-65-306-2263',
        contactType: 'customer service',
        availableLanguage: ['Thai', 'English'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'สุพรภา suphonpha',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/shop?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Store',
      '@id': `${siteUrl}/#store`,
      name: 'สุพรภา suphonpha',
      description:
        'วัตถุมงคลและเครื่องประดับ คัดสรรงานพุทธศิลป์และเครื่องประดับสายมูร่วมสมัย ทุกชิ้นมีบัตรรับรองความแท้ จัดส่งฟรีทั่วประเทศ | รับประกันของแท้พร้อม Digital Certificate',
      url: siteUrl,
      telephone: '+66-65-306-2263',
      priceRange: '฿99 - ฿50,000',
      image: `${siteUrl}/images/hero-banner.jpg`,
      currenciesAccepted: 'THB',
      paymentAccepted: 'Bank Transfer',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '09:00',
          closes: '20:00',
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${cinzel.variable} ${notoSerifThai.variable} ${sarabun.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/favicon-16x16.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/apple-touch-icon.png`} />
        <link rel="manifest" href={`${basePath}/site.webmanifest`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

