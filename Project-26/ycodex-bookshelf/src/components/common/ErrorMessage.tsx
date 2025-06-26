import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({ 
  message = "Something went wrong. Please try again.", 
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="flex items-center space-x-2 text-red-500">
        <AlertCircle className="h-6 w-6" />
        <span className="text-lg font-medium">Error</span>
      </div>
      <p className="text-text-secondary text-center max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-hover-glow transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
