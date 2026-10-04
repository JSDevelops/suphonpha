import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { INITIAL_ARTICLES, INITIAL_PRODUCTS } from '@/data/mockData';
import {
  Calendar,
  User,
  Clock,
  ChevronRight,
  ArrowLeft,
  Share2,
  Tag,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Gem,
  ArrowRight,
} from 'lucide-react';
import ArticleDetailClient from './ArticleDetailClient';

export function generateStaticParams() {
  return INITIAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = INITIAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'ไม่พบบทความ | สุพรภา (Suphonpha)',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jsdevelops.github.io/suphonpha';
  const pageUrl = `${siteUrl}/articles/${article.slug}`;
  const imageUrl = article.coverImage.startsWith('http')
    ? article.coverImage
    : `${siteUrl}${article.coverImage}`;

  const title = article.seoTitle || `${article.title} | สุพรภา (Suphonpha)`;
  const description = article.seoDesc || article.excerpt;

  return {
    title,
    description,
    keywords: article.keywords || [
      'หินมงคล',
      'อัญมณีเสริมดวง',
      'สุพรภา',
      'Suphonpha',
      article.category,
    ],
    authors: [{ name: article.author }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'สุพรภา (Suphonpha)',
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = INITIAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jsdevelops.github.io/suphonpha';
  const pageUrl = `${siteUrl}/articles/${article.slug}`;
  const imageUrl = article.coverImage.startsWith('http')
    ? article.coverImage
    : `${siteUrl}${article.coverImage}`;

  // Find related articles (excluding current)
  const relatedArticles = INITIAL_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  // Sample matching product for CTA
  const sampleProduct = INITIAL_PRODUCTS[0];

  // Schema.org Structured Data (Article + BreadcrumbList)
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seoDesc || article.excerpt,
    image: imageUrl,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'สุพรภา (Suphonpha)',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo-suphonpha.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'หน้าแรก',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'บทความน่ารู้',
        item: `${siteUrl}/articles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <article className="min-h-screen bg-[#FDFBF7] pb-20">
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-[#E6E1D8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <nav className="flex items-center gap-1.5 text-xs text-[#8E8A83] overflow-x-auto whitespace-nowrap scrollbar-none">
              <Link href="/" className="hover:text-[#4A5D4E] transition-colors">
                หน้าแรก
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-stone-300" />
              <Link href="/articles" className="hover:text-[#4A5D4E] transition-colors">
                บทความน่ารู้
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-stone-300" />
              <span className="text-[#A98336] font-medium">{article.category}</span>
            </nav>
          </div>
        </div>

        {/* Main Article Container */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
          {/* Header Info */}
          <header className="space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9F4E8] text-[#A98336] border border-[#C6A052]/30 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#282522] leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Excerpt Lead */}
            <p className="text-sm sm:text-base text-[#5C5852] font-light leading-relaxed max-w-3xl">
              {article.excerpt}
            </p>

            {/* Author & Meta Bar */}
            <div className="pt-2 pb-4 border-b border-[#E6E1D8] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8E8A83]">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-[#282522]">
                  <User className="w-4 h-4 text-[#C6A052]" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.publishDate}
                </span>
                {article.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    ใช้เวลาอ่าน {article.readTime}
                  </span>
                )}
              </div>

              {/* Client Interactive Share Buttons */}
              <ArticleDetailClient title={article.title} pageUrl={pageUrl} />
            </div>
          </header>

          {/* Hero Cover Image */}
          <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-[#F7F4EE] border border-[#E6E1D8] shadow-md">
            <SafeImage
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Body Content */}
          <div className="bg-white rounded-2xl border border-[#E6E1D8] p-6 sm:p-10 shadow-xs space-y-6">
            <div className="prose prose-stone max-w-none text-xs sm:text-sm text-[#3E3A35] font-light leading-relaxed space-y-5">
              {article.content.split('\n\n').map((paragraph, index) => {
                const trimmed = paragraph.trim();

                // H4 Headings
                if (trimmed.startsWith('#### ')) {
                  return (
                    <h2
                      key={index}
                      className="font-serif text-lg sm:text-xl font-bold text-[#282522] pt-4 pb-1 border-b border-[#E6E1D8] flex items-center gap-2"
                    >
                      <Gem className="w-4 h-4 text-[#C6A052]" />
                      <span>{trimmed.replace('#### ', '')}</span>
                    </h2>
                  );
                }

                // Callout/Tips
                if (trimmed.startsWith('**เคล็ดลับ') || trimmed.startsWith('**ข้อสังเกต')) {
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-[#F7F4EE] border-l-4 border-[#C6A052] text-xs sm:text-sm text-[#4A5D4E] font-medium"
                    >
                      {trimmed}
                    </div>
                  );
                }

                // Bullet Lists
                if (trimmed.includes('\n* ') || trimmed.startsWith('* ')) {
                  const items = trimmed.split('\n* ').map((i) => i.replace(/^\* /, ''));
                  return (
                    <ul key={index} className="space-y-2.5 my-3 pl-2">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A052] shrink-0 mt-2" />
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#282522]">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em class="text-[#8E8A83] text-xs">$1</em>'),
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Numbered Lists
                if (/^\d+\.\s/.test(trimmed)) {
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E6E1D8] space-y-2 my-4"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: trimmed
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#282522]">$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em class="text-[#8E8A83]">$1</em>'),
                        }}
                      />
                    </div>
                  );
                }

                // Regular Paragraph
                return (
                  <p
                    key={index}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: trimmed
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#282522]">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="text-[#8E8A83]">$1</em>'),
                    }}
                  />
                );
              })}
            </div>

            {/* Keyword Tags for SEO */}
            {article.keywords && article.keywords.length > 0 && (
              <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> คำค้นหาที่เกี่ยวข้อง:
                </span>
                {article.keywords.map((kw, i) => (
                  <Link
                    key={i}
                    href={`/shop?q=${encodeURIComponent(kw)}`}
                    className="px-2.5 py-1 bg-[#F7F4EE] hover:bg-[#E8EFEA] text-[#4A5D4E] rounded-md text-xs transition-colors"
                  >
                    #{kw}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Promotion / Shop CTA Banner */}
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#4A5D4E] to-[#37473A] text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#C6A052] text-white">
                คัดเกรดธรรมชาติ 100%
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-medium">
                เลือกชมหินมงคลแท้เสริมดวงเฉพาะคุณได้ที่ สุพรภา
              </h3>
              <p className="text-xs text-emerald-100/90 font-light max-w-xl">
                ผ่านพิธีเบิกเนตรมงคล คัดสรรอัญมณีแท้ ทุกชิ้นมีบัตรรับรองความแท้ Digital Certificate ตรวจสอบได้ทันที
              </p>
            </div>
            <Link
              href="/shop"
              className="shrink-0 px-6 py-3 rounded-xl bg-white text-[#4A5D4E] hover:bg-[#F9F4E8] text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              <span>ชมสินค้าในร้าน</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related Articles Section */}
          <section className="space-y-4 pt-6">
            <div className="flex items-center justify-between border-b border-[#E6E1D8] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#282522] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C6A052]" />
                บทความที่คุณอาจสนใจ
              </h3>
              <Link
                href="/articles"
                className="text-xs text-[#A98336] hover:text-[#4A5D4E] font-medium flex items-center gap-1"
              >
                <span>ดูบทความทั้งหมด</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/articles/${rel.slug}`}
                  className="card-3d group p-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden bg-[#F7F4EE]">
                      <SafeImage
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-medium bg-white/95 text-[#A98336] border border-[#C6A052]/30">
                        {rel.category}
                      </span>
                    </div>
                    <h4 className="font-serif text-xs font-semibold text-[#282522] group-hover:text-[#4A5D4E] line-clamp-2 transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                    <span>{rel.publishDate}</span>
                    <span className="text-[#4A5D4E] font-medium group-hover:translate-x-0.5 transition-transform">
                      อ่านต่อ →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Back to Archive Link */}
          <div className="text-center pt-6">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#E6E1D8] bg-white hover:bg-[#F7F4EE] text-xs font-medium text-[#5C5852] hover:text-[#4A5D4E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่หน้าคลังบทความทั้งหมด</span>
            </Link>
          </div>
        </main>
      </article>
    </>
  );
}
