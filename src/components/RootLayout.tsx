import { JSX } from 'solid-js';
import { ErrorBoundary } from 'solid-start';
import { MainHeader } from './MainHeader';

interface RootProps {
  children: JSX.Element;
}

export function RootLayout(props: RootProps) {
  return (
    <ErrorBoundary>
      <div class="max-h-screen min-h-screen overflow-x-hidden scroll-smooth bg-neutral text-neutral-content">
        <MainHeader />
        {props.children}
      </div>
    </ErrorBoundary>
  );
}
