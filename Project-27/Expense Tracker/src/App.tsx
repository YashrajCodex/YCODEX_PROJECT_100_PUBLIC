import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/contexts/AuthContext";
import Layouts from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import AnalysisPage from "@/pages/AnalysisPage";
import ReportPage from "@/pages/ReportPage";
import ReceiptPage from "@/pages/ReceiptPage";
import UserPage from "@/pages/UserPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Toaster />
      <BrowserRouter>
        <Layouts>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/receipt" element={<ReceiptPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layouts>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);

export default App;
