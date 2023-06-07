import { JSX } from 'solid-js';
import { ErrorBoundary } from 'solid-start';
import { MainContainer } from './MainContainer';

interface RootProps {
  children: JSX.Element;
}

export function RootLayout(props: RootProps) {
  return (
    <ErrorBoundary>
      <MainContainer>{props.children}</MainContainer>
    </ErrorBoundary>
  );
}
