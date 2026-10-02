/**
 * GOOGLE APPS SCRIPT FOR "SUPHONPHA"
 * -------------------------------------------------------------
 * วิธีใช้งาน:
 * 1. เปิด Google Sheet ที่คุณต้องการใช้เป็นฐานข้อมูล
 * 2. สร้าง 3 แผ่นงาน (Tabs) ตั้งชื่อดังนี้:
 *    - Products
 *    - Certificates
 *    - Orders
 * 3. ไปที่เมนู "ส่วนขยาย" (Extensions) -> "Apps Script"
 * 4. ลบโค้ดเดิมออกทั้งหมด แล้ววางโค้ดชุดนี้ลงไป
 * 5. กดปุ่ม "บันทึก" (ไอคอนแผ่นดิสก์)
 * 6. กดปุ่ม "ทำให้ใช้งานได้" (Deploy) -> "การทำให้ใช้งานได้รายการใหม่" (New deployment)
 * 7. เลือกประเภทเป็น "เว็บแอป" (Web app)
 *    - คำอธิบาย: SUPHONPHA API
 *    - ดำเนินการในฐานะ: ฉัน (Me)
 *    - ผู้มีสิทธิ์เข้าถึง: ทุกคน (Anyone)  <--- สำคัญมาก เพื่อให้เว็บไซต์เชื่อมต่อได้
 * 8. กด "ทำให้ใช้งานได้" (Deploy) แล้วคัดลอก "URL ของเว็บแอป" นำไปใส่ในไฟล์ .env.local
 *    เช่น NEXT_PUBLIC_GOOGLE_SHEET_API_URL="https://script.google.com/macros/s/XXXXX/exec"
 */

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. อ่านข้อมูลสินค้า (Products)
    const productsSheet = ss.getSheetByName('Products');
    const products = productsSheet ? sheetToObjects(productsSheet) : [];

    // 2. อ่านข้อมูลใบรับรอง (Certificates)
    const certsSheet = ss.getSheetByName('Certificates');
    const certificates = certsSheet ? sheetToObjects(certsSheet) : [];

    // 3. อ่านข้อมูลคำสั่งซื้อ (Orders)
    const ordersSheet = ss.getSheetByName('Orders');
    const orders = ordersSheet ? sheetToObjects(ordersSheet) : [];

    // 4. อ่านข้อมูลคำขอสั่งสร้างวัตถุมงคล (Custom Inquiries)
    const inqSheet = ss.getSheetByName('CustomInquiries');
    const inquiries = inqSheet ? sheetToObjects(inqSheet) : [];

    const response = {
      status: 'success',
      timestamp: new Date().toISOString(),
      data: {
        products: products,
        certificates: certificates,
        orders: orders,
        inquiries: inquiries
      }
    };

    // ส่ง Cache-Control header เพื่อให้ browser/CDN cache ผลลัพธ์ 60 วินาที
    // และ stale-while-revalidate 5 นาที (ข้อมูลเก่าใช้ได้ระหว่าง revalidate)
    const output = ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
    return output;
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * keepAlive — ฟังก์ชันสำหรับตั้งเป็น Time-driven Trigger เพื่อ warm up script
 * วิธีตั้ง Trigger:
 * 1. เปิด Apps Script Editor
 * 2. คลิกไอคอน "นาฬิกา" (Triggers) ทางซ้ายมือ
 * 3. กด "+ Add Trigger"
 * 4. เลือก Function: keepAlive, Event source: Time-driven, Interval: Every 5 minutes
 * ผลลัพธ์: Cold start ลดลงจาก 3-8 วินาที → ~0.3-0.5 วินาที
 */
