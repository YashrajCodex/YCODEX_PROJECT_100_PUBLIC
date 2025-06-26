import { configureStore } from "@reduxjs/toolkit";

import bookshelfReducer, { initialState_slice } from "./components/bookshelf/bookshelfSlice";
import userReducer, { User } from "./components/User/userSlice";

const bookshelfFallback:initialState_slice = {
    key: "",
    books: [],
    viewMode: "grid",
}
const userFallback :User = {
    users: []
}
const userFromStorage = localStorage.getItem("users");
const bookshelfFromStorage = localStorage.getItem("bookshelf");
const preLoaderUser = userFromStorage ? JSON.parse(userFromStorage) : userFallback;
const preLoaderBookshelf = bookshelfFromStorage
  ? JSON.parse(bookshelfFromStorage)
  : bookshelfFallback

const store = configureStore({
  reducer: {
    bookshelf: bookshelfReducer,
    user: userReducer,
  },
  preloadedState: {
    bookshelf: preLoaderBookshelf,
    user: preLoaderUser,
  },
  devTools: true,
});

export default store;
// for typescript

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
