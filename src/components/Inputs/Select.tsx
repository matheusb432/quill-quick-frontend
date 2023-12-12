import { For, createEffect, createMemo, mergeProps } from 'solid-js';
import { createField } from '~/core/store/create-field';
import { ContainerField, SelectItemData } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';

type SelectProps<TF, TN> = ContainerField<TF, TN> & {
  options: SelectItemData[];
};

export function Select<TF, TN>(props: SelectProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const { error, label, name, canEdit, isLoading, setComponentLabel } = createField(merged);
  createEffect(() => {
    if (props.label == null) return;
    setComponentLabel(props.label);
  });
  const placeholder = () => merged.placeholder || `Select the ${label()}`;

  const getValue = createMemo<string | number | undefined>(() => {
    const value = merged.fieldArgs[0].value;
    const isUndefined = value === undefined;
    return isUndefined ? '' : (value as unknown as string);
  }, '');
  return (
    <InputContainer
      name={name()}
      label={props.label ?? label()}
      isError={!!merged.fieldArgs[0].error}
      isLoading={isLoading()}
      error={error()}
      helper={merged.helper}
    >
      <select
        {...merged.fieldArgs[1]}
        id={name()}
        value={getValue()}
        class="input-fx peer form-select h-16 border-0 border-l-4 pb-0 transition-all"
        classList={{ 'text-neutral-content/80': !getValue() }}
        disabled={!canEdit()}
      >
        <option value="" disabled>
          {placeholder()}
        </option>
        <For each={merged.options}>
          {(option) => <option value={option.value}>{option.label}</option>}
        </For>
      </select>
    </InputContainer>
  );
}
