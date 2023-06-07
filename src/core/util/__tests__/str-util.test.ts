import { strUtil } from '../str-util';

describe('str-util', () => {
  describe('cx', () => {
    it('should return a string of class names', () => {
      expect(strUtil.cx('foo', 'bar baz')).toBe('foo bar baz');
    });

    it('should filter out falsy values', () => {
      expect(strUtil.cx('foo', undefined, 'bar baz')).toBe('foo bar baz');
    });

    it('should return an empty string if no class names are provided', () => {
      expect(strUtil.cx(undefined, undefined)).toBe('');
    });
  });
});
