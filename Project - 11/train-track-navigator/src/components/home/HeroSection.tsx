
import React from "react";
import SearchForm from "./SearchForm";

const HeroSection = () => {
  return (
    <section className="relative bg-railway-primary header-clip min-h-[500px] md:min-h-[600px] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-white/10"></div>
        <div className="absolute right-0 bottom-0 w-2/3 h-1/2 bg-white/5 rounded-tl-[200px]"></div>
      </div>
      
      <div className="container mx-auto px-6 py-12 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Travel by Train with Ease
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-md text-blue-100">
              Book your train tickets quickly and securely. Experience smooth journeys on the most scenic routes.
            </p>
            <div className="hidden md:flex gap-4">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="ml-2">Secure Booking</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="ml-2">No Hidden Fees</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
