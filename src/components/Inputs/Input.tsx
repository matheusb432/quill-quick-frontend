import { Component, createMemo, mergeProps } from 'solid-js';
import { createField } from '~/core/store/create-field';
import { FieldCmp } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';
import { HeroIconProps } from '~/assets/icons/types';

type InputProps<TF, TN> = FieldCmp<TF, TN> & {
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  iconFn?: Component<HeroIconProps>;
};

export function Input<TF, TN>(props: InputProps<TF, TN>) {
  const merged = mergeProps({ type: 'text' }, props);
  const { errorText, label, name, placeholder, canEdit, isLoading } = createField(merged);

  const getValue = createMemo<string | number | undefined>((prevValue) => {
    const value = merged.fieldArgs[0].value;
    const isUndefined = value === undefined;

    if (merged.type === 'number') {
      const isNumber = !Number.isNaN(value);
      return isNumber && !isUndefined ? (value as number) : prevValue;
    }

    return isUndefined ? '' : (value as string);
  }, '');

  return (
    <InputContainer
      name={name()}
      label={label()}
      isError={!!merged.fieldArgs[0].error}
      isLoading={isLoading()}
      errorText={errorText()}
      iconFn={merged.iconFn}
    >
      <input
        {...merged.fieldArgs[1]}
        class="peer input-fx form-input h-16 pb-0 transition-all"
        id={name()}
        value={getValue()}
        placeholder={placeholder()}
        type={merged.type}
        disabled={!canEdit()}
      />
    </InputContainer>
  );
}
