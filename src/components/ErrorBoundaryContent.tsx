import { A } from 'solid-start';
import { Alert } from './Alert';
import { MainContainer } from './MainContainer';

export function ErrorBoundaryContent() {
  function reloadPage() {
    window.location.reload();
  }
  return (
    <MainContainer>
      <Alert type="error" class="my-4">
        Something went wrong!
      </Alert>
      <p class="my-4">
        <A href="/" class="text-4xl text-green-600 hover:underline" onClick={reloadPage}>
          Return Home & Reload page
        </A>
      </p>
    </MainContainer>
  );
}
