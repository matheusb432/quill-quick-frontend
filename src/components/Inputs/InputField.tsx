import { FieldElementProps, FieldPath, FieldStore, FieldValues } from '@modular-forms/solid';
import { createMemo, mergeProps } from 'solid-js';
import { InputContainer } from './InputContainer';

interface InputFieldProps<TForm extends FieldValues, TName extends FieldPath<TForm>> {
  field: FieldStore<TForm, TName>;
  props: FieldElementProps<TForm, TName>;
  name: TName;
  label: string;
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  errorText?: string;
}

export function InputField<TForm extends FieldValues, TName extends FieldPath<TForm>>(
  props: InputFieldProps<TForm, TName>,
) {
  const merged = mergeProps({ errorText: 'Invalid input!', type: 'text' }, props);

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
      name={merged.name}
      label={merged.label}
      isError={!!merged.field.error}
      errorText={merged.errorText}
    >
      <input
        {...merged.props}
        id={merged.name}
        value={getValue()}
        class="peer form-input pb-0 placeholder-transparent text-xl focus:placeholder-divider bg-primary-light h-16 border-0 border-l-4 hover:bg-primary-hover focus:bg-primary-focus border-accent focus:ring-accent focus:outline-offset-4 focus:outline-4 focus:border-accent transition-all"
        placeholder={merged.placeholder || `Enter the ${merged.label}`}
        type={merged.type}
      />
    </InputContainer>
  );
}
