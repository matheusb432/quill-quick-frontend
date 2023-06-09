import { SubmitHandler } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
import { FormFooter } from '~/components/Form/FormFooter';
import { FormRow } from '~/components/Form/FormRow';
import { InputField } from '~/components/Inputs/InputField';
import { booksActions, useBooksForm } from '../data/store';
import { Book } from '../types/book';

interface BookFormProps {
  onSubmit: SubmitHandler<Book>;
  onDelete?: () => void;
  isLoading?: boolean;
  type?: string;
}

export function BookForm(props: BookFormProps) {
  const merged = mergeProps({}, props);

  const [, { Form, Field }] = useBooksForm();
  const { resetForm } = booksActions;

  function handleReset() {
    resetForm();
  }

  return (
    <Form onSubmit={merged.onSubmit}>
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
      <FormFooter isLoading={merged.isLoading} onReset={handleReset} onDelete={merged.onDelete} />
    </Form>
  );
}
