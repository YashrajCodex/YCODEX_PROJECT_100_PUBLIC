import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Calendar, CreditCard } from 'lucide-react';
import { Transaction } from '@/store/slices/transactionSlice';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionItem = ({ transaction, onEdit, onDelete }: TransactionItemProps) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      className={`p-4 rounded-lg border-l-4 ${
        transaction.type === 'income' 
          ? 'border-l-success bg-success-light/10' 
          : 'border-l-danger bg-danger-light/10'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">
            {transaction.description}
          </h4>
          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(transaction.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <CreditCard size={14} />
              {transaction.method}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`font-bold text-lg ${
            transaction.type === 'income' ? 'text-success' : 'text-danger'
          }`}>
            {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
          </span>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(transaction)}
              className="h-8 w-8 p-0"
            >
              <Edit size={14} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(transaction.id)}
              className="h-8 w-8 p-0 hover:bg-danger hover:text-danger-foreground"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface TransactionHistoryProps {
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

const TransactionHistory = ({ 
  transactions, 
  onEditTransaction, 
  onDeleteTransaction 
}: TransactionHistoryProps) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <p className="text-sm text-muted-foreground">
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </p>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {sortedTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No transactions yet</p>
            <p className="text-sm">Add your first transaction to get started</p>
          </div>
        ) : (
          sortedTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;