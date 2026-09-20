import React from 'react';
import { Theater, Showtime, CurrencyConfig, Movie } from '../types';
import { DateOption } from '../utils/date';
import { Building2, MapPin, Phone, Armchair, Ticket, Sparkles, ChevronRight, CheckCircle2, Clock, Film, Calendar } from 'lucide-react';
import { formatPrice } from '../utils/currency';

interface NearbyTheatersSectionProps {
  theaters: Theater[];
  cityName: string;
  districtName: string;
  stateName: string;
  countryName: string;
  currency: CurrencyConfig;
  runningMovies: Movie[];
  selectedDate?: DateOption;
  selectedTheaterId?: string;
  onSelectTheaterFilter?: (theaterId: string) => void;
  onSelectShowtime: (theater: Theater, showtime: Showtime, movie: Movie) => void;
  onExploreMovie: (movie: Movie) => void;
}

export const NearbyTheatersSection: React.FC<NearbyTheatersSectionProps> = ({
  theaters,
  cityName,
  districtName,
  stateName,
  countryName,
  currency,
  runningMovies,
  selectedDate,
  selectedTheaterId,
  onSelectTheaterFilter,
  onSelectShowtime,
  onExploreMovie,
}) => {
  if (!theaters || theaters.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center">
        <Building2 className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-white mb-1">No Theaters Listed in this Area</h3>
        <p className="text-xs text-zinc-400">Please choose another nearby town or district in the location picker.</p>
      </div>
    );
  }

  return (
    <section id="nearby-theaters-section" className="mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#e50914]/20 border border-[#e50914]/40 text-[#e50914] text-[11px] font-bold uppercase tracking-wider">
              Selected City Theaters
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              {theaters.length} {theaters.length === 1 ? 'Theater' : 'Theaters'} in {cityName}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
            <span>Theaters & Ticket Counters in {cityName}</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Verified local cinemas showing full address, current showtimes, live seat availability & pricing in {districtName}, {stateName}.
          </p>
        </div>

        {/* Currency badge info */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 self-start sm:self-auto text-xs text-zinc-300">
          <Ticket className="w-4 h-4 text-[#f5c518]" />
          <span>Ticket Prices in <strong className="text-white">{currency.code} ({currency.symbol})</strong></span>
        </div>
      </div>

      {/* Theaters List */}
      <div className="grid grid-cols-1 gap-5">
        {theaters.map((theater) => {
          const isSelectedTheater = selectedTheaterId === theater.id;

          // Resolve movies playing at this specific theater
          const theaterMovies = (theater.runningMovieIds && theater.runningMovieIds.length > 0)
            ? runningMovies.filter((m) => theater.runningMovieIds?.includes(m.id))
            : runningMovies.slice(0, 3);

          return (
            <div
              key={theater.id}
              id={`theater-card-${theater.id}`}
              className={`group rounded-2xl p-5 transition-all duration-200 shadow-xl border ${
                isSelectedTheater
                  ? 'bg-zinc-900 border-[#e50914] ring-1 ring-[#e50914]/50'
                  : 'bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                {/* Left Side: Theater Details & Full Address */}
                <div className="flex-1 space-y-3">
                  {/* Theater Name & Distance */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black text-white group-hover:text-[#f5c518] transition-colors font-display flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[#e50914]" />
                        <span>{theater.name}</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[11px] font-semibold text-zinc-300">
                        {theater.distance}
                      </span>
                    </div>

                    {/* Filter by this theater CTA */}
                    {onSelectTheaterFilter && (
                      <button
                        onClick={() => onSelectTheaterFilter(isSelectedTheater ? 'all' : theater.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelectedTheater
                            ? 'bg-[#e50914] text-white shadow-md'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white'
                        }`}
                      >
                        {isSelectedTheater ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Showing Only This Theater</span>
                          </>
                        ) : (
                          <>
                            <Film className="w-3.5 h-3.5 text-[#f5c518]" />
                            <span>Filter Movies by this Theater</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Full Address */}
                  <div className="flex items-start gap-2 text-xs text-zinc-300 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80">
                    <MapPin className="w-4 h-4 text-[#e50914] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">{theater.fullAddress || theater.location}</p>
                      {theater.contactPhone && (
                        <p className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-zinc-500" />
                          <span>Phone: {theater.contactPhone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Amenities */}
                  {theater.amenities && theater.amenities.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {theater.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-0.5 rounded-md bg-zinc-950/70 border border-zinc-800 text-[10px] font-medium text-zinc-300"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Movies Currently Running in this Theater */}
                  {theaterMovies.length > 0 && (
                    <div className="pt-2 border-t border-zinc-800/60">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5 text-[#e50914]" />
                        <span>Currently Running Movies at this Theater ({theaterMovies.length}):</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {theaterMovies.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => onExploreMovie(m)}
                            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer group/m"
                            title={`Click to view details for ${m.title}`}
                          >
                            <img
                              src={m.posterUrl}
                              alt={m.title}
                              referrerPolicy="no-referrer"
                              className="w-5 h-7 object-cover rounded shadow"
                            />
                            <div className="text-left">
                              <p className="text-xs font-bold text-zinc-200 group-hover/m:text-white truncate max-w-[140px]">
                                {m.title}
                              </p>
                              <span className="text-[10px] text-[#f5c518] font-semibold">
                                ★ {m.rating.toFixed(1)}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ticket Prices Breakdown in Selected Currency */}
                  <div className="pt-2 border-t border-zinc-800/60">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-[#f5c518]" />
                      <span>Ticket Prices:</span>
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <div className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800">
                        <span className="text-zinc-400 text-[11px]">Standard: </span>
                        <span className="font-bold text-white">
                          {formatPrice(theater.showtimes[0]?.priceStandardUSD || 2.4, currency)}
                        </span>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800">
                        <span className="text-zinc-400 text-[11px]">Premium: </span>
                        <span className="font-bold text-[#f5c518]">
                          {formatPrice(theater.showtimes[0]?.pricePremiumUSD || 3.2, currency)}
                        </span>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800">
                        <span className="text-zinc-400 text-[11px]">VIP Recliner: </span>
                        <span className="font-bold text-emerald-400">
                          {formatPrice(theater.showtimes[0]?.priceVIPUSD || 4.2, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Current Showtimes & Live Available Seats */}
                <div className="lg:w-96 shrink-0 flex flex-col justify-between gap-3 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/90">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-zinc-800">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#e50914]" />
                        <span>Showtimes & Available Seats</span>
                      </span>
                      <span className="text-[11px] text-zinc-400 font-medium">
                        Click time to book
                      </span>
                    </div>

                    {/* Showtimes Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      {theater.showtimes.map((st) => {
                        const seatsAvailable = st.availableSeats ?? 68;
                        const isFilling = st.occupancyStatus === 'filling_fast' || seatsAvailable < 40;
                        const isAlmostFull = st.occupancyStatus === 'almost_full' || seatsAvailable < 20;

                        // Target movie for this showtime
                        const showtimeMovie = (st.movieId && runningMovies.find((m) => m.id === st.movieId)) 
                          || theaterMovies[0] 
                          || runningMovies[0];

                        return (
                          <button
                            key={st.id}
                            onClick={() => {
                              if (showtimeMovie) {
                                onSelectShowtime(theater, st, showtimeMovie);
                              }
                            }}
                            className="group/st flex flex-col p-2.5 rounded-xl bg-zinc-900/90 hover:bg-[#e50914] text-left border border-zinc-800 hover:border-[#e50914] transition-all cursor-pointer shadow-sm"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-xs font-extrabold text-white group-hover/st:text-white">
                                {st.time}
                              </span>
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-zinc-950 text-zinc-300 group-hover/st:bg-white group-hover/st:text-black">
                                {st.format}
                              </span>
                            </div>

                            {showtimeMovie && (
                              <p className="text-[10px] font-bold text-[#f5c518] group-hover/st:text-white truncate mt-0.5">
                                {showtimeMovie.title}
                              </p>
                            )}

                            <p className="text-[10px] text-zinc-400 group-hover/st:text-zinc-100 truncate">
                              {st.screenName}
                            </p>

                            {/* Available Seats Badge */}
                            <div className="mt-1.5 pt-1.5 border-t border-zinc-800/80 group-hover/st:border-red-400/40 flex items-center justify-between text-[10px]">
                              <span className="flex items-center gap-1 text-zinc-400 group-hover/st:text-white">
                                <Armchair className="w-3 h-3" />
                                <span>Seats:</span>
                              </span>
                              <span
                                className={`font-bold px-1.5 py-0.2 rounded ${
                                  isAlmostFull
                                    ? 'bg-red-500/20 text-red-400 group-hover/st:bg-white group-hover/st:text-red-600'
                                    : isFilling
                                    ? 'bg-amber-500/20 text-amber-400 group-hover/st:bg-white group-hover/st:text-amber-700'
                                    : 'bg-emerald-500/20 text-emerald-400 group-hover/st:bg-white group-hover/st:text-emerald-700'
                                }`}
                              >
                                {seatsAvailable} left
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
