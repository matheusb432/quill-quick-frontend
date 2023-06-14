import { z } from 'zod';
import { FormModes } from '../types/form-types';

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
  return formType === FormModes.View;
}

function isCreate(formType: string) {
  return formType === FormModes.Create;
}

function isEdit(formType: string) {
  return formType === FormModes.Edit;
}

export const formUtil = {
  getDefaults,
  isView,
  isCreate,
  isEdit,
};
