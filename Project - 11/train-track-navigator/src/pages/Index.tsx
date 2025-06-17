
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import PopularRoutesSection from "@/components/home/PopularRoutesSection";
import CtaSection from "@/components/home/CtaSection";
import PnrSection from "@/components/home/pnrSection/PnrSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <PnrSection />
        {/* <PopularRoutesSection /> */}
        {/* <CtaSection /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
