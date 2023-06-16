import { createMemo } from 'solid-js';
import { FieldCmp } from '../types/form-types';
import { formUtil } from '../util/form-util';
import { useFormContext } from './form-context';

type CreateFieldProps<TForm, TName> = FieldCmp<TForm, TName> & {
  placeholder?: string;
};

export function createField<TForm, TName>(props: CreateFieldProps<TForm, TName>) {
  const errorText = createMemo<string>(
    (prev) => props.fieldArgs[0].error || prev || 'Invalid field!',
  );
  const { state, labels } = useFormContext();
  const canEdit = () => formUtil.canEditField(state);
  const name = () => props.fieldArgs[0].name;
  const label = () => labels()[name()] || formUtil.nameToLabel(name());
  const placeholder = () => props.placeholder || `Enter the ${label()}`;

  return {
    errorText,
    canEdit,
    name,
    label,
    placeholder,
    isLoading: () => state.isLoading,
  };
}
