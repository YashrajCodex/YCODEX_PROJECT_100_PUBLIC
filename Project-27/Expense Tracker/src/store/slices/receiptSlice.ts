import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Receipt {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  companyInfo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  transactionInfo: {
    description: string;
    amount: number;
    date: string;
    method: string;
  };
  theme: string;
  createdAt: string;
  userId: string;
}

interface ReceiptState {
  receipts: Receipt[];
}

const initialState: ReceiptState = {
  receipts: [],
};

const receiptSlice = createSlice({
  name: 'receipts',
  initialState,
  reducers: {
    addReceipt: (state, action: PayloadAction<Receipt>) => {
      state.receipts.push(action.payload);
    },
    updateReceipt: (state, action: PayloadAction<Receipt>) => {
      const index = state.receipts.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.receipts[index] = action.payload;
      }
    },
    deleteReceipt: (state, action: PayloadAction<string>) => {
      state.receipts = state.receipts.filter(r => r.id !== action.payload);
    },
    loadUserReceipts: (state, action: PayloadAction<Receipt[]>) => {
      state.receipts = action.payload;
    },
    clearReceipts: (state) => {
      state.receipts = [];
    }
  },
});

export const {
  addReceipt,
  updateReceipt,
  deleteReceipt,
  loadUserReceipts,
  clearReceipts
} = receiptSlice.actions;

export default receiptSlice.reducer;