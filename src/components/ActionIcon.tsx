import { Component } from 'solid-js';
import { HeroIconProps } from '~/assets/icons/types';

interface ActionIconProps {
  iconFn: Component<HeroIconProps>;
  onClick: () => void;
}

export function ActionIcon(props: ActionIconProps) {
  return (
    <button type="button" onClick={() => props.onClick()}>
      {props.iconFn({
        class:
          'w-6 h-6 cursor-pointer hover:opacity-70 active:opacity-50 transition-opacity duration-200',
      })}
    </button>
  );
}
