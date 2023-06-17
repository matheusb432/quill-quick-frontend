import { createEffect, createRoot, onCleanup } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { ToastAs, ToastData } from '../types/toast-types';
import { ToastDefaults } from '../constants/ui-defaults';

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

  function makeToastCreator(toastAsFn: (message: string, durationMs?: number) => ToastData) {
    return (message: string, durationMs?: number) => {
      return next(toastAsFn(message, durationMs));
    };
  }

  const asSuccess = makeToastCreator(ToastAs.success);
  const asError = makeToastCreator(ToastAs.error);
  const asInfo = makeToastCreator(ToastAs.info);
  const asWarning = makeToastCreator(ToastAs.warning);

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
      asSuccess,
      asError,
      asInfo,
      asWarning,
      remove,
      startClosing,
    },
  };
}

export const toastStore = createRoot(createToastStore);
