import { Show } from 'solid-js';
import { ToastDefaults } from '~/core/constants/defaults';
import { toastActions, useActiveToast, useToastState } from '~/core/data/store';
import { AlertTypes } from '~/core/types/alert-types';
import { ToastAs, ToastData } from '~/core/types/toast-types';
import { strUtil } from '~/core/util/str-util';
import { Alert } from './Alert';
import { Button } from './Button';
import { Timer } from './Timer';

export function Toast() {
  const toast = () => useActiveToast();
  const closing = () => useToastState((s) => s.closing);
  const count = () => useToastState((s) => s.queue.length);
  const { next, remove } = toastActions;

  function resetToast() {
    next(ToastAs.error(`Toast - ${new Date().getTime()}`, 4000));
  }

  function onDidClose(id?: string | number) {
    remove(id);
  }

  return (
    <>
      <Button onClick={resetToast}>Reset Toast</Button>
      <Show when={toast() != null}>
        <ToastContent
          data={toast() as ToastData}
          didClose={onDidClose}
          count={count()}
          closing={closing()}
        />
      </Show>
    </>
  );
}

type ToastContentProps = {
  data: ToastData;
  count: number;
  closing?: boolean;
  didClose?: (id?: string | number) => void;
};

function ToastContent(props: ToastContentProps) {
  const duration = () => props.data.duration || ToastDefaults.DurationMs;
  const theming = () => getTheming(props.data.type);
  const timerTheming = () => timerClassMap[props.data.type];
  const toastId = () => props.data.id;

  const title = () =>
    strUtil.capitalizeFirst(props.data.type) + (props.count > 1 ? ` - 1/${props.count}` : '');

  const closeToast = () => {
    props.didClose?.(props.data?.id);
  };

  const slideAnimation = () => {
    return props.closing ? 'opacity-0 translate-x-full invisible' : 'animate-slideIn visible';
  };

  return (
    <div
      class={strUtil.cx('fixed top-0 right-3 w-80 transition-all duration-500', slideAnimation())}
    >
      <Alert
        class={strUtil.cx(theming(), 'text-md')}
        type={props.data.type}
        title={title()}
        onDismiss={closeToast}
        canDismiss
        alwaysShow
      >
        {props.data.message}
        <Timer key={toastId()} durationMs={duration} class={timerTheming()} />
      </Alert>
    </div>
  );
}

function getTheming(type: AlertTypes) {
  return classMap[type] || classMap.info;
}

const classMap: Record<AlertTypes, string> = {
  info: 'bg-black-100',
  error: 'bg-red-100',
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
};

const timerClassMap: Record<AlertTypes, string> = {
  info: 'bg-black-500',
  error: 'bg-red-500',
  success: 'bg-accent',
  warning: 'bg-yellow-500',
};
