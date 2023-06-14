import { reset } from '@modular-forms/solid';
import { mergeProps } from 'solid-js';
import { useFormContext } from '~/core/data/form-context';
import { Button } from '../Button';
import { ButtonsWrapper } from '../ButtonsWrapper';

interface FormFooterProps {
  withReset?: boolean;
  onDelete?: () => void;
  submitLabel?: string;
}

export function FormFooter(props: FormFooterProps) {
  const merged = mergeProps({ submitLabel: 'Submit', withReset: true }, props);
  const ctx = useFormContext().state;
  const [form] = ctx.formData;
  const isLoading = () => ctx.isLoading;

  return (
    <footer class="sticky bottom-0 left-0 flex items-center justify-between bg-primary-base py-4">
      <ButtonsWrapper>
        {merged.onDelete && (
          <Button theme="danger" disabled={isLoading()} onClick={merged.onDelete}>
            Delete
          </Button>
        )}
      </ButtonsWrapper>
      <ButtonsWrapper>
        {merged.withReset && (
          <Button mode="stroked" disabled={isLoading()} onClick={() => reset(form)}>
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
