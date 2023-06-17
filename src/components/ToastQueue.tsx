import { Show } from 'solid-js';
import { AlertTypes } from '~/core/types/alert-types';
import { ToastData } from '~/core/types/toast-types';
import { strUtil } from '~/core/util/str-util';
import { Alert } from './Alert';
import { Timer } from './Timer';
import { toastStore } from '~/core/store/toast-store';
import { Portal } from 'solid-js/web';
import { ElementIds } from '~/core/constants/element-ids';
import { ToastDefaults } from '~/core/constants/ui-defaults';

export function ToastQueue() {
  const state = () => toastStore.state;
  const toast = () => state().queue[0];
  function onDidClose(id?: string | number) {
    toastStore.actions.remove(id);
  }

  return (
    <Portal mount={document.getElementById(ElementIds.OverlayRoot) ?? undefined}>
      <Show when={toast() != null}>
        <Toast
          data={toast()}
          didClose={onDidClose}
          count={state().queue.length}
          closing={state().closing}
        />
      </Show>
    </Portal>
  );
}

type ToastProps = {
  data: ToastData;
  count: number;
  closing?: boolean;
  didClose?: (id?: string | number) => void;
};

function Toast(props: ToastProps) {
  const duration = () => props.data.durationMs || ToastDefaults.DurationMs;
  const theming = () => getTheming(props.data.type);
  const timerTheming = () => timerClassMap[props.data.type];
  const toastId = () => props.data.id;

  const title = () =>
    strUtil.capitalizeFirst(props.data.type) + (props.count > 1 ? ` - 1 of ${props.count}` : '');

  const closeToast = () => {
    props.didClose?.(props.data?.id);
  };

  const slideAnimation = () => {
    return props.closing ? 'opacity-0 translate-x-full invisible' : 'animate-slideIn visible';
  };

  return (
    <div
      class={strUtil.cx(
        'fixed right-3 top-3 min-w-[320px] max-w-xl transition-all duration-500',
        slideAnimation(),
      )}
    >
      <Alert
        class={strUtil.cx(theming(), 'text-md my-0')}
        type={props.data.type}
        title={title()}
        onDismiss={closeToast}
        canDismiss
        alwaysShow
      >
        {props.data.message}

        <Timer key={toastId()} durationMs={duration()} class={timerTheming()} />
      </Alert>
    </div>
  );
}

function getTheming(type: AlertTypes) {
  return classMap[type] || classMap.info;
}

const classMap: Record<AlertTypes, string> = {
  info: 'bg-info-base text-primary-text',
  error: 'bg-red-100',
  success: 'bg-green-100',
  warning: 'bg-yellow-100 text-secondary-text',
};

const timerClassMap: Record<AlertTypes, string> = {
  info: 'bg-primary-text',
  error: 'bg-red-500',
  success: 'bg-accent',
  warning: 'bg-yellow-500',
};
