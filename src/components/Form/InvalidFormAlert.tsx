import { getErrors } from '@modular-forms/solid';
import { For, Show } from 'solid-js';
import { useFormContext } from '~/core/store/form-context';
import { formUtil } from '~/core/util/form-util';
import { Alert } from '../Alert';

export function InvalidFormAlert() {
  const { state, labels } = useFormContext();
  const [form] = state.formData;

  const canShow = () => !!form.submitCount && errorFields().length > 0;
  const errorFields = () => {
    const fieldNames = [];
    for (const key in getErrors(form)) {
      const value = labels()[key] || formUtil.nameToLabel(key);

      fieldNames.push(value);
    }

    return fieldNames;
  };
  return (
    <Show when={canShow()}>
      <Alert type="warning" canDismiss title="Invalid Fields">
        <span>
          The fields
          <For each={errorFields()}>
            {(fieldName, index) => (
              <span>
                {index() !== 0 && ','}
                {` ${fieldName}`}
              </span>
            )}
          </For>{' '}
          are invalid. Please enter valid values for them to submit the form.
        </span>
      </Alert>
    </Show>
  );
}
