import { JSX } from 'solid-js';

interface LabelProps {
  children: JSX.Element;
  forId: string;
}

export function Label(props: LabelProps) {
  return (
    <label
      class="absolute left-4 top-1 text-sm text-divider transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-2xl peer-focus:top-1 peer-focus:text-sm peer-focus:text-accent"
      for={props.forId}
    >
      {props.children}
    </label>
  );
}
