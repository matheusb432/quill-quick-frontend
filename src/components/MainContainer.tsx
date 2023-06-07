import { JSX, Suspense } from 'solid-js';
import { MainHeader } from './MainHeader';
import { Loading } from './Loading';

interface ContainerProps {
  children: JSX.Element;
}

export function MainContainer(props: ContainerProps) {
  return (
    <main class="h-screen w-screen ">
      <MainHeader />
      <Suspense fallback={<Loading class="h-24 w-24 border-[16px]" />}>
        <div class="py-8 px-6">{props.children}</div>
      </Suspense>
    </main>
  );
}
