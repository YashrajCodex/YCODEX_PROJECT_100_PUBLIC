import { Search, Menu, X, SlidersVertical } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useState } from "react";
import { Link } from "react-router-dom";
import AdvancedSearch from "./AdvancedSearch";
import useGetBooks from "@/hooks/useGetBooks";
import { useSearchContext } from "@/hooks/useSearchContext";
import buildGenreQuery from "@/lib/helpers/buildGenreQuery";
import { SearchResults } from "./SearchResults";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchSetting, setSearchSetting] = useState<boolean>(false);
  const { author, orderBy, searchLogic, selectedGenres } = useSearchContext();

  const savedUser = useSelector((state: RootState) => {if(state) return state?.user});

  const user = savedUser?.users[0]

  const { isAuthenticated } = useAuth();
  const finalGenre = buildGenreQuery(selectedGenres, searchLogic);

  const booksData = useGetBooks({
    searchTerm: searchTerm,
    inauthor: author,
    orderType: orderBy,
    subject: finalGenre,
    maxResults: "20",
  });
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("Searching for:", searchTerm);
  };
  // console.log(booksData);
  return (
    <>
      <nav className="sticky top-0 z-50 glass-effect border-b border-border">
        <div
          className={`container ${
            !isMobileMenuOpen && "flex flex-column flex-col-reverse"
          } mx-auto px-4`}
        >
          {/* ********advancedSearchOptions********* */}
          {!isMobileMenuOpen && <AdvancedSearch showAdvanced={searchSetting} />}
          <div className="flex gap-2 items-center justify-between min-h-16">
            <img
              src="/BookFury Logo on Charcoal Background.png"
              alt="BookFury"
              className="rounded-md h-14"
            />
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-primary font-bold text-accent">
                BookFury
              </div>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search books, authors, genres..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-10 pr-4 py-2 bg-bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-text-primary placeholder-text-secondary"
                  />
                  <SlidersVertical
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary"
                    onClick={() => setSearchSetting((s) => !s)}
                  />
                </div>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/bookshelf"
                className="text-text-secondary hover:text-accent transition-colors px-3 py-2 rounded-lg hover:bg-bg-surface"
              >
                My Bookshelf
              </Link>
              <ThemeToggle />
              {isAuthenticated ? (
                <div>
                  <h1 className="text-2xl font-primary font-bold text-text-primary mb-2">
                    {user?.userName}
                  </h1>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center bg-accent text-white px-4 py-2 rounded-lg hover:bg-hover-glow transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setSearchSetting(false);
                }}
                className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-bg-surface transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className=" md:hidden py-4 border-t border-border">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-text-primary placeholder-text-secondary"
                  />
                  <SlidersVertical
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary"
                    onClick={() => setSearchSetting((s) => !s)}
                  />
                </div>
              </form>
              {/* ********advancedSearchOptions*********  */}
              <div>
                <AdvancedSearch showAdvanced={searchSetting} />
              </div>
              {/* Mobile Navigation Links */}
              <div className="space-y-2 flex flex-col">
                <Link
                  to="/bookshelf"
                  className="block text-text-secondary hover:text-accent transition-colors px-3 py-2 rounded-lg hover:bg-bg-surface"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Bookshelf
                </Link>
                {isAuthenticated ? (
                  <div>
                    <h1 className="text-2xl font-primary font-bold text-text-primary mb-2">
                      {user?.userName}
                    </h1>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full text-center bg-accent text-white px-4 py-2 rounded-lg hover:bg-hover-glow transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      {booksData && (
        <SearchResults
        books={booksData?.books?.items}
        isLoading={booksData?.loading}
        error={booksData?.error}
        />
      )}
      </nav>
    </>
  );
}
