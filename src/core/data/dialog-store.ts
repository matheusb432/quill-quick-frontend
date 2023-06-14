import { createEffect, createRoot } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { DialogBaseData, DialogData } from '../types/dialog-types';

type DialogState = {
  dialogs: Required<DialogData>[];
  show: boolean;
};

const initialState: DialogState = {
  dialogs: [],
  show: false,
};

function createDialogStore() {
  const [state, setState] = createStore<DialogState>(initialState);
  const isCurrentLoading = () => state.dialogs[0]?.isLoadingConfirm;

  createEffect(() => {
    // TODO clean
    console.log(state);
  });

  function buildDialog(data: Required<DialogBaseData>): Required<DialogData> {
    return {
      ...data,
      onConfirm: () => handleConfirm(data.onConfirm),
      onClose: () => handleClose(data.onClose),
      isLoadingConfirm: false,
    };
  }

  async function handleConfirm(fn: () => void | Promise<void>) {
    try {
      setCurrentLoading(true);
      await fn();
    } finally {
      setCurrentLoading(false);
      // TODO should only close the original dialog
      closeCurrent();
    }
  }

  function setCurrentLoading(loading: boolean) {
    if (state.dialogs.length === 0) return;
    setState('dialogs', 0, 'isLoadingConfirm', loading);
  }

  function handleClose(fn?: () => void) {
    fn?.();
    closeCurrent();
  }

  /**
   * @description
   * Creates a new dialog and adds it to the start of the queue.
   */
  function create(data: Required<DialogBaseData>) {
    if (isCurrentLoading()) {
      throw new Error('Cannot create a new dialog while the current one is loading.');
    }

    setState(
      produce((state) => {
        state.dialogs.unshift(buildDialog(data));
        console.log(state.dialogs);
        state.show = true;
      }),
    );
  }

  function closeCurrent() {
    setState(
      produce((state) => {
        state.dialogs.shift();
        if (state.dialogs.length === 0) state.show = false;
      }),
    );
  }

  return {
    state,
    actions: {
      create,
      closeCurrent,
    },
  };
}

export const dialogStore = createRoot(createDialogStore);
