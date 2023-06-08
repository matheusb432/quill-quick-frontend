import { SubmitHandler, createForm, zodForm } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
import { Button } from '~/components/Button';
import { ShowFormErrors } from '~/components/dev-utils/ShowFormErrors';
import { Book, zBook } from '../types/book';

interface BookFormProps {
  onSubmit: (data: Book) => void;
  isLoading?: boolean;
  type?: string;
}

export function BookForm(props: BookFormProps) {
  const merged = mergeProps({}, props);
  // TODO test store of form in different cmps
  const [bookForm, { Form, Field }] = createForm<Book>({
    validate: zodForm(zBook),
  });

  const handleSubmit: SubmitHandler<Book> = (values) => {
    console.warn(values);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <ShowFormErrors form={bookForm} />
      <Field name="title">
        {(field, props) => {
          return (
            <div class="flex flex-col gap-y-2 w-full h-full">
              <input
                class="form-input bg-black-400  h-14 border-0 border-l-4 border-green-500 focus:ring-green-500 focus:border-green-500 transition-all"
                {...props}
              />
            </div>
          );
        }}
      </Field>
      <Field name="author">
        {(field, props) => {
          return <input {...props} />;
        }}
      </Field>
      {/* <Field name="author" />
        <Field name="publisher" />
        <Field name="summary" />
        <Field name="pageCount" /> */}
      <Button type="submit" isLoading={merged.isLoading} theme="primary">
        Submit
      </Button>
    </Form>
  );
}
