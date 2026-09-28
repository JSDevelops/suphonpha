'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  loginWithPhoneOtp: (phone: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  loginWithLine: () => Promise<{ success: boolean; message?: string }>;
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
          email: 'customer@konduangdee.com',
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

  const loginWithEmail = async (email: string) => {
    // Simulated safe login
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'super_admin' : 'customer',
      emailVerified: true,
      phoneVerified: false,
      consentMarketing: true,
      consentTerms: true,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('kdd_user', JSON.stringify(newUser));
    return { success: true };
  };

  const loginWithPhoneOtp = async (phone: string, otp: string) => {
    if (otp !== '123456' && otp.length !== 6) {
      return { success: false, message: 'รหัส OTP ไม่ถูกต้อง (รหัสทดสอบคือ 123456)' };
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: `ผู้ใช้เบอร์ ${phone.slice(-4)}`,
      email: `${phone}@phone.konduangdee.com`,
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

  const loginWithLine = async () => {
    const newUser: User = {
      id: `usr-line-${Date.now()}`,
      name: 'LINE Customer',
      email: 'line_user@example.com',
      lineId: 'U8974a981c2...',
      role: 'customer',
      emailVerified: true,
      phoneVerified: false,
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
        loginWithLine,
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
