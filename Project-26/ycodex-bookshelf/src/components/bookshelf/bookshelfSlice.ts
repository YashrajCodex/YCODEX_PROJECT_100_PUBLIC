import { BookItem } from '@/interface/getBooksInterface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface initialState_slice{
    books: BookItem[];
    key: string;
    viewMode?: "grid" | "list";
} 
interface UpdateIsRead{
    id: string;
    book: BookItem;
}
const initialState:initialState_slice = {
    key: "",
    books: [],
    viewMode: "grid",
}
const bookshelfSlice = createSlice({
    name: 'bookshelf',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        removeBook: (state, action) => {
            state.books = state.books.filter((b) => b.id !== action.payload)
        },
        setIsRead: (state, action:PayloadAction<UpdateIsRead>) => {
            const { id, book } = action.payload
            const index = state.books.findIndex((book) => book.id === id)

            const editedBook = {...book, bookmark: true, isRead: true}
            if (index === -1) {
                state.books.push(editedBook)
            } else {
                state.books[index].isRead = !state.books[index].isRead
            }
            
        },
        toggleViewMode: (state) => {
            state.viewMode = state.viewMode === "grid" ? "list" : "grid"
        },
        setBooksKey: (state, action:PayloadAction<string>) => {
            state.key = action.payload
        },
        clearBooks: () => {
            return initialState
        }
    }
});

export const { addBook, removeBook, setIsRead, toggleViewMode, setBooksKey, clearBooks} = bookshelfSlice.actions
export default bookshelfSlice.reducer