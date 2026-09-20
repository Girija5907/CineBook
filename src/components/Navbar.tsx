import React, { useState, useRef, useEffect } from 'react';
import { 
  Clapperboard, 
  MapPin, 
  Ticket, 
  Search, 
  ChevronDown, 
  X, 
  Menu,
  Check,
  Globe2
} from 'lucide-react';
import { City } from '../types';

interface NavbarProps {
  currentView: 'home' | 'bookings';
  onNavigate: (view: 'home' | 'bookings') => void;
  bookingCount: number;
  activeCategory?: 'all' | 'now_showing' | 'coming_soon';
  onSelectCategory?: (category: 'all' | 'now_showing' | 'coming_soon') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: City;
  onSelectCity: (city: City) => void;
  allCities: City[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  bookingCount,
  activeCategory = 'all',
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedCity,
  onSelectCity,
  allCities,
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = allCities.filter((c) => {
    if (!citySearch.trim()) return true;
    const query = citySearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.country.toLowerCase().includes(query) ||
      c.currency.code.toLowerCase().includes(query) ||
      c.region.toLowerCase().includes(query)
    );
  });

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo & City */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            id="nav-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#e50914] to-red-500 flex items-center justify-center shadow-lg shadow-red-950/60 group-hover:scale-105 transition-transform duration-200">
              <Clapperboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-display">
                  Cine<span className="text-[#e50914]">Book</span>
                </span>
                {/* Note: "VIP" badge has been removed as requested */}
              </div>
              <p className="text-[10px] text-zinc-400 font-medium tracking-wide hidden sm:block">
                GLOBAL THEATRICAL NETWORK
              </p>
            </div>
          </button>

          {/* Worldwide City & Currency Picker */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="city-picker-btn"
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-colors shadow-sm"
              title="Change cinema city and currency"
            >
              <MapPin className="w-3.5 h-3.5 text-[#e50914] shrink-0" />
              <div className="flex items-center gap-1.5 font-medium">
                <span className="text-white font-semibold">{selectedCity.name}</span>
                <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-[#f5c518] text-[10px] font-bold">
                  {selectedCity.currency.symbol} {selectedCity.currency.code}
                </span>
              </div>
              <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* City Selector Dropdown */}
            {cityDropdownOpen && (
              <div 
                id="city-dropdown-menu"
                className="absolute left-0 mt-2 w-72 sm:w-80 bg-zinc-950 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl"
              >
                <div className="p-3 border-b border-zinc-800/80 bg-zinc-900/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-[#e50914]" />
                      Select Global City & Currency
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {allCities.length} Cities
                    </span>
                  </div>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search city, country, or currency..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 outline-none focus:border-[#e50914]"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-zinc-900/60 p-1">
                  {filteredCities.length === 0 ? (
                    <div className="py-6 text-center text-xs text-zinc-500">
                      No matching cities found
                    </div>
                  ) : (
                    filteredCities.map((city) => {
                      const isSelected = selectedCity.id === city.id;
                      return (
                        <button
                          key={city.id}
                          onClick={() => {
                            onSelectCity(city);
                            setCityDropdownOpen(false);
                            setCitySearch('');
                          }}
                          className={`w-full text-left px-3 py-2.5 text-xs rounded-xl transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#e50914]/15 border border-[#e50914]/30 text-white font-bold'
                              : 'hover:bg-zinc-900 text-zinc-300'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-white">{city.name}</span>
                              <span className="text-[10px] text-zinc-400 font-normal">
                                ({city.country})
                              </span>
                            </div>
                            <span className="text-[10px] text-zinc-500 block truncate">
                              {city.theaters.length} local theatres near {city.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="px-2 py-0.5 rounded bg-zinc-800 text-[#f5c518] text-[11px] font-bold font-mono">
                              {city.currency.symbol} {city.currency.code}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-[#e50914]" />}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Search Bar on Desktop */}
        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="navbar-search-input"
              type="text"
              placeholder="Search movies across all languages, genres, directors..."
              value={searchQuery}
              onChange={(e) => {
                if (currentView !== 'home') onNavigate('home');
                onSearchChange(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-zinc-900/90 border border-zinc-800 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] text-zinc-200 placeholder:text-zinc-500 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-2 sm:gap-3">
          {currentView === 'home' && (
            <div className="hidden sm:flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
              <button
                id="tab-all-movies"
                onClick={() => onSelectCategory?.('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#e50914] text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All
              </button>
              <button
                id="tab-now-showing"
                onClick={() => onSelectCategory?.('now_showing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === 'now_showing'
                    ? 'bg-[#e50914] text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Now Showing
              </button>
              <button
                id="tab-coming-soon"
                onClick={() => onSelectCategory?.('coming_soon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === 'coming_soon'
                    ? 'bg-[#e50914] text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Coming Soon
              </button>
            </div>
          )}

          {/* My Bookings Button */}
          <button
            id="nav-my-bookings-btn"
            onClick={() => onNavigate(currentView === 'bookings' ? 'home' : 'bookings')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentView === 'bookings'
                ? 'bg-[#e50914] text-white shadow-lg shadow-red-950/50'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800'
            }`}
          >
            <Ticket className="w-4 h-4 text-[#f5c518]" />
            <span className="hidden sm:inline">My Bookings</span>
            {bookingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#e50914] text-white text-[10px] font-black flex items-center justify-center border border-zinc-900">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="sm:hidden border-t border-zinc-800 bg-zinc-950 p-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => {
                if (currentView !== 'home') onNavigate('home');
                onSearchChange(e.target.value);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onSelectCategory?.('all');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-semibold rounded-lg text-center ${
                activeCategory === 'all' ? 'bg-[#e50914] text-white' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                onSelectCategory?.('now_showing');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-semibold rounded-lg text-center ${
                activeCategory === 'now_showing' ? 'bg-[#e50914] text-white' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              Now Showing
            </button>
            <button
              onClick={() => {
                onSelectCategory?.('coming_soon');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-xs font-semibold rounded-lg text-center ${
                activeCategory === 'coming_soon' ? 'bg-[#e50914] text-white' : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              Coming Soon
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
