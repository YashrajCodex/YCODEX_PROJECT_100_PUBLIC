import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlice';
import reportReducer from './slices/reportSlice';
import receiptReducer from './slices/receiptSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    reports: reportReducer,
    receipts: receiptReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;