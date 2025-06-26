
import { Bookmark } from "lucide-react"

interface BookmarkToggleProps {
  bookId: string
  bookmark?: boolean
  size?: "sm" | "md" | "lg"
  handleBookmarkToggle?: ()=> void
}

export function BookmarkToggle({ 
  // bookId,
  handleBookmarkToggle,
  bookmark,
  size = "md" 
}: BookmarkToggleProps) {
  
  

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  }

  const buttonClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3"
  }
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleBookmarkToggle()
      }}
      className={`${buttonClasses[size]} rounded-lg transition-all duration-300 hover:scale-110 glow-hover ${
        bookmark 
          ? 'bg-accent text-white shadow-lg' 
          : 'bg-bg-surface bg-opacity-80 text-text-secondary hover:bg-accent hover:bg-opacity-20'
      }`}
      aria-label={bookmark ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark 
        className={`${sizeClasses[size]} ${bookmark ? 'fill-current' : ''}`}
      />
    </button>
  )
}
