import { JSX } from 'solid-js';

interface LabelProps {
  children: JSX.Element;
  forId: string;
}

export function Label(props: LabelProps) {
  return (
    <label class="text-2xl text-neutral-content/80 transition-all" for={props.forId}>
      {props.children}
    </label>
  );
}
