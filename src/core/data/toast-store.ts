import { createEffect, createRoot, onCleanup } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { ToastDefaults } from '../constants/defaults';
import { ToastData } from '../types/toast-types';

type ToastState = {
  queue: ToastData[];
  closing: boolean;
};

const initialToastState: ToastState = {
  queue: [],
  closing: false,
};

function createToastStore() {
  const [state, setState] = createStore<ToastState>(initialToastState);
  const activeToast = (): ToastData | undefined => state.queue[0];
  const nextId = (): string | number | undefined => state.queue[1]?.id;
  const duration = () => activeToast()?.durationMs || ToastDefaults.DurationMs;
  let closingTimeout: NodeJS.Timeout;
  let closedTimeout: NodeJS.Timeout;

  onCleanup(() => {
    clearTimeouts();
  });

  createEffect(() => {
    clearTimeout(closedTimeout);

    closedTimeout = setTimeout(startClosing, duration());
    onCleanup(() => clearTimeout(closedTimeout));
  });

  function next(data: ToastData) {
    setState(
      produce((state) => {
        state.queue.push(data);
        state.closing = false;
      }),
    );
  }

  function remove(id: string | number | undefined) {
    if (id === undefined) return;
    const isLast = nextId() === undefined;
    if (isLast) setState('closing', true);

    closingTimeout = setTimeout(
      () => removeFn(id),
      isLast ? ToastDefaults.TransitionDurationMs : 0,
    );
  }

  function removeFn(id: string | number | undefined) {
    setState('queue', (queue) => queue.filter((t) => t.id !== id));
  }

  function clearTimeouts() {
    clearTimeout(closingTimeout);
    clearTimeout(closedTimeout);
  }

  const startClosing = () => {
    const activeId = activeToast()?.id;

    remove(activeId);
  };

  return {
    state,
    actions: {
      next,
      remove,
      startClosing,
    },
  };
}

export const toastStore = createRoot(createToastStore);
