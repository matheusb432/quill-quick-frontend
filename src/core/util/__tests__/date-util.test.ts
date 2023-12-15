import { dateUtil } from '../date-util';

describe('date-util', () => {
  describe('formatDateToUniversalFormat', () => {
    it('should return an empty string when given a falsy value', () => {
      expect(dateUtil.toYyyyMmDd(null as unknown as Date)).toEqual('');
      expect(dateUtil.toYyyyMmDd(undefined as unknown as Date)).toEqual('');
    });

    it('should format a date correctly', () => {
      const date = new Date(2023, 3, 21);
      expect(dateUtil.toYyyyMmDd(date)).toEqual('2023-04-21');
    });

    it('should not modify the original date', () => {
      const date = new Date(2023, 3, 21, 12, 0, 0, 0);
      dateUtil.toYyyyMmDd(date);
      expect(date).toEqual(new Date(2023, 3, 21, 12, 0, 0, 0));
    });
  });

  describe('rangeToJsonDates', () => {
    it('should return an object with start and end values on yyyy-MM-dd format', () => {
      const range = '06/06/2023 to 14/06/2023';
      expect(dateUtil.rangeToJsonDates(range)).toEqual({
        start: '2023-06-06',
        end: '2023-06-14',
      });
    });

    it('should return an object with no dates when given a falsy value', () => {
      const expected = {
        start: '',
        end: '',
      };

      expect(dateUtil.rangeToJsonDates('')).toEqual(expected);
      expect(dateUtil.rangeToJsonDates(null as never)).toEqual(expected);
      expect(dateUtil.rangeToJsonDates(undefined as never)).toEqual(expected);
    });
  });

  describe('rangeToDates', () => {
    it('should return an object with start and end values as Date objects', () => {
      const range = '06/06/2023 to 14/06/2023';
      expect(dateUtil.rangeToDates(range)).toEqual({
        start: new Date(2023, 5, 6),
        end: new Date(2023, 5, 14),
      });
    });

    it('should return an object with no dates when given a falsy value', () => {
      const expected = {
        start: null,
        end: null,
      };

      expect(dateUtil.rangeToDates('')).toEqual(expected);
      expect(dateUtil.rangeToDates(null as never)).toEqual(expected);
      expect(dateUtil.rangeToDates(undefined as never)).toEqual(expected);
    });
  });

  describe('jsonDatesToRange', () => {
    it('should return a range string when given two dates', () => {
      const start = '2023-06-06';
      const end = '2023-06-14';
      expect(dateUtil.jsonDatesToRange(start, end)).toEqual('06/06/2023 to 14/06/2023');
    });

    it('should return an empty string when given a falsy value', () => {
      expect(dateUtil.jsonDatesToRange('', '')).toEqual('');
      expect(dateUtil.jsonDatesToRange(null as never, null as never)).toEqual('');
      expect(dateUtil.jsonDatesToRange(undefined as never, undefined as never)).toEqual('');
    });
  });

  describe('fromDateStr', () => {
    it('should return a Date object when given a valid date string', () => {
      expect(dateUtil.fromDateStr('2023-12-31')).toEqual(new Date(2023, 11, 31));
      expect(dateUtil.fromDateStr('2023-01-20')).toEqual(new Date(2023, 0, 20));
    });

    it('should return null when given a falsy value', () => {
      expect(dateUtil.fromDateStr(null as never)).toEqual(null);
      expect(dateUtil.fromDateStr(undefined as never)).toEqual(null);
    });

    it('should return null when given an invalid date string', () => {
      expect(dateUtil.fromDateStr('')).toEqual(null);
      expect(dateUtil.fromDateStr('2023-12-31 12:00:00')).toEqual(null);
      expect(dateUtil.fromDateStr('2023-12-31T12:00:00')).toEqual(null);
      expect(dateUtil.fromDateStr('2023-12-31T12:00:00.000')).toEqual(null);
      expect(dateUtil.fromDateStr('2023-12-31T12:00:00.000Z')).toEqual(null);
    });
  });

  describe('toDate', () => {
    it('should return a Date object when given a string', () => {
      expect(dateUtil.toDate('2023-12-31')).toEqual(new Date(2023, 11, 31));
      expect(dateUtil.toDate('2023-01-20')).toEqual(new Date(2023, 0, 20));
    });

    it('should return the same Date object when given a Date object', () => {
      const date = new Date(2023, 11, 31);
      expect(dateUtil.toDate(date)).toEqual(date);
    });

    it('should return null when given a falsy value', () => {
      expect(dateUtil.toDate(null as never)).toEqual(null);
      expect(dateUtil.toDate(undefined as never)).toEqual(null);
    });
  });
});
