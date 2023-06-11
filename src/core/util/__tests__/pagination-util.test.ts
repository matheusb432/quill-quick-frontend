import { Defaults } from './../../constants/defaults';
import { paginationUtil } from '../pagination-util';

describe('pagination-util', () => {
  const defaultPage = 1;
  const defaultItemsPerPage = Defaults.ItemsPerPage;

  describe('default', () => {
    it('should return default pagination options', () => {
      const result = paginationUtil.default();
      const expected = {
        page: defaultPage,
        itemsPerPage: defaultItemsPerPage,
        options: undefined,
      };
      expect(result).toEqual(expected);
    });
  });

  describe('first', () => {
    it('should return pagination options for the first page', () => {
      const result = paginationUtil.first(5, { filter: { name: 'John' } });
      const expected = {
        page: defaultPage,
        itemsPerPage: 5,
        options: { filter: { name: 'John' } },
      };
      expect(result).toEqual(expected);
    });
  });

  describe('from', () => {
    it('should return pagination options for the specified page and items per page', () => {
      const result = paginationUtil.from(3, 10, { filter: { name: 'John' } });
      const expected = {
        page: 3,
        itemsPerPage: 10,
        options: { filter: { name: 'John' } },
      };
      expect(result).toEqual(expected);
    });
  });

  describe('fromOptions', () => {
    it('should return default pagination options with specified OData options', () => {
      const result = paginationUtil.fromOptions({ filter: { name: 'John' } });
      const expected = {
        page: defaultPage,
        itemsPerPage: defaultItemsPerPage,
        options: { filter: { name: 'John' } },
      };
      expect(result).toEqual(expected);
    });
  });
});
