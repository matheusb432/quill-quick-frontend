import { strUtil } from '../str-util';

describe('str-util', () => {
  describe('cx', () => {
    it('should merge tailwind utilities', () => {
      expect(strUtil.cx('px-2 py-2 p-4 pt-3', undefined, 'pb-5')).toBe('p-4 pt-3 pb-5');
    });

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
