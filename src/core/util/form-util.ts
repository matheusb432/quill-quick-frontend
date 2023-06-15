import { z } from 'zod';
import { CanEditData, FormModes } from '../types/form-types';
import { strUtil } from './str-util';

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

function canEditField<T extends CanEditData>(data: T) {
  return !data.isLoading && !data.disabled && data.mode !== FormModes.View;
}

function nameToLabel(name: string) {
  if (!name) return '';

  const words = name.split(/(?=[A-Z])/);
  return strUtil.capitalizeFirst(words.join(' '));
}

export const formUtil = {
  getDefaults,
  isView,
  isCreate,
  isEdit,
  canEditField,
  nameToLabel,
};
