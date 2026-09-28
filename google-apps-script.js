/**
 * GOOGLE APPS SCRIPT FOR "คนดวงดี 2025" (KON DUANG DEE 2025)
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
 *    - คำอธิบาย: Kon Duang Dee API
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

    const response = {
      status: 'success',
      timestamp: new Date().toISOString(),
      data: {
        products: products,
        certificates: certificates,
        orders: orders
      }
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
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
