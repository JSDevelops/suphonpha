import { Metadata } from 'next';
import { Suspense } from 'react';
import { INITIAL_PRODUCTS } from '@/data/mockData';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  const initialParams = INITIAL_PRODUCTS.map((product) => ({
    id: product.id,
  }));

  try {
    const { fetchGoogleSheetData } = await import('@/lib/googleSheets');
    const sheetData = await fetchGoogleSheetData();
    const sheetParams = (sheetData.products || []).map((p) => ({ id: p.id }));
    const idSet = new Set<string>();
    const result: { id: string }[] = [];
    [...initialParams, ...sheetParams].forEach((item) => {
      if (!idSet.has(item.id)) {
        idSet.add(item.id);
        result.push(item);
      }
    });
    return result;
  } catch {
    return initialParams;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.id === resolvedParams.id) || INITIAL_PRODUCTS[0];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jsdevelops.github.io/suphonpha';
  const pageUrl = `${siteUrl}/product/${product.id}`;
  const price = product.salePrice ?? product.regularPrice;

  return {
    title: `${product.titleTh} | สุพรภา (Suphonpha)`,
    description: product.shortDesc || product.fullDesc?.slice(0, 160),
    keywords: [
      product.titleTh,
      product.titleEn,
      product.categoryLabelTh,
      'สุพรภา',
      'Suphonpha',
      'วัตถุมงคลแท้',
      'Digital Certificate',
    ],
    openGraph: {
      title: `${product.titleTh} (฿${price.toLocaleString()}) | สุพรภา (Suphonpha)`,
      description: product.shortDesc,
      url: pageUrl,
      images: [
        {
          url: product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`,
          width: 800,
          height: 800,
          alt: product.titleTh,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.titleTh} | สุพรภา (Suphonpha)`,
      description: product.shortDesc,
      images: [product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.id === resolvedParams.id) || INITIAL_PRODUCTS[0];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jsdevelops.github.io/suphonpha';
  const price = product.salePrice ?? product.regularPrice;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.titleTh,
    image: product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`,
    description: product.shortDesc || product.fullDesc,
    sku: product.sku,
    category: product.categoryLabelTh,
    brand: {
      '@type': 'Brand',
      name: 'สุพรภา (Suphonpha)',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/product/${product.id}`,
      priceCurrency: 'THB',
      price: price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'สุพรภา (Suphonpha)',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="inline-block w-8 h-8 border-3 border-[#4A5D4E] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <ProductDetailClient productId={resolvedParams.id} />
      </Suspense>
    </>
  );
}
