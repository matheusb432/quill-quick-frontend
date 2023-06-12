import { createEffect, createRoot, createSignal, onCleanup } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { ToastData } from '../types/toast-types';
import { Defaults, ToastDefaults } from '../constants/defaults';

type UiState = {
  toastQueue: ToastData[];
};

type ToastState = {
  queue: ToastData[];
  closing: boolean;
};

const initialState: UiState = {
  toastQueue: [],
};

// function createUiStore() {
//   const {state: toastState, actions: toastActions} = createToastStore();

//   const [state, setState] = createStore<UiState>(initialState);

//   function nextToast(data: ToastData) {
//     setState('toastQueue', (queue) => [...queue, data]);
//   }

//   return {
//     state,
//     actions: {
//       nextToast,
//     },
//   };
// }

const initialToastState: ToastState = {
  queue: [],
  closing: false,
};

function createToastStore() {
  const [state, setState] = createStore<ToastState>(initialToastState);
  const activeToast = (): ToastData | undefined => state.queue[0];
  const nextId = (): string | number | undefined => state.queue[1]?.id;
  const duration = () => activeToast()?.duration || ToastDefaults.DurationMs;
  let closingTimeout: NodeJS.Timeout;
  let closedTimeout: NodeJS.Timeout;

  onCleanup(() => {
    clearTimeouts();
  });

  createEffect(() => {
    clearTimeout(closedTimeout);

    closedTimeout = setTimeout(startClosing, duration());
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

// const { state, actions } = createRoot(createUiStore);
// const useUiState = <T>(selector: (state: UiState) => T) => selector(state);
// export const useUiActiveToast = (): ToastData | undefined =>
//   useUiState((state) => state.toastQueue[0]);
// export const uiActions = actions;
const { state, actions } = createRoot(createToastStore);
export const useToastState = <T>(selector: (state: ToastState) => T) => selector(state);
export const useActiveToast = (): ToastData | undefined => useToastState((state) => state.queue[0]);
export const toastActions = actions;
