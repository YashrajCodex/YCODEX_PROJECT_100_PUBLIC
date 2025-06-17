
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrainFront, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {email, isSignedIn} = useAuth()

  console.log(email.split(" "))

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-4 px-6 md:px-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <TrainFront className="h-6 w-6 text-railway-primary" />
          <span className="text-xl font-bold text-railway-dark">RailRoute</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-railway-dark hover:text-railway-primary transition-colors">
            Home
          </Link>
          <Link to="/routes" className="text-railway-dark hover:text-railway-primary transition-colors">
            Routes
          </Link>
          <Link to="/timetable" className="text-railway-dark hover:text-railway-primary transition-colors">
            Timetable
          </Link>
          <Link to="/contact" className="text-railway-dark hover:text-railway-primary transition-colors">
            Contact
          </Link>
          {isSignedIn ? <p className="px-1 py-1 rounded-md bg-railway-primary hover:bg-railway-secondary text-white">{email}</p>:
            <Link to="/login" className="px-1 py-1 rounded-md bg-railway-primary hover:bg-railway-secondary text-white">
            Sign Up
            </Link>
          }
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-md z-20 animate-fade-in">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" className="text-railway-dark hover:text-railway-primary transition-colors">
              Home
            </Link>
            <Link to="/routes" className="text-railway-dark hover:text-railway-primary transition-colors">
              Routes
            </Link>
            <Link to="/timetable" className="text-railway-dark hover:text-railway-primary transition-colors">
              Timetable
            </Link>
            <Link to="/contact" className="text-railway-dark hover:text-railway-primary transition-colors">
              Contact
            </Link>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1 bg-railway-primary hover:bg-railway-secondary text-white">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
