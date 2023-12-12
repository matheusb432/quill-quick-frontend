import { strUtil } from '~/core/util/str-util';

interface PingProps {
  class?: string;
}

export function Ping(props: PingProps) {
  return (
    <span class={strUtil.cx(`flex h-4 w-4 ${props.class}`)}>
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
      <span class="relative inline-flex h-full w-full rounded-full bg-primary" />
    </span>
  );
}
