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
  canDismiss?: boolean;
  onDismiss?: () => void;
}

export function Alert(props: AlertProps) {
  const merged = mergeProps({ type: 'info', canDismiss: false }, props);

  const [show, setShow] = createSignal(true);

  function dismiss() {
    setShow(false);
    merged.onDismiss?.();
  }
  return (
    <Show when={show()}>
      <div
        class={strUtil.cx(
          'flex justify-between items-center rounded-lg border px-4 py-3 my-6',
          getTheming(merged.type),
        )}
      >
        <span class="flex items-center gap-x-2 text-xl">
          <i>
            <Dynamic component={getIcon(merged.type)} class="w-8 h-8" />
          </i>
          {merged.children}
        </span>
        {merged.canDismiss && <ActionIcon iconFn={HIXCircle} onClick={dismiss} />}
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
