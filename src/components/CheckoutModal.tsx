import React, { useState } from 'react';
import { Movie, Theater, Showtime, SelectedSnack, Booking, CustomerDetails, SeatTier, CurrencyConfig } from '../types';
import { DateOption } from '../utils/date';
import { getStoredContact, saveStoredContact, saveBooking } from '../utils/storage';
import { playSuccessChime } from '../utils/audio';
import { formatPrice } from '../utils/currency';
import { useToast } from './Toast';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  ArrowLeft, 
  Popcorn, 
  Smartphone,
  Wallet
} from 'lucide-react';

interface CheckoutModalProps {
  movie: Movie;
  theater: Theater;
  showtime: Showtime;
  date: DateOption;
  selectedSeats: string[];
  seatTiers: Record<string, SeatTier>;
  ticketSubtotalUSD: number;
  snacks: SelectedSnack[];
  snacksSubtotalUSD: number;
  currency: CurrencyConfig;
  onBack: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  movie,
  theater,
  showtime,
  date,
  selectedSeats,
  seatTiers,
  ticketSubtotalUSD,
  snacks,
  snacksSubtotalUSD,
  currency,
  onBack,
  onBookingSuccess,
}) => {
  const { showToast } = useToast();

  // Load saved contact details if any
  const [formData, setFormData] = useState<CustomerDetails>(() => {
    const saved = getStoredContact();
    return (
      saved || {
        name: '',
        email: '',
        phone: '',
      }
    );
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cinepass'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculation of taxes & booking fees in USD
  const bookingFeeUSD = selectedSeats.length * 1.5; // $1.50 per seat
  const subtotalBeforeTaxUSD = ticketSubtotalUSD + snacksSubtotalUSD + bookingFeeUSD;
  const taxesUSD = Number((subtotalBeforeTaxUSD * 0.08).toFixed(2)); // 8% sales tax
  const totalAmountUSD = Number((subtotalBeforeTaxUSD + taxesUSD).toFixed(2));

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email is required for e-tickets';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for SMS booking updates';
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleQuickDemoFill = () => {
    setFormData({
      name: 'Alex Rivera',
      email: 'alex.rivera@cinebook.com',
      phone: '+1 (555) 234-5678',
    });
    setErrors({});
    showToast('Demo details filled', 'info', 'Ready for fast 1-click test confirmation.');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please check the form', 'error', 'Fill in all required contact information.');
      return;
    }

    setIsProcessing(true);

    // Save contact for future convenience
    saveStoredContact(formData);

    // Simulate payment gateway delay
    setTimeout(() => {
      // Generate unique booking ID
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const bookingId = `CB-${randomSuffix}`;
      const qrCodeToken = `CINEBOOK|${bookingId}|${movie.id}|${selectedSeats.join(',')}|${Date.now()}`;

      const newBooking: Booking = {
        id: bookingId,
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.posterUrl,
        cityId: theater.id,
        cityName: theater.location,
        theaterId: theater.id,
        theaterName: theater.name,
        theaterLocation: theater.location,
        showtimeId: showtime.id,
        showtime: showtime.time,
        screenName: showtime.screenName,
        date: date.dateString,
        format: showtime.format,
        seats: selectedSeats,
        seatTiers,
        currencyCode: currency.code,
        currencySymbol: currency.symbol,
        ticketsSubtotal: ticketSubtotalUSD,
        ticketsSubtotalUSD: ticketSubtotalUSD,
        snacksTotal: snacksSubtotalUSD,
        bookingFee: bookingFeeUSD,
        taxes: taxesUSD,
        totalAmount: totalAmountUSD,
        totalAmountUSD,
        totalAmountFormatted: formatPrice(totalAmountUSD, currency),
        formattedTotal: formatPrice(totalAmountUSD, currency),
        snacks,
        customer: formData,
        bookedAt: new Date().toISOString(),
        status: 'confirmed',
        qrCodeToken,
      };

      saveBooking(newBooking);
      playSuccessChime();
      setIsProcessing(false);
      onBookingSuccess(newBooking);
    }, 1100);
  };

  return (
    <div 
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex justify-center p-3 sm:p-6"
    >
      <div 
        id="checkout-modal-card"
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto"
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-xl font-black text-white font-display">
                Checkout & Confirmation
              </h3>
              <p className="text-xs text-zinc-400">
                Payment currency: <span className="text-[#f5c518] font-bold">{currency.code} ({currency.symbol})</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="text-xs text-[#f5c518] hover:text-amber-300 font-bold px-3 py-1.5 rounded-lg bg-[#f5c518]/10 border border-[#f5c518]/20 transition-colors"
          >
            Auto-fill Test Details
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
          {/* Left Column: Form & Payment (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {/* Customer Info Section */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  1. Contact Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="input-customer-name"
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#e50914] outline-none"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="input-customer-email"
                        type="email"
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#e50914] outline-none"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        id="input-customer-phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#e50914] outline-none"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-4 border-t border-zinc-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  2. Payment Method
                </h4>

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-[#e50914] text-white border-[#e50914]'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-[#e50914] text-white border-[#e50914]'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Pay Wallet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cinepass')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'cinepass'
                        ? 'bg-[#e50914] text-white border-[#e50914]'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>CinePass</span>
                  </button>
                </div>

                {/* Card Fields */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                        Card Number (Simulated)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'apple_pay' && (
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center text-xs text-zinc-300">
                    <p className="font-semibold text-white mb-1">Apple Pay & Google Pay Express</p>
                    <p className="text-zinc-400 text-[11px]">
                      Simulated express payment ready. Total will be processed in {currency.code}.
                    </p>
                  </div>
                )}

                {paymentMethod === 'cinepass' && (
                  <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center text-xs text-zinc-300">
                    <p className="font-semibold text-[#f5c518] mb-1">CinePass Global Club</p>
                    <p className="text-zinc-400 text-[11px]">
                      Simulated CinePass membership balance applied.
                    </p>
                  </div>
                )}

                {/* Secure Badge */}
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>256-Bit Encrypted Simulated Transaction</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                id="submit-payment-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#e50914] hover:bg-red-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-red-950/60 hover:shadow-red-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Booking...</span>
                  </div>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay {formatPrice(totalAmountUSD, currency)} & Confirm</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-zinc-900/40 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
                Booking Summary
              </h4>

              {/* Movie Brief Card */}
              <div className="flex gap-3 pb-4 border-b border-zinc-800/80">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded-xl border border-zinc-700/60 shrink-0"
                />
                <div className="min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[#f5c518] text-[9px] font-black uppercase border border-zinc-700">
                    {showtime.format}
                  </span>
                  <h5 className="text-sm font-bold text-white truncate mt-1">{movie.title}</h5>
                  <p className="text-xs text-zinc-400 mt-0.5">{theater.name}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    {date.fullLabel} • {showtime.time}
                  </p>
                </div>
              </div>

              {/* Seats Breakdown */}
              <div className="py-3 border-b border-zinc-800/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-400">Selected Seats:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedSeats.map((id) => (
                      <span
                        key={id}
                        className="px-1.5 py-0.5 rounded bg-zinc-800 text-white font-bold text-[11px] border border-zinc-700"
                      >
                        {id}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mt-2">
                  <span>Tickets Subtotal</span>
                  <span className="font-semibold text-zinc-200">
                    {formatPrice(ticketSubtotalUSD, currency)}
                  </span>
                </div>
              </div>

              {/* Snacks Breakdown */}
              {snacks.length > 0 && (
                <div className="py-3 border-b border-zinc-800/80">
                  <div className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
                    <Popcorn className="w-3.5 h-3.5 text-[#f5c518]" />
                    <span>Concession Snacks</span>
                  </div>
                  <div className="space-y-1 text-xs text-zinc-400">
                    {snacks.map((snack) => (
                      <div key={snack.id} className="flex justify-between">
                        <span>
                          {snack.quantity}x {snack.name}
                        </span>
                        <span className="text-zinc-200">
                          {formatPrice(snack.priceUSD * snack.quantity, currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fees & Taxes */}
              <div className="py-3 space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Convenience & Booking Fee</span>
                  <span>{formatPrice(bookingFeeUSD, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes (8%)</span>
                  <span>{formatPrice(taxesUSD, currency)}</span>
                </div>
              </div>
            </div>

            {/* Total Grand */}
            <div className="pt-4 border-t border-zinc-800 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block">Total Amount</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    Calculated in {currency.code}
                  </span>
                </div>
                <span className="text-2xl font-black text-[#f5c518] font-display">
                  {formatPrice(totalAmountUSD, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
