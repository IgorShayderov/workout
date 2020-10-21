/**
 * Get count of days in month 
 * @param {number} month - Date month
 * @param {number} year - Date year
 * @returns {Date} - Count of days in month
 */
export function daysInMonth(month, year) {
  // month count start from 0, so we have to add 1 to get actual month
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Split hours date to hours and minutes separately
 * @param {Date} date - Date in hours:minutes format
 * @returns {Object} - Separated hours and minutes
 */
export function splitHoursDate(date) {
  return {
    hours: date.slice(0, 1),
    minutes: date.slice(3, 4),
  }
}
