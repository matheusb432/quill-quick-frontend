import { FieldPath, FieldValues } from '@modular-forms/solid';
import { createMemo, mergeProps } from 'solid-js';
import { FieldCmp, FormModes } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';
import { useFormContext } from '~/core/data/form-context';

type TextareaProps<TF, TN> = FieldCmp<TF, TN> & {
  label: string;
  placeholder?: string;
};

export function Textarea<TF, TN>(props: TextareaProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const errorText = createMemo<string>((prev) => merged.field.error || prev || 'Invalid field!');
  const ctx = useFormContext().state;
  const isViewMode = () => ctx.mode === FormModes.View;
  const canEdit = () => !ctx.isLoading && !isViewMode();

  const getValue = createMemo<string>(() => {
    const isUndefined = props.field.value === undefined;

    return isUndefined ? '' : (props.field.value as string);
  }, '');

  return (
    <InputContainer
      name={merged.field.name}
      label={merged.label}
      isError={!!merged.field.error}
      isLoading={ctx.isLoading}
      errorText={errorText()}
    >
      <textarea
        {...merged.props}
        id={merged.field.name}
        value={getValue()}
        class="peer input-fx form-textarea max-h-80 min-h-[64px] h-16 pb-0 pt-6 transition"
        placeholder={merged.placeholder || `Enter the ${merged.label}`}
        disabled={!canEdit()}
      />
    </InputContainer>
  );
}
