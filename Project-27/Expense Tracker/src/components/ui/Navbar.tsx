import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, User, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./button";
// import { useTheme } from "@/hooks/useTheme";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({title}) => {
  const { state } = useAuth();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };
  const navItems = [
    { to: "/", icon: Home, label: "Home", shortcut: "Alt+H" },
    { to: "/user", icon: User, label: "Profile", shortcut: "Alt+U" },
  ];

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-16 w-full bg-card border-r border-border shadow-lg z-50 flex justify-around items-center"
    >
      <div className="">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
       { state.isAuthenticated && <p className="text-sm text-muted-foreground">
         Welcome, {state.user?.username}
        </p>}
      </div>
      <div className="flex gap-2">
        <div className="flex gap-2">
          {navItems.map(({ to, icon: Icon, label, shortcut }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
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

        <div className="bottom-4 left-4 right-4">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="sm"
            className="w-full flex items-center gap-2"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            <span>Toggle Theme</span>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
