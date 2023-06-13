import { Accessor, Show, createEffect, createSignal, on, onCleanup } from 'solid-js';
import { WithKey } from '~/core/types/with-key';
import { strUtil } from '~/core/util/str-util';

type TimerProps = WithKey & {
  class?: string;
  durationMs: number;
};

export function Timer(props: TimerProps) {
  const [timerKey, setTimerKey] = createSignal(0);
  const keyAcessor = () => props.key;

  createEffect(
    on(
      keyAcessor,
      () => {
        setTimerKey(timerKey() + 1);
      },
      { defer: false },
    ),
  );

  return (
    <Show
      when={timerKey() % 2 === 0}
      fallback={<TimerContent duration={props.durationMs} class={props.class} />}
    >
      <TimerContent duration={props.durationMs} class={props.class} />
    </Show>
  );
}

type TimerContentProps = {
  class?: string;
  duration: number;
};

function TimerContent(props: TimerContentProps) {
  const [transitioning, setTransitioning] = createSignal(false);
  const duration = () => props.duration;

  createEffect(() => {
    setTransitioning(false);
    const timeout = setTimeout(() => setTransitioning(true), 10);
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  const transitionOut = () => {
    return transitioning() ? `w-0` : '';
  };

  return (
    <div
      class={strUtil.cx(
        `h-1 w-full rounded-lg transition-all delay-0 ease-linear`,
        transitionOut(),
        props.class,
      )}
      style={{ 'transition-duration': `${duration()}ms` }}
    />
  );
}
