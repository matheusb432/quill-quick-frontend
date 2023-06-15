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
  title?: JSX.Element;
  class?: string;
  canDismiss?: boolean;
  alwaysShow?: boolean;
  onDismiss?: () => void;
}

export function Alert(props: AlertProps) {
  const merged = mergeProps({ type: 'info' }, props);
  const title = () => (props.title ? props.title : strUtil.capitalizeFirst(merged.type));

  const [show, setShow] = createSignal(true);

  function dismiss() {
    setShow(false);
    merged.onDismiss?.();
  }
  return (
    <Show when={show() || merged.alwaysShow}>
      <div
        class={strUtil.cx(
          'mb-6 flex flex-col justify-center gap-y-2 rounded-lg border px-4 py-3 text-xl',
          getTheming(merged.type),
          merged.class,
        )}
      >
        <header class="flex w-full items-center justify-between">
          <span class="flex items-center gap-x-2">
            <Dynamic component={getIcon(merged.type)} class="h-6 w-6" />
            {title()}
          </span>
          {merged.canDismiss && <ActionIcon iconFn={HIXCircle} onClick={dismiss} />}
        </header>
        <article class="flex flex-col gap-y-2">{merged.children}</article>
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
  info: 'border-info-base text-info-base',
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
