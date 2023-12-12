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

  describe('capitalizeWords', () => {
    it('should capitalize each word in a string', () => {
      expect(strUtil.capitalizeWords('foo bar')).toBe('Foo Bar');
      expect(strUtil.capitalizeWords('bar baz')).toBe('Bar Baz');
      expect(strUtil.capitalizeWords('string with, special - characters')).toBe(
        'String With, Special - Characters',
      );
    });

    it('should return an empty string if no string is provided', () => {
      expect(strUtil.capitalizeWords(undefined as never)).toBe('');
    });
  });

  describe('capitalizeFirst', () => {
    it('should capitalize the first letter of a string', () => {
      expect(strUtil.capitalizeFirst('foo')).toBe('Foo');
      expect(strUtil.capitalizeFirst('bar')).toBe('Bar');
    });

    it('should return an empty string if no string is provided', () => {
      expect(strUtil.capitalizeFirst(undefined as never)).toBe('');
    });

    it('should capitalize only the first letter of a string', () => {
      expect(strUtil.capitalizeFirst('foo bar')).toBe('Foo bar');
    });
  });

  describe('isNumber', () => {
    it('should return true if the string is a number', () => {
      expect(strUtil.isNumber('123')).toBe(true);
      expect(strUtil.isNumber('123.45')).toBe(true);
      expect(strUtil.isNumber('0')).toBe(true);
      expect(strUtil.isNumber('0.0')).toBe(true);
    });

    it('should return false if the string is not a number', () => {
      expect(strUtil.isNumber('foo')).toBe(false);
      expect(strUtil.isNumber('foo123')).toBe(false);
      expect(strUtil.isNumber('123foo')).toBe(false);
      expect(strUtil.isNumber('foo123bar')).toBe(false);
    });
  });
});
