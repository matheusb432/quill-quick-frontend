import { z } from 'zod';
import { FormTypes } from '../types/form-types';

function getDefaults<Schema extends z.AnyZodObject>(schema: Schema) {
  const defaults: { [key: string]: unknown } = {};

  for (const [key, value] of Object.entries(schema.shape)) {
    if (value instanceof z.ZodDefault) {
      defaults[key] = value._def.defaultValue();
    } else {
      defaults[key] = '';
    }
  }
  return defaults;
}

function isView(formType: string) {
  return formType === FormTypes.View;
}

function isCreate(formType: string) {
  return formType === FormTypes.Create;
}

function isEdit(formType: string) {
  return formType === FormTypes.Edit;
}

export const formUtil = {
  getDefaults,
  isView,
  isCreate,
  isEdit,
};
