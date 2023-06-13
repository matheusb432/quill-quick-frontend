import { mergeProps } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ElementIds } from '~/core/constants/element-ids';

interface BackdropProps {
  show?: boolean;
  animationMs?: number;
  onClick?: () => void;
}

export function Backdrop(props: BackdropProps) {
  const merged = mergeProps({ show: true, animationMs: 500 }, props);

  return (
    <Portal mount={document.getElementById(ElementIds.BackdropRoot) ?? undefined}>
      <div
        style={{
          'transition-duration': `${merged.animationMs}ms`,
        }}
        class={`fixed inset-0 bg-black-900/50 ${
          merged.show ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={() => merged.onClick?.()}
        aria-hidden
      />
    </Portal>
  );
}
