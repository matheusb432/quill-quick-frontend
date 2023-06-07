import { JSX } from 'solid-js';

interface LoadingProps {
  children?: JSX.Element;
  class?: string;
}

export function Loading(props: LoadingProps) {
  return (
    <div>
      <div
        class={`w-12 h-12 border-4 border-black-500 border-t-green-500 animate-spin rounded-full ${props.class}`}
      >
        {props?.children}
      </div>
    </div>
  );
}
