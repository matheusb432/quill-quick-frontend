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
      expect(dateUtil.rangeToJsonDates(null as unknown as string)).toEqual(expected);
      expect(dateUtil.rangeToJsonDates(undefined as unknown as string)).toEqual(expected);
    });
  });
});
