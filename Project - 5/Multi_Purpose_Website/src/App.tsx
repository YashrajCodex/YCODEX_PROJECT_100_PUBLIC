import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import TextUtils from "./pages/TextUtils";
import PasswordGenerator from "./pages/PasswordGenerator";
import Popcorn from "./pages/Popcorn";
import EmptyPage from "./pages/EmptyPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text_utils" element={<TextUtils />} />
        <Route path="/password_generator" element={<PasswordGenerator />} />
        <Route path="/popcorn" element={<Popcorn />} />
        <Route path="/empty_page" element={<EmptyPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
