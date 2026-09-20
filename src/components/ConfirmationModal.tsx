import React from 'react';
import { Booking } from '../types';
import { CheckCircle2, Ticket, Download, Sparkles } from 'lucide-react';

interface ConfirmationModalProps {
  booking: Booking;
  onViewMyBookings: () => void;
  onCloseToHome: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  booking,
  onViewMyBookings,
  onCloseToHome,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const displayTotal = booking.totalAmountFormatted || `$${booking.totalAmountUSD?.toFixed(2) || '0.00'}`;

  return (
    <div 
      id="confirmation-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl flex justify-center p-3 sm:p-6"
    >
      <div 
        id="confirmation-modal-card"
        className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col"
      >
        {/* Confetti & Success Banner */}
        <div className="relative p-6 sm:p-8 text-center bg-gradient-to-b from-red-950/30 via-zinc-950 to-zinc-950 border-b border-zinc-800/80">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-emerald-950/50">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f5c518]/15 border border-[#f5c518]/30 text-[#f5c518] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            BOOKING CONFIRMED
          </span>

          <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
            You're Going to the Movies!
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            We’ve sent the digital passes to{' '}
            <span className="text-zinc-200 font-semibold">{booking.customer.email}</span>
          </p>
        </div>

        {/* Digital Ticket Card */}
        <div className="p-5 sm:p-8 bg-zinc-950 flex flex-col items-center">
          <div className="relative w-full bg-zinc-900 rounded-2xl border border-zinc-700/80 overflow-hidden shadow-2xl">
            {/* Top Ticket Header */}
            <div className="p-5 bg-gradient-to-r from-zinc-850 to-zinc-900 border-b border-zinc-800 flex items-start gap-4">
              <img
                src={booking.moviePoster}
                alt={booking.movieTitle}
                className="w-16 h-24 object-cover rounded-xl border border-zinc-700 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="px-2 py-0.5 rounded bg-[#e50914] text-white text-[10px] font-black uppercase">
                  {booking.format}
                </span>
                <h4 className="text-base sm:text-lg font-black text-white font-display truncate mt-1">
                  {booking.movieTitle}
                </h4>
                <p className="text-xs text-zinc-400 truncate mt-0.5">{booking.theaterName}</p>
                <p className="text-[11px] text-zinc-500">{booking.screenName}</p>
              </div>
            </div>

            {/* Ticket Meta Details */}
            <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-b border-zinc-800/80 bg-zinc-900/60">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Date</span>
                <span className="text-xs font-bold text-zinc-100">{booking.date}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Time</span>
                <span className="text-xs font-bold text-[#f5c518]">{booking.showtime}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Seats</span>
                <span className="text-xs font-black text-white">{booking.seats.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Total Paid</span>
                <span className="text-xs font-bold text-emerald-400">{displayTotal}</span>
              </div>
            </div>

            {/* Perforated Separation Line with Side Cutouts */}
            <div className="relative py-2 flex items-center justify-between">
              {/* Left cutout circle */}
              <div className="w-5 h-5 rounded-r-full bg-zinc-950 -ml-2.5 border-r border-zinc-700" />
              {/* Dashed Line */}
              <div className="flex-1 border-t-2 border-dashed border-zinc-700/80 mx-2" />
              {/* Right cutout circle */}
              <div className="w-5 h-5 rounded-l-full bg-zinc-950 -mr-2.5 border-l border-zinc-700" />
            </div>

            {/* QR Code & Barcode Section */}
            <div className="p-5 bg-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Simulated Real SVG QR Code */}
                <div className="p-2 rounded-xl bg-white text-zinc-950 flex items-center justify-center shadow-md">
                  <svg
                    className="w-16 h-16"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="33" height="33" fill="white" />
                    <rect x="2" y="2" width="9" height="9" fill="black" />
                    <rect x="3" y="3" width="7" height="7" fill="white" />
                    <rect x="4" y="4" width="5" height="5" fill="black" />
                    <rect x="22" y="2" width="9" height="9" fill="black" />
                    <rect x="23" y="3" width="7" height="7" fill="white" />
                    <rect x="24" y="4" width="5" height="5" fill="black" />
                    <rect x="2" y="22" width="9" height="9" fill="black" />
                    <rect x="3" y="23" width="7" height="7" fill="white" />
                    <rect x="4" y="24" width="5" height="5" fill="black" />
                    <rect x="13" y="4" width="2" height="2" fill="black" />
                    <rect x="17" y="4" width="2" height="2" fill="black" />
                    <rect x="13" y="8" width="2" height="2" fill="black" />
                    <rect x="15" y="10" width="2" height="2" fill="black" />
                    <rect x="13" y="14" width="3" height="3" fill="black" />
                    <rect x="18" y="14" width="2" height="2" fill="black" />
                    <rect x="22" y="14" width="3" height="2" fill="black" />
                    <rect x="27" y="14" width="2" height="3" fill="black" />
                    <rect x="4" y="14" width="2" height="3" fill="black" />
                    <rect x="8" y="15" width="2" height="2" fill="black" />
                    <rect x="14" y="19" width="4" height="2" fill="black" />
                    <rect x="14" y="23" width="2" height="4" fill="black" />
                    <rect x="19" y="22" width="3" height="2" fill="black" />
                    <rect x="24" y="23" width="3" height="3" fill="black" />
                    <rect x="28" y="20" width="2" height="2" fill="black" />
                    <rect x="23" y="28" width="4" height="2" fill="black" />
                    <rect x="18" y="27" width="2" height="3" fill="black" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold text-white block">Scan at Entrance</span>
                  <span className="text-[10px] text-zinc-400 block">Hall Check • {booking.theaterLocation}</span>
                  <span className="text-[10px] text-emerald-400 font-medium mt-1 inline-block">
                    Valid Digital Pass ({booking.id})
                  </span>
                </div>
              </div>

              {/* Barcode graphic */}
              <div className="text-center sm:text-right">
                <div className="h-7 w-36 bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 rounded-sm opacity-80 mb-1 flex items-center justify-around px-1">
                  <div className="w-1 h-full bg-black" />
                  <div className="w-0.5 h-full bg-black" />
                  <div className="w-1.5 h-full bg-black" />
                  <div className="w-0.5 h-full bg-black" />
                  <div className="w-2 h-full bg-black" />
                  <div className="w-1 h-full bg-black" />
                  <div className="w-0.5 h-full bg-black" />
                  <div className="w-1.5 h-full bg-black" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  {booking.id}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              id="view-my-bookings-btn"
              onClick={onViewMyBookings}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 transition-colors cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-[#e50914]" />
              <span>View My Bookings</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#e50914] hover:bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-950/60 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Save / Print E-Ticket</span>
            </button>
          </div>

          <button
            onClick={onCloseToHome}
            className="text-xs text-zinc-400 hover:text-zinc-200 mt-4 transition-colors cursor-pointer"
          >
            ← Back to CineBook Home
          </button>
        </div>
      </div>
    </div>
  );
};
