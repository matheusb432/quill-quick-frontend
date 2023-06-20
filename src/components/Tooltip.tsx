import { JSX } from 'solid-js';

interface TooltipProps {
  children: JSX.Element;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  theme?: 'primary' | 'secondary' | 'neutral';
}

export function Tooltip(props: TooltipProps) {
  return (
    <div
      class="tooltip"
      classList={{
        'tooltip-primary': props.theme === 'primary',
        'tooltip-secondary': props.theme === 'secondary',
        'tooltip-neutral': props.theme === 'neutral',
        'tooltip-top': props.position === 'top',
        'tooltip-bottom': props.position === 'bottom',
        'tooltip-left': props.position === 'left',
        'tooltip-right': props.position === 'right',
      }}
      data-tip={props.text}
    >
      {props.children}
    </div>
  );
}
