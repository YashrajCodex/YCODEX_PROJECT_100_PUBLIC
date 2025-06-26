import { BookOpen, Calendar } from "lucide-react";
import { BookmarkToggle } from "../common/BookmarkToggle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BookItem } from "@/interface/getBooksInterface";
import useHandleBookmarkToggle from "@/hooks/useHandleBookmarkToggle";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

interface BookshelfCardProps {
  book: BookItem;
  viewMode?: "grid" | "list";
}

export function BookshelfCard({ book, viewMode = "grid" }: BookshelfCardProps) {

  const handleSavedBooks = useHandleBookmarkToggle({
    book: book,
    bookId: book.id,
  });
  const {
    title,
    authors,
    categories,
    imageLinks,
    pageCount,
    ratingsCount,
    publishedDate,
  } = book.volumeInfo;
  const bookmark = book.bookmark;
  console.log(bookmark)
  // console.log(book)
  if (viewMode === "list") {
    return (
      <div className="glass-effect rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center space-x-4">
          {/* Book Cover - Smaller for list view */}
          {/* <Link to="/book" state={{ book }} className="flex-shrink-0"> */}
          <Link to={`/book/${book.id}`} className="flex-shrink-0">
            <div className="w-16 h-24 rounded overflow-hidden shadow-md">
              <img
                src={imageLinks && imageLinks?.smallThumbnail}
                alt={title && title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Book Info */}
          <div className="flex-1 min-w-0">
            {/* <Link to="/book" state={{ book }}> */}
            <Link to={`/book/${book.id}`}>
              <h3 className="font-primary font-semibold text-text-primary hover:text-accent transition-colors line-clamp-1">
                {title && title} 
              </h3>
            </Link>
            <p className="text-text-secondary text-sm mb-2">
              {authors.length !== 0 &&
                authors.map((author) => <span>| {author} |</span>)}
            </p>

            <div className="flex items-center flex-wrap gap-2 space-x-4 text-xs text-text-secondary">
              {categories.length !== 0 &&
                categories.map((genre) => (
                  <span className="bg-accent bg-opacity-10 text-accent px-2 py-1 rounded text-white">
                    || {genre} ||
                  </span>
                ))}

              {pageCount && (
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-3 w-3" />
                  <span>{pageCount} pages</span>
                </div>
              )}
              {ratingsCount && (
                <div className="flex items-center space-x-1">
                  <span>★</span>
                  <span>{ratingsCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <BookmarkToggle
              bookId={book.id}
              handleBookmarkToggle={handleSavedBooks}
              bookmark={bookmark ? true : false}
              size="sm"
            />
            {book?.isRead && (
              <div className="w-3 h-3 bg-green-500 rounded-full" title="Read" />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="glass-effect rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 glow-hover">
      {/* Book Cover */}
      <Link to={`/book/${book.id}`} className="block mb-3">
        {/* <Link to="/book" state={{ book }} className="block mb-3"> */}
        <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md group">
          <img
            src={imageLinks && imageLinks?.thumbnail}
            alt={title && title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Book Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <Link to="/book">
              {/* <Link to="/book" state={{ book }}> */}
              <h3 className="font-primary font-semibold text-text-primary hover:text-accent transition-colors line-clamp-2 leading-tight">
                {title && title}
              </h3>
            </Link>
            <p className="text-text-secondary text-sm">
              {authors.length !== 0 &&
                authors?.map((author) => <span>| {author} |</span>)}
            </p>
          </div>

          <div className="flex items-center space-x-1 ml-2">
            <BookmarkToggle
              handleBookmarkToggle={handleSavedBooks}
              bookId={book.id}
              bookmark={bookmark ? true : false}
              size="sm"
            />
            {book.isRead && (
              <div className="w-3 h-3 bg-green-500 rounded-full" title="Read" />
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-2 items-center justify-between text-xs text-text-secondary">
          {categories.length !== 0 &&
            categories?.map((genre) => (
              <span className="bg-accent bg-opacity-10 text-accent px-2 py-1 rounded text-white">
                || {genre} ||
              </span>
            ))}
          {pageCount && (
            <div className="flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>{pageCount}p</span>
            </div>
          )}
        </div>

        {/* Rating & Status */}
        <div className="flex items-center justify-between">
          {ratingsCount && (
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <span>★</span>
              <span>{ratingsCount}</span>
            </div>
          )}
          {publishedDate && (
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Calendar className="h-3 w-3" />
              <span>{new Date(publishedDate).getFullYear()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
