import { SubmitHandler, insert } from '@modular-forms/solid';
import { For, mergeProps } from 'solid-js';
import { FormFooter } from '~/components/Form/FormFooter';
import { DateRange } from '~/components/Inputs/DateRange';
import { Rating } from '~/components/Inputs/Rating';
import { Toggle } from '~/components/Inputs/Toggle';
import { useFormContext } from '~/core/store/form-context';
import { tBookReviewForm } from '../types';
import { Input } from '~/components/Inputs/Input';
import { Textarea } from '~/components/Inputs/Textarea';
import { Button } from '~/components/Button';

interface BookReviewFormProps {
  onSubmit: SubmitHandler<tBookReviewForm>;
  onDelete?: () => void;
}

export function BookReviewForm(props: BookReviewFormProps) {
  const merged = mergeProps({}, props);

  const { state } = useFormContext<tBookReviewForm>();

  const [form, { Form, Field, FieldArray }] = state.form;

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
          <>
            {/* // TODO review comment type */}
            <Button
              onClick={() => insert(form, fieldArray.name, { value: { content: '', type: 0 } })}
            >
              Add Comment
            </Button>
            <For each={fieldArray?.items}>
              {(_, index) => (
                <>
                  <Field name={`comments.${index()}.isPublic`} type="boolean">
                    {(...args) => <Toggle fieldArgs={args} label="Public" />}
                  </Field>
                  <Field name={`comments.${index()}.content`}>
                    {(...args) => <Textarea fieldArgs={args} label="Content" />}
                  </Field>
                </>
              )}
            </For>
          </>
        )}
      </FieldArray>

      <FormFooter onDelete={merged.onDelete} />
    </Form>
  );
}
