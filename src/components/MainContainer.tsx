import { JSX } from 'solid-js';

interface MainContainerProps {
  children: JSX.Element;
}

export function MainContainer(props: MainContainerProps) {
  return <main class="px-6 py-8">{props.children}</main>;
}
