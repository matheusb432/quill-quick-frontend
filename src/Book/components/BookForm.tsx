import { SubmitHandler } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
import { FormFooter } from '~/components/Form/FormFooter';
import { FormRow } from '~/components/Form/FormRow';
import { Input } from '~/components/Inputs/Input';
import { Textarea } from '~/components/Inputs/Textarea';
import { useFormContext } from '~/core/data/form-context';
import { Book } from '../types/book';

interface BookFormProps {
  onSubmit: SubmitHandler<Book>;
  onDelete?: () => void;
  mode?: string;
}

export function BookForm(props: BookFormProps) {
  const merged = mergeProps({}, props);

  const ctx = useFormContext<Book>().state;
  const [form, { Form, Field }] = ctx.formData;
  const isLoading = () => ctx.isLoading;

  return (
    <Form onSubmit={merged.onSubmit}>
      <Field name="title">
        {(field, props) => <Input field={field} props={props} label="Title" />}
      </Field>
      <FormRow>
        <Field name="publisher">
          {(field, props) => <Input field={field} props={props} label="Publisher" />}
        </Field>
        <Field name="author">
          {(field, props) => <Input field={field} props={props} label="Author" />}
        </Field>
      </FormRow>
      <Field name="pageCount" type="number">
        {(field, props) => <Input field={field} props={props} label="Pages" type="number" />}
      </Field>
      <Field name="summary">
        {(field, props) => <Textarea field={field} props={props} label="Summary" />}
      </Field>
      <FormFooter of={form} onDelete={merged.onDelete} />
    </Form>
  );
}
