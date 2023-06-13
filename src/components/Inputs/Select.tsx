import { For, createMemo, mergeProps } from 'solid-js';
import { FieldCmp, SelectItemData } from '~/core/types/form-types';
import { InputContainer } from './InputContainer';
import { useFormContext } from '~/core/data/form-context';

type SelectProps<TF, TN> = FieldCmp<TF, TN> & {
  options: SelectItemData[];
  label: string;
  placeholder?: string;
};

export function Select<TF, TN>(props: SelectProps<TF, TN>) {
  const merged = mergeProps({}, props);
  const errorText = createMemo<string>((prev) => merged.field.error || prev || 'Invalid field!');
  const ctx = useFormContext().state;
  const canEdit = () => !ctx.isLoading && !ctx.disabled;

  const getValue = createMemo<string | number | undefined>(() => {
    const isUndefined = props.field.value === undefined;
    return isUndefined ? '' : (props.field.value as string);
  }, '');
  return (
    <InputContainer
      name={merged.field.name}
      label={merged.label}
      isError={!!merged.field.error}
      isLoading={ctx.isLoading}
      errorText={errorText()}
    >
      <select
        {...merged.props}
        id={merged.field.name}
        value={getValue()}
        class="peer form-select input-fx h-16 border-0 border-l-4 pb-0 transition-all"
        classList={{ 'text-divider': !getValue() }}
        disabled={!canEdit()}
      >
        <option value="" disabled>
          {merged.placeholder || `Select the ${merged.label}`}
        </option>
        <For each={merged.options}>
          {(option) => <option value={option.value}>{option.label}</option>}
        </For>
      </select>
    </InputContainer>
  );
}
