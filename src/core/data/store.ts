import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
import { ToastData } from '../types/toast-types';

type UiState = {
  toastQueue: ToastData[];
};

const initialState: UiState = {
  toastQueue: [],
};

function createUiStore() {
  const [state, setState] = createStore<UiState>(initialState);

  return {
    state,
    actions: {},
  };
}

const { state, actions } = createRoot(createUiStore);
