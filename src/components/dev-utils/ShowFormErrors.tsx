import { FieldValues, FormStore, ResponseData, getErrors } from '@modular-forms/solid';

interface ShowFormErrorsProps<T extends FieldValues, R extends ResponseData> {
  form: FormStore<T, R>;
}

export function ShowFormErrors<T extends FieldValues, R extends ResponseData>(
  props: ShowFormErrorsProps<T, R>,
) {
  return <p>{JSON.stringify(getErrors(props.form))}</p>;
}
