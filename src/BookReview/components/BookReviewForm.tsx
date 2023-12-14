import { SubmitHandler, insert, remove } from '@modular-forms/solid';
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
import { ReviewCommentType } from '~/core/types/review-types';
import { Select } from '~/components/Inputs/Select';
import { SelectItemData } from '~/core/types/form-types';
import { Divider } from '~/components/Divider';
import { Heading } from '~/components/Heading';

interface BookReviewFormProps {
  onSubmit: SubmitHandler<tBookReviewForm>;
  onDelete?: () => void;
}

export function BookReviewForm(props: BookReviewFormProps) {
  const merged = mergeProps({}, props);

  const { state } = useFormContext<tBookReviewForm>();

  const [form, { Form, Field, FieldArray }] = state.form;
  const commentTypeOptions: SelectItemData[] = [
    {
      label: 'Neutral',
      value: `${ReviewCommentType.Neutral}`,
    },
    {
      label: 'Negative',
      value: `${ReviewCommentType.Negative}`,
    },
    {
      label: 'Positive',
      value: `${ReviewCommentType.Positive}`,
    },
  ];

  return (
    <Form onSubmit={merged.onSubmit}>
      <Field name={`isPublic`} type="boolean">
        {(...args) => <Toggle fieldArgs={args} label="Public Review" />}
      </Field>
      <Field name="summary">{(...args) => <Textarea fieldArgs={args} />}</Field>
      <Field name="readingMode">{(...args) => <Input fieldArgs={args} />}</Field>
      <Field name="soundtrack">{(...args) => <Input fieldArgs={args} />}</Field>

      <Field name="rating" type={'string' as 'number'}>
        {(...args) => <Rating fieldArgs={args} />}
      </Field>
      <Field name="dateRange" type="string">
        {(...args) => <DateRange fieldArgs={args} />}
      </Field>
      <Divider />
      <Heading as="h2" class="mb-4 font-serif">
        Comments
      </Heading>
      <FieldArray name="comments">
        {(fieldArray) => (
          <>
            <Button
              onClick={() =>
                insert(form, fieldArray.name, {
                  value: {
                    content: '',
                    type: ReviewCommentType.Neutral,
                    isPublic: false,
                    isSpoiler: false,
                  },
                })
              }
            >
              Add Comment
            </Button>
            <For each={fieldArray?.items}>
              {(_, index) => (
                <section class="relative mt-4 flex h-full flex-col rounded-md border-2 border-primary p-6">
                  <Field name={`comments.${index()}.isPublic`} type="boolean">
                    {(...args) => <Toggle fieldArgs={args} label="Public Comment" />}
                  </Field>
                  <Field name={`comments.${index()}.type`} type="number">
                    {(...args) => (
                      <Select
                        fieldArgs={args}
                        options={commentTypeOptions}
                        label="Sentiment"
                        placeholder="Select the sentiment"
                      />
                    )}
                  </Field>
                  <Field name={`comments.${index()}.content`}>
                    {(...args) => (
                      <Textarea fieldArgs={args} label="Content" placeholder="Enter the content" />
                    )}
                  </Field>
                  <div class="flex items-center justify-end">
                    <Button
                      onClick={() => remove(form, fieldArray.name, { at: index() })}
                      theme="danger"
                    >
                      Delete
                    </Button>
                  </div>
                </section>
              )}
            </For>
          </>
        )}
      </FieldArray>

      <FormFooter onDelete={merged.onDelete} />
    </Form>
  );
}
