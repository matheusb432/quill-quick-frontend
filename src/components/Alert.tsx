import { JSX, Show, createSignal, mergeProps } from 'solid-js';
import { HIXCircle } from '~/assets/icons/HIXCircle';
import { strUtil } from '~/core/util/str-util';
import { ActionIcon } from './ActionIcon';

interface AlertProps {
  children: JSX.Element;
  type: AlertTypes;
  canDismiss?: boolean;
  onDismiss?: () => void;
}

export function Alert(props: AlertProps) {
  const merged = mergeProps({ type: 'info' }, props);

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
        {/* TODO add icon  */}
        <span>
          {`${strUtil.capitalizeFirst(merged.type)}: `}
          {merged.children}
        </span>
        <ActionIcon iconFn={HIXCircle} onClick={dismiss} />
      </div>
    </Show>
  );
}

function getTheming(type: AlertTypes) {
  return classMap[type] || classMap.info;
}

const classMap: Record<AlertTypes, string> = {
  info: 'border-black-300 text-black-500',
  error: 'border-red-400 text-red-500',
  success: 'border-green-300 text-green-500',
  warning: 'border-yellow-300 text-yellow-500',
};

type AlertTypes = 'info' | 'error' | 'success' | 'warning';
