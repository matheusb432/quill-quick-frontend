import { Defaults } from './../../constants/defaults';
import { apiUtil } from '../api-util';

describe('api-util', () => {
  describe('createUrl', () => {
    it('should create the feature url', () => {
      const featureUrl = 'books';
      const expected = Defaults.ApiUrl + '/' + featureUrl;
      const actual = apiUtil.createUrl(featureUrl);

      expect(actual).toBe(expected);
    });
  });
});
