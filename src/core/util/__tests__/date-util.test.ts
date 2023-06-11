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
});
