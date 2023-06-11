import { ODataOperators, ODataOptions, ODataParams } from '../../types/odata-types';
import { odataUtil } from '../odata-util';

describe('odata-util', () => {
  describe('build', () => {
    it('should build an OData query string', () => {
      const result = odataUtil.build('https://example.com', {
        filter: { name: 'John', age: [[ODataOperators.GreaterThanOrEqualTo, 20]] },
        orderBy: ['name', 'asc'],
      });

      const expectedParams = {
        filter: "$filter=(name eq 'John') and (age ge 20)",
        orderBy: '$orderby=name asc',
      };

      expect(result.length).toEqual(
        "https://example.com?$filter=(name eq 'John') and (age ge 20)&$orderby=name asc".length,
      );
      for (const param of Object.values(expectedParams)) {
        expect(result).toContain(param);
      }
    });

    it('should remove undefined filters', () => {
      const result = odataUtil.build('https://example.com', {
        filter: { name: 'John', age: undefined, lastName: [[ODataOperators.Contains, undefined]] },
        orderBy: ['name', 'asc'],
      });

      const expectedParams = {
        filter: "$filter=(name eq 'John')",
        orderBy: '$orderby=name asc',
      };

      expect(result.length).toEqual(
        "https://example.com?$filter=(name eq 'John')&$orderby=name asc".length,
      );
      for (const param of Object.values(expectedParams)) {
        expect(result).toContain(param);
      }
    });

    it('should handle nested orderby props', () => {
      const result = odataUtil.build('https://example.com', {
        filter: { name: 'John', age: [[ODataOperators.GreaterThanOrEqualTo, 20]] },
        orderBy: [['nested', 'prop', 'test'], 'asc'],
      });

      const expectedParams = {
        filter: "$filter=(name eq 'John') and (age ge 20)",
        orderBy: '$orderby=nested/prop/test asc',
      };

      expect(result.length).toEqual(
        "https://example.com?$filter=(name eq 'John') and (age ge 20)&$orderby=nested/prop/test asc"
          .length,
      );
      for (const param of Object.values(expectedParams)) {
        expect(result).toContain(param);
      }
    });

    it('should handle date filters', () => {
      const date = new Date(2023, 4, 1);
      const result = odataUtil.build('https://example.com', {
        filter: { date },
      });

      const expectedParams = {
        filter: '$filter=(date eq 2023-05-01)',
      };

      expect(result.length).toEqual('https://example.com?$filter=(date eq 2023-05-01)'.length);
      for (const param of Object.values(expectedParams)) {
        expect(result).toContain(param);
      }
    });

    it('should build an OData query string with default options when options are not provided', () => {
      const result = odataUtil.build('https://example.com');
      expect(result).toEqual('https://example.com');
    });

    it('should ignore undefined filters', () => {
      const result = odataUtil.build('https://example.com', {
        filter: { name: 'John', age: undefined, height: [[ODataOperators.LessThanOrEqualTo, 180]] },
      });

      const expectedParams = {
        filter: "$filter=(name eq 'John') and (height le 180)",
      };

      expect(result.length).toEqual(
        "https://example.com?$filter=(name eq 'John') and (height le 180)".length,
      );
      for (const param of Object.values(expectedParams)) {
        expect(result).toContain(param);
      }
    });
  });

  describe('buildPaginated', () => {
    it('should build a paginated OData query string', () => {
      const result = odataUtil.buildPaginated('https://example.com', {
        page: 3,
        itemsPerPage: 10,
        options: { filter: { name: 'John' } },
      });

      const expectedParams = {
        count: '$count=true',
        filter: "$filter=(name eq 'John')",
        skip: '$skip=20',
        top: '$top=10',
      };

      expect(result.length).toEqual(
        `https://example.com?$filter=(name eq 'John')&$count=true&$skip=20&$top=10`.length,
      );

      for (const param of Object.values(expectedParams)) {
        expect(result).toContain(param);
      }
    });

    it('should build a paginated OData query string with default options when options are not provided', () => {
      const result = odataUtil.buildPaginated('https://example.com', {
        page: 1,
        itemsPerPage: 20,
      });

      const expectedParams = {
        count: '$count=true',
        skip: '$skip=0',
        top: '$top=20',
      };

      expect(result.length).toEqual(`https://example.com?$count=true&$skip=0&$top=20`.length);
      for (const param of Object.values(expectedParams)) {
        expect(result).toContain(param);
      }
    });

    it('should use default values for page and itemsPerPage when not provided', () => {
      const result = odataUtil.buildPaginated('https://example.com', {
        options: { filter: { name: 'John' } },
      });
      const expectedParams = {
        count: '$count=true',
        skip: '$skip=0',
        top: '$top=10',
      };

      expect(result.length).toEqual(
        `https://example.com?$filter=(name eq 'John')&$count=true&$skip=0&$top=10`.length,
      );
      for (const param of Object.values(expectedParams)) {
        expect(result).toContain(param);
      }
    });
  });

  describe('buildParams', () => {
    it('should return an empty object when options are not provided', () => {
      const result = odataUtil.buildParams(undefined as unknown as ODataOptions);
      const expected: ODataParams = {};
      expect(result).toEqual(expected);
    });

    it('should return an object with filter parameters', () => {
      const result = odataUtil.buildParams({
        filter: { name: 'John', age: [[ODataOperators.GreaterThanOrEqualTo, 20]] },
      });
      const expected: ODataParams = {
        $filter: "(name eq 'John') and (age ge 20)",
      };
      expect(result).toEqual(expected);
    });

    it('should return an object with orderby parameters', () => {
      const result = odataUtil.buildParams({
        orderBy: [['name', 'asc']],
      });
      const expected: ODataParams = {
        $orderby: 'name asc',
      };
      expect(result).toEqual(expected);
    });

    it('should return an object with multiple parameters', () => {
      const result = odataUtil.buildParams({
        filter: { name: 'John' },
        orderBy: [['name', 'asc']],
        select: ['name', 'age'],
      });
      const expected: ODataParams = {
        $filter: "(name eq 'John')",
        $orderby: 'name asc',
        $select: 'name,age',
      };
      expect(result).toEqual(expected);
    });

    it('should return an object with $top and $skip parameters', () => {
      const result = odataUtil.buildParams({
        top: 5,
        skip: 10,
      });
      const expected: ODataParams = {
        $top: '5',
        $skip: '10',
      };
      expect(result).toEqual(expected);
    });
  });
});
