import { FieldValues, FormStore, ResponseData, getValues } from '@modular-forms/solid';

/**
 * @description
 * Returns all form values, including disabled fields.
 */
function getAllFormValues<T extends FieldValues, R extends ResponseData>(
  formStore: FormStore<T, R>,
): T {
  return getValues(formStore, { shouldActive: false }) as T;
}

export const modularFormsUtil = {
  getAllFormValues,
};
