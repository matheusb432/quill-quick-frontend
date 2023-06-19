import { Accessor, createEffect, createSignal, on, onCleanup } from 'solid-js';

export function createDebounce<T>(value: Accessor<T>, delay = 500) {
  const [debouncedValue, setDebouncedValue] = createSignal(value());

  createEffect(
    on(value, () => {
      const timer = setTimeout(() => {
        setDebouncedValue(() => value());
      }, delay);

      onCleanup(() => {
        clearTimeout(timer);
      });
    }),
  );

  return debouncedValue;
}
