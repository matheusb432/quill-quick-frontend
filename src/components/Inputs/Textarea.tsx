import { FieldPath, FieldValues } from '@modular-forms/solid';
import { createMemo, mergeProps } from 'solid-js';
import { FieldCmp } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';

type TextareaProps<TF, TN> = FieldCmp<TF, TN> & {
  label: string;
  placeholder?: string;
};

export function Textarea<TF, TN>(props: TextareaProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const errorText = createMemo<string>((prev) => merged.field.error || prev || 'Invalid field!');

  const getValue = createMemo<string>(() => {
    const isUndefined = props.field.value === undefined;

    return isUndefined ? '' : (props.field.value as string);
  }, '');

  return (
    <InputContainer
      name={merged.field.name}
      label={merged.label}
      isError={!!merged.field.error}
      errorText={errorText()}
    >
      <textarea
        {...merged.props}
        id={merged.field.name}
        value={getValue()}
        class="peer form-textarea max-h-80 min-h-[64px] h-16 border-0 border-l-4 border-accent bg-primary-light pb-0 pt-6 text-xl placeholder-transparent transition hover:bg-primary-hover focus:border-accent focus:bg-primary-focus focus:placeholder-divider focus:outline-4 focus:outline-offset-4 focus:ring-accent"
        placeholder={merged.placeholder || `Enter the ${merged.label}`}
      />
    </InputContainer>
  );
}
