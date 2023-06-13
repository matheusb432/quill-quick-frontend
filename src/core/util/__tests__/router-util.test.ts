import { RoutePaths } from '../../constants/route-paths';
import { routerUtil } from '../router-util';

describe('router-util', () => {
  describe('replaceParams', () => {
    it('should replace the specified parameters in the path', () => {
      const path = '/users/:userId/posts/:postId';
      const params = { userId: '123', postId: '456' };
      const result = routerUtil.replaceParams(path, params);
      const expected = '/users/123/posts/456';
      expect(result).toEqual(expected);
    });

    it('should return an empty string when no parameters are provided', () => {
      const path = '/users/:userId/posts/:postId';
      const params = {};
      const result = routerUtil.replaceParams(path, params);
      expect(result).toEqual('');
    });
  });

  describe('replaceDetailParams', () => {
    it('should replace the specified detail parameters in the path', () => {
      const path = RoutePaths.BookDetail;
      const params = { id: '123', mode: 'edit' };
      const result = routerUtil.replaceDetailParams(path, params);
      const expected = '/books/123/edit';
      expect(result).toEqual(expected);
    });

    it('should return an empty string when no detail parameters are provided', () => {
      const path = RoutePaths.BookDetail;
      const params = {};
      const result = routerUtil.replaceDetailParams(path, params as never);
      expect(result).toEqual('');
    });
  });

  describe('getMode', () => {
    it('should return the specified mode when it is valid', () => {
      const mode = 'edit';
      const validModes = ['edit', 'view'];
      const result = routerUtil.getMode(mode, validModes);
      expect(result).toEqual(mode);
    });

    it('should return the first valid mode when the specified mode is invalid', () => {
      const mode = 'invalid';
      const validModes = ['edit', 'view'];
      const result = routerUtil.getMode(mode, validModes);
      expect(result).toEqual(validModes[0]);
    });
  });

  describe('buildTitle', () => {
    it('should return the page title with the specified mode', () => {
      const mode = 'edit';
      const title = 'book';
      const result = routerUtil.buildTitle(mode, title);
      const expected = 'Edit book';
      expect(result).toEqual(expected);
    });
  });
});
