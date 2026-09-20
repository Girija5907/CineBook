import React, { useRef } from 'react';
import { Search, X, Film, Sparkles, Building2 } from 'lucide-react';

interface HomeSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  moviesCount: number;
  theatersCount: number;
  currentLocationName: string;
}

export const HomeSearchBar: React.FC<HomeSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  moviesCount,
  theatersCount,
  currentLocationName,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const quickTags = [
    'All Running',
    'Vishwanath & Sons',
    'Mandaadi',
    'Motharathri',
    'Sigma',
    'Coolie',
    'Thalapathy 69',
    'Tamil',
    'Telugu',
    'IMAX',
  ];

  const handleTagClick = (tag: string) => {
    if (tag === 'All Running') {
      onSearchChange('');
    } else {
      onSearchChange(tag);
    }
  };

  return (
    <div
      id="home-search-bar"
      className="w-full bg-zinc-900/95 backdrop-blur-md rounded-2xl border border-zinc-800 p-4 sm:p-5 shadow-2xl mb-8"
    >
      {/* Primary Input Container */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-zinc-400">
          <Search className="w-5 h-5 text-[#e50914]" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search running movies, local theaters in ${currentLocationName}, cast, or language...`}
          className="w-full bg-zinc-950 text-white placeholder-zinc-500 text-sm sm:text-base font-medium pl-12 pr-24 py-3.5 sm:py-4 rounded-xl border border-zinc-700/80 hover:border-zinc-600 focus:border-[#e50914] focus:outline-none focus:ring-2 focus:ring-[#e50914]/30 transition-all shadow-inner"
        />

        {/* Clear and Results summary */}
        <div className="absolute right-3 flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange('');
                inputRef.current?.focus();
              }}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <span className="hidden md:inline-flex text-[11px] font-bold px-2 py-1 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700">
            {moviesCount} Movies
          </span>
        </div>
      </div>

      {/* Quick Search Recommendations & Filters */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-500 font-semibold text-[11px] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#f5c518]" />
            <span>Quick search:</span>
          </span>
          {quickTags.map((tag) => {
            const isTagActive = 
              (tag === 'All Running' && searchQuery === '') || 
              (searchQuery.toLowerCase() === tag.toLowerCase());

            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isTagActive
                    ? 'bg-[#e50914] text-white font-bold shadow-md shadow-red-950/40'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Search Results Summary Info */}
        <div className="text-[11px] text-zinc-400 flex items-center gap-2">
          <span>
            {moviesCount} active movie{moviesCount === 1 ? '' : 's'} • {theatersCount} theater{theatersCount === 1 ? '' : 's'} in {currentLocationName}
          </span>
        </div>
      </div>
    </div>
  );
};
