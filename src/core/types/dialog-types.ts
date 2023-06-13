import { ActionTypes } from './action-types';

export type DialogData = {
  title: string;
  type: ActionTypes;
  confirmText: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoadingConfirm?: boolean;
};
