import { JSX } from 'solid-js';

interface LabelProps {
  children: JSX.Element;
  forId: string;
}

export function Label(props: LabelProps) {
  return (
    <label
      class="top-1 left-4 text-sm text-divider absolute peer-placeholder-shown:left-4 peer-placeholder-shown:text-2xl peer-focus:text-accent peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:left-4 peer-focus:text-sm transition-all"
      for={props.forId}
    >
      {props.children}
    </label>
  );
}
