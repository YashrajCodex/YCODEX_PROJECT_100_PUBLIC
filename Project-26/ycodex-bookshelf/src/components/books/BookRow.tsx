import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookCard } from "./BookCard";
import { useRef } from "react";
import { BookItem } from "@/interface/getBooksInterface";
import useLocalStorage from "@/hooks/useLocalStorage";

interface BookRowProps {
  title: string;
  error: string;
  loading: boolean;
  books: BookItem[];
  onBookmarkToggle?: (bookId: string, isBookmarked: boolean) => void;
}

export function BookRow({
  title,
  books,
  loading,
}: // onBookmarkToggle
BookRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };
  
  // console.log(books)
  return (
    <div className="mb-8">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-primary font-bold text-text-primary">
          {title}
        </h2>
      </div>

      {/* Books Container */}
      <div className="relative group">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-bg-primary bg-opacity-80 hover:bg-opacity-100 text-text-primary p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 glow-hover"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-bg-primary bg-opacity-80 hover:bg-opacity-100 text-text-primary p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 glow-hover"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Scrollable Books Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {books &&
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                bookLoading={loading}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
