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

  describe('nameToLabel', () => {
    it('should convert form name to label', () => {
      expect(formUtil.nameToLabel('formFieldName')).toEqual('Form Field Name');
    });

    it('should convert field array field name to label', () => {
      expect(formUtil.nameToLabel('comments.1.content')).toEqual('Comments - Content');
      expect(formUtil.nameToLabel('reviewComments.1.someField')).toEqual(
        'Review Comments - Some Field',
      );
    });

    it('should return an empty string if name is falsy', () => {
      expect(formUtil.nameToLabel('')).toEqual('');
      expect(formUtil.nameToLabel(null as never)).toEqual('');
      expect(formUtil.nameToLabel(undefined as never)).toEqual('');
    });
  });
});
