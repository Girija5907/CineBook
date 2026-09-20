import React, { useState, useMemo } from 'react';
import { Movie, Theater, Showtime, Seat, SeatTier, CurrencyConfig } from '../types';
import { DateOption } from '../utils/date';
import { generateAuditoriumSeats } from '../utils/storage';
import { playSeatClickSound } from '../utils/audio';
import { formatPrice } from '../utils/currency';
import { useToast } from './Toast';
import { 
  ArrowLeft, 
  Tv, 
  Sparkles, 
  Check, 
  Armchair, 
  Accessibility, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';

interface SeatPickerProps {
  movie: Movie;
  theater: Theater;
  showtime: Showtime;
  date: DateOption;
  currency: CurrencyConfig;
  onBack: () => void;
  onProceedToSnacks: (selectedSeatIds: string[], seatTiers: Record<string, SeatTier>, totalTicketPriceUSD: number) => void;
}

export const SeatPicker: React.FC<SeatPickerProps> = ({
  movie,
  theater,
  showtime,
  date,
  currency,
  onBack,
  onProceedToSnacks,
}) => {
  const { showToast } = useToast();
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Prices configuration in USD
  const pricesUSD = useMemo(() => ({
    priceStandardUSD: showtime.priceStandardUSD,
    pricePremiumUSD: showtime.pricePremiumUSD,
    priceVIPUSD: showtime.priceVIPUSD,
  }), [showtime]);

  // Generate auditorium seat grid with occupied seats loaded from storage + defaults
  const auditoriumSeats = useMemo(() => {
    return generateAuditoriumSeats(showtime.id, date.dateString, pricesUSD, currency);
  }, [showtime.id, date.dateString, pricesUSD, currency]);

  // Flattened seat lookup
  const seatMap = useMemo(() => {
    const map = new Map<string, Seat>();
    auditoriumSeats.forEach((row) => {
      row.forEach((seat) => map.set(seat.id, seat));
    });
    return map;
  }, [auditoriumSeats]);

  // Max seats allowed per single transaction
  const MAX_SEATS = 8;

  // Handle Seat Click
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') {
      showToast('Seat is already booked', 'error', 'Please choose another available seat.');
      return;
    }

    const isAlreadySelected = selectedSeatIds.includes(seat.id);

    if (isAlreadySelected) {
      if (soundEnabled) playSeatClickSound(false);
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= MAX_SEATS) {
        showToast(
          'Maximum seats limit',
          'info',
          `You can select a maximum of ${MAX_SEATS} seats per booking.`
        );
        return;
      }
      if (soundEnabled) playSeatClickSound(true);
      setSelectedSeatIds((prev) => [...prev, seat.id]);
    }
  };

  // Calculate pricing breakdown in USD
  const { totalTicketPriceUSD, seatTiers } = useMemo(() => {
    let totalUSD = 0;
    const tiers: Record<string, SeatTier> = {};

    selectedSeatIds.forEach((id) => {
      const seat = seatMap.get(id);
      if (seat) {
        totalUSD += seat.priceUSD;
        tiers[id] = seat.tier;
      }
    });

    return { totalTicketPriceUSD: totalUSD, seatTiers: tiers };
  }, [selectedSeatIds, seatMap]);

  const handleProceed = () => {
    if (selectedSeatIds.length === 0) {
      showToast('Select seats to continue', 'info', 'Please pick at least one seat.');
      return;
    }
    onProceedToSnacks(selectedSeatIds, seatTiers, totalTicketPriceUSD);
  };

  const handleClearSelection = () => {
    setSelectedSeatIds([]);
  };

  return (
    <div id="seat-picker-view" className="w-full min-h-screen bg-[#0a0a0a] text-zinc-100 pb-36">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              id="seat-picker-back-btn"
              onClick={onBack}
              className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to movie details"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <h2 className="text-sm sm:text-base font-bold text-white font-display flex items-center gap-2">
                <span>{movie.title}</span>
                <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-[#f5c518] text-[10px] font-bold border border-zinc-700">
                  {showtime.format}
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                {theater.name} • <span className="text-zinc-300">{date.fullLabel}</span> at{' '}
                <span className="text-white font-semibold">{showtime.time}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedSeatIds.length > 0 && (
              <button
                onClick={handleClearSelection}
                className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear ({selectedSeatIds.length})</span>
              </button>
            )}

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                soundEnabled
                  ? 'bg-zinc-900 text-zinc-300 border-zinc-700'
                  : 'bg-zinc-900 text-zinc-600 border-zinc-800'
              }`}
              title="Toggle audio click feedback"
            >
              Sound: {soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Seat Layout Area */}
      <main className="max-w-5xl mx-auto px-2 sm:px-4 py-8">
        {/* Curved Cinema Screen */}
        <div className="relative w-full max-w-2xl mx-auto mb-12 sm:mb-16 text-center">
          {/* Ambient Curved Light Glow */}
          <div className="h-12 sm:h-16 w-full cinema-screen-glow rounded-[50%] blur-md opacity-70 mb-2" />
          
          {/* Curved Screen Arc Bar */}
          <div className="relative mx-auto h-2.5 sm:h-3 w-4/5 rounded-t-full bg-gradient-to-r from-zinc-700 via-white to-zinc-700 cinema-screen-arc" />
          
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-black text-zinc-400">
            <Tv className="w-3.5 h-3.5 text-[#e50914]" />
            <span>ALL EYES THIS WAY • CURVED CINEMA SCREEN</span>
          </div>
        </div>

        {/* Persistent Seat Status Legend */}
        <div 
          id="seat-legend"
          className="max-w-3xl mx-auto mb-10 p-3 sm:p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm flex flex-wrap items-center justify-around gap-3 text-xs"
        >
          {/* Available */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-zinc-800 border border-zinc-600 flex items-center justify-center text-[9px] text-zinc-400" />
            <span className="text-zinc-300 font-medium">Available</span>
          </div>

          {/* Selected */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#e50914] border border-red-400 shadow-sm shadow-red-600 flex items-center justify-center">
              <Check className="w-3 h-3 text-white stroke-[3]" />
            </div>
            <span className="text-zinc-100 font-bold">Selected</span>
          </div>

          {/* Booked */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-zinc-900/90 border border-zinc-800/80 text-zinc-600 flex items-center justify-center text-[10px] cursor-not-allowed">
              ✕
            </div>
            <span className="text-zinc-500 font-medium">Sold Out</span>
          </div>

          {/* VIP Recliner */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-zinc-900 border-2 border-[#f5c518] shadow-sm shadow-[#f5c518]/20 flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-[#f5c518]" />
            </div>
            <span className="text-[#f5c518] font-semibold">
              VIP ({formatPrice(showtime.priceVIPUSD, currency)})
            </span>
          </div>

          {/* Wheelchair accessible - updated to show 4 accessible seats */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-zinc-800 border border-cyan-500/70 text-cyan-400 flex items-center justify-center">
              <Accessibility className="w-3 h-3" />
            </div>
            <span className="text-cyan-400 font-medium">4 Accessible (A1, A2, A13, A14)</span>
          </div>
        </div>

        {/* Tiers Pricing Strip with Selected City Currency */}
        <div className="max-w-2xl mx-auto mb-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-400 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-400" />
            <span>Rows A-B: Standard ({formatPrice(showtime.priceStandardUSD, currency)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>Rows C-F: Premium ({formatPrice(showtime.pricePremiumUSD, currency)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f5c518]" />
            <span>Rows G-H: VIP ({formatPrice(showtime.priceVIPUSD, currency)})</span>
          </div>
        </div>

        {/* Auditorium Interactive Grid with Left/Center/Right aisles */}
        <div className="overflow-x-auto custom-scrollbar pb-6">
          <div className="min-w-[620px] max-w-3xl mx-auto space-y-3">
            {auditoriumSeats.map((rowSeats) => {
              const rowLabel = rowSeats[0].row;
              const isVIPRow = rowLabel === 'G' || rowLabel === 'H';

              // Split into 3 columns: Left (1-4), Center (5-10), Right (11-14)
              const leftSeats = rowSeats.slice(0, 4);
              const centerSeats = rowSeats.slice(4, 10);
              const rightSeats = rowSeats.slice(10, 14);

              return (
                <div
                  key={rowLabel}
                  className={`flex items-center justify-between py-1 px-2 rounded-xl transition-colors ${
                    isVIPRow ? 'bg-[#f5c518]/5 border border-[#f5c518]/20' : ''
                  }`}
                >
                  {/* Left Row Indicator */}
                  <div className="w-6 text-center font-bold text-xs text-zinc-400 font-display">
                    {rowLabel}
                  </div>

                  {/* Left Block */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {leftSeats.map((seat) => (
                      <SeatButton
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedSeatIds.includes(seat.id)}
                        onClick={() => handleSeatClick(seat)}
                      />
                    ))}
                  </div>

                  {/* Left Aisle */}
                  <div className="w-4 sm:w-6 text-center text-[10px] text-zinc-700 select-none">
                    •
                  </div>

                  {/* Center Block */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {centerSeats.map((seat) => (
                      <SeatButton
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedSeatIds.includes(seat.id)}
                        onClick={() => handleSeatClick(seat)}
                      />
                    ))}
                  </div>

                  {/* Right Aisle */}
                  <div className="w-4 sm:w-6 text-center text-[10px] text-zinc-700 select-none">
                    •
                  </div>

                  {/* Right Block */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {rightSeats.map((seat) => (
                      <SeatButton
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedSeatIds.includes(seat.id)}
                        onClick={() => handleSeatClick(seat)}
                      />
                    ))}
                  </div>

                  {/* Right Row Indicator */}
                  <div className="w-6 text-center font-bold text-xs text-zinc-400 font-display">
                    {rowLabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Summary Bar (Mobile and Desktop Friendly) */}
      <div 
        id="seat-picker-footer-bar"
        className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 border-t border-zinc-800 shadow-2xl backdrop-blur-xl px-4 sm:px-6 py-3.5"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Seats Selection & Total Price */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-400">Selected Seats:</span>
                {selectedSeatIds.length === 0 ? (
                  <span className="text-xs text-zinc-500 italic">None selected yet</span>
                ) : (
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {selectedSeatIds.map((id) => (
                      <span
                        key={id}
                        className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[#f5c518] text-xs font-black"
                      >
                        {id}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {selectedSeatIds.length} of max {MAX_SEATS} seats
              </p>
            </div>

            {/* Total Price in Local City Currency */}
            <div className="text-right sm:text-left">
              <span className="text-[11px] text-zinc-400 block leading-none">Total Tickets</span>
              <span className="text-xl sm:text-2xl font-black text-white font-display">
                {formatPrice(totalTicketPriceUSD, currency)}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full sm:w-auto flex items-center gap-3">
            <button
              id="proceed-to-checkout-btn"
              disabled={selectedSeatIds.length === 0}
              onClick={handleProceed}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                selectedSeatIds.length > 0
                  ? 'bg-[#e50914] hover:bg-red-600 text-white shadow-xl shadow-red-950/60 hover:shadow-red-600/30 hover:scale-[1.02] active:scale-[0.99]'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
              }`}
            >
              <span>Proceed to Concessions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Seat Button Sub-component
