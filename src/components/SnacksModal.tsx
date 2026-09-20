import React, { useState } from 'react';
import { SnackItem, SelectedSnack, CurrencyConfig } from '../types';
import { SNACKS_DATA } from '../data/snacks';
import { formatPrice } from '../utils/currency';
import { Plus, Minus, Popcorn, ArrowRight, X } from 'lucide-react';

interface SnacksModalProps {
  currency: CurrencyConfig;
  onClose: () => void;
  onContinue: (snacks: SelectedSnack[], totalSnackPriceUSD: number) => void;
}

export const SnacksModal: React.FC<SnacksModalProps> = ({ currency, onClose, onContinue }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleIncrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantities((prev) => {
      const cur = prev[id] || 0;
      if (cur <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: cur - 1 };
    });
  };

  const selectedSnacksList: SelectedSnack[] = SNACKS_DATA.filter(
    (item) => (quantities[item.id] || 0) > 0
  ).map((item) => ({
    id: item.id,
    name: item.name,
    priceUSD: item.priceUSD,
    quantity: quantities[item.id],
  }));

  const totalSnacksPriceUSD = selectedSnacksList.reduce(
    (sum, item) => sum + item.priceUSD * item.quantity,
    0
  );

  return (
    <div 
      id="snacks-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex justify-center p-3 sm:p-6"
    >
      <div 
        id="snacks-modal-card"
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f5c518]/15 border border-[#f5c518]/30 flex items-center justify-center text-[#f5c518]">
              <Popcorn className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-display">
                Grab Cinema Snacks & Drinks
              </h3>
              <p className="text-xs text-zinc-400">
                Freshly popped gourmet combos delivered directly to your seat ({currency.symbol} {currency.code})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Snacks Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SNACKS_DATA.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden hover:border-zinc-700 transition-colors"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  {item.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#e50914] text-white text-[10px] font-extrabold uppercase tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">{item.name}</h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                    <span className="text-base font-black text-[#f5c518] font-display">
                      {formatPrice(item.priceUSD, currency)}
                    </span>

                    {qty === 0 ? (
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-[#e50914] text-zinc-200 hover:text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-zinc-800/90 rounded-xl p-1 border border-zinc-700">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="w-6 h-6 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{qty}</span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="w-6 h-6 rounded-lg bg-[#e50914] hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-zinc-950 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-zinc-400">Snacks Total:</span>
            <span className="text-lg font-black text-white ml-2 font-display">
              {formatPrice(totalSnacksPriceUSD, currency)}
            </span>
            {selectedSnacksList.length > 0 && (
              <span className="text-xs text-[#f5c518] ml-2 font-medium">
                ({selectedSnacksList.reduce((acc, curr) => acc + curr.quantity, 0)} items added)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="skip-snacks-btn"
              onClick={() => onContinue([], 0)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-semibold border border-zinc-800 transition-colors cursor-pointer"
            >
              Skip Snacks
            </button>
            <button
              id="continue-with-snacks-btn"
              onClick={() => onContinue(selectedSnacksList, totalSnacksPriceUSD)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#e50914] hover:bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-950/50 hover:shadow-red-600/30 transition-all cursor-pointer"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
