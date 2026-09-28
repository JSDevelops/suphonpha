import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const isProdDeploy = process.env.NEXT_PUBLIC_BASE_PATH === '/suphonpha' || process.env.NODE_ENV === 'production';
  const baseUrl = isProdDeploy
    ? 'https://jsdevelops.github.io/suphonpha'
    : (process.env.NEXT_PUBLIC_SITE_URL || 'https://jsdevelops.github.io/suphonpha');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/checkout', '/account'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/checkout', '/account'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
