import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useAuth } from "@/contexts/AuthContext";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  loadUserTransactions,
  Transaction,
} from "@/store/slices/transactionSlice";
import {
  saveUserTransactions,
  loadUserTransactions as loadFromStorage,
} from "@/utils/localStorage";
import { useKeyboardShortcuts } from "@/utils/keyboard";
import BalanceDisplay from "@/components/features/home/BalanceDisplay";
import TransactionHistory from "@/components/features/home/TransactionHistory";
import AddTransactionForm from "@/components/features/home/AddTransactionForm";
import { toast } from "@/hooks/use-toast";
import LoginFirst from "@/components/features/home/LoginFirst";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { state: authState } = useAuth();
  const { transactions } = useAppSelector((state) => state.transactions);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  // Load user transactions on mount
  useEffect(() => {
    if (authState.user) {
      const userTransactions = loadFromStorage(authState.user.id);
      dispatch(loadUserTransactions(userTransactions));
    }
  }, [authState.user, dispatch]);

  // Save transactions when they change
  useEffect(() => {
    if (authState.user && transactions.length > 0) {
      saveUserTransactions(authState.user.id, transactions);
    }
  }, [transactions, authState.user]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    delete: () => {
      // Delete focused transaction - you could expand this with focus management
      toast({
        title: "Delete Transaction",
        description: "Select a transaction and press Delete to remove it",
      });
    },
  });

  const handleAddTransaction = (
    transactionData: Omit<Transaction, "id" | "userId">
  ) => {
    if (!authState.user)
      return toast({
        title: "Login to add transaction",
        description: "go to user page to add transaction.",
      });

    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      userId: authState.user.id,
    };

    dispatch(addTransaction(newTransaction));
    toast({
      title: "Transaction Added",
      description: `${
        transactionData.type === "income" ? "Income" : "Expense"
      } of $${transactionData.amount} added successfully`,
    });
  };

  const handleUpdateTransaction = (transaction: Transaction) => {
    dispatch(updateTransaction(transaction));
    setEditingTransaction(null);
    toast({
      title: "Transaction Updated",
      description: "Transaction has been updated successfully",
    });
  };

  const handleDeleteTransaction = (id: string) => {
    dispatch(deleteTransaction(id));
    toast({
      title: "Transaction Deleted",
      description: "Transaction has been removed successfully",
    });
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    // Scroll to form
    setTimeout(() => {
      document.getElementById("transaction-description")?.focus();
    }, 100);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  if (!authState.isAuthenticated) return <LoginFirst />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your income and expenses all in one app
          </p>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>⌨️ Ctrl+A: Add transaction</p>
          <p>⌨️ Del: Delete selected</p>
          <p>⌨️ Alt+H: Home</p>
        </div>
      </div>

      {/* Balance Overview */}
      <BalanceDisplay totalIncome={totalIncome} totalExpense={totalExpense} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Transaction Form */}
        <AddTransactionForm
          onAddTransaction={handleAddTransaction}
          editingTransaction={editingTransaction}
          onUpdateTransaction={handleUpdateTransaction}
          onCancelEdit={handleCancelEdit}
        />

        {/* Transaction History */}
        <TransactionHistory
          transactions={transactions}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card p-4 rounded-lg border"
        >
          <h4 className="font-semibold text-muted-foreground">
            Total Transactions
          </h4>
          <p className="text-2xl font-bold">{transactions.length}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card p-4 rounded-lg border"
        >
          <h4 className="font-semibold text-muted-foreground">This Month</h4>
          <p className="text-2xl font-bold">
            {
              transactions.filter((t) => {
                const transactionDate = new Date(t.date);
                const now = new Date();
                return (
                  transactionDate.getMonth() === now.getMonth() &&
                  transactionDate.getFullYear() === now.getFullYear()
                );
              }).length
            }
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card p-4 rounded-lg border"
        >
          <h4 className="font-semibold text-muted-foreground">
            Average Transaction
          </h4>
          <p className="text-2xl font-bold">
            $
            {transactions.length > 0
              ? ((totalIncome + totalExpense) / transactions.length).toFixed(2)
              : "0.00"}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
