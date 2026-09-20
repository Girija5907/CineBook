import { CurrencyConfig } from '../types';

export function formatPrice(amountUSD: number, currency: CurrencyConfig): string {
  const converted = amountUSD * currency.exchangeRate;

  let formattedNumber: string;
  if (currency.decimals === 0) {
    // Round to nearest 50 or 100 for currencies like JPY, KRW, INR for realistic cinema ticket prices
    const rounded = Math.round(converted / 10) * 10;
    formattedNumber = new Intl.NumberFormat('en-US').format(rounded);
  } else {
    formattedNumber = converted.toFixed(currency.decimals);
  }

  if (currency.position === 'suffix') {
    return `${formattedNumber} ${currency.symbol}`;
  }
  return `${currency.symbol}${formattedNumber}`;
}

export function convertAmount(amountUSD: number, currency: CurrencyConfig): number {
  const converted = amountUSD * currency.exchangeRate;
  if (currency.decimals === 0) {
    return Math.round(converted);
  }
  return Number(converted.toFixed(currency.decimals));
}
