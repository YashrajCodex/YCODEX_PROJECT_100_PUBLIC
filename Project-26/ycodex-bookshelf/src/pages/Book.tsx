
import {  Link, useParams } from "react-router-dom"
import { ArrowLeft, Star, BookOpen, Calendar, Building, Tag, Eye, EyeOff } from "lucide-react"
import { BookmarkToggle } from "../components/common/BookmarkToggle"
import { useGetBooksById } from "@/hooks/useGetBooks"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import useHandleBookmarkToggle from "@/hooks/useHandleBookmarkToggle"
import { setIsRead } from "@/components/bookshelf/bookshelfSlice"
import getIsRead from "@/lib/helpers/getIsRead"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"

const Book = () => {
  const { id: bookId } = useParams()
  const Dispatch = useDispatch()

  const { book, error, loading } = useGetBooksById(bookId)
    const { books: savedBooks } = useSelector(
    (state: RootState) => state.bookshelf
  );
  const bookmark = savedBooks?.find((book) => book.id === bookId) ? true : false

  const isRead = getIsRead(savedBooks, bookId)
  
 const handleSavedBooks = useHandleBookmarkToggle({
       book: book,
       bookId: bookId,
   });
  const handleReadToggle = () => {
    Dispatch(setIsRead({id: bookId, book: book}))
  }
  // console.log(savedBooks)

  if (loading) return <LoadingSpinner message="Loading book details..." size="lg"/>
  if (!book) return <strong>{error}</strong>
  
  const bookData = book || undefined
  
  const {title, subtitle, imageLinks, ratingsCount, authors, categories, publishedDate, pageCount, publisher} = bookData.volumeInfo
// console.log(bookData.volumeInfo)
  const {kind} = bookData

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-text-secondary hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover & Actions */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              {/* Book Cover */}
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl mb-6">
                <img
                  src={imageLinks?.smallThumbnail}
                  alt={bookData?.volumeInfo?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <BookmarkToggle
                   handleBookmarkToggle={handleSavedBooks}
              bookId={book.id}
              bookmark={bookmark}
              size="sm"
                  />
                  <button
                    onClick={handleReadToggle}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 glow-hover ${
                      isRead
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-bg-surface text-text-primary hover:bg-accent hover:text-white'
                    }`}
                  >
                    {isRead ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                    <span>{isRead ? 'Mark as Unread' : 'Mark as Read'}</span>
                  </button>
                </div>

                {/* Rating */}
                {ratingsCount && (
                  <div className="flex items-center justify-center space-x-2 bg-bg-surface rounded-lg py-3">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="text-xl font-semibold text-text-primary">{ratingsCount}</span>
                    <span className="text-text-secondary">/ 5</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Author */}
            <div>
              <h1 className="text-4xl font-primary font-bold text-text-primary mb-2">
                {title}
              </h1>
              {subtitle && (
                <h2 className="text-xl text-text-secondary mb-3">
                  {subtitle}
                </h2>
              )}
              <p className="text-xl text-accent font-medium">
                by {authors.map((author) => <p className="mx-1" key={author}>{ author }</p>)}
              </p>
            </div>

            {/* Categories */}
            {categories && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent bg-opacity-10 text-white"
                  >
                    <Tag className="h-4 w-4 mr-1" />
                    {category}
                  </span>
                ))}
              </div>
            )}

            {/* Book Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {publisher && (
                <div className="bg-bg-surface rounded-lg p-4 text-center">
                  <Building className="h-6 w-6 mx-auto mb-2 text-text-secondary" />
                  <div className="text-sm text-text-secondary">Publisher</div>
                  <div className="font-medium text-text-primary">{publisher}</div>
                </div>
              )}

              {publishedDate && (
                <div className="bg-bg-surface rounded-lg p-4 text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-text-secondary" />
                  <div className="text-sm text-text-secondary">Published</div>
                  <div className="font-medium text-text-primary">
                    {new Date(publishedDate).getFullYear()}
                  </div>
                </div>
              )}

              {pageCount && (
                <div className="bg-bg-surface rounded-lg p-4 text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-text-secondary" />
                  <div className="text-sm text-text-secondary">Pages</div>
                  <div className="font-medium text-text-primary">{pageCount}</div>
                </div>
              )}

              <div className="bg-bg-surface rounded-lg p-4 text-center">
                  <div className="text-sm text-text-secondary">Format</div>
                  <div className="font-medium text-text-primary">{kind.split('#')[0]}</div>
                </div>
            </div>

            {/* Description */}
            {bookData.searchInfo?.textSnippet && (
              <div className="bg-bg-surface rounded-lg p-6">
                <h3 className="text-xl font-primary font-semibold text-text-primary mb-4">
                  About this book
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {bookData?.searchInfo?.textSnippet}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book
