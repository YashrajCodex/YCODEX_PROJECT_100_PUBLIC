import {} from "lucide-react";
import Navbar from "../components/Individual_Components/Navbar";
import Footer from "../components/Individual_Components/Footer";
import { Outlet } from "react-router-dom";

export default function ImageVoiceText() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar title="More Utilities" />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Outlet/>
        </div>
      </div>

      <Footer />
    </div>
  );
}
