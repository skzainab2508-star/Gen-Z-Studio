/**
 * Currency utilities for Indian Rupees (INR)
 */

export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_CODE = 'INR';

/**
 * Formats a numeric price into standard Indian Rupee notation (₹X,XX,XXX)
 * @param amount numeric amount in INR
 * @param showDecimals whether to display paise (defaults to false for clean luxury pricing)
 */
export const formatINR = (amount: number, showDecimals: boolean = false): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  
  if (showDecimals && amount % 1 !== 0) {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

/**
 * Standard price formatter used across the application
 */
export const formatPrice = (amount: number): string => {
  return formatINR(amount);
};
