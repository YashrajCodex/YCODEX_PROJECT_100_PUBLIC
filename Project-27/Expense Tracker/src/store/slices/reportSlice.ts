import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Report {
  id: string;
  title: string;
  dateRange: {
    start: string;
    end: string;
  };
  companyInfo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  includeGraph: boolean;
  createdAt: string;
  userId: string;
}

interface ReportState {
  reports: Report[];
}

const initialState: ReportState = {
  reports: [],
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReport: (state, action: PayloadAction<Report>) => {
      state.reports.push(action.payload);
    },
    deleteReport: (state, action: PayloadAction<string>) => {
      state.reports = state.reports.filter(r => r.id !== action.payload);
    },
    loadUserReports: (state, action: PayloadAction<Report[]>) => {
      state.reports = action.payload;
    },
    clearReports: (state) => {
      state.reports = [];
    }
  },
});

export const { addReport, deleteReport, loadUserReports, clearReports } = reportSlice.actions;
export default reportSlice.reducer;