import React, { useState } from 'react';
import { Movie } from '../types';
import { Sparkles, Calendar, Bell, BellRing, Users, Clock, Flame } from 'lucide-react';
import { useToast } from './Toast';
import { OfficialMoviePoster } from './OfficialMoviePoster';

interface UpcomingMoviesSectionProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const UpcomingMoviesSection: React.FC<UpcomingMoviesSectionProps> = ({
  movies,
  onSelectMovie,
}) => {
  const { showToast } = useToast();
  const [reminders, setReminders] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cinebook_reminders');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleToggleReminder = (movie: Movie, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = !!reminders[movie.id];
    const updated = { ...reminders, [movie.id]: !current };
    setReminders(updated);
    try {
      localStorage.setItem('cinebook_reminders', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    if (!current) {
      showToast(
        `Alert set for ${movie.title}`,
        'success',
        `We'll notify you when tickets go on sale for ${movie.expectedReleaseDate || movie.releaseYear}!`
      );
    } else {
      showToast(`Alert removed for ${movie.title}`, 'info');
    }
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section id="upcoming-movies-section" className="pt-8 mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#f5c518]/15 border border-[#f5c518]/30 text-[#f5c518] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Advance Theatrical Calendar</span>
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              Regularly Updated
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
            <span>Upcoming Blockbusters & Alerts</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Track future releases, confirmed premiere dates, star cast lineups, and set instant ticket booking alerts.
          </p>
        </div>

        <div className="text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 self-start sm:self-auto flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-[#f5c518]" />
          <span>{movies.length} Anticipated Titles</span>
        </div>
      </div>

      {/* Grid of Upcoming Movies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {movies.map((movie) => {
          const isReminded = !!reminders[movie.id];
          return (
            <div
              key={movie.id}
              id={`upcoming-movie-${movie.id}`}
              onClick={() => onSelectMovie(movie)}
              className="group relative rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 overflow-hidden transition-all duration-300 shadow-xl flex flex-col cursor-pointer"
            >
              {/* Official Poster Container */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                <OfficialMoviePoster
                  movie={movie}
                  className="w-full h-full"
                  showBadges={false}
                />

                {/* Release Countdown Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-[#f5c518]/40 text-[#f5c518] text-[11px] font-bold shadow-md z-20">
                  <Calendar className="w-3 h-3" />
                  <span>{movie.expectedReleaseDate || `Releasing ${movie.releaseYear}`}</span>
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#f5c518] flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>{movie.votesCount || 'Anticipated'}</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold px-1.5 py-0.2 rounded bg-zinc-950 border border-zinc-800">
                      {movie.ageRating}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-[#f5c518] transition-colors line-clamp-1 font-display">
                    {movie.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {movie.synopsis}
                  </p>
                </div>

                {/* Main Cast Highlights */}
                <div className="pt-2 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5">
                    <span className="flex items-center gap-1 font-semibold text-zinc-300">
                      <Users className="w-3 h-3 text-[#e50914]" />
                      <span>Key Cast:</span>
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {movie.languages.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-hidden">
                    {movie.cast.slice(0, 3).map((c) => (
                      <span
                        key={c.name}
                        className="text-[10px] font-medium text-zinc-300 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800 truncate"
                        title={`${c.name} as ${c.role}`}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Set Reminder & View Details */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={(e) => handleToggleReminder(movie, e)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isReminded
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700'
                    }`}
                  >
                    {isReminded ? (
                      <>
                        <BellRing className="w-3.5 h-3.5 text-amber-400" />
                        <span>Alert Active</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5" />
                        <span>Remind Me</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onSelectMovie(movie)}
                    className="px-3 py-2 rounded-xl bg-zinc-950 hover:bg-[#e50914] text-zinc-300 hover:text-white text-xs font-bold border border-zinc-800 hover:border-red-600 transition-colors cursor-pointer"
                  >
                    Cast Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
