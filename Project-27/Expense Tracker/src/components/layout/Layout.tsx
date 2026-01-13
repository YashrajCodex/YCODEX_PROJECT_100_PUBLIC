import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useGlobalKeyboardShortcuts } from "@/utils/keyboard";
import Navbar from "../ui/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // const { state } = useAuth();

  // Initialize global keyboard shortcuts
  useGlobalKeyboardShortcuts();

  // if (!state.isAuthenticated) {
  //   return (
  //     <div className="min-h-screen bg-background">
  //       <Navbar title='Expense Tracker'/>
  //       <LoginFirst/>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">
      <Navbar title="Expense Tracker" />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 p-12"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
