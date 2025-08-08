import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Receipt, Download, Save, Trash2, Eye } from 'lucide-react';
import { useKeyboardShortcuts } from '@/utils/keyboard';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useAuth } from '@/contexts/AuthContext';
import { addReceipt, deleteReceipt, loadUserReceipts, Receipt as ReceiptType } from '@/store/slices/receiptSlice';
import { saveUserReceipts, loadUserReceipts as loadFromStorage } from '@/utils/localStorage';
import { exportToPDF, exportToPNG } from '@/utils/exportUtils';
import { toast } from '@/hooks/use-toast';

const ReceiptPage = () => {
  const dispatch = useAppDispatch();
  const { state: authState } = useAuth();
  const { receipts } = useAppSelector(state => state.receipts);
  
  const [receiptData, setReceiptData] = useState({
    // Customer Info
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    // Company Info
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    companyPhone: '',
    // Transaction Info
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: '',
    theme: 'classic'
  });

  const [showPreview, setShowPreview] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<ReceiptType | null>(null);

  // Load user receipts on mount
  useEffect(() => {
    if (authState.user) {
      const userReceipts = loadFromStorage(authState.user.id);
      dispatch(loadUserReceipts(userReceipts));
    }
  }, [authState.user, dispatch]);

  // Save receipts when they change
  useEffect(() => {
    if (authState.user && receipts.length > 0) {
      saveUserReceipts(authState.user.id, receipts);
    }
  }, [receipts, authState.user]);

  useKeyboardShortcuts({
    'ctrl+r': () => setShowPreview(true),
    'ctrl+s': () => handleSaveReceipt(),
    'escape': () => setShowPreview(false)
  });

  const handleSaveReceipt = () => {
    if (!authState.user || !receiptData.customerName || !receiptData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer name and amount",
        variant: "destructive"
      });
      return;
    }

    const newReceipt: ReceiptType = {
      id: Date.now().toString(),
      customerInfo: {
        name: receiptData.customerName,
        email: receiptData.customerEmail,
        phone: receiptData.customerPhone
      },
      companyInfo: {
        name: receiptData.companyName,
        address: receiptData.companyAddress,
        email: receiptData.companyEmail,
        phone: receiptData.companyPhone
      },
      transactionInfo: {
        description: receiptData.description,
        amount: parseFloat(receiptData.amount) || 0,
        date: receiptData.date,
        method: receiptData.method
      },
      theme: receiptData.theme,
      createdAt: new Date().toISOString(),
      userId: authState.user.id
    };

    dispatch(addReceipt(newReceipt));
    setCurrentReceipt(newReceipt);
    
    toast({
      title: "Receipt Saved",
      description: "Receipt has been saved successfully"
    });
  };

  const handleDownloadPDF = async () => {
    try {
      await exportToPDF('receipt-preview', `receipt-${currentReceipt?.id || Date.now()}`);
      toast({
        title: "Downloaded",
        description: "Receipt downloaded as PDF successfully"
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
      await exportToPNG('receipt-preview', `receipt-${currentReceipt?.id || Date.now()}`);
      toast({
        title: "Downloaded",
        description: "Receipt downloaded as PNG successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download PNG",
        variant: "destructive"
      });
    }
  };

  const handleDeleteReceipt = (receiptId: string) => {
    dispatch(deleteReceipt(receiptId));
    toast({
      title: "Receipt Deleted",
      description: "Receipt has been removed successfully"
    });
  };

  const handleViewReceipt = (receipt: ReceiptType) => {
    setCurrentReceipt(receipt);
    setReceiptData({
      customerName: receipt.customerInfo.name,
      customerEmail: receipt.customerInfo.email,
      customerPhone: receipt.customerInfo.phone,
      companyName: receipt.companyInfo.name,
      companyAddress: receipt.companyInfo.address,
      companyEmail: receipt.companyInfo.email,
      companyPhone: receipt.companyInfo.phone,
      description: receipt.transactionInfo.description,
      amount: receipt.transactionInfo.amount.toString(),
      date: receipt.transactionInfo.date,
      method: receipt.transactionInfo.method,
      theme: receipt.theme
    });
    setShowPreview(true);
  };

  const themes = [
    { value: 'classic', label: 'Classic', preview: 'border border-gray-300' },
    { value: 'modern', label: 'Modern', preview: 'border-l-4 border-l-blue-500' },
    { value: 'minimal', label: 'Minimal', preview: 'border-t-2 border-t-gray-400' },
    { value: 'colorful', label: 'Colorful', preview: 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' }
  ];

  const paymentMethods = [
    'Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 
    'PayPal', 'Venmo', 'Check', 'Other'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Receipt Generator</h1>
          <p className="text-muted-foreground">
            Create professional receipts for your transactions
          </p>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>⌨️ Ctrl+R: Preview</p>
          <p>⌨️ Ctrl+S: Save</p>
          <p>⌨️ Del: Delete</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receipt Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Receipt Details</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Customer Information</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input
                    id="customer-name"
                    value={receiptData.customerName}
                    onChange={(e) => setReceiptData(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      value={receiptData.customerEmail}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, customerEmail: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-phone">Phone</Label>
                    <Input
                      id="customer-phone"
                      value={receiptData.customerPhone}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Company Information</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="receipt-company-name">Company Name</Label>
                  <Input
                    id="receipt-company-name"
                    value={receiptData.companyName}
                    onChange={(e) => setReceiptData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Your Business Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receipt-company-address">Address</Label>
                  <Input
                    id="receipt-company-address"
                    value={receiptData.companyAddress}
                    onChange={(e) => setReceiptData(prev => ({ ...prev, companyAddress: e.target.value }))}
                    placeholder="123 Business St, City, State 12345"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="receipt-company-email">Email</Label>
                    <Input
                      id="receipt-company-email"
                      type="email"
                      value={receiptData.companyEmail}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, companyEmail: e.target.value }))}
                      placeholder="business@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receipt-company-phone">Phone</Label>
                    <Input
                      id="receipt-company-phone"
                      value={receiptData.companyPhone}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, companyPhone: e.target.value }))}
                      placeholder="(555) 987-6543"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Transaction Details</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="receipt-description">Description</Label>
                  <Input
                    id="receipt-description"
                    value={receiptData.description}
                    onChange={(e) => setReceiptData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Service or product description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="receipt-amount">Amount</Label>
                    <Input
                      id="receipt-amount"
                      type="number"
                      step="0.01"
                      value={receiptData.amount}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receipt-date">Date</Label>
                    <Input
                      id="receipt-date"
                      type="date"
                      value={receiptData.date}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receipt-method">Payment Method</Label>
                  <Select
                    value={receiptData.method}
                    onValueChange={(value) => setReceiptData(prev => ({ ...prev, method: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-4">
              <h4 className="font-semibold">Receipt Theme</h4>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => setReceiptData(prev => ({ ...prev, theme: theme.value }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      receiptData.theme === theme.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`h-8 w-full ${theme.preview} mb-2 rounded`}></div>
                    <p className="text-sm font-medium">{theme.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setShowPreview(true)} className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSaveReceipt} variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Saved Receipts */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Saved Receipts</h3>
            <p className="text-sm text-muted-foreground">Your previously created receipts</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {receipts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No receipts created yet. Generate your first receipt above.
                </p>
              ) : (
                receipts.map((receipt) => (
                  <div key={receipt.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{receipt.customerInfo.name || 'Unnamed Receipt'}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${receipt.transactionInfo.amount.toFixed(2)} - {receipt.transactionInfo.method}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created: {new Date(receipt.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleViewReceipt(receipt)}>
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteReceipt(receipt.id)}>
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
            className="bg-card p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Receipt Preview</h3>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </div>

            {/* Receipt Preview */}
            <div id="receipt-preview" className={`p-6 border rounded-lg bg-background ${
              receiptData.theme === 'modern' ? 'border-l-4 border-l-primary' :
              receiptData.theme === 'minimal' ? 'border-t-2 border-t-muted-foreground' :
              receiptData.theme === 'colorful' ? 'bg-gradient-to-br from-primary/5 to-accent/5' :
              'border-border'
            }`}>
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold">{receiptData.companyName || 'Company Name'}</h2>
                <p className="text-sm text-muted-foreground">{receiptData.companyAddress || 'Address'}</p>
                <p className="text-sm text-muted-foreground">
                  {receiptData.companyEmail || 'Email'} | {receiptData.companyPhone || 'Phone'}
                </p>
              </div>

              <div className="border-t border-b py-3 space-y-2">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{receiptData.date || 'Date'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span>{receiptData.customerName || 'Customer Name'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Description:</span>
                  <span>{receiptData.description || 'Description'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span>{receiptData.method || 'Method'}</span>
                </div>
              </div>

              <div className="pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>${receiptData.amount || '0.00'}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t text-center text-sm text-muted-foreground">
                <p>Thank you for your business!</p>
                <div className="mt-2 h-8 border border-dashed bg-muted/20 flex items-center justify-center">
                  <span className="text-xs">Signature</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={handleDownloadPDF} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button onClick={handleDownloadPNG} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                PNG
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReceiptPage;