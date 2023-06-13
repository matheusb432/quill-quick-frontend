import { mergeProps } from 'solid-js';
import { Button } from '../Button';
import { ButtonsWrapper } from '../ButtonsWrapper';
import { FieldValues, FormStore, ResponseData, reset } from '@modular-forms/solid';

interface FormFooterProps<TF extends FieldValues, TR extends ResponseData> {
  of: FormStore<TF, TR>;
  withReset?: boolean;
  onDelete?: () => void;
  submitLabel?: string;
}

export function FormFooter<TF extends FieldValues, TR extends ResponseData>(
  props: FormFooterProps<TF, TR>,
) {
  const merged = mergeProps({ submitLabel: 'Submit', withReset: true }, props);
  const isLoading = () => merged.of.submitting;

  return (
    <footer class="sticky bottom-0 left-0 flex items-center justify-between bg-primary-base py-4">
      <ButtonsWrapper>
        {merged.onDelete && (
          <Button theme="danger" onClick={merged.onDelete}>
            Delete
          </Button>
        )}
      </ButtonsWrapper>
      <ButtonsWrapper>
        {merged.withReset && (
          <Button mode="stroked" onClick={() => reset(merged.of)}>
            Reset
          </Button>
        )}
        <Button type="submit" isLoading={isLoading()} theme="primary">
          {merged.submitLabel}
        </Button>
      </ButtonsWrapper>
    </footer>
  );
}

FormFooter.Row = <></>;
