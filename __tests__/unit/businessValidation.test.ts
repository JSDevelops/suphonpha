import { describe, it, expect } from 'vitest';
import { INITIAL_SETTINGS } from '@/data/mockData';

/**
 * Validation utilities for business rules and store data
 */
export function isValidThaiPhone(phone: string): boolean {
  const cleaned = phone.replace(/[-\s]/g, '');
  return /^(0[689]\d{8})$/.test(cleaned);
}

export function isValidThaiTaxId(taxId: string): boolean {
  const cleaned = taxId.replace(/[-\s]/g, '');
  if (!/^\d{13}$/.test(cleaned)) return false;
  
  // Mod 11 check algorithm for Thai 13-digit identification numbers
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleaned.charAt(i), 10) * (13 - i);
  }
  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === parseInt(cleaned.charAt(12), 10);
}

export function isValidBankAccount(accountNumber: string): boolean {
  const cleaned = accountNumber.replace(/[-\s]/g, '');
  return /^\d{10}$/.test(cleaned);
}

describe('Business Rules & Store Credentials Validation', () => {
  describe('Official Store Information (INITIAL_SETTINGS)', () => {
    it('should have the registered legal company name', () => {
      expect(INITIAL_SETTINGS.companyName).toBe('บริษัท สุพรภา จำกัด');
      expect(INITIAL_SETTINGS.bankAccountName).toBe('บริษัท สุพรภา จำกัด');
    });

    it('should have the registered 13-digit corporate tax ID', () => {
      expect(INITIAL_SETTINGS.companyTaxId).toBe('0105569013597');
      expect(INITIAL_SETTINGS.promptPayId).toBe('0105569013597');
      expect(isValidThaiTaxId(INITIAL_SETTINGS.companyTaxId)).toBe(true);
    });

    it('should have a valid Thai mobile contact number', () => {
      expect(INITIAL_SETTINGS.phoneNumber).toBe('065-306-2263');
      expect(isValidThaiPhone(INITIAL_SETTINGS.phoneNumber)).toBe(true);
    });

    it('should have valid Kasikornbank account details', () => {
      expect(INITIAL_SETTINGS.bankName).toBe('ธนาคารกสิกรไทย สาขาสุขุมวิท 101');
      expect(INITIAL_SETTINGS.bankAccountNumber).toBe('237-8-02627-2');
      expect(isValidBankAccount(INITIAL_SETTINGS.bankAccountNumber)).toBe(true);
    });

    it('should contain official address in Phra Khanong, Bangkok', () => {
      expect(INITIAL_SETTINGS.address).toContain('พระโขนง');
      expect(INITIAL_SETTINGS.address).toContain('10260');
      expect(INITIAL_SETTINGS.address).toContain('ซอยริมทางด่วน 2');
    });
  });

  describe('Validation helper functions', () => {
    it('validates Thai mobile phone numbers correctly', () => {
      expect(isValidThaiPhone('065-306-2263')).toBe(true);
      expect(isValidThaiPhone('0812345678')).toBe(true);
      expect(isValidThaiPhone('0999999999')).toBe(true);

      // Invalid phone numbers
      expect(isValidThaiPhone('123456')).toBe(false);
      expect(isValidThaiPhone('02-123-4567')).toBe(false); // Landline not mobile
      expect(isValidThaiPhone('0712345678')).toBe(false); // Invalid mobile prefix
      expect(isValidThaiPhone('abcdefghij')).toBe(false);
    });

    it('validates Thai corporate tax ID with mod11 checksum', () => {
      expect(isValidThaiTaxId('0105569013597')).toBe(true);
      expect(isValidThaiTaxId('0-1055-69013-59-7')).toBe(true);

      // Invalid IDs
      expect(isValidThaiTaxId('0105569013598')).toBe(false); // Invalid checksum
      expect(isValidThaiTaxId('12345')).toBe(false); // Too short
      expect(isValidThaiTaxId('12345678901234')).toBe(false); // Too long
    });

    it('validates 10-digit bank account numbers', () => {
      expect(isValidBankAccount('237-8-02627-2')).toBe(true);
      expect(isValidBankAccount('2378026272')).toBe(true);
      expect(isValidBankAccount('123-4-56789-0')).toBe(true);
      expect(isValidBankAccount('12345')).toBe(false);
    });
  });
});
