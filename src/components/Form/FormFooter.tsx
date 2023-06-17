import { reset } from '@modular-forms/solid';
import { Show, mergeProps } from 'solid-js';
import { useFormContext } from '~/core/store/form-context';
import { FormModes } from '~/core/types/form-types';
import { strUtil } from '~/core/util/str-util';
import { Button } from '../Button';
import { ButtonsWrapper } from '../ButtonsWrapper';
import { InvalidFormAlert } from './InvalidFormAlert';

interface FormFooterProps {
  withReset?: boolean;
  onDelete?: () => void;
  submitLabel?: string;
}

export function FormFooter(props: FormFooterProps) {
  const ctx = useFormContext().state;
  const [form] = ctx.form;

  const isEditMode = () => ctx.mode === FormModes.Edit;
  const isViewMode = () => ctx.mode === FormModes.View;

  const merged = mergeProps({ submitLabel: 'Submit', withReset: true }, props);
  const submitLabel = () => props.submitLabel || strUtil.capitalizeFirst(ctx.mode);
  const canDelete = () => merged.onDelete && isEditMode();
  const canRenderSubmit = () => !isViewMode();

  return (
    <>
      <InvalidFormAlert />
      <footer class="sticky bottom-0 bg-neutral left-0 flex items-center justify-between py-4">
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
              <Button theme="default" disabled={ctx.isLoading} onClick={() => reset(form)}>
                Reset
              </Button>
            )}
            <Button type="submit" isLoading={ctx.isLoading} disabled={ctx.disabled}>
              {submitLabel()}
            </Button>
          </Show>
        </ButtonsWrapper>
      </footer>
    </>
  );
}
