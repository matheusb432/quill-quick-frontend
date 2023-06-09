import { z } from 'zod';
import { formUtil } from '../form-util';

describe('form-util', () => {
  describe('getDefaults', () => {
    it('should return default values from schema', () => {
      const schema = z.object({
        title: z.string().max(100),
        value: z.number().default(5),
        isVal: z.boolean().default(true),
      });

      const expected = {
        title: '',
        value: 5,
        isVal: true,
      };

      expect(formUtil.getDefaults(schema)).toEqual(expected);
    });
  });
});
