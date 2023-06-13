import { FieldElementProps, FieldPath, FieldStore, FieldValues } from '@modular-forms/solid';
import { createEffect, createMemo, mergeProps } from 'solid-js';
import { InputContainer } from './InputContainer';

interface TextareaProps<TForm extends FieldValues, TName extends FieldPath<TForm>> {
  field: FieldStore<TForm, TName>;
  props: FieldElementProps<TForm, TName>;
  name: TName;
  label: string;
  placeholder?: string;
}

export function Textarea<TForm extends FieldValues, TName extends FieldPath<TForm>>(
  props: TextareaProps<TForm, TName>,
) {
  const merged = mergeProps({}, props);
  const errorText = createMemo<string>((prev) => merged.field.error || prev || 'Invalid field!');

  createEffect(() => {
    console.log(merged.field.error);
  });

  const getValue = createMemo<string | number | undefined>(() => {
    const isUndefined = props.field.value === undefined;

    return isUndefined ? '' : (props.field.value as string);
  }, '');

  return (
    <InputContainer
      name={merged.name}
      label={merged.label}
      isError={!!merged.field.error}
      errorText={errorText()}
    >
      <textarea
        {...merged.props}
        id={merged.name}
        value={getValue()}
        class="peer form-textarea h-16 max-h-80 min-h-[64px] border-0 border-l-4 border-accent bg-primary-light pb-0 pt-6 text-xl placeholder-transparent transition-colors hover:bg-primary-hover focus:border-accent focus:bg-primary-focus focus:placeholder-divider focus:outline-4 focus:outline-offset-4 focus:ring-accent"
        placeholder={merged.placeholder || `Enter the ${merged.label}`}
      />
    </InputContainer>
  );
}
