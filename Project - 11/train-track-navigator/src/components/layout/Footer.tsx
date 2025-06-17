
import React from "react";
import { Link } from "react-router-dom";
import { TrainFront } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <TrainFront className="h-6 w-6 text-railway-primary" />
              <span className="text-xl font-bold text-railway-dark">RailRoute</span>
            </Link>
            <p className="text-railway-muted text-sm">
              Your premier platform for simple and secure railway bookings across the network.
              Travel with ease and comfort.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold mb-4 text-railway-dark">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-railway-muted hover:text-railway-primary text-sm transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/routes" className="text-railway-muted hover:text-railway-primary text-sm transition-colors">Routes</Link>
              </li>
              <li>
                <Link to="/timetable" className="text-railway-muted hover:text-railway-primary text-sm transition-colors">Timetable</Link>
              </li>
              <li>
                <Link to="/offers" className="text-railway-muted hover:text-railway-primary text-sm transition-colors">Special Offers</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold mb-4 text-railway-dark">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-railway-muted hover:text-railway-primary text-sm transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/faq" className="text-railway-muted hover:text-railway-primary text-sm transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-railway-muted hover:text-railway-primary text-sm transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/terms" className="text-railway-muted hover:text-railway-primary text-sm transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold mb-4 text-railway-dark">Connect With Us</h3>
            <p className="text-railway-muted text-sm mb-4">
              Stay updated with our latest offers and announcements.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-railway-muted hover:text-railway-primary transition-colors">
                {/* Social icon placeholder */}
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xs">FB</span>
                </div>
              </a>
              <a href="#" className="text-railway-muted hover:text-railway-primary transition-colors">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xs">TW</span>
                </div>
              </a>
              <a href="#" className="text-railway-muted hover:text-railway-primary transition-colors">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xs">IG</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-railway-muted">
          <p>&copy; {new Date().getFullYear()} RailRoute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