function keepAlive() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Products');
  if (sheet) {
    // อ่านแค่ row แรกเพื่อ warm up connection
    sheet.getRange(1, 1).getValue();
  }
  console.log('[keepAlive] Script warmed at ' + new Date().toISOString());
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let postData = {};

    if (e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    }

    const action = postData.action || 'CREATE_ORDER';

    if (action === 'CREATE_ORDER') {
      let ordersSheet = ss.getSheetByName('Orders');
      if (!ordersSheet) {
        ordersSheet = ss.insertSheet('Orders');
        // สร้างหัวตารางถ้ายังไม่มี
        ordersSheet.appendRow([
          'วันที่เวลา',
          'เลขออเดอร์',
          'ชื่อลูกค้า',
          'เบอร์โทรศัพท์',
          'อีเมล',
          'ที่อยู่จัดส่ง',
          'รายการสินค้า',
          'ยอดสุทธิ (บาท)',
          'วิธีชำระเงิน',
          'ลิงก์สลิปโอนเงิน',
          'สถานะ',
          'บริษัทขนส่ง',
          'เลขติดตามพัสดุ'
        ]);
      }

      const order = postData.order || {};
      const itemsSummary = (order.items || []).map(function(item) {
        return item.title + ' (x' + item.quantity + ')';
      }).join(', ');

      ordersSheet.appendRow([
        new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }),
        order.orderNumber || '',
        order.customerName || '',
        order.customerPhone || '',
        order.customerEmail || '',
        order.shippingAddress || '',
        itemsSummary,
        order.total || 0,
        order.paymentMethod || '',
        order.slipUrl || '',
        order.status || 'รอตรวจสอบสลิป',
        '', // ขนส่ง (รอแอดมินกรอกในชีต)
        ''  // เลขพัสดุ (รอแอดมินกรอกในชีต)
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'บันทึกคำสั่งซื้อลง Google Sheet สำเร็จ',
        orderNumber: order.orderNumber
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. จัดการคำขอสั่งสร้าง / สั่งจองวัตถุมงคล (Custom Amulet / Pre-Order)
    if (action === 'CUSTOM_INQUIRY') {
      let inquirySheet = ss.getSheetByName('CustomInquiries');
      if (!inquirySheet) {
        inquirySheet = ss.insertSheet('CustomInquiries');
        inquirySheet.appendRow([
          'วันที่เวลา',
          'รหัสคำขอสั่งสร้าง',
          'ชื่อผู้ติดต่อ/องค์กร',
          'เบอร์โทรศัพท์',
          'อีเมล',
          'ประเภทวัตถุมงคล',
          'จำนวนที่ต้องการ (ชิ้น)',
          'งบประมาณโดยประมาณ',
          'มวลสารที่มี/ต้องการผสม',
          'ความประสงค์ด้านพิธี',
          'รายละเอียดแบบพุทธศิลป์',
          'สถานะดำเนินการ'
        ]);
      }

      const inquiry = postData.inquiry || {};
      const inquiryId = 'INQ-' + Utilities.formatDate(new Date(), 'GMT+7', 'yyyyMMdd-HHmmss');

      inquirySheet.appendRow([
        new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }),
        inquiryId,
        inquiry.contactName || '',
        inquiry.phone || '',
        inquiry.email || '',
        inquiry.amuletType || '',
        inquiry.quantity || '',
        inquiry.budget || '',
        inquiry.materials || '',
        inquiry.ceremonyNeeds || '',
        inquiry.details || '',
        'รอเจ้าหน้าที่ติดต่อกลับ'
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'บันทึกคำขอสั่งสร้างวัตถุมงคลลง Google Sheet เรียบร้อยแล้ว',
        inquiryId: inquiryId
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. บันทึก / แก้ไขสินค้า (Save or Update Product)
    if (action === 'SAVE_PRODUCT') {
      let productsSheet = ss.getSheetByName('Products');
      const productHeaders = [
        'id',
        'sku',
        'title_th',
        'title_en',
        'category',
        'category_label',
        'short_desc',
        'full_desc',
        'price',
        'sale_price',
        'stock',
        'image_url',
        'dimensions',
        'material',
        'blessing_info',
        'cert_code',
        'is_featured',
        'updated_at'
      ];

      if (!productsSheet) {
        productsSheet = ss.insertSheet('Products');
        productsSheet.appendRow(productHeaders);
      }

      const p = postData.product || {};
      const prodId = p.id || ('prod-' + Utilities.formatDate(new Date(), 'GMT+7', 'yyyyMMdd-HHmmss'));
      const updatedAt = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });

      const newRow = [
        prodId,
        p.sku || '',
        p.titleTh || p.title_th || '',
        p.titleEn || p.title_en || '',
        p.category || 'amulet',
        p.categoryLabelTh || p.category_label || 'วัตถุมงคล',
        p.shortDesc || p.short_desc || '',
        p.fullDesc || p.full_desc || '',
        Number(p.regularPrice || p.price || 0),
        p.salePrice !== undefined && p.salePrice !== null ? Number(p.salePrice) : '',
        Number(p.stock !== undefined ? p.stock : 1),
        p.image || p.image_url || '',
        p.dimensions || '',
        p.material || '',
        p.blessingInfo || p.blessing_info || '',
        p.certificateCode || p.cert_code || '',
        p.isFeatured ? 'true' : 'false',
        updatedAt
      ];

      // ค้นหาว่ามีสินค้ารหัสนี้อยู่แล้วหรือไม่เพื่อทำการแก้ไข (Update)
      const data = productsSheet.getDataRange().getValues();
      let rowIndexToUpdate = -1;

      if (data.length > 1) {
        for (let i = 1; i < data.length; i++) {
          const rowProdId = String(data[i][0]).trim();
          const rowSku = String(data[i][1]).trim();
          if ((p.id && rowProdId === String(p.id).trim()) || (p.sku && rowSku === String(p.sku).trim())) {
            rowIndexToUpdate = i + 1; // 1-based index in Sheet
            break;
          }
        }
      }

      if (rowIndexToUpdate > 0) {
        // อัปเดตแถวเดิม
        productsSheet.getRange(rowIndexToUpdate, 1, 1, newRow.length).setValues([newRow]);
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          message: 'อัปเดตข้อมูลสินค้าสำเร็จ',
          id: prodId
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        // เพิ่มแถวใหม่
        productsSheet.appendRow(newRow);
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          message: 'เพิ่มสินค้าใหม่ลง Google Sheet สำเร็จ',
          id: prodId
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 4. ลบสินค้า (Delete Product)
    if (action === 'DELETE_PRODUCT') {
      const productsSheet = ss.getSheetByName('Products');
      if (!productsSheet) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'ไม่พบแผ่นงาน Products'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      const targetId = String(postData.id || '').trim();
      const targetSku = String(postData.sku || '').trim();

      const data = productsSheet.getDataRange().getValues();
      let deleted = false;

      for (let i = data.length - 1; i >= 1; i--) {
        const rowId = String(data[i][0]).trim();
        const rowSku = String(data[i][1]).trim();
        if ((targetId && rowId === targetId) || (targetSku && rowSku === targetSku)) {
          productsSheet.deleteRow(i + 1);
          deleted = true;
          break;
        }
      }

      if (deleted) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          message: 'ลบสินค้าสำเร็จ'
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'ไม่พบสินค้าที่ต้องการลบ'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 5. อัปเดตสถานะคำสั่งซื้อ & เลขติดตามพัสดุ (Update Order Status)
    if (action === 'UPDATE_ORDER_STATUS') {
      const ordersSheet = ss.getSheetByName('Orders');
      if (!ordersSheet) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'ไม่พบแผ่นงาน Orders'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      const orderNumber = String(postData.orderNumber || '').trim();
      const newStatus = postData.status;
      const courierName = postData.courierName;
      const trackingNumber = postData.trackingNumber;

      const data = ordersSheet.getDataRange().getValues();
      let updated = false;

      for (let i = 1; i < data.length; i++) {
        const rowOrderNum = String(data[i][1]).trim(); // คอลัมน์ "เลขออเดอร์"
        if (rowOrderNum === orderNumber) {
          const rowIdx = i + 1; // 1-based
          if (newStatus !== undefined) {
            ordersSheet.getRange(rowIdx, 11).setValue(newStatus); // คอลัมน์ 11: สถานะ
          }
          if (courierName !== undefined) {
            ordersSheet.getRange(rowIdx, 12).setValue(courierName); // คอลัมน์ 12: บริษัทขนส่ง
          }
          if (trackingNumber !== undefined) {
            ordersSheet.getRange(rowIdx, 13).setValue(trackingNumber); // คอลัมน์ 13: เลขติดตามพัสดุ
          }
          updated = true;
          break;
        }
      }

      if (updated) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          message: 'อัปเดตสถานะคำสั่งซื้อสำเร็จ',
          orderNumber: orderNumber
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'ไม่พบเลขออเดอร์: ' + orderNumber
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 6. บันทึก / แก้ไขใบรับรองวัตถุมงคล (Save or Update Certificate)
    if (action === 'SAVE_CERTIFICATE') {
      let certSheet = ss.getSheetByName('Certificates');
      const certHeaders = [
        'id',
        'cert_number',
        'product_name',
        'image_url',
        'material',
        'dimensions',
        'issued_date',
        'status',
        'blessing_master',
        'notes',
        'verification_count'
      ];

      if (!certSheet) {
        certSheet = ss.insertSheet('Certificates');
        certSheet.appendRow(certHeaders);
      }

      const c = postData.certificate || {};
      const certId = c.id || ('cert-' + Utilities.formatDate(new Date(), 'GMT+7', 'yyyyMMdd-HHmmss'));
      const certNumber = c.certNumber || c.cert_number || ('KDD-2025-' + String(Math.floor(10000 + Math.random() * 90000)));

      const newRow = [
        certId,
        certNumber,
        c.productName || c.product_name || 'วัตถุมงคลรับรองแท้',
        c.image || c.image_url || '/images/products/pendant-buddha.jpg',
        c.materialDetails || c.material || 'มวลสารแท้มาตรฐานสากล',
        c.dimensions || 'ขนาดมาตรฐาน',
        c.issuedDate || c.issued_date || Utilities.formatDate(new Date(), 'GMT+7', 'yyyy-MM-dd'),
        c.status || 'active',
        c.blessingMaster || c.blessing_master || 'พระเกจิอาจารย์ร่วมเจริญพระพุทธมนต์',
        c.notes || '',
        Number(c.verificationCount || c.verification_count || 1)
      ];

      const data = certSheet.getDataRange().getValues();
      let rowIndexToUpdate = -1;

      if (data.length > 1) {
        for (let i = 1; i < data.length; i++) {
          const rowCertId = String(data[i][0]).trim();
          const rowCertNum = String(data[i][1]).trim();
          if ((c.id && rowCertId === String(c.id).trim()) || (certNumber && rowCertNum === certNumber)) {
            rowIndexToUpdate = i + 1;
            break;
          }
        }
      }

      if (rowIndexToUpdate > 0) {
        certSheet.getRange(rowIndexToUpdate, 1, 1, newRow.length).setValues([newRow]);
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          message: 'อัปเดตใบรับรองสำเร็จ',
          certNumber: certNumber
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        certSheet.appendRow(newRow);
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          message: 'ออกใบรับรองใหม่ลง Google Sheet สำเร็จ',
          certNumber: certNumber
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 7. ลบใบรับรอง (Delete Certificate)
    if (action === 'DELETE_CERTIFICATE') {
      const certSheet = ss.getSheetByName('Certificates');
      if (!certSheet) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'ไม่พบแผ่นงาน Certificates'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      const targetCertNum = String(postData.certNumber || '').trim();
      const targetId = String(postData.id || '').trim();

      const data = certSheet.getDataRange().getValues();
      let deleted = false;

      for (let i = data.length - 1; i >= 1; i--) {
        const rowId = String(data[i][0]).trim();
        const rowCertNum = String(data[i][1]).trim();
        if ((targetCertNum && rowCertNum === targetCertNum) || (targetId && rowId === targetId)) {
          certSheet.deleteRow(i + 1);
          deleted = true;
          break;
        }
      }

      if (deleted) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          message: 'ลบใบรับรองสำเร็จ'
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'ไม่พบใบรับรองที่ต้องการลบ'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 8. อัปเดตสถานะคำขอสั่งสร้างวัตถุมงคล (Update Inquiry Status)
    if (action === 'UPDATE_INQUIRY_STATUS') {
      const inquirySheet = ss.getSheetByName('CustomInquiries');
      if (!inquirySheet) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'ไม่พบแผ่นงาน CustomInquiries'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      const inquiryId = String(postData.inquiryId || '').trim();
      const newStatus = postData.status;

      const data = inquirySheet.getDataRange().getValues();
      let updated = false;

      for (let i = 1; i < data.length; i++) {
        const rowInqId = String(data[i][1]).trim(); // คอลัมน์ "รหัสคำขอสั่งสร้าง"
        if (rowInqId === inquiryId) {
          inquirySheet.getRange(i + 1, 13).setValue(newStatus); // คอลัมน์ 13: สถานะดำเนินการ
          updated = true;
          break;
        }
      }

      if (updated) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          message: 'อัปเดตสถานะคำขอเรียบร้อยแล้ว',
          inquiryId: inquiryId
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'ไม่พบรหัสคำขอ: ' + inquiryId
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Unknown action'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ฟังก์ชันแปลงแถวใน Google Sheet เป็น JSON Objects
function sheetToObjects(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0];
  const rows = data.slice(1);

  return rows.map(function(row) {
    const obj = {};
    headers.forEach(function(header, idx) {
      if (header) {
        obj[header.toString().trim()] = row[idx];
      }
    });
    return obj;
  });
}

/**
 * ฟังก์ชันสำหรับติดตั้งและสร้างหัวตารางเริ่มต้น (Run ครั้งแรกครั้งเดียวใน Apps Script)
 * กดเลือกฟังก์ชัน "setupInitialSheets" แล้วกดปุ่ม "เรียกใช้" (Run) ใน Apps Script
 */
function setupInitialSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. สร้างแท็บ Products
  let prodSheet = ss.getSheetByName('Products');
  if (!prodSheet) {
    prodSheet = ss.insertSheet('Products');
  }
  if (prodSheet.getLastRow() === 0) {
    prodSheet.appendRow([
      'id',
      'sku',
      'title_th',
      'title_en',
      'category',
      'category_label',
      'short_desc',
      'full_desc',
      'price',
      'sale_price',
      'stock',
      'image_url',
      'dimensions',
      'material',
      'blessing_info',
      'cert_code',
      'is_featured',
      'updated_at'
    ]);
    // ใส่ตัวอย่างสินค้า 1 ชิ้น
    prodSheet.appendRow([
      'prod-001',
      'KDD-2025-001',
      'เหรียญพระพุทธมงคลจำลอง รุ่นสร้างบารมี',
      'Phra Buddha Mongkol Coin',
      'amulet',
      'วัตถุมงคล',
      'พุทธคุณแคล้วคลาด ปลอดภัย เสริมบารมีและโชคลาภ',
      'ผ่านพิธีมหาพุทธาภิเษกเข้มขลัง เนื้อสัมฤทธิ์โบราณผสมมวลสารศักดิ์สิทธิ์ 108',
      1990,
      1590,
      10,
      '/images/products/pendant-buddha.jpg',
      'กว้าง 2.2 ซม. สูง 3.5 ซม.',
      'สัมฤทธิ์โบราณ ผสมชนวนมวลสาร',
      'พระเกจิอาจารย์ 9 รูป ร่วมอธิษฐานจิต',
      'KDD-2025-00101',
      'true',
      new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })
    ]);
  }

  // 2. สร้างแท็บ Certificates
  let certSheet = ss.getSheetByName('Certificates');
  if (!certSheet) {
    certSheet = ss.insertSheet('Certificates');
  }
  if (certSheet.getLastRow() === 0) {
    certSheet.appendRow([
      'id',
      'cert_number',
      'product_name',
      'image_url',
      'material',
      'dimensions',
      'issued_date',
      'status',
      'blessing_master',
      'notes',
      'verification_count'
    ]);
    certSheet.appendRow([
      'cert-001',
      'KDD-2025-00101',
      'เหรียญพระพุทธมงคลจำลอง รุ่นสร้างบารมี',
      '/images/products/pendant-buddha.jpg',
      'สัมฤทธิ์โบราณ ผสมชนวนมวลสาร',
      'กว้าง 2.2 ซม. สูง 3.5 ซม.',
      '2025-01-01',
      'active',
      'พระเกจิอาจารย์ร่วมเจริญพระพุทธมนต์',
      'ออกโดยศูนย์พระเครื่องสุพรภา (Suphonpha)',
      1
    ]);
  }

  // 3. สร้างแท็บ Orders
  let orderSheet = ss.getSheetByName('Orders');
  if (!orderSheet) {
    orderSheet = ss.insertSheet('Orders');
  }
  if (orderSheet.getLastRow() === 0) {
    orderSheet.appendRow([
      'วันที่เวลา',
      'เลขออเดอร์',
      'ชื่อลูกค้า',
      'เบอร์โทรศัพท์',
      'อีเมล',
      'ที่อยู่จัดส่ง',
      'รายการสินค้า',
      'ยอดสุทธิ (บาท)',
      'วิธีชำระเงิน',
      'ลิงก์สลิปโอนเงิน',
      'สถานะ',
      'บริษัทขนส่ง',
      'เลขติดตามพัสดุ'
    ]);
  }

  // 4. สร้างแท็บ CustomInquiries
  let inqSheet = ss.getSheetByName('CustomInquiries');
  if (!inqSheet) {
    inqSheet = ss.insertSheet('CustomInquiries');
  }
  if (inqSheet.getLastRow() === 0) {
    inqSheet.appendRow([
      'วันที่เวลา',
      'รหัสคำขอสั่งสร้าง',
      'ชื่อผู้ติดต่อ/องค์กร',
      'เบอร์โทรศัพท์',
      'LINE ID',
      'อีเมล',
      'ประเภทวัตถุมงคล',
      'จำนวนที่ต้องการ (ชิ้น)',
      'งบประมาณโดยประมาณ',
      'มวลสารที่มี/ต้องการผสม',
      'ความประสงค์ด้านพิธี',
      'รายละเอียดแบบพุทธศิลป์',
      'สถานะดำเนินการ'
    ]);
  }

  Logger.log('ตั้งค่าชีตทั้ง 4 แท็บเรียบร้อยแล้ว!');
}
