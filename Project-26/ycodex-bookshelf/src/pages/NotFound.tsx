
import { Link } from "react-router-dom"
import { BookOpen, ArrowLeft } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-bg-surface rounded-full flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-accent" />
        </div>

        {/* Content */}
        <h1 className="text-6xl font-primary font-bold text-text-primary mb-4">404</h1>
        <h2 className="text-2xl font-primary font-semibold text-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-hover-glow transition-colors font-medium glow-hover"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
