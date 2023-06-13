import { createMemo, mergeProps } from 'solid-js';
import { FieldCmp } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';

type InputProps<TF, TN> = FieldCmp<TF, TN> & {
  label: string;
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
};

export function Input<TF, TN>(props: InputProps<TF, TN>) {
  const merged = mergeProps({ type: 'text' }, props);
  const errorText = createMemo<string>((prev) => merged.field.error || prev || 'Invalid field!');

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
      errorText={errorText()}
    >
      <input
        {...merged.props}
        id={merged.field.name}
        value={getValue()}
        class="peer form-input h-16 border-0 border-l-4 border-accent bg-primary-light pb-0 text-xl placeholder-transparent transition-all hover:bg-primary-hover focus:border-accent focus:bg-primary-focus focus:placeholder-divider focus:outline-4 focus:outline-offset-4 focus:ring-accent"
        placeholder={merged.placeholder || `Enter the ${merged.label}`}
        type={merged.type}
      />
    </InputContainer>
  );
}
