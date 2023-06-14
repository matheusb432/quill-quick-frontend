import { Show, mergeProps } from 'solid-js';
import { useNavigate } from 'solid-start';
import { Alert } from './Alert';
import { Button } from './Button';

interface PageErrorProps {
  when: boolean;
  message?: string;
  goBackPath?: string;
  onRetry?(): void;
}

export function PageError(props: PageErrorProps) {
  const merged = mergeProps({ message: 'Failed to load item!' }, props);
  const navigate = useNavigate();

  function handleGoBack() {
    if (merged.goBackPath === undefined) return navigate(-1);
    return navigate(merged.goBackPath);
  }
  return (
    <Show when={merged.when}>
      <Alert type="error">
        {merged.message}
        <div class="flex gap-x-6 justify-center items-center my-3">
          <Button mode="stroked" onClick={handleGoBack}>
            Go Back
          </Button>
          {merged.onRetry && <Button onClick={() => merged.onRetry?.()}>Try again</Button>}
        </div>
      </Alert>
    </Show>
  );
}
