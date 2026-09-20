import React, { useState } from 'react';
import { Movie } from '../types';
import { OFFICIAL_POSTER_ART } from '../data/officialPosters';
import { ShieldCheck, Film } from 'lucide-react';

interface OfficialMoviePosterProps {
  movie: Movie;
  className?: string;
  imageClassName?: string;
  showBadges?: boolean;
}

export const OfficialMoviePoster: React.FC<OfficialMoviePosterProps> = ({
  movie,
  className = '',
  imageClassName = '',
  showBadges = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const meta = OFFICIAL_POSTER_ART[movie.id];

  // Specific iconography and insignia per movie
  const renderTheatricalEmblem = () => {
    switch (movie.id) {
      case 'viswanath-and-sons':
        return (
          <div className="w-16 h-16 rounded-2xl border-2 border-amber-500/50 bg-amber-950/70 flex items-center justify-center shadow-lg shadow-amber-900/40">
            <span className="text-xl font-black text-amber-300 font-serif">V&amp;S</span>
          </div>
        );
      case 'mandaadi':
        return (
          <div className="w-16 h-16 rounded-2xl border-2 border-sky-500/50 bg-sky-950/70 flex items-center justify-center shadow-lg shadow-sky-900/40">
            <span className="text-xl font-black text-sky-300 font-mono tracking-wider">MND</span>
          </div>
        );
      case 'motharathri':
        return (
          <div className="w-16 h-16 rounded-2xl border-2 border-purple-500/50 bg-purple-950/70 flex items-center justify-center shadow-lg shadow-purple-900/40">
            <span className="text-xl font-black text-purple-300 font-display">MR</span>
          </div>
        );
      case 'sigma':
        return (
          <div className="w-16 h-16 rounded-2xl border-2 border-yellow-500/60 bg-yellow-950/80 flex items-center justify-center shadow-lg shadow-yellow-900/50">
            <span className="text-3xl font-black text-yellow-300 font-serif">Σ</span>
          </div>
        );
      case 'good-bad-ugly':
        return (
          <div className="w-16 h-16 rounded-2xl border-2 border-yellow-500/50 bg-yellow-950/70 flex items-center justify-center shadow-lg shadow-yellow-900/40">
            <span className="text-xl font-black text-yellow-300 font-display">GBU</span>
          </div>
        );
      case 'coolie':
        return (
          <div className="w-16 h-16 rounded-full border-2 border-amber-500/40 bg-amber-950/60 flex items-center justify-center shadow-lg shadow-amber-900/30">
            <span className="text-2xl font-black text-amber-400 font-mono">131</span>
          </div>
        );
      case 'thalapathy-69':
        return (
          <div className="w-16 h-16 rounded-2xl border-2 border-red-500/40 bg-red-950/60 flex items-center justify-center shadow-lg shadow-red-900/30">
            <span className="text-xl font-black text-red-400 font-display">T69</span>
          </div>
        );
      case 'ramayana-part-1':
        return (
          <div className="w-16 h-16 rounded-full border-2 border-amber-400/50 bg-amber-950/70 flex items-center justify-center shadow-lg shadow-yellow-800/40">
            <span className="text-2xl font-serif font-black text-yellow-300">🏹</span>
          </div>
        );
      case 'toxic':
        return (
          <div className="w-16 h-16 rounded-xl border-2 border-emerald-500/40 bg-emerald-950/60 flex items-center justify-center shadow-lg shadow-emerald-900/30">
            <span className="text-xl font-black tracking-widest text-emerald-400 font-mono">TOXIC</span>
          </div>
        );
      case 'spirit':
        return (
          <div className="w-16 h-16 rounded-full border-2 border-rose-500/50 bg-rose-950/70 flex items-center justify-center shadow-lg shadow-rose-900/40">
            <span className="text-2xl font-black text-rose-400 font-mono">POLICE</span>
          </div>
        );
      case 'war-2':
        return (
          <div className="w-16 h-16 rounded-xl border-2 border-blue-500/50 bg-blue-950/70 flex items-center justify-center shadow-lg shadow-blue-900/40">
            <span className="text-2xl font-black text-blue-400 font-display">W•2</span>
          </div>
        );
      case 'the-batman-part-ii':
        return (
          <div className="w-16 h-16 rounded-2xl border-2 border-red-600/40 bg-red-950/80 flex items-center justify-center shadow-lg shadow-red-950/50">
            <span className="text-2xl font-black text-red-500">🦇</span>
          </div>
        );
      case 'avengers-doomsday':
        return (
          <div className="w-16 h-16 rounded-full border-2 border-emerald-500/50 bg-emerald-950/80 flex items-center justify-center shadow-lg shadow-emerald-900/40">
            <span className="text-2xl font-black text-emerald-400 font-serif">DOOM</span>
          </div>
        );
      case 'the-mandalorian-grogu':
        return (
          <div className="w-16 h-16 rounded-full border-2 border-cyan-500/40 bg-cyan-950/60 flex items-center justify-center shadow-lg shadow-cyan-900/30">
            <span className="text-2xl">✨</span>
          </div>
        );
      default:
        return (
          <div className="w-14 h-14 rounded-2xl border border-zinc-700 bg-zinc-900 flex items-center justify-center">
            <Film className="w-7 h-7 text-zinc-400" />
          </div>
        );
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-zinc-950 ${className}`}>
      {!hasError ? (
        <img
          src={movie.posterUrl}
          alt={`Official Poster of ${movie.title}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`w-full h-full object-cover object-center ${imageClassName}`}
          onError={() => setHasError(true)}
        />
      ) : (
        /* Theatrical Official Poster Art */
        <div
          className={`w-full h-full p-4 flex flex-col justify-between text-center relative overflow-hidden bg-gradient-to-b ${
            meta?.bgGradient || 'from-zinc-900 via-zinc-950 to-black'
          }`}
        >
          {/* Subtle noise and light beam */}
          <div className="absolute inset-0 bg-radial from-white/5 via-transparent to-black/80 pointer-events-none" />

          {/* Top Studio and Year Header */}
          <div className="relative z-10 pt-2 flex flex-col items-center">
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400 line-clamp-1">
              {meta?.studioLogo || 'OFFICIAL THEATRICAL RELEASE'}
            </span>
            <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[9px] font-bold text-zinc-300">
              <span>{movie.releaseYear} CINEMA EXCLUSIVE</span>
            </div>
          </div>

          {/* Center Title and Emblem */}
          <div className="relative z-10 my-auto flex flex-col items-center py-4">
            {renderTheatricalEmblem()}

            <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight leading-tight uppercase mt-3 drop-shadow-md">
              {movie.title}
            </h3>

            {movie.originalTitle && movie.originalTitle !== movie.title && (
              <span className="text-xs font-semibold text-zinc-400 mt-0.5">
                {movie.originalTitle}
              </span>
            )}

            <p className="text-[10px] text-zinc-300 font-medium italic mt-2 px-2 line-clamp-2 max-w-[200px]">
              "{movie.tagline}"
            </p>
          </div>

          {/* Base Billing Block and Format Stamps */}
          <div className="relative z-10 pb-1">
            <div className="flex items-center justify-center gap-1.5 flex-wrap mb-2">
              {movie.formats.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="px-1.5 py-0.5 rounded text-[8px] font-extrabold bg-white/10 text-white border border-white/15 uppercase tracking-wider"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="border-t border-white/10 pt-1.5 text-[8px] text-zinc-400 font-mono uppercase tracking-widest">
              <span>DIR: {movie.director}</span> • <span>{movie.ageRating}</span>
            </div>
          </div>
        </div>
      )}

      {/* Official Poster Authenticity Seal */}
      {showBadges && (
        <div className="absolute bottom-2 left-2 pointer-events-none z-20">
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[8px] font-bold text-emerald-400 shadow">
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
            <span>OFFICIAL POSTER</span>
          </div>
        </div>
      )}
    </div>
  );
};
