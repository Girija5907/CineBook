import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { DateOption } from '../utils/date';
import { Play, Ticket, Star, Clock, ShieldCheck, ChevronRight, ChevronLeft, Calendar } from 'lucide-react';
import { OfficialMoviePoster } from './OfficialMoviePoster';

interface HeroBannerProps {
  featuredMovies: Movie[];
  selectedDate?: DateOption;
  onBookMovie: (movie: Movie) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredMovies,
  selectedDate,
  onBookMovie,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 7 seconds
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  if (!featuredMovies.length) return null;

  const movie = featuredMovies[currentIndex] || featuredMovies[0];

  return (
    <section className="relative w-full overflow-hidden bg-zinc-950 min-h-[460px] md:min-h-[560px] flex items-end">
      {/* Background Image with Dark Vignette & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-60 contrast-110 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 cinema-screen-glow opacity-40 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-28 md:pt-36 w-full">
        <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            {/* Format Badges & Status */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-md bg-[#e50914] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md shadow-red-950/50">
                NOW SHOWING IN CINEMAS
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-[#f5c518] text-[11px] font-bold uppercase tracking-wider">
                2026 THEATRICAL SEASON
              </span>
              {movie.formats.map((fmt) => (
                <span
                  key={fmt}
                  className="px-2 py-0.5 rounded-md bg-zinc-900/80 border border-zinc-700/80 text-zinc-300 text-[11px] font-semibold"
                >
                  {fmt}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-display mb-3 drop-shadow-lg">
              {movie.title}
            </h1>

            {/* Tagline */}
            <p className="text-sm md:text-base text-[#f5c518] font-medium italic mb-4 drop-shadow">
              "{movie.tagline}"
            </p>

            {/* Meta Info Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-zinc-300 mb-5">
              <div className="flex items-center gap-1.5 text-[#f5c518] font-bold">
                <Star className="w-4 h-4 fill-[#f5c518]" />
                <span>{movie.rating.toFixed(1)}</span>
                <span className="text-zinc-400 font-normal text-xs">({movie.votesCount} votes)</span>
              </div>

              <div className="flex items-center gap-1 text-zinc-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{movie.duration}</span>
              </div>

              <div className="flex items-center gap-1 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>{movie.ageRating}</span>
              </div>

              <span className="text-zinc-500">•</span>

              <div className="flex items-center gap-1.5">
                {movie.genres.map((g) => (
                  <span key={g} className="text-zinc-300 font-medium">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <p className="text-xs sm:text-sm text-zinc-300/90 line-clamp-3 leading-relaxed mb-7 max-w-xl">
              {movie.synopsis}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                id="hero-book-tickets-btn"
                onClick={() => onBookMovie(movie)}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#e50914] hover:bg-red-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-red-950/60 hover:shadow-red-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                <span>Book Tickets</span>
              </button>
            </div>
          </div>

          {/* Prominent Official Poster Card on Desktop */}
          <div 
            onClick={() => onBookMovie(movie)}
            className="hidden lg:block shrink-0 w-60 xl:w-68 rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-700 hover:border-[#f5c518] transition-all cursor-pointer group hover:scale-105 duration-300 relative bg-zinc-950"
            title={`Click to view details for ${movie.title}`}
          >
            <OfficialMoviePoster
              movie={movie}
              className="w-full aspect-[2/3]"
              showBadges={true}
            />
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-xs font-bold text-white z-20">
              <span className="text-[#f5c518]">Official 2026 Poster</span>
              <span className="text-zinc-300 text-[10px]">Click to View →</span>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Controls */}
        {featuredMovies.length > 1 && (
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-800/60">
            <div className="flex items-center gap-2">
              {featuredMovies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-[#e50914]'
                      : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1))
                }
                className="w-8 h-8 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                aria-label="Previous featured movie"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)}
                className="w-8 h-8 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                aria-label="Next featured movie"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
