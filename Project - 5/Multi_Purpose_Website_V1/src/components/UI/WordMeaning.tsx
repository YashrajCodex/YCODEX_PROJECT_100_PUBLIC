import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';

const WordMeaning: React.FC = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center mb-4">
        <BookOpen size={20} className="mr-2 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-card-foreground">Word Meaning</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Enter Word
          </label>
          <div className="relative">
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter a word to find its meaning..."
              className="w-full p-3 pr-10 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        
        <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          Find Meaning
        </button>
        
        <div className="bg-accent rounded-lg p-4 min-h-[100px]">
          <p className="text-accent-foreground">
            {meaning || "Word meaning will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordMeaning;
