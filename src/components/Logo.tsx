import { strUtil } from '~/core/util/str-util';
import { Image } from './Image';
import { Show } from 'solid-js';

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
          <Image src="/logo-dark.svg" alt="logo" class="inline-block w-16 h-16" />
        </div>
      }
    >
      <div class={strUtil.cx('bg-black-500 rounded-full p-1', props.class)}>
        <Image src="/logo.svg" alt="logo" class="inline-block w-8 h-8" />
      </div>
    </Show>
  );
}
