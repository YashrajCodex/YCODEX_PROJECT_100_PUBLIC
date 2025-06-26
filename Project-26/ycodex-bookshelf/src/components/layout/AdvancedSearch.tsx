import React, { useState } from "react";
import { genre } from "@/interface/getBooksInterface";
import { useSearchContext } from "@/hooks/useSearchContext";

const AdvancedSearch = ({ showAdvanced }) => {
  const {
    author,
    orderBy,
    selectedGenres,
    searchLogic,
    setOrderBy,
    setAuthor,
    setSearchLogic,
    setSelectedGenres,
  } = useSearchContext();

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const toggleSearchLogic = () => {
    setSearchLogic((prev) => (prev === "AND" ? "OR" : "AND"));
  };

  if (!showAdvanced) return null;

  return (
    <div className="bg-[#1b1b1f] h-[58vh] overflow-y-scroll text-orange-400 border border-orange-500/40 rounded-lg p-4 mt-4 space-y-4">
      {/* Author Input */}
      <div>
        <label className="block font-bold mb-1">Author</label>
        <input
          type="text"
          className="w-full px-3 py-2 bg-[#2a2a2f] text-orange-400 border border-orange-400/40 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="e.g., Neil Gaiman"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      {/* Order By Select */}
      <div>
        <label className="block font-bold mb-1">Order By</label>
        <select
          className="w-full px-3 py-2 bg-[#2a2a2f] text-orange-400 border border-orange-400/40 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Genre Selector */}
      <div>
        <label className="block font-bold mb-2">Genres</label>
        <div className="flex flex-wrap gap-2">
          {genre.map((gen) => (
            <span
              key={gen}
              onClick={() => toggleGenre(gen)}
              className={`cursor-pointer px-3 py-1 rounded border transition-all
                ${
                  selectedGenres.includes(gen)
                    ? "bg-orange-400 text-[#1b1b1f] font-bold"
                    : "bg-[#2a2a2f] text-orange-400 border-orange-400 hover:bg-orange-500/20"
                }
              `}
            >
              {gen}
            </span>
          ))}
        </div>
      </div>

      {/* Logic Toggle */}
      <div>
        <button
          onClick={toggleSearchLogic}
          className="px-4 py-2 bg-[#2a2a2f] text-orange-400 border border-orange-400 rounded hover:bg-orange-500/20"
        >
          Logic: {searchLogic}
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
