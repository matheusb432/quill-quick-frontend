import { reset } from '@modular-forms/solid';
import { Show, mergeProps } from 'solid-js';
import { useFormContext } from '~/core/data/form-context';
import { Button } from '../Button';
import { ButtonsWrapper } from '../ButtonsWrapper';
import { FormModes } from '~/core/types/form-types';
import { strUtil } from '~/core/util/str-util';

interface FormFooterProps {
  withReset?: boolean;
  onDelete?: () => void;
  submitLabel?: string;
}

export function FormFooter(props: FormFooterProps) {
  const ctx = useFormContext().state;
  const [form] = ctx.formData;
  const isLoading = () => ctx.isLoading;
  const isEditMode = () => ctx.mode === FormModes.Edit;
  const isViewMode = () => ctx.mode === FormModes.View;

  const merged = mergeProps({ submitLabel: 'Submit', withReset: true }, props);
  const submitLabel = () => props.submitLabel || strUtil.capitalizeFirst(ctx.mode);
  const canDelete = () => merged.onDelete && isEditMode();
  const canRenderSubmit = () => !isViewMode();

  return (
    <footer class="sticky bottom-0 left-0 flex items-center justify-between bg-primary-base py-4">
      <ButtonsWrapper>
        {canDelete() && (
          <Button theme="danger" disabled={isLoading()} onClick={merged.onDelete}>
            Delete
          </Button>
        )}
      </ButtonsWrapper>
      <ButtonsWrapper>
        <Show when={canRenderSubmit()}>
          {merged.withReset && (
            <Button mode="stroked" disabled={isLoading()} onClick={() => reset(form)}>
              Reset
            </Button>
          )}
          <Button type="submit" isLoading={isLoading()} theme="primary">
            {submitLabel()}
          </Button>
        </Show>
      </ButtonsWrapper>
    </footer>
  );
}
