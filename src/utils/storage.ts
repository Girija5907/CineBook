import { Booking, CustomerDetails, Seat, SeatTier, CurrencyConfig } from '../types';
import { formatPrice } from './currency';

const STORAGE_KEYS = {
  BOOKINGS: 'cinebook_bookings',
  CONTACT: 'cinebook_user_contact',
  PRE_BOOKED: 'cinebook_occupied_seats_v1',
  SELECTED_CITY: 'cinebook_selected_city_id',
};

// Seed initial occupied seats for specific showtimes so cinema feels real and populated
const DEFAULT_PRE_BOOKED: Record<string, string[]> = {
  'st-morning': ['D6', 'D7', 'E6', 'E7', 'E8', 'C5', 'F7', 'F8', 'G7', 'G8'],
  'st-afternoon': ['C7', 'C8', 'D7', 'D8', 'D9', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'F6', 'F7', 'G5', 'G6', 'H7', 'H8'],
  'st-evening': ['C5', 'C6', 'C7', 'C8', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'F5', 'F6', 'F7', 'F8', 'G6', 'G7', 'G8', 'H6', 'H7'],
  'st-night': ['D5', 'D6', 'D7', 'E7', 'E8', 'F6', 'F7', 'G7'],
};

export function getStoredCityId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_CITY);
  } catch {
    return null;
  }
}

export function saveStoredCityId(cityId: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_CITY, cityId);
  } catch (error) {
    console.error('Failed to save selected city', error);
  }
}

export function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to load bookings from localStorage', error);
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  try {
    const current = getStoredBookings();
    const updated = [booking, ...current];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save booking', error);
  }
}

export function cancelBooking(bookingId: string): boolean {
  try {
    const current = getStoredBookings();
    const updated = current.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b));
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Failed to cancel booking', error);
    return false;
  }
}

export function getStoredContact(): CustomerDetails | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACT);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveStoredContact(contact: CustomerDetails): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contact));
  } catch (error) {
    console.error('Failed to save contact details', error);
  }
}

export function getBookedSeatsForShowtime(
  showtimeId: string,
  date: string
): Set<string> {
  const bookedSet = new Set<string>();

  // 1. Initial seeded occupancy
  const seeded = DEFAULT_PRE_BOOKED[showtimeId] || ['D7', 'D8', 'E7', 'E8'];
  seeded.forEach((s) => bookedSet.add(s));

  // 2. Active bookings saved by the user
  const userBookings = getStoredBookings();
  userBookings.forEach((b) => {
    if (b.showtimeId === showtimeId && b.date === date && b.status === 'confirmed') {
      b.seats.forEach((seatId) => bookedSet.add(seatId));
    }
  });

  return bookedSet;
}

export const CINEMA_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
export const TOTAL_COLS = 14;

export function getSeatTier(row: string): SeatTier {
  if (row === 'A' || row === 'B') return 'standard';
  if (row === 'G' || row === 'H') return 'vip';
  return 'premium';
}

export function getSeatBasePriceUSD(
  tier: SeatTier,
  prices: { priceStandardUSD: number; pricePremiumUSD: number; priceVIPUSD: number }
): number {
  if (tier === 'standard') return prices.priceStandardUSD;
  if (tier === 'vip') return prices.priceVIPUSD;
  return prices.pricePremiumUSD;
}

export function generateAuditoriumSeats(
  showtimeId: string,
  date: string,
  prices: { priceStandardUSD: number; pricePremiumUSD: number; priceVIPUSD: number },
  currency: CurrencyConfig
): Seat[][] {
  const bookedSet = getBookedSeatsForShowtime(showtimeId, date);

  return CINEMA_ROWS.map((row) => {
    const rowSeats: Seat[] = [];
    const tier = getSeatTier(row);
    const priceUSD = getSeatBasePriceUSD(tier, prices);
    const priceFormatted = formatPrice(priceUSD, currency);

    for (let col = 1; col <= TOTAL_COLS; col++) {
      const seatId = `${row}${col}`;
      const isBooked = bookedSet.has(seatId);
      // Added two more accessible seats: A1, A2, A13, A14 (was previously only A1 and A14)
      const isAccessible = row === 'A' && (col === 1 || col === 2 || col === 13 || col === 14);

      rowSeats.push({
        id: seatId,
        row,
        col,
        tier,
        priceUSD,
        priceFormatted,
        status: isBooked ? 'booked' : 'available',
        isAccessible,
      });
    }
    return rowSeats;
  });
}
