import { AlertTypes } from './alert-types';

export interface ToastData {
  id: string | number;
  type: AlertTypes;
  message: string;
  durationMs?: number;
}

export class ToastAs {
  private static create(
    type: AlertTypes,
    message: string,
    id?: string,
    durationMs?: number,
  ): ToastData {
    return {
      id: id ?? new Date().getTime(),
      type,
      message,
      durationMs,
    };
  }

  static success(message: string, durationMs?: number, id?: string): ToastData {
    return this.create('success', message, id, durationMs);
  }

  static error(message: string, durationMs?: number, id?: string): ToastData {
    return this.create('error', message, id, durationMs);
  }

  static info(message: string, durationMs?: number, id?: string): ToastData {
    return this.create('info', message, id, durationMs);
  }

  static warning(message: string, durationMs?: number, id?: string): ToastData {
    return this.create('warning', message, id, durationMs);
  }
}
