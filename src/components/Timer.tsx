import { JSX, createEffect, createSignal, onCleanup } from 'solid-js';
import { strUtil } from '~/core/util/str-util';

interface TimerProps {
  class?: string;
  durationMs: number;
}

export function Timer(props: TimerProps) {
  const [transitioning, setTransitioning] = createSignal(false);

  createEffect(() => {
    setTransitioning(true);
  });

  const transitionOut = () => {
    return transitioning() ? `w-0` : 'w-full';
  };

  return (
    <div
      class={strUtil.cx(
        `bg-accent rounded-lg transition-all delay-0 ease-linear h-1 duration-[${props.durationMs}ms]`,
        transitionOut(),
        props.class,
      )}
    />
  );
}
