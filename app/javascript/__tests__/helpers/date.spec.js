import { daysInMonth, splitTimeDate } from 'helpers/dates';

describe('Dates helper', () => {
  describe('function daysInMonth', () => {
    test.each([
      [ 'February', 1, 29 ],
      [ 'March', 2, 31 ],
      [ 'September', 8, 30 ],
      [ 'February', 13, 28 ],
    ])('returns number of days in %s', (monthName, monthCount, expected) => {
      const year = 2020;

      const numberOfDays = daysInMonth(year, monthCount);

      expect(numberOfDays).toBe(expected);
    });
  });

  describe('function splitTimeDate', () => {
    test.each([
      [ '21:35', '21', '35' ],
      [ '00:00', '00', '00' ],
    ])('returns separate hours and minutes in %s', (time, hours, minutes) => {
      const expected = {
        hours,
        minutes,
      };

      const splittedTime = splitTimeDate(time);

      expect(splittedTime).toMatchObject(expected);
    });
  });
});
