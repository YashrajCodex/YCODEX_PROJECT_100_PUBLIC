
import React from "react";
import { Button } from "@/components/ui/button";
import { Ticket, TicketCheck } from "lucide-react";

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-railway-dark mb-6">
              Ready to experience convenient train travel?
            </h2>
            <p className="text-railway-muted mb-8 max-w-md">
              Download our mobile app and enjoy seamless booking experience, real-time updates, and exclusive mobile-only discounts.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-railway-primary/10 p-2 rounded-full">
                    <TicketCheck className="h-5 w-5 text-railway-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-railway-dark mb-1">E-Tickets</h3>
                  <p className="text-sm text-railway-muted">
                    Paperless travel with tickets delivered right to your phone
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-railway-primary/10 p-2 rounded-full">
                    <Ticket className="h-5 w-5 text-railway-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-railway-dark mb-1">Special Discounts</h3>
                  <p className="text-sm text-railway-muted">
                    Access to exclusive deals and seasonal promotions
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-10">
              <Button className="bg-railway-primary hover:bg-railway-secondary text-white">
                Book Now
              </Button>
              <Button variant="outline" className="border-railway-primary text-railway-primary hover:bg-railway-primary hover:text-white">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-railway-primary/10 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-railway-accent/20 rounded-full"></div>
            <div className="relative bg-gray-200 rounded-lg overflow-hidden h-96">
              <img 
                src="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=600&q=80" 
                alt="Train station" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
