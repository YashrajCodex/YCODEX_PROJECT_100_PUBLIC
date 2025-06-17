
import React from 'react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: (result: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onResultClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {results.map((result) => (
        <div
          key={result.id}
          onClick={() => onResultClick(result)}
          className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="aspect-video bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Image Placeholder</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">{result.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{result.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
