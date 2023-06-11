import { AlertTypes } from './alert-types';

export interface ToastData {
  id: string | number;
  type: AlertTypes;
  message: string;
  duration?: number;
}

export class ToastAs {
  private static create(
    type: AlertTypes,
    message: string,
    id?: string,
    duration?: number,
  ): ToastData {
    return {
      id: id ?? new Date().getTime(),
      type,
      message,
      duration,
    };
  }

  static success(message: string, duration?: number, id?: string): ToastData {
    return this.create('success', message, id, duration);
  }

  static error(message: string, duration?: number, id?: string): ToastData {
    return this.create('error', message, id, duration);
  }

  static info(message: string, duration?: number, id?: string): ToastData {
    return this.create('info', message, id, duration);
  }

  static warning(message: string, duration?: number, id?: string): ToastData {
    return this.create('warning', message, id, duration);
  }
}