const SeatButton: React.FC<{
  seat: Seat;
  isSelected: boolean;
  onClick: () => void;
}> = ({ seat, isSelected, onClick }) => {
  const isBooked = seat.status === 'booked';
  const isVIP = seat.tier === 'vip';
  const isPremium = seat.tier === 'premium';

  // Compute styles
  let colorClasses = '';

  if (isBooked) {
    colorClasses = 'bg-zinc-900 text-zinc-700 border-zinc-800/80 cursor-not-allowed opacity-45';
  } else if (isSelected) {
    colorClasses =
      'bg-[#e50914] text-white border-red-400 shadow-md shadow-red-600/60 scale-110 ring-2 ring-red-500/40';
  } else if (isVIP) {
    colorClasses =
      'bg-zinc-900 hover:bg-amber-950/40 text-amber-300 border-2 border-[#f5c518] hover:border-amber-400 shadow-sm shadow-[#f5c518]/20 hover:scale-110';
  } else if (isPremium) {
    colorClasses =
      'bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 border border-zinc-600/70 hover:border-zinc-400 hover:scale-105';
  } else {
    // Standard
    colorClasses =
      'bg-zinc-800/70 hover:bg-zinc-700 text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:scale-105';
  }

  return (
    <button
      id={`seat-${seat.id}`}
      onClick={onClick}
      disabled={isBooked}
      aria-label={`Seat ${seat.id} (${seat.tier}, ${seat.priceFormatted}) ${
        isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available'
      }`}
      className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-[10px] sm:text-[11px] transition-all duration-150 cursor-pointer ${colorClasses}`}
    >
      {isSelected ? (
        <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
      ) : isBooked ? (
        <span className="text-[9px]">✕</span>
      ) : seat.isAccessible ? (
        <Accessibility className="w-3 h-3 text-cyan-400" />
      ) : (
        <span>{seat.col}</span>
      )}

      {/* Recliner Top Notch Accent for VIP */}
      {isVIP && !isBooked && !isSelected && (
        <span className="absolute -top-1 w-3 h-1 rounded-t-sm bg-[#f5c518] pointer-events-none" />
      )}
    </button>
  );
};
