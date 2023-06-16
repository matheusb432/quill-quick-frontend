import { fnUtil } from '../util/fn-util';
import { ActionTypes } from './action-types';

export type DialogData = {
  title: string;
  type: ActionTypes;
  confirmText: string;
  message: string;
  onConfirm: () => void;
  onClose?: () => void;
  isLoadingConfirm?: boolean;
};

export type DialogBaseData = Omit<DialogData, 'isLoadingConfirm'>;

export type NewDialog = {
  onConfirm: () => void | Promise<void>;
  message: string;
  title?: string;
  confirmText?: string;
  onClose?: () => void;
};

export class DialogAs {
  private static create(type: ActionTypes, data: NewDialog): Required<DialogBaseData> {
    const { onConfirm, title, message, onClose, confirmText } = data;

    return {
      onConfirm,
      onClose: onClose || fnUtil.noop,
      confirmText: confirmText || 'Yes, Confirm',
      title: title || 'Are you sure?',
      message,
      type,
    };
  }

  static danger(data: NewDialog) {
    return DialogAs.create('danger', data);
  }

  static primary(data: NewDialog) {
    return DialogAs.create('primary', data);
  }

  static warning(data: NewDialog) {
    return DialogAs.create('warning', data);
  }
}
