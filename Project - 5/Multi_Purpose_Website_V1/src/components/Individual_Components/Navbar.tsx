import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Key, Popcorn, Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/text_utils", icon: FileText, label: "Text Utils" },
    { path: "/password_generator", icon: Key, label: "Password Generator" },
    { path: "/popcorn", icon: Popcorn, label: "Popcorn" },
    { path: "/empty_page", icon: Plus, label: "More" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-primary">
              {title}
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-colors ${
                  location.pathname === path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
