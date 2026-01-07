import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceDisplayProps {
  totalIncome: number;
  totalExpense: number;
}

const BalanceDisplay = ({ totalIncome, totalExpense }: BalanceDisplayProps) => {
  const balance = totalIncome - totalExpense;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="card-hover bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Current Balance</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-4">
            <span className={balance >= 0 ? 'text-success' : 'text-danger'}>
              ${Math.abs(balance).toFixed(2)}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Income</p>
                <p className="text-income">${totalIncome.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-danger" />
              <div>
                <p className="text-sm text-muted-foreground">Expenses</p>
                <p className="text-expense">${totalExpense.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BalanceDisplay;