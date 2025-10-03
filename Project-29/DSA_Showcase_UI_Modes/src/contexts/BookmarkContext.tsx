import { problemDetailsType } from "@/data/problemDetails";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Algorithims extends problemDetailsType {
  userEmail: string;
}

interface BookmarkContextType {
  bookmarks: Algorithims[];
  addBookmark: (userEmail: string, problem: problemDetailsType) => void;
  removeBookmark: (userEmail: string, algoId: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<Algorithims[] | []>([]);
  useEffect(() => {
    const savedBookmark = localStorage.getItem("functionalities_bookmark");
    if (savedBookmark) {
      setBookmarks(JSON.parse(savedBookmark));
    }
  }, []);

  const addBookmark = (userEmail: string, problem: problemDetailsType) => {
    const newBookmark: Algorithims[] = [
      ...bookmarks,
      { ...problem, userEmail },
    ];
    setBookmarks(newBookmark);
    localStorage.setItem(
      "functionalities_bookmark",
      JSON.stringify(newBookmark)
    );
  };
  const removeBookmark = (userEmail: string, algoId: string) => {
    const algoIndex = bookmarks.findIndex(
      (algo) =>
        algo.id.toLocaleString() === algoId && algo.userEmail === userEmail
    );
    const newBookmark: Algorithims[] = bookmarks.filter(
      (_, index) => index !== algoIndex
    );
    if (newBookmark.length === 0) {
      setBookmarks([]);
      localStorage.removeItem("functionalities_bookmark");
    } else {
      setBookmarks([...newBookmark]);
      localStorage.setItem(
        "functionalities_bookmark",
        JSON.stringify(newBookmark)
      );
    }
  };
  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmark must be used within an BookmarkProvider");
  }
  return context;
};
