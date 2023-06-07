import { arrUtil } from '../arr-util';

describe('arr-util', () => {
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
