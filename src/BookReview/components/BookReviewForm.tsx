import { SubmitHandler } from '@modular-forms/solid';
import { For, mergeProps } from 'solid-js';
import { FormFooter } from '~/components/Form/FormFooter';
import { DateRange } from '~/components/Inputs/DateRange';
import { Rating } from '~/components/Inputs/Rating';
import { Toggle } from '~/components/Inputs/Toggle';
import { useFormContext } from '~/core/store/form-context';
import { tBookReviewForm } from '../types';
import { Input } from '~/components/Inputs/Input';
import { Textarea } from '~/components/Inputs/Textarea';

interface BookReviewsProps {
  onSubmit: SubmitHandler<tBookReviewForm>;
  onDelete?: () => void;
}

export function BookReviews(props: BookReviewsProps) {
  const merged = mergeProps({}, props);

  const { state, setLabels } = useFormContext<tBookReviewForm>();
  const [, { Form, Field, FieldArray }] = state.form;

  // setLabels({});

  return (
    <Form onSubmit={merged.onSubmit}>
      <Field name="summary">{(...args) => <Textarea fieldArgs={args} />}</Field>
      <Field name="readingMode">{(...args) => <Input fieldArgs={args} />}</Field>
      <Field name="soundtrack">{(...args) => <Input fieldArgs={args} />}</Field>

      <Field name="rating" type={'string' as 'number'}>
        {(...args) => <Rating fieldArgs={args} />}
      </Field>
      <Field name="dateRange" type="string">
        {(...args) => <DateRange fieldArgs={args} />}
      </Field>
      <FieldArray name="comments">
        {(fieldArray) => (
          <For each={fieldArray.items}>
            {(_, index) => (
              // TODO handle form array context?
              <Field name={`comments.${index()}.isPublic`} type="boolean">
                {(...args) => <Toggle fieldArgs={args} />}
              </Field>
            )}
          </For>
        )}
      </FieldArray>

      <FormFooter onDelete={merged.onDelete} />
    </Form>
  );
}
