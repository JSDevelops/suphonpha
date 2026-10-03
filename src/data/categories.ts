export interface SubCategoryItem {
  id: string;
  label: string;
  description?: string;
  badge?: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  iconName?: string;
  subCategories?: SubCategoryItem[];
  description?: string;
}

export const PRODUCT_CATEGORIES: CategoryItem[] = [
  {
    id: 'amulet',
    label: 'พระเครื่อง',
    description: 'พระเครื่องยอดนิยม พระเกจิอาจารย์ พระกรุ และพระแท้ผ่านพิธี',
    subCategories: [
      { id: 'buddha-statue', label: 'พระพุทธรูปบูชา & หล่อจำลอง', description: 'พระพุทธรูปขนาดบูชา และพระพุทธพิมพ์ศักดิ์สิทธิ์' },
      { id: 'monk-powder', label: 'พระผงพุทธคุณ & พระสมเด็จ', description: 'มวลสารเกสร 108 และผงพุทธคุณศักดิ์สิทธิ์' },
      { id: 'monk-pendant', label: 'พระกริ่ง & พระเครื่องเลี่ยมกรอบทอง', description: 'เลี่ยมกรอบทองไมครอนหนาพิเศษ พร้อมแขวนบูชา' },
    ],
  },
  {
    id: 'coin',
    label: 'เหรียญ',
    description: 'เหรียญพระเกจิอาจารย์ เหรียญหล่อ และเหรียญที่ระลึกมงคล',
    subCategories: [
      { id: 'monk-coin', label: 'เหรียญพระเกจิยอดนิยม', description: 'เหรียญคณาจารย์ผู้ทรงอภิญญาและบารมี' },
      { id: 'deity-coin', label: 'เหรียญเทพ & เทวรูปมงคล', description: 'เหรียญท้าวเวสสุวรรณ, พระพิฆเนศ, พระพรหม' },
      { id: 'memorial-coin', label: 'เหรียญหล่อ & เหรียญที่ระลึก', description: 'พิธีปลุกเสกวาระพิเศษ เนื้อโลหะชนวนศักดิ์สิทธิ์' },
    ],
  },
  {
    id: 'bracelet',
    label: 'กำไลหินมงคล',
    description: 'กำไลและสร้อยข้อมือหินธรรมชาติแท้ 100% คัดเกรดพรีเมียม',
    subCategories: [
      { id: 'stone-natural', label: 'หินธรรมชาติแท้คัดเกรด AAA', description: 'สตรอว์เบอร์รีควอตซ์, อาเกต, ออบซิเดียน' },
      { id: 'stone-rutilated', label: 'ไหมทอง & ไทเกอร์อายส์ เสริมทรัพย์', description: 'ดึงดูดโชคลาภ เงินทอง อำนาจบารมี' },
      { id: 'stone-jade', label: 'หยกแท้ 5 สี เสริมเบญจธาตุ', description: 'หยกพม่าธรรมชาติ ชนิด A เสริมสุขภาพและความสงบ' },
      { id: 'stone-cord', label: 'กำไลเชือกถัก & ข้อเงินแท้ 925', description: 'เชือกถักแว็กซ์ปรับระดับได้ คั่นเงินแท้ 925' },
    ],
  },
  {
    id: 'ring',
    label: 'แหวน (หินมงคล, อัญมณี)',
    description: 'แหวนนพเก้า แหวนกังหัน และแหวนอัญมณีแท้เสริมสิริมงคล',
    subCategories: [
      { id: 'ring-stone', label: 'แหวนหินมงคลธรรมชาติ', description: 'หัวแหวนหินแท้ พลังธาตุธรรมชาติ' },
      { id: 'ring-gemstone', label: 'แหวนอัญมณีนพเก้าแท้ (9 รัตนชาติ)', description: 'ตัวเรือนทองคำแท้ ฝังอัญมณีมงคล 9 ประการ' },
      { id: 'ring-windmill', label: 'แหวนกังหันนำโชค วัดแชกงหมิว', description: 'ใบพัดหมุนคล่องตัว ดึงดูดโชคลาภ ปัดเป่าสิ่งไม่ดี' },
    ],
  },
  {
    id: 'necklace',
    label: 'สร้อย, จี้',
    description: 'สร้อยคอ สร้อยข้อมือสายโซ่ และจี้มงคลเลี่ยมทอง',
    subCategories: [
      { id: 'chain-pyrite', label: 'สร้อยสายโซ่ & ไพไรต์เพชรหน้าทั่ง', description: 'ดีไซน์ T-Bar ร่วมสมัย สลับหินแร่ธรรมชาติ' },
      { id: 'pendant-ganesha', label: 'จี้พระพิฆเนศ & เทพมงคล', description: 'จี้หล่อพิมพ์จิ๋ว เลี่ยมกรอบทองคำแท้' },
      { id: 'pendant-locket', label: 'จี้ล็อกเก็ต & พระประจำวันเกิด', description: 'เสริมดวงชะตาตามราศีและวันเกิด' },
    ],
  },
  {
    id: 'sticker',
    label: 'สติ๊กเกอร์ยันต์',
    description: 'สติ๊กเกอร์ยันต์และแผ่นทองมงคลติดหลังเคสมือถือ เริ่มต้น 99 บาท',
    subCategories: [
      { id: 'sticker-phone', label: 'สติ๊กเกอร์ยันต์ติดหลังมือถือ (99.-)', description: 'แผ่นฟอยล์ทองนูนพิเศษ กาวไม่ทิ้งคราบ' },
      { id: 'sticker-wallet', label: 'แผ่นทองยันต์เรียกทรัพย์ใส่กระเป๋าเงิน', description: 'ยันต์มหาโภคทรัพย์ เสริมความคล่องตัวทางการเงิน' },
      { id: 'sticker-home', label: 'แผ่นยันต์ติดอาคาร หน้าร้าน & รถยนต์', description: 'แคล้วคลาด ปลอดภัย เสริมกิจการการค้า' },
    ],
  },
];
