import React from 'react';
import { Movie } from '../types';
import { Star, Clock, Ticket, Calendar } from 'lucide-react';
import { OfficialMoviePoster } from './OfficialMoviePoster';

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  onBookTickets: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelectMovie,
  onBookTickets,
}) => {
  const isComingSoon = movie.status === 'coming_soon';

  return (
    <div
      id={`movie-card-${movie.id}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 shadow-lg hover:shadow-2xl hover:shadow-red-950/30 transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* Official Poster Media Box with 2:3 Aspect Ratio */}
      <div 
        className="relative aspect-[2/3] w-full overflow-hidden cursor-pointer bg-zinc-950"
        onClick={() => onSelectMovie(movie)}
      >
        <OfficialMoviePoster
          movie={movie}
          imageClassName="group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
          showBadges={true}
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40 opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Rating */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-xs font-bold text-[#f5c518] shadow-md">
            <Star className="w-3 h-3 fill-[#f5c518]" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>

          {/* Format / Age Rating / Date Badge */}
          <div className="flex items-center gap-1.5">
            {isComingSoon ? (
              <span className="px-2 py-0.5 rounded-md bg-[#f5c518]/20 border border-[#f5c518]/40 text-[#f5c518] text-[10px] font-bold uppercase tracking-wider">
                COMING SOON
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-zinc-300 text-[10px] font-semibold">
                {movie.ageRating}
              </span>
            )}
          </div>
        </div>

        {/* Formats Strip on bottom of poster */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex flex-wrap gap-1 pointer-events-none">
          {movie.formats.slice(0, 2).map((fmt) => (
            <span
              key={fmt}
              className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-medium text-zinc-300 border border-zinc-700/60"
            >
              {fmt}
            </span>
          ))}
          {movie.formats.length > 2 && (
            <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-medium text-zinc-400 border border-zinc-700/60">
              +{movie.formats.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title */}
          <h3
            onClick={() => onSelectMovie(movie)}
            className="text-base font-bold text-white group-hover:text-[#f5c518] transition-colors line-clamp-1 cursor-pointer font-display"
          >
            {movie.title}
          </h3>

          {/* Meta Line: Duration & Genres */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-500" />
              {movie.duration}
            </span>
            <span>•</span>
            <span className="truncate">{movie.genres.slice(0, 2).join(', ')}</span>
          </div>

          {/* Languages */}
          <p className="text-[11px] text-zinc-500 mt-1">
            {movie.languages.join(' • ')}
          </p>
        </div>

        {/* Action Button Row */}
        <div>
          {isComingSoon ? (
            <button
              onClick={() => onSelectMovie(movie)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold border border-zinc-700/60 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#f5c518]" />
              <span>Release Info</span>
            </button>
          ) : (
            <button
              id={`book-btn-${movie.id}`}
              onClick={() => onBookTickets(movie)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#e50914] hover:bg-red-600 text-white text-xs font-bold shadow-md shadow-red-950/40 hover:shadow-red-600/30 transition-all cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Book Tickets</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
