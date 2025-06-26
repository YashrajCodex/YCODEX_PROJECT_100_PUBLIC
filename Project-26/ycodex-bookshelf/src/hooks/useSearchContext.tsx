import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
