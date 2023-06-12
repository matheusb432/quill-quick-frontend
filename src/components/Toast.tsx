import { JSX, createEffect, createSignal, mergeProps } from 'solid-js';
import { Alert } from './Alert';
import { AlertTypes } from '~/core/types/alert-types';
import { strUtil } from '~/core/util/str-util';

interface ToastProps {
  children: JSX.Element;
  type: AlertTypes;
}

export function Toast(props: ToastProps) {
  const merged = mergeProps({ type: 'info' }, props);
  const [closing, setClosing] = createSignal(false);

  createEffect(() => {
    if (closing()) {
      setTimeout(() => setClosing(false), 500);
    }
  });

  const slideAnimation = () => {
    return closing() ? 'opacity-0 translate-x-full invisible' : 'animate-slideIn visible';
  };

  return (
    <div
      class={strUtil.cx('fixed top-0 right-3 w-80 transition-all duration-500', slideAnimation())}
    >
      <Alert
        class={strUtil.cx(getTheming(merged.type), 'text-md')}
        type={merged.type}
        onDismiss={() => setClosing(true)}
        canDismiss
        alwaysShow
      >
        {merged.children}
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
