import { For, createMemo, mergeProps } from 'solid-js';
import { createField } from '~/core/store/create-field';
import { FieldCmp, SelectItemData } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';

type SelectProps<TF, TN> = FieldCmp<TF, TN> & {
  options: SelectItemData[];
  placeholder?: string;
};

export function Select<TF, TN>(props: SelectProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const { errorText, label, name, canEdit, isLoading } = createField(merged);
  const placeholder = () => merged.placeholder || `Select the ${label()}`;

  const getValue = createMemo<string | number | undefined>(() => {
    const value = merged.fieldArgs[0].value;
    const isUndefined = value === undefined;
    return isUndefined ? '' : (value as string);
  }, '');
  return (
    <InputContainer
      name={name()}
      label={label()}
      isError={!!merged.fieldArgs[0].error}
      isLoading={isLoading()}
      errorText={errorText()}
    >
      <select
        {...merged.fieldArgs[1]}
        id={name()}
        value={getValue()}
        class="peer form-select input-fx h-16 border-0 border-l-4 pb-0 transition-all"
        classList={{ 'text-divider': !getValue() }}
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
