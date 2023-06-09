import { FieldElementProps, FieldPath, FieldStore, FieldValues } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
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

  return (
    <InputContainer
      name={merged.name}
      label={merged.label}
      isError={!!merged.field.error}
      errorText={merged.errorText}
    >
      <input
        id={merged.name}
        class="peer form-input pb-0 placeholder-transparent text-xl focus:placeholder-gray-400 bg-black-500 h-16 border-0 border-l-4 hover:bg-black-550 focus:bg-black-600 border-green-500 focus:ring-green-500 focus:outline-offset-4 focus:outline-4 focus:border-green-500 transition-all"
        placeholder={merged.placeholder || `Enter the ${merged.label}`}
        type={merged.type}
        {...merged.props}
      />
    </InputContainer>
  );
}
