import { SubmitHandler } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
import { Input } from '~/components/Inputs/Input';
import { useFormContext } from '~/core/store/form-context';
import { BookFilter } from '../types/filters';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { HIDocumentMagnifyingGlass } from '~/assets/icons/HIDocumentMagnifyingGlass';

interface BookFilterFormProps {
  onSubmit: SubmitHandler<BookFilter>;
}

export function BookFilterForm(props: BookFilterFormProps) {
  const merged = mergeProps({}, props);

  const { state, setLabels } = useFormContext<BookFilter>();
  const [, { Form, Field }] = state.form;

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
