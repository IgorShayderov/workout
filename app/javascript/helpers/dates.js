/**
 * Get count of days in month
 * @param {number} year - Date year
 * @param {number} month - Date month
 * @return {Date} - Count of days in month
 */
export function daysInMonth(year, month) {
  // month count start from 0, so we have to add 1 to get actual month
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Split hours date to hours and minutes separately
 * @param {Date} date - Date in hours:minutes format
 * @return {Object} - Separated hours and minutes
 */
export function splitTimeDate(date) {
  return {
    hours: date.slice(0, 2),
    minutes: date.slice(3, 5),
  };
}
