import { SubmitHandler } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
import { FormFooter } from '~/components/Form/FormFooter';
import { FormRow } from '~/components/Form/FormRow';
import { DateRange } from '~/components/Inputs/DateRange';
import { Input } from '~/components/Inputs/Input';
import { Rating } from '~/components/Inputs/Rating';
import { Textarea } from '~/components/Inputs/Textarea';
import { Toggle } from '~/components/Inputs/Toggle';
import { useFormContext } from '~/core/store/form-context';
import { Book } from '../types/book';

interface BookFormProps {
  onSubmit: SubmitHandler<Book>;
  onDelete?: () => void;
}

export function BookForm(props: BookFormProps) {
  const merged = mergeProps({}, props);

  const { state, setLabels } = useFormContext<Book>();
  const [, { Form, Field }] = state.form;

  setLabels({
    pageCount: 'Pages',
  });

  return (
    <Form onSubmit={merged.onSubmit}>
      <Field name="title">{(...args) => <Input fieldArgs={args} />}</Field>
      <FormRow>
        <Field name="publisher">{(...args) => <Input fieldArgs={args} />}</Field>
        <Field name="author">{(...args) => <Input fieldArgs={args} />}</Field>
      </FormRow>
      <Field name="pageCount" type="number">
        {(...args) => <Input fieldArgs={args} type="number" helper="Should be a whole number" />}
      </Field>
      <Field name="summary">{(...args) => <Textarea fieldArgs={args} />}</Field>
      {/* // TODO add fields in review form  */}
      {/* <Field name="rating" type={'string' as 'number'}>
        {(...args) => <Rating fieldArgs={args} />}
      </Field>
      <Field name="dateRange" type="string">
        {(...args) => <DateRange fieldArgs={args} />}
      </Field>
      <Field name="public" type="boolean">
        {(...args) => <Toggle fieldArgs={args} />}
      </Field> */}

      <FormFooter onDelete={merged.onDelete} />
    </Form>
  );
}
