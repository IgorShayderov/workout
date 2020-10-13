/**
 * Get count of days in month 
 * @param {number} month - date month
 * @param {number} year - date year
 * @returns {Date} - count of days in month
 */
export function daysInMonth (month, year) {
  // month count start from 0, so we have to add 1 to get actual month
  return new Date(year, month + 1, 0).getDate();
}
