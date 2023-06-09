import { SubmitHandler, createForm, zodForm } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
import { Book, zBook } from '../types/book';
import { FormFooter } from '~/components/Form/FormFooter';
import { FormRow } from '~/components/Form/FormRow';
import { InputField } from '~/components/Inputs/InputField';

interface BookFormProps {
  onSubmit: (data: Book) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  isLoading?: boolean;
  type?: string;
}

export function BookForm(props: BookFormProps) {
  const merged = mergeProps({}, props);
  const [, { Form, Field }] = createForm<Book>({
    validate: zodForm(zBook),
  });

  const handleSubmit: SubmitHandler<Book> = (values) => {
    console.warn(values);
  };

  return (
    <Form class="flex flex-col gap-y-2 relative" onSubmit={handleSubmit}>
      <Field name="title">
        {(field, props) => {
          return <InputField field={field} props={props} label="Title" name="title" />;
        }}
      </Field>
      <FormRow>
        <Field name="publisher">
          {(field, props) => {
            return <InputField field={field} props={props} label="Publisher" name="publisher" />;
          }}
        </Field>
        <Field name="author">
          {(field, props) => {
            return <InputField field={field} props={props} label="Author" name="author" />;
          }}
        </Field>
      </FormRow>
      <Field name="pageCount" type="number">
        {(field, props) => {
          return (
            <InputField field={field} props={props} label="Pages" name="pageCount" type="number" />
          );
        }}
      </Field>
      <Field name="summary">
        {(field, props) => {
          return <InputField field={field} props={props} label="Summary" name="summary" />;
        }}
      </Field>
      <FormFooter
        isLoading={merged.isLoading}
        onCancel={merged.onCancel}
        onDelete={merged.onDelete}
      />
    </Form>
  );
}
