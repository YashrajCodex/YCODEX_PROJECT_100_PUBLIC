import React, { useState, SetStateAction } from "react";
import { SearchContext } from "./SearchContext";

export interface SearchContextType {
  author: string;
  orderBy: "relevance" | "newest";
  selectedGenres: string[];
  searchLogic: "AND" | "OR";
  setAuthor: React.Dispatch<SetStateAction<string>>;
  setOrderBy: React.Dispatch<SetStateAction<string>>;
  setSelectedGenres: React.Dispatch<SetStateAction<string[]>>;
  setSearchLogic: React.Dispatch<SetStateAction<string>>;
}

interface prop {
  children: React.ReactNode;
}
export default function SearchContextProvider({ children }: prop) {
  const [author, setAuthor] = useState<string>("");
  const [orderBy, setOrderBy] = useState<"relevance" | "newest">("relevance");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchLogic, setSearchLogic] = useState<"AND" | "OR">("OR");

  const val = {
    author,
    orderBy,
    selectedGenres,
    searchLogic,
    setAuthor,
    setOrderBy,
    setSelectedGenres,
    setSearchLogic,
  };
  return (
    <SearchContext.Provider value={val}>{children}</SearchContext.Provider>
  );
}
