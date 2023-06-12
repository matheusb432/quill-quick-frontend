import { Show, createEffect, createSignal, onCleanup } from 'solid-js';
import { Defaults } from '~/core/constants/defaults';
import { AlertTypes } from '~/core/types/alert-types';
import { ToastData } from '~/core/types/toast-types';
import { strUtil } from '~/core/util/str-util';
import { Alert } from './Alert';
import { Timer } from './Timer';

interface ToastProps {
  data: ToastData;
}

export function Toast(props: ToastProps) {
  // const merged = mergeProps({}, props);
  const [closing, setClosing] = createSignal(false);
  const [closed, setClosed] = createSignal(false);
  const duration = () => props.data.duration || Defaults.ToastDuration;
  const theming = () => getTheming(props.data.type);
  const timerTheming = () => timerClassMap[props.data.type];
  let closingTimeout: NodeJS.Timeout;
  let closedTimeout: NodeJS.Timeout;

  onCleanup(() => {
    clearTimeout(closingTimeout);
    clearTimeout(closedTimeout);
  });

  createEffect(() => {
    if (!closing()) return;

    closingTimeout = setTimeout(() => setClosed(true), 500);
  });

  createEffect(() => {
    clearTimeout(closedTimeout);

    closedTimeout = setTimeout(startClosing, duration());
  });

  const slideAnimation = () => {
    return closing() ? 'opacity-0 translate-x-full invisible' : 'animate-slideIn visible';
  };

  const startClosing = () => {
    setClosing(true);
  };

  return (
    <Show when={!closed()}>
      <div
        class={strUtil.cx('fixed top-0 right-3 w-80 transition-all duration-500', slideAnimation())}
      >
        <Alert
          class={strUtil.cx(theming(), 'text-md')}
          type={props.data.type}
          onDismiss={startClosing}
          canDismiss
          alwaysShow
        >
          {props.data.message}
          <Timer durationMs={duration()} class={timerTheming()} />
        </Alert>
      </div>
    </Show>
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
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
};
