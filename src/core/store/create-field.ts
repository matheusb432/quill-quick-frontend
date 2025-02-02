import { createMemo, createSignal } from 'solid-js';
import { ContainerField } from '../types/form-types';
import { formUtil } from '../util/form-util';
import { useFormContext } from './form-context';

type CreateFieldProps<TForm, TName> = ContainerField<TForm, TName>;

export function createField<TForm, TName>(props: CreateFieldProps<TForm, TName>) {
  const error = createMemo<string>((prev) => props.fieldArgs[0].error || prev || 'Invalid field!');
  const { state, labels } = useFormContext();
  const canEdit = () => formUtil.canEditField(state);
  const name = () => props.fieldArgs[0].name;
  const label = () => componentLabel() || labels()[name()] || formUtil.nameToLabel(name());
  const [componentLabel, setComponentLabel] = createSignal<string>('');
  const placeholder = () => props.placeholder || `Enter the ${label()}`;

  return {
    error,
    canEdit,
    name,
    label,
    placeholder,
    isLoading: () => state.isLoading,
    setComponentLabel,
  };
}
