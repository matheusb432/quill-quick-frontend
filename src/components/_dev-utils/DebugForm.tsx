import { FieldValues, FormStore, ResponseData, getErrors, getValues } from '@modular-forms/solid';

interface DebugFormProps<T extends FieldValues, R extends ResponseData> {
  form: FormStore<T, R>;
}

export function DebugForm<T extends FieldValues, R extends ResponseData>(
  props: DebugFormProps<T, R>,
) {
  return (
    <>
      <p>Errors - {JSON.stringify(getErrors(props.form))}</p>
      <p>Values - {JSON.stringify(getValues(props.form))}</p>
      <p>
        Submit data - count: {JSON.stringify(props.form.submitCount)} submitting:{' '}
        {JSON.stringify(props.form.submitting)} invalid: {JSON.stringify(props.form.invalid)}
      </p>
    </>
  );
}
