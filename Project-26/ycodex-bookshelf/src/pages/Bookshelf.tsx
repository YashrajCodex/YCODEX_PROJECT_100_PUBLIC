import { useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { UserProfile } from "../components/User/UserProfile";
import { BookshelfCard } from "../components/bookshelf/BookshelfCard";
import { Filter, Grid, List } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleViewMode } from "@/components/bookshelf/bookshelfSlice";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterComponent from "@/components/common/FilterComponent";
import { BookItem } from "@/interface/getBooksInterface";

const Bookshelf = () => {
  const [searchParams] = useSearchParams();

  const { books: savedBooks, viewMode: savedViewMode } = useSelector(
    (state: RootState) => state.bookshelf
  );

  const Dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const Navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) Navigate("/login");
  }, [isAuthenticated, Navigate]);

  //1. Filter
  const filterValue = searchParams.get("filterBy");
  // console.log(filterValue)

  let filteredBooks: BookItem[];
  if (filterValue === "all") filteredBooks = savedBooks;
  if (filterValue === "read") {
    filteredBooks = savedBooks.filter((read) => read.isRead === true);
    // console.log(filteredbooks)
  }
  if (filterValue === "unread")
    filteredBooks = savedBooks.filter((unread) => unread.isRead === false);
  filteredBooks = savedBooks;

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* User Profile */}
        <UserProfile />

        {/* Bookshelf Header */}
        <div className="flex items-start justify-between mb-8">
          <h2 className="text-3xl font-primary font-bold text-text-primary">
            My Bookshelf
          </h2>

          <div className="flex max-sm:flex-col gap-2 items-center">
            {/* Filter */}
            <FilterComponent
              filterField="books"
              options={[
                { value: "all", label: "all" },
                { value: "read", label: "read" },
                { value: "unread", label: "un-read" },
              ]}
            />
            {/* View Mode Toggle */}
            <div className="flex rounded-lg bg-bg-surface p-1">
              <button
                onClick={() => Dispatch(toggleViewMode())}
                className={`p-2 rounded transition-colors ${
                  savedViewMode === "grid"
                    ? "bg-accent text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => Dispatch(toggleViewMode())}
                className={`p-2 rounded transition-colors ${
                  savedViewMode === "list"
                    ? "bg-accent text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Books Grid/List */}
        {savedBooks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-text-secondary" />
            </div>
            <h3 className="text-xl font-primary font-semibold text-text-primary mb-2">
              No books in your shelf yet
            </h3>
            <p className="text-text-secondary">
              Start exploring and bookmark books to build your collection!
            </p>
          </div>
        ) : (
          <div
            className={`${
              savedViewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }`}
          >
            {filteredBooks.map((book) => (
              <BookshelfCard
                key={book.id}
                book={book}
                viewMode={savedViewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookshelf;
