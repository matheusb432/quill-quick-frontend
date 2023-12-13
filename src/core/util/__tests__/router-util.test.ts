import { FormModes } from '../../types/form-types';
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
      const params = { id: '123', mode: FormModes.Edit };
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

  describe('replaceCreateReviewParams', () => {
    it('should replace the specified detail parameters in the path', () => {
      const path = RoutePaths.BookReviewCreate;
      const params = { id: '123' };
      const result = routerUtil.replaceCreateReviewParams(path, params);
      const expected = '/books/123/create-review';
      expect(result).toEqual(expected);
    });

    it('should return an empty string when no detail parameters are provided', () => {
      const path = RoutePaths.BookReviewCreate;
      const params = {};
      const result = routerUtil.replaceCreateReviewParams(path, params as never);
      expect(result).toEqual('');
    });
  });

  describe('buildTitle', () => {
    it('should return the page title with the specified mode', () => {
      const mode = FormModes.Edit;
      const title = 'book';
      const result = routerUtil.buildTitle(mode, title);
      const expected = 'Edit book';
      expect(result).toEqual(expected);
    });
  });
});
