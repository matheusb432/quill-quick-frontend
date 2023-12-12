import { Component, createMemo, mergeProps } from 'solid-js';
import { HeroIconProps } from '~/assets/icons/types';
import { createField } from '~/core/store/create-field';
import { ContainerField } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';

type InputProps<TF, TN> = ContainerField<TF, TN> & {
  type?: 'text' | 'number' | 'email' | 'password';
  iconFn?: Component<HeroIconProps>;
};

export function Input<TF, TN>(props: InputProps<TF, TN>) {
  const merged = mergeProps({ type: 'text' }, props);
  const { error, label, name, placeholder, canEdit, isLoading } = createField(merged);

  const getValue = createMemo<string | number | undefined>((prevValue) => {
    const value = merged.fieldArgs[0].value;
    const isUndefined = value === undefined;

    if (merged.type === 'number') {
      const isNumber = !Number.isNaN(value);
      return isNumber && !isUndefined ? (value as unknown as number) : prevValue;
    }

    return isUndefined ? '' : (value as string);
  }, '');

  return (
    <InputContainer
      name={name()}
      label={props.label ?? label()}
      isError={!!merged.fieldArgs[0].error}
      isLoading={isLoading()}
      error={error()}
      iconFn={merged.iconFn}
      helper={merged.helper}
    >
      <input
        {...merged.fieldArgs[1]}
        class="input-fx peer form-input h-16 pb-0 transition-all"
        id={name()}
        value={getValue()}
        placeholder={placeholder()}
        type={merged.type}
        disabled={!canEdit()}
      />
    </InputContainer>
  );
}
