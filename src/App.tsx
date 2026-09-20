import React, { useState, useMemo } from 'react';
import { 
  Movie, 
  Theater, 
  Showtime, 
  FilterState, 
  Booking, 
  SelectedSnack, 
  SeatTier,
  City,
  SelectedLocationPath
} from './types';
import { MOVIES_DATA } from './data/movies';
import { GLOBAL_CITIES, DEFAULT_CITY } from './data/cities';
import { 
  DEFAULT_LOCATION_PATH, 
  resolveLocationDetails, 
  convertHierarchyToCity, 
  HIERARCHY_COUNTRIES 
} from './data/hierarchyLocations';
import { getUpcomingDates, DateOption } from './utils/date';
import { getStoredBookings, getStoredCityId, saveStoredCityId } from './utils/storage';
import { ToastProvider, useToast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { MovieCard } from './components/MovieCard';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { SeatPicker } from './components/SeatPicker';
import { SnacksModal } from './components/SnacksModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { MyBookingsView } from './components/MyBookingsView';
import { CascadingLocationPicker } from './components/CascadingLocationPicker';
import { NearbyTheatersSection } from './components/NearbyTheatersSection';
import { HomeSearchBar } from './components/HomeSearchBar';
import { UpcomingMoviesSection } from './components/UpcomingMoviesSection';
import { 
  Clapperboard, 
  ShieldCheck, 
  Tv, 
  Sparkles,
  MapPin,
  Building2,
  Globe2,
  Film
} from 'lucide-react';

export function CineBookApp() {
  const { showToast } = useToast();

  // Navigation View State
  const [currentView, setCurrentView] = useState<'home' | 'bookings' | 'seat-picker'>('home');

  // Cascading Location Hierarchy State (Country -> State -> District -> City/Town)
  const [locationPath, setLocationPath] = useState<SelectedLocationPath>(() => {
    try {
      const saved = localStorage.getItem('cinebook_hierarchy_location');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_LOCATION_PATH;
  });

  // Selected theater filter within the current city ('all' or specific theater ID)
  const [selectedTheaterFilterId, setSelectedTheaterFilterId] = useState<string>('all');

  // Resolve current active hierarchy object
  const activeLocation = useMemo(() => {
    return resolveLocationDetails(locationPath);
  }, [locationPath]);

  // Backwards-compatible City object for components, currency formatting, and modals
  const selectedCity: City = useMemo(() => {
    return convertHierarchyToCity(activeLocation);
  }, [activeLocation]);

  const handleLocationChange = (newPath: SelectedLocationPath) => {
    setLocationPath(newPath);
    setSelectedTheaterFilterId('all'); // Reset theater filter on city change
    try {
      localStorage.setItem('cinebook_hierarchy_location', JSON.stringify(newPath));
    } catch (e) {
      console.error(e);
    }
    const details = resolveLocationDetails(newPath);
    showToast(
      `Location updated to ${details.city.name}`,
      'info',
      `Showing ${details.city.theaters.length} local theaters with ticket prices in ${details.country.currency.symbol} ${details.country.currency.code}`
    );
  };

  const handleLegacyCitySelect = (city: City) => {
    // Map flat city back to country hierarchy if possible
    const foundCountry = HIERARCHY_COUNTRIES.find(
      (c) => c.name.toLowerCase() === city.country.toLowerCase() || c.currency.code === city.currency.code
    );
    if (foundCountry) {
      const state = foundCountry.states[0];
      const dist = state?.districts[0];
      const foundCity = dist?.cities.find((ct) => ct.name.toLowerCase() === city.name.toLowerCase()) || dist?.cities[0];
      if (state && dist && foundCity) {
        handleLocationChange({
          countryId: foundCountry.id,
          stateId: state.id,
          districtId: dist.id,
          cityId: foundCity.id,
        });
        return;
      }
    }
    saveStoredCityId(city.id);
  };

  // Bookings list in state
  const [bookings, setBookings] = useState<Booking[]>(() => getStoredBookings());

  const refreshBookings = () => {
    setBookings(getStoredBookings());
  };

  // Filter & Search State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedGenre: 'all',
    selectedLanguage: 'all',
    selectedFormat: 'all',
    statusFilter: 'all',
  });

  // Selected Movie for Details modal
  const [selectedMovieForDetails, setSelectedMovieForDetails] = useState<Movie | null>(null);

  // 2026 Theatrical Screening Date Selection (Anchored to 19/09/2026)
  const screeningDates = useMemo(() => getUpcomingDates(7), []);
  const [selectedScreeningDate, setSelectedScreeningDate] = useState<DateOption>(screeningDates[0]);

  // Active Booking Flow State
  const [activeBookingFlow, setActiveBookingFlow] = useState<{
    movie: Movie;
    theater: Theater;
    showtime: Showtime;
    date: DateOption;
  } | null>(null);

  // Seat picking outcomes
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSeatTiers, setSelectedSeatTiers] = useState<Record<string, SeatTier>>({});
  const [ticketsSubtotalUSD, setTicketsSubtotalUSD] = useState<number>(0);

  // Modals visibility
  const [isSnacksModalOpen, setIsSnacksModalOpen] = useState<boolean>(false);
  const [selectedSnacks, setSelectedSnacks] = useState<SelectedSnack[]>([]);
  const [snacksSubtotalUSD, setSnacksSubtotalUSD] = useState<number>(0);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Filtered Movies calculation across all languages & upcoming
  const filteredMovies = useMemo(() => {
    return MOVIES_DATA.filter((m) => {
      // 1. Status
      if (filters.statusFilter !== 'all' && m.status !== filters.statusFilter) {
        return false;
      }
      // 2. Genre
      if (filters.selectedGenre !== 'all' && !m.genres.includes(filters.selectedGenre as any)) {
        return false;
      }
      // 3. Language
      if (filters.selectedLanguage !== 'all' && !m.languages.includes(filters.selectedLanguage as any)) {
        return false;
      }
      // 4. Format
      if (filters.selectedFormat !== 'all' && !m.formats.includes(filters.selectedFormat as any)) {
        return false;
      }
      // 5. Search query (title, synopsis, director, genres, languages, cast)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchTitle = m.title.toLowerCase().includes(query);
        const matchGenres = m.genres.some((g) => g.toLowerCase().includes(query));
        const matchLanguages = m.languages.some((l) => l.toLowerCase().includes(query));
        const matchDirector = m.director.toLowerCase().includes(query);
        const matchCast = m.cast.some((c) => c.name.toLowerCase().includes(query) || c.role.toLowerCase().includes(query));
        if (!matchTitle && !matchGenres && !matchLanguages && !matchDirector && !matchCast) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  // Featured Movies for Hero
  const featuredMovies = useMemo(() => {
    return MOVIES_DATA.filter((m) => m.featured || m.rating >= 8.8);
  }, []);

  // Now Showing and Coming Soon slices
  const nowShowingMovies = useMemo(() => {
    return filteredMovies.filter((m) => m.status === 'now_showing');
  }, [filteredMovies]);

  // Active theaters based on selected theater filter
  const activeTheaters = useMemo(() => {
    if (selectedTheaterFilterId === 'all') {
      return activeLocation.theaters;
    }
    return activeLocation.theaters.filter((t) => t.id === selectedTheaterFilterId);
  }, [activeLocation.theaters, selectedTheaterFilterId]);

  // Selected single theater object (if not 'all')
  const selectedTheater = useMemo(() => {
    if (selectedTheaterFilterId === 'all') return null;
    return activeLocation.theaters.find((t) => t.id === selectedTheaterFilterId) || null;
  }, [activeLocation.theaters, selectedTheaterFilterId]);

  // Set of running movie IDs in the active theaters
  const activeRunningMovieIds = useMemo(() => {
    const ids = new Set<string>();
    activeTheaters.forEach((t) => {
      if (t.runningMovieIds && t.runningMovieIds.length > 0) {
        t.runningMovieIds.forEach((id) => ids.add(id));
      }
    });
    return ids;
  }, [activeTheaters]);

  // Movies running strictly in the selected theater(s) as per year 2026
  const nowShowingMoviesInSelectedTheaters = useMemo(() => {
    return filteredMovies.filter((m) => {
      if (m.status !== 'now_showing') return false;
      if (m.releaseYear !== 2026) return false;
      if (activeRunningMovieIds.size === 0) return true;
      return activeRunningMovieIds.has(m.id);
    });
  }, [filteredMovies, activeRunningMovieIds]);

  const comingSoonMovies = useMemo(() => {
    return filteredMovies.filter((m) => m.status === 'coming_soon');
  }, [filteredMovies]);

  // Handlers
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedGenre: 'all',
      selectedLanguage: 'all',
      selectedFormat: 'all',
      statusFilter: 'all',
    });
    showToast('Filters reset', 'info');
  };

  // Click "Book Tickets" directly on card or hero
  const handleInitiateBookMovie = (movie: Movie) => {
    setSelectedMovieForDetails(movie);
  };

  // From details modal, user picked a showtime
  const handleSelectShowtime = (
    movie: Movie,
    theater: Theater,
    showtime: Showtime,
    selectedDate: DateOption
  ) => {
    setSelectedMovieForDetails(null);
    setActiveBookingFlow({
      movie,
      theater,
      showtime,
      date: selectedDate,
    });
    setCurrentView('seat-picker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Select seats', 'info', `Choose seats for ${movie.title} at ${theater.name}`);
  };

  // From seat picker, proceed to snacks
  const handleProceedToSnacks = (
    seatIds: string[],
    tiers: Record<string, SeatTier>,
    totalTicketPriceUSD: number
  ) => {
    setSelectedSeats(seatIds);
    setSelectedSeatTiers(tiers);
    setTicketsSubtotalUSD(totalTicketPriceUSD);
    setIsSnacksModalOpen(true);
  };

  // From snacks modal, proceed to checkout
  const handleContinueToCheckout = (snacks: SelectedSnack[], totalSnackCostUSD: number) => {
    setSelectedSnacks(snacks);
    setSnacksSubtotalUSD(totalSnackCostUSD);
    setIsSnacksModalOpen(false);
    setIsCheckoutModalOpen(true);
  };

  // Booking confirmed successfully
  const handleBookingConfirmed = (booking: Booking) => {
    setIsCheckoutModalOpen(false);
    setConfirmedBooking(booking);
    refreshBookings();
    showToast('Tickets booked!', 'success', `Booking ID: ${booking.id}`);
  };

  // Handler for showtime selection from NearbyTheatersSection
  const handleSelectTheaterShowtime = (theater: Theater, showtime: Showtime, movie: Movie) => {
    handleSelectShowtime(movie, theater, showtime, selectedScreeningDate);
  };

  const isFilteringOrSearching =
    filters.selectedGenre !== 'all' ||
    filters.selectedLanguage !== 'all' ||
    filters.selectedFormat !== 'all' ||
    filters.statusFilter !== 'all' ||
    filters.searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView === 'seat-picker' ? 'home' : currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookingCount={bookings.filter((b) => b.status === 'confirmed').length}
        activeCategory={filters.statusFilter}
        onSelectCategory={(cat) => handleFilterChange({ statusFilter: cat })}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        selectedCity={selectedCity}
        onSelectCity={handleLegacyCitySelect}
        allCities={GLOBAL_CITIES}
      />

      {/* Main View Router */}
      {currentView === 'home' && (
        <main className="flex-1 pb-16">
          {/* Immersive Hero Banner with Auto-Carousel */}
          {!isFilteringOrSearching && (
            <HeroBanner
              featuredMovies={featuredMovies}
              selectedDate={selectedScreeningDate}
              onBookMovie={handleInitiateBookMovie}
            />
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
            {/* 1. Home Search Bar */}
            <HomeSearchBar
              searchQuery={filters.searchQuery}
              onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
              moviesCount={filteredMovies.length}
              theatersCount={activeLocation.city.theaters.length}
              currentLocationName={activeLocation.city.name}
            />

            {/* 2. Cascading Location Selection: Country → State → District → City / Small City */}
            <CascadingLocationPicker
              locationPath={locationPath}
              onLocationChange={handleLocationChange}
            />

            {/* 3. Nearby Theaters Section: Theater name, address, showtimes, seats, prices */}
            <NearbyTheatersSection
              theaters={activeLocation.city.theaters}
              cityName={activeLocation.city.name}
              districtName={activeLocation.district.name}
              stateName={activeLocation.state.name}
              countryName={activeLocation.country.name}
              currency={activeLocation.country.currency}
              runningMovies={nowShowingMovies}
              selectedDate={selectedScreeningDate}
              selectedTheaterId={selectedTheaterFilterId}
              onSelectTheaterFilter={(id) => setSelectedTheaterFilterId(id)}
              onSelectShowtime={handleSelectTheaterShowtime}
              onExploreMovie={(m) => setSelectedMovieForDetails(m)}
            />

            {/* 4. Smart Filter Bar */}
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={filteredMovies.length}
            />

            {/* Movies Content Section */}
            {isFilteringOrSearching ? (
              <section id="search-results-section" className="pt-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                      Search & Filter Results
                    </h2>
                    <p className="text-xs text-zinc-400">
                      {filteredMovies.length} movies match your selected criteria
                    </p>
                  </div>
                </div>

                {filteredMovies.length === 0 ? (
                  <div 
                    id="no-movies-found-state"
                    className="py-16 text-center bg-zinc-900/40 rounded-3xl border border-zinc-800 p-8"
                  >
                    <Clapperboard className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-1">No Movies Match Your Criteria</h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-5">
                      Try resetting your filters or selecting "All Languages" to browse our worldwide cinema catalog.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-5 py-2.5 rounded-xl bg-[#e50914] text-white text-xs font-bold shadow-lg cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {filteredMovies.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onSelectMovie={(m) => setSelectedMovieForDetails(m)}
                        onBookTickets={(m) => handleInitiateBookMovie(m)}
                      />
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <>
                {/* 5. Currently Running Movies in Selected Theaters */}
                <section id="now-showing-section" className="pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-6 rounded-full bg-[#e50914]" />
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight flex items-center gap-2">
                          <span>
                            {selectedTheater 
                              ? `Currently Running at ${selectedTheater.name} (2026 Theatrical Season)` 
                              : `Currently Running in ${activeLocation.city.name} Theaters (2026 Theatrical Season)`}
                          </span>
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {selectedTheater
                            ? `Showing verified 2026 releases actively screening at ${selectedTheater.name} (${selectedTheater.distance}).`
                            : `Showing verified 2026 releases actively screening across partner theaters in ${activeLocation.city.name}.`}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 self-start sm:self-auto flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-[#e50914]" />
                      <span>{nowShowingMoviesInSelectedTheaters.length} Movies Screening (2026)</span>
                    </span>
                  </div>

                  {/* Theater Quick Filter Pills Bar */}
                  {activeLocation.city.theaters.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-3 mb-5">
                      <span className="text-xs font-semibold text-zinc-400 shrink-0 mr-1 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Filter by Theater:</span>
                      </span>

                      <button
                        onClick={() => setSelectedTheaterFilterId('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                          selectedTheaterFilterId === 'all'
                            ? 'bg-[#e50914] text-white shadow-md'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        All Theaters in {activeLocation.city.name} ({activeLocation.city.theaters.length})
                      </button>

                      {activeLocation.city.theaters.map((th) => {
                        const isSelected = selectedTheaterFilterId === th.id;
                        const movieCount = th.runningMovieIds?.length || 3;
                        return (
                          <button
                            key={th.id}
                            onClick={() => setSelectedTheaterFilterId(isSelected ? 'all' : th.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-[#e50914] text-white shadow-md'
                                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            <span>{th.name}</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded ${isSelected ? 'bg-black/30 text-white' : 'bg-zinc-800 text-zinc-300'}`}>
                              {movieCount} movies
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {nowShowingMoviesInSelectedTheaters.length === 0 ? (
                    <div className="py-12 text-center bg-zinc-900/40 rounded-3xl border border-zinc-800 p-8">
                      <Film className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                      <h3 className="text-base font-bold text-white mb-1">No Running Movies Found for this Selection</h3>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
                        Switch back to viewing all theaters in {activeLocation.city.name} to see the complete list of running films.
                      </p>
                      <button
                        onClick={() => setSelectedTheaterFilterId('all')}
                        className="px-4 py-2 rounded-xl bg-[#e50914] text-white text-xs font-bold shadow cursor-pointer"
                      >
                        View All Theaters in {activeLocation.city.name}
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                      {nowShowingMoviesInSelectedTheaters.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          onSelectMovie={(m) => setSelectedMovieForDetails(m)}
                          onBookTickets={(m) => handleInitiateBookMovie(m)}
                        />
                      ))}
                    </div>
                  )}
                </section>

                {/* 6. Upcoming Movies Section with Regular Updates */}
                <UpcomingMoviesSection
                  movies={comingSoonMovies}
                  onSelectMovie={(m) => setSelectedMovieForDetails(m)}
                />

                {/* 7. Cinematic Perks Bento Banner */}
                <section className="pt-8">
                  <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 p-6 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#e50914]/15 border border-[#e50914]/30 flex items-center justify-center text-[#e50914] shrink-0">
                        <Tv className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-display">
                          IMAX, Dolby Atmos & 4DX
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          Crystal clear dual laser projection, vibrating motion seats, and pinpoint spatial audio in every certified auditorium.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#f5c518]/15 border border-[#f5c518]/30 flex items-center justify-center text-[#f5c518] shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-display">
                          Instant Digital E-Tickets
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          Scan your encrypted digital ticket QR code directly from your phone at the cinema turnstile. No queues, no hassle.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-display">
                          Instant Seat Cancellation
                        </h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          Plans changed? Cancel any time directly from My Bookings with immediate seat release and confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </main>
      )}

      {/* Seat Picker Interactive Screen View */}
      {currentView === 'seat-picker' && activeBookingFlow && (
        <SeatPicker
          movie={activeBookingFlow.movie}
          theater={activeBookingFlow.theater}
          showtime={activeBookingFlow.showtime}
          date={activeBookingFlow.date}
          currency={selectedCity.currency}
          onBack={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onProceedToSnacks={handleProceedToSnacks}
        />
      )}

      {/* My Bookings View */}
      {currentView === 'bookings' && (
        <MyBookingsView
          bookings={bookings}
          onRefreshBookings={refreshBookings}
          onExploreMovies={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Movie Details Modal */}
      {selectedMovieForDetails && (
        <MovieDetailsModal
          movie={selectedMovieForDetails}
          selectedCity={selectedCity}
          initialSelectedDate={selectedScreeningDate}
          onClose={() => setSelectedMovieForDetails(null)}
          onSelectShowtime={handleSelectShowtime}
        />
      )}

      {/* Snacks Concession Modal */}
      {isSnacksModalOpen && (
        <SnacksModal
          currency={selectedCity.currency}
          onClose={() => setIsSnacksModalOpen(false)}
          onContinue={handleContinueToCheckout}
        />
      )}

      {/* Checkout and Payment Modal */}
      {isCheckoutModalOpen && activeBookingFlow && (
        <CheckoutModal
          movie={activeBookingFlow.movie}
          theater={activeBookingFlow.theater}
          showtime={activeBookingFlow.showtime}
          date={activeBookingFlow.date}
          selectedSeats={selectedSeats}
          seatTiers={selectedSeatTiers}
          ticketSubtotalUSD={ticketsSubtotalUSD}
          snacks={selectedSnacks}
          snacksSubtotalUSD={snacksSubtotalUSD}
          currency={selectedCity.currency}
          onBack={() => {
            setIsCheckoutModalOpen(false);
            setIsSnacksModalOpen(true);
          }}
          onBookingSuccess={handleBookingConfirmed}
        />
      )}

      {/* Booking Confirmation / E-Ticket Modal */}
      {confirmedBooking && (
        <ConfirmationModal
          booking={confirmedBooking}
          onViewMyBookings={() => {
            setConfirmedBooking(null);
            setCurrentView('bookings');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onCloseToHome={() => {
            setConfirmedBooking(null);
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Cinematic Footer */}
      <footer className="mt-auto bg-zinc-950 border-t border-zinc-900 py-10 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#e50914] flex items-center justify-center text-white font-black text-xs">
              CB
            </div>
            <span className="font-bold text-zinc-300 font-display text-sm">
              Cine<span className="text-[#e50914]">Book</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span>Worldwide Cinema Booking System</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <Globe2 className="w-3.5 h-3.5 text-[#e50914]" />
            <span>Active City: <strong className="text-white">{selectedCity.name}</strong> ({selectedCity.currency.code})</span>
          </div>

          <p className="text-center sm:text-right text-zinc-500 text-[11px]">
            © {new Date().getFullYear()} CineBook Inc. Frontend-only theatrical experience simulation with localStorage persistence.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CineBookApp />
    </ToastProvider>
  );
}
