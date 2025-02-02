import { JSX, Show } from 'solid-js';
import { Heading } from './Heading';

interface PageTitleProps {
  children: JSX.Element;
  subtitle?: JSX.Element;
}

export function PageTitle(props: PageTitleProps) {
  return (
    <header class="mb-8 flex flex-col items-center justify-center md:items-start">
      <Heading as="h1">{props.children}</Heading>
      <Show when={props.subtitle}>
        <Heading as="h2" class="text-neutral-content/80">
          {props.subtitle}
        </Heading>
      </Show>
    </header>
  );
}
