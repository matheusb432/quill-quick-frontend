import { JSX, mergeProps } from 'solid-js';
import { Alert } from './Alert';
import { AlertTypes } from '~/core/types/alert-types';

interface ToastProps {
  children: JSX.Element;
  type: AlertTypes;
}

export function Toast(props: ToastProps) {
  const merged = mergeProps({}, props);
  return (
    // TODO bg on all toasts, and with theming (separate from Alert styles)
    // TODO header w/ icon, title, X & body with content on toasts and alert
    <div class="fixed top-0 right-3 animate-slideIn bg-green-500">
      <Alert type={merged.type} canDismiss>
        {merged.children}
      </Alert>
    </div>
  );
}
