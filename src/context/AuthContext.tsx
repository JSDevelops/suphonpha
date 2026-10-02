'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

export interface AdminAccount {
  username: string;
  email: string;
  password: string;
  role: 'super_admin' | 'admin';
  name: string;
  description: string;
}

export const OFFICIAL_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    username: 'superadmin',
    email: 'superadmin@suphonpha.com',
    password: 'Kdd@2025Super!',
    role: 'super_admin',
    name: 'ผู้ดูแลระบบสูงสุด (Super Admin)',
    description: 'มีสิทธิ์สูงสุดทุกฟังก์ชันในระบบ จัดการสินค้า, ออเดอร์, ตรวจสลิป, ออกใบรับรองพระแท้ และงานสั่งสร้าง',
  },
  {
    username: 'admin',
    email: 'admin@suphonpha.com',
    password: 'Kdd@2025Admin!',
    role: 'admin',
    name: 'เจ้าหน้าที่แอดมิน (Admin Staff)',
    description: 'สิทธิ์จัดการสินค้า, ตรวจสอบออเดอร์, กรอกเลขพัสดุจัดส่ง และตรวจเช็คใบรับรอง',
  },
];

interface AuthContextType {
  user: User | null;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  loginWithPhoneOtp: (phone: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('kdd_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default demo customer user
        const defaultUser: User = {
          id: 'usr-customer-1',
          name: 'คุณณัฐพร วงศ์สว่าง',
          email: 'customer@suphonpha.com',
          phone: '081-234-5678',
          role: 'customer',
          emailVerified: true,
          phoneVerified: true,
          consentMarketing: true,
          consentTerms: true,
          createdAt: '2025-01-10',
        };
        setUser(defaultUser);
        localStorage.setItem('kdd_user', JSON.stringify(defaultUser));
      }
    } catch {
      // ignore
    }
  }, []);

  const loginWithEmail = async (identifier: string, pass: string) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (pass || '').trim();

    // 1. ตรวจสอบบัญชี Super Admin
    if (cleanId === 'superadmin' || cleanId === 'superadmin@suphonpha.com' || cleanId === 'superadmin@konduangdee.com') {
      if (cleanPass !== 'Kdd@2025Super!') {
        return { success: false, message: 'รหัสผ่านสำหรับ Super Admin ไม่ถูกต้อง (รหัสคือ Kdd@2025Super!)' };
      }
      const superAdminUser: User = {
        id: 'usr-super-admin',
        name: 'ผู้ดูแลระบบสูงสุด (Super Admin)',
        email: 'superadmin@suphonpha.com',
        role: 'super_admin',
        emailVerified: true,
        phoneVerified: true,
        consentMarketing: true,
        consentTerms: true,
        createdAt: new Date().toISOString(),
      };
      setUser(superAdminUser);
      localStorage.setItem('kdd_user', JSON.stringify(superAdminUser));
      return { success: true, message: 'เข้าสู่ระบบในฐานะ Super Admin เรียบร้อยแล้ว' };
    }

    // 2. ตรวจสอบบัญชี Admin (เจ้าหน้าที่)
    if (cleanId === 'admin' || cleanId === 'admin@suphonpha.com' || cleanId === 'admin@konduangdee.com') {
      if (cleanPass !== 'Kdd@2025Admin!') {
        return { success: false, message: 'รหัสผ่านสำหรับ Admin ไม่ถูกต้อง (รหัสคือ Kdd@2025Admin!)' };
      }
      const adminUser: User = {
        id: 'usr-admin-staff',
        name: 'เจ้าหน้าที่แอดมิน (Admin Staff)',
        email: 'admin@suphonpha.com',
        role: 'admin',
        emailVerified: true,
        phoneVerified: true,
        consentMarketing: true,
        consentTerms: true,
        createdAt: new Date().toISOString(),
      };
      setUser(adminUser);
      localStorage.setItem('kdd_user', JSON.stringify(adminUser));
      return { success: true, message: 'เข้าสู่ระบบในฐานะ Admin เรียบร้อยแล้ว' };
    }

    // 3. ตรวจสอบลูกค้าทั่วไป (Customer)
    if (!cleanId.includes('@')) {
      return { success: false, message: 'กรุณากรอกอีเมลที่ถูกต้อง' };
    }

    const customerUser: User = {
      id: `usr-${Date.now()}`,
      name: identifier.split('@')[0],
      email: identifier,
      role: 'customer',
      emailVerified: true,
      phoneVerified: false,
      consentMarketing: true,
      consentTerms: true,
      createdAt: new Date().toISOString(),
    };
    setUser(customerUser);
    localStorage.setItem('kdd_user', JSON.stringify(customerUser));
    return { success: true, message: 'เข้าสู่ระบบสมาชิกสำเร็จ' };
  };

  const loginWithPhoneOtp = async (phone: string, otp: string) => {
    if (otp !== '123456' && otp.length !== 6) {
      return { success: false, message: 'รหัส OTP ไม่ถูกต้อง (รหัสทดสอบคือ 123456)' };
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: `ผู้ใช้เบอร์ ${phone.slice(-4)}`,
      email: `${phone}@phone.suphonpha.com`,
      phone,
      role: 'customer',
      emailVerified: false,
      phoneVerified: true,
      consentMarketing: true,
      consentTerms: true,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('kdd_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kdd_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmail,
        loginWithPhoneOtp,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
