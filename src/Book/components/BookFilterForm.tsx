import { SubmitHandler, getValue, getValues } from '@modular-forms/solid';
import { createEffect, mergeProps, on } from 'solid-js';
import { HIDocumentMagnifyingGlass } from '~/assets/icons/HIDocumentMagnifyingGlass';
import { Input } from '~/components/Inputs/Input';
import { useFormContext } from '~/core/store/form-context';
import { BookFilter } from '../types/filters';
import { createDebounce } from '~/core/store/create-debounce';

interface BookFilterFormProps {
  onSubmit: SubmitHandler<BookFilter>;
  onDebounce(filter: BookFilter): void;
}

export function BookFilterForm(props: BookFilterFormProps) {
  const merged = mergeProps({}, props);

  const { state, setLabels } = useFormContext<BookFilter>();
  const [form, { Form, Field }] = state.form;
  const debouncedValue = createDebounce(() => getValue(form, 'title'));

  createEffect(
    on(debouncedValue, () => {
      merged.onDebounce(getValues(form));
    }),
  );

  setLabels({
    title: 'Search for a book title',
  });

  return (
    <Form class="flex w-1/4 justify-end items-center" onSubmit={merged.onSubmit}>
      <Field name="title">
        {(...args) => (
          // TODO add debounce
          <Input
            fieldArgs={args}
            placeholder="Search for a book title"
            iconFn={HIDocumentMagnifyingGlass}
          />
        )}
      </Field>
    </Form>
  );
}
