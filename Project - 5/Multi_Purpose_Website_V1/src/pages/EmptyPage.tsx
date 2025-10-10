
import React from 'react';
import { Plus, Wrench } from 'lucide-react';
import Navbar from '../components/multiutils/reusable/Navbar';
import Footer from '../components/multiutils/reusable/Footer';

const EmptyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar title="More Utilities" />
      
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Wrench size={48} className="text-accent-foreground" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">More Utilities Coming Soon</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              This space is reserved for additional utilities and features. 
              We're constantly working to add more tools to make your experience even better.
            </p>
            
            <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Plus size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-card-foreground mb-4">
                Future Functionality
              </h2>
              <p className="text-muted-foreground">
                This page will be used to add new utilities and features based on user needs and feedback. 
                Stay tuned for exciting updates!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmptyPage;
