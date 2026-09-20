import React, { useState, useEffect } from 'react';
import { Movie, Theater, Showtime, City } from '../types';
import { getUpcomingDates, DateOption } from '../utils/date';
import { formatPrice } from '../utils/currency';
import { OfficialMoviePoster } from './OfficialMoviePoster';
import { 
  X, 
  Star, 
  Clock, 
  ShieldCheck, 
  Film, 
  Building2, 
  Users, 
  Ticket, 
  ChevronRight,
  Info,
  Calendar,
  Sparkles,
  Camera
} from 'lucide-react';

interface MovieDetailsModalProps {
  movie: Movie | null;
  selectedCity: City;
  initialSelectedDate?: DateOption;
  onClose: () => void;
  onSelectShowtime: (movie: Movie, theater: Theater, showtime: Showtime, selectedDate: DateOption) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  selectedCity,
  initialSelectedDate,
  onClose,
  onSelectShowtime,
}) => {
  const dates = getUpcomingDates(7);
  const [selectedDate, setSelectedDate] = useState<DateOption>(initialSelectedDate || dates[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'cast'>('overview');

  useEffect(() => {
    if (initialSelectedDate) {
      setSelectedDate(initialSelectedDate);
    }
  }, [initialSelectedDate, movie?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset tab when new movie is opened
  useEffect(() => {
    setActiveTab('overview');
  }, [movie?.id]);

  if (!movie) return null;

  const isComingSoon = movie.status === 'coming_soon';

  // All theaters near the user's selected city
  const cityTheaters: Theater[] = (selectedCity.theaters && selectedCity.theaters.length > 0)
    ? selectedCity.theaters 
    : (movie.theaters || []);

  return (
    <div 
      id="movie-details-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl flex justify-center p-2 sm:p-4 md:p-6"
    >
      <div 
        id="movie-details-modal-card"
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col"
      >
        {/* Close Button */}
        <button
          id="close-details-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 flex items-center justify-center transition-colors shadow-lg cursor-pointer"
          aria-label="Close movie details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Navigation / Tabs */}
        <div className="px-6 pt-6 pb-4 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              {isComingSoon ? 'Upcoming Theatrical Release' : 'Currently Running in Theaters'}
            </span>
          </div>

          {/* Interactive Navigation: Overview vs Full Cast Details */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 mr-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#e50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Official Poster & Info</span>
            </button>
            <button
              id="view-cast-details-tab-btn"
              onClick={() => setActiveTab('cast')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cast'
                  ? 'bg-[#e50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#f5c518]" />
              <span>Main Cast & Characters</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-zinc-800 text-[10px] text-zinc-200">
                {movie.cast.length}
              </span>
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1 max-h-[80vh]">
          {/* TAB 1: OVERVIEW WITH PROMINENT OFFICIAL POSTER IN FRONT */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Prominent Official Poster Presentation */}
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80">
                {/* Official Movie Poster Prominently in Front - No Unrelated Background Images */}
                <div className="relative w-48 sm:w-60 md:w-64 shrink-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-700 bg-zinc-950">
                  <OfficialMoviePoster
                    movie={movie}
                    className="w-full h-auto aspect-[2/3]"
                    showBadges={true}
                  />
                </div>

                {/* Movie Details Hierarchy */}
                <div className="flex-1 w-full text-left space-y-4">
                  {/* Status & Formats */}
                  <div className="flex flex-wrap items-center gap-2">
                    {isComingSoon ? (
                      <span className="px-2.5 py-1 rounded-md bg-[#f5c518]/20 border border-[#f5c518]/50 text-[#f5c518] text-xs font-extrabold uppercase">
                        COMING SOON • {movie.expectedReleaseDate || `RELEASING ${movie.releaseYear}`}
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-[#e50914] text-white text-xs font-bold uppercase tracking-wider">
                        NOW SHOWING
                      </span>
                    )}
                    {movie.formats.map((fmt) => (
                      <span
                        key={fmt}
                        className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-semibold"
                      >
                        {fmt}
                      </span>
                    ))}
                    {movie.filmCalendarReleaseDate && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        FilmCalendar.app Verified
                      </span>
                    )}
                  </div>

                  {/* Title & Original Title */}
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight">
                      {movie.title}
                    </h2>
                    {movie.originalTitle && (
                      <p className="text-sm text-zinc-400 font-medium mt-0.5">
                        Original: {movie.originalTitle}
                      </p>
                    )}
                    <p className="text-sm text-[#f5c518] italic mt-1 font-medium">"{movie.tagline}"</p>
                  </div>

                  {/* FilmCalendar Release and Production Info Strip */}
                  {(movie.filmCalendarReleaseDate || movie.filmCalendarProduction) && (
                    <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                      {movie.filmCalendarReleaseDate && (
                        <div className="flex items-center gap-1.5 text-zinc-300">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-zinc-400 font-medium">Theatrical Release:</span>
                          <span className="text-white font-bold">{movie.filmCalendarReleaseDate}</span>
                        </div>
                      )}
                      {movie.filmCalendarProduction && (
                        <div className="text-zinc-400">
                          <span className="text-zinc-500">Production: </span>
                          <span className="text-zinc-300 font-medium">{movie.filmCalendarProduction}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Meta Stats Row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-300 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-1.5 text-[#f5c518] font-bold">
                      <Star className="w-4 h-4 fill-[#f5c518]" />
                      <span>{movie.rating.toFixed(1)} / 10</span>
                      <span className="text-zinc-500 font-normal">({movie.votesCount})</span>
                    </div>

                    <div className="flex items-center gap-1 text-zinc-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{movie.duration}</span>
                    </div>

                    <div className="flex items-center gap-1 text-zinc-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{movie.ageRating}</span>
                    </div>

                    <div className="flex items-center gap-1 text-zinc-400">
                      <Film className="w-3.5 h-3.5" />
                      <span>Director: {movie.director}</span>
                    </div>
                  </div>

                  {/* Languages & Genres */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-zinc-400 font-semibold">Languages:</span>
                    {movie.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200 font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                    <span className="text-zinc-600">|</span>
                    <span className="text-zinc-400 font-semibold">Genres:</span>
                    {movie.genres.map((g) => (
                      <span key={g} className="text-zinc-300">
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Synopsis */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Synopsis
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {movie.synopsis}
                    </p>
                  </div>

                  {/* Quick Character Preview Strip */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-[#f5c518]" />
                        <span>Original Character Looks ({movie.cast.length})</span>
                      </span>
                      <button
                        onClick={() => setActiveTab('cast')}
                        className="text-xs text-[#f5c518] hover:underline font-bold"
                      >
                        View Full Cast & Details →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {movie.cast.slice(0, 4).map((member) => (
                        <div
                          key={member.name}
                          onClick={() => setActiveTab('cast')}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-[#f5c518]/50 cursor-pointer transition-all group"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-zinc-700 group-hover:border-[#f5c518]">
                            <img
                              src={member.avatarUrl}
                              alt={member.role}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white group-hover:text-[#f5c518] truncate">
                              {member.role.split('(')[0]}
                            </p>
                            <p className="text-[10px] text-zinc-400 truncate">
                              {member.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call-to-action button to view cast details */}
                  <div className="pt-1">
                    <button
                      id="click-for-cast-details-btn"
                      onClick={() => setActiveTab('cast')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 transition-all cursor-pointer shadow"
                    >
                      <Users className="w-4 h-4 text-[#f5c518]" />
                      <span>Explore Main Cast Roles & Original Photos ({movie.cast.length} Characters)</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Theaters & Showtimes for Running Movies */}
              {!isComingSoon && (
                <div id="booking-section" className="pt-6 border-t border-zinc-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-black text-white font-display flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[#e50914]" />
                        <span>Select Date & Theater</span>
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Showing partner cinemas near {selectedCity.name} • Prices in{' '}
                        <span className="text-[#f5c518] font-bold">
                          {selectedCity.currency.symbol} {selectedCity.currency.code}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Date Pills */}
                  <div className="flex items-center gap-2.5 overflow-x-auto custom-scrollbar pb-3 mb-6">
                    {dates.map((date) => {
                      const isSelected = selectedDate.dateString === date.dateString;
                      return (
                        <button
                          key={date.dateString}
                          onClick={() => setSelectedDate(date)}
                          className={`flex flex-col items-center justify-center min-w-[80px] py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#e50914] text-white border-[#e50914] shadow-lg shadow-red-950/60 scale-105'
                              : 'bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <span className="text-[10px] font-extrabold uppercase tracking-wider">
                            {date.dayName}
                          </span>
                          <span className="text-lg font-black my-0.5">{date.dayNumber}</span>
                          <span className="text-[10px] font-semibold">{date.monthName}</span>
                          <span className="text-[9px] font-mono opacity-80 mt-0.5">{date.formattedDDMMYYYY}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Theaters List */}
                  <div className="space-y-4">
                    {cityTheaters.map((theater) => (
                      <div
                        key={theater.id}
                        className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-zinc-800/80">
                          <div>
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              <span>{theater.name}</span>
                              <span className="text-[11px] font-normal text-zinc-400">
                                ({theater.distance})
                              </span>
                            </h4>
                            <p className="text-xs text-zinc-400 mt-0.5">
                              {theater.fullAddress || theater.location}
                            </p>
                          </div>
                        </div>

                        {/* Showtimes Pills */}
                        <div className="flex flex-wrap gap-2.5">
                          {theater.showtimes.map((st) => {
                            const seatsLeft = st.availableSeats ?? 64;
                            return (
                              <button
                                key={st.id}
                                onClick={() => onSelectShowtime(movie, theater, st, selectedDate)}
                                className="group/time flex flex-col p-2.5 rounded-xl bg-zinc-950 hover:bg-[#e50914] border border-zinc-800 hover:border-[#e50914] transition-all cursor-pointer text-left min-w-[120px]"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-bold text-white">
                                    {st.time}
                                  </span>
                                  <span className="text-[10px] font-semibold px-1 rounded bg-zinc-900 text-zinc-300 group-hover/time:bg-white group-hover/time:text-black">
                                    {st.format}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-zinc-400 group-hover/time:text-zinc-100 mt-1">
                                  <span>{st.screenName}</span>
                                  <span className="text-emerald-400 font-semibold group-hover/time:text-white">
                                    {seatsLeft} seats
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MAIN CAST & CHARACTERS (IMPORTANT ROLES) */}
          {activeTab === 'cast' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-xl font-black text-white font-display flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#f5c518]" />
                    <span>Main Cast & Important Roles</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Characters who played important roles in <strong className="text-white">{movie.title}</strong>, featuring the actor's real name, character name, and real photo.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('overview')}
                  className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  ← Back to Movie Overview
                </button>
              </div>

              {/* Cast Cards Grid with Original Character Photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {movie.cast.map((member, idx) => (
                  <div
                    key={member.name}
                    className="flex flex-col gap-3 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#f5c518]/60 transition-all shadow-lg group relative overflow-hidden"
                  >
                    {/* Top Character Header with Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-[9px] font-extrabold text-emerald-400 uppercase tracking-wider">
                        <Camera className="w-2.5 h-2.5" />
                        <span>Original Character Photo</span>
                      </span>

                      {member.characterBadge && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[9px] font-bold text-[#f5c518] uppercase">
                          {member.characterBadge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-3.5">
                      {/* Original Character Photo of Actor */}
                      <div className="relative w-20 h-24 sm:w-22 sm:h-28 shrink-0 rounded-xl overflow-hidden border-2 border-zinc-700 group-hover:border-[#f5c518] transition-all bg-zinc-950 shadow-md">
                        <img
                          src={member.avatarUrl}
                          alt={`${member.role} portrayed by ${member.name}`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.fallback-avatar')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'fallback-avatar w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-white font-bold text-xs p-1 text-center';
                              fallback.innerHTML = `<span class="text-[#f5c518] font-black text-sm">${member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span><span class="text-[8px] text-zinc-400 mt-1 uppercase tracking-widest">Character</span>`;
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 text-[9px] font-mono font-bold text-[#f5c518] pointer-events-none">
                          #{idx + 1}
                        </span>
                      </div>

                      {/* Character and Actor Identity */}
                      <div className="min-w-0 flex-1 flex flex-col justify-between h-full">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#e50914] block">
                            Character in Movie
                          </span>
                          <h4 className="text-sm sm:text-base font-black text-white group-hover:text-[#f5c518] transition-colors line-clamp-2">
                            {member.role}
                          </h4>
                        </div>

                        <div className="mt-2 pt-2 border-t border-zinc-800/80">
                          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
                            Portrayed by (Real Actor)
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-zinc-200 truncate">
                            {member.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Costume & Look Note */}
                    {member.characterLook && (
                      <div className="mt-1 p-2 rounded-lg bg-zinc-950/70 border border-zinc-800/60 text-[11px] text-zinc-300">
                        <span className="font-bold text-[#f5c518]">Movie Look: </span>
                        <span>{member.characterLook}</span>
                      </div>
                    )}

                    {/* Bio Description */}
                    {member.characterBio && (
                      <p className="text-[11px] text-zinc-400 line-clamp-2 italic">
                        "{member.characterBio}"
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Director Info Box */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Directed By
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">{movie.director}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Age Certification
                  </span>
                  <p className="text-sm font-bold text-[#f5c518] mt-0.5">{movie.ageRating}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Duration
                  </span>
                  <p className="text-sm font-bold text-zinc-300 mt-0.5">{movie.duration}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
