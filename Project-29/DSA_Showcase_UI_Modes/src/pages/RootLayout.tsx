import React from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import StarfieldCanvas from "@/components/UI/StarfieldCanvas";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <StarfieldCanvas />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet/>
        </main>
        <Footer />
      </div>
    </>
  );
}
