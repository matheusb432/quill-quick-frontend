import { JSX } from 'solid-js';
import { strUtil } from '~/core/util/str-util';

interface FormRowProps {
  children: JSX.Element;
  class?: string;
}

export function FormRow(props: FormRowProps) {
  return (
    <section class={strUtil.cx('flex flex-col items-center gap-x-6 md:flex-row', props.class)}>
      {props.children}
    </section>
  );
}
