import { createMemo, mergeProps } from 'solid-js';
import { FieldCmp, FormModes } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';
import { useFormContext } from '~/core/data/form-context';
import { FieldValues } from '@modular-forms/solid';
import { formUtil } from '~/core/util/form-util';

type InputProps<TF, TN> = FieldCmp<TF, TN> & {
  label: string;
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
};

export function Input<TF, TN>(props: InputProps<TF, TN>) {
  const merged = mergeProps({ type: 'text' }, props);
  const errorText = createMemo<string>((prev) => merged.field.error || prev || 'Invalid field!');
  const ctx = useFormContext().state;
  const canEdit = () => formUtil.canEditField(ctx);

  const getValue = createMemo<string | number | undefined>((prevValue) => {
    const isUndefined = props.field.value === undefined;

    if (merged.type === 'number') {
      const isNumber = !Number.isNaN(props.field.value);
      return isNumber && !isUndefined ? (props.field.value as number) : prevValue;
    }

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
      <input
        {...merged.props}
        id={merged.field.name}
        value={getValue()}
        class="peer input-fx form-input h-16 pb-0 transition-all"
        placeholder={merged.placeholder || `Enter the ${merged.label}`}
        type={merged.type}
        disabled={!canEdit()}
      />
    </InputContainer>
  );
}
