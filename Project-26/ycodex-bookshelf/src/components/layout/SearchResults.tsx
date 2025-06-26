import { Link } from "react-router-dom";
import { Star, BookOpen } from "lucide-react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { BookItem } from "@/interface/getBooksInterface";

interface SearchResultsProps {
  books: BookItem[];
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
}

export function SearchResults({
  isLoading,
  error,
  onRetry,
  books,
}: SearchResultsProps) {
  if (isLoading) {
    return <LoadingSpinner message="Searching for books..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (books?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <BookOpen className="h-12 w-12 text-text-secondary" />
        <p className="text-text-secondary text-lg">No books found</p>
        <p className="text-text-secondary text-sm">
          Try searching with different keywords
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {books?.map((book) => (
        <SearchBookCard key={book.id} id={ book.id} book={book.volumeInfo} />
      ))}
    </div>
  );
}

interface volumeInfo {
  id: string;
  book: {
    averageRating: number;
    ratingsCount: number;
    title: string;
    subtitle?: string;
    authors?: string[];
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    categories?: string[];
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
  };
}

function SearchBookCard({ id, book }: volumeInfo) {
  return (
    <Link
      to={`/book/${id}`}
      className="group bg-bg-surface rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 glow-hover"
    >
      {/* Book Cover */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book?.imageLinks?.smallThumbnail}
          alt={book?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Book Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-primary font-semibold text-text-primary line-clamp-2 leading-tight group-hover:text-accent transition-colors">
          {book?.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-1">
          by {book?.authors}
        </p>

        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span className="flex items-center space-x-1">
            <BookOpen className="h-3 w-3" />
            <span>{book?.pageCount} pages</span>
          </span>

          {book.averageRating && (
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span>{book?.averageRating}</span>
            </div>
          )}
        </div>

        <div className="pt-2">
          <span className="text-xs text-accent bg-accent bg-opacity-10 px-2 py-1 rounded-full text-white">
            {book?.categories && book?.categories[0]}
          </span>
        </div>
      </div>
    </Link>
  );
}
