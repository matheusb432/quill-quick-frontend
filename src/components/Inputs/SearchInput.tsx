import { createEffect, mergeProps, on, splitProps } from 'solid-js';
import { HIDocumentMagnifyingGlass } from '~/assets/icons/HIDocumentMagnifyingGlass';
import { createDebounce } from '~/core/store/create-debounce';
import { ContainerField } from '~/core/types/form-types';
import { Input } from './Input';

type SearchInputProps<TF, TN> = ContainerField<TF, TN> & {
  type?: 'text' | 'number';
  onDebounce(filter: string | number): void;
};

export function SearchInput<TF, TN>(props: SearchInputProps<TF, TN>) {
  const merged = mergeProps({ placeholder: 'Search for a value' }, props);
  const [local, others] = splitProps(merged, ['onDebounce']);
  const debouncedValue = createDebounce(() => merged.fieldArgs[0].value);

  createEffect(
    on(debouncedValue, () => {
      const value = debouncedValue();
      if (value == null) return;
      local.onDebounce(value as string | number);
    }),
  );
  return <Input {...others} iconFn={HIDocumentMagnifyingGlass} />;
}
