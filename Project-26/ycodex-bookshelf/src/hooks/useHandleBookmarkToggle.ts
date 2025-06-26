import { addBook, removeBook } from "@/components/bookshelf/bookshelfSlice";
import { BookItem } from "@/interface/getBooksInterface";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

interface handleBookmarkProps {
  bookId: string;
  book: BookItem;
  // setIsBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useHandleBookmarkToggle({
  bookId,
  book,
}: handleBookmarkProps) {
  const { books: savedBooks } = useSelector(
    (state:RootState) => state.bookshelf
  );
  // console.log(savedBooks)
    const dispatch = useDispatch<AppDispatch>();
  function handleSavedBooks() {
    // console.log(bookId, )
    let bookmarkedTrue:boolean;
    if (savedBooks) bookmarkedTrue = savedBooks?.some((book)=> book.id === bookId);
    if (bookmarkedTrue) {
      dispatch(removeBook(bookId));
    } else {
      dispatch(addBook(book));
    }
  }
  return handleSavedBooks
}
