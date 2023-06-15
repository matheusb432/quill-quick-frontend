import { getErrors, reset } from '@modular-forms/solid';
import { For, Show, mergeProps } from 'solid-js';
import { useFormContext } from '~/core/store/form-context';
import { Button } from '../Button';
import { ButtonsWrapper } from '../ButtonsWrapper';
import { FormModes } from '~/core/types/form-types';
import { strUtil } from '~/core/util/str-util';
import { DebugForm } from '../_dev-utils/DebugForm';
import { Alert } from '../Alert';
import { formUtil } from '~/core/util/form-util';

interface FormFooterProps {
  withReset?: boolean;
  onDelete?: () => void;
  submitLabel?: string;
  names?: Record<string, string>;
}

export function FormFooter(props: FormFooterProps) {
  const ctx = useFormContext().state;
  const [form] = ctx.formData;
  const errorFields = () => {
    const fieldNames = [];
    for (const key in getErrors(form)) {
      const value = props.names?.[key] || formUtil.nameToLabel(key);

      fieldNames.push(value);
    }

    return fieldNames;
  };
  const isEditMode = () => ctx.mode === FormModes.Edit;
  const isViewMode = () => ctx.mode === FormModes.View;

  const merged = mergeProps({ submitLabel: 'Submit', withReset: true }, props);
  const submitLabel = () => props.submitLabel || strUtil.capitalizeFirst(ctx.mode);
  const canDelete = () => merged.onDelete && isEditMode();
  const canRenderSubmit = () => !isViewMode();

  return (
    <>
      <DebugForm form={form} />
      <Show when={errorFields().length > 0}>
        <Alert type="warning" canDismiss title="Invalid Fields">
          <span>
            The fields
            <For each={errorFields()}>
              {(fieldName, idx) => (
                <span>
                  {idx() !== 0 && ','}
                  {` ${fieldName}`}
                </span>
              )}
            </For>{' '}
            are invalid. Please enter valid values for them to submit the form.
          </span>
        </Alert>
      </Show>
      <footer class="sticky bottom-0 bg-primary-base left-0 flex items-center justify-between py-4">
        <ButtonsWrapper>
          {canDelete() && (
            <Button
              theme="danger"
              disabled={ctx.isLoading || ctx.disabled}
              onClick={merged.onDelete}
            >
              Delete
            </Button>
          )}
        </ButtonsWrapper>
        <ButtonsWrapper>
          <Show when={canRenderSubmit()}>
            {merged.withReset && (
              <Button mode="stroked" disabled={ctx.isLoading} onClick={() => reset(form)}>
                Reset
              </Button>
            )}
            <Button type="submit" isLoading={ctx.isLoading} disabled={ctx.disabled} theme="primary">
              {submitLabel()}
            </Button>
          </Show>
        </ButtonsWrapper>
      </footer>
    </>
  );
}
