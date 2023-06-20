import { Show } from 'solid-js';

interface ErrorTextProps {
  isError?: boolean;
  text: string | undefined;
}

export function ErrorText(props: ErrorTextProps) {
  return (
    <Show when={props.text}>
      <span
        classList={{
          'h-7 text-red-500 transition-opacity duration-200 opacity-0': true,
          'opacity-100': props.isError,
        }}
        aria-hidden={!props.isError}
      >
        {props.text}
      </span>
    </Show>
  );
}
