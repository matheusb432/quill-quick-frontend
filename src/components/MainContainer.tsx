import { JSX } from 'solid-js';
import { MainHeader } from './MainHeader';

interface ContainerProps {
  children: JSX.Element;
}

export function MainContainer(props: ContainerProps) {
  return (
    <>
      <main class="max-h-screen min-h-screen overflow-x-hidden scroll-smooth bg-primary-base text-primary-text">
        <MainHeader />
        <div class="px-6 py-8">{props.children}</div>
      </main>
    </>
  );
}
