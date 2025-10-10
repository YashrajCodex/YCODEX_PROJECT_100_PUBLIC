
import React, { useState } from 'react';
import { Search, Star, Calendar, Clock } from 'lucide-react';
import Navbar from '../components/Individual_Components/Navbar';
import Footer from '../components/Individual_Components/Footer';
import SearchResults from '../components/Individual_Components/SearchResults';

// Mock data for demonstration
const mockResults = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.',
    image: 'placeholder'
  },
  {
    id: '2',
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.',
    image: 'placeholder'
  }
];

interface MovieDetails {
  id: string;
  title: string;
  description: string;
  rating: number;
  year: number;
  duration: string;
  genre: string[];
  director: string;
  cast: string[];
}

const Popcorn: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(mockResults);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  // Mock movie details for demonstration
  const mockMovieDetails: MovieDetails = {
    id: '1',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.',
    rating: 9.3,
    year: 1994,
    duration: '2h 22m',
    genre: ['Drama', 'Crime'],
    director: 'Frank Darabont',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton']
  };

  const handleResultClick = (result: any) => {
    setSelectedMovie(mockMovieDetails);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar title="Popcorn" />
      
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Search */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">Discover Movies & Series</h1>
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, TV shows, documentaries..."
                className="w-full pl-12 pr-4 py-4 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Movie Details Modal/Card */}
          {selectedMovie && (
            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Movie Poster */}
                <div className="lg:col-span-1">
                  <div className="aspect-[2/3] bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Movie Poster</span>
                  </div>
                </div>

                {/* Movie Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-card-foreground mb-2">{selectedMovie.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                        <span>{selectedMovie.rating}/10</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{selectedMovie.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{selectedMovie.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{selectedMovie.description}</p>

                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Genre</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovie.genre.map((g) => (
                        <span key={g} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Director</h3>
                    <p className="text-muted-foreground">{selectedMovie.director}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Cast</h3>
                    <p className="text-muted-foreground">{selectedMovie.cast.join(', ')}</p>
                  </div>

                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {!selectedMovie && (
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                {searchQuery ? `Results for "${searchQuery}"` : 'Popular Movies & Series'}
              </h2>
              <SearchResults
                results={searchResults}
                onResultClick={handleResultClick}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Popcorn;
