import React from "react";
import { SearchContextType } from "./SearchContextProvider";
export const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined
);
