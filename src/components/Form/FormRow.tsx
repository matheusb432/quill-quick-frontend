import { JSX } from 'solid-js';

interface FormRowProps {
  children: JSX.Element;
}

export function FormRow(props: FormRowProps) {
  return <section class="flex items-center gap-x-6">{props.children}</section>;
}
