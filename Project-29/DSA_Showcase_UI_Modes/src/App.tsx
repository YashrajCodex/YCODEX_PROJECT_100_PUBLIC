import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { UILevelProvider } from "./contexts/UILevelContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { FunctionDetail } from "./pages/FunctionDetail";
import { Login } from "./pages/Login";
import StarfieldCanvas from "./components/UI/StarfieldCanvas";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UILevelProvider>
        <AuthProvider>
          <BrowserRouter>
            <StarfieldCanvas/>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/function/:id" element={<FunctionDetail />} />
                  <Route path="/login" element={<Login />} />
                  {/* <Route path="/" element={<Navigate to="/" replace />} /> */}
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </UILevelProvider>
    </ThemeProvider>
  );
}

export default App;
