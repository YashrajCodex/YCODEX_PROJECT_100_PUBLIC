import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppSelector } from '@/hooks/redux';
import { BarChart3, Filter, Download, Calendar } from 'lucide-react';
import { useKeyboardShortcuts } from '@/utils/keyboard';
import { exportChartToPNG } from '@/utils/exportUtils';
import { toast } from '@/hooks/use-toast';

const AnalysisPage = () => {
  const { transactions } = useAppSelector(state => state.transactions);
  const chartRef = useRef<HTMLDivElement>(null);
  const [dateRange, setDateRange] = useState('30');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  useKeyboardShortcuts({
    '/': () => {
      document.getElementById('min-amount')?.focus();
    },
    'ctrl+d': async () => {
      try {
        await exportChartToPNG(chartRef, `financial-analysis-${Date.now()}`);
        toast({
          title: "Downloaded",
          description: "Chart downloaded successfully"
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to download chart",
          variant: "destructive"
        });
      }
    },
    'escape': () => {
      setMinAmount('');
      setMaxAmount('');
      setDateRange('30');
      toast({
        title: "Filters Reset",
        description: "All filters have been cleared"
      });
    }
  });

  // Filter transactions based on selected criteria
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const daysAgo = parseInt(dateRange);
    const startDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));

    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const amount = Math.abs(transaction.amount);

      // Date filter
      if (transactionDate < startDate) return false;

      // Amount filters
      if (minAmount && amount < parseFloat(minAmount)) return false;
      if (maxAmount && amount > parseFloat(maxAmount)) return false;

      return true;
    });
  }, [transactions, dateRange, minAmount, maxAmount]);

  // Prepare chart data
  const chartData = useMemo(() => {
    const dataMap = new Map();

    filteredTransactions.forEach(transaction => {
      const date = transaction.date.split('T')[0]; // Get YYYY-MM-DD format
      
      if (!dataMap.has(date)) {
        dataMap.set(date, { date, income: 0, expense: 0 });
      }

      const data = dataMap.get(date);
      if (transaction.type === 'income') {
        data.income += transaction.amount;
      } else {
        data.expense += Math.abs(transaction.amount);
      }
    });

    return Array.from(dataMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredTransactions]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      income,
      expense,
      balance: income - expense,
      count: filteredTransactions.length
    };
  }, [filteredTransactions]);

  const dateRangeOptions = [
    { value: '7', label: '7 Days' },
    { value: '15', label: '15 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '3 Months' },
    { value: '180', label: '6 Months' },
    { value: '365', label: '1 Year' }
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
          <h1 className="text-3xl font-bold">Financial Analysis</h1>
          <p className="text-muted-foreground">
            Visualize your spending patterns and trends
          </p>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>⌨️ /: Focus filters</p>
          <p>⌨️ Ctrl+D: Download</p>
          <p>⌨️ Esc: Reset filters</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="min-amount">Min Amount</Label>
              <Input
                id="min-amount"
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-amount">Max Amount</Label>
              <Input
                id="max-amount"
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="No limit"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">${summary.income.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Income</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-danger">${summary.expense.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-success' : 'text-danger'}`}>
                  ${Math.abs(summary.balance).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Net Balance</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{summary.count}</p>
                <p className="text-sm text-muted-foreground">Transactions</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Income vs Expenses Over Time</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                try {
                  await exportChartToPNG(chartRef, `financial-analysis-${Date.now()}`);
                  toast({
                    title: "Downloaded",
                    description: "Chart downloaded successfully"
                  });
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to download chart",
                    variant: "destructive"
                  });
                }
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Chart
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div ref={chartRef}>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value: number, name: string) => [
                      `$${value.toFixed(2)}`, 
                      name === 'income' ? 'Income' : 'Expenses'
                    ]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    name="Income"
                    dot={{ fill: 'hsl(var(--success))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expense" 
                    stroke="hsl(var(--danger))" 
                    strokeWidth={3}
                    name="Expenses"
                    dot={{ fill: 'hsl(var(--danger))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-96 text-muted-foreground">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4" />
                  <p>No data available for the selected filters</p>
                  <p className="text-sm">Try adjusting your date range or amount filters</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalysisPage;