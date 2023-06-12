import { Accessor, Show, createEffect, createSignal, on, onCleanup } from 'solid-js';
import { WithKey } from '~/core/types/with-key';
import { strUtil } from '~/core/util/str-util';

type TimerProps = WithKey & {
  class?: string;
  durationMs: Accessor<number>;
};

export function Timer(props: TimerProps) {
  const [timerKey, setTimerKey] = createSignal(0);
  const keyAcessor = () => props.key;

  createEffect(on(keyAcessor, () => setTimerKey(timerKey() + 1), { defer: false }));

  return (
    <Show
      when={timerKey() % 2 === 0}
      fallback={<TimerContent durationMs={props.durationMs} class={props.class} />}
    >
      <TimerContent durationMs={props.durationMs} class={props.class} />
    </Show>
  );
}

function TimerContent(props: TimerProps) {
  const [transitioning, setTransitioning] = createSignal(false);

  createEffect(() => {
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
        `rounded-lg transition-all w-full ease-linear h-1 duration-[${props.durationMs()}ms]`,
        transitionOut(),
        props.class,
      )}
    />
  );
}
