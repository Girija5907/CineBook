export type MovieGenre = 
  | 'Action' 
  | 'Sci-Fi' 
  | 'Drama' 
  | 'Thriller' 
  | 'Animation' 
  | 'Adventure' 
  | 'Crime' 
  | 'Romance' 
  | 'Comedy'
  | 'Horror'
  | 'Fantasy'
  | 'Family'
  | 'Sport';

export type MovieLanguage = 
  | 'English' 
  | 'Spanish' 
  | 'Hindi' 
  | 'Japanese' 
  | 'French' 
  | 'Korean'
  | 'Telugu'
  | 'Tamil'
  | 'Kannada'
  | 'Malayalam'
  | 'German'
  | 'Mandarin'
  | 'Italian'
  | 'Arabic';

export type MovieFormat = 
  | 'IMAX 3D' 
  | '4DX' 
  | 'Dolby Cinema' 
  | 'Laser 2D' 
  | 'ScreenX'
  | 'RGB Laser 4K'
  | 'Dolby Atmos'
  | 'EPIQ'
  | 'IMAX'
  | 'IMAX 2D'
  | 'Dolby 7.1'
  | '4K Digital'
  | 'EPIQ 4K';

export type SeatTier = 'standard' | 'premium' | 'vip';

export interface CurrencyConfig {
  code: string;
  name?: string;
  symbol: string;
  exchangeRate: number; // Multiplier relative to USD base
  decimals: number;     // 0 for JPY/KRW, 2 for USD/EUR/GBP/INR
  position: 'prefix' | 'suffix';
}

export interface City {
  id: string;
  name: string;
  country: string;
  region: 'North America' | 'Europe' | 'Asia & Middle East' | 'Oceania' | 'South America' | 'Africa';
  currency: CurrencyConfig;
  theaters: Theater[];
}

export interface CastMember {
  name: string;        // Real name of the actor
  role: string;        // Character name
  avatarUrl: string;   // Original photo/look of the character in the movie
  characterBio?: string;
  characterLook?: string; // Specific movie costume, appearance, or weapon details
  characterBadge?: string; // e.g. "Protagonist", "Antagonist", "Master of Magic"
}

export interface Showtime {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
  format: MovieFormat;
  priceStandardUSD: number;
  pricePremiumUSD: number;
  priceVIPUSD: number;
  occupancyStatus: 'available' | 'filling_fast' | 'almost_full';
  availableSeats?: number;
  totalSeats?: number;
  screenName: string;
  movieId?: string;
  movieTitle?: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  fullAddress?: string;
  distance: string;
  amenities: string[];
  showtimes: Showtime[];
  runningMovieIds?: string[];
  contactPhone?: string;
}

export interface HierarchyCity {
  id: string;
  name: string;
  isSmallCity?: boolean;
  theaters: Theater[];
}

export interface HierarchyDistrict {
  id: string;
  name: string;
  cities: HierarchyCity[];
}

export interface HierarchyState {
  id: string;
  name: string;
  districts: HierarchyDistrict[];
}

export interface HierarchyCountry {
  id: string;
  name: string;
  flag: string;
  code: string;
  currency: CurrencyConfig;
  states: HierarchyState[];
}

export interface SelectedLocationPath {
  countryId: string;
  stateId: string;
  districtId: string;
  cityId: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  tagline: string;
  synopsis: string;
  rating: number;
  votesCount: string;
  duration: string;
  releaseYear: number;
  ageRating: 'PG-13' | 'R' | 'PG' | 'U/A 16+' | 'U/A 13+' | 'U/A' | 'A' | '12A' | 'G';
  genres: MovieGenre[];
  languages: MovieLanguage[];
  formats: MovieFormat[];
  posterUrl: string;
  backdropUrl: string;
  trailerVideoUrl: string;
  youtubeUrl?: string;
  director: string;
  cast: CastMember[];
  status: 'now_showing' | 'coming_soon';
  featured?: boolean;
  theaters?: Theater[];
  expectedReleaseDate?: string;
  daysUntilRelease?: number;
  officialLogoUrl?: string;
  filmCalendarReleaseDate?: string;
  filmCalendarProduction?: string;
}

export interface Seat {
  id: string;
  row: string;
  col: number;
  tier: SeatTier;
  priceUSD: number;
  priceFormatted: string;
  status: 'available' | 'selected' | 'booked';
  isAccessible?: boolean;
}

export interface SnackItem {
  id: string;
  name: string;
  category: 'combo' | 'popcorn' | 'beverage' | 'sweets';
  priceUSD: number;
  image: string;
  description: string;
  badge?: string;
}

export interface SelectedSnack {
  id: string;
  name: string;
  priceUSD: number;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  cityId: string;
  cityName: string;
  theaterId: string;
  theaterName: string;
  theaterLocation: string;
  showtimeId: string;
  showtime: string;
  screenName: string;
  date: string;
  format: MovieFormat;
  seats: string[];
  seatTiers: Record<string, SeatTier>;
  currencyCode: string;
  currencySymbol: string;
  ticketsSubtotal: number;
  ticketsSubtotalUSD?: number;
  snacksTotal: number;
  bookingFee: number;
  taxes: number;
  totalAmount: number;
  totalAmountUSD?: number;
  totalAmountFormatted?: string;
  formattedTotal: string;
  snacks: SelectedSnack[];
  customer: CustomerDetails;
  bookedAt: string;
  status: 'confirmed' | 'cancelled';
  qrCodeToken: string;
}

export interface FilterState {
  searchQuery: string;
  selectedGenre: string;
  selectedLanguage: string;
  selectedFormat: string;
  statusFilter: 'all' | 'now_showing' | 'coming_soon';
}
