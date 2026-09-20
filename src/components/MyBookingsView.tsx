import React, { useState } from 'react';
import { Booking } from '../types';
import { cancelBooking } from '../utils/storage';
import { useToast } from './Toast';
import { 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  QrCode, 
  Trash2, 
  AlertTriangle, 
  ArrowLeft, 
  Film, 
  CheckCircle2, 
  X,
  Share2
} from 'lucide-react';

interface MyBookingsViewProps {
  bookings: Booking[];
  onRefreshBookings: () => void;
  onExploreMovies: () => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  onRefreshBookings,
  onExploreMovies,
}) => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');
  const [activeTicketModal, setActiveTicketModal] = useState<Booking | null>(null);
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const handleConfirmCancel = () => {
    if (!cancellingBookingId) return;
    const success = cancelBooking(cancellingBookingId);
    if (success) {
      showToast('Booking cancelled', 'info', 'Your seats have been released back to the auditorium.');
      onRefreshBookings();
    } else {
      showToast('Failed to cancel', 'error');
    }
    setCancellingBookingId(null);
  };

  return (
    <div id="my-bookings-view" className="w-full min-h-screen bg-[#0a0a0a] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onExploreMovies}
              className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
                My Bookings & E-Tickets
              </h1>
              <p className="text-xs text-zinc-400">
                Access your digital tickets, showtimes, and booking history
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-[#e50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === 'confirmed'
                  ? 'bg-[#e50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Confirmed ({bookings.filter((b) => b.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === 'cancelled'
                  ? 'bg-[#e50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Cancelled ({bookings.filter((b) => b.status === 'cancelled').length})
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 ? (
          <div 
            id="empty-bookings-state"
            className="py-20 text-center flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4 shadow-xl">
              <Ticket className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No Bookings Found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mb-6">
              You haven't booked any movie tickets yet. Explore current releases and experience cinema on the biggest screens!
            </p>
            <button
              id="empty-state-explore-btn"
              onClick={onExploreMovies}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#e50914] hover:bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-950/60 transition-all cursor-pointer"
            >
              <Film className="w-4 h-4" />
              <span>Explore Movies Now</span>
            </button>
          </div>
        ) : (
          /* Bookings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {filteredBookings.map((booking) => {
              const isCancelled = booking.status === 'cancelled';
              return (
                <div
                  key={booking.id}
                  id={`booking-card-${booking.id}`}
                  className={`relative rounded-2xl bg-zinc-900/80 border overflow-hidden shadow-xl transition-all ${
                    isCancelled
                      ? 'border-zinc-800 opacity-60'
                      : 'border-zinc-800 hover:border-zinc-700 hover:shadow-2xl'
                  }`}
                >
                  {/* Top Portion: Poster and Movie Info */}
                  <div className="p-5 flex gap-4 items-start">
                    <img
                      src={booking.moviePoster}
                      alt={booking.movieTitle}
                      className="w-20 h-28 object-cover rounded-xl border border-zinc-700/80 shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-[#f5c518] text-[10px] font-black uppercase border border-zinc-700">
                          {booking.format}
                        </span>

                        {isCancelled ? (
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                            Cancelled
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Confirmed
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white truncate font-display mt-1">
                        {booking.movieTitle}
                      </h4>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">{booking.theaterName}</p>
                      <p className="text-[11px] text-zinc-500">{booking.screenName}</p>

                      <div className="mt-2 flex items-center gap-2 text-xs text-zinc-300">
                        <span className="font-semibold text-[#f5c518]">{booking.showtime}</span>
                        <span>•</span>
                        <span>{booking.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Seats & Cost */}
                  <div className="px-5 py-3 bg-zinc-950/60 border-t border-b border-zinc-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-zinc-400 text-[11px] block">Seats:</span>
                      <span className="font-bold text-white">{booking.seats.join(', ')}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-zinc-400 text-[11px] block">Total Paid:</span>
                      <span className="font-black text-[#f5c518] text-sm">
                        {booking.totalAmountFormatted || `$${(booking.totalAmountUSD ?? booking.totalAmount ?? 0).toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="p-4 bg-zinc-900 flex items-center justify-between gap-3">
                    <div className="text-[11px] font-mono text-zinc-500">ID: {booking.id}</div>

                    <div className="flex items-center gap-2">
                      {!isCancelled && (
                        <>
                          <button
                            onClick={() => setCancellingBookingId(booking.id)}
                            className="p-2 rounded-lg bg-zinc-800 hover:bg-rose-950/50 text-zinc-400 hover:text-rose-400 border border-zinc-700/60 transition-colors"
                            title="Cancel this booking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setActiveTicketModal(booking)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e50914] hover:bg-red-600 text-white text-xs font-bold shadow-md shadow-red-950/40 transition-colors cursor-pointer"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>View Ticket</span>
                          </button>
                        </>
                      )}
                      {isCancelled && (
                        <span className="text-xs text-zinc-500 italic">Seat Released</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Ticket QR Modal */}
      {activeTicketModal && (
        <div 
          id="ticket-view-modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl text-center">
            <button
              onClick={() => setActiveTicketModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-2 py-0.5 rounded bg-[#e50914] text-white text-[10px] font-bold uppercase mb-2 inline-block">
              {activeTicketModal.format}
            </span>
            <h3 className="text-xl font-black text-white font-display mb-1">
              {activeTicketModal.movieTitle}
            </h3>
            <p className="text-xs text-zinc-400 mb-4">{activeTicketModal.theaterName}</p>

            {/* QR box */}
            <div className="w-48 h-48 mx-auto p-4 bg-white rounded-2xl flex items-center justify-center shadow-lg my-4">
              <svg
                className="w-full h-full"
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
                <rect x="13" y="14" width="4" height="3" fill="black" />
                <rect x="18" y="14" width="2" height="2" fill="black" />
                <rect x="22" y="14" width="3" height="2" fill="black" />
                <rect x="14" y="19" width="4" height="2" fill="black" />
                <rect x="14" y="23" width="2" height="4" fill="black" />
                <rect x="19" y="22" width="3" height="2" fill="black" />
                <rect x="24" y="23" width="3" height="3" fill="black" />
              </svg>
            </div>

            <p className="text-xs font-mono text-[#f5c518] mb-1">
              Booking ID: {activeTicketModal.id}
            </p>
            <p className="text-xs text-zinc-400">
              Seats: <span className="text-white font-bold">{activeTicketModal.seats.join(', ')}</span>{' '}
              • {activeTicketModal.date} at {activeTicketModal.showtime}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white border border-zinc-700"
              >
                Print Ticket
              </button>
              <button
                onClick={() => setActiveTicketModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#e50914] hover:bg-red-600 text-xs font-bold text-white shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {cancellingBookingId && (
        <div 
          id="cancel-dialog"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Cancel This Booking?</h4>
            <p className="text-xs text-zinc-400 mb-6">
              Are you sure you want to cancel booking{' '}
              <span className="text-zinc-200 font-mono font-bold">{cancellingBookingId}</span>? Your
              seats will be released immediately.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancellingBookingId(null)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 border border-zinc-800"
              >
                Keep Booking
              </button>
              <button
                id="confirm-cancel-btn"
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-lg shadow-rose-950/60"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
