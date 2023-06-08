import { JSX } from 'solid-js';

interface PageTitleProps {
  children: JSX.Element;
}

export function PageTitle(props: PageTitleProps) {
  return <h1 class="font-serif text-4xl font-thin">{props.children}</h1>;
}
