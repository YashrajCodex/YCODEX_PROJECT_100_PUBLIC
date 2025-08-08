import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Save } from 'lucide-react';
import { Transaction } from '@/store/slices/transactionSlice';
import { useKeyboardShortcuts } from '@/utils/keyboard';

interface AddTransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'userId'>) => void;
  editingTransaction?: Transaction | null;
  onUpdateTransaction?: (transaction: Transaction) => void;
  onCancelEdit?: () => void;
}

const AddTransactionForm = ({ 
  onAddTransaction, 
  editingTransaction,
  onUpdateTransaction,
  onCancelEdit
}: AddTransactionFormProps) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: '',
    type: 'expense' as 'income' | 'expense'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load editing transaction data
  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        description: editingTransaction.description,
        amount: Math.abs(editingTransaction.amount).toString(),
        date: editingTransaction.date.split('T')[0],
        method: editingTransaction.method,
        type: editingTransaction.type
      });
    }
  }, [editingTransaction]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+a': () => {
      if (!editingTransaction) {
        document.getElementById('transaction-description')?.focus();
      }
    },
    'escape': () => {
      if (editingTransaction && onCancelEdit) {
        onCancelEdit();
      } else {
        resetForm();
      }
    }
  });

  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      method: '',
      type: 'expense'
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount || isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.method) {
      newErrors.method = 'Payment method is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const transactionData = {
      description: formData.description.trim(),
      amount: parseFloat(formData.amount),
      date: formData.date,
      method: formData.method,
      type: formData.type
    };

    if (editingTransaction && onUpdateTransaction) {
      onUpdateTransaction({
        ...editingTransaction,
        ...transactionData
      });
    } else {
      onAddTransaction(transactionData);
      resetForm();
    }
  };

  const paymentMethods = [
    'Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 
    'PayPal', 'Venmo', 'Check', 'Other'
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            {editingTransaction ? <Save className="h-5 w-5" /> : <PlusCircle className="h-5 w-5" />}
            <h3 className="text-lg font-semibold">
              {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
            </h3>
          </div>
          {!editingTransaction && (
            <p className="text-sm text-muted-foreground">
              Press Ctrl+A to quickly add a transaction
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transaction-description">Description</Label>
                <Input
                  id="transaction-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="e.g., Grocery shopping"
                  className={errors.description ? 'border-danger' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-danger">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="transaction-amount">Amount</Label>
                <Input
                  id="transaction-amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                  className={errors.amount ? 'border-danger' : ''}
                />
                {errors.amount && (
                  <p className="text-sm text-danger">{errors.amount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="transaction-date">Date</Label>
                <Input
                  id="transaction-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className={errors.date ? 'border-danger' : ''}
                />
                {errors.date && (
                  <p className="text-sm text-danger">{errors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="transaction-method">Payment Method</Label>
                <Select
                  value={formData.method}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, method: value }))}
                >
                  <SelectTrigger className={errors.method ? 'border-danger' : ''}>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.method && (
                  <p className="text-sm text-danger">{errors.method}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Transaction Type</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    checked={formData.type === 'income'}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'income' | 'expense' }))}
                    className="w-4 h-4"
                  />
                  <span className="text-success font-medium">Income</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    checked={formData.type === 'expense'}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'income' | 'expense' }))}
                    className="w-4 h-4"
                  />
                  <span className="text-danger font-medium">Expense</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
              </Button>
              {editingTransaction && onCancelEdit && (
                <Button type="button" variant="outline" onClick={onCancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddTransactionForm;