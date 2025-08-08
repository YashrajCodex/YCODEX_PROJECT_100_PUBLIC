import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BarChart3, 
  FileText, 
  Receipt, 
  User,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const { state } = useAuth();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const navItems = [
    { to: '/', icon: Home, label: 'Home', shortcut: 'Alt+H' },
    { to: '/analysis', icon: BarChart3, label: 'Analysis', shortcut: 'Alt+A' },
    { to: '/report', icon: FileText, label: 'Reports', shortcut: 'Alt+R' },
    { to: '/receipt', icon: Receipt, label: 'Receipts', shortcut: 'Alt+C' },
    { to: '/user', icon: User, label: 'Profile', shortcut: 'Alt+U' },
  ];

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <motion.nav 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-4 shadow-lg z-50"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Expense Tracker</h1>
        <p className="text-sm text-muted-foreground">
          Welcome, {state.user?.username}
        </p>
      </div>

      <div className="space-y-2 mb-8">
        {navItems.map(({ to, icon: Icon, label, shortcut }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`
            }
          >
            <Icon size={20} />
            <span className="flex-1">{label}</span>
            <span className="text-xs opacity-60 group-hover:opacity-100">
              {shortcut}
            </span>
          </NavLink>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          <span>Toggle Theme</span>
          <span className="text-xs opacity-60">Ctrl+T</span>
        </Button>
      </div>
    </motion.nav>
  );
};

export default Navigation;