/**
 * Formats an ISO date string (YYYY-MM-DD) into YYYY/MM/DD format.
 * @param {string} dateStr 
 * @returns {string} formatted date
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  // Convert "2024-05-26" -> "2024/05/26"
  return dateStr.replace(/-/g, '/');
}

/**
 * Formats a numeric profit value into USD currency format without decimal places (e.g. $1,234)
 * @param {number|string} profit 
 * @returns {string} formatted profit
 */
export function formatProfit(profit) {
  const value = Number(profit);
  if (isNaN(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a metric value by returning the original value without modifications.
 * @param {string|number} value 
 * @returns {string|number} original metric value
 */
export function formatMetricValue(value) {
  return value;
}
