import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Download, Eye, Trash2 } from 'lucide-react';
import { useKeyboardShortcuts } from '@/utils/keyboard';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useAuth } from '@/contexts/AuthContext';
import { addReport, deleteReport, loadUserReports, Report } from '@/store/slices/reportSlice';
import { saveUserReports, loadUserReports as loadFromStorage } from '@/utils/localStorage';
import { exportToPDF, exportToPNG } from '@/utils/exportUtils';
import { toast } from '@/hooks/use-toast';

const ReportPage = () => {
  const dispatch = useAppDispatch();
  const { state: authState } = useAuth();
  const { reports } = useAppSelector(state => state.reports);
  const { transactions } = useAppSelector(state => state.transactions);
  
  const [reportData, setReportData] = useState({
    startDate: '',
    endDate: '',
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    companyPhone: '',
    includeGraph: true
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);

  // Load user reports on mount
  useEffect(() => {
    if (authState.user) {
      const userReports = loadFromStorage(authState.user.id);
      dispatch(loadUserReports(userReports));
    }
  }, [authState.user, dispatch]);

  // Save reports when they change
  useEffect(() => {
    if (authState.user && reports.length > 0) {
      saveUserReports(authState.user.id, reports);
    }
  }, [reports, authState.user]);

  useKeyboardShortcuts({
    'ctrl+g': () => handleGenerateReport(),
    'ctrl+p': () => setShowPreview(true),
    'escape': () => setShowPreview(false)
  });

  const handleGenerateReport = async () => {
    if (!reportData.startDate || !reportData.endDate || !authState.user) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Generate actual report with transaction data
      const filteredTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        const startDate = new Date(reportData.startDate);
        const endDate = new Date(reportData.endDate);
        return transactionDate >= startDate && transactionDate <= endDate;
      });

      const newReport: Report = {
        id: Date.now().toString(),
        title: `Financial Report ${reportData.startDate} to ${reportData.endDate}`,
        dateRange: {
          start: reportData.startDate,
          end: reportData.endDate
        },
        companyInfo: {
          name: reportData.companyName,
          address: reportData.companyAddress,
          email: reportData.companyEmail,
          phone: reportData.companyPhone
        },
        includeGraph: reportData.includeGraph,
        createdAt: new Date().toISOString(),
        userId: authState.user.id
      };

      dispatch(addReport(newReport));
      setCurrentReport(newReport);
      setIsGenerating(false);
      setShowPreview(true);
      
      toast({
        title: "Report Generated",
        description: "Your financial report has been generated successfully"
      });
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      await exportToPDF('report-preview', `financial-report-${currentReport?.id || Date.now()}`);
      toast({
        title: "Downloaded",
        description: "Report downloaded as PDF successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download PDF",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPNG = async () => {
    try {
      await exportToPNG('report-preview', `financial-report-${currentReport?.id || Date.now()}`);
      toast({
        title: "Downloaded",
        description: "Report downloaded as PNG successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download PNG",
        variant: "destructive"
      });
    }
  };

  const handleDeleteReport = (reportId: string) => {
    dispatch(deleteReport(reportId));
    toast({
      title: "Report Deleted",
      description: "Report has been removed successfully"
    });
  };

  const handleViewReport = (report: Report) => {
    setCurrentReport(report);
    setReportData({
      startDate: report.dateRange.start,
      endDate: report.dateRange.end,
      companyName: report.companyInfo.name,
      companyAddress: report.companyInfo.address,
      companyEmail: report.companyInfo.email,
      companyPhone: report.companyInfo.phone,
      includeGraph: report.includeGraph
    });
    setShowPreview(true);
  };

  // Calculate report data
  const filteredTransactions = transactions.filter(t => {
    if (!reportData.startDate || !reportData.endDate) return false;
    const transactionDate = new Date(t.date);
    const startDate = new Date(reportData.startDate);
    const endDate = new Date(reportData.endDate);
    return transactionDate >= startDate && transactionDate <= endDate;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-muted-foreground">
            Generate comprehensive financial reports
          </p>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>⌨️ Ctrl+G: Generate</p>
          <p>⌨️ Ctrl+P: Preview</p>
          <p>⌨️ Del: Delete report</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Generate Report</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={reportData.startDate}
                  onChange={(e) => setReportData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={reportData.endDate}
                  onChange={(e) => setReportData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company Information</h4>
              
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={reportData.companyName}
                  onChange={(e) => setReportData(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Your Company Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-address">Address</Label>
                <Input
                  id="company-address"
                  value={reportData.companyAddress}
                  onChange={(e) => setReportData(prev => ({ ...prev, companyAddress: e.target.value }))}
                  placeholder="Company Address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={reportData.companyEmail}
                    onChange={(e) => setReportData(prev => ({ ...prev, companyEmail: e.target.value }))}
                    placeholder="company@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone</Label>
                  <Input
                    id="company-phone"
                    value={reportData.companyPhone}
                    onChange={(e) => setReportData(prev => ({ ...prev, companyPhone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-graph"
                  checked={reportData.includeGraph}
                  onCheckedChange={(checked) => 
                    setReportData(prev => ({ ...prev, includeGraph: checked as boolean }))
                  }
                />
                <Label htmlFor="include-graph">Include mini graph in report</Label>
              </div>
            </div>

            <Button 
              onClick={handleGenerateReport} 
              className="w-full"
              disabled={isGenerating || !reportData.startDate || !reportData.endDate}
            >
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
          </CardContent>
        </Card>

        {/* Saved Reports */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Saved Reports</h3>
            <p className="text-sm text-muted-foreground">Your previously generated reports</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No reports generated yet. Create your first report above.
                </p>
              ) : (
                reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.dateRange.start} to {report.dateRange.end}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created: {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleViewReport(report)}>
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteReport(report.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPreview(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Report Preview</h3>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </div>

            {/* Report Preview Content */}
            <div id="report-preview" className="space-y-4 p-4 border rounded-lg bg-background">
              <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold">{reportData.companyName || 'Company Name'}</h2>
                <p className="text-muted-foreground">{reportData.companyAddress || 'Company Address'}</p>
                <p className="text-muted-foreground">
                  {reportData.companyEmail || 'Email'} | {reportData.companyPhone || 'Phone'}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Financial Report</h3>
                <p className="text-sm text-muted-foreground">
                  Period: {reportData.startDate} to {reportData.endDate}
                </p>
                <p className="text-sm text-muted-foreground">
                  Transactions analyzed: {filteredTransactions.length}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800">
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">${totalIncome.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">${totalExpenses.toFixed(2)}</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-muted-foreground">Net Balance</p>
                <p className={`text-xl font-bold ${(totalIncome - totalExpenses) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  ${(totalIncome - totalExpenses).toFixed(2)}
                </p>
              </div>

              {reportData.includeGraph && filteredTransactions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Transaction Summary</h4>
                  <div className="space-y-1">
                    {filteredTransactions.slice(0, 5).map((transaction, index) => (
                      <div key={index} className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                        <span>{transaction.description}</span>
                        <span className={transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {filteredTransactions.length > 5 && (
                      <p className="text-xs text-muted-foreground text-center">
                        ... and {filteredTransactions.length - 5} more transactions
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={handleDownloadPDF} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={handleDownloadPNG} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReportPage;