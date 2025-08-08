import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useGlobalKeyboardShortcuts } from '@/utils/keyboard';
import Navbar from '../ui/Navbar';
import LoginFirst from '../LoginFirst';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { state } = useAuth();
  
  // Initialize global keyboard shortcuts
  useGlobalKeyboardShortcuts();

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar title='Expense Tracker'/>
        <LoginFirst/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="ml-64 p-6"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;