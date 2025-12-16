import { Link, useLocation } from 'react-router-dom';
import { Shield, Home, Puzzle, Beaker, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserContext } from '../features/UserData/useUserContext';

export function NavBar() {
  const location = useLocation();
  const { user } = useUserContext();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/playground', label: 'Playground', icon: Beaker },
    { path: '/challenges', label: 'Challenges', icon: Puzzle },
    { path: '/simulators', label: 'Simulators', icon: Shield },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="border-b border-border sticky top-0 z-40 backdrop-blur-lg bg-card/90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Shield className="text-primary" size={24} />
            </div>
            <span className="text-xl font-bold text-gradient">CryptoQuest</span>
          </Link>

          <div className="flex items-center gap-1 select-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg transition-colors group ${user?.current === undefined && item.label === "Profile" && "opacity-50"}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      size={18}
                      className={isActive ? 'text-primary' : 'text-slate-200 group-hover:text-foreground group-hover:scale-110'}
                    />
                    <span
                      className={`text-sm font-medium hidden md:inline ${
                        isActive ? 'text-primary' : 'text-slate-200 group-hover:text-foreground group-hover:scale-110'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}