import { JSX } from 'solid-js';

interface LoadingProps {
  children?: JSX.Element;
  class?: string;
}

export function Loading(props: LoadingProps) {
  return (
    <div>
      <div
        class={`h-12 w-12 animate-spin rounded-full border-4 border-neutral border-t-primary ${props.class}`}
      >
        {props?.children}
      </div>
    </div>
  );
}
