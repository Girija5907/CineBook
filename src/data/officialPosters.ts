// Official Poster Art and Styling Metadata for Theatrical Releases
import {
  VISWANATH_AND_SONS_POSTER,
  MANDAADI_POSTER,
  MOTHARATHRI_POSTER,
  SIGMA_POSTER,
  COOLIE_POSTER,
  THALAPATHY_69_POSTER,
  GOOD_BAD_UGLY_POSTER,
  RAMAYANA_PART_1_POSTER,
  TOXIC_POSTER,
  SPIRIT_POSTER,
  WAR_2_POSTER,
  AVENGERS_DOOMSDAY_POSTER,
} from './officialMoviePostersSvg';

export interface OfficialPosterMeta {
  movieId: string;
  title: string;
  year: number;
  ratingBadge: string;
  tagline: string;
  accentColor: string;
  bgGradient: string;
  studioLogo: string;
  formatBadges: string[];
  officialTheatricalPosterUrl: string;
  officialBackdropUrl: string;
}

export const OFFICIAL_POSTER_ART: Record<string, OfficialPosterMeta> = {
  // 1. VISWANATH AND SONS (NOW RUNNING)
  'viswanath-and-sons': {
    movieId: 'viswanath-and-sons',
    title: 'VISHWANATH & SONS',
    year: 2026,
    ratingBadge: 'U/A',
    tagline: 'Love with a difference • Family with a purpose.',
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-950 via-zinc-950 to-black',
    studioLogo: 'SITHARA ENTERTAINMENTS & FORTUNE FOUR CINEMAS',
    formatBadges: ['RGB LASER', 'DOLBY ATMOS', 'EPIQ'],
    officialTheatricalPosterUrl: VISWANATH_AND_SONS_POSTER,
    officialBackdropUrl: VISWANATH_AND_SONS_POSTER,
  },

  // 2. MANDAADI (NOW RUNNING)
  mandaadi: {
    movieId: 'mandaadi',
    title: 'MANDAADI',
    year: 2026,
    ratingBadge: 'U/A 13+',
    tagline: 'Ropes • Rage • Revenge on the turbulent waves.',
    accentColor: '#0284c7',
    bgGradient: 'from-sky-950 via-slate-950 to-black',
    studioLogo: 'RS INFOTAINMENT & VETRI MAARAN',
    formatBadges: ['IMAX', 'DOLBY ATMOS', 'EPIQ 4K'],
    officialTheatricalPosterUrl: MANDAADI_POSTER,
    officialBackdropUrl: MANDAADI_POSTER,
  },

  // 3. MOTHARATHRI (MODHA RATHRI) (NOW RUNNING)
  motharathri: {
    movieId: 'motharathri',
    title: 'MOTHARATHRI',
    year: 2026,
    ratingBadge: 'U/A 13+',
    tagline: 'One wedding night • A million hilarious twists.',
    accentColor: '#a855f7',
    bgGradient: 'from-purple-950 via-fuchsia-950 to-black',
    studioLogo: 'MYTHRI MOVIE MAKERS & RAJA KARUPPASAMY',
    formatBadges: ['DOLBY 7.1', '4K LASER', 'FAMILY COMEDY'],
    officialTheatricalPosterUrl: MOTHARATHRI_POSTER,
    officialBackdropUrl: MOTHARATHRI_POSTER,
  },

  // 4. COOLIE
  coolie: {
    movieId: 'coolie',
    title: 'COOLIE',
    year: 2026,
    ratingBadge: 'U/A 16+',
    tagline: 'A syndicate built of gold, broken by one man.',
    accentColor: '#f5c518',
    bgGradient: 'from-amber-950 via-zinc-950 to-black',
    studioLogo: 'SUN PICTURES & LOKESH KANAGARAJ',
    formatBadges: ['IMAX', 'DOLBY ATMOS', 'RGB LASER'],
    officialTheatricalPosterUrl: COOLIE_POSTER,
    officialBackdropUrl: COOLIE_POSTER,
  },

  // 5. THALAPATHY 69
  'thalapathy-69': {
    movieId: 'thalapathy-69',
    title: 'THALAPATHY 69',
    year: 2026,
    ratingBadge: 'U/A 16+',
    tagline: 'The torchbearer of democracy. The final salute.',
    accentColor: '#e50914',
    bgGradient: 'from-red-950 via-zinc-950 to-black',
    studioLogo: 'KVN PRODUCTIONS & H. VINOTH',
    formatBadges: ['IMAX', 'DOLBY CINEMA', '4DX'],
    officialTheatricalPosterUrl: THALAPATHY_69_POSTER,
    officialBackdropUrl: THALAPATHY_69_POSTER,
  },

  // 6. GOOD BAD UGLY
  'good-bad-ugly': {
    movieId: 'good-bad-ugly',
    title: 'GOOD BAD UGLY',
    year: 2026,
    ratingBadge: 'U/A 16+',
    tagline: 'He is not the hero you asked for. He is the storm.',
    accentColor: '#eab308',
    bgGradient: 'from-yellow-950 via-zinc-950 to-black',
    studioLogo: 'MYTHRI MOVIE MAKERS & ADHIK RAVICHANDRAN',
    formatBadges: ['IMAX', 'DOLBY CINEMA', 'LASER 2D'],
    officialTheatricalPosterUrl: GOOD_BAD_UGLY_POSTER,
    officialBackdropUrl: GOOD_BAD_UGLY_POSTER,
  },

  // 7. RAMAYANA: PART 1
  'ramayana-part-1': {
    movieId: 'ramayana-part-1',
    title: 'RAMAYANA: PART 1',
    year: 2026,
    ratingBadge: 'U/A',
    tagline: 'The timeless divine epic brought to cinematic majesty.',
    accentColor: '#fbbf24',
    bgGradient: 'from-yellow-950 via-amber-950 to-black',
    studioLogo: 'DNEG & NITESH TIWARI',
    formatBadges: ['IMAX 3D', 'DOLBY ATMOS', 'LASER 4K'],
    officialTheatricalPosterUrl: RAMAYANA_PART_1_POSTER,
    officialBackdropUrl: RAMAYANA_PART_1_POSTER,
  },

  // 8. TOXIC
  toxic: {
    movieId: 'toxic',
    title: 'TOXIC',
    year: 2026,
    ratingBadge: 'A',
    tagline: 'A fairy tale for grown-ups drenched in smoke.',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950 via-zinc-950 to-black',
    studioLogo: 'MONSTER MIND CREATIONS & GEETU MOHANDAS',
    formatBadges: ['IMAX', 'DOLBY CINEMA', 'LASER 2D'],
    officialTheatricalPosterUrl: TOXIC_POSTER,
    officialBackdropUrl: TOXIC_POSTER,
  },

  // 9. SPIRIT
  spirit: {
    movieId: 'spirit',
    title: 'SPIRIT',
    year: 2026,
    ratingBadge: 'A',
    tagline: 'When an unhinged cop snaps, the underworld burns.',
    accentColor: '#f43f5e',
    bgGradient: 'from-rose-950 via-zinc-950 to-black',
    studioLogo: 'T-SERIES & BHADRAKALI PICTURES',
    formatBadges: ['IMAX 3D', '4DX', 'DOLBY CINEMA'],
    officialTheatricalPosterUrl: SPIRIT_POSTER,
    officialBackdropUrl: SPIRIT_POSTER,
  },

  // 10. WAR 2
  'war-2': {
    movieId: 'war-2',
    title: 'WAR 2',
    year: 2026,
    ratingBadge: 'U/A 16+',
    tagline: 'Two titans of espionage. One world left standing.',
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-950 via-zinc-950 to-black',
    studioLogo: 'YASH RAJ FILMS & AYAN MUKERJI',
    formatBadges: ['IMAX 3D', '4DX', 'DOLBY CINEMA'],
    officialTheatricalPosterUrl: WAR_2_POSTER,
    officialBackdropUrl: WAR_2_POSTER,
  },

  // 11. AVENGERS: DOOMSDAY
  'avengers-doomsday': {
    movieId: 'avengers-doomsday',
    title: 'AVENGERS: DOOMSDAY',
    year: 2026,
    ratingBadge: 'PG-13',
    tagline: 'A new mask. A new destiny. The end of all timelines.',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950 via-zinc-950 to-black',
    studioLogo: 'MARVEL STUDIOS & RUSSO BROTHERS',
    formatBadges: ['IMAX 3D', '4DX', 'DOLBY CINEMA'],
    officialTheatricalPosterUrl: AVENGERS_DOOMSDAY_POSTER,
    officialBackdropUrl: AVENGERS_DOOMSDAY_POSTER,
  },

  // =========================================================================
  // ONLY UPCOMING MOVIE: SIGMA (Releasing October 02, 2026)
  // =========================================================================
  sigma: {
    movieId: 'sigma',
    title: 'SIGMA',
    year: 2026,
    ratingBadge: 'U/A 16+',
    tagline: '500 Crores. One rogue voice. The heist begins.',
    accentColor: '#eab308',
    bgGradient: 'from-amber-950 via-zinc-950 to-black',
    studioLogo: 'LYCA PRODUCTIONS & JASON SANJAY',
    formatBadges: ['IMAX 2D', 'DOLBY ATMOS', 'RGB LASER'],
    officialTheatricalPosterUrl: SIGMA_POSTER,
    officialBackdropUrl: SIGMA_POSTER,
  },
};
