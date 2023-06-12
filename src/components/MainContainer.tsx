import { JSX } from 'solid-js';
import { MainHeader } from './MainHeader';
import { clientOnly } from 'solid-start/islands';

const Toast = clientOnly(() => import('~/components/Toast'));

interface ContainerProps {
  children: JSX.Element;
}

export function MainContainer(props: ContainerProps) {
  return (
    <main class="min-h-screen max-h-screen bg-primary-base scroll-smooth text-primary-text overflow-x-hidden">
      <MainHeader />
      <div class="px-6 py-8">{props.children}</div>
      <Toast />
    </main>
  );
}
