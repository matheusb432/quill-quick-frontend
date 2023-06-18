import { arrUtil } from '../arr-util';

describe('arr-util', () => {
  describe('arrayFrom', () => {
    it('should return an array of numbers', () => {
      expect(arrUtil.arrayFrom(5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('should increment the array values', () => {
      expect(arrUtil.arrayFrom(5, 1)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an empty array if items is falsy', () => {
      expect(arrUtil.arrayFrom(0)).toEqual([]);
      expect(arrUtil.arrayFrom(null as unknown as number)).toEqual([]);
      expect(arrUtil.arrayFrom(undefined as unknown as number)).toEqual([]);
    });
  });

  describe('isEmpty', () => {
    it('should return true if the array is empty', () => {
      expect(arrUtil.isEmpty([])).toBe(true);
    });

    it('should return false if the array is not empty', () => {
      expect(arrUtil.isEmpty([1, 2, 3])).toBe(false);
    });

    it('should return true if the array is falsy', () => {
      expect(arrUtil.isEmpty(null as unknown as unknown[])).toBe(true);
      expect(arrUtil.isEmpty(undefined as unknown as unknown[])).toBe(true);
      expect(arrUtil.isEmpty('' as unknown as unknown[])).toBe(true);
    });
  });
});
