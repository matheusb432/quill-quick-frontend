import { JSX } from 'solid-js';

interface ButtonsWrapperProps {
  children: JSX.Element;
}

export function ButtonsWrapper(props: ButtonsWrapperProps) {
  return <div class="flex gap-x-8">{props.children}</div>;
}
