/**
 * Handles error for fetch, and returns response body in JSON
 * @param {Object} response - fetch's response
 * @returns {Object} - response body in JSON
 */
export function checkForError(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  
  return response.json();
}
