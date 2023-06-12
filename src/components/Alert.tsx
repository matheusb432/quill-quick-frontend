import { Component, JSX, Show, createSignal, mergeProps } from 'solid-js';
import { HIXCircle } from '~/assets/icons/HIXCircle';
import { strUtil } from '~/core/util/str-util';
import { ActionIcon } from './ActionIcon';
import { Dynamic } from 'solid-js/web';
import { HeroIconProps } from '~/assets/icons/types';
import { HIInformationCircle } from '~/assets/icons/HIInformationCircle';
import { HIExclamationCircle } from '~/assets/icons/HIExclamationCircle';
import { HICheckBadge } from '~/assets/icons/HICheckBadge';
import { HIExclamationTriangle } from '~/assets/icons/HIExclamationTriangle';
import { AlertTypes } from '~/core/types/alert-types';

interface AlertProps {
  children: JSX.Element;
  type: AlertTypes;
  class?: string;
  canDismiss?: boolean;
  alwaysShow?: boolean;
  onDismiss?: () => void;
}

export function Alert(props: AlertProps) {
  const merged = mergeProps({ type: 'info' }, props);
  const title = () => strUtil.capitalizeFirst(merged.type);

  const [show, setShow] = createSignal(true);

  function dismiss() {
    setShow(false);
    merged.onDismiss?.();
  }
  return (
    <Show when={show() || merged.alwaysShow}>
      <div
        class={strUtil.cx(
          'flex justify-center flex-col rounded-lg border px-4 py-3 my-6 gap-y-2 text-xl',
          getTheming(merged.type),
          merged.class,
        )}
      >
        <header class="flex justify-between items-center w-full">
          <span class="flex items-center gap-x-2">
            <Dynamic component={getIcon(merged.type)} class="w-6 h-6" />
            {title()}
          </span>
          {merged.canDismiss && <ActionIcon iconFn={HIXCircle} onClick={dismiss} />}
        </header>
        <article>{merged.children}</article>
      </div>
    </Show>
  );
}

function getTheming(type: AlertTypes) {
  return classMap[type] || classMap.info;
}

function getIcon(type: AlertTypes) {
  return iconFnsMap[type] || iconFnsMap.info;
}

const classMap: Record<AlertTypes, string> = {
  info: 'border-black-300 text-divider',
  error: 'border-red-400 text-red-500',
  success: 'border-green-300 text-green-500',
  warning: 'border-yellow-300 text-yellow-500',
};

const iconFnsMap: Record<AlertTypes, Component<HeroIconProps>> = {
  info: HIInformationCircle,
  error: HIExclamationCircle,
  success: HICheckBadge,
  warning: HIExclamationTriangle,
};
