import { JSX, Suspense } from 'solid-js';
import { MainHeader } from './MainHeader';
import { Loading } from './Loading';

interface ContainerProps {
  children: JSX.Element;
}

export function MainContainer(props: ContainerProps) {
  return (
    <main class="min-h-screen max-h-screen bg-primary-base scroll-smooth text-primary-text overflow-x-hidden">
      <MainHeader />
      <Suspense fallback={<Loading class="h-24 w-24 border-[16px]" />}>
        <div class="px-6 py-8">{props.children}</div>
      </Suspense>
    </main>
  );
}
