import { strUtil } from '~/core/util/str-util';
import { Show } from 'solid-js';
import { Image } from '~/components/Image';

interface LogoProps {
  class?: string;
  type: 'rounded' | 'normal';
}

export function Logo(props: LogoProps) {
  return (
    <Show
      when={props.type === 'rounded'}
      fallback={
        <div class={strUtil.cx('p-1', props.class)}>
          <Image src="/logo-dark.svg" alt="logo" class="inline-block h-16 w-16" />
        </div>
      }
    >
      <div class={strUtil.cx('rounded-full bg-primary-light p-1', props.class)}>
        <Image src="/logo.svg" alt="logo" class="inline-block h-8 w-8" />
      </div>
    </Show>
  );
}
