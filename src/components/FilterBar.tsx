import React from 'react';
import { FilterState, MovieGenre, MovieLanguage, MovieFormat } from '../types';
import { SlidersHorizontal, RotateCcw, Film, Globe, Layers } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const GENRES: MovieGenre[] = [
  'Action',
  'Sci-Fi',
  'Drama',
  'Thriller',
  'Animation',
  'Adventure',
  'Crime',
  'Comedy',
  'Horror',
  'Fantasy',
];

const LANGUAGES: MovieLanguage[] = [
  'English',
  'Hindi',
  'Japanese',
  'Korean',
  'Telugu',
  'Tamil',
  'French',
  'Spanish',
  'German',
  'Mandarin',
  'Italian',
];

const FORMATS: MovieFormat[] = ['IMAX 3D', 'Dolby Cinema', '4DX', 'Laser 2D', 'ScreenX'];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const hasActiveFilters =
    filters.selectedGenre !== 'all' ||
    filters.selectedLanguage !== 'all' ||
    filters.selectedFormat !== 'all' ||
    filters.searchQuery.trim() !== '';

  return (
    <section className="w-full bg-zinc-950/60 border-b border-zinc-900 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Top Controls: Dropdowns & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <SlidersHorizontal className="w-4 h-4 text-[#e50914]" />
            <span>GLOBAL FILTERS</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-300 font-bold">
              {totalResults} {totalResults === 1 ? 'Movie' : 'Movies'} found
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Language Dropdown */}
            <div className="relative flex items-center">
              <Globe className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
              <select
                id="filter-language-select"
                value={filters.selectedLanguage}
                onChange={(e) => onFilterChange({ selectedLanguage: e.target.value })}
                className="pl-8 pr-7 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 focus:border-[#e50914] outline-none cursor-pointer"
              >
                <option value="all">All Languages ({LANGUAGES.length})</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Format Dropdown */}
            <div className="relative flex items-center">
              <Layers className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
              <select
                id="filter-format-select"
                value={filters.selectedFormat}
                onChange={(e) => onFilterChange({ selectedFormat: e.target.value })}
                className="pl-8 pr-7 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 focus:border-[#e50914] outline-none cursor-pointer"
              >
                <option value="all">All Formats</option>
                {FORMATS.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                id="filter-reset-btn"
                onClick={onResetFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[#e50914] border border-[#e50914]/40 text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Genre Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 pt-1 -mx-1 px-1">
          <button
            onClick={() => onFilterChange({ selectedGenre: 'all' })}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filters.selectedGenre === 'all'
                ? 'bg-zinc-100 text-zinc-900 shadow-md'
                : 'bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            All Genres
          </button>
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() =>
                onFilterChange({
                  selectedGenre: filters.selectedGenre === genre ? 'all' : genre,
                })
              }
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filters.selectedGenre === genre
                  ? 'bg-[#e50914] text-white shadow-md shadow-red-950/60'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
