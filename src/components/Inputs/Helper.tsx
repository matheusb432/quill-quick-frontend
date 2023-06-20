import { Show } from 'solid-js';

interface HelperProps {
  isError?: boolean;
  text: string | undefined;
}

export function Helper(props: HelperProps) {
  return (
    <Show when={props.text}>
      <span
        class="absolute bottom-1 text-neutral-content/80 transition-opacity duration-200"
        classList={{
          'opacity-0': props.isError,
        }}
        aria-hidden={props.isError}
      >
        {props.text}
      </span>
    </Show>
  );
}
