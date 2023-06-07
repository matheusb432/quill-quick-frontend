import { JSX } from 'solid-js';

interface PageTitleProps {
  children: JSX.Element;
}

export function PageTitle(props: PageTitleProps) {
  return <h1 class="text-4xl font-thin font-serif">{props.children}</h1>;
}
