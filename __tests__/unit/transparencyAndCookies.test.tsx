import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import UserGuidePage from '@/app/user-guide/page';
import PrivacyPolicyPage from '@/app/privacy/page';

describe('Cookie Consent and Transparency Features', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders CookieConsentBanner when no consent is saved in localStorage', () => {
    render(<CookieConsentBanner />);
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText(/การใช้คุกกี้และความปลอดภัยข้อมูลส่วนบุคคล/i)).toBeTruthy();
    expect(screen.getByText(/ยอมรับทั้งหมด/i)).toBeTruthy();
    expect(screen.getByText(/เฉพาะที่จำเป็น/i)).toBeTruthy();
  });

  it('saves consent to localStorage when "ยอมรับทั้งหมด" is clicked', () => {
    render(<CookieConsentBanner />);
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    const acceptBtn = screen.getByText(/ยอมรับทั้งหมด/i);
    fireEvent.click(acceptBtn);

    const saved = localStorage.getItem('suphonpha_cookie_consent');
    expect(saved).toBeTruthy();
    const parsed = JSON.parse(saved as string);
    expect(parsed.necessary).toBe(true);
    expect(parsed.analytics).toBe(true);
  });

  it('saves only necessary consent when "เฉพาะที่จำเป็น" is clicked', () => {
    render(<CookieConsentBanner />);
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    const necessaryBtn = screen.getByText(/เฉพาะที่จำเป็น/i);
    fireEvent.click(necessaryBtn);

    const saved = localStorage.getItem('suphonpha_cookie_consent');
    expect(saved).toBeTruthy();
    const parsed = JSON.parse(saved as string);
    expect(parsed.necessary).toBe(true);
    expect(parsed.analytics).toBe(false);
  });

  it('renders UserGuidePage with key steps and transparency assurance', () => {
    vi.useRealTimers();
    render(<UserGuidePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('คู่มือการใช้เว็บไซต์และนโยบายความโปร่งใส');
    expect(screen.getByText(/การเลือกชมและค้นหาวัตถุมงคล/i)).toBeTruthy();
    expect(screen.getByText(/การสั่งซื้อและการชำระเงินผ่านการโอนบัญชีธนาคาร/i)).toBeTruthy();
    expect(screen.getByText(/การตรวจสอบสถานะคำสั่งซื้อและการจัดส่ง/i)).toBeTruthy();
    expect(screen.getByText(/การตรวจสอบบัตรรับรองดิจิทัล/i)).toBeTruthy();
  });

  it('renders PrivacyPolicyPage with Cookie & PDPA sections', () => {
    vi.useRealTimers();
    render(<PrivacyPolicyPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('นโยบายความเป็นส่วนตัว คุกกี้ และความปลอดภัยข้อมูลส่วนบุคคล');
    expect(screen.getByText(/นโยบายการใช้คุกกี้/i)).toBeTruthy();
    expect(screen.getByText(/มาตรการรักษาความปลอดภัยข้อมูลส่วนบุคคล/i)).toBeTruthy();
    expect(screen.getByText(/สิทธิของเจ้าของข้อมูลส่วนบุคคล/i)).toBeTruthy();
  });
});
