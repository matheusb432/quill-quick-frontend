import {
  FieldElementProps,
  FieldPath,
  FieldStore,
  FieldValues,
  ResponseData,
} from '@modular-forms/solid';
import { JSX, mergeProps } from 'solid-js';

interface InputProps<TForm extends FieldValues, TName extends FieldPath<TForm>> {
  field: FieldStore<TForm, TName>;
  props: FieldElementProps<TForm, TName>;
  name: TName;
  label: string;
  placeholder?: string;
  errorText?: string;
  //   props: Fi
}

export function Input<TForm extends FieldValues, TName extends FieldPath<TForm>>(
  props: InputProps<TForm, TName>,
) {
  const merged = mergeProps({ errorText: 'Invalid input!' }, props) as InputProps<TForm, TName>;

  return (
    <div class="flex relative flex-col gap-y-2 w-full h-full text-xl">
      <input
        id={merged.name}
        class="peer form-input placeholder-transparent focus:placeholder-gray-300 bg-black-500 h-14 border-0 border-l-4 hover:bg-black-550 focus:bg-black-600 border-green-500 focus:ring-green-500 focus:outline-offset-4 focus:outline-4 focus:border-green-500 transition-all"
        placeholder={merged.placeholder || `Enter the ${merged.name}`}
        {...merged.props}
      />
      <label
        class="-top-7 left-0 absolute peer-placeholder-shown:left-4 peer-placeholder-shown:top-4 peer-focus:-top-7 peer-focus:left-0 transition-all"
        for={merged.name}
      >
        {merged.label}
      </label>
      <span
        classList={{
          'text-red-500 transition-opacity duration-200 opacity-0': true,
          'opacity-100': !!merged.field.error,
        }}
      >
        {merged.errorText}
      </span>
    </div>
  );
}
