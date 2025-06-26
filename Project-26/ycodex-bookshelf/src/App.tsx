import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import SearchContextProvider from "./contexts/SearchContextProvider";
import useLocalStorage from "./hooks/useLocalStorage";
import { AuthProvider } from "./contexts/AuthProvider";
import { RootState } from "./store";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Book from "./pages/Book";
import Bookshelf from "./pages/Bookshelf";
import NotFound from "./pages/NotFound";

function App() {
  const bookshelf = useSelector((state:RootState) => state.bookshelf)
  const user = useSelector((state:RootState) => state.user)

  const [, setBookshelf] = useLocalStorage('bookshelf', bookshelf)
  const [, setUser] = useLocalStorage('users', user)

  useEffect(() => {
    setBookshelf(bookshelf)
  }, [setBookshelf, bookshelf])
  
  useEffect(() => {
    setUser(user)
  },[setUser, user])
    return(
  <ThemeProvider defaultTheme="system" storageKey="bookfury-ui-theme">
    <SearchContextProvider>
          <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/login" element={<Login />} />
                <Route path="/bookshelf" element={<Bookshelf />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
          </AuthProvider>
    </SearchContextProvider>
    </ThemeProvider>
    )
};

export default App;
