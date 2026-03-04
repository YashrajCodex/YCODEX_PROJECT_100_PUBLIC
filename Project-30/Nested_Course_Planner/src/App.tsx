import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { PlanProvider } from "./context/PlanContext";
import { ThemeProvider } from "./context/ThemeContext";

const route = createBrowserRouter([
  {
    element: <Dashboard />,
    path: "/",
  },
  {
    element: <Index />,
    path: "plan/:planId",
  },
  {
    element: <NotFound />,
    path: "*",
  },
]);

const App = () => (
  <PlanProvider>
    <ThemeProvider>
      <RouterProvider router={route} />
    </ThemeProvider>
  </PlanProvider>

  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Dashboard />} />
  //     <Route path="/plan/:planId" element={<Index />} />
  //     {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  //     <Route path="*" element={<NotFound />} />
  //   </Routes>
  // </BrowserRouter>
);

export default App;
