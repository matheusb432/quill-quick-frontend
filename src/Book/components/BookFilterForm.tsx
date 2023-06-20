import { SubmitHandler, getValues } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
import { SearchInput } from '~/components/Inputs/SearchInput';
import { useFormContext } from '~/core/store/form-context';
import { BookFilter } from '../types/filters';

interface BookFilterFormProps {
  onSubmit: SubmitHandler<BookFilter>;
  onDebounce(filter: BookFilter): void;
}

export function BookFilterForm(props: BookFilterFormProps) {
  const merged = mergeProps({}, props);

  const { state } = useFormContext<BookFilter>();
  const [form, { Form, Field }] = state.form;

  function handleDebounce() {
    merged.onDebounce(getValues(form));
  }

  return (
    <Form
      class="flex w-full max-w-xs items-center justify-end lg:max-w-xl"
      onSubmit={merged.onSubmit}
    >
      <Field name="title">
        {(...args) => (
          <SearchInput
            fieldArgs={args}
            placeholder="Search for a book title"
            onDebounce={handleDebounce}
            helper="Press Enter, or wait a bit after typing, to search"
          />
        )}
      </Field>
    </Form>
  );
}
