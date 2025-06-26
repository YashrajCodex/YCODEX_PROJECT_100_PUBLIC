import { Navbar } from "../components/layout/Navbar";
import { BookRow } from "../components/books/BookRow";
import { useGetBooksByGenre } from "@/hooks/useGetBooks";

const Index = () => {

  const philosophyBooks = useGetBooksByGenre({
    subject: "artificial intelligence",
    maxResults: "15",
  });
  const fictionBooks = useGetBooksByGenre({
    subject: "fiction",
    maxResults: "15",
  });
  const Self_Improvement = useGetBooksByGenre({
    subject: "psychology",
    maxResults: "15",
    orderType: 'relevance',
    inauthor: 'Robert Greene'
  });
  const mysteryBooks = useGetBooksByGenre({
    subject: "mystery%20thriller",
    maxResults: "15",
  });

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/90 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-primary font-bold mb-4 text-text-primary">
              Discover Your Next
              <span className="text-accent block">Great Read</span>
            </h1>
            <p className="text-xl text-text-secondary mb-6">
              Explore millions of books, connect with readers, and track your
              reading journey.
            </p>
            <button className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-hover-glow transition-colors font-medium glow-hover">
              Start Exploring
            </button>
          </div>
        </div>
      </div>

      {/* Book Rows */}
      <div className="container mx-auto px-4 py-12">
        <BookRow
          books={philosophyBooks.books}
          loading={philosophyBooks.loading}
          error={philosophyBooks.error}
          title="Artificial Intelligence"
        />

        <BookRow
          books={fictionBooks.books}
          loading={fictionBooks.loading}
          error={fictionBooks.error}
          title="Fiction Favorites"
        />

        <BookRow
          books={Self_Improvement.books}
          loading={Self_Improvement.loading}
          error={Self_Improvement.error}
          title="Self-Improvement"
        />

        <BookRow
          books={mysteryBooks.books}
          loading={mysteryBooks.loading}
          error={mysteryBooks.error}
          title="Mystery & Thriller"
        />
      </div>
    </div>
  );
};

export default Index;
