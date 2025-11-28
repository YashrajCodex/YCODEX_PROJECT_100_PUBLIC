import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import { UILevelProvider } from "./contexts/UILevelContext";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import FunctionDetail from "./pages/FunctionDetail";
import { Login } from "./pages/Login";
import { BookmarkProvider } from "./contexts/BookmarkContext";
import RootLayout from "./pages/RootLayout";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
          {
            path: "/",
            element: <Home />,
            
          },
          {
            path: "/function/:id",
            element: <FunctionDetail />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
      },
    }
  );
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UILevelProvider>
        <AuthProvider>
          <BookmarkProvider>
            <RouterProvider router={router} />
          </BookmarkProvider>
        </AuthProvider>
      </UILevelProvider>
    </ThemeProvider>
  );
}

export default App;
