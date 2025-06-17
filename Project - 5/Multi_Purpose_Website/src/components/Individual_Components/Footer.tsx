
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">
            © 2024 MultiUtils. A comprehensive utility platform for all your needs.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Built with React, Tailwind CSS, and Lucide Icons
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
