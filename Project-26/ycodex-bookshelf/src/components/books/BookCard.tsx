import { BookItem } from "@/interface/getBooksInterface";
import { BookmarkToggle } from "../common/BookmarkToggle";
import { Link } from "react-router-dom";
import useHandleBookmarkToggle from "@/hooks/useHandleBookmarkToggle";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LoadingSpinner } from "../common/LoadingSpinner";

interface BookCardProps {
  book: BookItem;
  bookLoading: boolean;
  onBookmarkToggle?: (bookId: string, isBookmarked: boolean) => void;
}
export function BookCard({ book, bookLoading }: BookCardProps) {

  const { books: savedBooks } = useSelector(
    (state: RootState) => state.bookshelf
  );
  
  // to handle saved-book state from bookshelf.slice and redux
  const bookmark = savedBooks.includes(book)
  const handleSavedBooks = useHandleBookmarkToggle({
    book: book,
    bookId: book.id,
  });

  if(bookLoading) return <LoadingSpinner message="books are loading" size="sm" key={book.id}/>

  return (
    <div className="group relative min-w-[200px] w-[200px] cursor-pointer glow-hover">
      <Link to={`/book/${book.id}`} className="block">
        {/* Book Cover */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          <img
            src={book.volumeInfo?.imageLinks?.smallThumbnail}
            alt={book.volumeInfo?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Bookmark Button - Top Right */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <BookmarkToggle
              handleBookmarkToggle={handleSavedBooks}
              bookId={book.id}
              bookmark={bookmark}
              size="sm"
            />
          </div>
        </div>
      </Link>

      {/* Book Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-primary font-semibold text-text-primary line-clamp-2 leading-tight group-hover:text-accent transition-colors">
          {book.volumeInfo.title}
        </h3>
        <p className="text-sm text-text-secondary">{book.volumeInfo.authors}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-accent bg-accent bg-opacity-10 px-2 py-1 rounded">
            {book.volumeInfo.categories &&
              book.volumeInfo.categories.map((genre) => (
                <span key={genre} className="text-white">
                  {genre}
                </span>
              ))}
          </span>
          {book.volumeInfo.averageRating && book.volumeInfo.averageRating && (
            <div className="flex items-center space-x-1">
              <span className="text-xs text-text-secondary">★</span>
              <span className="text-xs text-text-secondary">
                {book.volumeInfo.averageRating}/{book.volumeInfo.ratingsCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
