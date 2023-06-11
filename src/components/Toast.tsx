import { JSX, mergeProps } from 'solid-js';
import { Alert } from './Alert';
import { AlertTypes } from '~/core/types/alert-types';
import { strUtil } from '~/core/util/str-util';

interface ToastProps {
  children: JSX.Element;
  type: AlertTypes;
}

export function Toast(props: ToastProps) {
  const merged = mergeProps({ type: 'info' }, props);
  return (
    // TODO bg on all toasts, and with theming (separate from Alert styles)
    // TODO header w/ icon, title, X & body with content on toasts and alert
    <div class="fixed top-0 right-3 animate-slideIn w-80">
      <Alert class={strUtil.cx(getTheming(merged.type), 'text-md')} type={merged.type} canDismiss>
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
