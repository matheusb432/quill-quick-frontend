import { createRoot } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { DialogAs, DialogBaseData, DialogData, NewDialog } from '../types/dialog-types';

type StoreDialog = Required<DialogData> & { id: number };

type DialogState = {
  dialogs: StoreDialog[];
};

const initialState: DialogState = {
  dialogs: [],
};

function createDialogStore() {
  const [state, setState] = createStore<DialogState>(initialState);
  const isCurrentLoading = () => state.dialogs[0]?.isLoadingConfirm;
  const show = () => state.dialogs.length > 0;

  function buildDialog(data: Required<DialogBaseData>): Required<DialogData> & { id: number } {
    const id = new Date().getTime();
    return {
      ...data,
      id,
      onConfirm: () => handleConfirm(id, data.onConfirm),
      onClose: () => handleClose(id, data.onClose),
      isLoadingConfirm: false,
    };
  }

  async function handleConfirm(id: number, fn: () => void | Promise<void>) {
    try {
      setCurrentLoading(id, true);
      await fn();
    } finally {
      setCurrentLoading(id, false);
      closeById(id);
    }
  }

  function handleClose(id: number, fn?: () => void) {
    fn?.();
    closeById(id);
  }

  function closeById(id: number) {
    setState(
      produce((state) => {
        const index = state.dialogs.findIndex((d) => d.id === id);
        if (index === -1) return;

        state.dialogs.splice(index, 1);
      }),
    );
  }

  function setCurrentLoading(id: number, loading: boolean) {
    setState('dialogs', (b) => b.id === id, 'isLoadingConfirm', loading);
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
      }),
    );
  }

  function asDanger(data: NewDialog) {
    return create(DialogAs.danger(data));
  }

  function asPrimary(data: NewDialog) {
    return create(DialogAs.primary(data));
  }

  function asWarning(data: NewDialog) {
    return create(DialogAs.warning(data));
  }

  function closeCurrent() {
    setState(
      produce((state) => {
        state.dialogs.shift();
      }),
    );
  }

  return {
    state,
    computed: {
      show,
    },
    actions: {
      asDanger,
      asPrimary,
      asWarning,
      closeCurrent,
    },
  };
}

export const dialogStore = createRoot(createDialogStore);
