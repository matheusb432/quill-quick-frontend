import { SubmitHandler } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
import { FormFooter } from '~/components/Form/FormFooter';
import { FormRow } from '~/components/Form/FormRow';
import { Input } from '~/components/Inputs/Input';
import { Textarea } from '~/components/Inputs/Textarea';
import { useFormContext } from '~/core/store/form-context';
import { Book } from '../types/book';

interface BookFormProps {
  onSubmit: SubmitHandler<Book>;
  onDelete?: () => void;
}

export function BookForm(props: BookFormProps) {
  const merged = mergeProps({}, props);

  const { state, setLabels } = useFormContext<Book>();
  const [, { Form, Field }] = state.formData;

  setLabels({
    pageCount: 'Pages',
  });

  return (
    <Form onSubmit={merged.onSubmit}>
      <Field name="title">{(field, props) => <Input field={field} props={props} />}</Field>
      <FormRow>
        <Field name="publisher">{(field, props) => <Input field={field} props={props} />}</Field>
        <Field name="author">{(field, props) => <Input field={field} props={props} />}</Field>
      </FormRow>
      <Field name="pageCount" type="number">
        {(field, props) => <Input field={field} props={props} type="number" />}
      </Field>
      <Field name="summary">{(field, props) => <Textarea field={field} props={props} />}</Field>
      <FormFooter onDelete={merged.onDelete} />
    </Form>
  );
}
