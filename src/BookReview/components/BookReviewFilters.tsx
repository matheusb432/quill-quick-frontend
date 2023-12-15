import { SubmitHandler, getValues } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
import { useFormContext } from '~/core/store/form-context';
import { BookReviewFilter } from '../types';
import { DateRange } from '~/components/Inputs/DateRange';

interface BookReviewFiltersProps {
  onSubmit: SubmitHandler<BookReviewFilter>;
  onDebounce(filter: BookReviewFilter): void;
}

export function BookReviewFilters(props: BookReviewFiltersProps) {
  const merged = mergeProps({}, props);

  const { state } = useFormContext<BookReviewFilter>();
  const [, { Form, Field }] = state.form;

  function handleDebounce(dateRange: string) {
    if ((dateRange?.split(' ')?.length ?? 0) < 2) return;
    merged.onDebounce({ dateRange });
  }

  return (
    <Form
      class="flex w-full max-w-xs items-center justify-end lg:max-w-xl"
      onSubmit={merged.onSubmit}
    >
      <Field name="dateRange" type="string">
        {(...args) => (
          <DateRange fieldArgs={args} helper="Press Enter to search" onChange={handleDebounce} />
        )}
      </Field>
    </Form>
  );
}
