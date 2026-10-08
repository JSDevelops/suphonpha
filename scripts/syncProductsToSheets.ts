import { INITIAL_PRODUCTS } from '../src/data/mockData';

const GOOGLE_SHEET_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL ||
  'https://script.google.com/macros/s/AKfycbwnuBZYi9m-RMtnhYSfxqSFvdD9Njcrg3iqjvINPX2gW9LKi5ZtWWvVLV1w1bCXlb_L/exec';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function syncAllProducts() {
  console.log(`Starting sync of ${INITIAL_PRODUCTS.length} products to Google Sheets...`);
  console.log(`Target URL: ${GOOGLE_SHEET_URL}\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < INITIAL_PRODUCTS.length; i++) {
    const product = INITIAL_PRODUCTS[i];
    console.log(`[${i + 1}/${INITIAL_PRODUCTS.length}] Syncing: ${product.id} (${product.titleTh})...`);

    try {
      const res = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'SAVE_PRODUCT',
          product: {
            id: product.id,
            sku: product.sku,
            titleTh: product.titleTh,
            titleEn: product.titleEn,
            category: product.category,
            categoryLabelTh: product.categoryLabelTh,
            shortDesc: product.shortDesc,
            fullDesc: product.fullDesc,
            regularPrice: product.regularPrice,
            salePrice: product.salePrice,
            stock: product.stock,
            image: product.image,
            dimensions: product.dimensions || '',
            material: product.material || '',
            blessingInfo: product.blessingInfo || '',
            certificateCode: product.certificateCode || '',
            isFeatured: !!product.isFeatured,
          },
        }),
        redirect: 'follow',
      });

      const json = await res.json();
      if (json.status === 'success') {
        console.log(`  ✓ Success: ${json.message || 'Saved'}`);
        successCount++;
      } else {
        console.error(`  ✗ Error from sheet:`, json);
        failCount++;
      }
    } catch (err: any) {
      console.error(`  ✗ Network/Script error for ${product.id}:`, err.message);
      failCount++;
    }

    // Wait a brief delay between requests to be gentle to Google Apps Script rate limits
    if (i < INITIAL_PRODUCTS.length - 1) {
      await sleep(600);
    }
  }

  console.log(`\n========================================`);
  console.log(`Sync completed!`);
  console.log(`Total Products: ${INITIAL_PRODUCTS.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`========================================\n`);
}

syncAllProducts().catch(console.error);
