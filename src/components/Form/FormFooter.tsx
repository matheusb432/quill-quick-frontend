import { JSX, mergeProps } from 'solid-js';
import { Button } from '../Button';
import { ButtonsWrapper } from '../ButtonsWrapper';

interface FormFooterProps {
  isLoading?: boolean;
  onCancel?: () => void;
  onDelete?: () => void;
  submitLabel?: string;
}

export function FormFooter(props: FormFooterProps) {
  const merged = mergeProps({ submitLabel: 'Submit' }, props);

  return (
    <footer class="flex justify-between items-center sticky bottom-0">
      <ButtonsWrapper>
        {merged.onDelete && (
          <Button theme="danger" onClick={merged.onDelete}>
            Delete
          </Button>
        )}
      </ButtonsWrapper>
      <ButtonsWrapper>
        {/* TODO add modal to confirm */}
        {merged.onCancel && (
          <Button mode="stroked" onClick={merged.onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={merged.isLoading} theme="primary">
          {merged.submitLabel}
        </Button>
      </ButtonsWrapper>
    </footer>
  );
}

FormFooter.Row = <></>;
