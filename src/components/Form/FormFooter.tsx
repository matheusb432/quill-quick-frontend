import { mergeProps } from 'solid-js';
import { Button } from '../Button';
import { ButtonsWrapper } from '../ButtonsWrapper';

interface FormFooterProps {
  isLoading?: boolean;
  onReset?: () => void;
  onDelete?: () => void;
  submitLabel?: string;
}

export function FormFooter(props: FormFooterProps) {
  const merged = mergeProps({ submitLabel: 'Submit' }, props);

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
        {/* TODO add modal to confirm */}
        {merged.onReset && (
          <Button mode="stroked" onClick={props.onReset}>
            Reset
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
