import { RootState } from "@/store";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../common/Modal";
import { useState } from "react";
import { removeUser } from "./userSlice";
import { clearBooks } from "../bookshelf/bookshelfSlice";
// import { useAuth } from "@/hooks/useAuth";

export function UserProfile() {
  const { books, key } = useSelector((state: RootState) => state.bookshelf);
  const { users: savedUser } = useSelector((state: RootState) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  // const {toggleAuthenticated} = useAuth()

  // const books = bookshelf.books
  const readCount = books.filter((book) => book.isRead === true).length;

  const user = savedUser[0]

  // console.log(user.userName)
  if (!user) return null;
  function handleLogout() {
    // toggleAuthenticated()
    setIsOpen(false);
    dispatch(removeUser());
    dispatch(clearBooks());
    // console.log(user)
  }

  return (
    <div className="glass-effect rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-6">
        {/* User Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-bg-surface border-4 border-accent border-opacity-20">
            {user?.Profile_Image_Link ? (
              <img
                src={user?.Profile_Image_Link}
                alt={user?.userName}
                className="w-full h-full object-cover"
              /> 
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="h-8 w-8 text-text-secondary" />
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full border-2 border-bg-primary flex items-center justify-center">
            <span className="text-xs text-white font-bold">★</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-primary font-bold text-text-primary mb-2">
            {user?.userName}
          </h1>
          <div className="flex max-sm:flex-col items-start gap-3 text-text-secondary">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-accent">
                {books && books.length}
              </span>
              <span>Books Saved</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-500">
                {readCount}
              </span>
              <span>Books Read</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-text-secondary">
                {books && books.length - readCount}
              </span>
              <span>To Read</span>
            </div>
            <button
              onClick={()=>setIsOpen(true)}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            title="Confirm logout"
            onCancel={() => {
              setIsOpen(false);
            }}
            onConfirm={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}
