import { getErrors } from '@modular-forms/solid';
import { For, Show } from 'solid-js';
import { useFormContext } from '~/core/store/form-context';
import { formUtil } from '~/core/util/form-util';
import { Alert } from '../Alert';
import { arrUtil } from '~/core/util/arr-util';

export function InvalidFormAlert() {
  const { state, labels } = useFormContext();
  const [form] = state.form;

  const canShow = () => !!form.submitCount && errorFields().length > 0;
  const errorFields = (): string[] => {
    const fieldNames: string[] = [];
    const currentLabels = labels();
    for (const key in getErrors(form)) {
      const value = currentLabels[key as never] || formUtil.nameToLabel(key);

      fieldNames.push(value);
    }

    return arrUtil.removeDuplicates(fieldNames);
  };
  return (
    <Show when={canShow()}>
      <Alert type="warning" canDismiss title="Invalid Fields">
        <span>
          <Show
            when={errorFields().length > 1}
            fallback={
              <>
                The field <strong>{`'${errorFields()[0]}'`}</strong> is invalid.
              </>
            }
          >
            The fields
            <For each={errorFields()}>
              {(fieldName, index) => (
                <strong>
                  {index() !== 0 && ','}
                  {` '${fieldName}'`}
                </strong>
              )}
            </For>
            are invalid.
          </Show>{' '}
          Please enter valid values to submit the form.
        </span>
      </Alert>
    </Show>
  );
}
