import { Transaction } from '@/store/slices/transactionSlice';
import { Report } from '@/store/slices/reportSlice';
import { Receipt } from '@/store/slices/receiptSlice';

// Transaction utilities
export const saveUserTransactions = (userId: string, transactions: Transaction[]) => {
  localStorage.setItem(`transactions_${userId}`, JSON.stringify(transactions));
};

export const loadUserTransactions = (userId: string): Transaction[] => {
  const saved = localStorage.getItem(`transactions_${userId}`);
  return saved ? JSON.parse(saved) : [];
};

// Report utilities
export const saveUserReports = (userId: string, reports: Report[]) => {
  localStorage.setItem(`reports_${userId}`, JSON.stringify(reports));
};

export const loadUserReports = (userId: string): Report[] => {
  const saved = localStorage.getItem(`reports_${userId}`);
  return saved ? JSON.parse(saved) : [];
};

// Receipt utilities
export const saveUserReceipts = (userId: string, receipts: Receipt[]) => {
  localStorage.setItem(`receipts_${userId}`, JSON.stringify(receipts));
};

export const loadUserReceipts = (userId: string): Receipt[] => {
  const saved = localStorage.getItem(`receipts_${userId}`);
  return saved ? JSON.parse(saved) : [];
};